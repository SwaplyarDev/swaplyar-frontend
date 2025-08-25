'use client';

import InputField from '@/components/ui/contact-form/InputField';
import SelectField from '@/components/ui/contact-form/selectField';

const PixFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    <InputField
      id="accountName"
      placeholder="Nombre de la cuenta (ej: Pix Principal)"
      register={register('accountName', {
        required: 'El nombre de la cuenta es obligatorio',
      })}
      error={errors.accountName?.message}
    />

    <InputField
      id="cpf"
      placeholder="CPF (solo números)"
      register={register('cpf', {
        required: 'El CPF es obligatorio',
        pattern: {
          value: /^\d{11}$/,
          message: 'El CPF debe tener 11 dígitos numéricos',
        },
      })}
      error={errors.cpf?.message}
    />

    <InputField
      id="pix_value"
      placeholder="Valor de la clave PIX (ej: meupix@banco.com)"
      register={register('pix_value', {
        required: 'El valor de la clave PIX es obligatorio',
      })}
      error={errors.pix_value?.message}
    />

    <SelectField
      id="pix_key"
      register={register('pix_key', { required: 'Debe seleccionar el tipo de clave PIX' })}
      error={errors.pix_key?.message}
      options={[
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Teléfono' },
        { value: 'cpf', label: 'CPF' },
        { value: 'random', label: 'Clave Aleatoria' },
      ]}
      placeholder="Seleccione el tipo de clave"
    />

    <input type="hidden" {...register('currency')} value="BRL" />
    <input type="hidden" {...register('accountType')} value="pix" />
  </div>
);

export default PixFields;
