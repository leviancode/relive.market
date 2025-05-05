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

  React.useEffect(() => {
    const initTelegram = async () => {
      try {
        // 1️⃣ В dev — эмулируем Telegram окружение
        if (
          process.env.NODE_ENV === 'development' &&
          process.env.NEXT_PUBLIC_ENABLE_TELEGRAM_DEV_EMULATOR === 'true'
        ) {
          console.log('[Dev] Injecting Telegram mock environment...');
          initDevEnvironment();
        }

        // ✅ Даем среде время "примениться"
        await new Promise(resolve => setTimeout(resolve, 100));

        const isTelegram =
          typeof window !== 'undefined' &&
          !!window.Telegram?.WebApp?.initData;

        if (process.env.NODE_ENV === 'production' && !isTelegram) {
          throw new Error('Must be launched inside Telegram Web App');
        }

        console.log('[Telegram] Initializing SDK...');
        await init();
        console.log('[Telegram] SDK initialized');
        setMounted(true);
      } catch (err) {
        console.error('[Telegram] SDK init failed:', err);
        setError(err instanceof Error ? err : new Error(String(err)));

        if (process.env.NODE_ENV === 'development') {
          console.warn('[Dev] Continuing without Telegram');
          setMounted(true);
        }
      }
    };

    initTelegram();
  }, []);

  if (!mounted) return null;

  if (error && process.env.NODE_ENV === 'development') {
    console.warn('Rendering app despite Telegram SDK init failure');
  }

  return <AppRoot>{children}</AppRoot>;
};