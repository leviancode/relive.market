'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { CURRENCIES } from '@/constants/currencies';
import { Select } from '@telegram-apps/telegram-ui';

interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  value,
  onChange,
  className,
}) => {
  const lang = useLocale() as 'en' | 'uk' | 'ru';

  return (
    <Select 
      value={value} 
      onChange={({ target }) => onChange(target.value)}
      className={className}
    >
      {CURRENCIES.map((currency) => (
        <option key={currency.code} value={currency.code}>
          {`${currency.flag} ${currency.symbol} — ${currency.name[lang] || currency.name.en}`}
        </option>
      ))}
    </Select>
  );
};
