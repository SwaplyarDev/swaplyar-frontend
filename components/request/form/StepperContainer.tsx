'use client';
import { useStepperStore } from '@/store/stateStepperStore';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepIndicator from './steps/StepIndicator';
import ArrowDown from '@/components/ui/ArrowDown/ArrowDown';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Swal from 'sweetalert2';
import { createRoot } from 'react-dom/client';
import Arrow from '@/components/ui/Arrow/Arrow';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useSystemStore } from '@/store/useSystemStore';
import Tick from '@/components/ui/Tick/Tick';
import Cronometro from './Cronometro';
import useChronometerState from '@/store/chronometerStore';
import useControlRouteRequestStore from '@/store/controlRouteRequestStore';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';

const StepperContainer = () => {
  const { activeStep, completedSteps, setActiveStep, submitAllData } = useStepperStore();
  const [blockAll, setBlockAll] = useState(false);
  const navigation = useRouter();

  const { isStopped, setStop } = useChronometerState();
  const [correctSend, setCorrectSend] = useState(false);
  const [errorSend, setErrorSend] = useState(false);

  const steps = [
    { title: 'Mis Datos', component: <StepOne blockAll={blockAll} /> },
    {
      title: 'Información del Destinatario',
      component: <StepTwo blockAll={blockAll} />,
    },
    { title: 'Pago', component: <StepThree blockAll={blockAll} /> },
  ];

  const router = useRouter();
  const { pass } = useControlRouteRequestStore((state) => state);
  const handleStepClick = (index: number) => {
    if (completedSteps[index] || index === activeStep) {
      setActiveStep(index);
    }
  };
  const { isDark } = useDarkTheme();

  useEffect(() => {
    if (!pass) {
      router.push('/home'); // Redirige al home si `pass` es false
    }
  }, [pass, router]);

  const handleCancelRequest = () => {
    Swal.fire({
      title: '<h2 style="font-size: 24px;">¿Estás seguro de que deseas cancelar esta solicitud?</h2>',
      icon: 'info',
      html: `
        <p style="font-size: 16px;">Si cancela esta solicitud, debe generar una nueva solicitud</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; gap: 40px; padding: 0 13px">
          <div id="back-button-container"></div>
          <div style="height: 49px;" class="flex items-center justify-center">   
          <button id="cancel-button" class="m-1 text-base h-[42px] min-w-[110px] flex relative items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white dark:border-darkText dark:bg-darkText dark:text-lightText  ${isDark ? 'buttonSecondDark' : 'buttonSecond'}">Cancelar</button></div>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      background: isDark ? 'rgb(69 69 69)' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      didRender: () => {
        const backElement = document.getElementById('back-button-container');
        if (backElement) {
          const root = createRoot(backElement);
          root.render(
            <button
              onClick={() => Swal.close()}
              className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 flex h-[42px] min-w-[110px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-sm text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
            >
              <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} backRequest={true} />
              Volver
            </button>,
          );
        }
      },
      didOpen: () => {
        const cancelButton = document.getElementById('cancel-button');
        if (cancelButton) {
          cancelButton.addEventListener('click', () => {
            setBlockAll(true);
            setStop(true);
            Swal.close();
          });
        }
      },
    });
  };
  //   Swal.fire({
  //     title: '',
  //     html: `
  //     <div class="flex bg-[#ffffff] dark:bg-[#454545] rounded-xl px-[15px] py-5 xs-phone:py-[10px] max-w-[500px] w-full xs-phone:flex-row flex-col-reverse gap-3 justify-between items-center">
  //       <div class="flex items-center justify-center gap-1 flex-col">
  //         <h2 class="text-2xl xs-phone:text-left text-center w-full text-[#252526] dark:text-[#ebe7e0]">Solicitud realizada con éxito</h2>
  //         <a href="#" target="_blank" class="text-base w-full xs-phone:text-left text-center text-[#012c8a] dark:text-[#0ea5e9]">¿Tuviste algún problema con la transferencia?</a>
  //       </div>
  //       <div id="tick-container" class="flex justify-center items-center h-[100px] w-[100px] rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText"></div>
  //     </div>
  //     `,
  //     customClass: {
  //       htmlContainer: 'confirmAlert',
  //     },
  //     showConfirmButton: false,
  //     showCancelButton: false,
  //     background: 'transparent',
  //     color: isDark ? '#ffffff' : '#000000',
  //     allowOutsideClick: true,
  //     allowEscapeKey: true,
  //     allowEnterKey: false,
  //     didRender: () => {
  //       const tickContainer = document.getElementById('tick-container');
  //       if (tickContainer) {
  //         const root = createRoot(tickContainer);
  //         root.render(
  //           <Tick color={isDark ? '#414244' : '#FCFBFA'} size="70px" />,
  //         );
  //       }
  //     },
  //     willClose: () => {
  //       //Redirigir al home cuando se cierre la alerta
  //       navigation.push('/');
  //     },
  //   });
  // };
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const isSuccess = await submitAllData(selectedSendingSystem, selectedReceivingSystem);

      if (isSuccess) {
        console.log('Datos enviados correctamente');
        setBlockAll(true);
        setCorrectSend(true);
        setErrorSend(false);
      } else {
        setErrorSend(true);
        console.error('Hubo un error al enviar los datos');
      }
    } catch (error) {
      console.error('Error en el proceso de envío:', error);
    }
    setLoading(false);
  };
  console.log(blockAll || errorSend);
  return (
    <div
      className={clsx(
        'flex w-full max-w-[1000px] flex-col gap-5',
        correctSend && 'mt-48 xs:mt-32',
        (blockAll || errorSend) && 'mt-72 xs:mt-52',
      )}
    >
      {blockAll && (
        <div
          className={clsx(
            'absolute left-0 top-36 flex w-full justify-center',
            isDark
              ? correctSend
                ? 'bg-[#00a72e]'
                : isStopped
                  ? 'bg-[#bb8a04]'
                  : 'bg-[#a31c01]'
              : correctSend
                ? 'bg-[#00a73c]'
                : isStopped
                  ? 'bg-[#f0b232]'
                  : 'bg-[#d50102]',
          )}
        >
          <div className="flex w-full max-w-[1000px] flex-col gap-2 px-5 py-5 xs-phone:px-10">
            {correctSend ? (
              <>
                <h2 className="w-full text-center text-3xl font-bold text-darkText sm-phone:text-end">
                  Solicitud enviada con exito
                </h2>
              </>
            ) : (
              <>
                {isStopped ? (
                  <h2
                    className={clsx(
                      'w-full text-center text-3xl font-bold sm-phone:text-end',
                      isDark ? 'text-darkText' : 'text-[#252526]',
                    )}
                  >
                    Tiempo agotado
                  </h2>
                ) : (
                  <h2 className="w-full text-center text-3xl font-bold text-darkText sm-phone:text-end">
                    Solicitud cancelada
                  </h2>
                )}
                {isStopped ? (
                  <>
                    <p
                      className={clsx(
                        'w-full text-center sm-phone:hidden',
                        isDark ? 'text-darkText' : 'text-[#252526]',
                      )}
                    >
                      Tu tiempo se agoto pero puedes crear una nueva, y si tienes alguna pregunta o necesitas ayuda,
                      estamos aquí para ti.
                    </p>
                    <div className="w-full">
                      <p
                        className={clsx(
                          'hidden w-full text-end sm-phone:block',
                          isDark ? 'text-darkText' : 'text-[#252526]',
                        )}
                      >
                        Tu tiempo se agoto pero puedes crear una nueva, y si tienes alguna pregunta
                      </p>
                      <p
                        className={clsx(
                          'hidden w-full text-end sm-phone:block',
                          isDark ? 'text-darkText' : 'text-[#252526]',
                        )}
                      >
                        o necesitas ayuda, estamos aquí para ti.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="w-full text-center text-darkText sm-phone:hidden">
                      Puedes crear una nueva, y si tienes alguna pregunta o necesitas ayuda, estamos aquí para ti.
                    </p>
                    <div className="w-full">
                      <p className="hidden w-full text-end text-darkText sm-phone:block">
                        Puedes crear una nueva, y si tienes alguna pregunta
                      </p>
                      <p className="hidden w-full text-end text-darkText sm-phone:block">
                        o necesitas ayuda, estamos aquí para ti.
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
            <div className="flex w-full flex-col-reverse items-center justify-between gap-2 xs:flex-row">
              <Link
                className={clsx(
                  'group flex items-center gap-1 text-center sm-phone:text-start',
                  isStopped ? (isDark ? 'text-darkText' : 'text-[#252526]') : 'text-darkText',
                )}
                href="/"
              >
                <div className="relative h-[15px] w-[15px] overflow-hidden">
                  <div className="absolute left-0 top-0 transition-all duration-200 group-hover:left-1">
                    <Arrow color={isStopped ? (isDark ? '#ebe7e0' : '#252526') : '#ebe7e0'} backRequest={true} />
                  </div>
                </div>
                Volver al home
              </Link>
              <Link
                className={clsx(
                  'text-center underline sm-phone:text-start',
                  isStopped ? (isDark ? 'text-darkText' : 'text-[#252526]') : 'text-darkText',
                )}
                href="/info/help-center"
              >
                ¡No dudes en contactarnos!
              </Link>
            </div>
          </div>
        </div>
      )}
      {errorSend && (
        <div className={clsx('absolute left-0 top-36 flex w-full justify-center bg-[#d50102]')}>
          <div className="flex w-full max-w-[1000px] flex-col gap-2 px-5 py-5 xs-phone:px-10">
            <h2 className="w-full text-center text-3xl font-bold text-darkText sm-phone:text-end">
              Error en la solicitud
            </h2>
            <>
              <p className={clsx('w-full text-center text-darkText sm-phone:hidden')}>
                Si el problema persiste, vuelve a intentarlo más tarde y si tienes alguna pregunta o necesitas ayuda,
                estamos aquí para ti.
              </p>
              <div className="w-full">
                <p className={clsx('hidden w-full text-end text-darkText sm-phone:block')}>
                  Si el problema persiste, vuelve a intentarlo más tarde y si tienes alguna pregunta
                </p>
                <p className={clsx('hidden w-full text-end text-darkText sm-phone:block')}>
                  o necesitas ayuda, estamos aquí para ti.
                </p>
              </div>
            </>
            <div className="flex w-full flex-col-reverse items-center justify-between gap-2 xs:flex-row">
              <Link
                className={clsx('group flex items-center gap-1 text-center text-darkText sm-phone:text-start')}
                href="/"
              >
                <div className="relative h-[15px] w-[15px] overflow-hidden">
                  <div className="absolute left-0 top-0 transition-all duration-200 group-hover:left-1">
                    <Arrow color={'#ebe7e0'} backRequest={true} />
                  </div>
                </div>
                Volver al home
              </Link>
              <Link
                className={clsx('text-center text-darkText underline sm-phone:text-start')}
                href="/info/help-center"
              >
                ¡No dudes en contactarnos!
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-between gap-2 px-2 sm-phone:flex-row sm-phone:gap-0">
        {/* <h1 className="text-2xl font-bold text-lightText dark:text-darkText"> */}
        <h1 className="text-2xl font-bold text-lightText dark:text-darkText xs:text-3xl sm-phone:text-2xl">
          Formulario de Solicitud
        </h1>
        <div>
          <Cronometro setBlockAll={setBlockAll} />
        </div>
      </div>
      {steps.map((step, index) => {
        return (
          // <section
          //   key={index}
          //   className={`flex min-h-20 w-full ${(!completedSteps[index] && index !== activeStep) ? 'flex-col' : 'flex-row'} gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight`}
          // >
          <section
            key={index}
            className={clsx(
              completedSteps[index] || index == activeStep ? 'flex-col' : 'flex-row',
              'flex min-h-20 w-full gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight',
            )}
          >
            <div
              className={`w-full justify-between xs-phone:flex md-tablet:relative md-tablet:flex-col ${completedSteps[index] ? 'flex md-tablet:items-end' : 'md-tablet:items-center'} ${
                !completedSteps[index] && index !== activeStep ? 'opacity-50' : ''
              }`}
            >
              {/* <div
              className={`justify-between xs-phone:flex md-tablet:relative md-tablet:${!completedSteps[index] ? 'flex-col' : 'flex-row'} md-tablet:items-center ${
                !completedSteps[index] && index !== activeStep ? 'opacity-50' : ''
              }`}
            > */}
              <h2
                className={`mb-2 ${completedSteps[index] ? 'pr-5 text-left' : 'text-center'} w-full text-xl xs-phone:mb-0 xs-phone:text-left md-tablet:absolute md-tablet:left-0`}
              >
                {step.title}
              </h2>
              {/* Mostrar StepIndicator solo si no está completado y es el paso actual */}
              {activeStep === index && !completedSteps[index] && (
                <StepIndicator currentStep={activeStep} completedSteps={completedSteps} />
              )}
              {/* Mostrar el botón solo para pasos completados o si es el paso anterior al actual */}
              {(index < activeStep || completedSteps[index]) && (
                //saque el justify-end chequear que no sirva al 100%
                <div className={`flex flex-col items-end`}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
                    <Tick color={isDark ? '#414244' : '#FCFBFA'} />
                  </div>
                  {index != activeStep && (
                    <button
                      disabled={blockAll}
                      onClick={() => handleStepClick(index)}
                      className="flex items-center justify-center gap-1 text-base text-lightText underline dark:text-darkText"
                      type="button"
                    >
                      Tratar
                      <ArrowDown />
                    </button>
                  )}
                </div>
              )}
            </div>

            {activeStep === index && <div className="mt-2 rounded-md">{step.component}</div>}
          </section>
        );
      })}
      <div className="flex flex-col items-center gap-4 sm-phone:flex-row sm-phone:justify-between sm-phone:gap-0">
        <button className="text-2xl font-light" onClick={handleCancelRequest} disabled={blockAll}>
          Cancelar esta Solicitud
        </button>
        <button
          disabled={completedSteps[2] == false || blockAll || loading}
          onClick={() => {
            handleSubmit();
            setStop(true);
          }}
          className={`relative h-12 items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-9 py-[3px] font-bold text-white disabled:border-gray-400 disabled:bg-calculatorLight2 disabled:text-lightText dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-calculatorDark2 ${isDark ? completedSteps[2] == true && 'buttonSecondDark' : completedSteps[2] == true && 'buttonSecond'}`}
        >
          {loading ? (
            <div id="loading" className="flex items-center justify-center gap-2">
              <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} />
              <span>Procesando...</span>
            </div>
          ) : (
            'ENVIAR'
          )}
        </button>
      </div>
    </div>
  );
};

export default StepperContainer;
