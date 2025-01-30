import React, { useState } from 'react';
import clsx from 'clsx';
import { FieldError, UseFormRegister, UseFormWatch } from 'react-hook-form';

// Reglas de validación globales
const validationRules: Record<string, any> = {
  sender_first_name: {
    required: 'El Nombre es obligatorio',
    pattern: {
      value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
      message: 'El Nombre solo puede contener letras y espacios',
    },
  },
  sender_last_name: {
    required: 'El Apellido es obligatorio',
    pattern: {
      value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
      message: 'El Apellido solo puede contener letras y espacios',
    },
  },
  email: {
    required: 'El Correo es obligatorio',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
      message: 'El formato del Correo electrónico es inválido',
    },
  },
};

interface InputStepsProps {
  label: string;
  name: string;
  id: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  error?: FieldError;
  value?: string;
  defaultValue?: string;
  onCustomChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  file?: boolean;
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
  error,
  value,
  defaultValue,
  onCustomChange,
  file,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const errorMessage = error?.message;

  // Extraemos onChange del register para sobrescribirlo
  const { onChange, ...restRegister } = register(name, validationRules[name] || {});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event); // Llamamos al onChange del register
    if (onCustomChange) onCustomChange(event); // Ejecutamos la función personalizada si existe
  };

  return (
    <div className="flex flex-col">
      {/* Label visible cuando el input está enfocado o tiene valor */}
      <label
        htmlFor={id}
        className={clsx(
          'font-textFont text-lightText dark:text-darkText',
          isFocused || watch(name) ? 'opacity-100' : 'opacity-0',
          'mb-1 ml-2.5 text-sm transition-opacity duration-300',
          errorMessage && 'text-red-500',
        )}
      >
        {label}
      </label>

      {/* Input */}
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
            ? 'mb-0 border-errorColor text-errorColor placeholder-errorColor'
            : 'mb-5 border-inputLightDisabled placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText dark:hover:placeholder-lightText',
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Mensaje de error */}
      {errorMessage && <p className="px-[10px] pt-1 text-sm text-[#c31818]">{errorMessage}</p>}
    </div>
  );
};

export default InputSteps;
