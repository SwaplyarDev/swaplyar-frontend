'use client';
import React, { useState, useEffect } from 'react';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { Rewards1, Rewards2, Rewards3, CentroDeAyuda } from '@/utils/assets/imgDatabaseCloudinary';

export default function LoyaltyProgram() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 768); // Considera como "tablet" si el ancho es menor o igual a 768px
    };

    // Ejecutar al cargar y cada vez que la ventana cambie de tamaño
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <main className="relative py-6">
        <AnimatedBlurredCircles tope="top-[20px]" />

        <h1 className="mb-5 mt-[-10px] py-4 text-center text-[45px] font-[500] leading-[1.1] text-[#252526] sm:text-[30px]">
          <span>SwaplyAr Plus Rewards™</span>
          <br />
          <span>premia tu fidelidad</span>
        </h1>

        <h2 className="mx-auto mb-5 mt-5 w-full leading-relaxed sm:w-[90%] lg:w-[55%]">
          <span className="text-lg font-bold">Cada transacción es una oportunidad de obtener más.</span>
          <span className="text-base font-normal">
            Únete a SwaplyAr Plus Rewards y disfruta de beneficios exclusivos cada vez que realices un intercambio.
          </span>
        </h2>

        <button
          id="submit-25456"
          className="mx-auto my-10 block h-[48px] w-[200px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText sm:w-[250px]"
        >
          ¡Únete ya!
        </button>

        <p className="mx-auto mb-0 mt-14 w-full leading-relaxed sm:w-[90%] lg:w-[592px]">
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

        <section
          className="mx-auto mb-8 max-w-[1200px] py-10 pb-16"
          style={{
            display: 'flex',
            flexDirection: isTablet ? 'column' : 'row', // Cambia a columna en tablet
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Primer bloque */}
          <div
            className="flex w-full flex-col items-center px-6 py-4 text-left sm:w-full lg:w-[320px] xl:w-[340px]"
            style={{
              display: 'flex',
              flexDirection: isTablet ? 'row' : 'column', // En tablet, coloca la imagen y el texto en fila
              alignItems: isTablet ? 'center' : 'flex-start',
            }}
          >
            <img
              src={Rewards1}
              alt="paso 1 de como cambiar tu dinero en SwaplyAr"
              className="mb-4 w-full max-w-[300px] object-contain"
              style={{
                marginBottom: isTablet ? '0' : '1rem', // Ajusta el margen en modo tablet
                marginRight: isTablet ? '1rem' : '0', // Espaciado entre imagen y texto en tablet
              }}
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
          <div
            className="flex w-full flex-col items-center px-6 py-4 text-left sm:w-full lg:w-[320px] xl:w-[340px]"
            style={{
              display: 'flex',
              flexDirection: isTablet ? 'row-reverse' : 'column',
              alignItems: isTablet ? 'center' : 'flex-start',
            }}
          >
            <img
              src={Rewards2}
              alt="paso 2 de como cambiar tu dinero en SwaplyAr"
              className="mb-4 w-full max-w-[300px] object-contain"
              style={{
                marginBottom: isTablet ? '0' : '1rem',
                marginRight: isTablet ? '1rem' : '0',
              }}
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
          <div
            className="flex w-full flex-col items-center px-6 py-4 text-left sm:w-full lg:w-[320px] xl:w-[340px]"
            style={{
              display: 'flex',
              flexDirection: isTablet ? 'row' : 'column',
              alignItems: isTablet ? 'center' : 'flex-start',
            }}
          >
            <img
              src={Rewards3}
              alt="paso 3 de como cambiar tu dinero en SwaplyAr"
              className="mb-4 w-full max-w-[300px] object-contain"
              style={{
                marginBottom: isTablet ? '0' : '1rem',
                marginRight: isTablet ? '1rem' : '0',
              }}
            />
            <div>
              <h3 className="mb-0 mt-0 text-center text-lg font-bold">Exclusivo SwaplyAr</h3>
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
