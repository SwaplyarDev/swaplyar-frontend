import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface InputFieldProps {
  id: string;
  type?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
}

const InputField: FC<InputFieldProps> = ({
  id,
  type = 'text',
  placeholder,
  register,
  error,
}) => (
  <div className="flex h-full flex-col">
    <input
      placeholder={placeholder}
      id={id}
      className={clsx(
        'h-full max-w-full rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
        error
          ? 'border-red-500'
          : 'hover:border-blue-600 dark:hover:border-white',
      )}
      type={type}
      {...register}
    />
    {error && <p className="text-sm text-red-500">• {error}</p>}
  </div>
);

export default InputField;
