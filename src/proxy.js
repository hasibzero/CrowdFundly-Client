import { NextResponse } from 'next/server';

export default function proxy(request) {
  // Only check for our custom crowdfundly_token which we can securely manage via client-side logout
  const sessionToken = request.cookies.get('crowdfundly_token')?.value;

  const { pathname } = request.nextUrl;

  // Define route categories
  const isDashboardRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/campaigns/create');
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  // Treat missing or "undefined" cookie as invalid
  const hasValidToken = sessionToken && sessionToken !== 'undefined';

  // 1. Protect Dashboard Routes: Redirect unauthenticated users to /login
  if (isDashboardRoute && !hasValidToken) {
    const loginUrl = new URL('/login', request.url);
    // Optionally preserve the attempted URL to redirect back after login
    loginUrl.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(loginUrl);
  }

  // 2. Protect Auth Routes: Redirect authenticated users to /dashboard
  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Allow all other requests to proceed
  return NextResponse.next();
}

export const config = {
  // Match all dashboard routes, auth routes, and campaign creation
  matcher: ['/dashboard/:path*', '/campaigns/create', '/login', '/register'],
};
