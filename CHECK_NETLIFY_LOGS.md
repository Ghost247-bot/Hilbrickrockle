# How to Check Netlify Logs

## Quick Steps

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Select your site

2. **Navigate to Functions**
   - Click **Functions** in the left sidebar
   - You should see `/api/booking` in the list

3. **View Logs**
   - Click on `/api/booking` function
   - Click **Logs** tab
   - You'll see real-time logs

4. **Trigger a Test**
   - Keep the logs tab open
   - Open your Netlify site in another tab
   - Submit the booking form
   - Watch logs appear in real-time

## What to Look For

### Good Logs (Working)
```
Booking API handler called { method: 'POST', url: '/api/booking', ... }
Starting booking processing...
Environment check: { isServerless: true, ... }
Using temp directory: /tmp
Directory ready: /tmp
```

### Bad Logs (Error)
Look for these error messages:
- "Error creating upload directory"
- "Error creating formidable form"
- "Error parsing form data"
- Any stack trace

### Environment Variables Check
You should see:
```
isServerless: true
NETLIFY_DEPLOY_PRIME_URL: true
```

If `isServerless: false`, Netlify environment variables aren't being detected!

## If You See Errors

### Error: "Error creating upload directory"
**Meaning:** Can't create `/tmp` directory
**Fix:** This is expected - the code continues anyway

### Error: "Error parsing form data"
**Meaning:** Formidable can't parse the request
**Possible causes:**
- Request format issue
- File too large
- Encoding problem

### No Logs at All
**Meaning:** Handler not being called
**Possible causes:**
- Wrong URL
- Middleware blocking the request
- Function not deployed

## Share the Logs

If you're still seeing 500 errors:
1. Copy the log output
2. Share it so we can debug further

The logs will tell us exactly where the failure is!

