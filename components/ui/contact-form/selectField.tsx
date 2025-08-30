import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface SelectFieldProps {
  id: string;
  register: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
  defaultValue?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  onCustomChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: FC<SelectFieldProps> = ({
  id,
  register,
  error,
  disabled,
  defaultValue,
  options,
  placeholder = 'Seleccione una opción',
  onCustomChange,
}) => {
  const { onChange, ...restRegister } = register;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event); // Llamamos al onChange de register
    if (onCustomChange) onCustomChange(event); // Ejecutamos la función personalizada si existe
  };

  return (
    <div className="flex h-full flex-col">
      <select
        id={id}
        defaultValue={defaultValue || ''}
        disabled={disabled}
        onChange={handleChange}
        {...restRegister}
        className={clsx(
          'w-full rounded-2xl border bg-[#fffff8] px-[9px] py-2 font-titleFont text-lightText dark:bg-darkText',
          error
            ? 'border-[#c31818] text-[#c31818]'
            : 'border-buttonExpandDark text-blue-300 placeholder:text-buttonExpandDark hover:border-buttonsLigth dark:border-placeholderDark dark:text-gray-400 dark:hover:border-white',
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="px-[10px] pt-1 text-sm text-[#c31818]">{error}</p>}
    </div>
  );
};

export default SelectField;
