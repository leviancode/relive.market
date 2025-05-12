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
        const isDev = process.env.NODE_ENV === 'development';
        const isTelegram = typeof window !== 'undefined' && !!window.Telegram?.WebApp?.initData;

        console.log('[Telegram] Environment:', {
          NODE_ENV: process.env.NODE_ENV,
          ENABLE_EMULATOR: process.env.NEXT_PUBLIC_ENABLE_TELEGRAM_DEV_EMULATOR,
          isTelegram
        });

        // В production должны быть параметры Telegram
        if (!isDev && !isTelegram) {
          throw new Error('Must be launched inside Telegram Web App');
        }

        // В dev используем эмулятор если нет реальных параметров
        if (isDev && !isTelegram) {
          console.log('[Dev] Injecting Telegram mock environment...');
          initDevEnvironment();
          // Даем среде время "примениться"
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Инициализируем SDK только если есть параметры (реальные или мок)
        if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initData) {
          console.log('[Telegram] Initializing SDK...');
          init();
          console.log('[Telegram] SDK initialized successfully');
        } else {
          console.warn('[Telegram] No WebApp parameters found, skipping SDK initialization');
        }

        setMounted(true);
      } catch (err) {
        console.error('[Telegram] Initialization failed:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        
        // В dev продолжаем даже с ошибкой
        if (process.env.NODE_ENV === 'development') {
          console.warn('[Dev] Continuing despite initialization error');
          setMounted(true);
        }
      }
    };

    initTelegram();
  }, []);

  if (!mounted) {
    console.log('[Telegram] Waiting for initialization...');
    return null;
  }

  if (error) {
    console.warn('[Telegram] Rendering despite initialization error:', error);
  }

  return <AppRoot>{children}</AppRoot>;
};