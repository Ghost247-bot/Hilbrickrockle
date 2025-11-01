import { NextApiRequest, NextApiResponse } from 'next';

// Safe PostgrestError check - don't fail if import fails
let PostgrestError: any;
try {
  PostgrestError = require('@supabase/supabase-js').PostgrestError;
} catch (e) {
  // Fallback if import fails
  PostgrestError = class PostgrestError extends Error {};
}

export function withErrorHandler(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Prevent multiple responses
    let responseSent = false;
    const originalJson = res.json.bind(res);
    res.json = function(body: any) {
      if (!responseSent) {
        responseSent = true;
        return originalJson(body);
      }
      return res;
    };

    try {
      await handler(req, res);
    } catch (error: any) {
      // Don't send response if already sent
      if (responseSent) {
        console.error('Error occurred but response already sent:', error);
        return;
      }

      console.error('API Error:', error);

      try {
        // Handle Supabase errors
        if (PostgrestError && error instanceof PostgrestError) {
          return res.status(200).json({
            success: false,
            error: 'Database error',
            message: error.message || 'Database query failed',
            lawyers: [],
            count: 0,
          });
        }

        // For lawyers API specifically, always return 200 with empty array
        if (req.url?.includes('/api/lawyers')) {
          return res.status(200).json({
            success: true,
            lawyers: [],
            count: 0,
            message: 'An error occurred. Lawyer selection is optional.',
          });
        }

        // For other APIs, return 200 to prevent breaking the app
        return res.status(200).json({
          success: false,
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      } catch (responseError: any) {
        // If sending response fails, log but don't throw
        console.error('Failed to send error response:', responseError);
      }
    }
  };
} 