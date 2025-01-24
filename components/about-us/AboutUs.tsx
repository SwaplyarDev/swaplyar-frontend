// AboutUs.tsx
'use client';
import Image from 'next/image';
import CaedAboutUs from '../ui/caed-about-us/caed-about-us';
import FlyerTrabajo from '../FlyerTrabajo/FlyerTrabajo';
import Link from 'next/link';
import { Apoyo, Transparencia, Simplicidad, Eficiencia, FlyerGif } from '@/utils/assets/imgDatabaseCloudinary';
import { Apoyo, Transparencia, Simplicidad, Eficiencia, FlyerGif } from '@/utils/assets/imgDatabaseCloudinary';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
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

const sectionsData = [
  {
    title: 'Nuestra Misión: Ofrecerte Soluciones Financieras',
    description:
      'Nuestra misión es facilitar transacciones financieras digitales e internacionales seguras y accesibles para personas y empresas en todo el mundo. SwaplyAr nació de la necesidad de facilitar el intercambio de saldo y asegurar que cada usuario reciba exactamente lo acordado, brindando acompañamiento a lo largo de todo el proceso.',
  },
  {
    title: 'Nuestra Visión: Transformar Tus Finanzas Digitales',
    description:
      'Queremos ser la plataforma líder en servicios financieros digitales, reconocida globalmente por nuestrainnovación, confianza y compromiso con cada cliente. Nuestro objetivo es expandir nuestra presencia internacional, creando una comunidad global que transforma juntos la manera de gestionar las finanzas.',
    secondaryDescription:
      'A través de tecnología de vanguardia y un enfoque centrado en el cliente, trabajamos para garantizar transacciones seguras, rápidas y transparentes. Nos adaptamos a un mundo en constante evolución, ayudando a transformar la manera en que gestionas tus finanzas digitales.',
  },
  {
    title: 'Nuestros Valores: Una Extensión de Tu Confianza',
    description:
      'Nos guiamos diariamente por nuestros valores fundamentales: Profesionalidad, Apoyo, Transparencia, Simplicidad y Eficiencia. Estos principios nos permiten trabajar unidos como un equipo global, con nuestros clientes en el centro de todas nuestras acciones. Además, nos impulsan a cuidar de nosotros mismos, de los demás y de las comunidades que nos rodean.',
  },
];

const AboutUs = () => {
  const { isDark } = useDarkTheme();

  return (
    <>
      <div className="relative mx-4 flex flex-col items-center justify-center sm:mx-6 md:mx-8">
        <AnimatedBlurredCircles tope="top-[0px]" />
        <div className="flex w-full max-w-[1000px] flex-col items-center justify-center pt-5 text-lightText dark:text-white">
          <section className="md:max-w-[80%]">
            <h1 className="text-center text-[38px] font-bold lg:text-left lg:text-4xl">
              Nuestra Historia, Misión, Visión y Valores
            </h1>

            <section className="rs-wrapper-v4 mb-12 max-w-[1000px] text-left sm:mt-4 md:mt-8 md:w-full lg:mt-8">
              <p className="mt-4 sm:mt-6 sm:text-base md:mt-4 md:text-base lg:text-xl">
                En SwaplyAr, transformamos la forma en que las personas y empresas realizan transacciones
                internacionales, garantizando un intercambio seguro y confiable entre las principales billeteras
                virtuales y cuentas bancarias a nivel global. Nuestro enfoque en la seguridad, rapidez y transparencia
                nos permite ofrecer soluciones financieras innovadoras que se adaptan a tus necesidades.
              </p>
              <p className="mt-4 sm:mt-6 sm:text-base md:mt-4 md:text-base lg:text-xl">
                Desde nuestros inicios, SwaplyAr nació con la visión de simplificar las transferencias internacionales
                para todos: empresas, personas y familias. Nos dedicamos a proporcionar servicios rápidos, seguros y
                accesibles, siempre enfocados en garantizar la mejor experiencia para cada cliente.
              </p>
            </section>
          </section>

          <div className="w-full max-w-[1000px]">
            <CaedAboutUs cardsData={cardsData} />
          </div>

          <section className="flex flex-col gap-10 pt-10 text-lightText">
            {sectionsData.map((section, i) => (
              <article key={i}>
                <h2 className="text-4xl font-bold">{section.title}</h2>
                <p>{section.description}</p>
                {section.secondaryDescription && <p className="pt-5">{section.secondaryDescription}</p>}
              </article>
            ))}
          </section>

          <section className="my-10 flex w-full max-w-[1000px] justify-center">
            <section className="grid w-[90%] grid-cols-1 items-center justify-center gap-8 md:grid-cols-2">
              <article className="col-right order-1 text-left text-lg font-bold text-lightText dark:text-white sm:text-left sm:text-xl md:order-2">
                <p>
                  "Nos Dedicamos a transformar la manera en que las personas manejan su dinero, utilizando las
                  tecnologias mas avanzadas y sistemas de pago innovadores. Porque entendemos que detrás de cada
                  transacción hay sueños, metas y necesidades, trabajamos incansablemente para brindar soluciones que
                  ofrezcan tranquilidad, confianza y seguridad. Queremos que sientas que tu dinero está en las mejores
                  manos, acompañándote en cada paso hacia lo que más valoras."
                </p>
              </article>

              <article className="col-left order-2 flex flex-col items-center md:order-1">
                <Image src="/images/CEO&CPO.png" alt="Chief Executive Officer (CEO)" width={286} height={286} />
                <div className="text-team mt-4 text-center text-lightText dark:text-white">
                  <h5 className="text-[28px] font-semibold sm:text-2xl">Oa Johan Javier Suarez Merchan</h5>
                  <h5 className="text-xl">Founder &amp; Chief Executive Officer (CEO)</h5>
                </div>
              </article>
            </section>
          </section>
        </div>
      </div>
      <section className="mt-10 text-center">
        <FlyerTrabajo imageSrc={FlyerGif}>
          <span className="flex flex-col gap-2">
            <p className="font-textFont text-[21px] font-extrabold">¿Nuevo en SwaplyAr?</p>
            <p className="font-textFont text-[21px] font-extrabold">
              Conoce cómo funciona nuestra plataforma y comienza a transferir <br /> dinero de forma sencilla y segura.
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
                <h3 className="font-titleFont font-semibold">¡Empieza ahora!</h3>
              </Link>
            </button>
          </div>
        </FlyerTrabajo>
      </section>
    </>
  );
};

export default AboutUs;
