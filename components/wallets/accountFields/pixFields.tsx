'use client';

import InputField from '@/components/ui/contact-form/InputField';

const PixFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    {/* Nombre */}
    <InputField
      id="first_name"
      placeholder="Nombre"
      register={register('first_name', { required: 'El nombre es obligatorio' })}
      error={errors.first_name?.message}
    />

    {/* Apellido */}
    <InputField
      id="last_name"
      placeholder="Apellido"
      register={register('last_name', { required: 'El apellido es obligatorio' })}
      error={errors.last_name?.message}
    />

    {/* Documento de identificación */}
    <InputField
      id="identification"
      placeholder="Identificación (DNI o CPF)"
      register={register('identification', { required: 'La identificación es obligatoria' })}
      error={errors.identification?.message}
    />

    {/* Selección de banco */}
    <select
      {...register('virtual_bank_id', { required: 'Debe seleccionar un banco' })}
      className="rounded-md border p-2 text-black"
    >
      <option value="">Seleccione un banco</option>
      <option value="nubank-br">Nubank</option>
      <option value="itau-br">Itaú</option>
      <option value="bradesco-br">Bradesco</option>
      <option value="bb-br">Banco do Brasil</option>
    </select>
    {errors.virtual_bank_id && <span className="text-sm text-red-500">{errors.virtual_bank_id.message}</span>}

    {/* Clave PIX */}
    <InputField
      id="pix_key"
      placeholder="PIX KEY"
      register={register('pix_key', { required: 'La clave PIX es obligatoria' })}
      error={errors.pix_key?.message}
    />

    {/* CPF */}
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

    {/* Monto PIX */}
    <InputField
      id="pix_value"
      placeholder="Valor PIX (ej: 250.00)"
      register={register('pix_value', {
        required: 'El valor PIX es obligatorio',
        pattern: {
          value: /^\d+(\.\d{1,2})?$/,
          message: 'Ingrese un monto válido (ej: 250.00)',
        },
      })}
      error={errors.pix_value?.message}
    />

    {/* Moneda (oculto, BRL fijo) */}
    <input type="hidden" {...register('currency')} value="BRL" />

    {/* Tipo de cuenta (oculto, PIX fijo) */}
    <input type="hidden" {...register('account_type')} value="pix" />
  </div>
);

export default PixFields;
