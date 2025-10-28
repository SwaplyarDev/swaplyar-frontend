'use client';

import CustomInput from '@/components/ui/Input/CustomInput';
import { detectarTipoPixKey } from '@/utils/validationUtils';

const PixFields = ({ register, errors, defaultValues }: any) => (
  <div className="flex flex-col gap-4">
    <CustomInput
      label="Nombre de la cuenta"
      type="text"
      name="accountName"
      register={register}
      validation={{
        required: 'El nombre de la cuenta es obligatorio',
      }}
      error={errors.accountName?.message}
      placeholder="Nombre de la cuenta (ej: Pix Principal)"
    />

    <CustomInput
      label="Nombre"
      type="text"
      name="firstName"
      register={register}
      validation={{
        required: 'El nombre es obligatorio',
      }}
      error={errors.firstName?.message}
      placeholder="Nombre"
      defaultValue={defaultValues?.firstName || ''}
    />

    <CustomInput
      label="Apellido"
      type="text"
      name="lastName"
      register={register}
      validation={{
        required: 'El apellido es obligatorio',
      }}
      error={errors.lastName?.message}
      placeholder="Apellido"
      defaultValue={defaultValues?.lastName || ''}
    />

    <CustomInput
      label="CPF"
      type="text"
      name="cpf"
      register={register}
      validation={{
        required: 'El CPF es obligatorio',
        pattern: {
          value: /^\d{11}$/,
          message: 'El CPF debe tener 11 dígitos numéricos',
        },
      }}
      error={errors.cpf?.message}
      placeholder="CPF (solo números)"
    />

    <CustomInput
      label="PIX KEY"
      type="text"
      name="pix_value"
      register={register}
      validation={{
        required: 'El PIX KEY es obligatorio',
        validate: (value: string) => {
          const tipo = detectarTipoPixKey(value);
          if (tipo) return true;
          return 'El formato de PIX KEY es inválido';
        },
      }}
      error={errors.pix_value?.message}
      placeholder="PIX KEY / Correo, Teléfono, CPF, CNPJ o Clave Aleatoria"
    />

    <input type="hidden" {...register('currency')} value="BRL" />
    <input type="hidden" {...register('accountType')} value="pix" />
  </div>
);

export default PixFields;