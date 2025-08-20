import React from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';
import { useSystemStore } from '@/store/useSystemStore';

interface StepTwoWiseProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
}

const StepTwoWise: React.FC<StepTwoWiseProps> = ({ register, errors, getValues, blockAll, formData, watch }) => {
  return (
    <div className="mx-0 grid grid-cols-1 gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:grid-cols-2 sm-phone:gap-x-8 sm-phone:gap-y-2">

      <InputSteps
        label="Email de Wise"
        name="bank_email"
        id="bank_email"
        type="email"
        placeholder="Email de Wise"
        disabled={blockAll}
        register={register}
        watch={watch}
        rules={{
          required: 'El Email de Wise es obligatorio',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: 'El Email de Wise no es valido',
          },
        }}
        error={errors.bank_email ? (errors.bank_email as FieldError) : undefined}
        className="order-3 sm-phone:order-2"
      />
      <InputSteps
        label="RE-ENTER Email de Wise"
        name="re_enter_bank_email"
        id="re_enter_bank_email"
        type="email"
        placeholder="RE-ENTER Email de Wise"
        disabled={blockAll}
        register={register}
        watch={watch}
        rules={{
          required: 'El Email de Wise es obligatorio',
          validate: (value) => {
            const originalValue = getValues('bank_email');
            return value === originalValue || 'Debe coincidir con el Email de Wise';
          },
        }}
        error={errors.re_enter_bank_email ? (errors.re_enter_bank_email as FieldError) : undefined}
        className="order-4"
      />

      <InputSteps
        label="Transfer code de Wise"
        name="transfer_identification"
        id="transfer_identification"
        type="text"
        placeholder={errors.transfer_identification ? 'Transfer code de Wise *' : 'Transfer code de Wise'}
        disabled={blockAll}
        register={register}
        watch={watch}
        rules={{
          required: 'El Transfer code de Wise es obligatorio',
          pattern: {
            value: /^[A-Za-z0-9]+$/,
            message: 'El Transfer code de Wise no es válido',
          },
        }}
        error={errors.transfer_identification ? (errors.transfer_identification as FieldError) : undefined}
        className="order-3 sm-phone:order-2"
      />
    </div>
  );
};

export default StepTwoWise;
