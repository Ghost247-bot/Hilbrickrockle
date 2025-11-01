import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { withErrorHandler } from '../../../middleware/error';
import { withRateLimit } from '../../../middleware/rateLimit';
import logger from '../../../utils/logger';

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

async function validateContactForm(data: any) {
  const errors: string[] = [];
  
  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }
  
  if (!data.subject || data.subject.length < 3) {
    errors.push('Subject must be at least 3 characters long');
  }
  
  if (!data.message || data.message.length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return errors;
}

// Send email via MailerSend API
async function sendContactEmail(contactData: ContactData): Promise<void> {
  const mailerSendApiKey = process.env.MAILERSEND_API_KEY;
  const mailerSendFromEmail = process.env.MAILERSEND_FROM_EMAIL || 'noreply@yourdomain.com';
  const mailerSendFromName = process.env.MAILERSEND_FROM_NAME || 'Hilbrick&Rockle Legal';
  const notificationEmail = process.env.NOTIFICATION_EMAIL || mailerSendFromEmail;

  if (!mailerSendApiKey) {
    throw new Error('MailerSend API key is not configured');
  }

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
          <h1 style="color: white; margin: 0;">Thank You for Contacting Us</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
          <p>Dear ${contactData.name},</p>
          <p>Thank you for reaching out to Hilbrick&Rockle. We have received your message and will get back to you as soon as possible.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h2 style="color: #2563eb; margin-top: 0;">Your Message</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px;">Subject:</td>
                <td style="padding: 8px 0;">${contactData.subject}</td>
              </tr>
              ${contactData.phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;">${contactData.phone}</td>
              </tr>
              ` : ''}
            </table>
            <div style="margin-top: 15px; padding: 15px; background: #f3f4f6; border-radius: 6px;">
              <p style="margin: 0; white-space: pre-wrap;">${contactData.message}</p>
            </div>
          </div>

          <p>Our team typically responds within 24-48 hours during business days. If your matter is urgent, please call us directly.</p>
          
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
          <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
          <p>A new contact form submission has been received through the website.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h2 style="color: #dc2626; margin-top: 0;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 8px 0;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${contactData.email}">${contactData.email}</a></td>
              </tr>
              ${contactData.phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${contactData.phone}">${contactData.phone}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
                <td style="padding: 8px 0;">${contactData.subject}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-top: 0;">Message:</h3>
            <div style="padding: 15px; background: #f3f4f6; border-radius: 6px;">
              <p style="margin: 0; white-space: pre-wrap;">${contactData.message}</p>
            </div>
          </div>

          <p style="margin-top: 30px;">Please respond to this inquiry as soon as possible.</p>
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
        email: contactData.email,
        name: contactData.name,
      },
    ],
    subject: 'Thank You for Contacting Hilbrick&Rockle',
    html: customerEmailHtml,
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
    subject: `New Contact Form: ${contactData.subject}`,
    html: adminEmailHtml,
  };

  try {
    // Send both emails via MailerSend API
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

    logger.info('Contact emails sent successfully', {
      customerEmail: contactData.email,
      customerResponseStatus: customerResponse.status,
      adminResponseStatus: adminResponse.status,
    });
  } catch (error: any) {
    logger.error('Error sending contact emails via MailerSend', {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error(`Failed to send confirmation emails: ${error.message}`);
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    logger.warn('Invalid method for contact submission', { method: req.method });
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body;
    
    const contactData: ContactData = {
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
    };
    
    // Validate input
    const validationErrors = await validateContactForm(contactData);
    if (validationErrors.length > 0) {
      logger.warn('Contact form validation failed', { errors: validationErrors });
      return res.status(400).json({ 
        error: validationErrors.join(', '),
        errors: validationErrors 
      });
    }

    // Create contact message in Supabase
    const insertData = {
      name: contactData.name.trim(),
      email: contactData.email.trim(),
      phone: contactData.phone?.trim() || null,
      subject: contactData.subject.trim(),
      message: contactData.message.trim(),
      status: 'pending',
      // Don't manually set created_at, let database default handle it
    };

    // Use admin client to bypass RLS for server-side inserts
    const supabaseAdmin = getSupabaseAdmin();
    const { data: contactRecord, error: supabaseError } = await supabaseAdmin
      .from('contact_messages')
      .insert([insertData])
      .select('id')
      .single();

    if (supabaseError) {
      logger.error('Error creating contact message', { error: supabaseError.message });
      return res.status(500).json({
        error: 'Failed to create contact message',
        message: supabaseError.message,
        details: process.env.NODE_ENV === 'development' ? supabaseError.message : undefined,
      });
    }

    // Send emails via MailerSend
    try {
      await sendContactEmail(contactData);
    } catch (emailError) {
      logger.error('Error sending contact emails', { error: emailError });
      // Don't fail the request if email fails, message is still saved
    }

    logger.info('Contact message created successfully', { 
      messageId: contactRecord?.id,
      email: contactData.email 
    });

    return res.status(200).json({
      success: true,
      message: 'Contact message received successfully. You will receive a confirmation email shortly.',
      id: contactRecord?.id
    });
  } catch (error) {
    logger.error('Error handling contact submission', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
}

export default withErrorHandler(withRateLimit(handler, {
  maxRequests: 10, // Stricter rate limit for contact form
  windowMs: 60 * 1000 // per minute
})); 