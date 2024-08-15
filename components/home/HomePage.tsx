// app/page.tsx
'use client';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import ConversionInstructions from '../ui/Conversion-Instructions/ConversionInstructions';
import {
  CentroDeAyuda,
  FlyerGif,
  RecargaPaypal,
  UsdArs,
} from '@/utils/assets/img-database';
import ButtonTest from '../ButtonTest';

const mainStyles = {
  main: 'py-10',
  infoBlocksContainer: 'flex flex-col items-center justify-center',
  instructionsCalculatorContainer: 'flex space-x-4',
};

export default function HomePage() {
  return (
    <main className={mainStyles.main}>
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>
      <div className={mainStyles.instructionsCalculatorContainer}>
        <ConversionInstructions />
      </div>
      <div className={mainStyles.infoBlocksContainer}>
        <InfoBlock
          title="Cambia USD de PayPal por ARS"
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
      <div className="mt-10">
        <FlyerTrabajo imageSrc={FlyerGif}>
          &iquest;Nuevo en SwaplyAr? Hac&eacute; clic en &quot;C&oacute;mo usar
          SwaplyAr&quot; y aprend&eacute; a operar f&aacute;cilmente.
          &iexcl;Empez&aacute; ahora!
        </FlyerTrabajo>
      </div>
      <ButtonTest/> //Borrar
    </main>
  );
}
