'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import RewardCard from '@/components/ui/reward-card/RewardCard';
import useStore from '@/store/authViewStore';
import Link from 'next/link';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import {
  CentroDeAyuda,
  Rewards1,
  Rewards1Dark,
  Rewards2,
  Rewards2Dark,
  Rewards3,
  Rewards3Dark,
} from '@/utils/assets/imgDatabaseCloudinary';
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
    <div className="relative font-textFont">
      <AnimatedBlurredCircles tope={'top-[20px]'} />
      <div>
        <div className="text-center">
          <div className="flex justify-center">
            <section className="my-10 mb-10 mr-2 max-w-[796px] text-[38px] font-medium xs:my-20 xs:px-[100px] xs:text-[40px]">
              SwaplyAr Plus Rewards™ premia tu fidelidad
            </section>
          </div>
        </div>

        <div>
          <div className="mx-4 text-center">
            <section className="text-normal mx-auto mb-4 max-w-[796px] text-start font-normal">
              <strong className="text-xl font-semibold"> Cada transacción es una oportunidad de obtener más.</strong>
              Únete a SwaplyAr Plus Rewards y disfruta de beneficios exclusivos cada vez que realices un intercambio.
            </section>
            <div className="mb-10 mt-4">
              <button
                id="submit-25456"
                className={`dark:hover:bg- relative m-1 h-[48px] w-[306px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
                onClick={() => handleChange()}
              >
                ¡Únete ya!
              </button>
            </div>
            <p className="mx-auto max-w-[796px] pb-10 text-start xs:px-[96px]">
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

        <div className="relative flex flex-wrap justify-center pb-14">
          <RewardCard
            imageSrc={isDark ? Rewards1Dark : Rewards1}
            imageAlt="paso 1 de como cambiar tu dinero en SwaplyAr"
            title="Regalo de Bienvenida"
            description="Únete a SwaplyAr Plus Rewards™ y recibe $10 adicionales en tu segunda transacción de más de $200, realizada con cualquier billetera virtual."
            linkText=""
            linkHref=""
            className="md:flex md:flex-row"
          />
          <RewardCard
            imageSrc={isDark ? Rewards2Dark : Rewards2}
            imageAlt="paso 2 de como cambiar tu dinero en SwaplyAr"
            title="Los premios nunca terminan"
            description="Recompensas Continuas: Gana $5 adicionales después de completar 5 transacciones por un monto igual o superior a $400 cada una."
            linkText=""
            linkHref=""
            className="md:flex md:flex-row-reverse"
          />
          <RewardCard
            imageSrc={isDark ? Rewards3Dark : Rewards3}
            imageAlt="paso 3 de como cambiar tu dinero en SwaplyAr"
            title="Exclusivo SwaplyAr"
            description="¡Mantente siempre atento a nuestras promociones: ¡ofertas exclusivas y acceso a beneficios únicos te esperan!"
            linkText=""
            linkHref=""
            className="md:flex md:flex-row"
          />
        </div>
      </div>

      <FlyerTrabajo imageSrc={CentroDeAyuda} />
    </div>
  );
}

export default LoyaltyProgram;
