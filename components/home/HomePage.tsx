'use client';

import React, { useEffect, useState, useRef } from 'react';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import ConversionInstructions from '../ui/Conversion-Instructions/ConversionInstructions';
import {
  CentroDeAyuda,
  FlyerGif,
  RecargaPaypal,
  UsdArs,
} from '@/utils/assets/imgDatabaseCloudinary';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';

const mainStyles = {
  main: ' py-10  min-h-screen', // Centrado tanto vertical como horizontalmente
  infoBlocksContainer: 'flex flex-col items-center justify-center mt-8',
  instructionsCalculatorContainer:
    'flex space-x-4 items-center justify-center mt-8',
};

export default function HomePage() {
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  const calculateBannerHeight = () => {
    if (bannerRef.current) {
      setBannerHeight(bannerRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    calculateBannerHeight();
    window.addEventListener('resize', calculateBannerHeight);

    return () => {
      window.removeEventListener('resize', calculateBannerHeight);
    };
  }, []);

  return (
    <main className={mainStyles.main}>
      <div className="relative bg-white shadow-custom-blue" ref={bannerRef}>
        <FlyerTrabajo imageSrc="/images/need-help.png">
          Estamos trabajando en las funciones de inicio de sesión y registro.
        </FlyerTrabajo>
      </div>
      <AnimatedBlurredCircles topOffset={bannerHeight} />
      <div className="flex flex-col items-center justify-center">
        <div className={mainStyles.instructionsCalculatorContainer}>
          <ConversionInstructions />
        </div>

        <div className={mainStyles.infoBlocksContainer}>
          <InfoBlock
            title="Cambia USD de PayPal por ARS con SwaplyAr"
            imageSrc={UsdArs}
            imageAlt="Cambia USD de PayPal por ARS"
            content="Realizá cambios de dólares de PayPal a pesos argentinos de manera rápida y eficiente. Ofrecemos las mejores tasas del mercado para que maximices tus ganancias. Si necesitás transferir dinero desde PayPal, lo depositamos directamente en tu cuenta bancaria local o internacional según prefieras. Aumentá tus beneficios con SwaplyAr."
          />
          <InfoBlock
            title="Necesitás recargar tu cuenta de PayPal en USD o EUR, fácilmente en SwaplyAr tenés la solución"
            imageSrc={RecargaPaypal}
            imageAlt="Recarga PayPal"
            content="Simplemente envianos un mensaje especificando la cantidad que necesitás y te proporcionaremos una cotización. Si aceptás el precio, procederemos con la transacción de manera rápida y segura."
          />
        </div>
      </div>
      <div className="mt-10">
        <FlyerTrabajo imageSrc={FlyerGif}>
          <p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            ¿Nuevo en SwaplyAr? Haz clic en &quot;Cómo usar SwaplyAr&quot; y
            aprendé a operar fácilmente. ¡Empezá ahora!
          </p>
          <div>
            <button id="bannerHTUButton">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <a href="/info/how-to-use">&quot;Cómo usar SwaplyAr&quot;</a>
            </button>
          </div>
        </FlyerTrabajo>
      </div>
    </main>
  );
}
