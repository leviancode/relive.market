import { mockTelegramEnv } from '@telegram-apps/sdk-react';

/**
 * Mocks Telegram environment in development mode.
 */
export const useTelegramMock = () => {
  if (process.env.NODE_ENV === 'development') {
    const mockUser = {
      id: 123456789,
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      language_code: 'en',
      is_premium: true,
      allows_write_to_pm: true,
      added_to_attachment_menu: false,
      is_bot: false,
    };

    const params = new URLSearchParams();
    params.append('user', JSON.stringify(mockUser));
    params.append('auth_date', Math.floor(Date.now() / 1000).toString());
    params.append('hash', 'mock_hash');
    params.append('signature', 'mock_signature');
    params.append('query_id', '123');

    mockTelegramEnv({
      launchParams: {
        tgWebAppData: params,
        tgWebAppVersion: '6.0',
        tgWebAppPlatform: 'macos',
        tgWebAppThemeParams: {
          bg_color: '#ffffff',
          text_color: '#000000',
          hint_color: '#999999',
          link_color: '#2481cc',
          button_color: '#2481cc',
          button_text_color: '#ffffff',
        },
      },
    });
  }
};