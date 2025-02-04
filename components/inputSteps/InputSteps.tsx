import React, { useState } from 'react';
import clsx from 'clsx';
import { FieldError, UseFormRegister, UseFormWatch, RegisterOptions } from 'react-hook-form';

interface InputStepsProps {
  label: string;
  name: string;
  id: string;
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
  value,
  defaultValue,
  onCustomChange,
  file,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const errorMessage = error?.message;

  const { onChange, ...restRegister } = register(name, rules);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (onCustomChange) onCustomChange(event);
  };

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={id}
        className={clsx(
          'font-textFont text-lightText dark:text-darkText', // Mantiene el color normal siempre
          'mb-1 ml-2.5 text-sm transition-opacity duration-300',
          isFocused || watch(name) || errorMessage ? 'opacity-100' : 'opacity-0', // Siempre aparece si hay texto o error
        )}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={isFocused || watch(name) ? '' : placeholder}
        onChange={handleChange}
        {...restRegister}
        className={clsx(
          file ? 'hidden' : '',
          'max-w-full rounded-2xl border bg-[#fffff8] px-[9px] py-2 font-titleFont text-lightText placeholder:text-buttonExpandDark dark:bg-darkText',
          watch(name) && 'border-inputLight dark:border-lightText',
          errorMessage
            ? 'mb-0 border-errorColor text-errorColor placeholder:text-red-700' // Aquí está la clave
            : 'mb-5 border-inputLightDisabled placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText dark:hover:placeholder-lightText',
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* El mensaje de error está posicionado absolutamente, pero no afectará el flujo de otros elementos */}
      {errorMessage && <p className="bottom-[-20px] left-0 px-[10px] text-sm text-[#c31818]">{errorMessage}</p>}
    </div>
  );
};

export default InputSteps;
