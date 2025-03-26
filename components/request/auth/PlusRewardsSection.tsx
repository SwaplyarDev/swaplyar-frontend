'use client';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Image from 'next/image';

function PlusRewardSection() {
  const { isDark } = useDarkTheme();
  console.log(isDark);
  return (
    <>
      <section className="relative m-auto flex w-full max-w-7xl items-center">
        <section className="relative mx-auto w-full max-w-md rounded-lg p-6 text-white xs-mini-phone:p-7 xs-phone:p-8 md-phone:p-10">
          <article className="mb-6 flex w-full justify-start xs-phone:mb-8">
            <div className="w-40 xs-mini-phone:w-44 xs-phone:w-48 md-phone:w-52">
              <Image
                src="/images/solicitud-plus-rewards.png"
                alt="Plus Rewards"
                width={200}
                height={80}
                className="object-contain"
              />
            </div>
          </article>

          <article className="mb-5 xs-phone:mb-6">
            <p className="text-sm text-gray-300 xs-mini-phone:text-base">Tu Código de Miembro:</p>
            <h2 className="titleFont mb-4 text-3xl font-bold xs-mini-phone:text-[32px] xs-phone:text-[36px] md-phone:text-[40px]">
              2448XPAR
            </h2>
          </article>

          <article className="mb-6 xs-phone:mb-8">
            <p className="text-sm text-gray-300 xs-mini-phone:text-base">La recompensa de</p>
            <p className="text-lg font-bold xs-phone:text-xl">Bienvenida Express de</p>
            <p className="titleFont mb-1 text-xl font-bold text-green-400 xs-mini-phone:text-2xl xs-phone:text-3xl">
              $3 USD
            </p>
            <p className="text-sm text-gray-300 xs-mini-phone:text-base">se aplica automáticamente en tu solicitud.</p>
          </article>

          <article className="relative mb-6 rounded-lg p-4 xs-mini-phone:p-5 xs-phone:p-6 md-phone:p-7">
            <div className="mb-4 text-center">
              <p className="font-medium xs-phone:text-lg">Aún no has verificado tu cuenta.</p>
              <p className="text-sm xs-mini-phone:text-base">
                Veríficala ahora y obtén <span className="font-bold text-green-400">$5 USD</span> adicionales en tu
                solicitud.
              </p>
            </div>

            <button
              className={`relative mt-4 h-[48px] w-[280px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-[14px] py-3 font-titleFont font-semibold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              Verificar ahora
            </button>

            <div className="absolute -bottom-10 -right-4 md-phone:-bottom-12 md-phone:-right-6 lg-tablet:-right-8">
              <Image
                src="/images/solicitud-image.png"
                alt="Rewards Character"
                width={120}
                height={120}
                className="object-contain xs-mini-phone:w-[130px] xs-phone:w-[140px] md-phone:w-[150px] lg-tablet:w-[160px]"
              />
            </div>
          </article>
        </section>
      </section>
    </>
  );
}

export default PlusRewardSection;
