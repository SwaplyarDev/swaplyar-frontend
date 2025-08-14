'use client';

import InputField from '@/components/ui/contact-form/InputField';

const PayoneerFields = ({ register, errors }: any) => {
  const currencies = ['USD', 'EUR'];

  return (
    <div className="flex flex-col gap-4">
      {/* Nombre */}
      <InputField
        id="nombre"
        placeholder="Nombre"
        register={register('nombre', { required: 'El nombre es obligatorio' })}
        error={errors.nombre?.message}
      />

      {/* Apellido */}
      <InputField
        id="apellido"
        placeholder="Apellido"
        register={register('apellido', { required: 'El apellido es obligatorio' })}
        error={errors.apellido?.message}
      />

      {/* Correo Payoneer */}
      <InputField
        id="correo"
        placeholder="Correo de Payoneer"
        register={register('correo', {
          required: 'El correo es obligatorio',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' },
        })}
        error={errors.correo?.message}
      />

      {/* IBAN */}
      <InputField
        id="iban"
        placeholder="IBAN"
        register={register('iban', { required: 'El IBAN es obligatorio' })}
        error={errors.iban?.message}
      />

      {/* BIC */}
      <InputField
        id="bic"
        placeholder="BIC"
        register={register('bic', { required: 'El BIC es obligatorio' })}
        error={errors.bic?.message}
      />
      {/* Transfer Code - Hardcodeado en el envío */}
    </div>
  );
};

export default PayoneerFields;
