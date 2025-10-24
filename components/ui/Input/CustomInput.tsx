'use client';
import React from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

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
  name,
  register,
  validation,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputProps = register ? register(name, validation) : {};
  const { isDark } = useDarkTheme();

  const isLabelFloating = isFocused || !!value;

  return (
    <div className="w-full relative h-[40px] sm:h-[45px] md:h-[50px]">
      <input
        type={type}
        value={value}
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
          'peer w-full rounded-2xl border h-[40px] sm:h-[45px] md:h-[50px] focus:outline-none focus:ring-0 px-3 transition-colors duration-150',
          error
            ? isDark
              ? 'bg-custom-grayD-900 border-errorColorDark focus:border-errorColorDark text-custom-whiteD-200'
              : 'bg-custom-whiteD-200 border-errorColor focus:border-errorColor text-custom-dark'
            : isDark
              ? 'bg-custom-grayD-900 border-inputLightDisabled text-custom-whiteD-200 hover:border-custom-whiteD-200 focus:border-custom-whiteD-200'
              : 'bg-custom-whiteD-200 border-inputLightDisabled text-custom-dark hover:border-inputLight focus:border-inputLight',
              ]
          .filter(Boolean)
          .join(' ')}
      />
      <label
        htmlFor={name}
        className={[
          'absolute left-3 px-1 transition-all duration-200 ease-in-out font-textFont pointer-events-none',
          isLabelFloating
            ? `-top-2 text-[12px] opacity-100 ${
                isDark ? 'bg-inputDark' : 'bg-custom-whiteD-200 peer-hover:text-inputLight peer-focus:text-inputLight'
              }`
            : 'top-1/2 -translate-y-1/2 text-[14px]',
          ' text-inputLightDisabled',
          error && (isDark ? '!text-errorColorDark' : '!text-errorColor'),
          isDark ? 'peer-hover:text-custom-whiteD-200  peer-focus:text-custom-whiteD-200  dark:bg-custom-grayD-900 focus:border-custom-whiteD-200 hover:border-custom-whiteD-200 hover:text-custom-whiteD-200' : 'peer-hover:text-inputLight peer-focus:text-inputLight',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </label>
      {error && (
        <span
          className={[
            'absolute left-3 top-[-0.6rem] text-sm  px-1',
            isDark ? 'dark:bg-custom-grayD-900 text-errorTextColorDark' : 'bg-custom-whiteD-200 text-errorColor',
          ].filter(Boolean).join(' ')}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomInput;