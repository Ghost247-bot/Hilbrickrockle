# Documents Migration Guide

This migration adds support for storing and displaying documents submitted by users during appointment bookings.

## What Was Changed

### 1. Database Migration
- Added `documents` column (JSONB) to `appointments` table
- Added GIN index for efficient JSONB queries
- Documents are stored as an array of metadata objects

### 2. Booking API (`src/pages/api/booking.ts`)
- Files are now saved permanently in `public/uploads/booking/` directory
- Document metadata is stored in the database instead of being deleted
- Files are given unique names with timestamps to avoid conflicts
- Documents include: filename, path, type, size, and uploaded_at timestamp

### 3. Admin Appointments Page (`src/pages/admin/appointments.tsx`)
- Shows document count indicator in the appointments table
- Displays full document list in the "View Note" modal
- Documents are clickable and open in a new tab

### 4. Admin Dashboard (`src/pages/admin/dashboard.tsx`)
- Added new stat card showing "Appointments with Documents"
- Displays count of appointments that have uploaded documents

### 5. Stats API (`src/pages/api/admin/stats.ts`)
- Added `appointmentsWithDocuments` to statistics
- Counts appointments that have at least one document

## Running the Migration

### Step 1: Run the Migration SQL

Go to your Supabase SQL Editor and run:

**File:** `scripts/add-documents-to-appointments.sql`

This will:
- Add the `documents` column if it doesn't exist
- Create a GIN index for efficient queries
- Set default value to empty array

### Step 2: Verify Migration

After running the migration, verify it worked:

```sql
-- Check if column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'appointments' 
AND column_name = 'documents';

-- Check if index exists
SELECT indexname 
FROM pg_indexes 
WHERE tablename = 'appointments' 
AND indexname = 'idx_appointments_documents';
```

### Step 3: Test Document Upload

1. Go to the booking page (`/booking`)
2. Fill out the form and upload a document
3. Submit the booking
4. Check the admin dashboard - you should see:
   - Document count in appointments table
   - "Appointments with Documents" stat updated
   - Documents visible when clicking "View Note"

## Document Storage

- **Location:** `public/uploads/booking/`
- **Naming:** `{sanitized_filename}_{timestamp}.{extension}`
- **Format:** Files are stored as-is, metadata is in database
- **Access:** Documents are accessible via `/uploads/booking/{filename}`

## Document Metadata Structure

```json
[
  {
    "filename": "original_filename.pdf",
    "path": "/uploads/booking/sanitized_name_1234567890.pdf",
    "type": "application/pdf",
    "size": 123456,
    "uploaded_at": "2025-10-31T10:00:00.000Z"
  }
]
```

## Notes

- Existing appointments will have `documents: null` or `documents: []`
- New bookings will automatically save documents if uploaded
- Documents are still attached to emails as before
- Files are preserved (not deleted after email sending)

## Troubleshooting

### Documents Not Showing
1. Verify the migration ran successfully
2. Check that files exist in `public/uploads/booking/`
3. Ensure the appointments table has the `documents` column
4. Check browser console for errors

### Files Not Saving
1. Ensure `public/uploads/booking/` directory exists and is writable
2. Check file size limits (currently 10MB)
3. Review server logs for file upload errors

### Dashboard Not Updating
1. Refresh the dashboard page
2. Check browser console for API errors
3. Verify the stats API is returning `appointmentsWithDocuments`

