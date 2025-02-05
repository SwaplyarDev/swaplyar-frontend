import React from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch, useForm } from 'react-hook-form';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';

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
    <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
      <div className="flex w-full flex-col gap-4">
        <InputSteps
          label="Nombre"
          name="receiver_first_name"
          id="receiver_first_name"
          type="text"
          placeholder="Nombre"
          disabled={blockAll || formData.stepOne?.own_account === 'Si'}
          value={formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_first_name : undefined}
          defaultValue={formData.stepOne?.own_account !== 'Si' ? undefined : ''}
          register={register}
          watch={watch}
          rules={{
            required: 'El Nombre es obligatorio',
            pattern: {
              value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
              message: 'El Nombre solo puede contener letras y espacios',
            },
          }}
          error={errors.receiver_first_name ? (errors.receiver_first_name as FieldError) : undefined}
        />

        <InputSteps
          label="Apellido"
          name="receiver_last_name"
          id="receiver_last_name"
          type="text"
          placeholder="Apellido"
          disabled={blockAll || formData.stepOne?.own_account === 'Si'}
          value={formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_last_name : undefined}
          defaultValue={formData.stepOne?.own_account !== 'Si' ? undefined : ''}
          register={register}
          watch={watch}
          rules={{
            required: 'El Apellido es obligatorio',
            pattern: {
              value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
              message: 'El Apellido solo puede contener letras y espacios',
            },
          }}
          error={errors.receiver_last_name ? (errors.receiver_last_name as FieldError) : undefined}
        />
      </div>
      <div className="flex w-full flex-col gap-4">
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
        />
      </div>
    </div>
  );
};

export default StepTwoWise;
