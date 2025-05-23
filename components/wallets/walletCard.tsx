'use client';

import TrashButton from '../ui/TrashButton/TrashButton';

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
  return (
    <div className="w-full space-y-6 rounded-2xl bg-[#FFFFFB] px-4 py-4 dark:bg-[#4B4B4B] sm:px-16">
      {details.map((group, index) => (
        <div key={index} className="grid grid-cols-[1fr_auto] items-center gap-4 sm:gap-6">
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
                  <div className="max-w-full overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#012ABE] scrollbar-hide dark:scrollbar-thumb-white">
                    <p
                      className={`text-base sm:text-xl ${
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
            <div className="flex h-full items-center justify-end">
              <TrashButton onClick={() => onDelete(accountId, type)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
