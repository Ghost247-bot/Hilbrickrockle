# Netlify Booking API 500 Error - Fix Summary

## Problem
Booking submissions worked locally but returned 500 on Netlify.

## Root Cause
Netlify is serverless:
- No writable filesystem except `/tmp`
- Filesystem writes to `public/uploads` failed
- This caused the 500 error

## Fix Applied

### 1. Serverless Environment Detection
The code now checks multiple environment variables to detect serverless:

```javascript
const isServerless = 
  process.env.VERCEL || 
  process.env.NETLIFY_DEPLOY_PRIME_URL || 
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.NETLIFY;
```

### 2. `/tmp` Directory Usage
Uses `/tmp` for uploads in serverless:

```javascript
const tempDir = isServerless 
  ? '/tmp' 
  : path.join(process.cwd(), 'public', 'uploads', 'booking');
```

### 3. Serverless File Handling
- Local: files saved to `public/uploads/booking/` with database paths
- Serverless: files only processed for email attachments
- Database field `documents[].path` = `"attached-to-email"` in serverless

### 4. Error Logging
Added `console.error` for Netlify logs:

```javascript
console.error('Error creating upload directory:', dirError.message);
console.error('Exception during booking insert:', errorMsg);
console.error('Error saving booking to database:', supabaseError.message);
```

## Environment Variables Required

Set these in Netlify dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=https://ipnypoelihxzwxywpaab.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
MAILERSEND_API_KEY=<your_mailersend_key>
MAILERSEND_FROM_EMAIL=noreply@hilbrickrockle.pro
MAILERSEND_FROM_NAME=Hilbrick&Rockle Legal
NOTIFICATION_EMAIL=admin@hilbrickrockle.pro
```

## Testing

1. Deploy to Netlify
2. Open `/booking`
3. Submit with or without files
4. Check:
   - ✅ Success message
   - ✅ Database record in `appointments`
   - ✅ Emails sent with attachments
   - ✅ No 500 errors

## File Storage Behavior

| Environment | Local Files | Email Attachments | Database |
|-------------|-------------|-------------------|----------|
| Local Dev   | ✅ Saved   | ✅ Yes            | ✅ Paths |
| Netlify     | ❌ Temp    | ✅ Yes            | ✅ Metadata |

Files in serverless:
- Processed from `/tmp` only
- Attached to emails (base64)
- Cleaned up immediately
- Path in DB: `"attached-to-email"`

## Files Modified

- `src/pages/api/booking.ts` - Main fix

## Related Documentation

- `NETLIFY_BOOKING_FIX.md` - Detailed guide
- `NETLIFY_ENV_FIX.md` - Environment setup
- `NETLIFY_DEPLOYMENT.md` - Deployment guide

