'use client';

import InputField from '@/components/ui/contact-form/InputField';

const VirtualBankFields = ({ register, errors }: any) => (
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
      id="dni"
      placeholder="DNI"
      register={register('dni', {
        required: 'El DNI es obligatorio',
        pattern: {
          value: /^\d{7,9}$/,
          message: 'Debe contener entre 7 y 9 dígitos',
        },
      })}
      error={errors.dni?.message}
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
    <input type="hidden" {...register('transfer_code')} value="123456" />
  </div>
);

export default VirtualBankFields;
