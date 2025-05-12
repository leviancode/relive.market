'use client';

import React from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { init } from '@telegram-apps/sdk-react';
import { initDevEnvironment } from '@/lib/telegram-dev';

interface TelegramProviderProps {
  children: React.ReactNode;
}

export const TelegramProvider = ({ children }: TelegramProviderProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const isDev = process.env.NEXT_PUBLIC_ENV === 'dev';
  const isTelegram = typeof window !== 'undefined' && !!window.Telegram?.WebApp?.initData;

  React.useEffect(() => {
    const initTelegram = async () => {
      try {
        console.log('[Telegram] Environment:', {
          NODE_ENV: process.env.NODE_ENV,
          NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
          isTelegram,
        });

        if (!isTelegram) {
          if (isDev) {
            console.log('[Dev] Injecting Telegram mock...');
            initDevEnvironment();
            await new Promise((r) => setTimeout(r, 100));
          } else {
            throw new Error('Must be launched inside Telegram Web App');
          }
        }

        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          init();
          console.log('[Telegram] SDK initialized');
        }

        setMounted(true);
      } catch (err) {
        console.error('[Telegram] Initialization failed:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        if (isDev) {
          setMounted(true);
        }
      }
    };

    initTelegram();
  }, []);

  if (!mounted) {
    return null;
  }

  return <AppRoot>{children}</AppRoot>;
};