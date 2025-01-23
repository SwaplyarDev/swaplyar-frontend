'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import RewardCard from '@/components/ui/reward-card/RewardCard';
import useStore from '@/store/authViewStore';
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
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

export default function LoyaltyProgram() {
  const { setView } = useStore();
  const { isDark } = useDarkTheme();

  const handleChange = () => {
    setView('register');
    window.location.href = '/auth/login-register';
  };

  return (
    <main className="relative py-10">
      <AnimatedBlurredCircles tope="top-[20px]" />

      <h1 className="mb-2 py-10 text-center text-[40px] font-bold leading-tight sm:text-[30px]">
        <span>SwaplyAr Plus Rewards™</span>
        <br />
        <span>premia tu fidelidad</span>
      </h1>

      <h2 className="mx-auto mb-4 mt-4 w-full text-center leading-relaxed sm:w-[90%] lg:w-[592px]">
        <span className="text-lg font-bold">Cada transacción es una oportunidad de obtener más. </span>
        <span className="text-base font-normal">
          Únete a SwaplyAr Plus Rewards y disfruta de beneficios exclusivos cada vez que realices un intercambio.
        </span>
      </h2>

      <button
        id="submit-25456"
        className={`mx-auto my-10 block h-[48px] w-[200px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText sm:w-[150px]`}
        onClick={handleChange}
      >
        ¡Únete ya!
      </button>

      <p className="mx-auto mb-4 mt-8 w-full leading-relaxed sm:w-[90%] lg:w-[592px]">
        ¿Aún no formas parte?
        <a href="http://localhost:3000/info/loyalty-program" className="underline">
          Crea
        </a>{' '}
        tu perfil en SwaplyAr o{' '}
        <a href="http://localhost:3000/info/loyalty-program" className="underline">
          Inicia Sesión
        </a>{' '}
        en tu cuenta y da el primer paso hacia una experiencia que te recompensa en cada movimiento. ¡Inscríbete hoy y
        comienza a disfrutar las ventajas!
      </p>

      <section className="mb-8 flex flex-wrap justify-center gap-8 overflow-x-auto py-10 pb-16">
        <div className="flex w-full flex-col items-center px-6 py-2 text-left sm:w-[320px] lg:w-[360px]">
          <img
            src={Rewards1}
            alt="paso 1 de como cambiar tu dinero en SwaplyAr"
            className="mb-4 w-full max-w-[220px]"
          />
          <h3 className="text-center text-lg font-bold">Regalo de Bienvenida</h3>
          <p className="mt-2 text-justify text-sm leading-relaxed">
            Únete a SwaplyAr Plus Rewards™ y recibe $10 adicionales en tu segunda transacción de más de $200, realizada
            con cualquier billetera virtual.
          </p>
        </div>

        <div className="flex w-full flex-col items-center px-6 py-2 text-left sm:w-[320px] lg:w-[360px]">
          <img
            src={Rewards2}
            alt="paso 2 de como cambiar tu dinero en SwaplyAr"
            className="mb-4 w-full max-w-[220px]"
          />
          <h3 className="text-center text-lg font-bold">Los premios nunca terminan</h3>
          <p className="mt-2 text-justify text-sm leading-relaxed">
            Recompensas Continuas: Gana $5 adicionales después de completar 5 transacciones por un monto igual o
            superior a $400 cada una.
          </p>
        </div>

        <div className="flex w-full flex-col items-center px-6 py-2 text-left sm:w-[320px] lg:w-[360px]">
          <img
            src={Rewards3}
            alt="paso 3 de como cambiar tu dinero en SwaplyAr"
            className="mb-4 w-full max-w-[220px]"
          />
          <h3 className="text-center text-lg font-bold">Exclusivo SwaplyAr</h3>
          <p className="mt-2 text-justify text-sm leading-relaxed">
            ¡Mantente siempre atento a nuestras promociones: ¡ofertas exclusivas y acceso a beneficios únicos te
            esperan!
          </p>
        </div>
      </section>

      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        <div></div>
      </FlyerTrabajo>
    </main>
  );
}
