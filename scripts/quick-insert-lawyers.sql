-- Quick script to insert lawyers if the table is empty
-- Run this in Supabase SQL Editor if no lawyers are showing up
-- 
-- IMPORTANT: If this doesn't work, use scripts/comprehensive-lawyers-setup.sql
-- which includes RLS policy setup and table creation.

-- First, ensure all necessary columns exist
ALTER TABLE public.lawyers 
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS image_url text,
ADD COLUMN IF NOT EXISTS ref_code text;

-- Ensure RLS policy exists (required for public access)
-- Drop and recreate to ensure it's correct
DROP POLICY IF EXISTS "Allow public to read active lawyers" ON public.lawyers;
CREATE POLICY "Allow public to read active lawyers"
  ON public.lawyers FOR SELECT
  TO public
  USING (status = 'active');

-- Insert leadership team as lawyers (upsert - will update if exists, insert if not)
INSERT INTO public.lawyers (lawyer_id, name, email, phone, title, practice_areas, bio, experience_years, status, image_url, ref_code) VALUES
('LAW-001', 'John Smith', 'john.smith@haryawn.com', '+1 (555) 123-4567', 'Global Chair', ARRAY['Corporate Law', 'M&A', 'Strategic Leadership'], 'Over 25 years of experience in corporate law and strategic leadership. Renowned for leading complex transactions and setting strategic direction for the firm globally.', 25, 'active', '/images/leadership/john-smith.jpg', 'GC-JS-001'),
('LAW-002', 'Sarah Johnson', 'sarah.johnson@haryawn.com', '+1 (555) 123-4568', 'Managing Partner', ARRAY['Real Estate', 'Tax Law', 'International Transactions'], 'Expert in international transactions and cross-border operations. Has successfully led multi-jurisdictional deals across multiple continents.', 18, 'active', '/images/leadership/sarah-johnson.jpg', 'MP-SJ-002'),
('LAW-003', 'Michael Chen', 'michael.chen@haryawn.com', '+1 (555) 123-4569', 'Executive Partner', ARRAY['Employment Law', 'Litigation', 'Technology Law'], 'Specialist in technology and innovation in legal services. Pioneer in implementing cutting-edge legal tech solutions and digital transformation initiatives.', 22, 'active', '/images/leadership/michael-chen.jpg', 'EP-MC-003'),
('LAW-004', 'Emily Davis', 'emily.davis@haryawn.com', '+1 (555) 123-4570', 'Senior Partner', ARRAY['Tax Law', 'Corporate Law', 'Mergers & Acquisitions'], 'Leading expert in mergers and acquisitions with global experience. Has completed over 100 M&A transactions with combined value exceeding $50 billion.', 20, 'active', '/images/leadership/emily-davis.jpg', 'SP-ED-004'),
('LAW-005', 'David Wilson', 'david.wilson@haryawn.com', '+1 (555) 123-4571', 'Head of Litigation', ARRAY['Real Estate', 'M&A', 'Commercial Litigation'], 'Renowned litigator with expertise in complex commercial disputes. Successfully defended clients in high-stakes cases across multiple jurisdictions.', 24, 'active', '/images/leadership/david-wilson.jpg', 'HL-DW-005'),
('LAW-006', 'Lisa Chang', 'lisa.chang@haryawn.com', '+1 (555) 123-4572', 'Head of Corporate', ARRAY['Corporate Law', 'Mergers & Acquisitions', 'Corporate Restructuring'], 'Specializes in corporate restructuring and strategic transactions. Expert in helping companies navigate complex regulatory environments.', 16, 'active', '/images/leadership/lisa-chang.jpg', 'HC-LC-006'),
('LAW-007', 'Robert Martinez', 'robert.martinez@haryawn.com', '+1 (555) 123-4573', 'Head of Real Estate', ARRAY['Real Estate', 'Property Development', 'Real Estate Finance'], 'Expert in commercial real estate and property development law. Has structured real estate deals worth over $10 billion throughout career.', 19, 'active', '/images/leadership/robert-martinez.jpg', 'HR-RM-007'),
('LAW-008', 'Amanda Foster', 'amanda.foster@haryawn.com', '+1 (555) 123-4574', 'Head of Employment', ARRAY['Employment Law', 'Workplace Regulations', 'Labor Relations'], 'Specializes in employment law and workplace regulations. Provides strategic counsel to Fortune 500 companies on employment matters.', 17, 'active', '/images/leadership/amanda-foster.jpg', 'HE-AF-008'),
('LAW-009', 'James Kim', 'james.kim@haryawn.com', '+1 (555) 123-4575', 'Head of Technology', ARRAY['Technology Law', 'Digital Transformation', 'Intellectual Property'], 'Leading expert in technology law and digital transformation. Advises tech companies on regulatory compliance and emerging legal challenges in the digital age.', 14, 'active', '/images/leadership/james-kim.jpg', 'HT-JK-009')
ON CONFLICT (lawyer_id) 
DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  title = EXCLUDED.title,
  practice_areas = EXCLUDED.practice_areas,
  bio = EXCLUDED.bio,
  experience_years = EXCLUDED.experience_years,
  status = EXCLUDED.status,
  image_url = EXCLUDED.image_url,
  ref_code = EXCLUDED.ref_code,
  updated_at = timezone('utc', now());

-- Verify the insertions
SELECT 
  lawyer_id,
  name,
  title,
  practice_areas,
  status
FROM public.lawyers
WHERE status = 'active'
ORDER BY lawyer_id;

-- Show count
SELECT COUNT(*) as total_active_lawyers 
FROM public.lawyers 
WHERE status = 'active';

