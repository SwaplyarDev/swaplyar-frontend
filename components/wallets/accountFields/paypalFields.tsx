'use client';

import InputField from '@/components/ui/contact-form/InputField';

const PaypalFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    {/* Nombre de la cuenta */}
    <InputField
      id="accountName"
      placeholder="Nombre de la cuenta"
      register={register('accountName', {
        required: 'El nombre de la cuenta es obligatorio',
        minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
      })}
      error={errors.accountName?.message}
    />

    {/* Nombre */}
    <InputField
      id="firstName"
      placeholder="Nombre"
      register={register('firstName', {
        required: 'El nombre es obligatorio',
        minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
      })}
      error={errors.firstName?.message}
    />

    {/* Apellido */}
    <InputField
      id="lastName"
      placeholder="Apellido"
      register={register('lastName', {
        required: 'El apellido es obligatorio',
        minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
      })}
      error={errors.lastName?.message}
    />

    {/* Correo */}
    <InputField
      id="email"
      placeholder="Correo electrónico"
      type="email"
      register={register('email', {
        required: 'El correo es obligatorio',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Correo electrónico inválido',
        },
      })}
      error={errors.email?.message}
    />
    <input type="hidden" {...register('currency')} value="USD" />
    <input type="hidden" {...register('accountType')} value="virtual_bank" />
    <input type="hidden" {...register('type')} value="paypal" />
  </div>
);

export default PaypalFields;
