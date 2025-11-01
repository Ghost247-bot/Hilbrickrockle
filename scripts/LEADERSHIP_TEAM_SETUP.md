# Leadership Team Database Setup

This guide explains how to add the leadership team members from the About page to the lawyers database.

## Files Created

1. `insert-leadership-team.sql` - SQL script for manual database insertion
2. `insert-leadership-team.ts` - TypeScript script for automated insertion

## Method 1: Using TypeScript Script (Recommended)

### Prerequisites
- Node.js installed
- All npm dependencies installed
- Environment variables configured in `.env.local`

### Steps

1. **Ensure you're in the project root directory**

2. **Run the script**:
   ```bash
   npm run insert-team
   ```

   Or directly with ts-node:
   ```bash
   ts-node scripts/insert-leadership-team.ts
   ```

3. **Verify the insertion**:
   The script will print a summary of all lawyers in the database after insertion.

## Method 2: Using SQL Script (Manual)

### Steps

1. **Open Supabase Dashboard**
   - Go to your Supabase project
   - Navigate to SQL Editor

2. **Copy the SQL script**
   - Open `scripts/insert-leadership-team.sql`
   - Copy the entire content

3. **Run the script**
   - Paste into SQL Editor
   - Click "Run" or press Ctrl+Enter

4. **Verify**
   - Check that 9 lawyers were inserted
   - View the lawyers table to confirm all data

## Leadership Team Members

The script inserts the following team members:

1. **John Smith** - Global Chair (LAW-001)
2. **Sarah Johnson** - Managing Partner (LAW-002)
3. **Michael Chen** - Executive Partner (LAW-003)
4. **Emily Davis** - Senior Partner (LAW-004)
5. **David Wilson** - Head of Litigation (LAW-005)
6. **Lisa Chang** - Head of Corporate (LAW-006)
7. **Robert Martinez** - Head of Real Estate (LAW-007)
8. **Amanda Foster** - Head of Employment (LAW-008)
9. **James Kim** - Head of Technology (LAW-009)

## Fields Added

Each lawyer will have:
- Lawyer ID (unique identifier)
- Name
- Email
- Phone number
- Title/Position
- Practice areas (array)
- Bio/Description
- Years of experience
- Status (active/inactive/on_leave)
- Image URL
- Reference code

## Table Schema Changes

The script automatically adds these columns if they don't exist:
- `title` - The lawyer's position/title
- `image_url` - Path to their profile image
- `ref_code` - Reference code for linking

## Updating Existing Data

Both scripts use `ON CONFLICT` or `upsert` to:
- Insert new lawyers if they don't exist
- Update existing lawyers if they do exist (based on lawyer_id)

## Verification

After running the script, you can verify by:

1. **Using the Admin Dashboard**:
   - Go to `/admin/lawyers`
   - You should see all 9 team members listed

2. **Using the API**:
   - Visit `http://localhost:3000/api/lawyers`
   - Check the JSON response

3. **Using Supabase Dashboard**:
   - View the `lawyers` table
   - All 9 members should be present

## Troubleshooting

### Error: "Column does not exist"
- Run the SQL script to add the new columns first
- Or manually add columns in Supabase: `title`, `image_url`, `ref_code`

### Error: "Table does not exist"
- Run `scripts/database-setup.sql` first to create the lawyers table

### Insertion fails silently
- Check Supabase RLS policies
- Verify service role key is correct
- Check logs for specific error messages

## Next Steps

After insertion, the leadership team members will be available:
- In the booking form for selection
- In the admin dashboard for management
- Through the lawyers API endpoint
- On the About page (if using dynamic data)

