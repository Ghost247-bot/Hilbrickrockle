-- ============================================
-- Complete Database Setup Script for Haryawn Legal
-- ============================================
-- Run this script in your Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. APPOINTMENTS TABLE
-- ============================================
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  date date not null,
  time text not null,
  practice_area text not null,
  lawyer_id text,
  message text,
  status text default 'pending',
  documents jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- Create index on email for faster lookups
create index if not exists idx_appointments_email on public.appointments(email);
create index if not exists idx_appointments_date on public.appointments(date);
create index if not exists idx_appointments_status on public.appointments(status);
create index if not exists idx_appointments_documents on public.appointments using GIN (documents);

-- ============================================
-- 2. CONTACT MESSAGES TABLE
-- ============================================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- Create index on email and status
create index if not exists idx_contact_messages_email on public.contact_messages(email);
create index if not exists idx_contact_messages_status on public.contact_messages(status);

-- ============================================
-- 3. LAWYERS TABLE
-- ============================================
create table if not exists public.lawyers (
  id uuid primary key default gen_random_uuid(),
  lawyer_id text not null unique,
  name text not null,
  email text not null,
  phone text,
  practice_areas text[],
  bio text,
  experience_years integer,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- Create indexes
create index if not exists idx_lawyers_lawyer_id on public.lawyers(lawyer_id);
create index if not exists idx_lawyers_status on public.lawyers(status);

-- Insert sample lawyers
insert into public.lawyers (lawyer_id, name, email, practice_areas, bio, experience_years) values
('LAW-001', 'John Smith', 'john.smith@haryawn.com', ARRAY['Corporate Law', 'M&A'], 'Senior Partner specializing in corporate law and M&A transactions', 15),
('LAW-002', 'Sarah Johnson', 'sarah.johnson@haryawn.com', ARRAY['Real Estate', 'Tax Law'], 'Expert in real estate transactions and tax planning', 12),
('LAW-003', 'Michael Chen', 'michael.chen@haryawn.com', ARRAY['Employment Law', 'Litigation'], 'Experienced employment attorney with focus on workplace compliance', 10),
('LAW-004', 'Emily Davis', 'emily.davis@haryawn.com', ARRAY['Tax Law', 'Corporate Law'], 'Tax specialist with extensive experience in corporate tax planning', 8),
('LAW-005', 'David Wilson', 'david.wilson@haryawn.com', ARRAY['Real Estate', 'M&A'], 'Real estate and commercial law expert', 14)
on conflict (lawyer_id) do nothing;

-- ============================================
-- 4. ADD FOREIGN KEY RELATIONSHIP
-- ============================================
-- Add lawyer_id column if it doesn't exist (already handled above)
alter table public.appointments 
add column if not exists lawyer_id text;

-- Add foreign key constraint (drop first if exists to avoid errors)
do $$
begin
  if not exists (
    select 1 from pg_constraint 
    where conname = 'fk_appointments_lawyer'
  ) then
    alter table public.appointments 
    add constraint fk_appointments_lawyer 
    foreign key (lawyer_id) references public.lawyers(lawyer_id) on delete set null;
  end if;
end $$;

-- ============================================
-- 5. ADMINS TABLE (for admin dashboard)
-- ============================================
create table if not exists public.admins (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamp with time zone default timezone('utc', now()) not null,
  updated_at timestamp with time zone default timezone('utc', now()) not null
);

-- ============================================
-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on appointments
alter table public.appointments enable row level security;

-- Enable RLS on contact_messages
alter table public.contact_messages enable row level security;

-- Enable RLS on lawyers
alter table public.lawyers enable row level security;

-- Enable RLS on admins
alter table public.admins enable row level security;

-- ============================================
-- 7. CREATE POLICIES
-- ============================================

-- Appointments policies
drop policy if exists "Allow public to create appointments" on public.appointments;
create policy "Allow public to create appointments"
  on public.appointments for insert
  to public
  with check (true);

drop policy if exists "Allow authenticated users to read appointments" on public.appointments;
create policy "Allow authenticated users to read appointments"
  on public.appointments for select
  to authenticated
  using (true);

drop policy if exists "Allow authenticated users to update appointments" on public.appointments;
create policy "Allow authenticated users to update appointments"
  on public.appointments for update
  to authenticated
  using (true);

-- Contact messages policies
drop policy if exists "Allow public to create contact messages" on public.contact_messages;
create policy "Allow public to create contact messages"
  on public.contact_messages for insert
  to public
  with check (true);

drop policy if exists "Allow authenticated users to read contact messages" on public.contact_messages;
create policy "Allow authenticated users to read contact messages"
  on public.contact_messages for select
  to authenticated
  using (true);

drop policy if exists "Allow authenticated users to update contact messages" on public.contact_messages;
create policy "Allow authenticated users to update contact messages"
  on public.contact_messages for update
  to authenticated
  using (true);

-- Lawyers policies
drop policy if exists "Allow public to read active lawyers" on public.lawyers;
create policy "Allow public to read active lawyers"
  on public.lawyers for select
  to public
  using (status = 'active');

drop policy if exists "Allow authenticated users to manage lawyers" on public.lawyers;
create policy "Allow authenticated users to manage lawyers"
  on public.lawyers for all
  to authenticated
  using (true)
  with check (true);

-- Admins policies
drop policy if exists "Allow authenticated users to read admin data" on public.admins;
create policy "Allow authenticated users to read admin data"
  on public.admins for select
  to authenticated
  using (true);

drop policy if exists "Allow authenticated users to insert admin data" on public.admins;
create policy "Allow authenticated users to insert admin data"
  on public.admins for insert
  to authenticated
  with check (true);

drop policy if exists "Allow authenticated users to update admin data" on public.admins;
create policy "Allow authenticated users to update admin data"
  on public.admins for update
  to authenticated
  using (true);

-- ============================================
-- 8. CREATE UPDATED_AT TRIGGER FUNCTION
-- ============================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

-- Apply trigger to appointments
drop trigger if exists update_appointments_updated_at on public.appointments;
create trigger update_appointments_updated_at
  before update on public.appointments
  for each row
  execute function update_updated_at_column();

-- Apply trigger to contact_messages
drop trigger if exists update_contact_messages_updated_at on public.contact_messages;
create trigger update_contact_messages_updated_at
  before update on public.contact_messages
  for each row
  execute function update_updated_at_column();

-- Apply trigger to lawyers
drop trigger if exists update_lawyers_updated_at on public.lawyers;
create trigger update_lawyers_updated_at
  before update on public.lawyers
  for each row
  execute function update_updated_at_column();

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- You can now verify the setup by:
-- 1. Checking that all tables exist in the Supabase dashboard
-- 2. Verifying that RLS policies are active
-- 3. Testing insert operations on each table

