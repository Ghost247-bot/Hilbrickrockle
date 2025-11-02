# Netlify Booking API Fix

## Problem
The booking API was failing on Netlify with a 500 error because:
1. Netlify is a serverless platform and doesn't support filesystem writes to directories like `public/uploads`
2. The code was trying to create directories and save files to the filesystem, which failed in serverless environments

## Solution Applied

### Changes to `src/pages/api/booking.ts`

1. **Used `/tmp` directory for serverless environments**
   - Netlify and Vercel provide a writable `/tmp` directory
   - Modified the code to detect serverless environment via `process.env.NETLIFY` or `process.env.VERCEL`
   - Files are now stored in `/tmp` instead of `public/uploads/booking`

2. **Graceful file handling**
   - Files are still processed for email attachments in serverless
   - In serverless mode, files are NOT permanently stored (they're only attached to emails)
   - Document metadata in database shows `'attached-to-email'` as the path
   - In local development, files are still saved to `public/uploads/booking/`

3. **Error handling improvements**
   - Changed directory creation errors from fatal to warnings
   - Booking submission continues even if directory creation fails
   - Better logging for debugging

### Key Code Changes

**Line 366-383**: Serverless-aware temporary directory handling
```typescript
const tempDir = process.env.VERCEL || process.env.NETLIFY 
  ? '/tmp' 
  : path.join(process.cwd(), 'public', 'uploads', 'booking');
```

**Line 486-591**: Conditional file storage based on environment
- Local: Files saved to `public/uploads/booking/`
- Serverless: Files only processed for email attachments

## Environment Variables Required

Make sure these are set in Netlify:

### Required for Booking
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Server-side only
MAILERSEND_API_KEY=your_mailersend_key
MAILERSEND_FROM_EMAIL=noreply@yourdomain.com
MAILERSEND_FROM_NAME=Your Legal Firm
NOTIFICATION_EMAIL=admin@yourdomain.com
```

### How to Set in Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site Settings** → **Environment Variables**
3. Add each variable:
   - Variable name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase URL
4. Repeat for all variables
5. Deploy again to apply changes

## Testing

### Local Testing
```bash
npm run dev
# Visit http://localhost:3000/booking
# Submit booking form
# Check: Files saved to public/uploads/booking/
```

### Netlify Testing
1. Deploy to Netlify
2. Visit your Netlify URL + `/booking`
3. Submit booking form
4. Check: 
   - Booking appears in Supabase `appointments` table
   - Emails sent with attachments
   - `documents` field shows `'attached-to-email'` paths

## File Storage Behavior

| Environment | File Upload | Database Storage | Email Attachments |
|------------|-------------|------------------|-------------------|
| Local Dev  | ✅ Saved to `public/uploads/` | ✅ Real file paths | ✅ Yes |
| Netlify    | ✅ Processed in `/tmp` | ✅ Metadata only | ✅ Yes |
| Vercel     | ✅ Processed in `/tmp` | ✅ Metadata only | ✅ Yes |

## Important Notes

- **Files are not permanently stored on Netlify** - they're deleted after processing
- **Email attachments work perfectly** - files are base64 encoded and sent
- **Database records are created** - but with metadata-only document info in serverless
- **Local development unchanged** - files still saved locally as before

## Troubleshooting

### "Server configuration error" on Netlify
- Check that environment variables are set in Netlify dashboard
- Redeploy after adding variables

### Files not in emails
- Check MailerSend API key is correct
- Verify domain is verified in MailerSend
- Check MailerSend logs for errors

### Database save fails
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set
- Check that `appointments` table exists in Supabase
- Check Supabase logs for details

## Related Files
- `src/pages/api/booking.ts` - Main booking API with fix
- `src/pages/booking.tsx` - Frontend booking form
- `src/lib/supabase.ts` - Supabase client configuration

