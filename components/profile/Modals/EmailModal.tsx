import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { updateEmail } from '../services/profileServices';

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
      const res = await updateEmail(session.accessToken, data.email) as { email: string };
      console.log("respuesta update email", res);
      // ✅ Actualizamos sesión en memoria
      //arroja error por la falta de tipado, falta formato de respuesta del servidor
      //consultar con back si la edicion es solo para admins.
      if (session.user) {
        await update({
          user: {
            ...session.user,
            email: res.email, // reflejamos el cambio
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

  if (!show) return null;

  return (
    <>
      <div onClick={() => setShow(false)} className="fixed inset-0 z-40 bg-black bg-opacity-80"></div>
      <div
        className={`fixed left-1/2 top-1/2 z-50 flex h-[220px] w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-2xl border-none xs:w-[400px] md:w-[500px] ${isDark ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}
      >
        <h2 className="xs:text-2x1 text-lg font-light md:text-3xl">Editar Correo</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[80%] gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className={clsx(
              "rounded-xl border px-3 py-2 text-black dark:text-white",
              errors.email ? "border-errorColor" : "border-inputLight"
            )}
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Introduce un email válido",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-errorColor">{errors.email.message}</p>
          )}

          <div className="flex justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setShow(false)}
              className={`rounded-full px-4 ${isDark ? 'border border-white text-white hover:bg-white hover:text-[#4B4B4B]' : 'border border-blue-400 bg-white text-blue-400'}`}
            >
              Volver
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`h-8 rounded-full px-4 ${isDark ? 'bg-white text-[#4B4B4B]' : 'bg-blue-400 text-white hover:bg-blue-700'}`}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmailModal;
