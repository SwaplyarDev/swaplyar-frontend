import React from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';

interface StepTwoWiseProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
}

const StepTwoWise: React.FC<StepTwoWiseProps> = ({ register, errors, getValues, blockAll, formData }) => {
  return (
    <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="receiver_first_name"
            className={clsx(
              'ml-1 h-5 text-xs',
              errors.receiver_first_name ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            Nombre
          </label>
          <InputField
            disabled={blockAll || formData.stepOne?.own_account === 'Si'}
            id="receiver_first_name"
            type="text"
            value={formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_first_name : undefined}
            defaultValue={formData.stepOne?.own_account !== 'Si' ? undefined : ''}
            placeholder="Nombre"
            register={register('receiver_first_name', {
              required: 'El Nombre es obligatorio',
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                message: 'El Nombre solo puede contener letras y espacios',
              },
            })}
            error={errors.receiver_first_name?.message ? String(errors.receiver_first_name.message) : undefined}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="receiver_last_name"
            className={clsx(
              'ml-1 h-5 text-xs',
              errors.receiver_last_name ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            Apellido
          </label>
          <InputField
            disabled={blockAll || formData.stepOne?.own_account === 'Si'}
            id="receiver_last_name"
            type="text"
            value={formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_last_name : undefined}
            defaultValue={formData.stepOne?.own_account !== 'Si' ? undefined : ''}
            placeholder="Apellido"
            register={register('receiver_last_name', {
              required: 'El Apellido es obligatorio',
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                message: 'El Apellido solo puede contener letras y espacios',
              },
            })}
            error={errors.receiver_last_name?.message ? String(errors.receiver_last_name.message) : undefined}
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="bank_email"
            className={clsx(
              'ml-1 h-5 text-xs',
              errors.bank_email ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            Email de Wise
          </label>
          <InputField
            disabled={blockAll}
            id="bank_email"
            type="email"
            placeholder={`Email de Wise`}
            register={register('bank_email', {
              required: `El Email de Wise es obligatorio`,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: `El Email de Wise no es valido`,
              },
            })}
            error={errors.bank_email?.message ? String(errors.bank_email.message) : undefined}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="re_enter_bank_email"
            className={clsx(
              'ml-1 h-5 text-xs',
              errors.re_enter_bank_email ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            RE-ENTER Email de Wise
          </label>
          <InputField
            disabled={blockAll}
            id="re_enter_bank_email"
            type="email"
            placeholder={`RE-ENTER Email de Wise`}
            register={register('re_enter_bank_email', {
              required: `El Email de Wise es obligatorio`,
              validate: (value) => {
                const originalValue = getValues('bank_email');
                return value === originalValue || 'Debe coincidir con el Email de Wise';
              },
            })}
            error={errors.re_enter_bank_email?.message ? String(errors.re_enter_bank_email.message) : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwoWise;
