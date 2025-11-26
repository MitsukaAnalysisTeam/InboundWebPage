import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 保護対象のパスかどうか判定
  const isAdminPath = pathname.startsWith('/admin');
  const isApiAdminPath = pathname.startsWith('/api/admin');

  if (isAdminPath || isApiAdminPath) {
    // ログイン関連は除外
    if (pathname === '/admin/login' || pathname === '/api/admin/login') {
      // ログインページへのアクセスで、既にログイン済みならダッシュボードへ
      if (pathname === '/admin/login') {
        const token = request.cookies.get('admin_token')?.value;
        if (token && await verifyToken(token)) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      }
      return NextResponse.next();
    }

    // トークンの検証
    const token = request.cookies.get('admin_token')?.value;
    const verifiedToken = token ? await verifyToken(token) : null;

    if (!verifiedToken) {
      // APIリクエストの場合は401を返す
      if (isApiAdminPath) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // ページアクセスの場合はログインページへリダイレクト
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
