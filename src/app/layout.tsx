import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { ClientLayout } from '@/components/layout/ClientLayout';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Relive Market',
  description: 'Buy and sell items in Telegram',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
