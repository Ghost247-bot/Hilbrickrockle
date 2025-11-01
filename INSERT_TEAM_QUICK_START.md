# Quick Start: Insert Leadership Team to Database

## 🚀 Run the Script

Simply run this command in your terminal:

```bash
npm run insert-team
```

## 📋 What This Does

1. Inserts 9 leadership team members into the `lawyers` database table
2. Includes all their details: name, title, email, phone, practice areas, bio, experience
3. Updates existing records if they already exist
4. Shows a summary of all lawyers after completion

## ✅ After Running

Once the script completes, the leadership team will be available:

1. **In the Booking Form** (`/booking`)
   - Dropdown will show all team members
   - Format: "Name - Title (Practice Areas)"
   - Example: "John Smith - Global Chair (Corporate Law, Strategic Leadership)"

2. **In Admin Dashboard** (`/admin/lawyers`)
   - Full management interface
   - Edit, view, and manage team members

3. **Via API** (`/api/lawyers`)
   - JSON endpoint with all lawyer data

## 🎯 Expected Output

```
Starting to insert leadership team members...

Ensuring table structure is correct...
✅ Successfully inserted/updated: John Smith (LAW-001)
✅ Successfully inserted/updated: Sarah Johnson (LAW-002)
✅ Successfully inserted/updated: Michael Chen (LAW-003)
✅ Successfully inserted/updated: Emily Davis (LAW-004)
✅ Successfully inserted/updated: David Wilson (LAW-005)
✅ Successfully inserted/updated: Lisa Chang (LAW-006)
✅ Successfully inserted/updated: Robert Martinez (LAW-007)
✅ Successfully inserted/updated: Amanda Foster (LAW-008)
✅ Successfully inserted/updated: James Kim (LAW-009)

✅ Leadership team insertion complete!

📊 Total lawyers in database: 9
  - LAW-001: John Smith (Global Chair)
  - LAW-002: Sarah Johnson (Managing Partner)
  - LAW-003: Michael Chen (Executive Partner)
  - LAW-004: Emily Davis (Senior Partner)
  - LAW-005: David Wilson (Head of Litigation)
  - LAW-006: Lisa Chang (Head of Corporate)
  - LAW-007: Robert Martinez (Head of Real Estate)
  - LAW-008: Amanda Foster (Head of Employment)
  - LAW-009: James Kim (Head of Technology)
```

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure `.env.local` file exists
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set

### No lawyers appear in booking form
- Check browser console for errors
- Verify the `/api/lawyers` endpoint returns data
- Ensure lawyers have `status: 'active'`

### Table doesn't exist
- Run `scripts/database-setup.sql` in Supabase SQL Editor first

## 📝 Alternative: Manual SQL Insert

If you prefer to run SQL directly:

1. Open Supabase SQL Editor
2. Copy contents from `scripts/insert-leadership-team.sql`
3. Run the script
4. Verify in Supabase Table Editor

---

**That's it!** Your booking form will now fetch and display all leadership team members from the database. 🎉

