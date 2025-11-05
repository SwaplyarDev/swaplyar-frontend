// AboutUs.tsx
'use client';
import Image from 'next/image';
import CaedAboutUs from '../ui/cards/caed-about-us/caed-about-us';
import FlyerTrabajo from '../FlyerTrabajo/FlyerTrabajo';
import Link from 'next/link';
import {
  Apoyo,
  Transparencia,
  Simplicidad,
  Eficiencia,
  FlyerGif,
  swaplyArCEO,
} from '@/utils/assets/imgDatabaseCloudinary';
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
      <div className="relative top-[54px] mx-4 flex flex-col items-center justify-center md:mx-[43.5px] md:max-w-[681px] md:w-full lg:mx-4 lg:max-w-[1000px]">
        <AnimatedBlurredCircles tope="top-[0px]" />
        <div className="flex w-full max-w-[358px] md:max-w-[681px] lg:max-w-[1000px] flex-col items-center justify-center text-lightText dark:text-darkText">
          <section className="max-w-[358px] md:max-w-[681px] lg:max-w-[1000px]">
            <h1 className="mt-6 text-center font-titleFont text-[38px] font-medium lg2:mt-20 lg2:text-left lg2:text-[40px]">
              Nuestra Historia, Misión, Visión y Valores
            </h1>

            <section className="rs-wrapper-v4 max-w-[358px] md:max-w-[681px] lg:max-w-[1000px] text-left font-textFont font-light sm:mt-4 md:mt-8 md:w-full lg2:mt-10">
              <p className="mt-6 md:mt-7 md:text-base lg:text-xl">
                En SwaplyAr, transformamos la forma en que las personas y empresas realizan transacciones
                internacionales, garantizando un intercambio seguro y confiable entre las principales billeteras
                virtuales y cuentas bancarias a nivel global. Nuestro enfoque en la seguridad, rapidez y transparencia
                nos permite ofrecer soluciones financieras innovadoras que se adaptan a tus necesidades.
              </p>
              <p className="mt-6 md:mt-7 md:text-base lg:text-xl">
                Desde nuestros inicios, SwaplyAr nació con la visión de simplificar las transferencias internacionales
                para todos: empresas, personas y familias. Nos dedicamos a proporcionar servicios rápidos, seguros y
                accesibles, siempre enfocados en garantizar la mejor experiencia para cada cliente.
              </p>
            </section>
          </section>

          <div className="mt-6 w-full max-w-[358px] md:max-w-[681px] lg:max-w-[1000px] lg2:mt-10">
            <CaedAboutUs cardsData={cardsData} />
          </div>

          <section className="mt-6 flex flex-col gap-6 text-lightText dark:text-darkText lg2:mt-10 lg2:gap-10">
            {sectionsData.map((section, i) => (
              <article key={i}>
                <h2 className="font-textFont text-4xl">{section.title}</h2>
                <p className="font-textFont font-light">{section.description}</p>
                {section.secondaryDescription && (
                  <p className="mt-6 font-textFont font-light">{section.secondaryDescription}</p>
                )}
              </article>
            ))}
          </section>

          <section className="flex w-full max-w-[358px] md:max-w-[681px] lg:max-w-[1000px] justify-center">
            <section className="mt-10 grid w-[90%] grid-cols-1 items-center justify-center gap-6 md:w-full md:grid-cols-2">
              <article className="col-right order-2 text-left font-textFont text-lg text-lightText dark:text-darkText md:order-2">
                <p>
                  "Nos Dedicamos a transformar la manera en que las personas manejan su dinero, utilizando las
                  tecnologias mas avanzadas y sistemas de pago innovadores. Porque entendemos que detrás de cada
                  transacción hay sueños, metas y necesidades, trabajamos incansablemente para brindar soluciones que
                  ofrezcan tranquilidad, confianza y seguridad. Queremos que sientas que tu dinero está en las mejores
                  manos, acompañándote en cada paso hacia lo que más valoras."
                </p>
              </article>

              <article className="col-left order-1 flex flex-col items-center md:order-1">
                <Image src={swaplyArCEO} alt="Chief Executive Officer (CEO)" width={286} height={286} />
                <div className="text-team mt-4 text-center font-textFont text-lightText dark:text-darkText">
                  <h5 className="text-[28px]">Oa Johan Javier Suarez Merchan</h5>
                  <h5 className="text-xl font-light">Founder &amp; Chief Executive Officer (CEO)</h5>
                </div>
              </article>
            </section>
          </section>
        </div>
      </div>
      <section className="mt-[87px] md:mt-[37px] lg:mt-[87px] overflow-hidden text-center">
        <FlyerTrabajo
          imageSrc={FlyerGif}
          href="/es/como-usar-swaplyar"
          description="Hacemos que tus envíos sean más simples. Te explicamos cómo hacer una transferencia en 3 simples pasos"
          nameButton="Quiero aprender a transferir"
        />
      </section>
    </>
  );
};

export default AboutUs;
