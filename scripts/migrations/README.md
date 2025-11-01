# Database Migrations

This directory contains database migration scripts for the Hilbrick&Rockle Legal application.

## Available Migrations

### 001_create_lawyers_table.sql
Creates the lawyers table with all necessary columns, indexes, constraints, and RLS policies.

**Features:**
- Full CRUD support for lawyers
- Automatic timestamp management (created_at, updated_at)
- Row Level Security (RLS) policies
- Foreign key relationships
- Performance indexes

## How to Run Migrations

### Option 1: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of the migration file
5. Click **Run** (or press `Ctrl+Enter`)

### Option 2: Using Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db reset
# or
supabase migration up
```

### Option 3: Running Multiple Migrations

If you need to run the complete database setup:

1. Run `scripts/database-setup.sql` first (main setup script)
2. Then run individual migration files if needed

## Migration Details

### Lawyers Table Schema

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key (auto-generated) |
| `lawyer_id` | text | Unique identifier (e.g., LAW-001) |
| `name` | text | Full name (required) |
| `email` | text | Email address (required) |
| `phone` | text | Phone number (optional) |
| `practice_areas` | text[] | Array of practice areas |
| `bio` | text | Professional biography (optional) |
| `experience_years` | integer | Years of experience (optional) |
| `status` | text | Status: active, inactive, on_leave |
| `created_at` | timestamp | Auto-set on creation |
| `updated_at` | timestamp | Auto-updated on modification |

### Row Level Security (RLS)

- **Public users**: Can only read active lawyers (for booking form)
- **Authenticated users (admins)**: Full CRUD access

### Indexes

- `lawyer_id` (for fast lookups)
- `status` (for filtering)
- `email` (for searches)
- `created_at` (for sorting)

## Verification

After running migrations, verify the setup:

1. Go to Supabase Dashboard → **Table Editor**
2. You should see the `lawyers` table
3. Check that RLS is enabled
4. Verify indexes exist in the **Database** → **Indexes** section

## Troubleshooting

### "relation already exists" error
- The table already exists. This is safe to ignore if you're re-running the migration.

### "permission denied" error
- Make sure you have proper admin access to your Supabase project.
- Check that you're running the script in the correct project.

### RLS policies not working
- Make sure RLS is enabled: `ALTER TABLE public.lawyers ENABLE ROW LEVEL SECURITY;`
- Check that policies exist in the **Authentication** → **Policies** section.

## Sample Data

The migration includes sample lawyers if the table is empty:
- LAW-001: John Smith (Corporate Law, M&A)
- LAW-002: Sarah Johnson (Real Estate, Tax Law)
- LAW-003: Michael Chen (Employment Law, Litigation)
- LAW-004: Emily Davis (Tax Law, Corporate Law)
- LAW-005: David Wilson (Real Estate, M&A)

You can modify or remove sample data after running the migration.

