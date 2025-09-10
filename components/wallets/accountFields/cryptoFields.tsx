'use client';

import { Controller } from 'react-hook-form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import InputField from '@/components/ui/contact-form/InputField';

interface CryptoFieldsProps {
  register: any;
  errors: any;
  control: any;
  defaultValues?: {
    accountName?: string;
    firstName?: string;
    lastName?: string;
    wallet?: string;
    currency?: string;
    network?: string;
  };
}

const CryptoFields = ({ register, errors, control, defaultValues }: CryptoFieldsProps) => (
  <div className="flex flex-col gap-4">
    <InputField
      id="accountName"
      placeholder="Nombre de la cuenta"
      defaultValue={defaultValues?.accountName || ''}
      register={register('accountName', { required: 'El nombre de la cuenta es obligatorio' })}
      error={errors.accountName?.message}
    />

    <InputField
      id="wallet"
      placeholder="Dirección de billetera"
      defaultValue={defaultValues?.wallet || ''}
      register={register('wallet', { required: 'La dirección de billetera es obligatoria' })}
      error={errors.wallet?.message}
    />

    <Controller
      name="network"
      control={control}
      rules={{ required: 'La red es obligatoria' }}
      defaultValue={defaultValues?.network?.toLowerCase() || ''}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange} disabled={field.disabled}>
          <SelectTrigger className="text-l w-full rounded-2xl border border-buttonExpandDark bg-[#fffff8] px-[8px] py-2 font-titleFont text-blue-300 hover:border-buttonsLigth dark:border-placeholderDark dark:bg-darkText dark:text-gray-400">
            <SelectValue placeholder="Seleccione una opción" />
          </SelectTrigger>

          <SelectContent className="overflow-hidden rounded-2xl border border-buttonExpandDark bg-[#fffff8] shadow-lg dark:border-gray-600 dark:text-gray-400">
            <SelectItem
              value="trc20"
              className="cursor-pointer px-3 py-2 text-blue-300 data-[highlighted]:bg-sky-100 data-[highlighted]:text-blue-600 dark:text-gray-400 dark:data-[highlighted]:bg-gray-400 dark:data-[highlighted]:text-black"
            >
              TRC20 (Tron)
            </SelectItem>
            <SelectItem
              value="erc20"
              className="cursor-pointer px-3 py-2 text-blue-300 data-[highlighted]:bg-sky-100 data-[highlighted]:text-blue-600 dark:text-gray-400 dark:data-[highlighted]:bg-gray-400 dark:data-[highlighted]:text-black"
            >
              ERC20 (Ethereum)
            </SelectItem>
            <SelectItem
              value="bep20"
              className="cursor-pointer px-3 py-2 text-blue-300 data-[highlighted]:bg-sky-100 data-[highlighted]:text-blue-600 dark:text-gray-400 dark:data-[highlighted]:bg-gray-400 dark:data-[highlighted]:text-black"
            >
              BEP20 (Binance Smart Chain)
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    />
    {errors.network && <p className="px-[10px] pt-1 text-sm text-[#c31818]">{errors.network.message}</p>}

    <input type="hidden" {...register('accountType')} value="receiver_crypto" />
    <input type="hidden" {...register('currency')} value="USDT" />
  </div>
);

export default CryptoFields;
