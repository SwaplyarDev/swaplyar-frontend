import InputField from '@/components/ui/contact-form/InputField';
import React from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';

interface StepTwoBankProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
}

const StepTwoBank: React.FC<StepTwoBankProps> = ({ register, errors, getValues, blockAll, formData }) => {
  return (
    <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="receiver_first_name"
            className={clsx(
              'ml-1 text-xs',
              errors.receiver_first_name ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            Nombre
          </label>
          <InputField
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
            disabled={blockAll || formData.stepOne?.own_account === 'Si'}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="receiver_last_name"
            className={clsx(
              'ml-1 text-xs',
              errors.receiver_last_name ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            Apellido
          </label>
          <InputField
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
            disabled={blockAll || formData.stepOne?.own_account === 'Si'}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="tax_identification"
            className={clsx(
              'ml-1 text-xs',
              errors.tax_identification ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            TAX ID/CUIT/CUIL
          </label>
          <InputField
            id="tax_identification"
            type="text"
            placeholder="TAX ID/CUIT/CUIL"
            register={register('tax_identification', {
              required: 'El TAX ID/CUIT/CUIL es obligatorio',
              pattern: {
                value: /^(?:\d{9}|\d{11}|\d{2}-\d{8}-\d{1})$/,
                message: 'El formato de TAX ID/CUIT/CUIL es inválido',
              },
            })}
            error={errors.tax_identification?.message ? String(errors.tax_identification.message) : undefined}
            disabled={blockAll}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="transfer_identification"
            className={clsx(
              'ml-1 text-xs',
              errors.transfer_identification ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            CBU/CVU/ALIAS
          </label>
          <InputField
            id="transfer_identification"
            type="text"
            placeholder="CBU/CVU/ALIAS"
            register={register('transfer_identification', {
              required: 'El CBU/CVU/ALIAS es obligatorio',
              pattern: {
                value: /^(?:\d{22}|[a-zA-Z0-9._-]{3,30})$/i,
                message: 'El formato de CBU/CVU/ALIAS es inválido',
              },
            })}
            error={errors.transfer_identification?.message ? String(errors.transfer_identification.message) : undefined}
            disabled={blockAll}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="re_transfer_identification"
            className={clsx(
              'ml-1 text-xs',
              errors.re_transfer_identification ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            RE-ENTER CBU/CVU/ALIAS
          </label>
          <InputField
            id="re_transfer_identification"
            type="text"
            placeholder="RE-ENTER CBU/CVU/ALIAS"
            register={register('re_transfer_identification', {
              required: 'El RE-ENTER CBU/CVU/ALIAS es obligatorio',
              validate: (value) => {
                const originalValue = getValues('transfer_identification');
                return value === originalValue || 'Debe coincidir con el CBU/CVU/ALIAS ingresado anteriormente';
              },
            })}
            error={
              errors.re_transfer_identification?.message ? String(errors.re_transfer_identification.message) : undefined
            }
            disabled={blockAll}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="name_of_bank"
            className={clsx('ml-1 text-xs', errors.name_of_bank ? 'text-red-500' : 'text-lightText dark:text-darkText')}
          >
            Nombre del Banco
          </label>
          <InputField
            id="name_of_bank"
            type="text"
            placeholder="Nombre del Banco"
            register={register('name_of_bank', {
              required: 'El Nombre del Banco es obligatorio',
              pattern: {
                value: /^[A-Za-z0-9\s&.'-_]{1,60}$/i,
                message: 'El Nombre del Banco solo puede contener 60 caracteres',
              },
            })}
            error={errors.name_of_bank?.message ? String(errors.name_of_bank.message) : undefined}
            disabled={blockAll}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwoBank;
