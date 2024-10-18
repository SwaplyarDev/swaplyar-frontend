'use client';

import React, { useEffect } from 'react';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import Link from 'next/link';
import ConversionInstructions from '../ui/Conversion-Instructions/ConversionInstructions';
import {
  FlyerGif,
  RecargaPaypal,
  UsdArs,
} from '@/utils/assets/imgDatabaseCloudinary';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import { useSystemStore } from '@/store/useSystemStore';
import { useMargins } from '@/context/MarginProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import { useSession } from 'next-auth/react';

const mainStyles = {
  main: 'py-10 relative', // Centrado tanto vertical como horizontalmente
  infoBlocksContainer: 'flex flex-col items-center justify-center mt-8',
  instructionsCalculatorContainer:
    'relative flex space-x-4 items-center justify-center mt-8', // Añadimos `relative`
};

export default function HomePage() {
  const resetToDefault = useSystemStore((state) => state.resetToDefault);
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);

  useEffect(() => {
    resetToDefault();
  }, [resetToDefault]);

  const { data: session } = useSession();

  return (
    <main className={mainStyles.main}>
      <AnimatedBlurredCircles tope="top-[-375px]" />
      <div
        className="flex flex-col items-center justify-center"
        style={{ margin: currentMargin }}
      >
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
          ¿Nuevo en SwaplyAr? Haz clic en &quot;Cómo usar SwaplyAr&quot; y
          aprendé a operar fácilmente. ¡Empezá ahora!
          <div>
            <button
              id="bannerHTUButton"
              className="trasntition-transform ease group mt-6 rounded-full border-2 border-buttonsLigth bg-buttonsLigth px-4 py-2 text-lg duration-300 hover:scale-105 hover:border-selectBtsLight hover:bg-transparent"
            >
              <Link
                href={'/info/how-to-use'}
                className="ease font-bold text-darkText transition-colors duration-300"
              >
                Como usar Swaplyar
              </Link>
            </button>
          </div>
        </FlyerTrabajo>
      </div>
    </main>
  );
}
