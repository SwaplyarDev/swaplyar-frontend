'use client';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { updateEmail } from '../services/profileServices';
import { Dialog, DialogContent } from '@mui/material';
import InputSteps from '@/components/inputSteps/InputSteps';

interface EmailModalProps {
  show: boolean;
  setShow: (arg: boolean) => void;
}

interface FormData {
  email: string;
}

const EmailModal = ({ show, setShow }: EmailModalProps) => {
  const { isDark } = useDarkTheme();
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);

  // Pre-cargamos el email actual
  useEffect(() => {
    if (session?.user.email) {
      setValue('email', session.user.email);
    }
  }, [session, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!session?.accessToken) return;
    setLoading(true);

    try {
      const res = (await updateEmail(session.accessToken, data.email)) as { email: string };
      console.log("respuesta update email", res);

      if (session.user) {
        await update({
          user: {
            ...session.user,
            email: res.email,
          },
        });
      }

      setShow(false);
    } catch (err) {
      console.error("❌ Error al actualizar email:", err);
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
          maxWidth: 600
        },
      }}
    >
      <DialogContent>
        <div className="flex h-full flex-col items-center gap-0 text-center">
          <h2 className="mb-4 w-full text-start text-lg sm:text-xl font-semibold">
            Correo Electrónico
          </h2>
          <span className="mb-4 text-xs md:text-base">
            ¿Cuál es tu correo electrónico?
          </span>
          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
            <InputSteps
              label=""
              name="email"
              id="email"
              type="email"
              placeholder="Correo electrónico"
              register={register}
              watch={watch}
              rules={{
                required: 'El email es obligatorio',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Introduce un email válido',
                },
              }}
              error={errors.email}
              className=" w-full flex justify-start"
            />

            <div className="flex justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => setShow(false)}
                className={clsx(
                  'rounded-full px-4 py-2 border',
                  isDark
                    ? 'border-white text-white hover:bg-white hover:text-[#4B4B4B]'
                    : 'border-blue-400 bg-white text-blue-400 hover:bg-blue-50'
                )}
              >
                Volver
              </button>
              <button
                type="submit"
                disabled={loading}
                className={clsx(
                  'h-10 rounded-full px-4 py-2 transition-colors',
                  isDark
                    ? 'bg-white text-[#4B4B4B] hover:bg-gray-200'
                    : 'bg-blue-400 text-white hover:bg-blue-700',
                  loading && 'opacity-50 cursor-not-allowed'
                )}
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

export default EmailModal;