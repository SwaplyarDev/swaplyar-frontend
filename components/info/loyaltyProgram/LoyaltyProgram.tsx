'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Importar Image de Next.js
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { Rewards1, Rewards2, Rewards3, CentroDeAyuda } from '@/utils/assets/imgDatabaseCloudinary';

export default function LoyaltyProgram() {
  return (
    <>
      <main className="relative py-6">
        <AnimatedBlurredCircles tope="top-[20px]" />

        <h1 className="text-dark dark:text-light mb-5 mt-[-10px] py-4 text-center text-[40px] font-[500] leading-[1.1] sm:text-[30px]">
          <span>SwaplyAr Plus Rewards™</span>
          <br />
          <span>premia tu fidelidad</span>
        </h1>

        <h2 className="mx-auto mb-5 mt-5 w-full whitespace-normal px-4 text-[20px] leading-tight sm:max-w-[90%] sm:px-6 lg:max-w-[55%] lg:px-8">
          <span className="mr-2 text-lg font-bold">Cada transacción es una oportunidad de obtener más.</span>
          <span className="text-base font-normal">
            Únete a SwaplyAr Plus Rewards y disfruta de beneficios exclusivos cada vez que realices un intercambio.
          </span>
        </h2>

        <button
          id="submit-25456"
          className="mx-auto my-10 block h-[48px] w-[300px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText sm:w-[300px]"
        >
          ¡Únete ya!
        </button>

        <p className="mx-auto mb-0 mt-14 w-full max-w-[592px] px-4 text-left leading-relaxed">
          ¿Aún no formas parte?{' '}
          <a href="http://localhost:3000/info/loyalty-program" className="underline">
            Crea
          </a>{' '}
          tu perfil en SwaplyAr o{' '}
          <a href="http://localhost:3000/info/loyalty-program" className="underline">
            Inicia Sesión
          </a>{' '}
          en tu cuenta y da el primer paso hacia una experiencia que te recompensa en cada movimiento. ¡Inscríbete hoy y
          comienza a disfrutar las ventajas!
        </p>

        <section className="mx-auto mb-0 flex max-w-[1200px] flex-wrap justify-center gap-4 py-10 pb-16 md:mb-4">
          {/* Primer bloque */}
          <div className="flex w-full flex-col items-center px-4 py-4 text-left sm:flex-col md:flex-row lg:w-[320px] lg:flex-col xl:w-[340px]">
            <Image
              src={Rewards1}
              alt="paso 1 de como cambiar tu dinero en SwaplyAr"
              className="mb-4 w-full max-w-[300px] object-contain"
              width={300}
              height={200}
            />
            <div>
              <h3 className="mb-0 mt-0 text-center text-lg font-bold">Regalo de Bienvenida</h3>
              <p className="mt-0 text-justify text-sm leading-tight">
                Únete a SwaplyAr Plus Rewards™ y recibe $10 adicionales en tu segunda transacción de más de $200,
                realizada con cualquier billetera virtual.
              </p>
            </div>
          </div>

          {/* Segundo bloque */}
          <div className="flex w-full flex-col items-center px-4 py-4 text-left sm:flex-col md:flex-row-reverse lg:w-[320px] lg:flex-col xl:w-[340px]">
            <Image
              src={Rewards2}
              alt="paso 2 de como cambiar tu dinero en SwaplyAr"
              className="mb-4 w-full max-w-[300px] object-contain"
              width={300}
              height={200}
            />
            <div>
              <h3 className="mb-0 mt-0 text-center text-lg font-bold">Los premios nunca terminan</h3>
              <p className="mt-0 text-justify text-sm leading-tight">
                Recompensas Continuas: Gana $5 adicionales después de completar 5 transacciones por un monto igual o
                superior a $400 cada una.
              </p>
            </div>
          </div>

          {/* Tercer bloque */}
          <div className="flex w-full flex-col items-center px-4 py-4 text-left sm:flex-col md:flex-row lg:w-[320px] lg:flex-col xl:w-[340px]">
            <Image
              src={Rewards3}
              alt="paso 3 de como cambiar tu dinero en SwaplyAr"
              className="mb-4 w-full max-w-[300px] object-contain"
              width={300}
              height={200}
            />
            <div>
              <h3 className="mb-0 mt-0 text-center text-lg font-bold md:text-left">Exclusivo SwaplyAr</h3>
              <p className="mt-0 text-justify text-sm leading-tight">
                ¡Mantente siempre atento a nuestras promociones: ¡ofertas exclusivas y acceso a beneficios únicos te
                esperan!
              </p>
            </div>
          </div>
        </section>

        <FlyerTrabajo imageSrc={CentroDeAyuda}>
          <div></div>
        </FlyerTrabajo>
      </main>
    </>
  );
}
