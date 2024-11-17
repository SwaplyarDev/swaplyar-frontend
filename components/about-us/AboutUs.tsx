// AboutUs.tsx
'use client';
import Image from 'next/image';
import CaedAboutUs from '../ui/caed-about-us/caed-about-us';
import FlyerTrabajo from '../FlyerTrabajo/FlyerTrabajo';
import Link from 'next/link';
import {
  Apoyo,
  Transparencia,
  Simplicidad,
  Eficiencia,
  OaSuarez,
  FlyerGif,
} from '@/utils/assets/imgDatabaseCloudinary';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import { useMargins } from '@/context/MarginProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import './about.css';

const cardsData = [
  {
    src: Apoyo,
    alt: 'Imagen de Apoyo',
    title: 'Apoyo',
    backTitle: 'Apoyo Personalizado',
    backText:
      'En SwaplyAr, ofrecemos un equipo siempre dispuesto a resolver tus dudas, acompañándote paso a paso en cada transacción.',
  },
  {
    src: Transparencia,
    alt: 'Imagen de Transparencia',
    title: 'Transparencia',
    backTitle: 'Transparencia Total',
    backText:
      'La claridad es clave en SwaplyAr. No hay letras pequeñas; cada término del servicio es claro y directo para todos.',
  },
  {
    src: Simplicidad,
    alt: 'Imagen de Simplicidad',
    title: 'Simplicidad',
    backTitle: 'Simplicidad en Cada Paso',
    backText:
      'Nuestra plataforma está diseñada para ser intuitiva y fácil de usar, garantizando que cada usuario realice sus transacciones sin complicaciones.',
  },
  {
    src: Eficiencia,
    alt: 'Imagen de Eficiencia',
    title: 'Eficiencia',
    backTitle: 'Eficiencia en Cada Transacción',
    backText: 'Garantizamos intercambios rápidos y precisos para que accedas a tus fondos sin demoras.',
  },
];

const AboutUs = () => {
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);
  const { isDark } = useDarkTheme();
  return (
    <>
      <div className="relative flex flex-col items-center justify-center py-10">
        <AnimatedBlurredCircles tope="top-[0px]" />
        <div
          className="flex w-full max-w-[1000px] flex-col items-center justify-center pt-5 text-black dark:text-white"
          style={{ margin: currentMargin }}
        >
          <div className="rs-wrapper-v4 mx-auto items-center justify-center text-center md:w-full">
            <div className="container-text pb-12 pt-10 text-xl sm:pb-24 sm:pt-20 sm:text-2xl lg:text-4xl">
            <h1 className="max-w-[1000px] text-center lg:text-4xl">Nuestra misión y valores</h1>
              
            </div>
          </div>

          <div className="rs-wrapper-v4 mx-auto mb-12 max-w-[1000px] text-center sm:mt-4 md:mt-8 md:w-full lg:mt-8">          
            <p className="mx-auto mt-4 text-lg sm:mt-6 sm:text-base md:mt-4 md:text-base lg:text-xl">
            SwaplyAr surgió de una necesidad fundamental: facilitar el intercambio de saldo y asegurar que cada usuario reciba exactamente lo acordado, brindando acompañamiento a lo largo de todo el proceso. Gracias a nuestra confiabilidad, seguridad y rapidez en cada transacción, el crecimiento de SwaplyAr ha sido exponencial.
            Nuestros valores son la base de todas nuestras acciones diarias y definen cómo operamos en cada interacción.
            </p>
          </div>

          <div className="rs-wrapper-v4 mx-auto mb-12 max-w-[1000px] text-center sm:mt-4 md:mt-8 md:w-full lg:mt-8">
            <h3 className="max-w-[1000px] text-center font-bold lg:text-2xl">Nuestros Valores</h3>
            <p className="mx-auto mt-4 text-lg sm:mt-6 sm:text-base md:mt-4 md:text-base lg:text-xl">
              Nos guiamos diariamente por nuestros valores fundamentales:
              Profesionalidad, Apoyo, Transparencia, Simplicidad y Eficiencia. Estos principios nos permiten trabajar unidos como un equipo global, con nuestros clientes en el centro de todas nuestras acciones. Además, nos impulsan a cuidar de nosotros mismos, de los demás y de las comunidades que nos rodean.
            </p>
          </div>

          <div className="w-full max-w-[1000px]">
            <CaedAboutUs cardsData={cardsData} />
          </div>

          <div className="rs-wrapper-v4 mx-auto mb-12 max-w-[1000px] text-center sm:mt-4 md:mt-8 md:w-full lg:mt-8">
            <p className="mx-auto mt-4 text-lg sm:mt-6 sm:text-base md:mt-4 md:text-base lg:text-xl">
              En SwaplyAR, garantizamos un intercambio seguro y confiable de tus fondos entre diversas billeteras virtuales y cuentas bancarias a nivel global. Nuestro compromiso es brindar seguridad y satisfacción en cada transacción, asegurando que tu dinero llegue a su destino de manera rápida y segura.
            </p>
          </div>

          <div className="mb-20 mt-20 w-full max-w-[1000px] sm:mb-36 sm:mt-40">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="col-right order-1 text-center text-lg text-black dark:text-white sm:text-left sm:text-xl md:order-2">
                <p className='italic'>
                "Nos Dedicamos a transformar la manera en que las personas manejan su dinero, utilizando las tecnologias mas avanzadas y sistemas de pago innovadores. Porque entendemos que detrás de cada transacción hay sueños, metas y necesidades, trabajamos incansablemente para brindar soluciones que ofrezcan tranquilidad, confianza y seguridad. Queremos que sientas que tu dinero está en las mejores manos, acompañándote en cada paso hacia lo que más valoras."
                </p>
              </div>

              <div className="col-left order-2 flex flex-col items-center md:order-1">
                <Image
                  src={OaSuarez}
                  alt="Chief Executive Officer (CEO)"
                  width={250}
                  height={200}
                  className="sm:h-[300px] sm:w-[350px]"
                />
                <div className="text-team mt-4 text-center text-black dark:text-white">
                  <h5 className="text-lg sm:text-2xl">Oa Johan Javier Suarez Merchan</h5>
                  <h5>Founder &amp; Chief Executive Officer (CEO)</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <FlyerTrabajo imageSrc={FlyerGif}>
          <span className="">
            <p>
              ¿Nuevo en SwaplyAr? <br /> Conoce cómo funciona nuestra plataforma y comienza a transferir dinero de forma
              sencilla y segura. Haz click y aprende cómo usar SwaplyAr{' '}
            </p>
          </span>
          <div>
            <button
              id="bannerHTUButton"
              className={`trasntition-transform ease group mt-6 rounded-full border-2 border-buttonsLigth bg-buttonsLigth px-4 py-2 text-lg duration-300 hover:border-selectBtsLight dark:border-darkText dark:bg-darkText dark:text-black ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              <Link
                href={'/info/how-to-use'}
                className={`ease font-bold text-darkText transition-colors duration-300 ${isDark ? 'dark:text-lightText' : 'text'}`}
              >
                <h3>Como usar Swaplyar</h3>
              </Link>
            </button>
          </div>
        </FlyerTrabajo>
      </div>
    </>
  );
};

export default AboutUs;
