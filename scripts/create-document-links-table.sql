-- ============================================
-- DOCUMENT LINKS TABLE FOR SECURE DOCS
-- ============================================

create table if not exists public.document_links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  client_name text,
  client_email text,
  password_hash text not null, -- bcrypt hashed password
  unique_token uuid not null default gen_random_uuid(), -- Unique token for the link
  document_url text, -- URL to the document (can be file path or external URL)
  uploaded_document_url text, -- If client uploads a document
  status text default 'pending', -- pending, completed, expired
  expires_at timestamp with time zone, -- Optional expiration date
  created_by uuid references auth.users(id) on delete set null, -- Admin who created it
  created_at timestamp with time zone default timezone('utc', now()) not null,
  updated_at timestamp with time zone default timezone('utc', now()) not null,
  accessed_at timestamp with time zone, -- When the document was last accessed
  completed_at timestamp with time zone -- When the document was signed/completed
);

-- Create indexes for faster lookups
create index if not exists idx_document_links_token on public.document_links(unique_token);
create index if not exists idx_document_links_client_email on public.document_links(client_email);
create index if not exists idx_document_links_status on public.document_links(status);
create index if not exists idx_document_links_created_by on public.document_links(created_by);

-- Enable RLS
alter table public.document_links enable row level security;

-- Policies
-- Allow authenticated users (admins) to manage all document links
drop policy if exists "Allow authenticated users to manage document links" on public.document_links;
create policy "Allow authenticated users to manage document links"
  on public.document_links for all
  to authenticated
  using (true)
  with check (true);

-- Allow public to read document links by token (for password verification)
drop policy if exists "Allow public to read document links by token" on public.document_links;
create policy "Allow public to read document links by token"
  on public.document_links for select
  to public
  using (true);

-- Allow public to update document links (for client uploads and status updates)
drop policy if exists "Allow public to update document links" on public.document_links;
create policy "Allow public to update document links"
  on public.document_links for update
  to public
  using (true);

-- Apply updated_at trigger
drop trigger if exists update_document_links_updated_at on public.document_links;
create trigger update_document_links_updated_at
  before update on public.document_links
  for each row
  execute function update_updated_at_column();

