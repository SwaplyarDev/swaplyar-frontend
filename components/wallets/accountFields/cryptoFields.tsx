'use client';

import InputField from '@/components/ui/contact-form/InputField';

const CryptoFields = ({ register, errors }: any) => (
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

    {/* Identificación */}
    <InputField
      id="identification"
      placeholder="Identificación (DNI, pasaporte, etc.)"
      register={register('identification', { required: 'La identificación es obligatoria' })}
      error={errors.identification?.message}
    />

    {/* Dirección de billetera */}
    <InputField
      id="wallet"
      placeholder="Dirección de billetera"
      register={register('wallet', { required: 'La dirección de billetera es obligatoria' })}
      error={errors.wallet?.message}
    />

    {/* Red */}
    <select
      {...register('network', { required: 'La red es obligatoria' })}
      className="rounded-md border p-2 text-black"
      defaultValue=""
    >
      <option value="" disabled>
        Seleccione la red
      </option>
      <option value="trc20">TRC20 (Tron)</option>
      <option value="erc20">ERC20 (Ethereum)</option>
      <option value="bep20">BEP20 (Binance Smart Chain)</option>
    </select>
    {errors.network && <span className="text-sm text-red-500">{errors.network.message}</span>}
  </div>
);

export default CryptoFields;
