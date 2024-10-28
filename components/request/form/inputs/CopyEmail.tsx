'use client';

import Check from '@/components/Icons/Check/Check';
import ContentCopy from '@/components/Icons/ContentCopy/ContentCopy';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

const CopyEmail = () => {
  const t = useTranslations('Home');
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={() => copyToClipboard('nacholopez1903@gmail.com')}
      className={clsx(
        'text-colorText dark:text-colorTextLight flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium leading-[1.8em] transition-all duration-300 ease-in-out',
        copied && 'bg-colorGreenDark',
      )}
    >
      <span className="transition-all duration-300 ease-in-out">
        {copied ? <Check /> : <ContentCopy />}
      </span>
      {t('CopyEmail')}
    </button>
  );
};

export default CopyEmail;
