-- ============================================
-- COMPREHENSIVE LAWYERS SETUP SCRIPT
-- ============================================
-- This script ensures the lawyers table exists, has correct RLS policies,
-- and contains active lawyers for the booking form.
-- Run this in Supabase SQL Editor.
-- ============================================

-- Step 1: Create lawyers table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.lawyers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id text NOT NULL UNIQUE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  practice_areas text[] DEFAULT '{}',
  bio text,
  experience_years integer,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  created_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);

-- Step 2: Add optional columns if they don't exist
ALTER TABLE public.lawyers 
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS image_url text,
ADD COLUMN IF NOT EXISTS ref_code text;

-- Step 3: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_lawyers_lawyer_id ON public.lawyers(lawyer_id);
CREATE INDEX IF NOT EXISTS idx_lawyers_status ON public.lawyers(status);
CREATE INDEX IF NOT EXISTS idx_lawyers_email ON public.lawyers(email);

-- Step 4: Create trigger function for updated_at (if not exists)
CREATE OR REPLACE FUNCTION update_lawyers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 5: Create trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_lawyers_updated_at ON public.lawyers;
CREATE TRIGGER update_lawyers_updated_at
  BEFORE UPDATE ON public.lawyers
  FOR EACH ROW
  EXECUTE FUNCTION update_lawyers_updated_at();

-- Step 6: Enable Row Level Security
ALTER TABLE public.lawyers ENABLE ROW LEVEL SECURITY;

-- Step 7: Drop existing policies (for clean setup)
DROP POLICY IF EXISTS "Allow public to read active lawyers" ON public.lawyers;
DROP POLICY IF EXISTS "Allow authenticated users to read all lawyers" ON public.lawyers;
DROP POLICY IF EXISTS "Allow authenticated users to insert lawyers" ON public.lawyers;
DROP POLICY IF EXISTS "Allow authenticated users to update lawyers" ON public.lawyers;
DROP POLICY IF EXISTS "Allow authenticated users to delete lawyers" ON public.lawyers;
DROP POLICY IF EXISTS "Allow authenticated users to manage lawyers" ON public.lawyers;

-- Step 8: Create RLS policies
-- Public can read active lawyers (for booking form)
CREATE POLICY "Allow public to read active lawyers"
  ON public.lawyers FOR SELECT
  TO public
  USING (status = 'active');

-- Authenticated users (admins) can read all lawyers
CREATE POLICY "Allow authenticated users to read all lawyers"
  ON public.lawyers FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert lawyers
CREATE POLICY "Allow authenticated users to insert lawyers"
  ON public.lawyers FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update lawyers
CREATE POLICY "Allow authenticated users to update lawyers"
  ON public.lawyers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete lawyers
CREATE POLICY "Allow authenticated users to delete lawyers"
  ON public.lawyers FOR DELETE
  TO authenticated
  USING (true);

-- Step 9: Insert or update lawyers (upsert)
INSERT INTO public.lawyers (
  lawyer_id, 
  name, 
  email, 
  phone, 
  title, 
  practice_areas, 
  bio, 
  experience_years, 
  status, 
  image_url, 
  ref_code
) VALUES
('LAW-001', 'John Smith', 'john.smith@haryawn.com', '+1 (555) 123-4567', 'Global Chair', 
 ARRAY['Corporate Law', 'M&A', 'Strategic Leadership'], 
 'Over 25 years of experience in corporate law and strategic leadership. Renowned for leading complex transactions and setting strategic direction for the firm globally.', 
 25, 'active', '/images/leadership/john-smith.jpg', 'GC-JS-001'),

('LAW-002', 'Sarah Johnson', 'sarah.johnson@haryawn.com', '+1 (555) 123-4568', 'Managing Partner', 
 ARRAY['Real Estate', 'Tax Law', 'International Transactions'], 
 'Expert in international transactions and cross-border operations. Has successfully led multi-jurisdictional deals across multiple continents.', 
 18, 'active', '/images/leadership/sarah-johnson.jpg', 'MP-SJ-002'),

('LAW-003', 'Michael Chen', 'michael.chen@haryawn.com', '+1 (555) 123-4569', 'Executive Partner', 
 ARRAY['Employment Law', 'Litigation', 'Technology Law'], 
 'Specialist in technology and innovation in legal services. Pioneer in implementing cutting-edge legal tech solutions and digital transformation initiatives.', 
 22, 'active', '/images/leadership/michael-chen.jpg', 'EP-MC-003'),

