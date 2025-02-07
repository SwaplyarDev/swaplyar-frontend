'use client';
import React from 'react';
import SeachRequest from './form/SeachRequest';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import HeaderSectionEditSoli from './HeaderSectionEditSoli/HeaderSectionEditSoli';

const EditSoli = () => {
  return (
    <>
      <AnimatedBlurredCircles tope="top-[124px]" />
      <div className="flex w-full flex-col px-4 md:px-8 lg:px-4">
        <div>
          <h1 className="mx-auto w-full text-center font-titleFont text-[38px] font-medium md:max-w-[504px] lg2:max-w-[741px] lg2:text-[40px]">
            Modifica tu solicitud de forma rápida y sencilla
          </h1>
          <p className="mx-auto mt-[46px] w-full text-center font-textFont font-light lg2:max-w-[796px]">
            Ingresa el Número de Solicitud que aparece en tu comprobante para localizar y editar los detalles de tu
            solicitud de manera segura y eficiente. Asegúrate de verificar la información antes de guardar los cambios.
          </p>
        </div>

        <p className="mx-auto mt-10 w-full text-left font-textFont text-[21px] font-light md:max-w-[506px] md:text-center lg2:max-w-[752px]">
          Introduce los datos exactamente como aparecen en el correo electrónico enviado.
        </p>

        <div className="relative mx-auto mt-10 flex w-full flex-col lg2:max-w-[800px]">
          <HeaderSectionEditSoli />
          <div className="mx-auto flex h-auto w-full flex-col border-0 lg2:mb-[100px] lg2:mt-[55px]">
            <SeachRequest />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSoli;
