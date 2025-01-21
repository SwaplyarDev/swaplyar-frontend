'use client';
import React from 'react';
import SeachRequest from './form/SeachRequest';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import HeaderSectionEditSoli from './HeaderSectionEditSoli/HeaderSectionEditSoli';

const EditSoli = () => {
  return (
    <>
      <AnimatedBlurredCircles tope="top-[124px]" />
      <div className="flex w-full max-w-[744px] flex-col items-center justify-center gap-12 xs:gap-20 lg:mx-10 lg:max-w-[1280px] lg:gap-10">
        <div className="flex flex-col items-center gap-6 lg:gap-0">
          <h1 className="w-full max-w-[500px] text-center text-4xl font-bold lg:max-w-full">
            Modifica tu solicitud de forma rápida y sencilla
          </h1>
          <p className="text-normal mt-2 w-full max-w-[680px] text-center lg:max-w-[800px]">
            Ingresa el Número de Solicitud que aparece en tu comprobante para localizar y editar los detalles de tu
            solicitud de manera segura y eficiente. Asegúrate de verificar la información antes de guardar los cambios.
          </p>
        </div>

        <p className="w-full max-w-[500px] text-center text-2xl lg:max-w-full">
          Introduce los datos exactamente como aparecen en el correo electrónico enviado.
        </p>

        <div className="flex w-full flex-col items-center gap-5 xs:gap-20 lg:flex-row lg:gap-0">
          <HeaderSectionEditSoli />
          <div className="mr-0 flex h-auto w-full flex-col border-0 lg:pb-28">
            <SeachRequest />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSoli;
