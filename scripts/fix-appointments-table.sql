-- Fix appointments table to ensure lawyer_id column exists
-- Run this if you're getting errors about missing lawyer_id column

-- Add lawyer_id column if it doesn't exist
alter table public.appointments 
add column if not exists lawyer_id text;

-- Remove existing foreign key constraint if it exists (to avoid errors)
alter table public.appointments 
drop constraint if exists fk_appointments_lawyer;

-- Add foreign key constraint (only if lawyers table exists)
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'lawyers') then
    alter table public.appointments 
    add constraint fk_appointments_lawyer 
    foreign key (lawyer_id) references public.lawyers(lawyer_id) on delete set null;
  end if;
end $$;

-- Ensure appointments table has all required columns
do $$
begin
  -- Check and add columns if missing
  if not exists (select 1 from information_schema.columns where table_name = 'appointments' and column_name = 'updated_at') then
    alter table public.appointments add column updated_at timestamp with time zone default timezone('utc', now());
  end if;
end $$;

-- Update RLS policy to allow public inserts
drop policy if exists "Allow public to create appointments" on public.appointments;
create policy "Allow public to create appointments"
  on public.appointments for insert
  to public
  with check (true);

-- Verify the table structure
select column_name, data_type, is_nullable
from information_schema.columns
where table_name = 'appointments' and table_schema = 'public'
order by ordinal_position;

