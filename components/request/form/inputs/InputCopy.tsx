import React, { FC, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import Copy from '@/components/ui/Copy/Copy';
import Tick from '@/components/ui/Tick/Tick';

interface InputCopyProps {
  id: string;
  type?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  value?: string;
  disabled?: boolean;
}

const InputCopy: FC<InputCopyProps> = ({
  id,
  type = 'text',
  placeholder,
  register,
  error,
  value = '',
  disabled,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [isFocused, setIsFocused] = useState(false);
  const { onChange, ...restRegister } = register;
  const [copied, setCopied] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event); // Llamamos al onChange de register
    if (handleCopy) handleCopy(); // Ejecutamos la función personalizada si existe
  };
  return (
    <div
      className={clsx(
        //focus:border-blue-600
        'flex max-h-[38px] rounded border bg-gray-200 dark:bg-lightText',
        // error
        //   ? 'border-red-500'
        //   : isFocused
        //     ? 'border-blue-600'
        //     : 'border-[#6B7280] hover:border-blue-600 dark:hover:border-white',
        error
        ? 'border-red-500'
        : 'border-[#6B7280] hover:border-blue-600 dark:hover:border-white',
      )}
    //   onFocus={() => setIsFocused(true)} // Manejador de foco en el contenedor
    //   onBlur={() => setIsFocused(false)} // Manejador de desenfoque en el contenedor
    //   tabIndex={0} // Asegúrate de que el div pueda recibir el enfoque
    >
      <input
        id={id}
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange} // Usamos la función combinada
        {...restRegister} // Usamos el resto de las props del register
        className={clsx(
          'flex h-[38px] w-full items-end rounded border-none bg-transparent px-5 py-2 focus:border-none focus:outline-none focus:ring-0',
        )}
        // onFocus={() => setIsFocused(true)} // Manejador de foco en el contenedor
        // onBlur={() => setIsFocused(false)} // Manejador de desenfoque en el contenedor
      />
      {error && <p className="text-sm text-red-500">• {error}</p>}
      <button
        type="button"
        className="flex h-[38px] items-center justify-center rounded border-none bg-transparent pr-2 transition-all duration-300 ease-in-out"
        // onClick={handleCopy}
        disabled={copied}
        onClick={() => handleCopy()}
      >
        {copied ? <Tick copy={true} /> : <Copy />}
      </button>
    </div>
  );
};

export default InputCopy;
