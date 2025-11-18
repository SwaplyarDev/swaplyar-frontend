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
    <div className="relative w-full flex flex-col gap-12 md:gap-16 lg:gap-20 py-8 md:py-10 lg:py-12 px-4 md:px-8 lg:px-4">
      <AnimatedBlurredCircles tope="top-[-650px]" />
      
      <div className="mx-auto w-full max-w-screen-phone xs-mini-phone2:max-w-screen-tablet md:max-w-screen-desktop" style={{ padding: currentMargin }}>
        <section className="pt-4 md:pt-0">
          <GuaranteeSection
            title="¿Por Qué Elegir SwaplyAr para Tu Cambio de Divisas?"
            imageSrc={ElegirSwaplyAr}
            imageAlt="¿Por Qué Elegir SwaplyAr para Tu Cambio de Divisas?"
            contentNode={
              <>
                <p className="text-pretty text-left text-base md:text-lg lg:text-xl leading-relaxed">
                  Si estás buscando seguridad y confiabilidad en el intercambio de tu dinero digital, SwaplyAr es tu
                  mejor opción. Descubre por qué somos la elección preferida para cambiar divisas de PayPal, con las
                  mejores tasas del mercado y una plataforma fácil de usar.
                </p>
              </>
            }
          />
        </section>

        <section className="space-y-16 md:space-y-24 lg:space-y-32 mt-12 md:mt-16 lg:mt-20">
          <InfoBlock
            title="¿Por qué elegirnos?"
            imageSrc={Porqueelegirnos}
            imageAlt="Cambia USD de PayPal por ARS"
            customContainerClassName="pt-4 md:pt-0"
            customGap={40}
            customContentWidth={742}
            contentNode={
              <div className="h-[338px] md:h-auto flex flex-col justify-center">
                <p className="text-sm md:text-base lg:text-lg mb-3 md:mb-4">Las razones para elegirnos incluyen:</p>
                <span className="mx-auto flex justify-center p-2 md:p-3 lg:p-4">
                  <ol className="mt-3 md:mt-4 w-full max-w-[90%] lg:max-w-[100%] list-decimal space-y-1  text-pretty text-left text-sm md:text-base">
                    <li>Más rápido, más fácil y la mejor tasa del mercado.</li>
                    <li>Los Pedidos son completados en menos de 1 hora.</li>
                    <li>Soporte mediante Chat en WhatsApp.</li>
                    <li>Seguridad.</li>
                    <li>Actualización diaria con tasas competitivas.</li>
                    <li>Descuentos para clientes activos.</li>
                    <li>Servicio 24/7.</li>
                  </ol>
                </span>
              </div>
            }
          />

          <InfoBlock
            title="SwaplyAr: Líder en Intercambio de Divisas entre Billeteras Virtuales y Criptomonedas"
            imageSrc={LideresenCambio}
            imageAlt="Recarga PayPal"
            customContainerClassName="pt-4 md:pt-0"
            customGap={40}
            customContentWidth={742}
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
            customContainerClassName="pt-4 md:pt-0"
            customGap={40}
            customContentWidth={742}
            content="
                Con nosotros, tu dinero y tú están en manos seguras. Nuestro dedicado
                equipo de soporte al cliente está disponible en todo momento para
                asegurar que cualquier duda o inconveniente sea resuelto rápidamente,
                garantizando una experiencia sin estrés.
            "
          />
        </section>
      </div>

      <FlyerTrabajo
        imageSrc={FlyerGif}
        href="/es/como-usar-swaplyar"
        description="Descubrí cómo aprovechar al máximo SwaplyAr"
        nameButton="Aprendé a transferir"
      />
    </div>
  );
};

export default WhyChooseSwaplyar;