'use client';

import InputField from '@/components/ui/contact-form/InputField';

const BankFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    {/* Nombre */}
    <InputField
      id="first_name"
      placeholder="Nombre"
      register={register('first_name', { required: 'El nombre es obligatorio' })}
      error={errors.first_name?.message}
    />

    {/* Apellido */}
    <InputField
      id="last_name"
      placeholder="Apellido"
      register={register('last_name', { required: 'El apellido es obligatorio' })}
      error={errors.last_name?.message}
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
      id="bank_name"
      placeholder="Nombre del banco"
      register={register('bank_name', { required: 'El nombre del banco es obligatorio' })}
      error={errors.bank_name?.message}
    />

    <InputField
      id="send_method_value"
      placeholder="Número CBU/CVU o Alias"
      register={register('send_method_value', { required: 'Este campo es obligatorio' })}
      error={errors.send_method_value?.message}
    />

    <InputField id="alias" placeholder="Alias (opcional)" register={register('alias')} error={errors.alias?.message} />

    {/* Sucursal */}
    <InputField
      id="branch"
      placeholder="Sucursal"
      register={register('branch', { required: 'La sucursal es obligatoria' })}
      error={errors.branch?.message}
    />

    <input type="hidden" {...register('account_type')} value="bank" />
  </div>
);

export default BankFields;
