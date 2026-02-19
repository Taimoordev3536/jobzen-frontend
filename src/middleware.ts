import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-storage')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/terms', '/privacy', '/auth/callback'];
  const isPublicRoute = publicRoutes.some(route => pathname === route);

  // If accessing a public route, allow
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  try {
    // Parse the auth storage to get user info
    const authStorage = JSON.parse(token);
    const user = authStorage?.state?.user;

    // If user info is not available, redirect to login
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // Role-based route protection
    const roleRoutes: Record<string, string[]> = {
      admin: ['/admin'],
      employer: ['/employer'],
      worker: ['/worker'],
      client: ['/client'],
      partner: ['/partner'],
      inspector: ['/inspector'],
    };

    // Check if user is accessing a role-specific route
    for (const [role, routes] of Object.entries(roleRoutes)) {
      const isRoleRoute = routes.some(route => pathname.startsWith(route));

      if (isRoleRoute && user.role !== role) {
        // Redirect to their correct dashboard
        const url = request.nextUrl.clone();
        url.pathname = `/${user.role}/dashboard`;
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    // If token parsing fails, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
