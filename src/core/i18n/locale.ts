//use server is required
"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "NEXT_LOCALE";

export const defaultLocale = "en";
export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const isValidLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);

const getLocale = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale;
};

const setLocale = async (locale?: string) => {
  if (!locale || !isValidLocale(locale)) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale);
};

export { getLocale, setLocale };
