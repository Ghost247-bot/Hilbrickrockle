import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { withErrorHandler } from '../../../middleware/error';
import { requireAdmin } from '../../../utils/api-auth';
import logger from '../../../utils/logger';

interface Notification {
  id: string;
  type: 'appointment' | 'message' | 'document';
  title: string;
  message: string;
  link: string;
  created_at: string;
  read: boolean;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await requireAdmin(req);
  } catch (authError: any) {
    const statusCode = authError.statusCode || 401;
    return res.status(statusCode).json({ 
      error: authError.message || 'Unauthorized' 
    });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const notifications: Notification[] = [];

    // Fetch pending appointments
    try {
      const { data: pendingAppointments, error: appointmentsError } = await supabaseAdmin
        .from('appointments')
        .select('id, name, email, date, time, created_at')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!appointmentsError && pendingAppointments) {
        pendingAppointments.forEach((apt) => {
          try {
            const dateStr = apt.date ? new Date(apt.date).toLocaleDateString() : 'TBD';
            notifications.push({
              id: `apt-${apt.id}`,
              type: 'appointment',
              title: 'New Appointment Request',
              message: `${apt.name} requested an appointment for ${dateStr} at ${apt.time || 'TBD'}`,
              link: `/admin/appointments?status=pending&id=${apt.id}`,
              created_at: apt.created_at,
              read: false,
            });
          } catch (dateError) {
            // Skip invalid date appointments
            logger.warn('Invalid date in appointment notification', { aptId: apt.id });
          }
        });
      }
    } catch (error) {
      logger.warn('Error fetching appointments for notifications', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    // Fetch pending contact messages
    try {
      const { data: pendingMessages, error: messagesError } = await supabaseAdmin
        .from('contact_messages')
        .select('id, name, email, subject, created_at')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!messagesError && pendingMessages) {
        pendingMessages.forEach((msg) => {
          notifications.push({
            id: `msg-${msg.id}`,
            type: 'message',
            title: 'New Contact Message',
            message: `${msg.name} sent: ${msg.subject}`,
            link: `/admin/contact-messages?status=pending&id=${msg.id}`,
            created_at: msg.created_at,
            read: false,
          });
        });
      }
    } catch (error) {
      logger.warn('Error fetching contact messages for notifications', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    // Fetch recently completed document links (optional - table might not exist)
    try {
      const { data: completedDocuments, error: documentsError } = await supabaseAdmin
        .from('document_links')
        .select('id, title, client_name, completed_at')
        .eq('status', 'completed')
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false })
        .limit(5);

      if (!documentsError && completedDocuments) {
        completedDocuments.forEach((doc) => {
          notifications.push({
            id: `doc-${doc.id}`,
            type: 'document',
            title: 'Document Completed',
            message: `${doc.client_name || 'Client'} completed: ${doc.title}`,
            link: `/admin/document-links?status=completed&id=${doc.id}`,
            created_at: doc.completed_at || '',
            read: false,
          });
        });
      }
    } catch (error) {
      // Silently fail if document_links table doesn't exist
      logger.debug('Document links table not available for notifications', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    // Sort notifications by created_at (most recent first)
    notifications.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const unreadCount = notifications.length;

    return res.status(200).json({
      success: true,
      notifications: notifications.slice(0, 20), // Limit to 20 most recent
      unreadCount,
      totalCount: notifications.length,
    });
  } catch (error) {
    logger.error('Error fetching notifications', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
}

export default withErrorHandler(handler);

