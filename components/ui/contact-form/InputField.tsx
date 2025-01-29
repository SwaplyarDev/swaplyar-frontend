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
          'w-full rounded-2xl border bg-[#fffff8] px-[9px] py-2 font-titleFont text-lightText placeholder:text-buttonExpandDark dark:bg-darkText',
          error
            ? 'border-[#c31818] placeholder:text-[#c31818]'
            : 'border-buttonExpandDark hover:border-buttonsLigth dark:border-placeholderDark dark:placeholder:text-placeholderDark dark:hover:border-white',
        )}
      />
      {error && <p className="px-[10px] pt-1 text-sm text-[#c31818]">{error}</p>}
    </div>
  );
};

export default InputField;
