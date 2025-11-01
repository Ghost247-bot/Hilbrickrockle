# 🚀 Quick Setup Summary

## Database Setup (REQUIRED)

### 1. Run SQL Script in Supabase

**Location:** `scripts/database-setup.sql`

**Steps:**
1. Open https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor** → **New Query**
4. Copy/paste entire `scripts/database-setup.sql` file
5. Click **Run**

**What it creates:**
- ✅ `appointments` table (with lawyer_id support)
- ✅ `contact_messages` table  
- ✅ `lawyers` table (with 5 sample lawyers)
- ✅ `admins` table
- ✅ All security policies and indexes

**Time:** ~2 minutes

---

## Backend Setup (OPTIONAL)

The Express backend in `backend-new/` is **optional**. The Next.js app uses Supabase directly.

### If you want to use Express backend:

```bash
cd backend-new
npm install
npm run dev
```

---

## Verification

### Option 1: Automated Check
```bash
npm run verify-db
```

### Option 2: Manual Check
1. Supabase Dashboard → **Table Editor**
2. Verify you see: `appointments`, `contact_messages`, `lawyers`, `admins`
3. Check `lawyers` table has 5 sample records

---

## Environment Variables

✅ **Already Configured in `.env.local`:**
- Supabase credentials
- MailerSend API key
- Email addresses

✅ **No Additional Setup Needed**

---

## Test Your Setup

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Test booking form:**
   - Visit: http://localhost:3000/booking
   - Fill form, select a lawyer, submit
   - Check Supabase table editor for the record
   - Check your email for confirmation

3. **Test contact form:**
   - Visit: http://localhost:3000/contact
   - Submit a message
   - Verify in `contact_messages` table
   - Check emails sent

4. **Test lawyers API:**
   - Visit: http://localhost:3000/api/lawyers
   - Should return JSON with lawyers list

---

## 📚 Documentation Files

- **`DATABASE_SETUP.md`** - Detailed database setup guide
- **`SETUP_GUIDE.md`** - Complete setup guide (database + backend)
- **`BOOKING_SETUP.md`** - Booking system setup details
- **`scripts/database-setup.sql`** - Complete SQL setup script
- **`scripts/verify-database.ts`** - Database verification script

---

## ✅ You're Done!

After running the SQL script, your database is ready. The application will:
- Accept bookings with lawyer selection
- Process contact form submissions  
- Send emails via MailerSend
- Store everything in Supabase

---

## 🔧 Troubleshooting

**Tables not created?**
- Make sure you ran the SQL in Supabase SQL Editor
- Check for any error messages in Supabase

**API errors?**
- Verify Supabase credentials in `.env.local`
- Check Supabase dashboard for connection issues

**Email not sending?**
- Verify MailerSend API key is correct
- Ensure domain is verified in MailerSend dashboard

---

## 🎯 Next Steps

1. ✅ Run `scripts/database-setup.sql` in Supabase
2. ✅ Test booking/contact forms
3. ✅ Customize lawyers in Supabase dashboard
4. ✅ Verify emails are being sent
5. ✅ Start using the application!

