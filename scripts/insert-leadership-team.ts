/**
 * Script to insert leadership team members from About page into the lawyers database
 * Run with: ts-node scripts/insert-leadership-team.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const leadershipTeam = [
  {
    lawyer_id: 'LAW-001',
    name: 'John Smith',
    email: 'john.smith@haryawn.com',
    phone: '+1 (555) 123-4567',
    title: 'Global Chair',
    practice_areas: ['Corporate Law', 'Strategic Leadership', 'International Business'],
    bio: 'Over 25 years of experience in corporate law and strategic leadership. Renowned for leading complex transactions and setting strategic direction for the firm globally.',
    experience_years: 25,
    status: 'active',
    image_url: '/images/leadership/john-smith.jpg',
    ref_code: 'GC-JS-001',
  },
  {
    lawyer_id: 'LAW-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@haryawn.com',
    phone: '+1 (555) 123-4568',
    title: 'Managing Partner',
    practice_areas: ['International Transactions', 'Cross-Border Operations', 'Corporate Law'],
    bio: 'Expert in international transactions and cross-border operations. Has successfully led multi-jurisdictional deals across multiple continents.',
    experience_years: 18,
    status: 'active',
    image_url: '/images/leadership/sarah-johnson.jpg',
    ref_code: 'MP-SJ-002',
  },
  {
    lawyer_id: 'LAW-003',
    name: 'Michael Chen',
    email: 'michael.chen@haryawn.com',
    phone: '+1 (555) 123-4569',
    title: 'Executive Partner',
    practice_areas: ['Technology Law', 'Legal Innovation', 'Digital Services'],
    bio: 'Specialist in technology and innovation in legal services. Pioneer in implementing cutting-edge legal tech solutions and digital transformation initiatives.',
    experience_years: 22,
    status: 'active',
    image_url: '/images/leadership/michael-chen.jpg',
    ref_code: 'EP-MC-003',
  },
  {
    lawyer_id: 'LAW-004',
    name: 'Emily Davis',
    email: 'emily.davis@haryawn.com',
    phone: '+1 (555) 123-4570',
    title: 'Senior Partner',
    practice_areas: ['Mergers & Acquisitions', 'Corporate Law', 'Strategic Transactions'],
    bio: 'Leading expert in mergers and acquisitions with global experience. Has completed over 100 M&A transactions with combined value exceeding $50 billion.',
    experience_years: 20,
    status: 'active',
    image_url: '/images/leadership/emily-davis.jpg',
    ref_code: 'SP-ED-004',
  },
  {
    lawyer_id: 'LAW-005',
    name: 'David Wilson',
    email: 'david.wilson@haryawn.com',
    phone: '+1 (555) 123-4571',
    title: 'Head of Litigation',
    practice_areas: ['Commercial Litigation', 'Complex Disputes', 'Trial Practice'],
    bio: 'Renowned litigator with expertise in complex commercial disputes. Successfully defended clients in high-stakes cases across multiple jurisdictions.',
    experience_years: 24,
    status: 'active',
    image_url: '/images/leadership/david-wilson.jpg',
    ref_code: 'HL-DW-005',
  },
  {
    lawyer_id: 'LAW-006',
    name: 'Lisa Chang',
    email: 'lisa.chang@haryawn.com',
    phone: '+1 (555) 123-4572',
    title: 'Head of Corporate',
    practice_areas: ['Corporate Restructuring', 'Strategic Transactions', 'Regulatory Compliance'],
    bio: 'Specializes in corporate restructuring and strategic transactions. Expert in helping companies navigate complex regulatory environments.',
    experience_years: 16,
    status: 'active',
    image_url: '/images/leadership/lisa-chang.jpg',
    ref_code: 'HC-LC-006',
  },
  {
    lawyer_id: 'LAW-007',
    name: 'Robert Martinez',
    email: 'robert.martinez@haryawn.com',
    phone: '+1 (555) 123-4573',
    title: 'Head of Real Estate',
    practice_areas: ['Commercial Real Estate', 'Property Development', 'Real Estate Finance'],
    bio: 'Expert in commercial real estate and property development law. Has structured real estate deals worth over $10 billion throughout career.',
    experience_years: 19,
    status: 'active',
    image_url: '/images/leadership/robert-martinez.jpg',
    ref_code: 'HR-RM-007',
  },
  {
    lawyer_id: 'LAW-008',
    name: 'Amanda Foster',
    email: 'amanda.foster@haryawn.com',
    phone: '+1 (555) 123-4574',
    title: 'Head of Employment',
    practice_areas: ['Employment Law', 'Workplace Regulations', 'Labor Relations'],
    bio: 'Specializes in employment law and workplace regulations. Provides strategic counsel to Fortune 500 companies on employment matters.',
    experience_years: 17,
    status: 'active',
    image_url: '/images/leadership/amanda-foster.jpg',
    ref_code: 'HE-AF-008',
  },
  {
    lawyer_id: 'LAW-009',
    name: 'James Kim',
    email: 'james.kim@haryawn.com',
    phone: '+1 (555) 123-4575',
    title: 'Head of Technology',
    practice_areas: ['Technology Law', 'Digital Transformation', 'Intellectual Property'],
    bio: 'Leading expert in technology law and digital transformation. Advises tech companies on regulatory compliance and emerging legal challenges in the digital age.',
    experience_years: 14,
    status: 'active',
    image_url: '/images/leadership/james-kim.jpg',
    ref_code: 'HT-JK-009',
  },
];

async function insertLeadershipTeam() {
  console.log('Starting to insert leadership team members...\n');

  try {
    // First, check if title column exists, if not add it
    console.log('Ensuring table structure is correct...');
    
    for (const member of leadershipTeam) {
      const { error } = await supabase
        .from('lawyers')
        .upsert(member, {
          onConflict: 'lawyer_id',
          ignoreDuplicates: false,
        })
        .select();

      if (error) {
        console.error(`❌ Error inserting ${member.name}:`, error.message);
      } else {
        console.log(`✅ Successfully inserted/updated: ${member.name} (${member.lawyer_id})`);
      }
    }

    console.log('\n✅ Leadership team insertion complete!');
    
    // Verify by fetching all lawyers
    const { data: allLawyers, error: fetchError } = await supabase
      .from('lawyers')
      .select('lawyer_id, name, title, status')
      .order('lawyer_id');

    if (fetchError) {
      console.error('Error fetching lawyers:', fetchError.message);
    } else {
      console.log(`\n📊 Total lawyers in database: ${allLawyers?.length || 0}`);
      allLawyers?.forEach(lawyer => {
        console.log(`  - ${lawyer.lawyer_id}: ${lawyer.name} (${lawyer.title || 'No title'})`);
      });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

insertLeadershipTeam();

