import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { TELEGRAM_MINI_APP_URL } from '@/constants/telegram';

const intlMiddleware = createMiddleware({
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix: 'never'
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = request.headers;

  // Redirect to Telegram if accessing /app outside of Telegram
  if (pathname.startsWith('/app')) {
    const tgWebAppHeader = headers.get('x-telegram-web-app');
    const userAgent = headers.get('user-agent') || '';

    const isTelegramWebView =
      tgWebAppHeader === 'true' ||
      userAgent.includes('Telegram');

    if (!isTelegramWebView) {
      return NextResponse.redirect(TELEGRAM_MINI_APP_URL);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};