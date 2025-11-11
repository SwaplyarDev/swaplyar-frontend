'use client';

import { ChangeEvent, Fragment, useEffect } from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form';
import clsx from 'clsx';

interface VerificationCodeInputProps {
  // Control del formulario
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  
  // Callbacks
  onComplete?: (code: string) => void | Promise<void>;
  onChange?: (code: string) => void;
  
  // Estados
  isDisabled?: boolean;
  isLoading?: boolean;
  error?: string | boolean;
  
  // Estilos
  isDark?: boolean;
  showSeparators?: boolean;
  className?: string;
  
  // Configuración
  codeLength?: number;
  fieldName?: string;
  
  // Funciones adicionales
  clearErrors?: () => void;
}

export const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  register,
  watch,
  setValue,
  onComplete,
  onChange,
  isDisabled = false,
  isLoading = false,
  error,
  isDark = false,
  className = '',
  codeLength = 6,
  fieldName = 'verificationCode',
  clearErrors,
}) => {
  
  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    
    if (/^\d*$/.test(value)) {
      if (clearErrors) {
        clearErrors();
      }
      
      const newVerificationCode = [...(watch(fieldName) || Array(codeLength).fill(''))];
      newVerificationCode[index] = value;
      setValue(fieldName, newVerificationCode);
      
      // Callback onChange
      if (onChange) {
        onChange(newVerificationCode.join(''));
      }

      // Auto-navegación al siguiente input
      if (value.length === 1 && index < codeLength - 1) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleInputKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && event.currentTarget.value === '') {
      if (index > 0) {
        const prevInput = document.getElementById(`code-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    
    if (clearErrors) {
      clearErrors();
    }
    
    const pastedData = event.clipboardData.getData('text').replace(/\s/g, '');
    const characters = pastedData.slice(0, codeLength).split('');

    characters.forEach((char, i) => {
      if (i < codeLength) {
        setValue(`${fieldName}.${i}`, char);
      }
    });
    
    // Callback onChange
    if (onChange) {
      onChange(characters.join(''));
    }
  };

  // Auto-submit cuando se completa el código
  const verificationCodeValues = watch(fieldName);
  
  useEffect(() => {
    if (onComplete) {
      const code = verificationCodeValues?.join('') || '';

      if (code.length === codeLength && /^\d+$/.test(code) && !isLoading && !error) {
        onComplete(code);
      }
    }
  }, [verificationCodeValues, onComplete, codeLength, isLoading, error]);

  return (
    <div className={clsx('flex justify-center', className)}>
      {[...Array(codeLength)].map((_, index) => {
        const hasValue = watch(`${fieldName}.${index}`)?.length > 0;
        
        return (
          <Fragment key={index}>
            <div className={clsx(
              "relative rounded-full size-[46px] md:size-[56px] lg:size-[58px]",
            )}>
              <input
                id={`code-${index}`}
                type="text"
                maxLength={1}
                disabled={isDisabled || isLoading}
                className={clsx(
                  // Estilos base
                  'h-full w-full rounded-full text-center text-2xl text-inputLight focus:outline-none p-0 transition-all duration-200 border-2 border-[#90B0FE] focus:border-[#012A8E] focus:shadow-[inset_0_0_6px_1px_rgba(1,42,142,0.3)] hover:border-[#012A8E] dark:border-[#FAF6EF] dark:bg-[#FAF6EF] dark:focus:border-[#012A8E80] dark:focus:border-4 dark:focus:shadow-[inset_0_0_6px_1px_rgba(250,246,239,0.5)] dark:hover:border-[#012A8E80] sm:text-3xl',
                  // Estado con valor
                  hasValue && !error ? '!border-custom-blue shadow-[inset_0px_0_6px_1px_rgba(1,42,142,0.3)] dark:!border-custom-whiteD-500 dark:shadow-[inset_0_0_6px_1px_rgba(1,42,142,0.5)]' : '',
                  // Estado de error
                  error ? 'border-errorColor focus:shadow-[inset_0_2px_4px_0_rgba(240,82,82,0.3)]' : '',
                )}
                {...register(`${fieldName}.${index}`)}
                onPaste={handlePaste}
                onChange={(event) => handleInputChange(index, event)}
                onKeyDown={(event) => handleInputKeyDown(index, event)}
              />
            </div>
            
          </Fragment>
        );
      })}
    </div>
  );
};
