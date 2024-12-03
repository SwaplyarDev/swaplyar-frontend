import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface InputFieldProps {
  id: string;
  type?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  file?: boolean;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onCustomChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({
  id,
  type = 'text',
  placeholder,
  register,
  error,
  file,
  value,
  defaultValue,
  disabled,
  onCustomChange,
}) => {
  // Sobrescribimos el onChange del register
  const { onChange, ...restRegister } = register;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event); // Llamamos al onChange de register
    if (onCustomChange) onCustomChange(event); // Ejecutamos la función personalizada si existe
  };

  return (
    <div className="flex h-full flex-col">
      <input
        id={id}
        type={type}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange} // Usamos la función combinada
        {...restRegister} // Usamos el resto de las props del register
        className={clsx(
          file ? 'hidden' : '',
          'h-full w-full rounded border border-[#6B7280] bg-gray-200 px-5 py-2 dark:bg-lightText',
          error
            ? 'border-red-500 hover:border-blue-600 dark:hover:border-white'
            : 'hover:border-blue-600 dark:hover:border-white',
        )}
      />
      {error && <p className="text-sm text-red-500">• {error}</p>}
    </div>
  );
};

export default InputField;
