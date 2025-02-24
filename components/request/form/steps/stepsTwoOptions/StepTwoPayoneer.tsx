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
        label="Nombre"
        name="receiver_first_name"
        id="receiver_first_name"
        type="text"
        placeholder={errors.reciever_first_name ? 'Nombre *' : 'Nombre'}
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
        className="order-1"
      />

      <InputSteps
        label="Apellido"
        name="receiver_last_name"
        id="receiver_last_name"
        type="text"
        placeholder={errors.reciever_last_name ? 'Apellido *' : 'Apellido'}
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
        className="order-2 sm-phone:order-3"
      />
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
    </div>
  );
};

export default StepTwoPayoneer;
