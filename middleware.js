import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret';
const encoder = new TextEncoder();

export async function middleware(req) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  // Enable CORS globally for all API routes
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // Handle Preflight Requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: res.headers });
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", req.url));
  }

  if (req.method != 'POST') {
    const protectedRoutes = [
      '/api/contacts',
      '/api/quotations',
      '/api/subscriptions',
    ];

    if (
      protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
    ) {
      const authHeader = req.headers.get('authorization');

      if (!authHeader) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const token = authHeader.split(' ')[1];

      try {
        const { payload } = await jwtVerify(token, encoder.encode(SECRET_KEY));
        console.log('Decoded Token:', payload);
      } catch (error) {
        console.error('JWT Verification Error:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
      }
    }
    return res;
  }
}

// Apply middleware to all API routes
export const config = {
  matcher: ['/api/:path*',  "/"],
};
