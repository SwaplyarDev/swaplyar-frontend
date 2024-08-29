"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import CaedAboutUs from "../ui/caed-about-us/caed-about-us";
import FlyerTrabajo from "../FlyerTrabajo/FlyerTrabajo";
import { Apoyo, CentroDeAyuda, Eficiencia, FlyerGif, OaSuarez, Simplicidad, Transparencia } from "@/utils/assets/img-database";
import AnimatedBlurredCircles from "../ui/animations/AnimatedBlurredCircles";

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
    <div className="py-10">
      <div className="shadow-custom-blue" ref={bannerRef}>
        <FlyerTrabajo imageSrc="/images/need-help.png">
          Estamos trabajando en las funciones de inicio de sesión y registro.
        </FlyerTrabajo>
      </div>

      <div className="  text-black dark:text-white pt-5">
        <div className="rs-wrapper-v4  sm:w-11/12 mx-auto text-center">
          <div className="container-text text-xl sm:text-2xl lg:text-4xl pt-10 sm:pt-20 pb-12 sm:pb-24">
            <h1 className="max-w-[1000px] lg:text-4xl sm:w-[86%] text-left mx-auto">
              En SwaplyAr, garantizamos un intercambio seguro y confiable de tu
              dinero de PayPal. Estamos comprometidos con tu seguridad y
              satisfacción.
            </h1>
          </div>
          <AnimatedBlurredCircles topOffset={bannerHeight} />
        </div>

        <div className="rs-wrapper-v4 w-full max-w-[1000px] mx-auto lg:mt-8 mb-12 sm:mt-4 md:mt-8 text-justify">
          <h2 className="text-xl sm:text-4xl">Nuestra misión y valores</h2>
          <h5 className="text-lg md:text-base sm:text-base lg:text-xl mt-4 md:mt-4 sm:mt-6 mx-auto">
            SwaplyAr nació de una simple necesidad, intercambiar saldo y que cada
            persona que lo utiliza reciba lo pactado, acompañándolo en todo el
            proceso. Pronto su crecimiento fue exponencial debido a la
            confiabilidad, seguridad y velocidad en cada operación. Somos una
            empresa en la que las personas usuarias confían plenamente, ya que
            la importancia de ser transparente hacia ellos, es uno de nuestros
            pilares fundamentales. Ayudamos a que cada persona consiga, lo que
            está buscando de una manera fácil y protegida.
          </h5>
        </div>

        <div className="w-full max-w-[1000px] mx-auto">
          <CaedAboutUs cardsData={cardsData} />
        </div>

        <div className="w-full max-w-[1000px] mx-auto mt-20 sm:mt-40 mb-20 sm:mb-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="col-right text-lg sm:text-4xl text-black dark:text-white text-center sm:text-left order-1 md:order-2">
              <h2>
                &quot;Buscamos solucionar los problemas de las personas implementando las &uacute;ltimas tecnolog&iacute;as y sistemas de pago.&quot;
              </h2>
            </div>

            <div className="col-left flex flex-col items-center order-2 md:order-1">
              <Image
                src={OaSuarez}
                alt="Chief Executive Officer (CEO)"
                width={250} 
                height={200} 
                className="sm:w-[350px] sm:h-[300px]"  
              />
              <div className="text-team text-black dark:text-white mt-4 text-center">
                <h4 className="text-lg sm:text-2xl">
                  Oa Johan Javier Suarez Merchan
                </h4>
                <h5>Founder &amp; Chief Executive Officer (CEO)</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <FlyerTrabajo imageSrc={FlyerGif}>
          <span>
            &iquest;Nuevo en SwaplyAr? Hac&eacute; clic en &quot;C&oacute;mo usar SwaplyAr&quot; y aprend&eacute; a operar f&aacute;cilmente. &iexcl;Empez&aacute; ahora!
          </span>
          <div>
            <button id="bannerHTUButton">
           <a  href='/info/how-to-use'>Como usar Swaplyar</a>
            </button>
          </div>
        </FlyerTrabajo>
      </div>
    </div>
  );
};

export default AboutUs;
