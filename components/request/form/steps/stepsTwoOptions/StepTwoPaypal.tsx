import React from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';

interface StepTwoPaypalProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
}

const StepTwoPaypal: React.FC<StepTwoPaypalProps> = ({ register, errors, getValues, blockAll, formData, watch }) => {
  return (
    <div className="mx-0 grid grid-cols-1 gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:grid-cols-2 sm-phone:gap-x-8 sm-phone:gap-y-2">
      <InputSteps
        label="Correo Electrónico de Paypal"
        name="bank_email"
        id="bank_email"
        type="email"
        placeholder={errors.bank_email ? 'Correo Electrónico de Paypal *' : 'Correo Electrónico de Paypal'}
        disabled={blockAll}
        register={register}
        watch={watch}
        rules={{
          required: 'El Correo Electrónico de Paypal es obligatorio',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: 'El Correo Electrónico de Paypal no es válido',
          },
        }}
        error={errors.bank_email ? (errors.bank_email as FieldError) : undefined}
        className="order-3 sm-phone:order-2"
      />

      <InputSteps
        label="RE-ENTER Correo Electrónico de Paypal"
        name="re_enter_bank_email"
        id="re_enter_bank_email"
        type="email"
        placeholder={
          errors.re_enter_bank_email
            ? 'RE-ENTER Correo Electrónica de Paypal *'
            : 'RE-ENTER Correo Electrónica de Paypal'
        }
        disabled={blockAll}
        register={register}
        watch={watch}
        rules={{
          required: 'El Correo Electrónico de Paypal es obligatorio',
          validate: (value) => {
            const originalValue = getValues('bank_email');
            return value === originalValue || 'Debe coincidir con el Correo Electrónico de Paypal';
          },
        }}
        error={errors.re_enter_bank_email ? (errors.re_enter_bank_email as FieldError) : undefined}
        className="order-4"
      />

      <InputSteps
        label="Transfer code de Paypal"
        name="transfer_identification"
        id="transfer_identification"
        type="text"
        placeholder={errors.transfer_identification ? 'Transfer code de Paypal *' : 'Transfer code de Paypal'}
        disabled={blockAll}
        register={register}
        watch={watch}
        rules={{
          required: 'El Transfer code de Paypal es obligatorio',
          pattern: {
            value: /^[A-Za-z0-9]+$/,
            message: 'El Transfer code de Paypal solo puede contener letras y números',
          },
        }}
        error={errors.transfer_identification ? (errors.transfer_identification as FieldError) : undefined}
        className="order-3 sm-phone:order-2"
      />
    </div>
  );
};

export default StepTwoPaypal;
