'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
import { List } from '@telegram-apps/telegram-ui';

import { DisplayData } from '@/components/DisplayData/DisplayData';
import { Page } from '@/components/Page';

export default function LaunchParamsPage() {
  const lp = useLaunchParams();

  return (
    <Page>
      <List>
        <DisplayData
          rows={[
            { title: 'tgWebAppPlatform', value: String(lp.platform) },
            { title: 'tgWebAppShowSettings', value: String(lp.showSettings) },
            { title: 'tgWebAppVersion', value: String(lp.version) },
            { title: 'tgWebAppBotInline', value: String(lp.botInline) },
            { title: 'tgWebAppStartParam', value: String(lp.startParam) },
            { title: 'tgWebAppData', type: 'link', value: '/init-data' },
            {
              title: 'tgWebAppThemeParams',
              type: 'link',
              value: '/theme-params',
            },
          ]}
        />
      </List>
    </Page>
  );
};
