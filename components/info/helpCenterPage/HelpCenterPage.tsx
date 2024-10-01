'use client';
import { useState, useEffect, useRef } from 'react';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import ContactForm from '@/components/ui/contact-form/ContactForm';
import {
  Ayuda1,
  Ayuda2,
  CentroDeAyuda,
  Contacto,
  PlusRewardsGif,
} from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';

const HelpCenterPage = () => {
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
    <main className="flex w-full flex-col gap-20 py-10 relative" ref={bannerRef}>
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>
      <AnimatedBlurredCircles topOffset={bannerHeight} tope='top-[-360px]'/>
      <div className="m-auto grid w-[90%] max-w-screen-lg items-center justify-center gap-12">
        <section className="rs-wrapper-v4 p-4">
          <h1 className="text-3xl font-bold">
            Bienvenido al Centro de Ayuda de SwaplyAr
          </h1>
          <h3 className="text-xl">
            Comunicate con nosotros y responderemos cualquier consulta que
            tengas
          </h3>
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <span>
            <ContactForm />
          </span>

          <span className="flex items-center justify-center">
            <Image src={Contacto} alt="Contáctanos" width={400} height={300} />
          </span>
        </section>

        <section className="rs-wrapper-v4 grid grid-cols-1 gap-8 md:grid-cols-2">
          <span className="flex items-center justify-center">
            <Image
              src={PlusRewardsGif}
              alt="SwaplyAr Plus Rewards™"
              width={400}
              height={300}
            />
          </span>
          <span className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold">
              SwaplyAr Plus Rewards™ premia tu fidelidad, con el programa de
              fidelización
            </h2>
            <h5 className="mt-4 text-lg">
              Obtené beneficios exclusivos cada vez que realices un cambio de
              divisas con SwaplyAr Plus Rewards™.
            </h5>
            <button
              onClick={() =>
                (window.location.href = 'programa-de-fidelizacion')
              }
              className="mt-4 rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
            >
              Plus Rewards™
            </button>
          </span>
        </section>

        <section className="rs-wrapper-v4 grid grid-cols-1 gap-8 md:grid-cols-2">
          <span className="card-rawe rounded bg-gray-200 p-4 dark:bg-gray-800">
            <Image
              src={Ayuda1}
              alt="paso 1 de como cambiar tu dinero en SwaplyAr"
              width={210}
              height={150}
            />
            <h3 className="text-xl font-bold">Chateá con nosotros</h3>
            <p className="text-lg">
              Comunicate con nuestro representante de Atención al Cliente para
              recibir ayuda.
              <br />
              <Link
                href="https://wa.me/+5491123832198"
                target="_blank"
                className="text-blue-600"
              >
                WhatsApp
              </Link>
              .
            </p>
          </span>
          <span className="card-rawe rounded bg-gray-200 p-4 dark:bg-gray-800">
            <Image
              src={Ayuda2}
              alt="paso 2 de como cambiar tu dinero en SwaplyAr"
              width={210}
              height={150}
            />
            <h3 className="text-xl font-bold">Otro motivo...</h3>
            <p className="text-lg">
              Si necesitás contactarnos por otro motivo, simplemente envianos un
              email y atenderemos tu solicitud.
              <br />
              <Link
                href="mailto:centrodeayuda@swaplyar.com"
                target="_blank"
                className="text-blue-600"
              >
                Email
              </Link>
              .
            </p>
          </span>
        </section>
      </div>

      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        <></>
      </FlyerTrabajo>
    </main>
  );
};

export default HelpCenterPage;
