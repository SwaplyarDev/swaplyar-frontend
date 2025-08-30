import React from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';

interface StepTwoPayoneerProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
}

const StepTwoPayoneer: React.FC<StepTwoPayoneerProps> = ({
  register,
  errors,
  getValues,
  blockAll,
  formData,
  watch,
}) => {
  return (
    <div className="mx-0 grid grid-cols-1 gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:grid-cols-2 sm-phone:gap-x-8 sm-phone:gap-y-2">
      <InputSteps
        label="Correo Electrónico de Payoneer"
        name="bank_email"
        id="bank_email"
        type="email"
        placeholder={errors.bank_email ? 'Correo Electrónico de Payoneer *' : 'Correo Electrónico de Payoneer'}
        disabled={blockAll}
        register={register}
        watch={watch}
        rules={{
          required: 'El Correo Electrónico de Payoneer es obligatorio',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: 'El Correo Electrónico de Payoneer no es válido',
          },
        }}
        error={errors.bank_email ? (errors.bank_email as FieldError) : undefined}
        className="order-3 sm-phone:order-2"
      />

      <InputSteps
        label="RE-ENTER Correo Electrónico de Payoneer"
        name="re_enter_bank_email"
        id="re_enter_bank_email"
        type="email"
        placeholder={
          errors.re_enter_bank_email
            ? 'RE-ENTER Correo Electrónico de Payoneer *'
            : 'RE-ENTER Correo Electrónico de Payoneer'
        }
        disabled={blockAll}
        register={register}
        watch={watch}
        rules={{
          required: 'El Correo Electrónico de Payoneer es obligatorio',
          validate: (value) => {
            const originalValue = getValues('bank_email');
            return value === originalValue || 'Debe coincidir con el Correo Electrónico de Payoneer';
          },
        }}
        error={errors.re_enter_bank_email ? (errors.re_enter_bank_email as FieldError) : undefined}
        className="order-4"
      />

      <InputSteps
        label="Transfer code de Payoneer"
        name="transfer_identification"
        id="transfer_identification"
        type="text"
        placeholder={errors.transfer_identification ? 'Transfer code de Payoneer *' : 'Transfer code de Payoneer'}
        disabled={blockAll}
        register={register}
        watch={watch}
        rules={{
          required: 'El Transfer code de Payoneer es obligatorio',
          pattern: {
            value: /^[A-Za-z0-9]+$/,
            message: 'El Transfer code de Payoneer solo puede contener letras y números',
          },
        }}
        error={errors.transfer_identification ? (errors.transfer_identification as FieldError) : undefined}
        className="order-3 sm-phone:order-2"
      />
    </div>
  );
};

export default StepTwoPayoneer;
