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
        console.log('[Telegram] Environment:', {
          NODE_ENV: process.env.NODE_ENV,
          ENABLE_EMULATOR: process.env.NEXT_PUBLIC_ENABLE_TELEGRAM_DEV_EMULATOR
        });

        // 1️⃣ В dev — эмулируем Telegram окружение
        if (process.env.NEXT_PUBLIC_ENABLE_TELEGRAM_DEV_EMULATOR === 'true') {
          console.log('[Dev] Injecting Telegram mock environment...');
          initDevEnvironment();
        }

        // ✅ Даем среде время "примениться"
        await new Promise(resolve => setTimeout(resolve, 100));

        const isTelegram =
          typeof window !== 'undefined' &&
          !!window.Telegram?.WebApp?.initData;

        console.log('[Telegram] Is Telegram environment?', isTelegram);

        console.log('[Telegram] Initializing SDK...');
        init();
        console.log('[Telegram] SDK initialized successfully');
        setMounted(true);
      } catch (err) {
        console.error('[Telegram] SDK init failed:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        // Всегда продолжаем рендеринг, даже если инициализация не удалась
        setMounted(true);
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