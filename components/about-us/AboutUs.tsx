// /components/about-us/AboutUs.tsx

import Image from "next/image";
import CaedAboutUs from "../ui/caed-about-us/caed-about-us";
import FlyerTrabajo from "../FlyerTrabajo/FlyerTrabajo";

const cardsData = [
    {
        src: '/images/Apoyo.png',
        alt: 'Imagen de Apoyo',
        title: 'Apoyo',
        backTitle: 'Apoyo Personalizado',
        backText:
        'En SwaplyAr, ofrecemos un equipo siempre dispuesto a resolver tus dudas, acompañándote paso a paso en cada transacción.',
    },
    {
        src: '/images/Transparencia.png',
        alt: 'Imagen de Transparencia',
        title: 'Transparencia',
        backTitle: 'Transparencia Total',
        backText:
        'La claridad es clave en SwaplyAr. No hay letras pequeñas; cada término del servicio es claro y directo para todos.',
    },
    {
        src: '/images/Simplicidad.png',
        alt: 'Imagen de Simplicidad',
        title: 'Simplicidad',
        backTitle: 'Simplicidad en Cada Paso',
        backText:
        'Nuestra plataforma está diseñada para ser intuitiva y fácil de usar, garantizando que cada usuario realice sus transacciones sin complicaciones.',
    },
    {
        src: '/images/Eficiencia.png',
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
      <FlyerTrabajo
        imageSrc="/images/centro-ayuda.png"
      >
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>
      <div className="bg-white dark:bg-black text-black dark:text-white">
        <div className="need-help delante need-help-container rs-link"></div>
        <div id="animated-blurred-circles-container"></div>
        <div className="rs-wrapper-v4">
          <div className="container-text">
            <h1>
              En SwaplyAr, garantizamos un intercambio seguro y confiable de tu
              dinero de PayPal. Estamos comprometidos con tu seguridad y
              satisfacción.
            </h1>
          </div>
        </div>
        <div className="rs-wrapper-v4">
          <h2>Nuestra misión y valores</h2>
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
        <CaedAboutUs cardsData={cardsData} />
        <div className="default-space-between-components">
          <div className="rs-wrapper-v4 grid col1">
            <div className="info-content-container flex flex-col md:flex-row items-center">
              <div className="col-left bg-white dark:bg-black p-4 rounded-lg shadow-lg flex flex-col items-center md:items-start">
                <Image
                  src="/images/oa-suarez.png"
                  alt="Chief Executive Officer (CEO)"
                  width={350}
                  height={300}
                />
                <div className="text-team text-black dark:text-white mt-4">
                  <h4>Oa Johan Javier Suarez Merchan</h4>
                  <h5>Founder &amp; Chief Executive Officer (CEO)</h5>
                </div>
              </div>
              <div className="col-right text-black dark:text-white p-4 rounded-lg shadow-lg md:ml-8 mt-4 md:mt-0">
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
            imageSrc="/gif/flyer.gif"
          >
            &iquest;Nuevo en SwaplyAr? Hac&eacute; clic en &quot;C&oacute;mo usar SwaplyAr&quot; y aprend&eacute; a operar f&aacute;cilmente. &iexcl;Empez&aacute; ahora!
          </FlyerTrabajo>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
