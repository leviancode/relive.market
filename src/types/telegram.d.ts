declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        [key: string]: any;
      };
    };
  }
}

export {};

interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
}

interface TelegramWebAppInitData {
  query_id: string;
  user: TelegramWebAppUser;
  auth_date: number;
  hash: string;
}

interface TelegramWebAppThemeParams {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: TelegramWebAppInitData;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: TelegramWebAppThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  ready: () => void;
  expand: () => void;
  close: () => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  showConfirm: (message: string) => Promise<boolean>;
  showAlert: (message: string) => Promise<void>;
  showPopup: (params: any) => Promise<any>;
  HapticFeedback: {
    impactOccurred: (style: string) => void;
    notificationOccurred: (type: string) => void;
    selectionChanged: () => void;
  };
  isVersionAtLeast: (version: string) => boolean;
  setBackButtonVisible: (visible: boolean) => void;
  onEvent: (eventType: string, callback: () => void) => () => void;
  offEvent: (eventType: string, callback: () => void) => void;
  sendData: (data: any) => void;
  openLink: (url: string) => void;
  openTelegramLink: (url: string) => void;
  openInvoice: (url: string) => Promise<boolean>;
  switchInlineQuery: (query: string) => Promise<boolean>;
}

interface Telegram {
  WebApp: TelegramWebApp;
}

declare global {
  interface Window {
    Telegram?: Telegram;
  }
} 