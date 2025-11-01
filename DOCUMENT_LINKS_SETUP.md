# Secure Document Links Setup Guide

This feature allows admins to create password-protected document links for clients to sign and upload documents.

## Setup Instructions

### 1. Create Database Table

Run the SQL script in Supabase SQL Editor:

```bash
# The script is located at:
scripts/create-document-links-table.sql
```

Or copy and paste the SQL from `scripts/create-document-links-table.sql` into your Supabase SQL Editor.

### 2. Features

#### Admin Features:
- Create secure document links with password protection
- Set title, description, client info, and expiration date
- View all created links and their status
- Copy links to share with clients
- Delete document links
- Track when documents are accessed and completed

#### Client Features:
- Access documents via unique token link
- Enter password to unlock document
- Download/view documents
- Upload signed documents
- Drag-and-drop file upload support

### 3. Usage

#### Creating a Document Link (Admin):

1. Login to Admin Dashboard
2. Click on "Document Links" in the header or quick actions
3. Click "Create Link" button
4. Fill in the form:
   - **Title** (required): Name of the document
   - **Description** (optional): Additional details
   - **Client Name** (optional): Name of the client
   - **Client Email** (optional): Email of the client
   - **Access Password** (required): Password client will use to access
   - **Document URL** (optional): Link to the document (PDF, etc.)
   - **Expires At** (optional): When the link expires
5. Click "Create Link"
6. Copy the generated link and share with client

#### Client Accessing Document:

1. Client receives unique link (e.g., `https://yoursite.com/document/unique-token`)
2. Client enters the password provided by admin
3. Document is unlocked and displayed
4. Client can:
   - View/download the document
   - Upload signed version via drag-and-drop or file selection
5. After upload, document status changes to "completed"

### 4. API Endpoints

#### Admin Endpoints (`/api/admin/document-links`):

- **GET**: List all document links
- **POST**: Create new document link
- **PUT**: Update document link (password, status, etc.)
- **DELETE**: Delete document link

#### Client Access Endpoint (`/api/document-access`):

- **POST with action='verify'**: Verify password and get document access
- **POST with action='upload'**: Upload client document

### 5. Database Schema

The `document_links` table includes:
- `id` - Unique identifier
- `title` - Document title
- `description` - Document description
- `client_name` - Client name
- `client_email` - Client email
- `password_hash` - Bcrypt hashed password
- `unique_token` - Unique UUID for the link
- `document_url` - URL to original document
- `uploaded_document_url` - URL to client-uploaded document
- `status` - pending/completed/expired
- `expires_at` - Expiration timestamp
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
- `accessed_at` - Last access timestamp
- `completed_at` - Completion timestamp
- `created_by` - Admin who created it

### 6. Security Features

- Password protection with bcrypt hashing
- Unique tokens for each link (UUID)
- Optional expiration dates
- Access tracking (accessed_at timestamp)
- RLS (Row Level Security) policies
- Admin-only access to management features

### 7. File Upload

Currently, the upload feature stores file URLs. For production, you should:

1. Upload files to cloud storage (AWS S3, Supabase Storage, etc.)
2. Update the `uploaded_document_url` with the cloud storage URL
3. Implement file size limits
4. Validate file types
5. Add virus scanning

Example implementation using Supabase Storage:

```typescript
// In the upload handler
const { data, error } = await supabase.storage
  .from('document-uploads')
  .upload(`${token}/${file.name}`, file);

if (!error) {
  const uploadedUrl = supabase.storage
    .from('document-uploads')
    .getPublicUrl(`${token}/${file.name}`);
  
  // Save uploadedUrl to database
}
```

### 8. Testing

1. **Create a test link**:
   - Go to `/admin/document-links`
   - Create a new document link
   - Copy the generated link

2. **Test client access**:
   - Open the link in incognito/private window
   - Enter the password
   - Verify document is displayed
   - Upload a test document

3. **Verify in admin dashboard**:
   - Check that status changed to "completed"
   - Verify uploaded document is listed

### 9. Troubleshooting

**Password not working**:
- Check that password was set correctly when creating link
- Verify bcrypt hashing is working

**Link not found**:
- Verify token is correct in URL
- Check database for the document_link record

**Upload not working**:
- Check file size limits
- Verify file type is allowed
- Check browser console for errors

**RLS errors**:
- Verify RLS policies are created
- Check user permissions in Supabase

### 10. Future Enhancements

- Email notifications when document is uploaded
- Digital signature integration (DocuSign, HelloSign)
- Bulk document creation
- Document templates
- Analytics and reporting
- Comment/annotation system
- Version control for documents
- Multi-party signing workflow

## Support

For issues or questions, check:
- Supabase logs for database errors
- Browser console for frontend errors
- Server logs for API errors

