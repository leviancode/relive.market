export const mockWebAppInitData = {
  query_id: 'dev_query_id',
  user: {
    id: 123456789,
    first_name: 'Dev',
    last_name: 'User',
    username: 'devuser',
    language_code: 'en',
  },
  auth_date: Math.floor(Date.now() / 1000),
  hash: 'dev_hash',
  signature: 'dev_signature',
  tgWebAppPlatform: 'web',
  tgWebAppVersion: '6.0',
  tgWebAppColorScheme: 'light',
  tgWebAppThemeParams: {
    bg_color: '#ffffff',
    text_color: '#000000',
    hint_color: '#999999',
    link_color: '#2481cc',
    button_color: '#2481cc',
    button_text_color: '#ffffff',
  },
  tgWebAppIsExpanded: true,
  tgWebAppViewportHeight: 800,
  tgWebAppViewportStableHeight: 800,
  tgWebAppHeaderColor: '#ffffff',
  tgWebAppBackgroundColor: '#ffffff',
};

const createInitDataString = (data: Record<string, any>) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    params.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
  }
  return params.toString();
};

export const initDevEnvironment = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  const initDataString = createInitDataString(mockWebAppInitData);

  // 1. Set launch parameters in localStorage (this is what SDK reads)
  localStorage.setItem('tgWebAppLaunchParams', initDataString);
  localStorage.setItem('tgWebAppData', initDataString); // Backup for older SDK versions

  // 2. Patch window.Telegram.WebApp
  (window as any).Telegram = {
    WebApp: {
      initData: initDataString,
      initDataUnsafe: mockWebAppInitData,
      platform: mockWebAppInitData.tgWebAppPlatform,
      version: mockWebAppInitData.tgWebAppVersion,
      colorScheme: mockWebAppInitData.tgWebAppColorScheme,
      themeParams: mockWebAppInitData.tgWebAppThemeParams,
      isExpanded: mockWebAppInitData.tgWebAppIsExpanded,
      viewportHeight: mockWebAppInitData.tgWebAppViewportHeight,
      viewportStableHeight: mockWebAppInitData.tgWebAppViewportStableHeight,
      headerColor: mockWebAppInitData.tgWebAppHeaderColor,
      backgroundColor: mockWebAppInitData.tgWebAppBackgroundColor,
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

  // 3. Add params to URL (optional, useful for debugging)
  const url = new URL(window.location.href);
  url.searchParams.set('tgWebAppLaunchParams', initDataString);
  url.searchParams.set('tgWebAppData', initDataString); // Backup for older SDK versions
  window.history.replaceState({}, '', url.toString());

  // 4. Patch performance.navigation for SDK (optional, just in case)
  const entries = performance.getEntriesByType('navigation');
  if (entries.length > 0) {
    const navEntry = entries[0] as PerformanceNavigationTiming;
    Object.defineProperty(navEntry, 'name', {
      get: () => url.toString(),
    });
  }

  // 5. Final console log
  console.log(
    '%c[Telegram Dev]',
    'color: #2481cc; font-weight: bold',
    '\n✅ Mock Telegram environment is active',
    '\n🧪 initData:', mockWebAppInitData,
    '\n🌐 tgWebAppLaunchParams:', initDataString
  );
};