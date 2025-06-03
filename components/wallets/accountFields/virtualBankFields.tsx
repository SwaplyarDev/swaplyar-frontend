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
      id="nombreBanco"
      placeholder="Nombre del banco"
      register={register('nombreBanco', { required: 'El banco es obligatorio' })}
      error={errors.nombreBanco?.message}
    />
    <InputField
      id="cvu"
      placeholder="CBU / CVU"
      register={register('cvu', {
        required: 'El CBU/CVU es obligatorio',
        pattern: {
          value: /^\d{22}$/,
          message: 'Debe tener 22 dígitos',
        },
      })}
      error={errors.cvu?.message}
    />
  </div>
);

export default VirtualBankFields;
