'use client';
import React from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

interface BottomBorderInputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  name?: string;
  register?: any;
  validation?: any;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  maxLength?: number;
}

const BottomBorderInput: React.FC<BottomBorderInputProps> = ({
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

  return (
    <div className={`w-full relative h-[50px] ${className}`}>
      <div className={`
        flex items-center w-full h-full border-0 border-b transition-colors duration-150
        
        ${error ? '!border-b-errorColor' : ''}
        ${isDark ? 'border-b-custom-whiteD-200 hover:border-b-custom-whiteD-200 focus-within:border-b-custom-whiteD-200' : 'border-b-inputLightDisabled hover:border-b-inputLight focus-within:border-b-inputLight'}
      `}>
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
          className={`
            peer flex-1 bg-transparent border-0 px-2 font-textFont focus:outline-none focus:ring-0 h-full
            ${isDark ? 'text-custom-whiteD-200 placeholder:text-placeholderDark' : 'text-custom-dark placeholder:text-inputLightDisabled'}
          `}
        />
        <label
          htmlFor={name}
          className={`
            absolute px-1 transition-all duration-200 ease-in-out font-textFont pointer-events-none
            ${isLabelFloating ? 'left-3' : children ? 'left-[108px]' : 'left-3'}
            ${isLabelFloating 
              ? `-top-2 text-[12px] opacity-100` 
              : 'top-1/2 -translate-y-1/2 text-[14px]'
            }
            text-inputLightDisabled
            ${error && (isDark ? '!text-errorColorDark' : '!text-errorColor')}
            ${isDark 
              ? 'peer-hover:text-custom-whiteD-200 peer-focus:text-custom-whiteD-200' 
              : 'peer-hover:text-inputLight peer-focus:text-inputLight'
            }
          `}
        >
          {error ? (
            <span className={`
          font-textFont text-xs
          ${isDark ? 'text-errorTextColorDark' : 'text-errorColor'}
        `}>
              {error}
            </span>
          ) : (
            <span>{label}</span>
          )}
        </label>
      </div>
      
    </div>
  );
};

export default BottomBorderInput;