import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { withErrorHandler } from '../../../middleware/error';
import { requireAdmin } from '../../../utils/api-auth';
import logger from '../../../utils/logger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Require admin authentication
    await requireAdmin(req);
  } catch (authError: any) {
    const statusCode = authError.statusCode || 401;
    return res.status(statusCode).json({ 
      error: authError.message || 'Unauthorized' 
    });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();

    // Fetch statistics with error handling for each query
    const [
      appointmentsResult,
      contactMessagesResult,
      lawyersResult,
      pendingAppointmentsResult,
      pendingMessagesResult,
      jobApplicationsResult,
      pendingJobApplicationsResult
    ] = await Promise.allSettled([
      supabaseAdmin.from('appointments').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('contact_messages').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('lawyers').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabaseAdmin.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabaseAdmin.from('job_applications').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('job_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending')
    ]);

    // Extract results, defaulting to empty on error
    const getCount = (result: PromiseSettledResult<any>) => {
      if (result.status === 'fulfilled' && result.value && !result.value.error) {
        return result.value.count || 0;
      }
      return 0;
    };

    // Get recent appointments (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    let recentAppointments = 0;
    let confirmedAppointments = 0;
    let cancelledAppointments = 0;
    let activeLawyers = 0;

    try {
      const { count } = await supabaseAdmin
        .from('appointments')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());
      recentAppointments = count || 0;
    } catch (error) {
      logger.warn('Error fetching recent appointments', { error });
    }

    try {
      const { count } = await supabaseAdmin
        .from('appointments')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'confirmed');
      confirmedAppointments = count || 0;
    } catch (error) {
      logger.warn('Error fetching confirmed appointments', { error });
    }

    try {
      const { count } = await supabaseAdmin
        .from('appointments')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'cancelled');
      cancelledAppointments = count || 0;
    } catch (error) {
      logger.warn('Error fetching cancelled appointments', { error });
    }

    try {
      const { count } = await supabaseAdmin
        .from('lawyers')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active');
      activeLawyers = count || 0;
    } catch (error) {
      logger.warn('Error fetching active lawyers', { error });
    }

    // Get appointments with documents
    let appointmentsWithDocuments = 0;
    try {
      const { data } = await supabaseAdmin
        .from('appointments')
        .select('id, documents')
        .not('documents', 'is', null);
      
      if (data) {
        appointmentsWithDocuments = data.filter(apt => 
          apt.documents && 
          Array.isArray(apt.documents) && 
          apt.documents.length > 0
        ).length;
      }
    } catch (error) {
      logger.warn('Error fetching appointments with documents', { error });
    }

    return res.status(200).json({
      success: true,
      stats: {
        totalAppointments: getCount(appointmentsResult),
        totalContactMessages: getCount(contactMessagesResult),
        totalLawyers: getCount(lawyersResult),
        pendingAppointments: getCount(pendingAppointmentsResult),
        pendingMessages: getCount(pendingMessagesResult),
        recentAppointments,
        confirmedAppointments,
        cancelledAppointments,
        activeLawyers,
        appointmentsWithDocuments,
        totalJobApplications: getCount(jobApplicationsResult),
        pendingJobApplications: getCount(pendingJobApplicationsResult),
      }
    });
  } catch (error) {
    logger.error('Error fetching admin stats', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
}

export default withErrorHandler(handler);

