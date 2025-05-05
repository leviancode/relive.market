import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    throw new Error('Locale is required');
  }

  return {
    locale,
    messages: {
      i18n: {
        hello: 'Hello',
        welcome: 'Welcome to our app',
      }
    }
  };
}); 