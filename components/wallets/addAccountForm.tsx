'use client';

import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { Button } from '../ui/Button';
import {
  PaypalDarkImg,
  PayoneerUsdImg,
  PayoneerUsdDarkImg,
  WiseUsdImg,
  WiseUsdDarkImg,
  TetherImg,
  TetherDarkImg,
  PixImg,
  BankDarkImg,
  BankImg,
  PaypalImg,
  PayoneerEurImg,
  PayoneerEurDarkImg,
  WiseEurDarkImg,
  WiseEurImg,
} from '@/utils/assets/imgDatabaseCloudinary';
import { useEffect, useState } from 'react';
import { DialogContent } from '@mui/material';
import clsx from 'clsx';
import Arrow from '../ui/Arrow/Arrow';
import { useRouter } from 'next/navigation';
import LoadingGif from '../ui/LoadingGif/LoadingGif';
import PaypalFields from './accountFields/paypalFields';
import PixFields from './accountFields/pixFields';
import PayoneerFieldsEUR from './accountFields/payoneerFieldsEUR';
import CryptoFields from './accountFields/cryptoFields';
import BankFields from './accountFields/bankFields';
import PayoneerFieldsUSD from './accountFields/payoneerFieldsUSD';
import WiseFieldsEUR from './accountFields/wiseFieldsEUR';
import WiseFieldsUSD from './accountFields/wiseFieldsUSD';

interface AccountFormData {
  nombre?: string;
  apellido?: string;
  dni?: string;
  correo?: string;
  nombreBanco?: string;
  cvu?: string;
  wallet?: string;
  currency?: string;
  red?: string;
  numeroCuenta?: string;
  pais?: string;
  tipoCuenta?: string;
  pix_key?: string;
  cpf?: string;
}

export default function AddAccountForm({
  walletType,
  setWalletType,
  onSubmitData,
  isOpen,
  setOpen,
}: {
  walletType: string;
  setWalletType: React.Dispatch<React.SetStateAction<string>>;
  onSubmitData: (data: AccountFormData) => void;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isDark } = useDarkTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
    reset,
  } = useForm<AccountFormData>({ mode: 'onChange' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AccountFormData) => {
    setLoading(true);
    try {
      await onSubmitData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const renderFields = () => {
    if (!walletType) return null;
    switch (walletType) {
      case 'paypal':
        return <PaypalFields register={register} errors={errors} />;

      case 'crypto':
      case 'receiver_crypto':
        return <CryptoFields register={register} errors={errors} control={control} />;

      case 'pix':
        return <PixFields register={register} errors={errors} />;
      case 'payoneerUSD':
        return <PayoneerFieldsUSD register={register} errors={errors} />;
      case 'payoneerEUR':
        return <PayoneerFieldsEUR register={register} errors={errors} />;
      case 'wiseUSD':
        return <WiseFieldsUSD register={register} errors={errors} />;
      case 'wiseEUR':
        return <WiseFieldsEUR register={register} errors={errors} />;
      case 'bank':
        return <BankFields register={register} errors={errors} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
      setWalletType('');
    }
  }, [isOpen, reset, setWalletType]);

  return (
    <DialogContent
      className={clsx(
        'mx-auto flex h-[700px] w-[95%] max-w-md flex-col rounded-2xl p-0 scrollbar-hide',
        isDark ? 'dark:border-[#373737] dark:bg-[#4B4B4B]' : 'bg-white',
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
        <div className="pt-6 text-center text-3xl font-light text-gray-800 dark:text-darkText">Datos de la Cuenta</div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 pb-4 pt-6 sm:px-10">
          <div className="flex flex-col gap-4">
            <Controller
              name="tipoCuenta"
              control={control}
              rules={{ required: 'Falta seleccionar el tipo de cuenta' }}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setWalletType(value);
                  }}
                  value={field.value || ''}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione una Billetera" />
                  </SelectTrigger>
                  <SelectContent
                    className={clsx(
                      'max-h-[180px] overflow-y-auto scrollbar-thin sm:max-h-[300px]',
                      isDark
                        ? 'scrollbar-track-[#4B4B4B] scrollbar-thumb-white dark:bg-[#4B4B4B]'
                        : 'bg-[#FFFFFB] scrollbar-track-[#FFFFFB] scrollbar-thumb-[#012ABE]',
                    )}
                  >
                    <SelectItem value="bank" className="cursor-pointer">
                      <Image src={isDark ? BankDarkImg : BankImg} alt="Bank" width={120} height={120} />
                    </SelectItem>

                    <SelectItem value="crypto" className="cursor-pointer">
                      <Image src={isDark ? TetherDarkImg : TetherImg} alt="Crypto" width={120} height={120} />
                    </SelectItem>
                    <SelectItem value="paypal" className="cursor-pointer">
                      <Image src={isDark ? PaypalDarkImg : PaypalImg} alt="PayPal" width={120} height={120} />
                    </SelectItem>
                    <SelectItem value="pix" className="cursor-pointer">
                      <Image src={PixImg} alt="PIX" width={120} height={120} />
                    </SelectItem>
                    <SelectItem value="payoneerUSD" className="cursor-pointer">
                      <Image
                        src={isDark ? PayoneerUsdDarkImg : PayoneerUsdImg}
                        alt="Payoneer"
                        width={120}
                        height={120}
                      />
                    </SelectItem>
                    <SelectItem value="payoneerEUR" className="cursor-pointer">
                      <Image
                        src={isDark ? PayoneerEurDarkImg : PayoneerEurImg}
                        alt="Payoneer"
                        width={120}
                        height={120}
                      />
                    </SelectItem>
                    <SelectItem value="wiseUSD" className="cursor-pointer">
                      <Image src={isDark ? WiseUsdDarkImg : WiseUsdImg} alt="Wise" width={120} height={120} />
                    </SelectItem>
                    <SelectItem value="wiseEUR" className="cursor-pointer">
                      <Image src={isDark ? WiseEurDarkImg : WiseEurImg} alt="Wise" width={120} height={120} />
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {renderFields()}
          </div>
        </div>
        <div className="flex w-full flex-col items-center space-y-3 pt-4 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0 sm:p-6">
          <div className="sm:order-2">
            <div className="h-[42px] w-[140px] sm:mb-2 sm:h-[40px] sm:w-[160px]">
              {loading ? (
                <div className="flex h-full w-full items-center justify-center">
                  <LoadingGif color={isDark ? '#EBE7E0' : '#012ABE'} size="36px" />
                </div>
              ) : (
                <Button
                  type="submit"
                  disabled={!isDirty || !isValid}
                  className={`${
                    isDark
                      ? 'bg-[#EBE7E0] text-black ring-offset-[#4B4B4B] hover:dark:ring-[#EBE7E0]'
                      : 'bg-[#012A8E] text-white hover:ring-[#012A8E]'
                  } flex h-full w-full items-center justify-center rounded-full text-lg font-semibold hover:ring-2 hover:ring-offset-2`}
                >
                  Agregar
                </Button>
              )}
            </div>
          </div>
          <div className="pb-2 sm:order-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={`group relative m-1 flex h-[40px] min-w-[40px] max-w-[90px] items-center justify-center gap-1 rounded-3xl border border-buttonsLigth px-3 py-1 text-sm font-light text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
            >
              <div className="relative h-4 w-4 overflow-hidden">
                <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
                  <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
                </div>
              </div>
              Volver
            </button>
          </div>
        </div>
      </form>
    </DialogContent>
  );
}
