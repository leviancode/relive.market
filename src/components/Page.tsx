'use client';

import { backButton } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Page({ children, back = true }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   * @default true
   */
  back?: boolean
}>) {
  const router = useRouter();

  useEffect(() => {
    if (backButton.isSupported()) {
      if (back) {
        backButton.show();
      } else {
        backButton.hide();
      }

      return backButton.onClick(() => {
        router.back();
      });
    }
  }, [back, router]);

  return <>{children}</>;
}