// components/VerifyCodeModal.tsx
'use client';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import { VerificationCodeInput } from '@/components/ui/VerificationCodeInput/VerificationCodeInput';
import { ChevronLeft } from 'lucide-react';
import ButtonAuth from '@/components/auth/AuthButton';

interface VerificationCodeForm {
  verificationCode: string[];
}

interface VerifyCodeModalProps {
  show: boolean;
  setShow: (arg: boolean) => void;
  onVerify: (code: string) => void;
  loading?: boolean;
}

export const VerifyCodeModal = ({ show, setShow, onVerify, loading = false }: VerifyCodeModalProps) => {
  const { isDark } = useDarkTheme();
  const [isLocked, setIsLocked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    clearErrors
  } = useForm<VerificationCodeForm>();

  const onSubmit = (data: VerificationCodeForm) => {
    const verificationCode = data.verificationCode.join('');
    onVerify(verificationCode);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          backgroundColor: isDark ? '#323232' : '#fffffb',
          color: isDark ? '#fff' : '#000',
          maxWidth: 556,
          minWidth: 358,
        },
      }}
    >
      <DialogContent className="!p-0">
        <div className="flex h-full flex-col items-center p-3 xs-phone:p-6 gap-8 text-center">
          <h2 className="w-full text-center font-textFont text-custom-blue dark:text-custom-whiteD text-2xl xs-phone:text-4xl font-semibold">
            WhatsApp
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex h-[46px] justify-between gap-2 xs:h-[57px] xs:gap-1 sm:h-[65.33px]">
              <VerificationCodeInput
                register={register}
                watch={watch}
                setValue={setValue}
                onComplete={async () => {
                  await handleSubmit(onSubmit)();
                }}
                isDisabled={isLocked || loading}
                isLoading={loading}
                error={errors.verificationCode ? errors.verificationCode.message : undefined}
                isDark={isDark}
                clearErrors={() => clearErrors('verificationCode')}
                className="h-[46px] md:h-[56px] lg:h-[58px] gap-[6px] md:gap-[10px] lg:gap-4"
              />

              {errors.verificationCode && <p className="relative w-full text-center my-4 text-sm text-red-500">• {errors.verificationCode.message}</p>}
            </div>

            <span className="text-start">
              Ingresa el código que se envio por WhatsApp para verificarlo.
            </span>

            <div className="flex justify-between gap-4 pt-5">
              <button
                type="button"
                onClick={() => setShow(false)}
                className="btn-back items-center flex h-[38px] rounded-full hover:bg-transparent dark:text-darkText dark:bg-none"
              >
                <div className="relative size-8 overflow-hidden content-center">
                  <ChevronLeft
                    color={isDark ? '#ebe7e0' : '#252526'}
                    width={32}
                    height={32}
                    strokeWidth={2}
                    className="inline-block"
                  />
                </div>
              </button>

              <ButtonAuth
                loading={loading}
                type="submit"
                variant="primary"
                label='Verificar'
                isDark={isDark}
                className='px-4'
              />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};