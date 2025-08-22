'use client';

import InputField from '@/components/ui/contact-form/InputField';

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

    <select
      {...register('pix_key', {
        required: 'Debe seleccionar el tipo de clave PIX',
      })}
      className="rounded-md border p-2 text-black"
    >
      <option value="">Seleccione el tipo de clave</option>
      <option value="email">Email</option>
      <option value="phone">Teléfono</option>
      <option value="cpf">CPF</option>
      <option value="random">Clave Aleatoria</option>
    </select>
    {errors.pix_key && <span className="text-sm text-red-500">{errors.pix_key.message}</span>}

    {/* Moneda (oculto, BRL fijo) */}
    <input type="hidden" {...register('currency')} value="BRL" />

    {/* Tipo de cuenta (oculto, PIX fijo) */}
    <input type="hidden" {...register('accountType')} value="pix" />
  </div>
);

export default PixFields;
