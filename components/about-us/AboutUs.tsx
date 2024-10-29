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
    backText:
      'Garantizamos intercambios rápidos y precisos para que accedas a tus fondos sin demoras.',
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
              <h1 className="max-w-[1000px] text-left lg:text-4xl">
                En SwaplyAr, garantizamos un intercambio seguro y confiable de
                tu dinero de PayPal. Estamos comprometidos con tu seguridad y
                satisfacción.
              </h1>
            </div>
          </div>

          <div className="rs-wrapper-v4 mx-auto mb-12 max-w-[1000px] text-center sm:mt-4 md:mt-8 md:w-full lg:mt-8">
            <h2 className="text-2xl font-semibold">Nuestra misión y valores</h2>
            <h5 className="mx-auto mt-4 text-lg sm:mt-6 sm:text-base md:mt-4 md:text-base lg:text-xl">
              SwaplyAr nació de una simple necesidad, intercambiar saldo y que
              cada persona que lo utiliza reciba lo pactado, acompañándolo en
              todo el proceso. Pronto su crecimiento fue exponencial debido a la
              confiabilidad, seguridad y velocidad en cada operación.
            </h5>
          </div>

          <div className="w-full max-w-[1000px]">
            <CaedAboutUs cardsData={cardsData} />
          </div>

          <div className="mb-20 mt-20 w-full max-w-[1000px] sm:mb-36 sm:mt-40">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="col-right order-1 text-center text-lg text-black dark:text-white sm:text-left sm:text-4xl md:order-2">
                <h2>
                  &quot;Buscamos solucionar los problemas de las personas
                  implementando las &uacute;ltimas tecnolog&iacute;as y sistemas
                  de pago.&quot;
                </h2>
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
                  <h4 className="text-lg sm:text-2xl">
                    Oa Johan Javier Suarez Merchan
                  </h4>
                  <h5>Founder &amp; Chief Executive Officer (CEO)</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <FlyerTrabajo imageSrc={FlyerGif}>
          <span>
            &iquest;Nuevo en SwaplyAr? Hac&eacute; clic en &quot;C&oacute;mo
            usar SwaplyAr&quot; y aprend&eacute; a operar f&aacute;cilmente.
            &iexcl;Empez&aacute; ahora!
          </span>
<<<<<<< HEAD
          <div>
            <button
              id="bannerHTUButton"
              className={`trasntition-transform ease group mt-6 rounded-full border-2 border-buttonsLigth bg-buttonsLigth px-4 py-2 text-lg duration-300 hover:border-selectBtsLight dark:border-darkText dark:bg-darkText dark:text-black ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              <Link
                href={'/info/how-to-use'}
                className={`ease font-bold text-darkText transition-colors duration-300 ${isDark ? 'dark:text-lightText' : 'text'}`}
              >
                Como usar Swaplyar
              </Link>
            </button>
          </div>
=======
          <Link
            href={'/info/how-to-use'}
            onClick={() => {}}
            className="relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white dark:border-darkText dark:bg-darkText dark:text-lightText"
          >
            <p className="font-bold">Como usar Swaplyar</p>
          </Link>
>>>>>>> 688373d1f0f89f52895f188190f0858f65f128d9
        </FlyerTrabajo>
      </div>
    </>
  );
};

export default AboutUs;
