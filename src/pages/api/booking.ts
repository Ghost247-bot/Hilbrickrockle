import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { supabase, getSupabaseAdmin } from '../../lib/supabase';
import { withErrorHandler } from '../../middleware/error';
import { withRateLimit } from '../../middleware/rateLimit';
import logger from '../../utils/logger';

// Disable default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  practiceArea: string;
  lawyerId: string;
  message: string;
}

interface FileUpload {
  filepath: string;
  originalFilename?: string;
  mimetype?: string;
}

// Validate booking data
function validateBookingData(data: Partial<BookingData>): string[] {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.date) {
    errors.push('Please select a preferred date');
  }

  if (!data.time) {
    errors.push('Please select a preferred time');
  }

  if (!data.practiceArea) {
    errors.push('Please select a practice area');
  }

  // lawyerId is optional, no validation needed

  return errors;
}

// Convert file to base64
function fileToBase64(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      else resolve(data.toString('base64'));
    });
  });
}

// Send email via MailerSend API
async function sendBookingEmail(
  bookingData: BookingData,
  attachments: Array<{ filename: string; content: string; type: string }> = []
): Promise<void> {
  const mailerSendApiKey = process.env.MAILERSEND_API_KEY;
  const mailerSendFromEmail = process.env.MAILERSEND_FROM_EMAIL || 'noreply@yourdomain.com';
  const mailerSendFromName = process.env.MAILERSEND_FROM_NAME || 'Hilbrick&Rockle Legal';
  const notificationEmail = process.env.NOTIFICATION_EMAIL || mailerSendFromEmail;

  if (!mailerSendApiKey) {
    throw new Error('MailerSend API key is not configured');
  }

  // Fetch lawyer information
  let lawyerInfo: any = null;
  if (bookingData.lawyerId) {
    try {
      const supabaseAdmin = getSupabaseAdmin();
      const { data: lawyer } = await supabaseAdmin
        .from('lawyers')
        .select('lawyer_id, name, email, practice_areas')
        .eq('lawyer_id', bookingData.lawyerId)
        .single();
      lawyerInfo = lawyer;
    } catch (error) {
      logger.error('Error fetching lawyer info', { lawyerId: bookingData.lawyerId, error });
    }
  }

  // Format date and time
  const appointmentDate = new Date(`${bookingData.date}T${bookingData.time}`);
  const formattedDate = appointmentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Customer confirmation email
  const customerEmailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Appointment Confirmation</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
          <p>Dear ${bookingData.name},</p>
          <p>Thank you for booking an appointment with Hilbrick&Rockle. We have received your appointment request and will review it shortly.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h2 style="color: #2563eb; margin-top: 0;">Appointment Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px;">Date:</td>
                <td style="padding: 8px 0;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Time:</td>
                <td style="padding: 8px 0;">${formattedTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Practice Area:</td>
                <td style="padding: 8px 0;">${bookingData.practiceArea}</td>
              </tr>
              ${lawyerInfo ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Assigned Lawyer:</td>
                <td style="padding: 8px 0;">${lawyerInfo.name} (${lawyerInfo.lawyer_id})</td>
              </tr>
              ` : `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Assigned Lawyer:</td>
                <td style="padding: 8px 0; font-style: italic; color: #6b7280;">To be assigned</td>
              </tr>
              `}
              ${bookingData.phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;">${bookingData.phone}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          ${bookingData.message ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2563eb; margin-top: 0;">Additional Information:</h3>
            <p style="white-space: pre-wrap;">${bookingData.message}</p>
          </div>
          ` : ''}

          ${attachments.length > 0 ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2563eb; margin-top: 0;">Documents Submitted:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${attachments.map(att => `<li>${att.filename}</li>`).join('')}
            </ul>
          </div>
          ` : ''}

          <p>Our team will review your request and contact you to confirm your appointment. If you have any questions or need to make changes, please don't hesitate to contact us.</p>
          
          <p style="margin-top: 30px;">Best regards,<br><strong>Hilbrick&Rockle Legal Team</strong></p>
        </div>
      </body>
    </html>
  `;

  // Admin notification email
  const adminEmailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">New Appointment Booking</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
          <p>A new appointment has been booked through the website.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h2 style="color: #dc2626; margin-top: 0;">Booking Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 8px 0;">${bookingData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${bookingData.email}">${bookingData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;">${bookingData.phone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Date:</td>
                <td style="padding: 8px 0;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Time:</td>
                <td style="padding: 8px 0;">${formattedTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Practice Area:</td>
                <td style="padding: 8px 0;">${bookingData.practiceArea}</td>
              </tr>
              ${lawyerInfo ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Assigned Lawyer:</td>
                <td style="padding: 8px 0;">${lawyerInfo.name} (${lawyerInfo.lawyer_id})</td>
              </tr>
              ` : `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Assigned Lawyer:</td>
                <td style="padding: 8px 0; font-style: italic; color: #6b7280;">Not selected - to be assigned</td>
              </tr>
              `}
            </table>
          </div>

          ${bookingData.message ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-top: 0;">Additional Information:</h3>
            <p style="white-space: pre-wrap;">${bookingData.message}</p>
          </div>
          ` : ''}

          ${attachments.length > 0 ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-top: 0;">Documents Attached (${attachments.length}):</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${attachments.map(att => `<li>${att.filename}</li>`).join('')}
            </ul>
            <p style="margin-top: 10px; font-size: 14px; color: #666;">Documents are attached to this email.</p>
          </div>
          ` : ''}

          <p style="margin-top: 30px;">Please review and confirm this appointment.</p>
        </div>
      </body>
    </html>
  `;

  // Prepare MailerSend API payload for customer email
  const customerEmailPayload: any = {
    from: {
      email: mailerSendFromEmail,
      name: mailerSendFromName,
    },
    to: [
      {
        email: bookingData.email,
        name: bookingData.name,
      },
    ],
    subject: 'Appointment Confirmation - Hilbrick&Rockle',
    html: customerEmailHtml,
  };

  // Add attachments if any
  if (attachments.length > 0) {
    customerEmailPayload.attachments = attachments.map(att => ({
      filename: att.filename,
      content: att.content,
      type: att.type,
    }));
  }

  // Prepare MailerSend API payload for admin email
  const adminEmailPayload: any = {
    from: {
      email: mailerSendFromEmail,
      name: mailerSendFromName,
    },
    to: [
      {
        email: notificationEmail,
      },
    ],
    subject: `New Appointment Booking - ${bookingData.name}`,
    html: adminEmailHtml,
  };

  // Add attachments if any
  if (attachments.length > 0) {
    adminEmailPayload.attachments = attachments.map(att => ({
      filename: att.filename,
      content: att.content,
      type: att.type,
    }));
  }

  try {
    // Send both emails via MailerSend API
    // Note: MailerSend API endpoint is /v1/email
    const [customerResponse, adminResponse] = await Promise.all([
      axios.post('https://api.mailersend.com/v1/email', customerEmailPayload, {
        headers: {
          'Authorization': `Bearer ${mailerSendApiKey}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      }),
      axios.post('https://api.mailersend.com/v1/email', adminEmailPayload, {
        headers: {
          'Authorization': `Bearer ${mailerSendApiKey}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      }),
    ]);

    logger.info('Booking emails sent successfully', {
      customerEmail: bookingData.email,
      customerResponseStatus: customerResponse.status,
      adminResponseStatus: adminResponse.status,
    });
  } catch (error: any) {
    logger.error('Error sending booking emails via MailerSend', {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error(`Failed to send confirmation emails: ${error.message}`);
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure all responses are JSON
  res.setHeader('Content-Type', 'application/json');
  
  console.log('Booking API handler called', { 
    method: req.method, 
    url: req.url,
    contentType: req.headers['content-type'] 
  });
  
  if (req.method !== 'POST') {
    logger.warn('Invalid method for booking submission', { method: req.method });
    console.error('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting booking processing...');
    // Use temp directory for serverless environments (Netlify, Vercel, etc.)
    // On serverless platforms, /tmp is the only writable directory
    // Check multiple environment variables to detect serverless
    const isServerless = 
      process.env.VERCEL || 
      process.env.NETLIFY_DEPLOY_PRIME_URL || 
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.NETLIFY;
    
    console.log('Environment check:', {
      isServerless,
      VERCEL: !!process.env.VERCEL,
      NETLIFY_DEPLOY_PRIME_URL: !!process.env.NETLIFY_DEPLOY_PRIME_URL,
      AWS_LAMBDA: !!process.env.AWS_LAMBDA_FUNCTION_NAME,
      NETLIFY: !!process.env.NETLIFY,
    });
    
    const tempDir = isServerless 
      ? '/tmp' 
      : path.join(process.cwd(), 'public', 'uploads', 'booking');
    
    console.log('Using temp directory:', tempDir);
    
    // Ensure upload directory exists first
    try {
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      console.log('Directory ready:', tempDir);
    } catch (dirError: any) {
      logger.error('Error creating upload directory', {
        error: dirError instanceof Error ? dirError.message : 'Unknown error',
        tempDir,
      });
      console.error('Error creating upload directory:', dirError.message, 'tempDir:', tempDir);
      // Don't fail in serverless - continue without file storage
      logger.warn('Continuing without file storage - serverless environment detected');
    }

    // Parse form data with files
    let form: any;
    try {
      // Configure formidable - always use tempDir (will be /tmp for serverless)
      form = formidable({
        uploadDir: tempDir,
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB
        multiples: true,
      });
    } catch (formError: any) {
      logger.error('Error creating formidable form', {
        error: formError instanceof Error ? formError.message : 'Unknown error',
      });
      console.error('Error creating formidable form:', formError.message, 'tempDir:', tempDir);
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Failed to initialize file upload handler.',
      });
    }

    let fields: any, files: any;
    try {
      [fields, files] = await form.parse(req);
    } catch (parseError: any) {
      const errorMsg = parseError instanceof Error ? parseError.message : 'Unknown parse error';
      logger.error('Error parsing form data', {
        error: errorMsg,
        code: parseError?.code,
        stack: parseError instanceof Error ? parseError.stack : undefined,
      });
      console.error('Error parsing form data:', errorMsg, 'Code:', parseError?.code);
      
      // Handle specific formidable errors
      if (parseError?.code === 'LIMIT_FILE_SIZE' || parseError?.message?.includes('File size')) {
        return res.status(400).json({
          error: 'File too large',
          message: 'File size exceeds the maximum allowed size of 10MB',
        });
      }
      
      if (parseError?.code === 'LIMIT_PART_COUNT' || parseError?.message?.includes('parts')) {
        return res.status(400).json({
          error: 'Too many files',
          message: 'Too many files uploaded. Please reduce the number of files.',
        });
      }

      // Handle request already consumed errors
      if (parseError?.message?.includes('request') || parseError?.code === 'ECONNRESET') {
        return res.status(400).json({
          error: 'Invalid request',
          message: 'The request could not be processed. Please try again.',
        });
      }
      
      return res.status(400).json({
        error: 'Invalid form data',
        message: parseError instanceof Error ? parseError.message : 'Failed to parse form data',
      });
    }

    // Extract booking data
    const bookingData: BookingData = {
      name: Array.isArray(fields.name) ? fields.name[0] : (fields.name || ''),
      email: Array.isArray(fields.email) ? fields.email[0] : (fields.email || ''),
      phone: Array.isArray(fields.phone) ? fields.phone[0] : (fields.phone || ''),
      date: Array.isArray(fields.date) ? fields.date[0] : (fields.date || ''),
      time: Array.isArray(fields.time) ? fields.time[0] : (fields.time || ''),
      practiceArea: Array.isArray(fields.practiceArea) ? fields.practiceArea[0] : (fields.practiceArea || ''),
      lawyerId: Array.isArray(fields.lawyerId) ? (fields.lawyerId[0] || '') : (fields.lawyerId || ''),
      message: Array.isArray(fields.message) ? fields.message[0] : (fields.message || ''),
    };

    // Log for debugging (remove in production)
    logger.info('Booking data received', {
      name: bookingData.name,
      email: bookingData.email,
      date: bookingData.date,
      time: bookingData.time,
      practiceArea: bookingData.practiceArea,
      hasLawyerId: !!bookingData.lawyerId && bookingData.lawyerId.trim() !== '',
      lawyerId: bookingData.lawyerId || 'none',
    });

    // Validate booking data
    const validationErrors = validateBookingData(bookingData);
    if (validationErrors.length > 0) {
      logger.warn('Booking form validation failed', { errors: validationErrors });
      return res.status(400).json({ errors: validationErrors });
    }

    // Process file uploads - save files and store metadata
    const attachments: Array<{ filename: string; content: string; type: string }> = [];
    const documentMetadata: Array<{
      filename: string;
      path: string;
      type: string;
      size: number;
      uploaded_at: string;
    }> = [];
    
    try {
      const fileKeys = Object.keys(files || {});
      
      // Use the same isServerless variable from the top of the handler
      for (const key of fileKeys) {
        const fileArray = files[key];
        if (Array.isArray(fileArray) && fileArray.length > 0) {
          const file = fileArray[0] as any;
          if (file && file.filepath) {
            try {
              const originalFilename = file.originalFilename || `document_${key}`;
              
              // Get file stats
              let fileSize = 0;
              try {
                const fileStats = fs.statSync(file.filepath);
                fileSize = fileStats.size;
              } catch (statError) {
                logger.warn('Could not get file stats', { filename: originalFilename });
              }
              
              // Store document metadata for database record
              // Note: In serverless, we don't store files permanently
              if (!isServerless) {
                // Local development: try to save to permanent location
                try {
                  const permanentUploadDir = path.join(process.cwd(), 'public', 'uploads', 'booking');
                  if (!fs.existsSync(permanentUploadDir)) {
                    fs.mkdirSync(permanentUploadDir, { recursive: true });
                  }
                  
                  const timestamp = Date.now();
                  const fileExt = path.extname(originalFilename);
                  const fileName = path.basename(originalFilename, fileExt);
                  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9-_]/g, '_');
                  const uniqueFilename = `${sanitizedFileName}_${timestamp}${fileExt}`;
                  const permanentPath = path.join(permanentUploadDir, uniqueFilename);
                  
                  // Move file to permanent location
                  fs.copyFileSync(file.filepath, permanentPath);
                  
                  documentMetadata.push({
                    filename: originalFilename,
                    path: `/uploads/booking/${uniqueFilename}`,
                    type: file.mimetype || 'application/octet-stream',
                    size: fileSize,
                    uploaded_at: new Date().toISOString(),
                  });
                } catch (permanentSaveError) {
                  logger.warn('Could not save file to permanent location, files will only be in emails', {
                    filename: originalFilename,
                  });
                }
              } else {
                // Serverless: just store basic metadata
                documentMetadata.push({
                  filename: originalFilename,
                  path: 'attached-to-email', // Indicate files are in emails only
                  type: file.mimetype || 'application/octet-stream',
                  size: fileSize,
                  uploaded_at: new Date().toISOString(),
                });
              }
              
              // Prepare for email attachment
              try {
                const base64Content = await fileToBase64(file.filepath);
                attachments.push({
                  filename: originalFilename,
                  content: base64Content,
                  type: file.mimetype || 'application/octet-stream',
                });
              } catch (base64Error) {
                logger.warn('Error converting file to base64 for email', {
                  filename: originalFilename,
                  error: base64Error instanceof Error ? base64Error.message : 'Unknown error',
                });
                // Continue without attachment for this file
              }
              
              // Clean up temporary uploaded file
              try {
                if (fs.existsSync(file.filepath)) {
                  fs.unlinkSync(file.filepath);
                }
              } catch (cleanupError) {
                logger.warn('Error cleaning up temporary file', { filename: originalFilename });
              }
            } catch (error) {
              logger.error('Error processing file upload', { 
                error: error instanceof Error ? error.message : 'Unknown error',
                filename: file.originalFilename,
                stack: error instanceof Error ? error.stack : undefined,
              });
              // Continue processing other files
            }
          }
        }
      }
    } catch (fileProcessingError: any) {
      logger.error('Error in file processing loop', {
        error: fileProcessingError instanceof Error ? fileProcessingError.message : 'Unknown error',
        stack: fileProcessingError instanceof Error ? fileProcessingError.stack : undefined,
      });
      // Don't fail the entire request, but log the error
    }

    // Save booking to Supabase
    // Build insert object - only include lawyer_id if it's provided and valid
    const insertData: any = {
      name: bookingData.name.trim(),
      email: bookingData.email.trim(),
      phone: bookingData.phone?.trim() || null,
      date: bookingData.date,
      time: bookingData.time,
      practice_area: bookingData.practiceArea,
      message: bookingData.message?.trim() || null,
      status: 'pending',
      documents: documentMetadata.length > 0 ? documentMetadata : null,
    };

    // Only add lawyer_id if provided, not empty, and not just whitespace
    const lawyerIdValue = bookingData.lawyerId?.trim();
    if (lawyerIdValue && lawyerIdValue !== '') {
      insertData.lawyer_id = lawyerIdValue;
    }
    // If lawyer_id is not provided, don't include it (let database handle null with default)

    logger.info('Attempting to insert booking', {
      insertFields: Object.keys(insertData),
      hasLawyerId: 'lawyer_id' in insertData,
      lawyerId: insertData.lawyer_id || 'null',
    });

    // Use admin client for server-side operations to bypass RLS
    let supabaseAdmin;
    try {
      supabaseAdmin = getSupabaseAdmin();
      if (!supabaseAdmin) {
        throw new Error('Failed to create Supabase admin client');
      }
    } catch (adminError: any) {
      logger.error('Error creating Supabase admin client', {
        error: adminError instanceof Error ? adminError.message : 'Unknown error',
        stack: adminError instanceof Error ? adminError.stack : undefined,
      });
      return res.status(500).json({
        error: 'Database connection error',
        message: 'Failed to connect to database. Please check your configuration.',
        details: process.env.NODE_ENV === 'development' ? adminError.message : undefined,
      });
    }
    
    // First, check if the appointments table exists
    let tableCheckError: any = null;
    try {
      const { error: checkError } = await supabaseAdmin
        .from('appointments')
        .select('id')
        .limit(1);
      
      tableCheckError = checkError;
    } catch (checkException: any) {
      logger.error('Exception during table check', {
        error: checkException instanceof Error ? checkException.message : 'Unknown error',
        stack: checkException instanceof Error ? checkException.stack : undefined,
      });
      tableCheckError = checkException;
    }
    
    if (tableCheckError) {
      logger.error('Table check failed', { 
        error: tableCheckError.message,
        code: tableCheckError.code,
        details: tableCheckError.details,
        hint: tableCheckError.hint
      });
      
      // Provide helpful error message
      if (tableCheckError.message?.includes('does not exist') || tableCheckError.code === '42P01' || tableCheckError.code === 'PGRST205') {
        return res.status(500).json({
          error: 'Database table not found',
          message: 'The appointments table does not exist in the database. Please run the database setup script in Supabase SQL Editor.',
          details: 'See scripts/database-setup.sql for the table creation script.',
        });
      }
      
      return res.status(500).json({
        error: 'Database connection error',
        message: tableCheckError.message || 'Failed to connect to database',
        details: process.env.NODE_ENV === 'development' ? tableCheckError.details : undefined,
      });
    }

    let bookingRecord: any = null;
    let supabaseError: any = null;
    
    try {
      const result = await supabaseAdmin
        .from('appointments')
        .insert([insertData])
        .select('id')
        .single();
      
      bookingRecord = result.data;
      supabaseError = result.error;
    } catch (insertException: any) {
      const errorMsg = insertException instanceof Error ? insertException.message : 'Unknown error';
      logger.error('Exception during booking insert', {
        error: errorMsg,
        stack: insertException instanceof Error ? insertException.stack : undefined,
        insertData: { ...insertData, lawyer_id: insertData.lawyer_id || 'null' }
      });
      console.error('Exception during booking insert:', errorMsg, insertException);
      supabaseError = insertException;
    }

    if (supabaseError) {
      logger.error('Error saving booking to database', { 
        error: supabaseError.message,
        details: supabaseError.details,
        hint: supabaseError.hint,
        code: supabaseError.code,
        insertData: { ...insertData, lawyer_id: insertData.lawyer_id || 'null' }
      });
      console.error('Error saving booking to database:', supabaseError.message, supabaseError);
      
      // Provide more helpful error messages
      let errorMessage = 'Failed to save booking to database';
      if (supabaseError.message?.includes('column') && supabaseError.message?.includes('does not exist')) {
        errorMessage = 'Database table structure needs to be updated. Please run the database setup script.';
      } else if (supabaseError.message?.includes('foreign key') || supabaseError.message?.includes('violates foreign key')) {
        errorMessage = 'Invalid lawyer selected. Please try again.';
      } else if (supabaseError.message?.includes('permission denied') || supabaseError.message?.includes('RLS')) {
        errorMessage = 'Database permissions issue. Please contact support.';
      } else if (supabaseError.message?.includes('does not exist') || supabaseError.code === 'PGRST205') {
        errorMessage = 'Database table not found. Please run the database setup script.';
      }
      
      return res.status(500).json({
        error: 'Failed to save booking',
        message: errorMessage,
        details: process.env.NODE_ENV === 'development' ? supabaseError.message : null,
        hint: process.env.NODE_ENV === 'development' ? supabaseError.hint : null,
      });
    }

    // Send emails via MailerSend
    try {
      await sendBookingEmail(bookingData, attachments);
    } catch (emailError) {
      logger.error('Error sending booking emails', { error: emailError });
      // Don't fail the request if email fails, booking is still saved
    }

    logger.info('Booking created successfully', {
      bookingId: bookingRecord?.id,
      email: bookingData.email,
    });

    return res.status(200).json({
      success: true,
      message: 'Booking submitted successfully',
      bookingId: bookingRecord?.id,
    });
  } catch (error) {
    logger.error('Error handling booking submission', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
}

// Wrap handler with additional error catching to ensure JSON responses
const wrappedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set JSON content type immediately
  res.setHeader('Content-Type', 'application/json');
  
  try {
    // Ensure response hasn't been sent
    if (res.headersSent) {
      return;
    }
    
    // Call the actual handler wrapped in middleware
    await withErrorHandler(withRateLimit(handler))(req, res);
  } catch (error: any) {
    // Final catch-all - ensures we always return JSON
    if (!res.headersSent) {
      logger.error('Unhandled error in booking API wrapper', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      
      try {
        res.status(500).json({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
      } catch (sendError) {
        // Response already sent, log only
        logger.error('Failed to send error response', { sendError });
      }
    }
  }
};

export default wrappedHandler;

