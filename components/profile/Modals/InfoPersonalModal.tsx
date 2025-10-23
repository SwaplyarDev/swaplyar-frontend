'use client';
import InputSteps from '@/components/inputSteps/InputSteps';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInfoPersonalFormStore } from '../store/InfoPersonalFormStore';
import { updateProfile } from '../services/profileServices';
import { useSession } from 'next-auth/react';
import { Dialog, DialogContent } from '@mui/material';

type InfoPersonalModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

type FormData = {
  alias: string;
  country: string;
  department: string;
};

const InfoPersonalModal = ({ show, setShow }: InfoPersonalModalProps) => {
  const { isDark } = useDarkTheme();
  const { data: session, update } = useSession();
  const token = session?.accessToken;
  const { setAlias } = useInfoPersonalFormStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({ mode: 'onChange' });

  const { alias } = useInfoPersonalFormStore((state) => state);

  useEffect(() => {
    setValue('alias', alias);
  }, [setValue, alias]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!token) throw new Error("No access token available");
      setLoading(true);

      const payload: {
        nickname?: string;
        location?: {
          country: string;
          department: string;
          postalCode?: string;
          date?: string;
        };
      } = {};

      if (data.alias) payload.nickname = data.alias;
      if (data.country && data.department) {
        payload.location = {
          country: data.country,
          department: data.department,
          postalCode: "000000",
          date: new Date().toISOString().split("T")[0],
        };
      }

      const res = await updateProfile(token, payload.nickname, payload.location);
      console.log("Respuesta de updateProfile:", res);

      const nickNameFromRes = res.nickName ?? res.nickname ?? payload.nickname;
      if (nickNameFromRes) setAlias(nickNameFromRes);

      if (session?.user) {
        await update({
          user: {
            ...session.user,
            profile: {
              ...session.user.profile,
              nickName: nickNameFromRes ?? session.user.profile?.nickName,
              location: res.user?.locations ?? session.user.profile?.location,
            },
          },
        });
      }

      setShow(false);
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
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
          width: { xs: '90%' },
          maxWidth:600
        },
      }}
    >
      <DialogContent>
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-4 w-full text-start text-lg sm:text-xl font-semibold">
            Apodo
          </h2>
          <span className="text-center mb-4">¿Como te gustarian que te llamen?</span>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div>
              <InputSteps
                label=""
                name="alias"
                id="alias"
                type="text"
                placeholder={errors.alias ? 'Apodo *' : 'Apodo'}
                register={register}
                watch={watch}
                rules={{
                  required: 'El Apodo es obligatorio',
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                    message: 'El Apodo solo puede contener letras y espacios',
                  },
                }}
                error={errors.alias}
                className="order-1 w-full flex  justify-start"
              />
            </div>


            <div className="flex justify-between gap-4 pt-5">
              <button
                onClick={() => setShow(false)}
                type="button"
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
                {loading ? 'Guardando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoPersonalModal;
