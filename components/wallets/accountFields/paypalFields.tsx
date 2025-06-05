'use client';

import InputField from '@/components/ui/contact-form/InputField';

const PaypalFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    <InputField
      id="nombre"
      placeholder="Nombre"
      register={register('nombre', {
        required: 'El nombre es obligatorio',
        minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
      })}
      error={errors.nombre?.message}
    />
    <InputField
      id="apellido"
      placeholder="Apellido"
      register={register('apellido', {
        required: 'El apellido es obligatorio',
        minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
      })}
      error={errors.apellido?.message}
    />
    <InputField
      id="correo"
      placeholder="Correo electrónico"
      type="email"
      register={register('correo', {
        required: 'El correo es obligatorio',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Correo electrónico inválido',
        },
      })}
      error={errors.correo?.message}
    />
  </div>
);

export default PaypalFields;
