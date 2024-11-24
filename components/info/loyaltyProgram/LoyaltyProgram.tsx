'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import RewardCard from '@/components/ui/reward-card/RewardCard';
import useStore from '@/store/authViewStore';
import Link from 'next/link';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import { CentroDeAyuda, Rewards1, Rewards2, Rewards3 } from '@/utils/assets/imgDatabaseCloudinary';
import { Rewards1Dark, Rewards2Dark, Rewards3Dark } from '@/utils/assets/img-database';
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
          <div className="flex justify-center">
            <h1 className="mb-4 mr-2 text-4xl font-bold">SwaplyAr Plus Rewards™ </h1>
            <p className="mb-4 text-4xl font-bold"> premia tu fidelidad</p>
          </div>
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
              Cada transacción es una oportunidad de obtener más. Únete a SwaplyAr Plus Rewards y disfruta de beneficios
              exclusivos cada vez que realices un intercambio.
            </h2>
            <p className="">
              ¿Aún no formas parte?{' '}
              <strong>
                <LinkWithHover href="#">Crea</LinkWithHover>
              </strong>{' '}
              tu perfil en SwaplyAr o{' '}
              <strong>
                <LinkWithHover href="#">Inicia Sesión</LinkWithHover>
              </strong>{' '}
              en tu cuenta y da el primer paso hacia una experiencia que te recompensa en cada movimiento. ¡Inscríbete
              hoy y comienza a disfrutar las ventajas!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center py-10">
          <RewardCard
            imageSrc={isDark ? Rewards1Dark : Rewards1}
            imageAlt="paso 1 de como cambiar tu dinero en SwaplyAr"
            title="Regalo de Bienvenida"
            description="Únete a SwaplyAr Plus Rewards™ y recibe $10 adicionales en tu segunda transacción de más de $200, realizada con cualquier billetera virtual."
            linkText=""
            linkHref=""
          />
          <RewardCard
            imageSrc={isDark ? Rewards2Dark : Rewards2}
            imageAlt="paso 2 de como cambiar tu dinero en SwaplyAr"
            title="Los premios nunca terminan"
            description="Recompensas Continuas: Gana $5 adicionales después de completar 5 transacciones por un monto igual o superior a $400 cada una."
            linkText=""
            linkHref=""
          />
          <RewardCard
            imageSrc={isDark ? Rewards3Dark : Rewards3}
            imageAlt="paso 3 de como cambiar tu dinero en SwaplyAr"
            title="Exclusivo SwaplyAr"
            description="¡Mantente siempre atento a nuestras promociones: ¡ofertas exclusivas y acceso a beneficios únicos te esperan!"
            linkText=""
            linkHref=""
          />
        </div>
      </div>

      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        <div>
          <p>
            Para conocer los Términos y Condiciones del programa SwaplyAr Plus Rewards, haz{' '}
            <Link href="./sapr-terms-conditions" target="_blank" className="ml-2s underline">
              click aquí
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
