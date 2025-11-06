'use client';
import React from 'react';

interface AuthTextareaProps {
  label: string;
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  register?: any;
  validation?: any;
  disabled?: boolean;
  rows?: number;
}

const AuthTextarea: React.FC<AuthTextareaProps> = ({
  label,
  name,
  value,
  defaultValue,
  onChange,
  error,
  register,
  validation,
  disabled = false,
  rows = 5,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputProps = register ? register(name, validation) : {};

  return (
    <div className="w-full relative">
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        {...inputProps}
        onChange={(e) => {
          onChange?.(e);
          if (inputProps.onChange) inputProps.onChange(e);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== '')}
        className={[
          'peer w-full rounded-2xl border bg-custom-whiteD-200 p-3 pt-5 resize-none font-titleFont text-lightText dark:bg-transparent dark:text-custom-whiteD-200',
          error
            ? '!border-errorColor text-errorColor hover:!border-errorColor focus:!border-errorColor focus:!ring-errorColor'
            : 'border-inputLightDisabled hover:border-inputLight focus:border-inputLight dark:hover:border-custom-whiteD-200 dark:focus:border-custom-whiteD-200',
        ]
          .filter(Boolean)
          .join(' ')}
      />

      <label
        htmlFor={name}
        className={[
          'absolute left-3 px-1 transition-all duration-200 ease-in-out font-textFont',
          isFocused || value || defaultValue
            ? 'top-[-0.6rem] text-[12px] opacity-100 bg-custom-whiteD-200 dark:bg-custom-grayD-900'
            : 'top-3 text-[14px]',
          'peer-hover:text-inputLight peer-hover:dark:text-custom-whiteD-200 peer-focus:text-inputLightDisabled text-inputLightDisabled dark:text-inputLightDisabled peer-focus:dark:text-custom-whiteD-200',
          error && '!text-errorColor',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </label>

      {error && (
        <span className="absolute left-3 top-[-0.6rem] text-sm text-errorColor px-1 bg-custom-whiteD-200 dark:bg-custom-grayD-900">
          {error}
        </span>
      )}
    </div>
  );
};

export default AuthTextarea;