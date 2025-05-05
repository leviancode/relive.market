'use client';

import React from 'react';
import { TelegramProvider } from '@/components/providers/TelegramProvider';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  return <TelegramProvider>{children}</TelegramProvider>;
}; 