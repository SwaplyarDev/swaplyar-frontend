'use client';

import React, { useEffect } from 'react';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import ConversionInstructions from '../ui/Conversion-Instructions/ConversionInstructions';
import { FlyerGif, RecargaPaypal, UsdArs, homeSearch } from '@/utils/assets/imgDatabaseCloudinary';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import { useSystemStore } from '@/store/useSystemStore';
import Recommendations from '../Recomendations/Recomendations';
import Link from 'next/link';

export default function HomePage() {
  const resetToDefault = useSystemStore((state) => state.resetToDefault);

  useEffect(() => {
    resetToDefault();
  }, [resetToDefault]);

  return (
    <>
      <AnimatedBlurredCircles tope="top-[-175px]" />
      <section className="mx-auto w-full max-w-none overflow-hidden px-4 md:px-8 lg:px-4">
        <article className="m-auto flex w-full flex-col items-center justify-center">
          <div className="mt-0 flex w-full flex-col items-center justify-center">
            <ConversionInstructions />
          </div>
          <div className="relative mb-10 mt-8 flex w-full max-w-none flex-col items-center justify-center gap-10">
            <InfoBlock
              title="Podes cambiar USD o EUR de tu billetera virtual por la moneda de tu preferencia"
              imageSrc={UsdArs}
              imageAlt="Cambia USD de PayPal por ARS"
              contentNode={
                <>
                  Realizá cambios de USD, EUR o USDT de tu billetera virtual a la moneda que necesitas de manera rápida
                  y eficiente con SwaplyAr. Ofrecemos las mejores tasas del mercado para que siempre maximices tus
                  ganancias. Si necesitás transferir dinero desde PayPal, Payoneer, Wise, Pix, USDT, o pesos Argentinos,
                  lo depositamos directamente en tu cuenta bancaria local o internacional según prefieras, ya sea que
                  estes en tu casa o de viaje. Aumentá tus beneficios con SwaplyAr plus Rewards.
                </>
              }
            />
            <InfoBlock
              title="Te ayudamos a recargar tu cuenta de Paypal en USD o EUR"
              imageSrc={RecargaPaypal}
              imageAlt="Recarga PayPal"
              position={true}
              contentNode={
                <>
                  Es tan simple que lo podes hacer en tres pasos. Colocas el monto que deseas en la calculadora,
                  seleccionas en que Billetera Virtual deseas el dinero, rellenas la solicitud, realizas el pago
                  correspondiente y en menos de 15 minutos procederemos con la transacción de manera rápida y segura.
                  También nos podes escribir a nuestro WhatsApp y responderemos cualquier duda que tengas a la brevedad.
                </>
              }
            />
            <InfoBlock
              title="¿Buscas un intercambio seguro y rápido para tu dinero?"
              imageSrc={homeSearch}
              imageAlt="Intercambio seguro y rápido"
              contentNode={
                <>
                  En SwaplyAr, ayudamos a freelancers y trabajadores remotos a cambiar sus pagos desde su billetera
                  virtual y/o criptomonedas de forma rápida, segura y con un tipo de cambio competitivo, a su moneda
                  local.
                  <br /> <br /> Sabemos lo importante que es recibir tu dinero sin complicaciones, por eso ofrecemos un
                  servicio transparente y confiable, eliminando los riesgos de estafas y demoras en transferencias a tu
                  banco local.
                  <br /> <br /> Tu tranquilidad y seguridad son nuestra prioridad.
                </>
              }
            />
          </div>
        </article>
        <Recommendations />
        <div className="mt-20 flex flex-col gap-[14px] text-center font-textFont">
          <p className="font-light">Descubre por qué SwaplyAr es la clave que necesitas.</p>
          <Link
            href="/es/por-que-elegir-swaplyar"
            className="block text-[28px] text-buttonsLigth underline dark:text-darkText"
          >
            ¿Por Que SwaplyAr?
          </Link>
        </div>
      </section>
      <section className="mt-10">
        <FlyerTrabajo
          imageSrc={FlyerGif}
          href="/es/como-usar-swaplyar"
          description="Conoce cómo funciona nuestra plataforma y comienza a transferir dinero de forma sencilla y segura."
          nameButton="¡Empieza ahora!"
        />
      </section>
    </>
  );
}
