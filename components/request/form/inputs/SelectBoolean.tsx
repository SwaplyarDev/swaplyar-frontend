import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { FieldError, SelectBooleanProps } from '@/types/request/request';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const SelectBoolean: React.FC<SelectBooleanProps> = ({ selectedOption, setSelectedOption, errors, blockAll }) => {
  const fieldName = 'own_account';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]?.message;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: 'Si', label: 'Si' },
    { value: 'No', label: 'No' },
  ];

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
        className={clsx(errorMessage ? 'text-errorColor' : 'text-gray-900 dark:text-gray-300', 'hidden')}
      >
        ¿Tienes cuenta propia?
      </label>
      <div
        ref={dropdownRef}
        className={clsx(
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
              selectedOption === undefined ? 'text-inputLightDisabled dark:text-placeholderDark' : 'text-lightText',
            )}
          >
            {selectedOption || 'Selecciona una opción'}
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
                className={cn('flex cursor-pointer justify-between px-4 py-2 font-textFont hover:bg-gray-200', {
                  'bg-gray-100': selectedOption === option.value,
                })}
                onClick={() => {
                  setSelectedOption(option.value);
                  setIsOpen(false);
                }}
              >
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

export default SelectBoolean;
