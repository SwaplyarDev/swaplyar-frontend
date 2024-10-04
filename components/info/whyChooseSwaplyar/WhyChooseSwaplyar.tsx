'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import GuaranteeSection from '@/components/ui/warranty-section/WarrantySection';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { useState, useEffect, useRef } from 'react';
import {
  CentroDeAyuda,
  ElegirSwaplyAr,
  FlyerGif,
  LideresenCambio,
  Porqueelegirnos,
  SeguridadySatisfaccion,
} from '@/utils/assets/imgDatabaseCloudinary';

const mainStyles = {
  infoBlocksContainer: 'flex flex-col items-center justify-center',
  instructionsCalculatorContainer: 'flex space-x-4 justify-center',
};

const WhyChooseSwaplyar: React.FC = () => {
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
    <main
      className="relative flex w-full flex-col gap-20 py-10"
      ref={bannerRef}
    >
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>
      <AnimatedBlurredCircles topOffset={bannerHeight} tope="top-[-650px]" />
      <div className="m-auto grid w-[90%] items-center justify-center gap-12">
        <section>
          <GuaranteeSection
            title="¿Por Qué Elegir SwaplyAr para Tu Cambio de Divisas?"
            imageSrc={ElegirSwaplyAr}
            imageAlt="¿Por Qué Elegir SwaplyAr para Tu Cambio de Divisas?"
            contentNode={
              <>
                <p className="text-pretty text-center text-xl md:text-left">
                  Si estás buscando seguridad y confiabilidad en el intercambio
                  de tu dinero digital, SwaplyAr es tu mejor opción. Descubre
                  por qué somos la elección preferida para cambiar divisas de
                  PayPal, con las mejores tasas del mercado y una plataforma
                  fácil de usar.
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
                <span className="m-auto flex w-[90%] justify-center">
                  <ol className="mt-4 list-decimal space-y-1 text-pretty text-left">
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
        &iquest;Nuevo en SwaplyAr? Hac&eacute; clic en &quot;C&oacute;mo usar
        SwaplyAr&quot; y aprend&eacute; a operar f&aacute;cilmente.
        &iexcl;Empez&aacute; ahora!
      </FlyerTrabajo>
    </main>
  );
};

export default WhyChooseSwaplyar;
