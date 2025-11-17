'use client';
import ContactForm from '@/components/ui/contact-form/ContactForm';
import Image from 'next/image';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Link from 'next/link';
import { sectionBottomHelpCenter, sectionLinksHelpCenter } from '@/data/sectionHelpCenter';
import clsx from 'clsx';

import { helpCenter4, helpCenter4Dark, FlyerTrabajoImg, FlyerGif } from '@/utils/assets/imgDatabaseCloudinary';
import ShortButton from '@/components/ui/NewButtons/ShortButton';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';

const HelpCenterPage = () => {
  const { isDark } = useDarkTheme();

  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center gap-20 px-4 md:px-8 navbar-desktop:px-4 my-[40px] md:my-[80px] navbar-desktop:my-[120px]">
        <AnimatedBlurredCircles tope="top-[-260px]" />
        <div className="w-full mt-5">
          <div className="mx-auto lg2:max-w-[1205px]">
            <h1 className="mx-auto max-w-[592px] lg2:max-w-[631px] text-center font-titleFont text-[32px] leading-[120%] md:text-[38px] font-semibold lg2:text-[40px]">
              Bienvenido al Centro de Ayuda <span className='hidden lg2:inline'>y soporte</span> de SwaplyAr
            </h1>
            <div className="mt-10 flex flex-col md:flex-row md:flex-wrap md:justify-center lg2:justify-between gap-3 lg2:flex-row">
              {sectionLinksHelpCenter.map((item, i: number) => (
                <Link
                  key={i}
                  href={item.href}
                  className="group relative flex flex-col items-center lg2:after:absolute lg2:after:-right-4 lg2:after:h-full lg2:after:w-[1px] lg2:after:bg-buttonsLigth lg2:after:content-[''] lg2:after:last:hidden lg2:after:dark:bg-darkText xl:after:-mr-6 md:w-[346px]"
                >
                  <div className="overflow-hidden max-h-[200px] w-[200px]">
                    <Image
                      className={`w-full h-[200px] object-contain drop-shadow-light dark:drop-shadow-darkmode mb-8 ${i === 0 ? 'scale-[2.5] translate-y-40' : i === 2 ? 'scale-[1.5] translate-y-14' : ''}`}
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={200}
                    />
                  </div>
                  <h2
                    className={clsx(
                      'w-full border-t-[1px] text-center font-textFont text-[28px] transition-all duration-300',
                      isDark
                        ? 'border-darkText group-hover:underline'
                        : 'border-buttonsLigth group-hover:text-buttonsLigth group-hover:underline',
                    )}
                  >
                    {item.title}
                  </h2>
                  <p className="text-center font-textFont mb-none font-light">{item.text}</p>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-col text-center font-textFont lg2:flex-row lg2:items-center lg2:justify-center lg2:gap-4">
              <p className="font-light">¿Sospechas que eres víctima de un fraude?</p>
              <Link
                href="/es/centro-de-ayuda/prevencion-y-fraude"
                className="block text-[28px] text-buttonsLigth underline dark:text-darkText"
              >
                obtén información aquí
              </Link>
            </div>
          </div>
          <section className="mx-auto mt-10 flex max-w-[996px] flex-col items-center">
            <ContactForm />
          </section>
          <div className="mx-auto mt-10 flex max-w-[918px] flex-col items-center gap-12 md:flex-row">
            <div className="flex flex-1 overflow-hidden flex-shrink-0">
              <Image
                className="h-[320px] w-[381px] object-contain drop-shadow-light dark:drop-shadow-darkmode lg2:h-[386px] lg2:w-[381px]"
                src={isDark ? helpCenter4Dark : helpCenter4}
                alt="Imagen de SwaplyAr Plus Rewards"
                width={360}
                height={270}
              />
            </div>
            <div className="flex flex-1 flex-col items-center max-w-[489px] gap-2 lg2:gap-4">
              <h2 className="text-center font-textFont text-3xl md:text-[36px]">
                SwaplyAr Plus Rewards™ premia tu fidelidad, con el programa de fidelización
              </h2>
              <p className="font-textFont font-light">
                Obtené beneficios exclusivos cada vez que realices un cambio de divisas con SwaplyAr Plus Rewards™.
              </p>
              <ShortButton
                href="/es/programa-de-fidelizacion"
                text="Plus Rewards"
                fondoOscuro={true}
                className='w-full'
              />
            </div>
          </div>
          <div className="mx-8 md:mx-auto mt-11 mb-[50px] flex flex-col md:flex-row gap-20 md:gap-4 lg2:max-w-[989px] lg2:flex-row">
            {sectionBottomHelpCenter.map((item, i: number) => (
              <Link key={i} href={item.href} target="_blank" className="group flex flex-1 flex-col items-center gap-2">
                <Image
                  className="h-[250px] w-[320px] drop-shadow-light dark:drop-shadow-darkmode md:h-[347px] md:object-contain"
                  src={item.image}
                  alt={item.title}
                  width={320}
                  height={270}
                />
                <div className="flex flex-col items-center gap-2">
                  <h2
                    className={clsx(
                      'text-center font-textFont text-[28px] transition-all duration-300',
                      isDark ? 'group-hover:underline' : 'group-hover:text-buttonsLigth group-hover:underline',
                    )}
                  >
                    {item.title}
                  </h2>
                  <p className="font-textFont font-light">{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <FlyerTrabajo
        href="/es/registro"
        imageSrc={FlyerGif}
        description="Accede a más funciones y guardar tu historial de cambios"
        nameButton="Crear mi cuenta gratis"
      />
    </>
  );
};

export default HelpCenterPage;
