'use client';

import InputField from '@/components/ui/contact-form/InputField';
import SelectField from '../../ui/contact-form/selectField';

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

    <SelectField
      id="network"
      register={register('network', { required: 'La red es obligatoria' })}
      defaultValue={defaultValues?.network?.toLowerCase()}
      options={[
        { value: 'trc20', label: 'TRC20 (Tron)' },
        { value: 'erc20', label: 'ERC20 (Ethereum)' },
        { value: 'bep20', label: 'BEP20 (Binance Smart Chain)' },
      ]}
    />

    <input type="hidden" {...register('accountType')} value="receiver_crypto" />
    <input type="hidden" {...register('currency')} value="USDT" />
  </div>
);

export default CryptoFields;
