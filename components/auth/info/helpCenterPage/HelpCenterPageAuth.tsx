'use client';
import ContactForm from '@/components/ui/contact-form/ContactForm';
import Image from 'next/image';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Link from 'next/link';
import { sectionBottomHelpCenter, sectionLinksHelpCenter } from '@/data/sectionHelpCenter';
import clsx from 'clsx';

const HelpCenterPageAuth = () => {
  const { isDark } = useDarkTheme();

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-20 px-4 py-10 md:px-8 lg:px-4">
      <AnimatedBlurredCircles tope="top-[-260px]" />
      <div>
        <div className="mx-auto max-w-[490px] lg2:max-w-[1204px]">
          <h1 className="mx-auto max-w-[592px] text-center font-titleFont text-[38px] font-medium lg2:text-[40px]">
            Bienvenido al Centro de Ayuda de SwaplyAr
          </h1>
          <div className="mt-10 flex flex-col gap-[31px] lg2:flex-row lg2:px-4">
            {sectionLinksHelpCenter.map((item, i: number) => (
              <Link
                key={i}
                href={item.hrefAuth}
                className="group relative flex flex-1 flex-col items-center lg2:after:absolute lg2:after:-right-4 lg2:after:h-full lg2:after:w-[1px] lg2:after:bg-buttonsLigth lg2:after:content-[''] lg2:after:last:hidden lg2:after:dark:bg-darkText"
              >
                <div className="overflow-hidden max-h-[180px] w-[200px]">
                  <Image
                    className="w-full object-cover object-top drop-shadow-light dark:drop-shadow-darkmode mb-8"
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
                <p className="text-center font-textFont font-light">{item.text}</p>
              </Link>
            ))}
          </div>
          <div className="mt-20 flex flex-col text-center font-textFont lg2:flex-row lg2:items-center lg2:justify-center lg2:gap-4">
            <p className="font-light">¿Sospechas que eres víctima de un fraude?</p>
            <Link
              href="/es/auth/centro-de-ayuda/prevencion-y-fraude"
              className="block text-[28px] text-buttonsLigth underline dark:text-darkText"
            >
              obtén información aquí
            </Link>
          </div>
        </div>
        <section className="mx-auto mt-20 flex max-w-[996px] flex-col items-center">
          <ContactForm />
        </section>
        <div className="mx-auto mt-10 flex max-w-[490px] flex-col gap-10 lg2:max-w-[989px] lg2:flex-row">
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
  );
};

export default HelpCenterPageAuth;
