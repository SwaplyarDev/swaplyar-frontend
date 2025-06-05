'use client';

import InputField from '@/components/ui/contact-form/InputField';

const CryptoFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    <InputField
      id="wallet"
      placeholder="Dirección de billetera"
      register={register('wallet', { required: 'La dirección de billetera es obligatoria' })}
      error={errors.wallet?.message}
    />
    <InputField
      id="red"
      placeholder="Red (TRC20, ERC20...)"
      register={register('red', { required: 'La red es obligatoria' })}
      error={errors.red?.message}
    />
  </div>
);

export default CryptoFields;
