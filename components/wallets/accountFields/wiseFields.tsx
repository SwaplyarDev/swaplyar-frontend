'use client';

import InputField from '@/components/ui/contact-form/InputField';

const WiseFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    <InputField
      id="nombre"
      placeholder="Nombre"
      register={register('nombre', {
        required: 'El nombre es obligatorio',
        minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
      })}
      error={errors?.nombre?.message}
    />

    <InputField
      id="apellido"
      placeholder="Apellido"
      register={register('apellido', {
        required: 'El apellido es obligatorio',
        minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
      })}
      error={errors?.apellido?.message}
    />
    <InputField
      id="correo"
      placeholder="Correo de Wise"
      register={register('correo', {
        required: 'El correo es obligatorio',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Correo inválido',
        },
      })}
      error={errors?.correo?.message}
    />
    <InputField
      id="iban"
      placeholder="IBAN / Nº de cuenta"
      register={register('iban', {
        required: 'El IBAN es obligatorio',
        minLength: {
          value: 15,
          message: 'Debe tener al menos 15 caracteres',
        },
        maxLength: {
          value: 34,
          message: 'No puede tener más de 34 caracteres',
        },
        pattern: {
          value: /^[A-Z0-9]+$/,
          message: 'Solo letras mayúsculas y números',
        },
      })}
      error={errors?.iban?.message}
    />

    <InputField
      id="bic"
      placeholder="BIC / SWIFT"
      register={register('bic', {
        required: 'El BIC es obligatorio',
        minLength: {
          value: 8,
          message: 'Debe tener al menos 8 caracteres',
        },
        maxLength: {
          value: 11,
          message: 'No puede tener más de 11 caracteres',
        },
        pattern: {
          value: /^[A-Z0-9]+$/,
          message: 'Solo letras mayúsculas y números',
        },
      })}
      error={errors?.bic?.message}
    />
  </div>
);

export default WiseFields;
