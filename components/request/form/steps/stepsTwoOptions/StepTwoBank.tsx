import InputField from '@/components/ui/contact-form/InputField';
import React, { useEffect } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import clsx from 'clsx';
import SelectLabel from '../../inputs/SelectLabel';
import { RedType } from '@/types/request/request';

interface FormData {
  receiver_first_name: string;
  receiver_last_name: string;
  document_type: string | undefined;
  method_key: string | undefined;
  tax_identification: string;
  transfer_identification: string;
  re_transfer_identification: string;
  name_of_bank: string;
  bank_email: string;
  re_enter_bank_email: string;
  usdt_direction: string;
  re_enter_usdt_direction: string;
  red_selection: RedType | undefined;
  recieveAmountRed: string;
  pix_key: string;
  individual_tax_id: string;
}

interface StepTwoBankProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
  control: Control<FormData, any>;
  formValues: any;
  clearErrors: UseFormClearErrors<any>;
  setValue: UseFormSetValue<any>;
}
export const documentOptions = [
  { value: 'TAX ID', label: 'TAX ID' },
  { value: 'CUIT', label: 'CUIT' },
  { value: 'CUIL', label: 'CUIL' },
];

export const methodKeyOptions = [
  { value: 'CBU', label: 'CBU' },
  { value: 'CVU', label: 'CVU' },
  { value: 'ALIAS', label: 'ALIAS' },
];

const StepTwoBank: React.FC<StepTwoBankProps> = ({
  register,
  errors,
  getValues,
  blockAll,
  formData,
  control,
  formValues,
  clearErrors,
  setValue,
}) => {
  const getPattern = () => {
    switch (formValues.document_type) {
      case 'TAX ID':
        return { value: /^\d{9}$/, message: 'El TAX ID debe tener 9 dígitos' };
      case 'CUIT':
        return { value: /^\d{11}$/, message: 'El CUIT debe tener 11 dígitos' };
      case 'CUIL':
        return { value: /^\d{2}-\d{8}-\d{1}$/, message: 'El CUIL debe tener el formato XX-XXXXXXXX-X' };
      default:
        return { value: /.*/, message: 'Formato inválido' };
    }
  };

  const getPatternKey = () => {
    switch (formValues.method_key) {
      case 'CBU':
        return { value: /^\d{22}$/, message: 'El CBU debe tener 22 dígitos' };
      case 'CVU':
        return { value: /^\d{22}$/, message: 'El CVU debe tener 22 dígitos' };
      case 'ALIAS':
        return { value: /^\d{10}$/, message: 'El ALIAS debe tener 10 dígitos' };
      default:
        return { value: /.*/, message: 'Formato inválido' };
    }
  };

  useEffect(() => {
    clearErrors('tax_identification');
    clearErrors('transfer_identification');
  }, [formValues.document_type, clearErrors]);

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
              'ml-1 h-5 text-xs',
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
          <Controller
            name="document_type"
            control={control}
            defaultValue={undefined}
            rules={{ required: 'El Tipo de Documento es obligatorio' }}
            render={({ field, fieldState }) => (
              <SelectLabel
                fieldName="document_type"
                blockAll={blockAll}
                selectedOption={field.value}
                setSelectedOption={(option) => {
                  field.onChange(option);
                  setValue('tax_identification', '');
                  clearErrors('tax_identification');
                }}
                errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                options={documentOptions}
              />
            )}
          />
          <label htmlFor="tax_identification" className="hidden">
            TAX ID/CUIT/CUIL
          </label>
          <InputField
            id="tax_identification"
            type="text"
            placeholder="TAX ID/CUIT/CUIL"
            register={register('tax_identification', {
              required: `El ${formValues.document_type} es obligatorio`,
              pattern: getPattern(),
            })}
            error={errors.tax_identification?.message ? String(errors.tax_identification.message) : undefined}
            disabled={blockAll || formValues.document_type === undefined}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col">
          <Controller
            name="method_key"
            control={control}
            defaultValue={undefined}
            rules={{ required: 'El Metodo es obligatorio' }}
            render={({ field, fieldState }) => (
              <SelectLabel
                fieldName="method_key"
                blockAll={blockAll}
                selectedOption={field.value}
                setSelectedOption={(option) => {
                  field.onChange(option);
                  setValue('transfer_identification', '');
                  clearErrors('transfer_identification');
                }}
                errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                options={methodKeyOptions}
              />
            )}
          />
          <label htmlFor="transfer_identification" className="hidden">
            CBU/CVU/ALIAS
          </label>
          <InputField
            id="transfer_identification"
            type="text"
            placeholder="CBU/CVU/ALIAS"
            register={register('transfer_identification', {
              required: `El ${formValues.method_key} es obligatorio`,
              pattern: getPatternKey(),
            })}
            error={errors.transfer_identification?.message ? String(errors.transfer_identification.message) : undefined}
            disabled={blockAll || formValues.method_key === undefined}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="re_transfer_identification"
            className={clsx(
              'ml-1 h-5 text-xs',
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
            className={clsx(
              'ml-1 h-5 text-xs',
              errors.name_of_bank ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
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
