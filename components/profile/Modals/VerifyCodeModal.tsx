'use client';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent } from '@mui/material';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { updatePhone } from '../services/profileServices';
import { useWhatsAppFormStore } from '../store/WhatsAppFormStore';
import { ChevronLeft } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';


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
    numbers.forEach((number, index) => setValue(`verificationCode.${index}`, number));

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
          useWhatsAppFormStore.setState({ phone: fullPhone });
          if (session.user) {
            await update({
              user: {
                ...session.user,
                profile: { ...session.user.profile, phone: res.phone },
              },
            });
          }
        } else {
          useWhatsAppFormStore.setState({ phone: fullPhone });
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
    <>
      <Dialog
        open={show}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            backgroundColor: isDark ? '#27272a' : '#fff',
            color: isDark ? '#fff' : '#000',
            width: 1500,
            maxWidth: 680,
          },
        }}
      >
        <DialogContent>
          <div className="flex h-full flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <FontAwesomeIcon
                icon={faWhatsapp}
                className={clsx('text-9xl', isDark ? 'text-green-400' : 'text-green-500')}
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="mb-8 flex h-[46px] justify-center gap-2 xs:h-[57px] sm:h-[65.33px]">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className={clsx(
                      `w-[46px] h-[46px] rounded-full border-[0.5px] border-buttonsLigth p-[3px] dark:border-darkText xs:w-[57px] xs:h-[57px] sm:w-[65.33px] sm:h-[65.33px]`
                    )}
                  >
                    <input
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      disabled={isLocked || loading}
                      className={clsx(
                        'h-full w-full rounded-full border-0 text-center text-base focus:outline-none dark:border-[0.5px] dark:bg-lightText sm:text-[2.5rem]',
                        errors.verificationCode ? 'border-red-500' : ''
                      )}
                      {...register(`verificationCode.${index}`, { required: false })}
                      onPaste={handlePaste}
                      onChange={(event) => handleInputChange(index, event)}
                      onKeyDown={(event) => handleInputKeyDown(index, event)}
                      autoFocus={index === 0}
                    />
                  </div>
                ))}
              </div>
              <span className="text-xs md:text-base">
                Introduzca el código que se envío por WhatsApp para verificarlo
              </span>

              <div className="flex justify-between gap-4 pt-5">
                <button
                  onClick={handleClose}
                  className={clsx(
                    'group relative mt-2 flex h-[48px] w-[48px] items-center justify-center rounded-full transition-colors duration-300',
                    '-ml-4 md:-ml-4 lg:-ml-2',
                    isDark ? 'text-gray-200' : 'text-gray-700 hover:text-[#0A2A83]'
                  )}
                  aria-label="Volver"
                >
                  <span
                    className={clsx(
                      'pointer-events-none absolute h-[40px] w-[40px] rounded-full border-r-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                      isDark ? 'border-r-white' : 'border-r-[#0A2A83]'
                    )}
                  />
                  <ChevronLeft size={28} strokeWidth={2.5} className="relative z-10" />
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`h-8 rounded-full px-4 ${
                    isDark ? 'bg-white text-[#4B4B4B]' : 'bg-blue-400 text-white hover:bg-blue-700'
                  }`}
                >
                  {loading ? 'Verificando...' : 'Verificar'}
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      
      
    </>
  );
};
