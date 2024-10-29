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
  value,
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { onChange, ...restRegister } = register;
  const [copied, setCopied] = useState(false);
  const [valueForm, setValueForm] = useState<string | undefined>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueForm(event.target.value);
    onChange(event);
  };
  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    if (valueForm) {
      navigator.clipboard.writeText(valueForm);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <div className="flex h-full flex-col">
      <div
        className={clsx(
          //focus:border-blue-600
          'flex max-h-[38px] rounded border border-[#6B7280] bg-gray-200 dark:bg-lightText focus:border-x-blue-600',
          error
            ? 'border-red-500'
            : isFocused
              ? 'border-blue-600'
              : 'hover:border-blue-600 dark:hover:border-white',
          // error
          //   ? 'border-red-500'
          //   : 'border-[#6B7280] hover:border-blue-600 dark:hover:border-white',
        )}
          onFocus={() => setIsFocused(true)} // Manejador de foco en el contenedor
          onBlur={() => setIsFocused(false)} // Manejador de desenfoque en el contenedor
          tabIndex={0} // Asegúrate de que el div pueda recibir el enfoque
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
            'flex h-[38px] w-full rounded border-none bg-transparent px-5 py-2 focus:border-none focus:outline-none focus:ring-0',
          )}
          onFocus={() => setIsFocused(true)} // Manejador de foco en el contenedor
          onBlur={() => setIsFocused(false)} // Manejador de desenfoque en el contenedor
        />
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
      {error && <p className="text-sm text-red-500">• {error}</p>}
    </div>
  );
};

export default InputCopy;
