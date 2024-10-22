'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import ContactForm from '@/components/ui/contact-form/ContactForm';
import { CentroDeAyuda } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { useMargins } from '@/context/MarginProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const HelpCenterPage = () => {
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);
  const { isDark } = useDarkTheme();

  return (
    <>
      <main className="relative flex w-full flex-col items-center justify-center gap-20 py-10">
        <AnimatedBlurredCircles tope="top-[-260px]" />
        <div
          className="mx-auto grid max-w-[1000px] gap-12"
          style={{ margin: currentMargin }}
        >
          <section className="rs-wrapper-v4 p-4">
            <h1 className="text-center text-3xl font-bold md:text-left">
              Bienvenido al Centro de Ayuda de SwaplyAr
            </h1>
            <p className="text-xl">
              Comunicate con nosotros y responderemos cualquier consulta que
              tengas
            </p>
          </section>
          <section className="flex flex-col items-center">
            <ContactForm />
          </section>
          <section className="rs-wrapper-v4 grid grid-cols-1 gap-8 md:grid-cols-2">
            <span className="card-rawe flex flex-col items-center rounded-2xl bg-[#e6e8ef62] p-8 dark:bg-calculatorDark md:items-start">
              {isDark ? (
                <Image
                  // src={Ayuda1Dark}
                  src="/images/ayuda1-dark.png"
                  alt="paso 1 de como cambiar tu dinero en SwaplyAr tema oscuro"
                  width={210}
                  height={150}
                />
              ) : (
                <Image
                  // src={Ayuda1}
                  src="/images/ayuda1.png"
                  alt="paso 1 de como cambiar tu dinero en SwaplyAr"
                  width={210}
                  height={150}
                />
              )}
              <h3 className="text-xl font-bold">Chateá con nosotros</h3>
              <div className="flex h-full flex-col justify-between">
                <p className="mb-6 text-center text-lg md:mb-0 md:text-left">
                  Comunicate con nuestro representante de Atención al Cliente
                  para recibir ayuda.
                </p>
                <p className="text-right text-2xl">
                  <LinkWithHover href="https://wa.me/+5491123832198">
                    WhatsApp.
                  </LinkWithHover>
                </p>
              </div>
            </span>
            <span className="card-rawe flex flex-col items-center rounded-2xl bg-[#e6e8ef62] p-8 dark:bg-calculatorDark md:items-start">
              {isDark ? (
                <Image
                  // src={Ayuda2Dark}
                  src="/images/ayuda2-dark.png"
                  alt="paso 2 de como cambiar tu dinero en SwaplyAr tema oscuro"
                  width={210}
                  height={150}
                />
              ) : (
                <Image
                  // src={Ayuda2}
                  src="/images/ayuda2.png"
                  alt="paso 2 de como cambiar tu dinero en SwaplyAr"
                  width={210}
                  height={150}
                />
              )}
              <h3 className="text-xl font-bold">Otro motivo...</h3>
              <div className="flex flex-col justify-between">
                <p className="mb-6 text-center text-lg md:mb-0 md:text-left">
                  Si necesitás contactarnos por otro motivo, simplemente
                  envianos un email y atenderemos tu solicitud.
                </p>
                <p className="text-right text-2xl">
                  <LinkWithHover href="mailto:centrodeayuda@swaplyar.com">
                    Email.
                  </LinkWithHover>
                </p>
              </div>
            </span>
          </section>
        </div>
      </main>
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        <></>
      </FlyerTrabajo>
    </>
  );
};

export default HelpCenterPage;
