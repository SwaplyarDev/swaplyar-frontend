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
  children?: React.ReactNode;
  className?: string;
  maxLength?: number;
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
  children,
  className = '',
  maxLength
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputProps = register ? register(name, validation) : {};
  const { isDark } = useDarkTheme();

  const hasValue = !!value || (inputProps?.value && inputProps.value !== '');
  const isLabelFloating = isFocused || hasValue;

  React.useEffect(() => {
    if (hasValue) setIsFocused(true);
  }, [hasValue]);
  return (
    <div className={['w-full relative', className].filter(Boolean).join(' ')}>
      <div
        className={[
          'flex items-center w-full rounded-2xl border h-[40px] sm:h-[45px] md:h-[50px] px-2 transition-colors duration-150',
          error
            ? isDark
              ? 'bg-custom-grayD-900 border-errorColorDark focus-within:border-errorColorDark text-custom-whiteD-200'
              : 'bg-custom-whiteD-200 border-errorColor focus-within:border-errorColor text-custom-dark'
            : isDark
              ? 'bg-custom-grayD-900 border-inputLightDisabled text-custom-whiteD-200 hover:border-custom-whiteD-200 focus-within:border-custom-whiteD-200'
              : 'bg-custom-whiteD-200 border-inputLightDisabled text-custom-dark hover:border-inputLight focus-within:border-inputLight',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children && <div className="flex items-center pr-2">{children}</div>}
        <input
          type={type}
          value={value}
          name={name}
          disabled={disabled}
          maxLength={maxLength}
          {...inputProps}
          onChange={(e) => {
            onChange?.(e);
            if (inputProps.onChange) inputProps.onChange(e);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== '')}
          className={[
            'peer flex-1 bg-transparent border-none px-2 font-textFont focus:outline-none focus:ring-0',
            isDark
              ? 'text-custom-whiteD-200 placeholder:text-placeholderDark'
              : 'text-custom-dark placeholder:text-inputLightDisabled',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        {(
          <label
            htmlFor={name}
            className={[
              'absolute px-1 transition-all duration-200 ease-in-out font-textFont pointer-events-none',
              isLabelFloating ? 'left-3' : children ? 'left-[108px]' : 'left-3',
              isLabelFloating
                ? `-top-2 text-[12px] opacity-100 ${
                    isDark ? 'bg-inputDark' : 'bg-custom-whiteD-200'
                  }`
                : 'top-1/2 -translate-y-1/2 text-[14px]',
              'text-inputLightDisabled',
              error && (isDark ? '!text-errorColorDark' : '!text-errorColor'),
              isDark
                ? 'peer-hover:text-custom-whiteD-200 peer-focus:text-custom-whiteD-200 dark:bg-custom-grayD-900 focus:border-custom-whiteD-200 hover:border-custom-whiteD-200 hover:text-custom-whiteD-200'
                : 'peer-hover:text-inputLight peer-focus:text-inputLight',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </label>
        )}        
      </div>
      {error && (
        <span
          className={[
            'absolute left-3 top-[-0.5rem] font-textFont text-xs px-1',
            isDark
              ? 'dark:bg-custom-grayD-900 text-errorTextColorDark'
              : 'bg-custom-whiteD-200 text-errorColor',
          ].filter(Boolean).join(' ')}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomInput;