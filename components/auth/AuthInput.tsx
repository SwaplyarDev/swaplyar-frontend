'use client';
import React from 'react';

interface AuthInputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  name?: string;
  register?: any;
  validation?: any;
  disabled?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
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
  // Para compatibilidad con react-hook-form, value y onChange pueden venir de register
  const inputProps = register ? register(name, validation) : {};
  return (
    <div className="w-full mb-4 flex flex-col relative">
      <label
        htmlFor={name}
        className={[
          'font-textFont text-lightText dark:text-darkText mb-1 ml-2.5 text-sm absolute -top-5 left-0 transition-all duration-200 ease-in-out transform',
          isFocused || value || (inputProps && inputProps.value)
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={e => {
          onChange?.(e);
          if (inputProps.onChange) inputProps.onChange(e);
        }}
        placeholder={isFocused || value ? '' : placeholder}
        name={name}
        disabled={disabled}
        {...inputProps}
        onFocus={() => setIsFocused(true)}
        onBlur={e => setIsFocused(e.target.value !== '')}
        className={[
          'rounded-2xl border bg-custom-whiteD-200 p-2 focus:shadow-none focus:outline-none focus:ring-0 dark:bg-inputDark',
          (value || (inputProps && inputProps.value)) &&
          'border-inputLight dark:border-lightText mt-5',
          error
            ? 'mb-0 !border-errorColor text-errorColor placeholder-errorColor'
            : 'mb-5 border-inputLightDisabled placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText dark:hover:placeholder-lightText',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      {error && (
        <span className="mb-5 ml-2.5 mt-1 text-sm text-errorColor">{error}</span>
      )}
    </div>

  );
};

export default AuthInput;
