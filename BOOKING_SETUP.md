# Booking Page Setup Guide

This guide explains how to set up the booking page with MailerSend API integration.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# MailerSend API Configuration
MAILERSEND_API_KEY=your_mailersend_api_key_here
MAILERSEND_FROM_EMAIL=noreply@yourdomain.com
MAILERSEND_FROM_NAME=Hilbrick&Rockle Legal
NOTIFICATION_EMAIL=admin@yourdomain.com

# Supabase Configuration (should already exist)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## MailerSend Setup

1. **Create a MailerSend Account**
   - Go to [MailerSend](https://www.mailersend.com/)
   - Sign up for an account

2. **Verify Your Domain**
   - Add and verify your sending domain in MailerSend
   - This is required to send emails

3. **Generate API Token**
   - Navigate to Settings > API Tokens
   - Create a new API token with email sending permissions
   - Copy the token and add it to `MAILERSEND_API_KEY` in your `.env.local`

4. **Configure From Email**
   - Use a verified domain email address for `MAILERSEND_FROM_EMAIL`
   - Set a friendly name in `MAILERSEND_FROM_NAME`

5. **Set Notification Email**
   - Set `NOTIFICATION_EMAIL` to the email address where you want to receive booking notifications

## Features

### Booking Page (`/booking`)
- **Comprehensive Form**: Collects name, email, phone, date, time, practice area, and message
- **Document Upload**: Allows users to upload PDF, DOC, DOCX, PNG, JPG files (max 10MB each)
- **Drag & Drop**: Modern drag-and-drop interface for file uploads
- **Validation**: Client and server-side validation
- **Success/Error Feedback**: Clear visual feedback on form submission

### Email Functionality
- **Customer Confirmation**: Sends a beautifully formatted confirmation email to the customer
- **Admin Notification**: Sends a notification email to the admin with all booking details
- **Document Attachments**: Uploaded documents are attached to both emails
- **HTML Templates**: Professional HTML email templates with styling

### Database Storage
- All bookings are saved to Supabase `appointments` table
- Includes all form data, booking status, and assigned lawyer ID
- Lawyers are stored in the `lawyers` table

## Lawyer Selection
- Users can select a lawyer from a dropdown list
- Lawyers are fetched from the Supabase `lawyers` table
- Each lawyer has a unique ID (e.g., LAW-001), name, practice areas, bio, and experience
- The selected lawyer's information is displayed below the dropdown
- Lawyer assignment is included in booking emails and database records

## Setting Up Lawyers Table

Run the SQL script to create the lawyers table and add sample data:

```sql
-- See scripts/create-lawyers-table.sql for the full SQL script
```

The script will:
1. Create the `lawyers` table with all necessary fields
2. Add a foreign key relationship to the `appointments` table
3. Insert sample lawyers with IDs (LAW-001, LAW-002, etc.)
4. Set up Row Level Security policies

You can customize the sample lawyers or add more through the Supabase dashboard.

## API Endpoint

The booking API endpoint is located at `/api/booking` and:
- Accepts multipart/form-data for file uploads
- Validates all input data
- Saves booking to Supabase
- Sends emails via MailerSend API
- Handles file uploads securely

## File Upload Storage

- Uploaded files are temporarily stored in `public/uploads/booking/`
- Files are converted to Base64 for email attachments
- Temporary files are cleaned up after processing

## Testing

1. Fill out the booking form on `/booking`
2. Upload test documents (optional)
3. Submit the form
4. Check both customer and admin email inboxes
5. Verify booking appears in Supabase database

## Troubleshooting

### Emails Not Sending
- Verify MailerSend API key is correct
- Ensure domain is verified in MailerSend
- Check MailerSend dashboard for delivery status
- Review server logs for error messages

### File Upload Issues
- Ensure `public/uploads/booking/` directory exists
- Check file size limits (max 10MB)
- Verify file types are allowed (PDF, DOC, DOCX, PNG, JPG)

### Database Errors
- Verify Supabase connection
- Ensure `appointments` table exists with correct schema
- Check Supabase credentials

## Security Notes

- File uploads are validated for type and size
- All user input is validated and sanitized
- Rate limiting is applied to prevent abuse
- Error handling prevents sensitive information leakage

