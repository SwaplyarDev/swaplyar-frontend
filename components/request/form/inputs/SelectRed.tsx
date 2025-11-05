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
import CustomInput from '@/components/ui/Input/CustomInput';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const options = [
  { value: 'arbitrum', label: 'Arbitrum One', image: <IconArbitrum className="w-7 h-7" /> },
  { value: 'bnb', label: 'BNB Chain (BEP-20)', image: <IconBnb className="w-7 h-7" /> },
  { value: 'tron', label: 'Tron (TRC20)', image: <IconTron className="w-7 h-7" /> },
  { value: 'optimism', label: 'Optimism', image: <IconOptimism className="w-7 h-7" /> }
];

const SelectRed: React.FC<SelectRedProps> = ({ selectedRed, setSelectedRed, errors, blockAll }) => {
  const fieldName = 'red_selection';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]?.message;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useDarkTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div
        className="relative w-full cursor-pointer"
        onClick={() => !blockAll && setIsOpen(!isOpen)}
      >
        <CustomInput
          label="Selecciona la red"
          value={selectedRed?.label ?? ''}
          readOnly
          disabled={blockAll}
          isSelect={true}
          classNameInput='cursor-pointer'
        >
          <>
            {selectedRed?.image && (
              <span className="w-7 h-7 flex items-center justify-center">{selectedRed.image}</span>
            )}
            <ChevronDown
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-transform',
                { 'rotate-180': isOpen }
              )}
            />
          </>
        </CustomInput>
      </div>

      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className={`scrollable-list absolute top-full mt-1 z-10 w-full max-h-48 overflow-y-auto rounded-[32px] pl-2 ${isDark ? 'bg-custom-grayD-800' : 'bg-custom-whiteD'}`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={clsx(
                'scrollable-list flex cursor-pointer items-center gap-2 my-2 mx-2 rounded-full font-textFont',
                isDark ? 'text-custom-whiteD  hover:bg-custom-grayD-700' : 'text-inputLight hover:bg-custom-whiteD-500',
                { 
                  [isDark ? 'bg-custom-grayD-700 text-custom-whiteD' : 'bg-custom-whiteD-500']:
                  selectedRed?.value === option.value,
                },   
              )}
              onClick={() => {
                setSelectedRed(option);
                setIsOpen(false);
              }}
            >
              <span className="flex items-center justify-center w-8 h-8">{option.image}</span>
              <span>{option.label}</span>
            </li>
          ))}
        </motion.ul>
      )}

      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default SelectRed;