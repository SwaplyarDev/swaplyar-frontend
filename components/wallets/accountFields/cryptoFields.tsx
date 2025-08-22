'use client';

import InputField from '@/components/ui/contact-form/InputField';

interface CryptoFieldsProps {
  register: any;
  errors: any;
  defaultValues?: {
    accountName?: string;
    wallet?: string;
    currency?: string;
    network?: string;
  };
}

const CryptoFields = ({ register, errors, defaultValues }: CryptoFieldsProps) => (
  <div className="flex flex-col gap-4">
    {/* Nombre de la cuenta */}
    <InputField
      id="accountName"
      placeholder="Nombre de la cuenta"
      defaultValue={defaultValues?.accountName || ''}
      register={register('accountName', { required: 'El nombre de la cuenta es obligatorio' })}
      error={errors.accountName?.message}
    />

    {/* Dirección de billetera */}
    <InputField
      id="wallet"
      placeholder="Dirección de billetera"
      defaultValue={defaultValues?.wallet || ''}
      register={register('wallet', { required: 'La dirección de billetera es obligatoria' })}
      error={errors.wallet?.message}
    />

    {/* Red */}
    <select
      {...register('network', { required: 'La red es obligatoria' })}
      className="rounded-md border p-2 text-black"
      defaultValue={defaultValues?.network?.toLowerCase() || ''}
    >
      <option value="" disabled>
        Seleccione la red
      </option>
      <option value="trc20">TRC20 (Tron)</option>
      <option value="erc20">ERC20 (Ethereum)</option>
      <option value="bep20">BEP20 (Binance Smart Chain)</option>
    </select>
    {errors.network && <span className="text-sm text-red-500">{errors.network.message}</span>}
    <input type="hidden" {...register('accountType')} value="receiver_crypto" />
    <input type="hidden" {...register('currency')} value="USDT" />
  </div>
);

export default CryptoFields;
