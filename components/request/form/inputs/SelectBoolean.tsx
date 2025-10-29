import React from 'react';
import clsx from 'clsx';
import { FieldError, SelectBooleanProps } from '@/types/request/request';

const SelectBoolean: React.FC<SelectBooleanProps> = ({ selectedOption, setSelectedOption, errors, blockAll }) => {
  const fieldName = 'own_account';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]?.message;

  const options = ['SI', 'NO'];

  return (
    <div className="flex items-center gap-4">
      <label
        className={clsx(
          errorMessage ? 'text-errorColor' : 'text-gray-900 dark:text-gray-300',
          'font-textFont text-lightText dark:text-darkText sm-phone:ml-0 sm-phone:text-sm md:text-lg'
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
              'w-10 h-10 rounded-full border text-buttonsLigth  hover:text-custom-whiteD-500 hover:border-buttonsLigth border-buttonsLigth flex items-center justify-center font-semibold transition-colors',
              selectedOption === option
                ? 'bg-buttonsLigth text-custom-whiteD-500 border-buttonsLigth'
                : 'bg-transparent text-buttonsLigth border-buttonsLigth hover:bg-buttonsLigth',
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