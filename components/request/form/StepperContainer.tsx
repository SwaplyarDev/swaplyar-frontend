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
import { alertaSirena, alertaSirenaDark } from '@/utils/assets/imgDatabaseCloudinary';

const StepperContainer = () => {
  const { activeStep, completedSteps, setActiveStep, submitAllData } = useStepperStore();
  const [blockAll, setBlockAll] = useState(false);

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
      router.push('/home');
    }
  }, [pass, router]);

  const handleCancelRequest = () => {
    Swal.fire({
      title: '<h2>¿Estás seguro de que deseas cancelar esta solicitud?</h2>',
      imageUrl: !isDark ? alertaSirena : alertaSirenaDark,
      imageWidth: 100,
      imageHeight: 100,
      html: `<div class="flex flex-col gap-5">
      <p class="text-base font-light font-roboto">
        Si cancela esta solicitud, debe generar una nueva solicitud
      </p>
      <div class="flex xs-mini-phone:flex-row flex-col justify-between items-center mt-5 gap-10 px-[13px]">
        <div id="back-button-container"></div>
        <div class="h-[49px] flex items-center justify-center">   
          <button id="cancel-button" class="m-1 text-base h-[42px] min-w-[110px] flex relative items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}">
            Cancelar
          </button>
        </div>
      </div>
    </div>`,
      customClass: {
        image: 'swal-custom-image',
        popup: 'my-popup',
      },
      width: '400px',
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
  return (
    <div
      className={clsx(
        'flex w-full max-w-[800px] flex-col gap-5',
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
                <h2 className="w-full text-center font-textFont text-3xl font-bold text-darkText sm-phone:text-end">
                  Solicitud enviada con exito
                </h2>
              </>
            ) : (
              <>
                {isStopped ? (
                  <h2
                    className={clsx(
                      'w-full text-center font-textFont text-3xl font-bold sm-phone:text-end',
                      isDark ? 'text-darkText' : 'text-[#252526]',
                    )}
                  >
                    Tiempo agotado
                  </h2>
                ) : (
                  <h2 className="w-full text-center font-textFont text-3xl font-bold text-darkText sm-phone:text-end">
                    Solicitud cancelada
                  </h2>
                )}
                {isStopped ? (
                  <>
                    <p
                      className={clsx(
                        'w-full text-center font-textFont sm-phone:hidden',
                        isDark ? 'text-darkText' : 'text-[#252526]',
                      )}
                    >
                      Tu tiempo se agoto pero puedes crear una nueva, y si tienes alguna pregunta o necesitas ayuda,
                      estamos aquí para ti.
                    </p>
                    <div className="w-full">
                      <p
                        className={clsx(
                          'hidden w-full text-end font-textFont sm-phone:block',
                          isDark ? 'text-darkText' : 'text-[#252526]',
                        )}
                      >
                        Tu tiempo se agoto pero puedes crear una nueva, y si tienes alguna pregunta
                      </p>
                      <p
                        className={clsx(
                          'hidden w-full text-end font-textFont sm-phone:block',
                          isDark ? 'text-darkText' : 'text-[#252526]',
                        )}
                      >
                        o necesitas ayuda, estamos aquí para ti.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="w-full text-center font-textFont text-darkText sm-phone:hidden">
                      Puedes crear una nueva, y si tienes alguna pregunta o necesitas ayuda, estamos aquí para ti.
                    </p>
                    <div className="w-full">
                      <p className="hidden w-full text-end font-textFont text-darkText sm-phone:block">
                        Puedes crear una nueva, y si tienes alguna pregunta
                      </p>
                      <p className="hidden w-full text-end font-textFont text-darkText sm-phone:block">
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
                  'text-center font-textFont underline sm-phone:text-start',
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
            <h2 className="w-full text-center font-textFont text-3xl font-bold text-darkText sm-phone:text-end">
              Error en la solicitud
            </h2>
            <>
              <p className={clsx('w-full text-center font-textFont text-darkText sm-phone:hidden')}>
                Si el problema persiste, vuelve a intentarlo más tarde y si tienes alguna pregunta o necesitas ayuda,
                estamos aquí para ti.
              </p>
              <div className="w-full">
                <p className={clsx('hidden w-full text-end font-textFont text-darkText sm-phone:block')}>
                  Si el problema persiste, vuelve a intentarlo más tarde y si tienes alguna pregunta
                </p>
                <p className={clsx('hidden w-full text-end font-textFont text-darkText sm-phone:block')}>
                  o necesitas ayuda, estamos aquí para ti.
                </p>
              </div>
            </>
            <div className="flex w-full flex-col-reverse items-center justify-between gap-2 xs:flex-row">
              <Link
                className={clsx(
                  'group flex items-center gap-1 text-center font-textFont text-darkText sm-phone:text-start',
                )}
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
                className={clsx('text-center font-textFont text-darkText underline sm-phone:text-start')}
                href="/info/help-center"
              >
                ¡No dudes en contactarnos!
              </Link>
            </div>
          </div>
        </div>
      )}
      <h1 className="w-full text-center font-titleFont text-[40px]/[120%] font-medium text-lightText dark:text-darkText">
        Formulario de Solicitud
      </h1>
      <div className="flex flex-col items-center justify-end px-2 sm-phone:flex-row sm-phone:gap-0">
        <Cronometro setBlockAll={setBlockAll} />
      </div>
      {steps.map((step, index) => {
        return (
          <section
            key={index}
            className={clsx(
              completedSteps[index] || index == activeStep ? 'flex-col' : 'flex-row',
              'relative flex min-h-20 w-full gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight',
            )}
          >
            <div
              className={`relative w-full justify-between sm:flex ${completedSteps[index] ? 'flex md-tablet:items-start' : 'flex-col items-center'} ${
                !completedSteps[index] && index !== activeStep ? 'opacity-50' : ''
              }`}
            >
              <div
                className={clsx(
                  activeStep === index && completedSteps[index]
                    ? 'mb-2 flex w-full items-center justify-start pr-8 sm:mb-0 sm:block'
                    : activeStep === index && !completedSteps[index]
                      ? 'flex w-full justify-center sm:justify-start'
                      : 'flex w-full justify-start',
                )}
              >
                <h2
                  className={`${activeStep != index || activeStep == 0 || activeStep == 2 ? 'top-0 md-tablet:absolute' : 'flex max-w-[260px] flex-col items-center justify-center sm:block'} ${activeStep === index && completedSteps[index] && 'text-start'} ${completedSteps[index] && activeStep != index && 'mr-[60px]'} ${completedSteps[index] || (activeStep != index && 'pr-8')} mb-2 ${completedSteps[index] || activeStep != index ? 'text-left' : 'text-center'} ${activeStep != index ? 'text-left' : 'text-center'} w-full font-textFont text-4xl xs-phone:mb-0 sm:text-left md-tablet:left-0 ${activeStep !== index && 'relative'}`}
                >
                  {activeStep === 1 && !completedSteps[1]
                    ? step.title.split('del').map((part, index) => (
                        <span key={index} className={index === 1 ? 'block' : ''}>
                          {index === 1 ? 'del' + part : part}
                        </span>
                      ))
                    : step.title}
                </h2>
              </div>
              {activeStep === index && !completedSteps[index] && (
                <StepIndicator currentStep={activeStep} completedSteps={completedSteps} />
              )}
              {(index < activeStep || completedSteps[index]) && (
                <div
                  className={`absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-end justify-between sm:relative sm:translate-y-0`}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
                    <Tick color={isDark ? '#414244' : '#FCFBFA'} />
                  </div>
                  {index != activeStep && (
                    <button
                      disabled={blockAll}
                      onClick={() => handleStepClick(index)}
                      className="flex items-center justify-center gap-1 font-textFont text-base text-lightText underline dark:text-darkText"
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
        <button
          className="font-textFont text-base transition-all hover:text-buttonsLigth dark:hover:text-darkText dark:hover:underline"
          onClick={handleCancelRequest}
          disabled={blockAll}
        >
          Cancelar esta Solicitud
        </button>
        {loading ? (
          <div id="loading" className="flex w-full max-w-[200px] items-center justify-center gap-2">
            <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="56px" />
          </div>
        ) : (
          <button
            disabled={completedSteps[2] == false || blockAll || loading}
            onClick={() => {
              handleSubmit();
              setStop(true);
            }}
            className={`relative h-[60px] w-full max-w-[200px] items-center justify-center rounded-full border border-buttonsLigth bg-buttonsLigth px-9 py-[3px] font-titleFont text-2xl font-semibold text-darkText disabled:border-calculatorLight2 disabled:bg-custom-blue-300 disabled:text-darkText dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-calculatorLight2 dark:disabled:text-darkText ${isDark ? completedSteps[2] == true && 'buttonSecondDark' : completedSteps[2] == true && 'buttonSecond'}`}
          >
            Enviar
          </button>
        )}
      </div>
    </div>
  );
};

export default StepperContainer;
