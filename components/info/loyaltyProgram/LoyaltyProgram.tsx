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
import ShortButton from '@/components/ui/NewButtons/ShortButton';

function LoyaltyProgram() {
  const { setView } = useStore();
  const { isDark } = useDarkTheme();

  const handleChange = () => {
    setView('register');
    window.location.href = '/es/registro';
  };

  return (
    <>
      <AnimatedBlurredCircles tope={'top-[20px]'} />
      <section className="mx-auto w-full max-w-[1204px] overflow-hidden px-4 md:px-8 navbar-desktop:px-4 my-[40px] md:my-[80px] navbar-desktop:my-[120px]">
        <h1 className="mx-auto mb-3 md:mb-5 lg2:mb-10 max-w-[504px] text-center font-titleFont text-3.5xl md:text-[38px] font-medium lg2:text-[40px]">
          SwaplyAr Plus Rewards™ premia tu fidelidad
        </h1>

        <div className="text-center flex flex-col items-center gap-3 md:gap-5 lg:gap-10 mb-3 md:mb-5 lg2:mb-10">
          <section className="mx-auto max-w-[796px] text-center font-light">
            <strong className="text-xl">Cada transacción es una oportunidad de obtener más. </strong>
            Únete a SwaplyAr Plus Rewards y disfruta de beneficios exclusivos cada vez que realices un intercambio.
          </section>

          <ShortButton
            text="¡Únete ya!"
            onButtonClick={handleChange}
            fondoOscuro={true}
            className="h-[48px] w-[280px] px-[14px] py-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText"
          />

          <p className="mx-auto max-w-[796px] text-start font-light">
            <strong>¿Aún no formas parte?</strong> <LinkWithHover href="/es/registro">Crea tu perfil</LinkWithHover> {' '}
            en SwaplyAr o <LinkWithHover href="/es/iniciar-sesion">Inicia Sesión</LinkWithHover> en tu
            cuenta y da el primer paso hacia una experiencia que te recompensa en cada movimiento. ¡Inscríbete hoy y
            comienza a disfrutar las ventajas!
          </p>
        </div>

        <section className="relative flex flex-col items-center gap-4 md:gap-5 lg2:flex-row lg2:gap-10">
          <div className="w-auto lg2:h-[432px]">
            <RewardCard
              imageSrc={isDark ? Rewards1Dark : Rewards1}
              imageAlt="paso 1 de como cambiar tu dinero en SwaplyAr"
              title="Regalo de Bienvenida"
              description="Únete a SwaplyAr Plus Rewards™ y recibe $10 adicionales en tu segunda transacción de más de $200, realizada con cualquier billetera virtual."
              linkText=""
              linkHref=""
              className="md:flex md:flex-row"
              customImageWidth={313}
            />
          </div>
          <div className="w-auto lg2:h-[432px]">
            <RewardCard
              imageSrc={isDark ? Rewards2Dark : Rewards2}
              imageAlt="paso 2 de como cambiar tu dinero en SwaplyAr"
              title="Los premios nunca terminan"
              description="Recompensas Continuas: Gana $5 adicionales después de completar 5 transacciones por un monto igual o superior a $400 cada una."
              linkText=""
              linkHref=""
              className="md:flex md:flex-row-reverse"
              customImageWidth={318}
            />
          </div>
          <div className="w-auto lg2:h-[432px]">
            <RewardCard
              imageSrc={isDark ? Rewards3Dark : Rewards3}
              imageAlt="paso 3 de como cambiar tu dinero en SwaplyAr"
              title="Exclusivo SwaplyAr"
              description="¡Mantente siempre atento a nuestras promociones: ¡ofertas exclusivas y acceso a beneficios únicos te esperan!"
              linkText=""
              linkHref=""
              className="md:flex md:flex-row"
              customImageWidth={303}
            />
          </div>
        </section>
      </section>
      <FlyerTrabajo
        imageSrc={FlyerGif}
        href="/es/registro"
        description="Registrate gratis para empezar a obtener beneficios exclusivos"
        nameButton="Me quiero registrar"
      />
    </>
  );
}

export default LoyaltyProgram;
