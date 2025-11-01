# Quick Setup Instructions

## Database Setup (Required)

### 1. Run SQL Script in Supabase

1. Open Supabase Dashboard → SQL Editor
2. Copy/paste contents of `scripts/database-setup.sql`
3. Click Run

**Time: ~2 minutes**

## Backend Setup (Optional)

The Express backend is optional since Next.js uses Supabase directly.

### If using Express backend:

```bash
cd backend-new
npm install
npm run dev
```

**Time: ~3 minutes**

## Verify Setup

```bash
# Start frontend
npm run dev

# Test endpoints
# Visit: http://localhost:3000/api/lawyers
# Should return list of lawyers
```

## Required Environment Variables

Already configured in `.env.local`:
- ✅ Supabase credentials
- ✅ MailerSend API key
- ✅ Email addresses

## Done! 🎉

Your database is ready. You can now:
- Book appointments with lawyer selection
- Submit contact forms
- Receive email confirmations

