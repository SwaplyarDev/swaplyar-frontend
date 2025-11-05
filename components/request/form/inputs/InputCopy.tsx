import React, { FC, useState } from 'react';
import { UseFormRegister, FieldValues, FieldError } from 'react-hook-form';
import clsx from 'clsx';
import Copy from '@/components/ui/Copy/Copy';
import Tick from '@/components/ui/Tick/Tick';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import CustomInput from '@/components/ui/Input/CustomInput';

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
      <div
        className={clsx(
          'relative flex max-h-[42px] max-w-full items-center rounded-2xl border bg-transparent py-2 text-custom-blue focus:shadow-none focus:outline-none focus:ring-0 dark:bg-inputDark',
          watch(name) && 'border-inputLight dark:border-lightText',
          error
            ? 'border-errorColor placeholder-errorColor'
            : 'border-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:hover:border-lightText dark:hover:placeholder-lightText',
        )}
      >
        <CustomInput
          name={name}
          label={label!}
          type={type}
          placeholder={placeholder}
          register={register}
          error={error?.message}
          value={value}
          disabled={disabled}
          className='w-full'
        />
        <button
          type="button"
          className="absolute right-0 flex h-[38px] items-center justify-center rounded border-none bg-transparent pr-2 transition-all duration-300 ease-in-out dark:text-custom-grayD-700"
          disabled={copied}
          onClick={handleCopy}
        >
          {copied ? <Tick copy={true} color={isDark ? '#646464' : '#252526'} /> : <Copy color={isDark ? '#646464' : '#252526'} />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputCopy;
