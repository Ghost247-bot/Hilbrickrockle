# Complete Backend and Database Setup Guide

This guide will help you set up both the Supabase database (used by the Next.js frontend) and the optional Express backend.

## Table of Contents
1. [Supabase Database Setup](#supabase-database-setup)
2. [Express Backend Setup](#express-backend-setup)
3. [Environment Variables](#environment-variables)
4. [Verification](#verification)

---

## Supabase Database Setup

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor** from the left sidebar
3. Click **New Query**

### Step 2: Run the Complete Database Setup Script

1. Copy the entire contents of `scripts/database-setup.sql`
2. Paste it into the SQL Editor
3. Click **Run** or press `Ctrl+Enter`

This script will create:
- ✅ `appointments` table (with lawyer_id foreign key)
- ✅ `contact_messages` table
- ✅ `lawyers` table (with 5 sample lawyers)
- ✅ `admins` table
- ✅ All necessary indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Triggers for automatic `updated_at` timestamps

### Step 3: Verify Tables

After running the script, verify in Supabase:
1. Go to **Table Editor**
2. You should see these tables:
   - `appointments`
   - `contact_messages`
   - `lawyers`
   - `admins`

### Step 4: Check Sample Data

1. Go to **Table Editor** > `lawyers`
2. You should see 5 sample lawyers (LAW-001 through LAW-005)

---

## Express Backend Setup (Optional)

The Express backend in `backend-new/` is optional. The main Next.js application uses Supabase directly via API routes.

### If You Want to Use the Express Backend:

#### Step 1: Install Dependencies

```bash
cd backend-new
npm install
```

#### Step 2: Configure Environment Variables

Create `backend-new/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (if using MongoDB)
MONGODB_URI=mongodb://localhost:27017/law-firm

# Or Supabase Configuration (recommended)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here
```

#### Step 3: Build and Run

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

---

## Environment Variables

### Frontend (.env.local)

Your `.env.local` should contain:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hesqndgvsszpnmyucfka.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# MailerSend Configuration (already configured)
MAILERSEND_API_KEY=mlsn.bad9c7b273b631cbaf25a64910dc3f421b4413f78deb917fcd4418d92e11e5cb
MAILERSEND_FROM_EMAIL=noreply@haryawn.com
MAILERSEND_FROM_NAME=Haryawn Legal
NOTIFICATION_EMAIL=admin@haryawn.com

# Admin Configuration
ADMIN_EMAIL=admin@haryawn.com
```

### Get Supabase Service Role Key (Optional - for backend)

If you need the service role key for the backend:
1. Go to Supabase Dashboard
2. Navigate to **Settings** > **API**
3. Copy the **service_role** key (keep this secret!)
4. Add to `backend-new/.env` as `SUPABASE_SERVICE_ROLE_KEY`

---

## Verification

### Test Database Connection

1. **Test Supabase Connection:**
   ```bash
   # From project root
   npm run dev
   # Visit http://localhost:3000/api/test-db
   ```

2. **Test Booking System:**
   - Go to `/booking`
   - Fill out the form and submit
   - Check Supabase table editor to see the appointment record
   - Check your email for confirmation

3. **Test Contact Form:**
   - Go to `/contact`
   - Submit a message
   - Verify in `contact_messages` table
   - Check emails are sent

### Test Lawyers API

```bash
# Test lawyers endpoint
curl http://localhost:3000/api/lawyers
```

Should return JSON with list of lawyers.

---

## Database Schema Overview

### Appointments Table
- `id` (uuid) - Primary key
- `name` (text) - Client name
- `email` (text) - Client email
- `phone` (text, nullable) - Client phone
- `date` (date) - Appointment date
- `time` (text) - Appointment time
- `practice_area` (text) - Practice area
- `lawyer_id` (text) - Foreign key to lawyers.lawyer_id
- `message` (text, nullable) - Additional message
- `status` (text) - Default: 'pending'
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Contact Messages Table
- `id` (uuid) - Primary key
- `name` (text) - Sender name
- `email` (text) - Sender email
- `phone` (text, nullable) - Sender phone
- `subject` (text) - Message subject
- `message` (text) - Message content
- `status` (text) - Default: 'pending'
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Lawyers Table
- `id` (uuid) - Primary key
- `lawyer_id` (text) - Unique identifier (e.g., LAW-001)
- `name` (text) - Lawyer name
- `email` (text) - Lawyer email
- `phone` (text, nullable) - Lawyer phone
- `practice_areas` (text[]) - Array of practice areas
- `bio` (text, nullable) - Lawyer biography
- `experience_years` (integer, nullable) - Years of experience
- `status` (text) - Default: 'active'
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Admins Table
- `id` (uuid) - Primary key
- `user_id` (uuid) - Foreign key to auth.users
- `email` (text) - Admin email
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## Troubleshooting

### Issue: Tables Not Created
**Solution:** Make sure you're running the SQL script in the Supabase SQL Editor with proper permissions.

### Issue: RLS Policies Blocking Access
**Solution:** Check that the policies allow public access for inserts (bookings, contact forms) and authenticated access for reads.

### Issue: Foreign Key Constraint Errors
**Solution:** Make sure lawyers table is created before running the appointments foreign key constraint.

### Issue: MailerSend Emails Not Sending
**Solution:** 
- Verify MailerSend API key is correct
- Ensure domain is verified in MailerSend
- Check that `MAILERSEND_FROM_EMAIL` matches your verified domain

### Issue: Backend Not Connecting
**Solution:**
- Check MongoDB is running (if using MongoDB)
- Or update backend to use Supabase instead
- Verify environment variables are set correctly

---

## Next Steps

After setup is complete:

1. ✅ Test booking form with lawyer selection
2. ✅ Test contact form
3. ✅ Verify emails are being sent
4. ✅ Check admin dashboard access
5. ✅ Customize lawyer data in Supabase dashboard
6. ✅ Add more lawyers as needed

---

## Support

If you encounter issues:
1. Check Supabase logs in the dashboard
2. Check application logs
3. Verify all environment variables are set
4. Ensure MailerSend domain is verified

