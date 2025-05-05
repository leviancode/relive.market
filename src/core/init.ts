import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  init as initSDK,
} from '@telegram-apps/sdk-react';

import { initDevEnvironment } from '@/lib/telegram-dev';

/**
 * Initializes the application and configures its dependencies.
 */
export const init = () => {
  if (process.env.NODE_ENV === 'development') {
    initDevEnvironment();
  }

  initSDK();

  if (process.env.NODE_ENV === 'development') {
    console.log('[telegram] initialized:', {
      initData: initData.raw,
      miniApp: miniApp,
    });
  }

  // Mount all components used in the project.
  backButton.isSupported() && backButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();
  void viewport.mount().then(() => {
    viewport.bindCssVars();
  }).catch(e => {
    console.error('Something went wrong mounting the viewport', e);
  });

  // Define components-related CSS variables.
  miniApp.bindCssVars();
  themeParams.bindCssVars();

  // Add Eruda if needed.
  process.env.NODE_ENV === 'development' && import('eruda')
    .then((lib) => lib.default.init())
    .catch(console.error);
};