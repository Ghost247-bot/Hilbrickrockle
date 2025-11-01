-- Insert leadership team from About Page into lawyers database
-- This script adds all team members with their full details

-- First, ensure the lawyers table has all necessary columns
ALTER TABLE public.lawyers 
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS image_url text,
ADD COLUMN IF NOT EXISTS ref_code text;

-- Insert leadership team members
INSERT INTO public.lawyers (lawyer_id, name, email, title, practice_areas, bio, experience_years, status, image_url, ref_code, phone) VALUES
(
  'LAW-001',
  'John Smith',
  'john.smith@haryawn.com',
  'Global Chair',
  ARRAY['Corporate Law', 'Strategic Leadership', 'International Business'],
  'Over 25 years of experience in corporate law and strategic leadership. Renowned for leading complex transactions and setting strategic direction for the firm globally.',
  25,
  'active',
  '/images/leadership/john-smith.jpg',
  'GC-JS-001',
  '+1 (555) 123-4567'
),
(
  'LAW-002',
  'Sarah Johnson',
  'sarah.johnson@haryawn.com',
  'Managing Partner',
  ARRAY['International Transactions', 'Cross-Border Operations', 'Corporate Law'],
  'Expert in international transactions and cross-border operations. Has successfully led multi-jurisdictional deals across multiple continents.',
  18,
  'active',
  '/images/leadership/sarah-johnson.jpg',
  'MP-SJ-002',
  '+1 (555) 123-4568'
),
(
  'LAW-003',
  'Michael Chen',
  'michael.chen@haryawn.com',
  'Executive Partner',
  ARRAY['Technology Law', 'Legal Innovation', 'Digital Services'],
  'Specialist in technology and innovation in legal services. Pioneer in implementing cutting-edge legal tech solutions and digital transformation initiatives.',
  22,
  'active',
  '/images/leadership/michael-chen.jpg',
  'EP-MC-003',
  '+1 (555) 123-4569'
),
(
  'LAW-004',
  'Emily Davis',
  'emily.davis@haryawn.com',
  'Senior Partner',
  ARRAY['Mergers & Acquisitions', 'Corporate Law', 'Strategic Transactions'],
  'Leading expert in mergers and acquisitions with global experience. Has completed over 100 M&A transactions with combined value exceeding $50 billion.',
  20,
  'active',
  '/images/leadership/emily-davis.jpg',
  'SP-ED-004',
  '+1 (555) 123-4570'
),
(
  'LAW-005',
  'David Wilson',
  'david.wilson@haryawn.com',
  'Head of Litigation',
  ARRAY['Commercial Litigation', 'Complex Disputes', 'Trial Practice'],
  'Renowned litigator with expertise in complex commercial disputes. Successfully defended clients in high-stakes cases across multiple jurisdictions.',
  24,
  'active',
  '/images/leadership/david-wilson.jpg',
  'HL-DW-005',
  '+1 (555) 123-4571'
),
(
  'LAW-006',
  'Lisa Chang',
  'lisa.chang@haryawn.com',
  'Head of Corporate',
  ARRAY['Corporate Restructuring', 'Strategic Transactions', 'Regulatory Compliance'],
  'Specializes in corporate restructuring and strategic transactions. Expert in helping companies navigate complex regulatory environments.',
  16,
  'active',
  '/images/leadership/lisa-chang.jpg',
  'HC-LC-006',
  '+1 (555) 123-4572'
),
(
  'LAW-007',
  'Robert Martinez',
  'robert.martinez@haryawn.com',
  'Head of Real Estate',
  ARRAY['Commercial Real Estate', 'Property Development', 'Real Estate Finance'],
  'Expert in commercial real estate and property development law. Has structured real estate deals worth over $10 billion throughout career.',
  19,
  'active',
  '/images/leadership/robert-martinez.jpg',
  'HR-RM-007',
  '+1 (555) 123-4573'
),
(
  'LAW-008',
  'Amanda Foster',
  'amanda.foster@haryawn.com',
  'Head of Employment',
  ARRAY['Employment Law', 'Workplace Regulations', 'Labor Relations'],
  'Specializes in employment law and workplace regulations. Provides strategic counsel to Fortune 500 companies on employment matters.',
  17,
  'active',
  '/images/leadership/amanda-foster.jpg',
  'HE-AF-008',
  '+1 (555) 123-4574'
),
(
  'LAW-009',
  'James Kim',
  'james.kim@haryawn.com',
  'Head of Technology',
  ARRAY['Technology Law', 'Digital Transformation', 'Intellectual Property'],
  'Leading expert in technology law and digital transformation. Advises tech companies on regulatory compliance and emerging legal challenges in the digital age.',
  14,
  'active',
  '/images/leadership/james-kim.jpg',
  'HT-JK-009',
  '+1 (555) 123-4575'
)
ON CONFLICT (lawyer_id) 
DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  title = EXCLUDED.title,
  practice_areas = EXCLUDED.practice_areas,
  bio = EXCLUDED.bio,
  experience_years = EXCLUDED.experience_years,
  status = EXCLUDED.status,
  image_url = EXCLUDED.image_url,
  ref_code = EXCLUDED.ref_code,
  phone = EXCLUDED.phone,
  updated_at = timezone('utc', now());

-- Verify the insertions
SELECT 
  lawyer_id,
  name,
  title,
  practice_areas,
  status,
  ref_code
FROM public.lawyers
ORDER BY lawyer_id;

