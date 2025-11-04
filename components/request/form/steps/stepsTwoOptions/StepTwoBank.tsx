'use client';
import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { getTaxIdentificationType, getTransferIdentificationType } from '@/utils/validationUtils';
import CustomInput from '@/components/ui/Input/CustomInput';

interface StepTwoBankProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
  formValues: any;
}

const StepTwoBank: React.FC<StepTwoBankProps> = ({
  register,
  errors,
  getValues,
  blockAll,
  formData,
  formValues,
  watch,
}) => {
  const taxIdentificationValue = formValues.tax_identification;
  const [taxIdentificationType, setTaxIdentificationType] = useState<string>('TAX ID/CUIT/CUIL');

  const methodValue = formValues.transfer_identification;
  const [methodType, setMethodType] = useState<string>('CBU/CVU/ALIAS');

  useEffect(() => {
    const type = getTaxIdentificationType(taxIdentificationValue);
    const typeMethod = getTransferIdentificationType(methodValue);
    setMethodType(typeMethod);
    setTaxIdentificationType(type);
  }, [taxIdentificationValue, methodValue]);
  return (
    <div className="mx-0 grid grid-cols-1 gap-2 sm:mx-0 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
      <CustomInput
        label="Nombre"
        name="receiver_first_name"
        type="text"
        placeholder={errors.receiver_first_name ? 'Nombre *' : 'Nombre'}
        disabled={blockAll || formData.stepOne?.own_account === 'Si'}
        register={register}
        value={watch('receiver_first_name')}
        validation={{
          required: 'El Nombre es obligatorio',
          pattern: {
            value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
            message: 'El Nombre solo puede contener letras y espacios',
          },
        }}
        error={errors.receiver_first_name?.message as string}
        defaultValue={formData.stepOne?.own_account !== 'Si' ? undefined : ''}
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
            ? formData.stepOne?.receiver_last_name
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
        label={taxIdentificationType}
        name="tax_identification"
        type="text"
        placeholder={errors.tax_identification ? 'DNI/CUIT/CUIL *' : 'DNI/CUIT/CUIL'}
        disabled={blockAll}
        register={register}
        value={watch('tax_identification')}
        validation={{
          required: 'El DNI/CUIT/CUIL es obligatorio',
          pattern: {
            value: /^(?:\d{8}|\d{11}|\d{2}-\d{8}-\d{1})$/,
            message: 'El formato de DNI/CUIT/CUIL es inválido',
          },
        }}
        error={errors.tax_identification?.message as string}
        className="order-3 sm-phone:order-5"
      />
      <CustomInput
        label={methodType}
        name="transfer_identification"
        type="text"
        placeholder={errors.transfer_identification ? 'CBU/CVU/ALIAS *' : 'CBU/CVU/ALIAS'}
        disabled={blockAll}
        register={register}
        value={watch('transfer_identification')}
        validation={{
          required: 'El CBU/CVU/ALIAS es obligatorio',
          pattern: {
            value: /^(?:\d{22}|[a-zA-Z0-9._-]{3,30})$/i,
            message: 'El formato de CBU/CVU/ALIAS es inválido',
          },
        }}
        error={errors.transfer_identification?.message as string}
        className="order-4 sm:order-2"
      />
      <CustomInput
        label="RE-ENTER CBU/CVU/ALIAS"
        name="re_transfer_identification"
        type="text"
        placeholder={errors.re_transfer_identification ? 'RE-ENTER CBU/CVU/ALIAS *' : 'RE-ENTER CBU/CVU/ALIAS'}
        disabled={blockAll}
        register={register}
        value={watch('re_transfer_identification')}
        validation={{
          required: 'El RE-ENTER CBU/CVU/ALIAS es obligatorio',
          validate: (value: string) => {
            const originalValue = getValues('transfer_identification');
            return value === originalValue || 'Debe coincidir con el CBU/CVU/ALIAS';
          },
        }}
        error={errors.re_transfer_identification?.message as string}
        className="order-5 sm-phone:order-4"
      />
      <CustomInput
        label="Nombre del Banco"
        name="name_of_bank"
        type="text"
        placeholder={errors.name_of_bank ? 'Nombre del Banco *' : 'Nombre del Banco'}
        disabled={blockAll}
        register={register}
        value={watch('name_of_bank')}
        validation={{
          required: 'El Nombre del Banco es obligatorio',
          pattern: {
            value: /^[A-Za-z0-9\s&.'-_]{1,60}$/i,
            message: 'El Nombre del Banco solo puede contener 60 caracteres',
          },
        }}
        error={errors.name_of_bank?.message as string}
        className="order-3 sm:order-6"
      />
    </div>
  );
};

export default StepTwoBank;