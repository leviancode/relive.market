'use client';

import React from 'react';
import { TelegramProvider } from '@/components/providers/TelegramProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function FallbackError({ error }: { error: Error }) {
  return (
    <div style={{ padding: 32, color: 'red', fontWeight: 'bold' }}>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </div>
  );
}

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <ErrorBoundary fallback={FallbackError}>
      <TelegramProvider>{children}</TelegramProvider>
    </ErrorBoundary>
  );
}; 