import React from 'react';
import clsx from 'clsx';
import { FieldError, SelectBooleanProps } from '@/types/request/request';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const SelectBoolean: React.FC<SelectBooleanProps> = ({ selectedOption, setSelectedOption, errors, blockAll }) => {
  const fieldName = 'own_account';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]?.message;
  const { isDark } = useDarkTheme();

  const options = ['SI', 'NO'];

  return (
    <div className="flex items-center gap-4">
      <label
        className={clsx(
          errorMessage ? 'text-errorColor' : 'text-gray-900 dark:text-gray-300',
          'font-textFont text-lightText dark:text-darkText sm-phone:ml-0 text-sm md:text-base'
        )}
      >
        ¿Se transfiere a una cuenta propia?
      </label>
      <div className="flex gap-4">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            disabled={blockAll}
            onClick={() => setSelectedOption(option)}
            className={clsx(
              'text-xs md:text-base w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-colors',
              selectedOption === option
                ? isDark
                  ? 'bg-buttonsLigth text-custom-whiteD-500 border-custom-grayD-500'
                  : 'bg-buttonsLigth text-custom-whiteD-500 border-buttonsLigth'
                : isDark
                  ? 'bg-transparent text-custom-grayD-500 border-custom-grayD-500 hover:bg-buttonsLigth hover:text-custom-whiteD-500'
                  : 'bg-transparent text-buttonsLigth border-buttonsLigth hover:bg-buttonsLigth hover:text-custom-whiteD-500',
              blockAll && 'opacity-50 cursor-not-allowed'
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {errorMessage && <p className="text-sm text-errorColor mt-1">{errorMessage}</p>}
    </div>
  );
};

export default SelectBoolean;