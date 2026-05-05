// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/regester');

  // 1. لو اليوزر مش ملوجن وبيحاول يدخل صفحة محمية (زي الهوم)
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. لو اليوزر ملوجن وبيحاول يروح لصفحة اللوج إن
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// هنا بنحدد المسارات اللي الميدل وير هيشتغل عليها
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};