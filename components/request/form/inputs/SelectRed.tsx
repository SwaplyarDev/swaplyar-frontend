import IconArbitrum from '@/components/ui/IconsRed/IconArbitrum';
import IconBnb from '@/components/ui/IconsRed/IconBnb';
import IconOptimism from '@/components/ui/IconsRed/IconOptimism';
import IconTron from '@/components/ui/IconsRed/IconTron';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { FieldError, SelectRedProps } from '@/types/request/request';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const options = [
  {
    value: 'arbitrum',
    label: 'Arbitrum One',
    image: <IconArbitrum />,
  },
  {
    value: 'bnb',
    label: 'BNB Chain (BEP-20)',
    image: <IconBnb />,
  },
  {
    value: 'tron',
    label: 'Tron (TRC20)',
    image: <IconTron />,
  },
  {
    value: 'optimism',
    label: 'Optimism',
    image: <IconOptimism />,
  },
];

const SelectRed: React.FC<SelectRedProps> = ({ selectedRed, setSelectedRed, errors, blockAll }) => {
  const fieldName = 'red_selection';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]?.message;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      <label
        htmlFor={fieldName}
        className={clsx(
          'ml-1 h-5 text-xs',
          selectedRed === undefined ? 'hidden' : errorMessage ? 'text-red-500' : 'text-lightText dark:text-darkText',
        )}
      >
        Selecciona una Red
      </label>
      <div
        ref={dropdownRef}
        className={clsx(
          selectedRed === undefined && 'mt-5',
          'relative flex max-h-[38px] max-w-full items-center rounded-2xl border bg-transparent py-2 pr-5 focus:shadow-none focus:outline-none focus:ring-0 dark:bg-inputDark',
          errorMessage
            ? 'border-errorColor text-errorColor placeholder-errorColor'
            : 'border-inputLightDisabled placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText dark:hover:placeholder-lightText',
        )}
      >
        <button
          className="flex w-full items-center justify-between gap-1 rounded-lg bg-transparent py-2 pl-4 font-textFont text-lightText focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          disabled={blockAll}
        >
          <span
            className={clsx(
              selectedRed === undefined ? 'text-inputLightDisabled dark:text-placeholderDark' : 'text-lightText',
              'flex items-center gap-2',
            )}
          >
            {selectedRed?.image}
            {selectedRed?.label || 'Selecciona una Red'}
          </span>
          <ChevronDown className={cn('h-5 w-5 transition-transform', { 'rotate-180': isOpen })} />
        </button>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="scrollable-list absolute top-10 z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-custom-grayD-300 bg-custom-whiteD shadow-lg"
          >
            {options.map((option, index) => (
              <li
                key={index}
                className={cn('flex cursor-pointer items-center gap-2 px-4 py-2 font-textFont hover:bg-gray-200', {
                  'bg-gray-100': selectedRed?.value === option.value,
                })}
                onClick={() => {
                  setSelectedRed(option);
                  setIsOpen(false);
                }}
              >
                {option.image}
                <span>{option.label}</span>
              </li>
            ))}
          </motion.ul>
        )}
        {errorMessage && <p className="mt-1 text-sm text-errorColor">{errorMessage}</p>}
      </div>
    </>
  );
};

export default SelectRed;
