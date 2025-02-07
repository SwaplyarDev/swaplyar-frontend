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
          'h-[41px] w-full border-x-0 border-b-[1px] border-t-0 border-buttonsLigth bg-transparent p-0 text-end font-textFont text-xs focus:border-buttonsLigth focus:outline-none focus:ring-0 dark:border-darkText xs:text-base',
          error
            ? 'placeholder:text-[#CE1818]'
            : 'border-buttonsLigth placeholder:text-inputLightDisabled dark:placeholder:text-darkText',
          classStyle,
        )}
        placeholder={placeholder}
        type={type}
        {...register}
        id={id}
      />
      {error && <p className="text-right text-sm text-[#CE1818]">{error}</p>}
    </div>
  );
};

export default InputOnlyLine;
