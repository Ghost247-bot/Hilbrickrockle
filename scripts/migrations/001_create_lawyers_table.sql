-- ============================================
-- Migration: Create Lawyers Table
-- ============================================
-- Description: Creates the lawyers table with all necessary columns,
--              indexes, constraints, and RLS policies
-- Version: 1.0.0
-- Date: 2024
-- ============================================

-- Create lawyers table
create table if not exists public.lawyers (
  id uuid primary key default gen_random_uuid(),
  lawyer_id text not null unique,
  name text not null,
  email text not null,
  phone text,
  practice_areas text[] default '{}',
  bio text,
  experience_years integer,
  status text default 'active' check (status in ('active', 'inactive', 'on_leave')),
  created_at timestamp with time zone default timezone('utc', now()) not null,
  updated_at timestamp with time zone default timezone('utc', now()) not null
);

-- Create indexes for better query performance
create index if not exists idx_lawyers_lawyer_id on public.lawyers(lawyer_id);
create index if not exists idx_lawyers_status on public.lawyers(status);
create index if not exists idx_lawyers_email on public.lawyers(email);
create index if not exists idx_lawyers_created_at on public.lawyers(created_at desc);

-- Create function to automatically update updated_at timestamp
create or replace function update_lawyers_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
drop trigger if exists update_lawyers_updated_at on public.lawyers;
create trigger update_lawyers_updated_at
  before update on public.lawyers
  for each row
  execute function update_lawyers_updated_at();

-- Enable Row Level Security (RLS)
alter table public.lawyers enable row level security;

-- Drop existing policies if they exist (for idempotency)
drop policy if exists "Allow public to read active lawyers" on public.lawyers;
drop policy if exists "Allow authenticated users to read all lawyers" on public.lawyers;
drop policy if exists "Allow authenticated users to insert lawyers" on public.lawyers;
drop policy if exists "Allow authenticated users to update lawyers" on public.lawyers;
drop policy if exists "Allow authenticated users to delete lawyers" on public.lawyers;

-- Create RLS policies
-- Public can only read active lawyers (for booking form)
create policy "Allow public to read active lawyers"
  on public.lawyers for select
  to public
  using (status = 'active');

-- Authenticated users (admins) can read all lawyers
create policy "Allow authenticated users to read all lawyers"
  on public.lawyers for select
  to authenticated
  using (true);

-- Authenticated users (admins) can insert lawyers
create policy "Allow authenticated users to insert lawyers"
  on public.lawyers for insert
  to authenticated
  with check (true);

-- Authenticated users (admins) can update lawyers
create policy "Allow authenticated users to update lawyers"
  on public.lawyers for update
  to authenticated
  using (true)
  with check (true);

-- Authenticated users (admins) can delete lawyers
create policy "Allow authenticated users to delete lawyers"
  on public.lawyers for delete
  to authenticated
  using (true);

-- Insert sample data (only if table is empty)
do $$
begin
  if not exists (select 1 from public.lawyers limit 1) then
    insert into public.lawyers (lawyer_id, name, email, practice_areas, bio, experience_years) values
    ('LAW-001', 'John Smith', 'john.smith@haryawn.com', ARRAY['Corporate Law', 'M&A'], 'Senior Partner specializing in corporate law and M&A transactions', 15),
    ('LAW-002', 'Sarah Johnson', 'sarah.johnson@haryawn.com', ARRAY['Real Estate', 'Tax Law'], 'Expert in real estate transactions and tax planning', 12),
    ('LAW-003', 'Michael Chen', 'michael.chen@haryawn.com', ARRAY['Employment Law', 'Litigation'], 'Experienced employment attorney with focus on workplace compliance', 10),
    ('LAW-004', 'Emily Davis', 'emily.davis@haryawn.com', ARRAY['Tax Law', 'Corporate Law'], 'Tax specialist with extensive experience in corporate tax planning', 8),
    ('LAW-005', 'David Wilson', 'david.wilson@haryawn.com', ARRAY['Real Estate', 'M&A'], 'Real estate and commercial law expert', 14)
    on conflict (lawyer_id) do nothing;
  end if;
end $$;

-- ============================================
-- Migration Complete
-- ============================================

