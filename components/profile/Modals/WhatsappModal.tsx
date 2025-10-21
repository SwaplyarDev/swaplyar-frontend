
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

  const onSubmit = async (data: FormData) => {
    if (!session?.accessToken) return;
    setLoading(true);

    try {
      const phoneWithPrefix = `${data.calling_code?.callingCode || ''}${' ' + data.phone}`;
      const res = await updatePhone(session.accessToken, phoneWithPrefix);

      useWhatsAppFormStore.setState({ phone: phoneWithPrefix });

      if (session.user) {
        await update({
          user: {
            ...session.user,
            profile: {
              ...session.user.profile,
              phone: res.phone,
            },
          },
        });
      }

      // Llamar a la función de éxito en lugar de manejar el estado aquí
      onVerificationSuccess();
    } catch (err) {
      console.error('❌ Error al actualizar teléfono:', err);
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
          height: "310px",
          maxWidth: 680
        },
      }}
    >
      <DialogContent>
        <div className="flex h-full flex-col items-center gap-0 text-center">
          <h2 className="mb-4 w-full text-start text-lg sm:text-xl font-semibold">
            WhatsApp
          </h2>
          <span className="mb-4 text-xs md:text-base">
            Mantén actualizado tu número de WhatsApp para no perderte nuestras novedades.
          </span>

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
            <div className="flex justify-between gap-4 pt-5">
              <button
                type="button"
                onClick={() => setShow(false)}
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
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsappModal;
// 'use client';
// import SelectCountry from '@/components/request/form/inputs/SelectCountry';
// import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
// import { useEffect, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { useWhatsAppFormStore } from '../store/WhatsAppFormStore';
// import { CountryOption } from '@/types/request/request';
// import { useSession } from 'next-auth/react';
// import { updatePhone } from '../services/profileServices';
// import { validatePhoneNumber } from '@/utils/validatePhoneNumber';
// import { Dialog, DialogContent } from '@mui/material';
// import InputSteps from '@/components/inputSteps/InputSteps';
// import { VerifyCodeModal } from './VerifyCodeModal';


// interface WhatsappVerificationProps {
//   show: boolean;
//   setShow: (arg: boolean) => void;
// }

// interface FormData {
//   phone: string;
//   calling_code: CountryOption | undefined;
// }

// const WhatsappModal = ({ show, setShow }: WhatsappVerificationProps) => {
//   const { isDark } = useDarkTheme();
//   const { data: session, update } = useSession();
//   const [showVerificationCode, setShowVerificationCode] = useState(false);
//   const [verificationLoading, setVerificationLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm<FormData>({ mode: 'onChange' });

//   const phone = useWhatsAppFormStore((state) => state.phone);

//   useEffect(() => {
//     setValue('phone', phone);
//   }, [setValue, phone]);

//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data: FormData) => {
//     if (!session?.accessToken) return;
//     setLoading(true);

//     try {
//       const phoneWithPrefix = `${data.calling_code?.callingCode || ''}${' ' + data.phone}`;
//       const res = await updatePhone(session.accessToken, phoneWithPrefix);

//       useWhatsAppFormStore.setState({ phone: phoneWithPrefix });

//       if (session.user) {
//         await update({
//           user: {
//             ...session.user,
//             profile: {
//               ...session.user.profile,
//               phone: res.phone,
//             },
//           },
//         });
//       }

//       // Mostrar el modal de verificación
//       setShowVerificationCode(true);
//     } catch (err) {
//       console.error('❌ Error al actualizar teléfono:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyCode = async (code: string) => {
//     setVerificationLoading(true);
//     try {
//       // Aquí va tu lógica para verificar el código
//       console.log('Código a verificar:', code);
      
//       // Simulando verificación
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Si la verificación es exitosa, cerrar ambos modales
//       setShow(false);
//       setShowVerificationCode(false);
//     } catch (error) {
//       console.error('Error verificando código:', error);
//     } finally {
//       setVerificationLoading(false);
//     }
//   };

//   const handleCloseVerification = () => {
//     setShowVerificationCode(false);
//   };

//   return (
//     <>
//       <Dialog
//         open={show}
//         onClose={() => setShow(false)}
//         PaperProps={{
//           sx: {
//             borderRadius: '16px',
//             backgroundColor: isDark ? '#27272a' : '#fff',
//             color: isDark ? '#fff' : '#000',
//             width: 1500,
//             height: "310px",
//             maxWidth: 680
//           },
//         }}
//       >
//         <DialogContent>
//           <div className="flex h-full flex-col items-center gap-0 text-center">
//             <h2 className="mb-4 w-full text-start text-lg sm:text-xl font-semibold">
//               WhatsApp
//             </h2>
//             <span className="mb-4 text-xs md:text-base">
//               Mantén actualizado tu número de WhatsApp para no perderte nuestras novedades.
//             </span>

//             <form onSubmit={handleSubmit(onSubmit)} className="relative w-full flex flex-col gap-12">
//               <div className="w-full relative flex items-center justify-center gap-2 rounded-full border bg-transparent pl-5 lg:pl-3 text-lightText mb-5 transition-all duration-200">
//                 <Controller
//                   name="calling_code"
//                   control={control}
//                   defaultValue={undefined}
//                   rules={{ required: 'Este campo es obligatorio' }}
//                   render={({ field, fieldState }) => (
//                     <SelectCountry
//                       selectedCodeCountry={field.value}
//                       setSelectedCodeCountry={(option) => field.onChange(option)}
//                       errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
//                       textColor={['gray-700', 'gray-200']}
//                       maxHeightModal={true}
//                     />
//                   )}
//                 />

//                 <InputSteps
//                   label=""
//                   name="phone"
//                   id="phone"
//                   type="tel"
//                   placeholder="Número de WhatsApp"
//                   register={register}
//                   watch={watch}
//                   rules={{
//                     validate: (value) => {
//                       const country = watch('calling_code');
//                       const result = validatePhoneNumber(value, country);
//                       return result === true ? true : result;
//                     },
//                   }}
//                   disabledWithoutMargin={true}
//                   className="w-full text-sm border-none "
//                 />
//               </div>
//               {errors.phone && (
//                 <p className="absolute top-16 w-full text-center font-textFont text-sm text-errorColor">
//                   {errors.phone.message}
//                 </p>
//               )}
//               <div className="flex justify-between gap-4 pt-5">
//                 <button
//                   type="button"
//                   onClick={() => setShow(false)}
//                   className={`rounded-full px-4 ${isDark
//                     ? 'border border-white text-white hover:bg-white hover:text-[#4B4B4B]'
//                     : 'border border-blue-400 bg-white text-blue-400'
//                     }`}
//                 >
//                   Volver
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`h-8 rounded-full px-4 ${isDark
//                     ? 'bg-white text-[#4B4B4B]'
//                     : 'bg-blue-400 text-white hover:bg-blue-700'
//                     }`}
//                 >
//                   {loading ? 'Guardando...' : 'Guardar'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <VerifyCodeModal
//         show={showVerificationCode}
//         setShow={handleCloseVerification}
//         onVerify={handleVerifyCode}
//         loading={verificationLoading}
//       />
//     </>
//   );
// };

// export default WhatsappModal;