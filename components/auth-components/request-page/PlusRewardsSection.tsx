import Image from 'next/image';
import { VerifyButton } from './VerifyButton';

function PlusRewardSection() {
  return (
    <section className="relative m-auto flex w-full max-w-7xl items-center">
      <section className="mx-auto w-full max-w-md rounded-lg p-6 text-lightText dark:text-darkText xs-mini-phone:p-7 xs-phone:p-8 md-phone:p-10">
        <article className="mb-6 flex justify-center xs-phone:mb-8">
          <div className="ml-24 xs-mini-phone:w-64 xs-phone:w-48 md-phone:w-52">
            <Image
              src="/images/solicitud-plus-rewards.png"
              alt="Plus Rewards"
              width={200}
              height={80}
              className="object-contain"
            />
          </div>
        </article>

        <article className="mb-5 text-end xs-phone:mb-6">
          <p className="align-text-top text-sm xs-mini-phone:text-base">Tu Código de Miembro:</p>
          <h2 className="title mb-4 text-3xl font-bold xs-mini-phone:text-[32px] xs-phone:text-[36px] md-phone:text-[40px]">
            2448XPAR
          </h2>
        </article>

        <article className="mb-6 flex xs-phone:mb-8">
          <p className="text-sm xs-mini-phone:text-base">
            <span>La recompensa de </span>
            <span className="whitespace-nowrap text-lg font-bold text-custom-blue-800 xs-phone:text-xl">
              Bienvenida Express
            </span>
            <span className="whitespace-nowrap"> de </span>
            <br></br>
            <span className="titleFon text-xl font-bold text-custom-blue-800 xs-mini-phone:text-2xl xs-phone:text-3xl">
              $3 USD
            </span>
            <span> se aplica automáticamente en tu solicitud.</span>
          </p>
          <Image
            src="/images/solicitud-image.png"
            alt="Rewards Character"
            width={395}
            height={290}
            className="z-10 object-cover xs-mini-phone:w-[197px] xs-phone:w-[140px] md-phone:w-[150px] lg-tablet:w-[160px]"
          />
        </article>

        <article className="relative mb-6 rounded-lg bg-white p-4 dark:bg-[#323232] xs-mini-phone:p-5 xs-phone:p-6 md-phone:p-7">
          <div className="mb-4 text-center">
            <p className="font-medium xs-phone:text-lg">Aún no has verificado tu cuenta.</p>
            <p className="text-sm xs-mini-phone:text-base">
              Veríficala ahora y obtén <span className="font-bold text-custom-blue-800">$5 USD</span> adicionales
              <br></br>
              <span> en tu solicitud.</span>
            </p>
          </div>

          <div className="flex justify-center">
            <VerifyButton />
          </div>
        </article>
      </section>
    </section>
  );
}

export default PlusRewardSection;
