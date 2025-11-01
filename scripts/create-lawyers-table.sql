-- Create lawyers table
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

-- Insert sample lawyers (you can modify these)
insert into public.lawyers (lawyer_id, name, email, practice_areas, bio, experience_years) values
('LAW-001', 'John Smith', 'john.smith@Hilbrick&Rockle.com', ARRAY['Corporate Law', 'M&A'], 'Senior Partner specializing in corporate law and M&A transactions', 15),
('LAW-002', 'Sarah Johnson', 'sarah.johnson@Hilbrick&Rockle.com', ARRAY['Real Estate', 'Tax Law'], 'Expert in real estate transactions and tax planning', 12),
('LAW-003', 'Michael Chen', 'michael.chen@Hilbrick&Rockle.com', ARRAY['Employment Law', 'Litigation'], 'Experienced employment attorney with focus on workplace compliance', 10),
('LAW-004', 'Emily Davis', 'emily.davis@Hilbrick&Rockle.com', ARRAY['Tax Law', 'Corporate Law'], 'Tax specialist with extensive experience in corporate tax planning', 8),
('LAW-005', 'David Wilson', 'david.wilson@Hilbrick&Rockle.com', ARRAY['Real Estate', 'M&A'], 'Real estate and commercial law expert', 14)
on conflict (lawyer_id) do nothing;

-- Update appointments table to include lawyer_id
alter table public.appointments 
add column if not exists lawyer_id text,
add constraint fk_appointments_lawyer 
foreign key (lawyer_id) references public.lawyers(lawyer_id) on delete set null;

-- Enable Row Level Security
alter table public.lawyers enable row level security;

-- Create policy for reading lawyers (public read access)
drop policy if exists "Allow public to read active lawyers" on public.lawyers;
create policy "Allow public to read active lawyers"
  on public.lawyers for select
  to public
  using (status = 'active');

