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
  const [tgParams, setTgParams] = React.useState<any>(null);

  React.useEffect(() => {
    const initTelegram = async () => {
      const isDev = process.env.NODE_ENV === 'development';
      const enableEmulator = process.env.NEXT_PUBLIC_ENABLE_TELEGRAM_DEV_EMULATOR === 'true';

      const isTelegram =
        typeof window !== 'undefined' &&
        !!window.Telegram?.WebApp &&
        (!!window.Telegram.WebApp.platform || !!window.Telegram.WebApp.initData);

      console.log('[Telegram] Environment:', {
        NODE_ENV: process.env.NODE_ENV,
        ENABLE_EMULATOR: enableEmulator,
        isTelegram
      });

      try {
        if (typeof window !== 'undefined') {
          console.log('[Telegram] WebApp object:', window.Telegram?.WebApp);

          if (window.Telegram?.WebApp) {
            setTgParams({
              initData: window.Telegram.WebApp.initData,
              initDataUnsafe: window.Telegram.WebApp.initDataUnsafe
            });
          }
        }

        if (!isTelegram) {
          if (isDev && enableEmulator) {
            console.log('[Telegram] No WebApp context – injecting dev emulator...');
            initDevEnvironment();
            await new Promise((resolve) => setTimeout(resolve, 100)); // небольшой "cooldown"
          } else {
            throw new Error('Must be launched inside Telegram Web App');
          }
        }

        // Повторная проверка после возможной инициализации эмулятора
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          init();
          console.log('[Telegram] SDK initialized');
        }

        setMounted(true);
      } catch (err) {
        console.error('[Telegram] Initialization failed:', err);
        setError(err instanceof Error ? err : new Error(String(err)));

        if (isDev) {
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

  if (!tgParams || (!tgParams.initData && !tgParams.initDataUnsafe)) {
    return (
      <div style={{ padding: 32, color: 'orange', fontWeight: 'bold' }}>
        <h2>Telegram WebApp parameters not found</h2>
        <p>window.Telegram.WebApp is missing or incomplete.</p>
        <pre>{JSON.stringify(tgParams, null, 2)}</pre>
      </div>
    );
  }

  return <AppRoot>{children}</AppRoot>;
};