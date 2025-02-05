import React, { FC, useState } from 'react';
import { UseFormRegister, FieldValues, FieldError } from 'react-hook-form';
import clsx from 'clsx';
import Copy from '@/components/ui/Copy/Copy';
import Tick from '@/components/ui/Tick/Tick';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

interface InputCopyProps {
  id: string;
  name: string;
  label?: string;
  type?: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
  value?: string;
  disabled?: boolean;
  watch: (name: string) => string;
  rules?: object;
}

const InputCopy: FC<InputCopyProps> = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  value,
  disabled,
  watch,
  rules,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [valueForm, setValueForm] = useState<string | undefined>(watch(name));

  const { onChange, ...restRegister } = register(name, rules);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueForm(event.target.value);
    onChange(event);
  };

  const handleCopy = () => {
    const textToCopy = value || valueForm;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const { isDark } = useDarkTheme();

  return (
    <div className="flex h-full flex-col">
      {label && (
        <label
          htmlFor={id}
          className={clsx('ml-1 h-5 text-xs', error ? 'text-red-500' : 'text-lightText dark:text-darkText')}
        >
          {label}
        </label>
      )}
      <div
        className={clsx(
          'flex max-h-[38px] rounded-2xl border border-blue-600 bg-[#fffff8] dark:bg-lightText',
          error && !isFocused
            ? 'border border-red-500 hover:border-blue-600 dark:hover:border-white'
            : isFocused
              ? 'border-blue-600 outline-none ring-1 ring-blue-600 ring-offset-blue-600 hover:border-blue-600 dark:hover:border-white'
              : 'hover:border-blue-600 dark:hover:border-white',
        )}
      >
        <input
          id={id}
          type={type}
          value={value || valueForm}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
          {...restRegister}
          className="flex h-[38px] w-full rounded border-none bg-transparent px-5 py-2 focus:border-none focus:outline-none focus:ring-0"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="button"
          className="flex h-[38px] items-center justify-center rounded border-none bg-transparent pr-2 transition-all duration-300 ease-in-out"
          disabled={copied}
          onClick={handleCopy}
        >
          {copied ? <Tick copy={true} color={isDark ? '#414244' : '#FCFBFA'} /> : <Copy />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">• {error.message}</p>}
    </div>
  );
};

export default InputCopy;
