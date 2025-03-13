'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import RewardCard from '@/components/ui/reward-card/RewardCard';
import useStore from '@/store/authViewStore';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import {
  Rewards1,
  Rewards1Dark,
  Rewards2,
  Rewards2Dark,
  Rewards3,
  Rewards3Dark,
  FlyerGif,
} from '@/utils/assets/imgDatabaseCloudinary';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useLocalizedPath } from '@/i18n/useLocalizedPath';

function LoyaltyProgram() {
  const { setView } = useStore();
  const { isDark } = useDarkTheme();
  const getPath = useLocalizedPath();

  const handleChange = () => {
    setView('register');
    window.location.href = getPath('authLoginRegisterRegister');
  };

  return (
    <>
      <div className="relative mx-auto my-10 max-w-[1204px] px-4 font-textFont md:px-8 lg2:px-4">
        <AnimatedBlurredCircles tope={'top-[20px]'} />
        <div>
          <h1 className="mx-auto max-w-[504px] text-center font-titleFont text-[38px] font-medium lg2:text-[40px]">
            SwaplyAr Plus Rewards™ premia tu fidelidad
          </h1>

          <div className="mt-10 text-center">
            <section className="mx-auto max-w-[796px] text-center font-light">
              <strong className="text-lg"> Cada transacción es una oportunidad de obtener más. </strong>
              Únete a SwaplyAr Plus Rewards y disfruta de beneficios exclusivos cada vez que realices un intercambio.
            </section>
            <button
              id="submit-25456"
              className={`relative mt-4 h-[48px] w-[280px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-[14px] py-3 font-titleFont font-semibold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
              onClick={() => handleChange()}
            >
              ¡Únete ya!
            </button>
            <p className="mx-auto mt-10 max-w-[504px] text-start font-light">
              ¿Aún no formas parte? <LinkWithHover href={getPath('authLoginRegisterRegister')}>Crea</LinkWithHover> tu
              perfil en SwaplyAr o <LinkWithHover href={getPath('authLoginRegisterLogin')}>Inicia Sesión</LinkWithHover>{' '}
              en tu cuenta y da el primer paso hacia una experiencia que te recompensa en cada movimiento. ¡Inscríbete
              hoy y comienza a disfrutar las ventajas!
            </p>
          </div>

          <section className="relative mx-auto mt-10 flex max-w-[680px] flex-col items-center gap-10 lg2:max-w-full lg2:flex-row">
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
          </section>
        </div>
      </div>
      <FlyerTrabajo
        imageSrc={FlyerGif}
        href={getPath('authLoginRegisterRegister')}
        description="Registrate gratis para empezar a obtener beneficios exclusivos"
        nameButton="Me quiero registrar"
      />
    </>
  );
}

export default LoyaltyProgram;
