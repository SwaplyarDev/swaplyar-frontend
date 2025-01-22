import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface InputOnlyLineProps {
  id: string;
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: string;
  classStyle?: string;
}

const InputOnlyLine: FC<InputOnlyLineProps> = ({ placeholder, type = 'text', register, error, id, classStyle }) => {
  return (
    <div className="flex w-full flex-col">
      <input
        className={clsx(
          'border-b-4 border-buttonsLigth bg-transparent focus:outline-none focus:ring-0 dark:border-gray-200',
          error
            ? 'border-red-500'
            : 'hover:border-buttonsLigth focus:border-buttonsLigth dark:hover:border-white dark:focus:border-buttonsLigth',
          'border-x-0 border-t-0',
          classStyle,
        )}
        placeholder={placeholder}
        type={type}
        {...register}
        id={id}
      />
      {error && <p className="text-sm text-red-500">• {error}</p>}
    </div>
  );
};

export default InputOnlyLine;
