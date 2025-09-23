'use client';
import InputSteps from '@/components/inputSteps/InputSteps';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInfoPersonalFormStore } from '../store/InfoPersonalFormStore';
import { updateLocation, updateNickname } from '../services/profileServices';
import { useSession } from 'next-auth/react';

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
    //traemos a update desde useSession
  const { data: session, update } = useSession();
  const token = session?.accessToken;
  const { setAlias } = useInfoPersonalFormStore();
  const [nickName, setNickName] = useState();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
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
    if (data.alias) {

      const res = await updateNickname(token, data.alias);
      console.log('Respuesta updateNickname en InfoPersonalModal.tsx:', res);
      
      setAlias((res as { nickName: string }).nickName);

       // ✅ Actualizamos la sesión en memoria
      if (session?.user) {
        await update({
          user: {
            ...session.user,
            profile: {
              ...session.user.profile,
              nickName: res.nickName, // Aquí reflejamos el cambio
            },
          },
        });
      }

      setShow(false);
    }

    // if (data.country && data.department) {
    //   await updateLocation(token, data.country, data.department);
    // }

    setShow(false);
  } catch (err) {
    console.error("Error al actualizar perfil:", err);
  }
};


  return (
    <>
      <div onClick={() => setShow(false)} className="fixed inset-0 z-40 bg-black bg-opacity-80"></div>
      <div
        className={`fixed left-1/2 top-1/2 z-50 flex h-[250px] w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-2xl border-none xs:w-[400px] ${isDark ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}
      >
        <h2 className="text-3xl font-light">Modificar Apodo</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputSteps
              label="Apodo"
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
              className={'order-1'}
            />
          </div>

          {/* <InputSteps
            label="País"
            name="country"
            id="country"
            type="text"
            placeholder={errors.country ? 'País *' : 'País'}
            register={register}
            watch={watch}
            rules={{
              required: 'El país es obligatorio',
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                message: 'El país solo puede contener letras y espacios',
              },
            }}
            error={errors.country}
            className="order-2"
          />

          <InputSteps
            label="Provincia / Departamento"
            name="department"
            id="department"
            type="text"
            placeholder={errors.department ? 'Provincia / Departamento *' : 'Provincia / Departamento'}
            register={register}
            watch={watch}
            rules={{
              required: 'El departamento es obligatorio',
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                message: 'Solo puede contener letras y espacios',
              },
            }}
            error={errors.department}
            className="order-3"
          /> */}

          <div className="flex justify-between gap-4 pt-5">
            <button
              onClick={() => setShow(false)}
              className={`rounded-full px-4 ${isDark ? 'border border-white text-white hover:bg-white hover:text-[#4B4B4B]' : 'border border-blue-400 bg-white text-blue-400'}`}
            >
              Volver
            </button>
            <button
              type="submit"
              className={`h-8 rounded-full px-4 ${isDark ? 'bg-white text-[#4B4B4B]' : 'bg-blue-400 text-white hover:bg-blue-700'}`}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InfoPersonalModal;
