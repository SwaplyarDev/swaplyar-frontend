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
    <div className="py-10  ">
      <div className="shadow-custom-blue bg-white">
      <FlyerTrabajo
        imageSrc="/images/need-help.png"
      >
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>
      </div>

      <div className="bg-white dark:bg-black text-black dark:text-white pt-5 ">
        {/* <div className="need-help delante need-help-container rs-link"></div> */}
        {/* <div id="animated-blurred-circles-container"></div> */}
        <div className="rs-wrapper-v4 sm:w-4/5 mx-auto ">
          <div className="container-text text-4xl  pt-20 pb-24">
            <h1 >En SwaplyAr, garantizamos un intercambio seguro y confiable de tu
              dinero de PayPal. Estamos comprometidos con tu seguridad y
              satisfacción.
            </h1>
          </div>
        </div>
        <div className="rs-wrapper-v4 sm:w-4/5 mx-auto mt-8 mb-12  ">
          <h2 className="text-3xl" >Nuestra misión y valores</h2>
          <h5>
            SwaplyAr nació de una simple necesidad, intercambiar saldo y que cada
            persona que lo utiliza reciba lo pactado, acompañándolo en todo el
            proceso. Pronto su crecimiento fue exponencial debido a la
            confiabilidad, seguridad y velocidad en cada operación. Somos una
            empresa en la que las personas usuarias confían plenamente, ya que la
            importancia de ser transparente hacia ellos, es uno de nuestros
            pilares fundamentales. Ayudamos a que cada persona consiga, lo que
            está buscando de una manera fácil y protegida.
          </h5>
        </div>
       <div className="sm:w-4/5 mx-auto">
       <CaedAboutUs cardsData={cardsData} />
       </div>
        <div className="default-space-evenly-components sm:w-9/12 mx-auto mt-40 mb-36">
          <div className="rs-wrapper-v4 grid col1">
            <div className="info-content-container w-full flex flex-col md:flex-row items-center">
              <div className="col-left  w-1/2 dark:bg-black flex flex-col items-center ">
                <Image
                  src={OaSuarez}
                  alt="Chief Executive Officer (CEO)"
                  width={350}
                  height={300}
                />
                <div className="text-team text-black dark:text-white  mt-4">
                  <h4 className="text-2xl" >Oa Johan Javier Suarez Merchan</h4>
                  <h5>Founder &amp; Chief Executive Officer (CEO)</h5>
                </div>
              </div>
              <div className="col-right w-1/2 text-4xl text-black dark:text-white md:ml-8 mt-4 md:mt-0">
                <h2>
                  &quot;Buscamos solucionar los problemas de las personas
                  implementando las &uacute;ltimas tecnolog&iacute;as y sistemas de pago.&quot;
                </h2>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-10">
          <FlyerTrabajo
            imageSrc={FlyerGif}
          >
            &iquest;Nuevo en SwaplyAr? Hac&eacute; clic en &quot;C&oacute;mo usar SwaplyAr&quot; y aprend&eacute; a operar f&aacute;cilmente. &iexcl;Empez&aacute; ahora!
          </FlyerTrabajo>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
