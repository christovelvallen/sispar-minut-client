import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return Response.redirect(new URL('/auth/login', request.url));
  }

  if (token && request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/admin/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
