'use client';

import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import InputField from '../ui/contact-form/InputField';
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
} from '@/utils/assets/imgDatabaseCloudinary';
import { useEffect, useState } from 'react';
import { DialogContent } from '@mui/material';
import clsx from 'clsx';
import Arrow from '../ui/Arrow/Arrow';
import { useRouter } from 'next/navigation';
import LoadingGif from '../ui/LoadingGif/LoadingGif';

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

const PaypalFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    <InputField
      id="nombre"
      placeholder="Nombre"
      register={register('nombre', {
        required: 'El nombre es obligatorio',
        minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
      })}
      error={errors.nombre?.message}
    />
    <InputField
      id="apellido"
      placeholder="Apellido"
      register={register('apellido', {
        required: 'El apellido es obligatorio',
        minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
      })}
      error={errors.apellido?.message}
    />
    <InputField
      id="correo"
      placeholder="Correo electrónico"
      type="email"
      register={register('correo', {
        required: 'El correo es obligatorio',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Correo electrónico inválido',
        },
      })}
      error={errors.correo?.message}
    />
  </div>
);

const VirtualBankFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    <InputField
      id="nombre"
      placeholder="Nombre"
      register={register('nombre', { required: 'El nombre es obligatorio' })}
      error={errors.nombre?.message}
    />
    <InputField
      id="apellido"
      placeholder="Apellido"
      register={register('apellido', { required: 'El apellido es obligatorio' })}
      error={errors.apellido?.message}
    />
    <InputField
      id="dni"
      placeholder="DNI"
      register={register('dni', {
        required: 'El DNI es obligatorio',
        pattern: {
          value: /^\d{7,9}$/,
          message: 'Debe contener entre 7 y 9 dígitos',
        },
      })}
      error={errors.dni?.message}
    />
    <InputField
      id="nombreBanco"
      placeholder="Nombre del banco"
      register={register('nombreBanco', { required: 'El banco es obligatorio' })}
      error={errors.nombreBanco?.message}
    />
    <InputField
      id="cvu"
      placeholder="CBU / CVU"
      register={register('cvu', {
        required: 'El CBU/CVU es obligatorio',
        pattern: {
          value: /^\d{22}$/,
          message: 'Debe tener 22 dígitos',
        },
      })}
      error={errors.cvu?.message}
    />
  </div>
);

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

const PixFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    <InputField
      id="nombre"
      placeholder="Nombre"
      register={register('nombre', { required: 'El nombre es obligatorio' })}
      error={errors.nombre?.message}
    />
    <InputField
      id="apellido"
      placeholder="Apellido"
      register={register('apellido', { required: 'El apellido es obligatorio' })}
      error={errors.apellido?.message}
    />
    <InputField
      id="pix_key"
      placeholder="PIX KEY"
      register={register('pix_key', { required: 'La clave PIX es obligatoria' })}
      error={errors.pix_key?.message}
    />
    <InputField
      id="cpf"
      placeholder="CPF"
      register={register('cpf', {
        required: 'El CPF es obligatorio',
        pattern: {
          value: /^\d{11}$/,
          message: 'El CPF debe tener 11 dígitos numéricos',
        },
      })}
      error={errors.cpf?.message}
    />
  </div>
);

const PayoneerFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    <InputField
      id="nombre"
      placeholder="Nombre"
      register={register('nombre', { required: 'El nombre es obligatorio' })}
      error={errors.nombre?.message}
    />
    <InputField
      id="apellido"
      placeholder="Apellido"
      register={register('apellido', { required: 'El apellido es obligatorio' })}
      error={errors.apellido?.message}
    />
    <InputField
      id="correo"
      placeholder="Correo de Payoneer"
      register={register('correo', {
        required: 'El correo es obligatorio',
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' },
      })}
      error={errors.correo?.message}
    />
  </div>
);

const WiseFields = ({ register, errors }: any) => (
  <div className="flex flex-col gap-4">
    <InputField
      id="nombre"
      placeholder="Nombre"
      register={register('nombre', {
        required: 'El nombre es obligatorio',
        minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
      })}
      error={errors?.nombre?.message}
    />

    <InputField
      id="apellido"
      placeholder="Apellido"
      register={register('apellido', {
        required: 'El apellido es obligatorio',
        minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
      })}
      error={errors?.apellido?.message}
    />
    <InputField
      id="correo"
      placeholder="Correo de Wise"
      register={register('correo', {
        required: 'El correo es obligatorio',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Correo inválido',
        },
      })}
      error={errors?.correo?.message}
    />
    <InputField
      id="iban"
      placeholder="IBAN / Nº de cuenta"
      register={register('iban', {
        required: 'El IBAN es obligatorio',
        minLength: {
          value: 15,
          message: 'Debe tener al menos 15 caracteres',
        },
        maxLength: {
          value: 34,
          message: 'No puede tener más de 34 caracteres',
        },
        pattern: {
          value: /^[A-Z0-9]+$/,
          message: 'Solo letras mayúsculas y números',
        },
      })}
      error={errors?.iban?.message}
    />

    <InputField
      id="bic"
      placeholder="BIC / SWIFT"
      register={register('bic', {
        required: 'El BIC es obligatorio',
        minLength: {
          value: 8,
          message: 'Debe tener al menos 8 caracteres',
        },
        maxLength: {
          value: 11,
          message: 'No puede tener más de 11 caracteres',
        },
        pattern: {
          value: /^[A-Z0-9]+$/,
          message: 'Solo letras mayúsculas y números',
        },
      })}
      error={errors?.bic?.message}
    />
  </div>
);

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
      case 'virtualBank':
        return <VirtualBankFields register={register} errors={errors} />;
      case 'crypto':
        return <CryptoFields register={register} errors={errors} />;
      case 'pix':
        return <PixFields register={register} errors={errors} />;
      case 'payoneer':
        return <PayoneerFields register={register} errors={errors} />;
      case 'wise':
        return <WiseFields register={register} errors={errors} />;
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
                    <SelectItem value="virtualBank">
                      <Image src={isDark ? BankDarkImg : BankImg} alt="Virtual Bank" width={120} height={120} />
                    </SelectItem>
                    <SelectItem value="crypto">
                      <Image src={isDark ? TetherDarkImg : TetherImg} alt="Crypto" width={120} height={120} />
                    </SelectItem>
                    <SelectItem value="paypal">
                      <Image src={isDark ? PaypalDarkImg : PaypalImg} alt="PayPal" width={120} height={120} />
                    </SelectItem>
                    <SelectItem value="pix">
                      <Image src={PixImg} alt="PIX" width={120} height={120} />
                    </SelectItem>
                    <SelectItem value="payoneer">
                      <Image
                        src={isDark ? PayoneerUsdDarkImg : PayoneerUsdImg}
                        alt="Payoneer"
                        width={120}
                        height={120}
                      />
                    </SelectItem>
                    <SelectItem value="wise">
                      <Image src={isDark ? WiseUsdDarkImg : WiseUsdImg} alt="Wise" width={120} height={120} />
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
