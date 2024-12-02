'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import ContactForm from '@/components/ui/contact-form/ContactForm';
import Image from 'next/image';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { useMargins } from '@/context/MarginProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { CentroDeAyuda, Ayuda1, Ayuda1Dark, PlusRewardsDark } from '@/utils/assets/imgDatabaseCloudinary';
import { PlusRewards, Ayuda2, Ayuda2Dark } from '@/utils/assets/img-database';
import Swal from 'sweetalert2';

const HelpCenterPage = () => {
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);
  const { isDark } = useDarkTheme();

  // const handleSendRequest = () => {
  //   Swal.fire({
  //     title:
  //       '<h2 style="font-size: 24px;">¿Estás seguro de que deseas cancelar esta solicitud?</h2>',
  //     icon: 'info',
  //     html: `
  //       <p style="font-size: 16px;">Si cancela esta solicitud, debe generar una nueva solicitud</p>
  //       <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; gap: 40px; padding: 0 13px">
  //         <div id="back-button-container"></div>
  //         <div style="height: 49px;" class="flex items-center justify-center">   
  //         <button id="cancel-button" class="m-1 text-base h-[42px] min-w-[110px] flex relative items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white dark:border-darkText dark:bg-darkText dark:text-lightText  ${isDark ? 'buttonSecondDark' : 'buttonSecond'}">Cancelar</button></div>
  //       </div>
  //     `,
  //     showConfirmButton: false,
  //     showCancelButton: false,
  //     background: isDark ? 'rgb(69 69 69)' : '#ffffff',
  //     color: isDark ? '#ffffff' : '#000000',
  //     didRender: () => {
  //       const backElement = document.getElementById('back-button-container');
  //       if (backElement) {
  //         const root = createRoot(backElement);
  //         root.render(
  //           <button
  //             onClick={() => Swal.close()}
  //             className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 flex h-[42px] min-w-[110px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-sm text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
  //           >
  //             <Arrow
  //               color={isDark ? '#ebe7e0' : '#012c8a'}
  //               backRequest={true}
  //             />
  //             Volver
  //           </button>,
  //         );
  //       }
  //     },
  //     didOpen: () => {
  //       const cancelButton = document.getElementById('cancel-button');
  //       if (cancelButton) {
  //         cancelButton.addEventListener('click', () => {
  //           Swal.close();
  //         });
  //       }
  //     },
  //   });
  // };

  return (
    <>
      <main className="relative flex w-full flex-col items-center justify-center gap-20 py-10">
        <AnimatedBlurredCircles tope="top-[-260px]" />
        <div className="mx-auto grid max-w-[1000px] gap-12" style={{ margin: currentMargin }}>
          <section className="rs-wrapper-v4 p-4">
            <h1 className="text-center text-3xl font-bold md:text-left mb-5">Bienvenido al Centro de Ayuda de SwaplyAr</h1>
            <div>
              <div className="flex gap-14 items-center">
                <div className="flex w-full flex-col items-center justify-center h-[250px]">
                  <Image
                    src={Ayuda1Dark}
                    alt="paso 1 de como cambiar tu dinero en SwaplyAr tema oscuro"
                    width={210}
                    height={150}
                  />
                  <hr className="border-1 mb-1 w-full dark:border-darkText border-buttonsLigth" />
                  <p className="font-bold underline underline-offset-2">Cancelacion o Reembolso</p>
                  <p className="text-center text-xs font-bold w-[180px]">Cancela tu transferencia para obtener un reembolso.</p>
                </div>
                <div className='flex h-40 w-[1px] dark:bg-darkText bg-buttonsLigth items-center justify-center'></div>
                <div className="flex w-full flex-col items-center justify-center  h-[250px]">
                  <Image
                    src={Ayuda1Dark}
                    alt="paso 1 de como cambiar tu dinero en SwaplyAr tema oscuro"
                    width={210}
                    height={150}
                  />
                  <hr className="border-1 mb-1 w-full dark:border-darkText border-buttonsLigth" />
                  <p className="font-bold underline underline-offset-2">Buscar Solicitud</p>
                  <p className="text-center text-xs font-bold h-[32px]">Consulte el estado de la transferencia.</p>
                </div>
                <div className='flex h-40 w-[1px] items-center dark:bg-darkText bg-buttonsLigth justify-center'></div>
                <div className="flex w-full flex-col items-center justify-center  h-[250px]">
                  <Image
                    src={Ayuda1Dark}
                    alt="paso 1 de como cambiar tu dinero en SwaplyAr tema oscuro"
                    width={210}
                    height={150}
                  />
                  <hr className="border-1 mb-1 w-full dark:border-darkText border-buttonsLigth" />
                  <p className="font-bold underline underline-offset-2">Editar Solicitud</p>
                  <p className="text-center text-xs font-bold w-[225px]">
                    Edita el nombre de tu destinatario en caso de que creas que cometiste un error.
                  </p>
                </div>
              </div>
              <p className="mt-8 text-center font-bold">
                ¿Sospechas que eres víctima de un fraude?{' '}
                <span className="underline underline-offset-2">obtén información aquí</span>
              </p>
            </div>
          </section>

          <section className="flex flex-col items-center">
            <ContactForm />
          </section>

          <section className="rs-wrapper-v4 grid grid-cols-1 gap-8 md:grid-cols-2">
            <span className="flex items-center justify-center">
              {isDark ? (
                <Image
                src={PlusRewardsDark}
                alt="SwaplyAr Plus Rewards™ tema oscuro"
                width={400}
                height={300}
              />
              ) : (
                <Image
                src={PlusRewards}
                alt="SwaplyAr Plus Rewards™"
                width={400}
                height={300}
              />
              )}
            </span>
            <span className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold">
                SwaplyAr Plus Rewards™ premia tu fidelidad, con el programa de fidelización
              </h2>
              <h5 className="mt-4 text-left text-lg md:text-center">
                Obtené beneficios exclusivos cada vez que realices un cambio de divisas con SwaplyAr Plus Rewards™.
              </h5>
              <button
                onClick={() => (window.location.href = 'programa-de-fidelizacion')}
                className={`relative m-1 mt-4 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
              >
                Plus Rewards™
              </button>
            </span>
          </section>

          <section className="rs-wrapper-v4 grid grid-cols-1 gap-8 md:grid-cols-2">
            <span className="card-rawe flex flex-col rounded-2xl bg-gray-100 p-8 dark:bg-graytyc">
              {isDark ? (
                <Image
                  src={Ayuda1Dark}
                  alt="paso 1 de como cambiar tu dinero en SwaplyAr tema oscuro"
                  width={210}
                  height={150}
                />
              ) : (
                <Image src={Ayuda1} alt="paso 1 de como cambiar tu dinero en SwaplyAr" width={210} height={150} />
              )}
              <h2 className="mt-4 text-xl font-bold">Chateá con nosotros</h2>
              <div className="flex h-full flex-col justify-between">
                <p className="mb-6 mt-2 text-center text-lg md:mb-0 md:text-left">
                  Comunicate con nuestro representante de Atención al Cliente para recibir ayuda.
                </p>
                <p className="text-right text-2xl">
                  <strong>
                    <LinkWithHover href="https://wa.me/+5491123832198">WhatsApp</LinkWithHover>
                  </strong>
                </p>
              </div>
            </span>
            <span className="card-rawe flex flex-col rounded-2xl bg-[#e6e8ef62] p-8 dark:bg-calculatorDark md:items-start">
              {isDark ? (
                <Image
                  src={Ayuda2Dark}
                  alt="paso 2 de como cambiar tu dinero en SwaplyAr tema oscuro"
                  width={210}
                  height={150}
                />
              ) : (
                <Image
                  src={Ayuda2}
                  alt="paso 2 de como cambiar tu dinero en SwaplyAr"
                  width={210}
                  height={150}
                />
              )}
              <h2 className="mt-4 text-xl font-bold">Otro motivo...</h2>
              <div className="flex h-full flex-col justify-between">
                <p className="mb-6 mt-2 text-center text-lg md:mb-0 md:text-left">
                  Si necesitás contactarnos por otro motivo, simplemente envianos un email y atenderemos tu solicitud.
                </p>
                <p className="text-right text-2xl">
                  <strong>
                    <LinkWithHover href="mailto:centrodeayuda@swaplyar.com">Email</LinkWithHover>
                  </strong>
                </p>
              </div>
            </span>
          </section>
        </div>
      </main>
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        <></>
      </FlyerTrabajo>
    </>
  );
};

export default HelpCenterPage;
