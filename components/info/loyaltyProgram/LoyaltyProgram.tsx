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
      <div className="relative mx-auto max-w-[390px] md:max-w-[708px] lg:max-w-[1236px] px-4 font-textFont md:px-8 lg2:px-4 top-[34px] md:top-[74px] mb-[84px] md:mb-[206px]">
        <AnimatedBlurredCircles tope={'top-[20px]'} />
        <div>
          <h1 className="mx-auto max-w-[504px] text-center font-titleFont text-[38px] font-medium lg2:text-[40px]">
            SwaplyAr Plus Rewards™ premia tu fidelidad
          </h1>

          <div className="mt-10 text-center flex flex-col items-center">
            <section className="mx-auto max-w-[796px] mb-8 text-center font-light">
              <strong className="text-lg">Cada transacción es una oportunidad de obtener más.</strong>
              Únete a SwaplyAr Plus Rewards y disfruta de beneficios exclusivos cada vez que realices un intercambio.
            </section>

            <ShortButton
              text="¡Únete ya!"
              onButtonClick={handleChange}
              fondoOscuro={true}
              className="mt-4 h-[48px] w-[280px] px-[14px] py-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText"
            />

            <p className="mx-auto mt-10 mb-9 max-w-[796px] text-start font-light">
              ¿Aún no formas parte? <LinkWithHover href="/es/registro">Crea</LinkWithHover> tu perfil
              en SwaplyAr o <LinkWithHover href="/es/iniciar-sesion">Inicia Sesión</LinkWithHover> en tu
              cuenta y da el primer paso hacia una experiencia que te recompensa en cada movimiento. ¡Inscríbete hoy y
              comienza a disfrutar las ventajas!
            </p>
          </div>

          <section className="relative mx-auto max-w-[390px] md:max-w-[708px] lg:max-w-[1236px] mt-10 flex flex-col items-center gap-10 md:gap-20 lg2:flex-row lg2:gap-10">
            <div className="w-full max-w-[358px] md:max-w-[644px]">
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
            <div className="w-full max-w-[358px] md:max-w-[644px]">
              <RewardCard
                imageSrc={isDark ? Rewards2Dark : Rewards2}
                imageAlt="paso 2 de como cambiar tu dinero en SwaplyAr"
                title="Los premios nunca terminan"
                description="Recompensas Continuas: Gana $5 adicionales después de completar 5 transacciones por un monto igual o superior a $400 cada una."
                linkText=""
                linkHref=""
                className="md:flex md:flex-row-reverse"
                customImageWidth={318}
                customTextWidth={{ mobile: 358, tablet: 318, desktop: 385 }}
              />
            </div>
            <div className="w-full max-w-[358px] md:max-w-[644px]">
              <RewardCard
                imageSrc={isDark ? Rewards3Dark : Rewards3}
                imageAlt="paso 3 de como cambiar tu dinero en SwaplyAr"
                title="Exclusivo SwaplyAr"
                description="¡Mantente siempre atento a nuestras promociones: ¡ofertas exclusivas y acceso a beneficios únicos te esperan!"
                linkText=""
                linkHref=""
                className="md:flex md:flex-row"
                customImageWidth={303}
                customTextWidth={{ mobile: 358, tablet: 333, desktop: 385 }}
              />
            </div>
          </section>
        </div>
      </div>
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
