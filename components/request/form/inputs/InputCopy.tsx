import React, { FC, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import Copy from '@/components/ui/Copy/Copy';
import Tick from '@/components/ui/Tick/Tick';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

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
  const { isDark } = useDarkTheme();
  return (
    <div className="flex h-full flex-col">
      <div
        className={clsx(
          'flex max-h-[38px] rounded border border-[#6B7280] bg-gray-200 dark:bg-lightText',
          error && !isFocused
            ? 'border border-red-500 hover:border-blue-600 dark:hover:border-white'
            : isFocused
              ? 'outline-none border-blue-600 ring-1 ring-blue-600 ring-offset-blue-600 hover:border-blue-600 dark:hover:border-white'
              : 'hover:border-blue-600 dark:hover:border-white',
        )}
      >
        <input
          id={id}
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
          {...restRegister}
          className={clsx(
            'flex h-[38px] w-full rounded border-none bg-transparent px-5 py-2 focus:border-none focus:outline-none focus:ring-0',
          )}
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)} 
        />
        <button
          type="button"
          className="flex h-[38px] items-center justify-center rounded border-none bg-transparent pr-2 transition-all duration-300 ease-in-out"
          disabled={copied}
          onClick={() => handleCopy()}
        >
          {copied ? <Tick copy={true} color={isDark ? '#414244' : '#FCFBFA'}/> : <Copy />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">• {error}</p>}
    </div>
  );
};

export default InputCopy;
