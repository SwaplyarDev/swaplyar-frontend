'use client';
import InputSteps from '@/components/inputSteps/InputSteps';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInfoPersonalFormStore } from '../store/InfoPersonalFormStore';

type InfoPersonalModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

type FormData = {
  alias: string;
};

const InfoPersonalNuevo = ({ setShow }: InfoPersonalModalProps) => {
  const { isDark } = useDarkTheme();

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
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    console.log(data);
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

export default InfoPersonalNuevo;
