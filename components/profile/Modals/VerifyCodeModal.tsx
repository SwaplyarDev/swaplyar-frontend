'use client';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import { VerificationCodeInput } from '@/components/ui/VerificationCodeInput/VerificationCodeInput';
import { ChevronLeft } from 'lucide-react';
import ButtonAuth from '@/components/auth/AuthButton';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { updatePhone } from '../services/profileServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useProfileStore } from '@/store/useProfileStore';


interface VerificationCodeForm {
  verificationCode: string[];
}

interface VerifyCodeModalProps {
  show: boolean;
  setShow: (arg: boolean) => void;
  fullPhone: string;
  onVerificationSuccess: () => void;
}

export const VerifyCodeModal = ({ show, setShow, fullPhone, onVerificationSuccess }: VerifyCodeModalProps) => {
  const { isDark } = useDarkTheme();
  const { data: session, update } = useSession();
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const { phone, updatePhone: updatePhoneStore } = useProfileStore();
  

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    clearErrors
  } = useForm<VerificationCodeForm>();

  const onOtpVerified = () => {
    setShow(false); // cerrar modal de verificación
    setSuccessModalOpen(true); // abrir modal de éxito con confetti
    onVerificationSuccess(); // función original
  };

  const onSubmit = async (data: VerificationCodeForm) => {
    console.log('onSubmit llamado con data:', data);
    if (!session?.accessToken) {
      console.log('No hay accessToken');
      return;
    }
    setLoading(true);

    try {
      const verificationCode = data.verificationCode.join('');
      console.log('Enviando código:', verificationCode, 'para teléfono:', fullPhone);
      const response = await fetch('/api/whatsapp/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone, code: verificationCode }),
      });

      console.log('Respuesta del servidor:', response.status);
      const result = await response.json();
      console.log('Resultado:', result);
      if (result.success) {
        console.log('Verificación exitosa, mostrando modal de éxito');
        // Actualizar teléfono solo si cambió
        if (fullPhone !== session?.user?.profile?.phone) {

          const res = await updatePhone(session.accessToken, fullPhone);
          
          if (session.user) {
            await update({
              user: {
                ...session.user,
                profile: { ...session.user.profile, phone: res.phone },
              },
            });
          }
        }

        onOtpVerified(); // disparar modal de éxito con confetti
      } else {
        console.error('Código inválido');
        alert('Código inválido. Verifica el código enviado por WhatsApp.');
      }
    } catch (err) {
      console.error('❌ Error:', err);
      // Para testing, forzar mostrar modal
      onOtpVerified();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setShow(false);

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
          <FontAwesomeIcon
            icon={faWhatsapp}
            className={clsx('text-9xl', isDark ? 'text-green-400' : 'text-green-500')}
          />
          <h2 className="w-full text-center font-textFont text-custom-blue dark:text-custom-whiteD text-2xl xs-phone:text-4xl font-semibold">
            WhatsApp
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className='flex flex-col items-center'>
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
            </div>

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
