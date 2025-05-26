'use client';

import TrashButton from '../ui/TrashButton/TrashButton';
import LoadingGif from '../ui/LoadingGif/LoadingGif';
import { useState } from 'react';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';

interface DetailItem {
  label: string;
  value: string;
  align?: 'left' | 'right' | 'center';
}

interface ReusableWalletCardProps {
  accountId: string;
  details: DetailItem[][];
  type: string;
  onDelete?: (accountId: string, typeAccount: string) => void;
}

export default function ReusableWalletCard({ details, onDelete, accountId, type }: ReusableWalletCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useDarkTheme();

  return (
    <div className="w-full space-y-6 rounded-2xl bg-[#FFFFFB] px-4 py-4 dark:bg-[#4B4B4B] sm:px-6 md:px-6 lg:px-6 lg2:px-24">
      {details.map((group, index) => (
        <div key={index} className="grid grid-cols-[1fr_auto] items-center gap-2 sm:gap-6">
          <div
            className={`grid w-full grid-cols-1 ${
              group.length === 2
                ? 'sm:grid-cols-2'
                : group.length === 3
                  ? 'sm:grid-cols-3'
                  : group.length === 4
                    ? 'sm:grid-cols-4'
                    : ''
            } gap-y-3 sm:gap-x-4`}
          >
            {group.map((item, i) => {
              const isTitular = item.label.toLowerCase() === 'titular';
              let alignmentClass = 'text-left';

              if (group.length === 3) {
                if (i === 0) alignmentClass += ' sm:justify-self-start';
                if (i === 1) alignmentClass += ' sm:justify-self-center';
                if (i === 2) alignmentClass += ' sm:justify-self-end sm:text-right';
              } else if (group.length === 4) {
                if (i === 0) alignmentClass += ' sm:justify-self-start';
                if (i === 1) alignmentClass += ' sm:justify-self-center';
                if (i === 2) alignmentClass += ' sm:justify-self-start';
                if (i === 3) alignmentClass += ' sm:justify-self-end sm:text-right';
              } else {
                alignmentClass +=
                  item.align === 'right'
                    ? ' sm:text-right sm:justify-self-end'
                    : item.align === 'center'
                      ? ' sm:text-center sm:justify-self-center'
                      : ' sm:text-left sm:justify-self-start';
              }

              return (
                <div key={i} className={`${alignmentClass} max-w-full`}>
                  <p className="text-xs text-gray-500 dark:text-gray-300">{item.label}</p>
                  {/* <div className="max-w-full overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#012ABE] scrollbar-hide dark:scrollbar-thumb-white"> */}
                  <div className="webkit-scrollbar scrollbar-thumb max-w-full overflow-x-auto overflow-y-hidden p-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#75bfff] dark:scrollbar-thumb-[#232e33]">
                    <p
                      className={`text-base sm:text-[22px] ${
                        isTitular ? 'font-normal' : 'font-semibold'
                      } whitespace-nowrap text-gray-900 dark:text-[#EBE7E0]`}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {onDelete && (
            <div className="flex h-full min-w-[30px] items-center justify-end">
              {isLoading ? (
                <div className="flex h-[44px] w-[44px] items-center justify-center sm:h-[48px] sm:w-[48px]">
                  <LoadingGif color={isDark ? '#EBE7E0' : '#012ABE'} size="32px" />
                </div>
              ) : (
                <TrashButton
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      await onDelete(accountId, type);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
