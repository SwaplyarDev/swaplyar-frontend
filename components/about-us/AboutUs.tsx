// /components/about-us/AboutUs.tsx

import Image from "next/image";
import CaedAboutUs from "../ui/caed-about-us/caed-about-us";
import FlyerTrabajo from "../FlyerTrabajo/FlyerTrabajo";
import { Apoyo, CentroDeAyuda, Eficiencia, FlyerGif, OaSuarez, Simplicidad, Transparencia } from "@/utils/assets/img-database";

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
  return (
<div className="py-10">
  <div className="shadow-custom-blue bg-white">
    <FlyerTrabajo imageSrc="/images/need-help.png">
      Estamos trabajando en las funciones de inicio de sesión y registro.
    </FlyerTrabajo>
  </div>

  <div className="bg-white dark:bg-black text-black dark:text-white pt-5">
    <div className="rs-wrapper-v4 w-11/12 mx-auto text-center">
      <div className="container-text text-xl sm:text-2xl lg:text-4xl pt-10 sm:pt-20 pb-12 sm:pb-24">
        <h1>
          En SwaplyAr, garantizamos un intercambio seguro y confiable de tu
          dinero de PayPal. Estamos comprometidos con tu seguridad y
          satisfacción.
        </h1>
      </div>
    </div>

    <div className="rs-wrapper-v4 w-11/12 mx-auto mt-8 mb-12 text-center">
      <h2 className="text-xl sm:text-3xl">Nuestra misión y valores</h2>
      <h5 className="text-sm sm:text-base mt-4">
        SwaplyAr nació de una simple necesidad, intercambiar saldo y que cada
        persona que lo utiliza reciba lo pactado...
      </h5>
    </div>

    <div className="w-11/12 mx-auto">
      <CaedAboutUs cardsData={cardsData} />
    </div>

    <div className="w-11/12 mx-auto mt-20 sm:mt-40 mb-20 sm:mb-36">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="col-left dark:bg-black flex flex-col items-center">
          <Image
            src={OaSuarez}
            alt="Chief Executive Officer (CEO)"
            width={350}
            height={300}
          />
          <div className="text-team text-black dark:text-white mt-4 text-center">
            <h4 className="text-lg sm:text-2xl">
              Oa Johan Javier Suarez Merchan
            </h4>
            <h5>Founder &amp; Chief Executive Officer (CEO)</h5>
          </div>
        </div>
        <div className="col-right text-base sm:text-4xl text-black dark:text-white mt-4 md:mt-0 sm:mt-0  text-center">
          <h2>
            &quot;Buscamos solucionar los problemas de las personas implementando las &uacute;ltimas tecnolog&iacute;as y sistemas de pago.&quot;
          </h2>
        </div>
      </div>
    </div>

    <div className="mt-10 text-center">
      <FlyerTrabajo imageSrc={FlyerGif} >
        &iquest;Nuevo en SwaplyAr? Hac&eacute; clic en &quot;C&oacute;mo usar SwaplyAr&quot; y aprend&eacute; a operar f&aacute;cilmente. &iexcl;Empez&aacute; ahora!
      </FlyerTrabajo>
    </div>
  </div>
</div>


  );
};

export default AboutUs;
