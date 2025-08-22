'use client';

import InputField from '@/components/ui/contact-form/InputField';

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

    {/* Nombre de la cuenta */}
    <InputField
      id="accountName"
      placeholder="Titu"
      defaultValue={defaultValues?.accountName || ''}
      register={register('accountName', { required: 'El nombre de la cuenta es obligatorio' })}
      error={errors.accountName?.message}
    />

    {/* Nombre del banco */}
    <InputField
      id="bankName"
      placeholder="Nombre del banco"
      defaultValue={defaultValues?.bankName || ''}
      register={register('bankName', { required: 'El nombre del banco es obligatorio' })}
      error={errors.bankName?.message}
    />

    {/* Método de envío */}
    <InputField
      id="send_method_key"
      placeholder="Tipo de envío (ej: SWIFT)"
      defaultValue={defaultValues?.send_method_key || ''}
      register={register('send_method_key', { required: 'El tipo de envío es obligatorio' })}
      error={errors.send_method_key?.message}
    />

    <InputField
      id="send_method_value"
      placeholder="Valor del método de envío"
      defaultValue={defaultValues?.send_method_value || ''}
      register={register('send_method_value', { required: 'El valor del método de envío es obligatorio' })}
      error={errors.send_method_value?.message}
    />

    {/* Documento */}
    <InputField
      id="document_type"
      placeholder="Tipo de documento (ej: CUIT)"
      defaultValue={defaultValues?.document_type || ''}
      register={register('document_type', { required: 'El tipo de documento es obligatorio' })}
      error={errors.document_type?.message}
    />

    <InputField
      id="document_value"
      placeholder="Número de documento"
      type="number"
      defaultValue={defaultValues?.document_value || ''}
      register={register('document_value', { required: 'El número de documento es obligatorio' })}
      error={errors.document_value?.message}
    />
  </div>
);

export default BankFields;
