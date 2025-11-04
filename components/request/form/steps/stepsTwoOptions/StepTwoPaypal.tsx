import React from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import CustomInput from '@/components/ui/Input/CustomInput';

interface StepTwoPaypalProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
}

const StepTwoPaypal: React.FC<StepTwoPaypalProps> = ({
  register,
  errors,
  getValues,
  blockAll,
  formData,
  watch,
}) => {
  return (
    <div className="mx-0 grid grid-cols-1 gap-2 sm:mx-0 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
      <CustomInput
        label="Nombre"
        name="receiver_first_name"
        type="text"
        placeholder={errors.receiver_first_name ? 'Nombre *' : 'Nombre'}
        disabled={blockAll || formData.stepOne?.own_account === 'Si'}
        register={register}
        value={
          formData.stepOne?.own_account === 'Si'
            ? formData.stepOne?.first_name
            : watch('receiver_first_name')
        }
        validation={{
          required: 'El Nombre es obligatorio',
          pattern: {
            value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
            message: 'El Nombre solo puede contener letras y espacios',
          },
        }}
        error={errors.receiver_first_name?.message as string}
        className="order-1"
      />

      <CustomInput
        label="Apellido"
        name="receiver_last_name"
        type="text"
        placeholder={errors.receiver_last_name ? 'Apellido *' : 'Apellido'}
        disabled={blockAll || formData.stepOne?.own_account === 'Si'}
        register={register}
        value={
          formData.stepOne?.own_account === 'Si'
            ? formData.stepOne?.receiver_last_name
            : watch('receiver_last_name')
        }
        validation={{
          required: 'El Apellido es obligatorio',
          pattern: {
            value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
            message: 'El Apellido solo puede contener letras y espacios',
          },
        }}
        error={errors.receiver_last_name?.message as string}
        className="order-2 sm:order-3"
      />

      <CustomInput
        label="Correo Electrónico de PayPal"
        name="bank_email"
        type="email"
        placeholder={
          errors.bank_email
            ? 'Correo Electrónico de PayPal *'
            : 'Correo Electrónico de PayPal'
        }
        disabled={blockAll}
        register={register}
        value={watch('bank_email')}
        validation={{
          required: 'El Correo Electrónico de PayPal es obligatorio',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: 'El Correo Electrónico de PayPal no es válido',
          },
        }}
        error={errors.bank_email?.message as string}
        className="order-3 sm-phone:order-2"
      />

      <CustomInput
        label="RE-ENTER Correo Electrónico de PayPal"
        name="re_enter_bank_email"
        type="email"
        placeholder={
          errors.re_enter_bank_email
            ? 'RE-ENTER Correo Electrónico de PayPal *'
            : 'RE-ENTER Correo Electrónico de PayPal'
        }
        disabled={blockAll}
        register={register}
        value={watch('re_enter_bank_email')}
        validation={{
          required: 'El Correo Electrónico de PayPal es obligatorio',
          validate: (value: string) => {
            const originalValue = getValues('bank_email');
            return (
              value === originalValue ||
              'Debe coincidir con el Correo Electrónico de PayPal'
            );
          },
        }}
        error={errors.re_enter_bank_email?.message as string}
        className="order-4"
      />
    </div>
  );
};

export default StepTwoPaypal;