('LAW-004', 'Emily Davis', 'emily.davis@haryawn.com', '+1 (555) 123-4570', 'Senior Partner', 
 ARRAY['Tax Law', 'Corporate Law', 'Mergers & Acquisitions'], 
 'Leading expert in mergers and acquisitions with global experience. Has completed over 100 M&A transactions with combined value exceeding $50 billion.', 
 20, 'active', '/images/leadership/emily-davis.jpg', 'SP-ED-004'),

('LAW-005', 'David Wilson', 'david.wilson@haryawn.com', '+1 (555) 123-4571', 'Head of Litigation', 
 ARRAY['Real Estate', 'M&A', 'Commercial Litigation'], 
 'Renowned litigator with expertise in complex commercial disputes. Successfully defended clients in high-stakes cases across multiple jurisdictions.', 
 24, 'active', '/images/leadership/david-wilson.jpg', 'HL-DW-005'),

('LAW-006', 'Lisa Chang', 'lisa.chang@haryawn.com', '+1 (555) 123-4572', 'Head of Corporate', 
 ARRAY['Corporate Law', 'Mergers & Acquisitions', 'Corporate Restructuring'], 
 'Specializes in corporate restructuring and strategic transactions. Expert in helping companies navigate complex regulatory environments.', 
 16, 'active', '/images/leadership/lisa-chang.jpg', 'HC-LC-006'),

('LAW-007', 'Robert Martinez', 'robert.martinez@haryawn.com', '+1 (555) 123-4573', 'Head of Real Estate', 
 ARRAY['Real Estate', 'Property Development', 'Real Estate Finance'], 
 'Expert in commercial real estate and property development law. Has structured real estate deals worth over $10 billion throughout career.', 
 19, 'active', '/images/leadership/robert-martinez.jpg', 'HR-RM-007'),

('LAW-008', 'Amanda Foster', 'amanda.foster@haryawn.com', '+1 (555) 123-4574', 'Head of Employment', 
 ARRAY['Employment Law', 'Workplace Regulations', 'Labor Relations'], 
 'Specializes in employment law and workplace regulations. Provides strategic counsel to Fortune 500 companies on employment matters.', 
 17, 'active', '/images/leadership/amanda-foster.jpg', 'HE-AF-008'),

('LAW-009', 'James Kim', 'james.kim@haryawn.com', '+1 (555) 123-4575', 'Head of Technology', 
 ARRAY['Technology Law', 'Digital Transformation', 'Intellectual Property'], 
 'Leading expert in technology law and digital transformation. Advises tech companies on regulatory compliance and emerging legal challenges in the digital age.', 
 14, 'active', '/images/leadership/james-kim.jpg', 'HT-JK-009')

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

-- Step 10: Ensure all lawyers have 'active' status
UPDATE public.lawyers 
SET status = 'active' 
WHERE lawyer_id IN ('LAW-001', 'LAW-002', 'LAW-003', 'LAW-004', 'LAW-005', 'LAW-006', 'LAW-007', 'LAW-008', 'LAW-009');

-- Step 11: Verification queries
-- Show all active lawyers
SELECT 
  lawyer_id,
  name,
  title,
  practice_areas,
  status,
  CASE 
    WHEN status = 'active' THEN '✅ Active' 
    ELSE '❌ ' || status 
  END as status_display
FROM public.lawyers
WHERE lawyer_id IN ('LAW-001', 'LAW-002', 'LAW-003', 'LAW-004', 'LAW-005', 'LAW-006', 'LAW-007', 'LAW-008', 'LAW-009')
ORDER BY lawyer_id;

-- Show count summary
SELECT 
  COUNT(*) FILTER (WHERE status = 'active') as active_lawyers,
  COUNT(*) FILTER (WHERE status = 'inactive') as inactive_lawyers,
  COUNT(*) FILTER (WHERE status = 'on_leave') as on_leave_lawyers,
  COUNT(*) as total_lawyers
FROM public.lawyers;

-- Test RLS policy (this should work for public)
-- Note: In Supabase SQL Editor, this runs with elevated privileges
-- But it's good to verify the policy exists
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'lawyers';

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- After running this script:
-- 1. Refresh your booking page
-- 2. The lawyers should appear in the dropdown
-- 3. If not, check:
--    - Browser console for errors
--    - Next.js server logs
--    - Run: npx ts-node scripts/check-lawyers.ts
-- ============================================

