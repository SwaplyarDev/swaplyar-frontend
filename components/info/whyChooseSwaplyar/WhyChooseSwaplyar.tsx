'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import GuaranteeSection from '@/components/ui/warranty-section/WarrantySection';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import {
  CentroDeAyuda,
  ElegirSwaplyAr,
  FlyerGif,
  LideresenCambio,
  Porqueelegirnos,
  SeguridadySatisfaccion,
} from '@/utils/assets/imgDatabaseCloudinary';
import { useMargins } from '@/context/MarginProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import Link from 'next/link';
import { useDarkTheme } from '../../ui/theme-Provider/themeProvider';

const divStyles = {
  infoBlocksContainer: 'flex flex-col items-center justify-center',
  instructionsCalculatorContainer: 'flex space-x-4 justify-center',
};

const WhyChooseSwaplyar: React.FC = () => {
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);

  const { isDark } = useDarkTheme();

  return (
    <div className="relative flex w-full flex-col gap-20 py-10">
      <AnimatedBlurredCircles tope="top-[-650px]" />
      <div className="m-auto grid items-center justify-center gap-12" style={{ padding: currentMargin }}>
        <section>
          <GuaranteeSection
            title="¿Por Qué Elegir SwaplyAr para Tu Cambio de Divisas?"
            imageSrc={ElegirSwaplyAr}
            imageAlt="¿Por Qué Elegir SwaplyAr para Tu Cambio de Divisas?"
            contentNode={
              <>
                <p className="text-pretty text-left text-xl">
                  Si estás buscando seguridad y confiabilidad en el intercambio de tu dinero digital, SwaplyAr es tu
                  mejor opción. Descubre por qué somos la elección preferida para cambiar divisas de PayPal, con las
                  mejores tasas del mercado y una plataforma fácil de usar.
                </p>
              </>
            }
          />
        </section>

        <section className="space-y-32">
          <InfoBlock
            title="¿Por qué elegirnos?"
            imageSrc={Porqueelegirnos}
            imageAlt="Cambia USD de PayPal por ARS"
            contentNode={
              <>
                <p>Las razones para elegirnos incluyen:</p>
                <span className="mx-auto flex justify-center p-3">
                  <ol className="mt-4 w-[90%] list-decimal space-y-1 text-pretty text-left">
                    <li>Más rápido, más fácil y la mejor tasa del mercado.</li>
                    <li>Los Pedidos son completados en menos de 1 hora.</li>
                    <li>Soporte mediante Chat en WhatsApp.</li>
                    <li>Seguridad.</li>
                    <li>Actualización diaria con tasas competitivas.</li>
                    <li>Descuentos para clientes activos.</li>
                    <li>Servicio 24/7.</li>
                  </ol>
                </span>
              </>
            }
          />

          <InfoBlock
            title="SwaplyAr: Líderes en Cambio de Divisas de PayPal"
            imageSrc={LideresenCambio}
            imageAlt="Recarga PayPal"
            content="
                Orgullosos de ofrecer las mejores tasas del mercado, en SwaplyAr nos
                avalan más de 1,500 usuarios satisfechos. El 90% nos recomienda por
                nuestra plataforma segura y fácil de usar. Únete y maximiza tu dinero
                digital con confianza.
            "
          />

          <InfoBlock
            title="Tu Seguridad y Satisfacción Son Nuestra Prioridad en SwaplyAr"
            imageSrc={SeguridadySatisfaccion}
            imageAlt="Recarga PayPal"
            content="
                Con nosotros, tu dinero y tú están en manos seguras. Nuestro dedicado
                equipo de soporte al cliente está disponible en todo momento para
                asegurar que cualquier duda o inconveniente sea resuelto rápidamente,
                garantizando una experiencia sin estrés.
            "
          />
        </section>
      </div>

      <FlyerTrabajo imageSrc={FlyerGif}>
        <p>
          ¿Nuevo en SwaplyAr? <br /> Conoce cómo funciona nuestra plataforma y comienza a transferir dinero de forma
          sencilla y segura. Haz click y aprende cómo usar SwaplyAr{' '}
        </p>
        <div>
          <button
            id="bannerHTUButton"
            className={`trasntition-transform ease group mt-6 rounded-full border-2 border-buttonsLigth bg-buttonsLigth px-4 py-2 text-lg duration-300 hover:border-selectBtsLight dark:border-darkText dark:bg-darkText dark:text-black ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
          >
            <Link
              href={'/info/how-to-use'}
              className={`ease font-bold text-darkText transition-colors duration-300 ${isDark ? 'dark:text-lightText' : 'text'} `}
            >
              <h3>Como usar Swaplyar</h3>
            </Link>
          </button>
        </div>
      </FlyerTrabajo>
    </div>
  );
};

export default WhyChooseSwaplyar;
