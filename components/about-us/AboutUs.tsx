// /components/about-us/AboutUs.tsx

import Image from 'next/image';
import CaedAboutUs from '../ui/caed-about-us/caed-about-us';
import FlyerTrabajo from '../FlyerTrabajo/FlyerTrabajo';
import {
  Apoyo,
  CentroDeAyuda,
  Eficiencia,
  FlyerGif,
  OaSuarez,
  Simplicidad,
  Transparencia,
} from '@/utils/assets/img-database';

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
    <main className="py-10 w-full text-pretty">
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>
      
      <div className=" w-[80%] max-w-screen-2xl mx-auto flex flex-col justify-center gap-y-12">

        {/* <div className="need-help delante need-help-container rs-link"></div> */}
        {/* <div id="animated-blurred-circles-container"></div> */}
        <section className="rs-wrapper-v4">
          <article className="container-text pb-5">
            <h1 className='text-2xl lg:text-4xl text-center text-balance font-extrabold'>
              En SwaplyAr, garantizamos un intercambio seguro y confiable de tu
              dinero de PayPal. Estamos comprometidos con tu seguridad y
              satisfacción.
            </h1>
          </article>
        </section>

        <article className="rs-wrapper-v4">
          <h2 className=' font-bold text-lg pb-2'>Nuestra misión y valores</h2>
          <h5 className=' text-pretty'>
            SwaplyAr nació de una simple necesidad, intercambiar saldo y que
            cada persona que lo utiliza reciba lo pactado, acompañándolo en todo
            el proceso. Pronto su crecimiento fue exponencial debido a la
            confiabilidad, seguridad y velocidad en cada operación. Somos una
            empresa en la que las personas usuarias confían plenamente, ya que
            la importancia de ser transparente hacia ellos, es uno de nuestros
            pilares fundamentales. Ayudamos a que cada persona consiga, lo que
            está buscando de una manera fácil y protegida.
          </h5>
        </article>

        <CaedAboutUs cardsData={cardsData} />

        <section className="text-center text-balance pb-5">
          {/* <span className="rs-wrapper-v4 col1 grid"> */}
            <span className="info-content-container flex flex-col items-center justify-center md:flex-row">
              <section className="col-left flex flex-col items-center rounded-lg ">
                <Image
                  src={OaSuarez}
                  alt="Chief Executive Officer (CEO)"
                  width={350}
                  height={300}
                />
                <article className="text-team  mt-4 ">
                  <h4>Oa Johan Javier Suarez Merchan</h4>
                  <h5>Founder &amp; Chief Executive Officer (CEO)</h5>
                </article>
              </section>

                <h2 className="col-right text-lg font-semibold rounded-lg w-[50%]">
                  &quot;Buscamos solucionar los problemas de las personas
                  implementando las &uacute;ltimas tecnolog&iacute;as y sistemas
                  de pago.&quot;
                </h2>

            </span>
          {/* </span> */}
        </section>

      </div>
        <section className="mt-10">
          <FlyerTrabajo imageSrc={FlyerGif}>
            &iquest;Nuevo en SwaplyAr? Hac&eacute; clic en &quot;C&oacute;mo
            usar SwaplyAr&quot; y aprend&eacute; a operar f&aacute;cilmente.
            &iexcl;Empez&aacute; ahora!
          </FlyerTrabajo>
        </section>


    </main>
  );
};

export default AboutUs;
