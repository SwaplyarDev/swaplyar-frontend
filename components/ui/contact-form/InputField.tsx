import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
    id: string;
    type?: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: string;
}

const InputField: FC<InputFieldProps> = ({ id, type = "text", placeholder, register, error }) => (
    <div className="flex flex-col">
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            {...register}
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
            {error && <span className="text-red-500">{error}
        </span>}
    </div>
);

export default InputField;
