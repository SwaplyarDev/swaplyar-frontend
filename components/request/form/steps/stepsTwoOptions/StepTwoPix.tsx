import React from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';
import InfoStep from '@/components/ui/InfoStep/InfoStep';
import clsx from 'clsx';
import { formatTaxId } from '@/utils/formatedTaxId';

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
      <div
        className={clsx(
          completedSteps[1]
            ? 'absolute right-[15px] top-[15px] sm:right-14'
            : 'absolute right-5 top-[9rem] mini-phone:top-4',
        )}
      >
        <InfoStep option="pix" />
      </div>
      <div className="mx-0 grid grid-cols-1 gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:grid-cols-2 sm-phone:gap-x-8 sm-phone:gap-y-2">

        <InputSteps
          label="Pix id"
          name="pixId"
          id="pixId"
          type="text"
          placeholder={errors.pixId ? 'Pix id *' : 'Pix id'}
          disabled={blockAll}
          register={register}
          watch={watch}
          maxLength={10}
          rules={{
            required: 'El Pix id es obligatorio',
          }}
          error={errors.pixId ? (errors.pixId as FieldError) : undefined}
          className="order-4"
        />

        <InputSteps
          label="PIX KEY / Correo Electronico"
          name="pixKey"
          id="pixKey"
          type="text"
          placeholder={errors.pixKey ? 'PIX KEY / Correo Electronico *' : 'PIX KEY / Correo Electronico'}
          disabled={blockAll}
          register={register}
          watch={watch}
          rules={{
            required: 'El PIX KEY es obligatorio',
            validate: (value) => {
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
              ) {
                return true;
              }

              return 'El PIX KEY es obligatorio';
            },
          }}
          error={errors.pix_key ? (errors.pix_key as FieldError) : undefined}
          className="order-3 sm-phone:order-2"
        />

        <InputSteps
          label="CPF"
          name="individual_tax_id"
          id="individual_tax_id"
          type="text"
          placeholder={errors.individual_tax_id ? 'CPF *' : 'CPF'}
          disabled={blockAll}
          register={register}
          watch={watch}
          maxLength={14}
          disabledLetters
          rules={{
            required: 'El CPF es obligatorio',
          }}
          error={errors.individual_tax_id ? (errors.individual_tax_id as FieldError) : undefined}
          className="order-4"
        />
        {/* Agregar pixId */}
      </div>
    </>
  );
};

export default StepTwoPix;
