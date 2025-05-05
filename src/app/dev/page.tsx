'use client';

import { useEffect, useState } from 'react';
import { mockTelegramEnv } from '@telegram-apps/sdk-react';
import { Page } from '@/components/Page';
import { Placeholder } from '@telegram-apps/telegram-ui';

export default function DevPage() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Имитация среды Telegram для разработки
    if (typeof window !== 'undefined') {
      // Mock Telegram WebApp object
      (window as any).Telegram = {
        WebApp: {
          initData: {
            query_id: 'test_query_id',
            user: {
              id: 123456789,
              first_name: 'Test',
              last_name: 'User',
              username: 'testuser',
              language_code: 'en',
              is_premium: true,
              allows_write_to_pm: true,
            },
            auth_date: Math.floor(Date.now() / 1000),
            hash: 'test_hash',
            start_param: 'test_start_param',
            chat_type: 'private',
            chat_instance: 'test_chat_instance',
            signature: 'test_signature',
          },
          initDataUnsafe: {
            query_id: 'test_query_id',
            user: {
              id: 123456789,
              first_name: 'Test',
              last_name: 'User',
              username: 'testuser',
              language_code: 'en',
              is_premium: true,
              allows_write_to_pm: true,
            },
            auth_date: Math.floor(Date.now() / 1000),
            hash: 'test_hash',
            start_param: 'test_start_param',
            chat_type: 'private',
            chat_instance: 'test_chat_instance',
            signature: 'test_signature',
          },
          platform: 'web',
          colorScheme: 'light',
          themeParams: {
            bg_color: '#ffffff',
            text_color: '#000000',
            hint_color: '#999999',
            link_color: '#2481cc',
            button_color: '#2481cc',
            button_text_color: '#ffffff',
          },
          isExpanded: true,
          viewportHeight: window.innerHeight,
          viewportStableHeight: window.innerHeight,
          headerColor: '#ffffff',
          backgroundColor: '#ffffff',
          ready: () => {},
          expand: () => {},
          close: () => {},
          enableClosingConfirmation: () => {},
          disableClosingConfirmation: () => {},
          setHeaderColor: () => {},
          setBackgroundColor: () => {},
          showConfirm: () => Promise.resolve(true),
          showAlert: () => Promise.resolve(),
          showPopup: () => Promise.resolve({}),
          HapticFeedback: {
            impactOccurred: () => {},
            notificationOccurred: () => {},
            selectionChanged: () => {},
          },
          isVersionAtLeast: () => true,
          setBackButtonVisible: () => {},
          onEvent: () => () => {},
          offEvent: () => {},
          sendData: () => {},
          openLink: () => {},
          openTelegramLink: () => {},
          openInvoice: () => Promise.resolve(true),
          switchInlineQuery: () => Promise.resolve(true),
        },
      };

      // Mock launch parameters in URL
      const url = new URL(window.location.href);
      url.searchParams.set('tgWebAppPlatform', 'web');
      url.searchParams.set('tgWebAppData', btoa(JSON.stringify({
        query_id: 'test_query_id',
        user: {
          id: 123456789,
          first_name: 'Test',
          last_name: 'User',
          username: 'testuser',
          language_code: 'en',
          is_premium: true,
          allows_write_to_pm: true,
        },
        auth_date: Math.floor(Date.now() / 1000),
        hash: 'test_hash',
        start_param: 'test_start_param',
        chat_type: 'private',
        chat_instance: 'test_chat_instance',
        signature: 'test_signature',
      })));
      window.history.replaceState({}, '', url.toString());
    }
    
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <Page>
        <Placeholder
          header="Инициализация"
          description="Инициализация тестовой среды Telegram..."
        />
      </Page>
    );
  }

  return (
    <Page>
      <Placeholder
        header="Режим разработки"
        description="Тестовая среда Telegram успешно инициализирована. Теперь вы можете тестировать приложение."
      />
    </Page>
  );
} 