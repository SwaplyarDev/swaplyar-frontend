'use client';
import React from 'react';

interface CustomInputProps {
  label: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  name?: string;
  register?: any;
  validation?: any;
  disabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  name,
  register,
  validation,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputProps = register ? register(name, validation) : {};

  return (
    <div className="w-full relative h-[50px]">
      <input
        type={type}
        value={value}
        placeholder=""
        name={name}
        disabled={disabled}
        {...inputProps}
        onChange={(e) => {
          onChange?.(e);
          if (inputProps.onChange) inputProps.onChange(e);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== '')}
        className={[
          'peer w-full rounded-2xl border bg-custom-whiteD-200 h-[50px]',
          'focus:outline-none focus:ring-0 focus:border-inputLight',
          'dark:bg-inputDark dark:text-lightText',
          error
            ? '!border-errorColor text-errorColor'
            : 'border-inputLightDisabled hover:border-inputLight',
        ]
          .filter(Boolean)
          .join(' ')}
      />

      <label
        htmlFor={name}
        className={[
          'absolute left-3 px-1 transition-all duration-200 ease-in-out font-textFont',
          isFocused || value
            ? 'top-[-0.6rem] text-[12px] opacity-100 bg-custom-whiteD-200 dark:bg-inputDark px-1'
            : 'top-1/2 -translate-y-1/2 text-[14px]',
          'peer-hover:text-inputLight peer-focus:text-inputLight text-inputLightDisabled dark:text-darkText',
          error && '!text-errorColor',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </label>

      {error && (
        <span className="absolute left-3 top-[-0.6rem] text-sm text-errorColor px-1 bg-custom-whiteD-200 dark:bg-inputDark">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomInput;