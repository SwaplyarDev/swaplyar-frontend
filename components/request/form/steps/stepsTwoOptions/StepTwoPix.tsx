import React from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import CustomInput from '@/components/ui/Input/CustomInput';

interface StepTwoPixProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
  completedSteps: boolean[];
}

const StepTwoPix: React.FC<StepTwoPixProps> = ({ register, errors, blockAll, formData, watch, completedSteps }) => {
  return (
    <>
      <div className="mx-0 grid grid-cols-1 gap-2 sm:mx-0 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2 z-50">
        <CustomInput
          label="Nombre"
          name="receiver_first_name"
          type="text"
          placeholder={errors.receiver_first_name ? 'Nombre *' : 'Nombre'}
          disabled={blockAll || formData.stepOne?.own_account === 'Si'}
          register={register}
          value={
            formData.stepOne?.own_account === 'Si'
              ? formData.stepOne?.sender_first_name
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
              ? formData.stepOne?.sender_last_name
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
          className="order-2 sm-phone:order-3"
        />
        <CustomInput
          label="PIX KEY / Correo Electronico"
          name="pixKey"
          type="text"
          placeholder={errors.pixKey ? 'PIX KEY / Correo Electronico *' : 'PIX KEY / Correo Electronico'}
          disabled={blockAll}
          register={register}
          value={watch('pixKey')}
          validation={{
            required: 'El PIX KEY / Correo electronico es obligatorio',
            validate: (value: string) => {
              const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
              const phonePattern = /^\+?[1-9]\d{1,14}$/;
              const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
              const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
              const randomKeyPattern = /^[a-zA-Z0-9-]{32,36}$/;

              if (
                emailPattern.test(value) ||
                phonePattern.test(value) ||
                cpfPattern.test(value) ||
                cnpjPattern.test(value) ||
                randomKeyPattern.test(value)
              ) return true;

              return 'El PIX KEY / Correo electronico es obligatorio';
            },
          }}
          error={errors.pixKey?.message as string}
          className="order-3 sm:order-2 md:pb-1"
        />
        <CustomInput
          label="CPF"
          name="individual_tax_id"
          type="text"
          placeholder={errors.individual_tax_id ? 'CPF *' : 'CPF'}
          disabled={blockAll}
          register={register}
          value={watch('individual_tax_id') || ''}
          validation={{
            required: 'El CPF es obligatorio',
            validate: (value: string) =>
              !value
                ? true
                : /^[0-9.-]+$/.test(value)
                ? true
                : 'El CPF solo puede contener números, puntos y guiones',
          }}
          error={errors.individual_tax_id?.message as string}
          className="order-4"
          maxLength={14}
        />
      </div>
    </>
  );
};

export default StepTwoPix;