'use client';

import InputField from '@/components/ui/contact-form/InputField';
import { getTaxIdentificationType, getTransferIdentificationType } from '@/utils/validationUtils';

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
  };
}

const BankFields = ({ register, errors, defaultValues }: BankFieldsProps) => (
  <div className="flex flex-col gap-4">
    <input type="hidden" {...register('userAccValues.accountType')} defaultValue="bank" />
    <input type="hidden" {...register('userAccValues.currency')} defaultValue={defaultValues?.currency || 'USD'} />

    <InputField
      id="accountName"
      placeholder="Titular"
      defaultValue={defaultValues?.accountName || ''}
      register={register('accountName', { required: 'El nombre de la cuenta es obligatorio' })}
      error={errors.accountName?.message}
    />

    <InputField
      id="bankName"
      placeholder="Nombre del banco"
      defaultValue={defaultValues?.bankName || ''}
      register={register('bankName', { required: 'El nombre del banco es obligatorio' })}
      error={errors.bankName?.message}
    />

    <InputField
      id="document_value"
      placeholder={errors.document_value ? 'DNI/CUIT/CUIL *' : 'DNI/CUIT/CUIL'}
      register={register('document_value', {
        required: 'El DNI/CUIT/CUIL es obligatorio',
        validate: (value: string) => {
          const tipo = getTaxIdentificationType(value);
          if (tipo) return true;
          return 'El formato de DNI/CUIT/CUIL es inválido';
        },
      })}
      error={errors.document_value?.message}
    />

    <InputField
      id="send_method_value"
      placeholder={errors.send_method_value ? 'CBU/CVU/ALIAS *' : 'CBU/CVU/ALIAS'}
      register={register('send_method_value', {
        required: 'El CBU/CVU/ALIAS es obligatorio',
        validate: (value: string) => {
          const tipo = getTransferIdentificationType(value);
          if (tipo) return true;
          return 'El formato de CBU/CVU/ALIAS es inválido';
        },
      })}
      error={errors.send_method_value?.message}
    />
  </div>
);

export default BankFields;
