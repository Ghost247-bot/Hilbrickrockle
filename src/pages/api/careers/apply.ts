import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { withErrorHandler } from '../../../middleware/error';
import { withRateLimit } from '../../../middleware/rateLimit';
import logger from '../../../utils/logger';

interface JobApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  location: string;
  resume?: string; // Base64 encoded resume
  coverLetter?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  yearsOfExperience?: string;
  availability?: string;
  additionalInfo?: string;
}

async function validateJobApplication(data: any) {
  const errors: string[] = [];
  
  if (!data.firstName || data.firstName.length < 2) {
    errors.push('First name must be at least 2 characters long');
  }
  
  if (!data.lastName || data.lastName.length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }
  
  if (!data.position) {
    errors.push('Position is required');
  }
  
  return errors;
}

// Send email via MailerSend API
async function sendApplicationEmail(applicationData: JobApplicationData): Promise<void> {
  const mailerSendApiKey = process.env.MAILERSEND_API_KEY;
  const mailerSendFromEmail = process.env.MAILERSEND_FROM_EMAIL || 'noreply@yourdomain.com';
  const mailerSendFromName = process.env.MAILERSEND_FROM_NAME || 'Hilbrick&Rockle Legal';
  const notificationEmail = process.env.NOTIFICATION_EMAIL || mailerSendFromEmail;

  if (!mailerSendApiKey) {
    throw new Error('MailerSend API key is not configured');
  }

  // Candidate confirmation email
  const candidateEmailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Thank You for Your Application</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
          <p>Dear ${applicationData.firstName} ${applicationData.lastName},</p>
          <p>Thank you for applying for the <strong>${applicationData.position}</strong> position at Hilbrick&Rockle LAW.</p>
          <p>We have received your application and our recruiting team will review it carefully. We'll get back to you within 5-7 business days.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h2 style="color: #2563eb; margin-top: 0;">Application Summary</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px;">Position:</td>
                <td style="padding: 8px 0;">${applicationData.position}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Location:</td>
                <td style="padding: 8px 0;">${applicationData.location}</td>
              </tr>
              ${applicationData.yearsOfExperience ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Experience:</td>
                <td style="padding: 8px 0;">${applicationData.yearsOfExperience} years</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <p style="margin-top: 30px;">Best regards,<br><strong>Hilbrick&Rockle LAW Recruiting Team</strong></p>
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
          <h1 style="color: white; margin: 0;">New Job Application Received</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
          <p>A new job application has been submitted through the website.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h2 style="color: #dc2626; margin-top: 0;">Application Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 8px 0;">${applicationData.firstName} ${applicationData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${applicationData.email}">${applicationData.email}</a></td>
              </tr>
              ${applicationData.phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${applicationData.phone}">${applicationData.phone}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Position:</td>
                <td style="padding: 8px 0;">${applicationData.position}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Location:</td>
                <td style="padding: 8px 0;">${applicationData.location}</td>
              </tr>
              ${applicationData.yearsOfExperience ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Experience:</td>
                <td style="padding: 8px 0;">${applicationData.yearsOfExperience} years</td>
              </tr>
              ` : ''}
              ${applicationData.linkedinUrl ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">LinkedIn:</td>
                <td style="padding: 8px 0;"><a href="${applicationData.linkedinUrl}" target="_blank">${applicationData.linkedinUrl}</a></td>
              </tr>
              ` : ''}
              ${applicationData.portfolioUrl ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Portfolio:</td>
                <td style="padding: 8px 0;"><a href="${applicationData.portfolioUrl}" target="_blank">${applicationData.portfolioUrl}</a></td>
              </tr>
              ` : ''}
            </table>
          </div>

          ${applicationData.coverLetter ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-top: 0;">Cover Letter:</h3>
            <div style="padding: 15px; background: #f3f4f6; border-radius: 6px;">
              <p style="margin: 0; white-space: pre-wrap;">${applicationData.coverLetter}</p>
            </div>
          </div>
          ` : ''}

          ${applicationData.additionalInfo ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-top: 0;">Additional Information:</h3>
            <div style="padding: 15px; background: #f3f4f6; border-radius: 6px;">
              <p style="margin: 0; white-space: pre-wrap;">${applicationData.additionalInfo}</p>
            </div>
          </div>
          ` : ''}

          <p style="margin-top: 30px;">Please review this application and respond to the candidate.</p>
        </div>
      </body>
    </html>
  `;

  // Prepare MailerSend API payload for candidate email
  const candidateEmailPayload: any = {
    from: {
      email: mailerSendFromEmail,
      name: mailerSendFromName,
    },
    to: [
      {
        email: applicationData.email,
        name: `${applicationData.firstName} ${applicationData.lastName}`,
      },
    ],
    subject: `Thank You for Applying: ${applicationData.position}`,
    html: candidateEmailHtml,
  };

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
    subject: `New Job Application: ${applicationData.position} - ${applicationData.firstName} ${applicationData.lastName}`,
    html: adminEmailHtml,
  };

  try {
    // Send both emails via MailerSend API
    const [candidateResponse, adminResponse] = await Promise.all([
      axios.post('https://api.mailersend.com/v1/email', candidateEmailPayload, {
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

    logger.info('Job application emails sent successfully', {
      candidateEmail: applicationData.email,
      candidateResponseStatus: candidateResponse.status,
      adminResponseStatus: adminResponse.status,
    });
  } catch (error: any) {
    logger.error('Error sending job application emails via MailerSend', {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    // Don't throw error - application is still saved even if email fails
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    logger.warn('Invalid method for job application', { method: req.method });
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const applicationData: JobApplicationData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      location: req.body.location,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter,
      linkedinUrl: req.body.linkedinUrl,
      portfolioUrl: req.body.portfolioUrl,
      yearsOfExperience: req.body.yearsOfExperience,
      availability: req.body.availability,
      additionalInfo: req.body.additionalInfo,
    };
    
    // Validate input
    const validationErrors = await validateJobApplication(applicationData);
    if (validationErrors.length > 0) {
      logger.warn('Job application validation failed', { errors: validationErrors });
      return res.status(400).json({ 
        error: validationErrors.join(', '),
        errors: validationErrors 
      });
    }

    // Save application to database
    const supabaseAdmin = getSupabaseAdmin();
    const insertData = {
      first_name: applicationData.firstName.trim(),
      last_name: applicationData.lastName.trim(),
      email: applicationData.email.trim(),
      phone: applicationData.phone?.trim() || null,
      position: applicationData.position.trim(),
      location: applicationData.location.trim(),
      resume: applicationData.resume || null,
      cover_letter: applicationData.coverLetter?.trim() || null,
      linkedin_url: applicationData.linkedinUrl?.trim() || null,
      portfolio_url: applicationData.portfolioUrl?.trim() || null,
      years_of_experience: applicationData.yearsOfExperience?.trim() || null,
      availability: applicationData.availability?.trim() || null,
      additional_info: applicationData.additionalInfo?.trim() || null,
      status: 'pending',
    };

    const { data: applicationRecord, error: supabaseError } = await supabaseAdmin
      .from('job_applications')
      .insert([insertData])
      .select('id')
      .single();

    if (supabaseError) {
      logger.error('Error saving job application to database', { 
        error: supabaseError.message,
        code: supabaseError.code,
      });
      // Check if table doesn't exist
      if (supabaseError.message?.includes('does not exist') || supabaseError.code === '42P01' || supabaseError.code === 'PGRST116') {
        logger.warn('Job applications table does not exist. Please run the SQL migration.');
      }
      // Continue anyway to send emails even if DB save fails
    } else {
      logger.info('Job application saved to database', { 
        applicationId: applicationRecord?.id 
      });
    }
    
    // Send emails via MailerSend
    try {
      await sendApplicationEmail(applicationData);
    } catch (emailError: any) {
      logger.error('Error sending application emails', {
        error: emailError.message,
      });
      // Still return success since application is processed
    }

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully. We will contact you soon.',
    });
  } catch (error: any) {
    logger.error('Error processing job application', {
      error: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      error: 'Failed to submit application',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export default withErrorHandler(withRateLimit(handler, { maxRequests: 5, windowMs: 15 * 60 * 1000 }));

