'use client';

import InputField from '@/components/ui/contact-form/InputField';
import { detectarTipoPixKey } from '@/utils/validationUtils';

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
      placeholder="PIX KEY / Correo, Teléfono, CPF, CNPJ o Clave Aleatoria"
      register={register('pix_value', {
        required: 'El PIX KEY es obligatorio',
        validate: (value: string) => {
          const tipo = detectarTipoPixKey(value);
          if (tipo) return true;
          return 'El formato de PIX KEY es inválido';
        },
      })}
      error={errors.pix_value?.message} //
    />

    {/* Hidden fields para enviar al backend */}
    <input type="hidden" {...register('currency')} value="BRL" />
    <input type="hidden" {...register('accountType')} value="pix" />
  </div>
);

export default PixFields;
