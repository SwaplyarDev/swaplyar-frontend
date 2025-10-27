'use client';

import CustomInput from "@/components/ui/Input/CustomInput";


interface PaymentFieldsProps {
  register: any;
  errors: any;
  currency: 'USD' | 'EUR';
  type: 'payoneer' | 'wise' | 'paypal';
}

const PaymentFields: React.FC<PaymentFieldsProps> = ({ register, errors, currency, type }) => {
  return (
    <div className="flex flex-col gap-4">
      <CustomInput
        label="Nombre de la cuenta"
        name="accountName"
        register={register}
        validation={{
          required: 'El nombre de la cuenta es obligatorio',
          minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
        }}
        error={errors.accountName?.message}
        placeholder="Nombre de la cuenta"
      />

      <CustomInput
        label="Nombre"
        name="firstName"
        register={register}
        validation={{
          required: 'El nombre es obligatorio',
          minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
        }}
        error={errors.firstName?.message}
        placeholder="Nombre"
      />

      <CustomInput
        label="Apellido"
        name="lastName"
        register={register}
        validation={{
          required: 'El apellido es obligatorio',
          minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
        }}
        error={errors.lastName?.message}
        placeholder="Apellido"
      />

      <CustomInput
        label="Correo electrónico"
        name="email"
        type="email"
        register={register}
        validation={{
          required: 'El correo es obligatorio',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Correo electrónico inválido',
          },
        }}
        error={errors.email?.message}
        placeholder="Correo electrónico"
      />

      <input type="hidden" {...register('currency')} value={currency} />
      <input type="hidden" {...register('accountType')} value="virtual_bank" />
      <input type="hidden" {...register('type')} value={type} />
    </div>
  );
};

export default PaymentFields;