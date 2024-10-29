'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import RewardCard from '@/components/ui/reward-card/RewardCard';
import useStore from '@/store/authViewStore';
import Link from 'next/link';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';

import {
  CentroDeAyuda,
  Rewards1,
  Rewards2,
  Rewards3,
} from '@/utils/assets/imgDatabaseCloudinary';
import {
  Rewards1Dark,
  Rewards2Dark,
  Rewards3Dark,
} from '@/utils/assets/img-database';
import { useMargins } from '@/context/MarginProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

function LoyaltyProgram() {
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);

  const { setView } = useStore();
  const handleChange = () => {
    setView('register');
    window.location.href = '/auth/login-register';
  };

  const { isDark } = useDarkTheme();

  return (
    <div className="relative py-20">
      <AnimatedBlurredCircles tope={'top-[20px]'} />
      <div>
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">
            SwaplyAr Plus Rewards™ premia tu fidelidad
          </h1>
          <div className="mt-4">
            <button
              id="submit-25456"
              className={`dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
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
              <Link className="text-buttonsLigth dark:text-sky-500" href="/">
                Crea
              </Link>
              &nbsp;un perfil SwaplyAr o&nbsp;
              <Link className="text-buttonsLigth dark:text-sky-500" href="/">
                inicia
              </Link>
              &nbsp;sesión en tu perfil, y hacé clic en &quot;inscríbite&quot;
              para unirte.&nbsp;
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center py-10">
          <RewardCard
            imageSrc={isDark ? Rewards1Dark : Rewards1}
            imageAlt="paso 1 de como cambiar tu dinero en SwaplyAr"
            title="Regalo de Bienvenida"
            description="Únete a SwaplyAr Plus Rewards™ y recibe 10 pesos por cada dólar en el cargo de tu segunda solicitud"
            linkText="solicitud"
            linkHref="/"
          />
          <RewardCard
            imageSrc={isDark ? Rewards2Dark : Rewards2}
            imageAlt="paso 2 de como cambiar tu dinero en SwaplyAr"
            title="Los premios nunca terminan"
            description="Recompensas Continuas: Gana 15 pesos por cada dólar en el cargo después de completar 5 solicitudes"
            linkText="solicitudes"
            linkHref="/"
          />
          <RewardCard
            imageSrc={isDark ? Rewards3Dark : Rewards3}
            imageAlt="paso 3 de como cambiar tu dinero en SwaplyAr"
            title="Exclusivo"
            description="¡Promociones exclusivas y acceso a ofertas únicas!"
            linkText=""
            linkHref=""
          />
        </div>
      </div>

      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        <div>
          <p>
            Para conocer los Términos y Condiciones del programa SwaplyAr Plus
            Rewards, hacé
            <Link
              className="text-blue-800"
              href="/SAPR-Terms-Conditions-ES.pdf"
              target="_blank"
            >
              {' '}
            </Link>
            <Link
              href="https://swaplyar.com/SAPR-Terms-Conditions-ES%20.pdf"
              target="_blank"
              className={`relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-1 font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              clic aquí
            </Link>
            .
          </p>
          <div>
            <button
              id="bannerHTUButton"
              className={`trasntition-transform ease group mt-6 rounded-full border-2 border-buttonsLigth bg-buttonsLigth px-4 py-2 text-lg duration-300 hover:border-selectBtsLight dark:border-darkText dark:bg-darkText dark:text-black ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              <Link
                href={'/info/how-to-use'}
                className={`ease font-bold text-darkText transition-colors duration-300 ${isDark ? 'dark:text-lightText' : 'text'} `}
              >
                ¿Necesitás ayuda?
              </Link>
            </button>
          </div>
        </div>
      </FlyerTrabajo>
    </div>
  );
}

export default LoyaltyProgram;
