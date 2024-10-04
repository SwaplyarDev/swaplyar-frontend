'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import RewardCard from '@/components/ui/reward-card/RewardCard';
import useStore from '@/store/authViewStore';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';

import {
  CentroDeAyuda,
  Rewards1,
  Rewards2,
  Rewards3,
} from '@/utils/assets/imgDatabaseCloudinary';

function LoyaltyProgram() {
  const { setView } = useStore();
  const handleChange = () => {
    setView('register');
    window.location.href = '/auth/login-register';
  };

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
    <div className=" relative py-10">
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>
      <AnimatedBlurredCircles topOffset={bannerHeight} tope={'top-[220px]'} />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">
          SwaplyAr Plus Rewards™ premia tu fidelidad
        </h1>
        <div className="mt-4">
          <button
            id="submit-25456"
            className="rounded bg-blue-600 px-4 py-2 text-darkText"
            onClick={() => handleChange()}
          >
            ¡Únete ya!
          </button>
        </div>
      </div>

      <div className="py-10">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Obtén beneficios exclusivos cada vez que realices intercambio de
            divisa con SwaplyAr Plus Rewards.
          </h2>
          <p className="">
            ¿No estás inscrito todavía?&nbsp;
            <Link className="text-blue-800" href="/">
              Crea
            </Link>
            &nbsp;un perfil SwaplyAr o&nbsp;
            <Link className="text-blue-800" href="/">
              inicia
            </Link>
            &nbsp;sesión en tu perfil, y haz clic en &quot;inscríbite&quot; para
            unirte.&nbsp;
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center py-10">
        {' '}
        checkout
        <RewardCard
          imageSrc={Rewards1}
          imageAlt="paso 1 de como cambiar tu dinero en SwaplyAr"
          title="Regalo de Bienvenida"
          description="Únete a SwaplyAr Plus Rewards™ y recibe 10 pesos por cada dólar en el cargo de tu segunda solicitud"
          linkText="solicitud"
          linkHref="/"
        />
        <RewardCard
          imageSrc={Rewards2}
          imageAlt="paso 2 de como cambiar tu dinero en SwaplyAr"
          title="Los premios nunca terminan"
          description="Recompensas Continuas: Gana 15 pesos por cada dólar en el cargo después de completar 5 solicitudes"
          linkText="solicitudes"
          linkHref="/"
        />
        <RewardCard
          imageSrc={Rewards3}
          imageAlt="paso 3 de como cambiar tu dinero en SwaplyAr"
          title="Exclusivo"
          description="¡Promociones exclusivas y acceso a ofertas únicas!"
          linkText=""
          linkHref=""
        />
      </div>

      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        <div>
          <p>
            Para conocer los Términos y Condiciones del programa MoneyGram Plus
            Rewards, haz
            <Link
              className="text-blue-800"
              href="/SAPR-Terms-Conditions-ES.pdf"
              target="_blank"
            >
              {' '}
              clic aquí
            </Link>
            .
          </p>
          <p>
            <a className="text-blue-800" href="/info/help-center">
              ¿Necesitas ayuda?
            </a>
          </p>
        </div>
      </FlyerTrabajo>
    </div>
  );
}

export default LoyaltyProgram;
