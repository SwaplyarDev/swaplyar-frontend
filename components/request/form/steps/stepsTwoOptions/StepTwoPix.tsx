import React from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';

interface StepTwoPixProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
}

const StepTwoPix: React.FC<StepTwoPixProps> = ({ register, errors, blockAll, formData }) => {
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
            htmlFor="pix_key"
            className={clsx('ml-1 h-5 text-xs', errors.pix_key ? 'text-red-500' : 'text-lightText dark:text-darkText')}
          >
            PIX KEY
          </label>
          <InputField
            disabled={blockAll}
            id="pix_key"
            type="text"
            placeholder={`PIX KEY`}
            register={register('pix_key', {
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

                return 'El PIX KEY no es válido. Debe ser un correo, teléfono, CPF, CNPJ o una clave aleatoria';
              },
            })}
            error={errors.pix_key?.message ? String(errors.pix_key.message) : undefined}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="individual_tax_id"
            className={clsx(
              'ml-1 h-5 text-xs',
              errors.individual_tax_id ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            INDIVIDUAL TAX ID (CPF)
          </label>
          <InputField
            disabled={blockAll}
            id="individual_tax_id"
            type="text"
            placeholder={`INDIVIDUAL TAX ID (CPF)`}
            register={register('individual_tax_id', {
              required: 'El INDIVIDUAL TAX ID (CPF) es obligatorio',
              pattern: {
                value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                message: 'El INDIVIDUAL TAX ID (CPF) no es válido. Debe estar en el formato XXX.XXX.XXX-XX',
              },
            })}
            error={errors.individual_tax_id?.message ? String(errors.individual_tax_id.message) : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwoPix;
