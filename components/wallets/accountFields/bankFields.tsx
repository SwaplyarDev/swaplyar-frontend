'use client';

import CustomInput from '@/components/ui/Input/CustomInput';

import {
  getTaxIdentificationType,
  getTransferIdentificationType,
  validateTaxIdentification,
} from '@/utils/validationUtils';

interface BankFieldsProps {
  register: any;
  errors: any;
  defaultValues?: {
    accountName?: string;
    bankName?: string;
    send_method_key?: string;
    send_method_value?: string;
    document_type?: string;
    document_value?: number;
    currency?: string;
    firstName?: string;
    lastName?: string;
  };
}

const BankFields = ({ register, errors, defaultValues }: BankFieldsProps) => (
  <div className="flex flex-col gap-4">
    <input type="hidden" {...register('userAccValues.accountType')} defaultValue="bank" />
    <input type="hidden" {...register('userAccValues.currency')} defaultValue={defaultValues?.currency || 'USD'} />

    <CustomInput
      label="Nombre de la cuenta"
      name="accountName"
      placeholder="Nombre de la cuenta"
      register={register}
      validation={{ required: 'El nombre de la cuenta es obligatorio' }}
      error={errors.accountName?.message}
      defaultValue={defaultValues?.accountName || ''}
    />

    <CustomInput
      label="Nombre"
      name="firstName"
      placeholder="Nombre"
      register={register}
      validation={{ required: 'El nombre es obligatorio' }}
      error={errors.firstName?.message}
      defaultValue={defaultValues?.firstName || ''}
    />

    <CustomInput
      label="Apellido"
      name="lastName"
      placeholder="Apellido"
      register={register}
      validation={{ required: 'El apellido es obligatorio' }}
      error={errors.lastName?.message}
      defaultValue={defaultValues?.lastName || ''}
    />

    <CustomInput
      label="Nombre del banco"
      name="bankName"
      placeholder="Nombre del banco"
      register={register}
      validation={{ required: 'El nombre del banco es obligatorio' }}
      error={errors.bankName?.message}
      defaultValue={defaultValues?.bankName || ''}
    />

    <CustomInput
      label="DNI/CUIT/CUIL"
      name="document_value"
      placeholder="DNI/CUIT/CUIL"
      register={register}
      validation={{
        required: 'El DNI/CUIT/CUIL es obligatorio',
        validate: validateTaxIdentification,
      }}
      error={errors.document_value?.message}
      defaultValue={defaultValues?.document_value?.toString() || ''}
    />

    <CustomInput
      label="CBU/CVU/ALIAS"
      name="send_method_value"
      placeholder="CBU/CVU/ALIAS"
      register={register}
      validation={{
        required: 'El CBU/CVU/ALIAS es obligatorio',
        validate: (value: string) => {
          const tipo = getTransferIdentificationType(value);
          if (tipo) return true;
          return 'El formato de CBU/CVU/ALIAS es inválido';
        },
      }}
      error={errors.send_method_value?.message}
      defaultValue={defaultValues?.send_method_value || ''}
    />
  </div>
);

export default BankFields;