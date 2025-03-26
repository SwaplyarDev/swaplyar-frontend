import { useDarkTheme } from "@/components/ui/theme-Provider/themeProvider";
import Image from "next/image"

function PlusRewardSection() {
  const { isDark } = useDarkTheme();

  return (
    <>
      <section className="relative m-auto flex w-full max-w-7xl items-center">
        <section className="relative w-full bg-black text-white p-6 rounded-lg max-w-md mx-auto xs-mini-phone:p-7 xs-phone:p-8 md-phone:p-10">
          <article className="flex w-full justify-start mb-6 xs-phone:mb-8">
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
            <p className="text-gray-300 text-sm xs-mini-phone:text-base">Tu Código de Miembro:</p>
            <h2 className="titleFont text-3xl font-bold mb-4 xs-mini-phone:text-[32px] xs-phone:text-[36px] md-phone:text-[40px]">
              2448XPAR
            </h2>
          </article>

          <article className="mb-6 xs-phone:mb-8">
            <p className="text-gray-300 text-sm xs-mini-phone:text-base">La recompensa de</p>
            <p className="font-bold text-lg xs-phone:text-xl">Bienvenida Express de</p>
            <p className="titleFont text-xl font-bold text-green-400 mb-1 xs-mini-phone:text-2xl xs-phone:text-3xl">
              $3 USD
            </p>
            <p className="text-sm text-gray-300 xs-mini-phone:text-base">se aplica automáticamente en tu solicitud.</p>
          </article>

          <article className="relative bg-zinc-900 p-4 rounded-lg mb-6 xs-mini-phone:p-5 xs-phone:p-6 md-phone:p-7">
            <div className="text-center mb-4">
              <p className="font-medium xs-phone:text-lg">Aún no has verificado tu cuenta.</p>
              <p className="text-sm xs-mini-phone:text-base">
                Veríficala ahora y obtén <span className="font-bold text-green-400">$5 USD</span> adicionales en tu
                solicitud.
              </p>
            </div>

            <button className={`relative mt-4 h-[48px] w-[280px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-[14px] py-3 font-titleFont font-semibold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}>
              Verificar ahora
            </button>

            <div className="absolute -right-4 -bottom-10 md-phone:-right-6 md-phone:-bottom-12 lg-tablet:-right-8">
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
  )
}

export default PlusRewardSection

