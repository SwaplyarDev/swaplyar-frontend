'use client';

import InputField from '@/components/ui/contact-form/InputField';

const PixFields = ({ register, errors }: any) => (
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
      id="pix_key"
      placeholder="PIX KEY"
      register={register('pix_key', { required: 'La clave PIX es obligatoria' })}
      error={errors.pix_key?.message}
    />
    <InputField
      id="cpf"
      placeholder="CPF"
      register={register('cpf', {
        required: 'El CPF es obligatorio',
        pattern: {
          value: /^\d{11}$/,
          message: 'El CPF debe tener 11 dígitos numéricos',
        },
      })}
      error={errors.cpf?.message}
    />
  </div>
);

export default PixFields;
