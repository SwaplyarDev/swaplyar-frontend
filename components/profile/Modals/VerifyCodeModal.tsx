// components/VerifyCodeModal.tsx
'use client';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

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
  } = useForm<VerificationCodeForm>();

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const paste = event.clipboardData.getData('text');
    const numbers = paste.replace(/\D/g, '').split('').slice(0, 6);
    
    numbers.forEach((number, index) => {
      setValue(`verificationCode.${index}`, number);
    });

    if (numbers.length < 6) {
      const nextIndex = numbers.length;
      const nextInput = document.getElementById(`code-${nextIndex}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleInputKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !event.currentTarget.value && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

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
          backgroundColor: isDark ? '#27272a' : '#fff',
          color: isDark ? '#fff' : '#000',
          width: 1500,
      
          maxWidth: 680
        },
      }}
    >
      <DialogContent>
        <div className="flex h-full flex-col items-center gap-4 text-center">
          <h2 className="w-full text-start text-lg sm:text-xl font-semibold">
            Verificación de WhatsApp
          </h2>
          <span className="text-xs md:text-base">
            Ingresa el código de verificación que te enviamos a tu WhatsApp
          </span>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-8 flex h-[46px] justify-between gap-2 xs:h-[57px] xs:gap-1 sm:h-[65.33px]">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={clsx(
                      `w-[46px] rounded-full border-[0.5px] border-buttonsLigth p-[3px] dark:border-darkText xs:w-[57px] sm:w-full`,
                    )}
                  >
                    <input
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      disabled={isLocked || loading}
                      className={clsx(
                        'h-full w-full rounded-full border-0 text-center text-base focus:outline-none dark:border-[0.5px] dark:bg-lightText sm:text-[2.5rem]',
                        errors.verificationCode ? 'border-red-500' : '',
                      )}
                      {...register(`verificationCode.${index}`, { required: true })}
                      onPaste={handlePaste}
                      onChange={(event) => handleInputChange(index, event)}
                      onKeyDown={(event) => handleInputKeyDown(index, event)}
                      autoFocus={index === 0}
                    />
                  </div>
                  {index < 5 && (
                    <div className="hidden min-h-full min-w-[0.5rem] items-center justify-center xs:flex">
                      <div className="h-[2px] w-full flex-1 bg-buttonsLigth dark:bg-darkText"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between gap-4 pt-5">
              <button
                type="button"
                onClick={handleClose}
                className={`rounded-full px-4 ${isDark
                  ? 'border border-white text-white hover:bg-white hover:text-[#4B4B4B]'
                  : 'border border-blue-400 bg-white text-blue-400'
                  }`}
              >
                Volver
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`h-8 rounded-full px-4 ${isDark
                  ? 'bg-white text-[#4B4B4B]'
                  : 'bg-blue-400 text-white hover:bg-blue-700'
                  }`}
              >
                {loading ? 'Verificando...' : 'Verificar'}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};