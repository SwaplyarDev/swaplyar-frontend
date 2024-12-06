import VerifycodeEditRequest from '../verify-code-editRequest/verify-code-editRequest';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface isDark {
  isDark: boolean;
}

const SeachRequest: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { isDark } = useDarkTheme();
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar el spinner
  const handleSeachRequestSubmit = () => {};
  return (
    <div>
      <form className="ml-2 mt-3 flex h-full flex-col justify-evenly lg:ml-7">
        <label className="flex flex-col pr-2 text-right text-xl font-bold" htmlFor="Solicitud">
          NUMERO DE SOLICITUD
        </label>
        <input
          id="Solicitud"
          className={`flex w-full border-0 border-b-4 border-solid ps-0 pt-0 text-right text-xl ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white' : 'border-b-buttonsLigth bg-transparent text-black placeholder-black focus:border-buttonsLigth'} outline-none focus:outline-none`}
          type="text"
          placeholder="Como figura en el recibo"
          // {...register('transaction_id', {
          //   required: '• El número de referencia es obligatorio',
          //   pattern: {
          //     value: /^[A-Za-z0-9]{10,20}$/,
          //     message: '• El número de referencia debe tener entre 10 y 20 caracteres alfanuméricos',
          //   },
          // })}

          // required
        />
        <div className="mt-5 flex w-full justify-end text-center xl:mr-44">
          {!isToggled ? (
            <button
              type="submit"
              disabled={isLoading}
              className={`dark:hover:bg- relative m-1 mt-8 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 px-20 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
              onClick={handleToggle}
            >
              {isLoading ? 'Cargando...' : 'Buscar'}
            </button>
          ) : (
            <VerifycodeEditRequest toggle={handleToggle} isDark={isDark}></VerifycodeEditRequest>
          )}
        </div>
      </form>
    </div>
  );
};

export default SeachRequest;
