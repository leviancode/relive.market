import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Relive Market',
  description: 'Buy and sell items in Telegram',
};

function FallbackError({ error }: { error: Error }) {
  return (
    <div style={{ padding: 32, color: 'red', fontWeight: 'bold' }}>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary fallback={FallbackError}>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
