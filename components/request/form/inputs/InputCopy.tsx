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
          className={clsx(
            'font-textFont text-lightText dark:text-darkText',
            'mb-1 ml-2.5 text-sm transition-opacity duration-300',
            isFocused || watch(name) ? 'opacity-100' : 'opacity-0',
          )}
        >
          {label}
        </label>
      )}
      <div
        className={clsx(
          'flex max-h-[42px] max-w-full items-center rounded-2xl border bg-transparent py-2 text-lightText focus:shadow-none focus:outline-none focus:ring-0 dark:bg-inputDark',
          watch(name) && 'border-inputLight dark:border-lightText',
          error
            ? 'border-errorColor placeholder-errorColor'
            : 'border-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:hover:border-lightText dark:hover:placeholder-lightText',
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
          className="flex h-[38px] w-full rounded border-none bg-transparent px-[9px] focus:border-none focus:outline-none focus:ring-0"
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
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputCopy;
