-- Appointments table
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  date date not null,
  time text not null,
  practice_area text not null,
  message text,
  status text default 'pending',
  documents jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- Contact messages table
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

-- Job applications table
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  position text not null,
  location text not null,
  resume text, -- Base64 encoded resume or file path
  cover_letter text,
  linkedin_url text,
  portfolio_url text,
  years_of_experience text,
  availability text,
  additional_info text,
  status text default 'pending',
  notes text,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);