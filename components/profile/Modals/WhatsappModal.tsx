
'use client';
import SelectCountry from '@/components/request/form/inputs/SelectCountry';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useWhatsAppFormStore } from '../store/WhatsAppFormStore';
import { CountryOption } from '@/types/request/request';
import { useSession } from 'next-auth/react';
import { updatePhone } from '../services/profileServices';
import { validatePhoneNumber } from '@/utils/validatePhoneNumber';
import { Dialog, DialogContent } from '@mui/material';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';

interface WhatsappVerificationProps {
  show: boolean;
  setShow: (arg: boolean) => void;
  onVerificationSuccess: () => void; // Nueva prop
}

interface FormData {
  phone: string;
  calling_code: CountryOption | undefined;
}

const WhatsappModal = ({ show, setShow, onVerificationSuccess }: WhatsappVerificationProps) => {
  const { isDark } = useDarkTheme();
  const { data: session, update } = useSession();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({ mode: 'onChange' });

  const phone = useWhatsAppFormStore((state) => state.phone);

  useEffect(() => {
    setValue('phone', phone);
  }, [setValue, phone]);

  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const phoneWithPrefix = `${data.calling_code?.callingCode || ''}${' ' + data.phone}`;

      // Actualizar store localmente para testing
      useWhatsAppFormStore.setState({ phone: phoneWithPrefix });

      // Para testing, directamente abrir el modal de verificación
      onVerificationSuccess();
    } catch (err) {
      console.error('❌ Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={show}
      onClose={() => setShow(false)}
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
        <div className="flex items-center justify-center mb-4">
          <FontAwesomeIcon
            icon={faWhatsapp}
            className={clsx('text-9xl', isDark ? 'text-green-400' : 'text-green-500')}
          />
        </div>
        <div className="flex h-full flex-col items-center gap-0 text-center">
           <h1 className='mb-4'>WhatsApp</h1>
         

          <form onSubmit={handleSubmit(onSubmit)} className="relative w-full flex flex-col gap-12">
            <div className="w-full relative flex items-center justify-center gap-2 rounded-full border bg-transparent pl-5 lg:pl-3 text-lightText mb-5 transition-all duration-200">
              <Controller
                name="calling_code"
                control={control}
                defaultValue={undefined}
                rules={{ required: 'Este campo es obligatorio' }}
                render={({ field, fieldState }) => (
                  <SelectCountry
                    selectedCodeCountry={field.value}
                    setSelectedCodeCountry={(option) => field.onChange(option)}
                    errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                    textColor={['gray-700', 'gray-200']}
                    maxHeightModal={true}
                  />
                )}
              />

              <InputSteps
                label=""
                name="phone"
                id="phone"
                type="tel"
                placeholder="Número de WhatsApp"
                register={register}
                watch={watch}
                rules={{
                  validate: (value) => {
                    const country = watch('calling_code');
                    const result = validatePhoneNumber(value, country);
                    return result === true ? true : result;
                  },
                }}
                disabledWithoutMargin={true}
                className="w-full text-sm border-none "
              />
            </div>
            {errors.phone && (
              <p className="absolute top-16 w-full text-center font-textFont text-sm text-errorColor">
                {errors.phone.message}
              </p>
            )}
            <span className="mb-4 text-xs md:text-base">
            Mantén actualizado tu número de WhatsApp para no perderte nuestras novedades.
          </span>
            <div className="flex justify-between gap-4 pt-5">
              <button
                onClick={handleClose}
                className={clsx(
                  'group relative mt-2 flex h-[48px] w-[48px] items-center justify-center rounded-full transition-colors duration-300',
                  '-ml-4 md:-ml-4 lg:-ml-2',
                  isDark ? 'text-gray-200' : 'text-gray-700 hover:text-[#0A2A83]',
                )}
                aria-label="Volver"
              >
                <span
                  className={clsx(
                    'pointer-events-none absolute h-[40px] w-[40px] rounded-full border-r-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                    isDark ? 'border-r-white' : 'border-r-[#0A2A83]',
                  )}
                />
                <ChevronLeft size={28} strokeWidth={2.5} className="relative z-10" />
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`h-8 rounded-full px-4 ${isDark
                  ? 'bg-white text-[#4B4B4B]'
                  : 'bg-blue-400 text-white hover:bg-blue-700'
                  }`}
              >
                {loading ? 'Procesando...' : 'Enviar Código'}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsappModal;
