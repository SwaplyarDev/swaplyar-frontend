import React, { useState } from 'react';
import clsx from 'clsx';
import { FieldError, UseFormRegister, UseFormWatch, RegisterOptions } from 'react-hook-form';
import { formatCpf, formatTaxId } from '@/utils/formatedTaxId';

interface InputStepsProps {
  label: string;
  name: string;
  id: string;
  maxLength?: number;
  type: string;
  placeholder: string;
  disabled?: boolean;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  rules?: RegisterOptions;
  error?: FieldError;
  value?: string;
  defaultValue?: string;
  onCustomChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  file?: boolean;
  className?: string;
  disabledWithoutMargin?: boolean;
  disabledLetters?: boolean;
}

const InputSteps: React.FC<InputStepsProps> = ({
  label,
  name,
  id,
  type,
  placeholder,
  disabled,
  register,
  watch,
  rules,
  error,
  maxLength,
  value,
  disabledLetters,
  defaultValue,
  onCustomChange,
  file,
  disabledWithoutMargin = false,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const errorMessage = error?.message;
  const [taxIdentificationType, setTaxIdentificationType] = useState<string>('DNI/CUIT/CUIL');
  const { onChange, ...restRegister } = register(name, rules);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (id === 'tax_identification') {
      const formattedValue = formatTaxId(event.target.value); // Pasar el nombre del campo

      event.target.value = formattedValue;
    } else if (id === 'individual_tax_id') {
      const formattedValue = formatCpf(event.target.value);
      event.target.value = formattedValue;
    }

    onChange(event);
    if (onCustomChange) onCustomChange(event);
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.value = event.currentTarget.value.replace(/[^0-9.-]/g, '');
  };

  return (
    <div className={`relative flex flex-col ${className}`}>
      <label
        htmlFor={id}
        className={clsx(
          'font-textFont text-lightText dark:text-darkText',
          'mb-1 ml-2.5 text-sm transition-opacity duration-300',
          isFocused || watch(name) || errorMessage ? 'opacity-100' : 'opacity-0',
        )}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        maxLength={maxLength}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={isFocused || watch(name) ? '' : placeholder}
        onChange={handleChange}
        onInput={disabledLetters ? handleInput : undefined}
        {...restRegister}
        className={clsx(
          file ? 'hidden' : '',
          disabledWithoutMargin ? 'mb-0' : errorMessage ? 'mb-0' : 'mb-5',
          'max-w-full rounded-2xl border bg-[#fffff8] px-[9px] py-2 font-titleFont text-lightText placeholder:text-buttonExpandDark dark:bg-darkText',
          watch(name) && 'border-inputLight dark:border-lightText',
          errorMessage
            ? 'mb-0 border-errorColor text-errorColor placeholder:text-errorColor'
            : 'border-inputLightDisabled placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText dark:hover:placeholder-lightText',
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {errorMessage && (
        <p className="bottom-[-20px] left-0 px-[10px] font-textFont text-sm text-errorColor">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputSteps;
