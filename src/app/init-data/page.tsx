'use client';

import { useMemo } from 'react';
import { useSignal, initData, type User, isTMA } from '@telegram-apps/sdk-react';
import { List, Placeholder } from '@telegram-apps/telegram-ui';
import Image from 'next/image';

import {
  DisplayData,
  type DisplayDataRow,
} from '@/components/DisplayData/DisplayData';
import { Page } from '@/components/Page';

function getUserRows(user: User): DisplayDataRow[] {
  return [
    { title: 'id', value: user.id.toString() },
    { title: 'username', value: user.username },
    { title: 'photo_url', value: user.photo_url },
    { title: 'lastName', value: user.last_name },
    { title: 'firstName', value: user.first_name },
    { title: 'isBot', value: user.is_bot },
    { title: 'isPremium', value: user.is_premium },
    { title: 'languageCode', value: user.language_code },
    { title: 'allowsWriteToPm', value: user.allows_write_to_pm },
    { title: 'addedToAttachmentMenu', value: user.added_to_attachment_menu },
  ];
}

export default function InitDataPage() {
  const initDataRaw = useSignal(initData.raw);
  const initDataState = useSignal(initData.state);

  const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initDataState || !initDataRaw) {
      return;
    }
    const {
      auth_date,
      hash,
      query_id,
      chat_type,
      chat_instance,
      can_send_after,
      start_param,
    } = initDataState;
    return [
      { title: 'raw', value: initDataRaw },
      { title: 'auth_date', value: auth_date.toLocaleString() },
      { title: 'auth_date (raw)', value: auth_date.getTime() / 1000 },
      { title: 'hash', value: hash },
      {
        title: 'can_send_after',
        value: initData.canSendAfterDate()?.toISOString(),
      },
      { title: 'can_send_after (raw)', value: can_send_after },
      { title: 'query_id', value: query_id },
      { title: 'start_param', value: start_param },
      { title: 'chat_type', value: chat_type },
      { title: 'chat_instance', value: chat_instance },
    ];
  }, [initDataState, initDataRaw]);

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initDataState && initDataState.user
      ? getUserRows(initDataState.user)
      : undefined;
  }, [initDataState]);

  const receiverRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initDataState && initDataState.receiver
      ? getUserRows(initDataState.receiver)
      : undefined;
  }, [initDataState]);

  const chatRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initDataState?.chat) {
      return;
    }
    const {
      id,
      title,
      type,
      username,
      photo_url,
    } = initDataState.chat;

    return [
      { title: 'id', value: id.toString() },
      { title: 'title', value: title },
      { title: 'type', value: type },
      { title: 'username', value: username },
      { title: 'photo_url', value: photo_url },
    ];
  }, [initDataState]);

  // Проверка, запущено ли приложение в Telegram
  if (!isTMA()) {
    return (
      <Page>
        <Placeholder
          header="Внимание"
          description="Это приложение предназначено для запуска внутри Telegram. Пожалуйста, откройте его через Telegram."
        >
          <Image
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            width={144}
            height={144}
            style={{ display: 'block' }}
          />
        </Placeholder>
      </Page>
    );
  }

  if (!initDataRows) {
    return (
      <Page>
        <Placeholder
          header="Oops"
          description="Application was launched with missing init data"
        >
          <Image
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            width={144}
            height={144}
            style={{ display: 'block' }}
          />
        </Placeholder>
      </Page>
    );
  }
  return (
    <Page>
      <List>
        <DisplayData header={'Init Data'} rows={initDataRows}/>
        {userRows && <DisplayData header={'User'} rows={userRows}/>}
        {receiverRows && <DisplayData header={'Receiver'} rows={receiverRows}/>}
        {chatRows && <DisplayData header={'Chat'} rows={chatRows}/>}
      </List>
    </Page>
  );
};
