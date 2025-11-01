import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Middleware disabled - return without processing
  return NextResponse.next();
}

export const config = {
  // No routes to match - middleware disabled
  matcher: [],
}; 