'use client';

import { signOut } from 'next-auth/react';

interface IProps {
  errors: string[];
}

export default function ErrorComponent({ errors }: IProps) {
  return (
    <div className="flex h-[331px] w-[80%] flex-col items-center justify-center rounded-2xl bg-gray-100 p-5 dark:bg-custom-grayD-800 lg:h-[640px]">
      <p className="mb-3 text-base font-semibold xs-mini-phone2:text-lg">Ha ocurrido un error al cargar los datos:</p>
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
      <p className="my-3 text-base font-semibold xs-mini-phone2:text-lg">Por favor vuelva a iniciar sesión</p>
      <button
        className="relative max-w-[280px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-[34px] py-2 font-titleFont font-semibold text-white transition-opacity hover:opacity-90 dark:border-darkText dark:bg-darkText dark:text-lightText"
        onClick={() => signOut()}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
