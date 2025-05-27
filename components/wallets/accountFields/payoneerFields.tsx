'use client';

import InputField from '@/components/ui/contact-form/InputField';

const PayoneerFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    <InputField
      id="nombre"
      placeholder="Nombre"
      register={register('nombre', { required: 'El nombre es obligatorio' })}
      error={errors.nombre?.message}
    />
    <InputField
      id="apellido"
      placeholder="Apellido"
      register={register('apellido', { required: 'El apellido es obligatorio' })}
      error={errors.apellido?.message}
    />
    <InputField
      id="correo"
      placeholder="Correo de Payoneer"
      register={register('correo', {
        required: 'El correo es obligatorio',
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' },
      })}
      error={errors.correo?.message}
    />
  </div>
);

export default PayoneerFields;
