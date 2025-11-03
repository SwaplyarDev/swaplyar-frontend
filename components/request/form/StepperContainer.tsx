'use client';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { useStepperStore } from '@/store/stateStepperStore';
import dynamic from 'next/dynamic';
import ArrowDown from '@/components/ui/ArrowDown/ArrowDown';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Arrow from '@/components/ui/Arrow/Arrow';
import clsx from 'clsx';
import Link from 'next/link';
import { useSystemStore } from '@/store/useSystemStore';
import Tick from '@/components/ui/Tick/Tick';
import useChronometerState from '@/store/chronometerStore';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { useRewardsStore } from '@/store/useRewardsStore';
import useControlRouteRequestStore from '@/store/controlRouteRequestStore';
import { shallow } from 'zustand/shallow';
import type { Session } from 'next-auth';
import AuthButton from '@/components/auth/AuthButton';
import { useRouter } from 'next/navigation'
import PopUp from '@/components/ui/PopUp/PopUp';
// Carga diferida de subcomponentes para reducir el bundle inicial
const StepOne = dynamic(() => import('./steps/StepOne'));
const StepTwo = dynamic(() => import('./steps/StepTwo'));
const StepThree = dynamic(() => import('./steps/StepThree'));
const StepIndicator = dynamic(() => import('./steps/StepIndicator'));
const Cronometro = dynamic(() => import('./Cronometro'), { ssr: false });

type StepperContainerProps = {
  session: Session | null; // Asegúrate de que el tipo sea correcto según tu configuración de next-auth
};
const StepperContainer = ({ session }: StepperContainerProps) => {
  const { activeStep, completedSteps, setActiveStep, submitAllData, resetToDefault } = useStepperStore(
    (s) => ({
      activeStep: s.activeStep,
      completedSteps: s.completedSteps,
      setActiveStep: s.setActiveStep,
      submitAllData: s.submitAllData,
      resetToDefault: s.resetToDefault,
    }),
    shallow,
  );
  const { discounts_ids } = useRewardsStore((s) => ({ discounts_ids: s.discounts_ids }), shallow);
  const [blockAll, setBlockAll] = useState(false);
  const { isStopped, setStop } = useChronometerState((s) => ({ isStopped: s.isStopped, setStop: s.setStop }), shallow);
  const [correctSend, setCorrectSend] = useState(false);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore(
    (s) => ({ selectedSendingSystem: s.selectedSendingSystem, selectedReceivingSystem: s.selectedReceivingSystem }),
    shallow,
  );
  const [loading, setLoading] = useState(false);
  const { isDark } = useDarkTheme();
  const { setPassFalse } = useControlRouteRequestStore((s) => ({ setPassFalse: s.setPassFalse }));

  const getSwal = useCallback(async () => (await import('sweetalert2')).default, []);

  const steps = useMemo(
    () => [
      { title: 'Mis Datos', render: () => <StepOne blockAll={blockAll} /> },
      { title: 'Información del Destinatario', render: () => <StepTwo blockAll={blockAll} /> },
      { title: 'Pago', render: () => <StepThree blockAll={blockAll} /> },
    ],
    [blockAll],
  );

  const handleStepClick = useCallback(
    (index: number) => {
      // No necesitas el tipado 'number' si el archivo es .jsx
      if (completedSteps[index] || index === activeStep) {
        setActiveStep(index);
      }
    },
    [completedSteps, activeStep, setActiveStep],
  );

  useEffect(() => {
    // Este useEffect se queda porque su responsabilidad es otra (limpiar cookies)
    return () => {
      setPassFalse();
      try {
        document.cookie = 'requestPass=; Max-Age=0; Path=/; SameSite=Lax';
      } catch { }
    };
  }, [setPassFalse]);

  /* 

             */

  const handleCancelRequest = useCallback(async () => {
    PopUp({
      variant: 'warning-with-cancel',
      title: '¿Estás seguro de que deseas cancelar esta solicitud?',
      text: 'Si cancela esta solicitud, debera generar una nueva solicitud',
      isDark,
      actionButton: {
        text: 'Cancelar',
        style: 'cancel',
        onClick: () => {
          setBlockAll(true);
          setStop(true);
          resetToDefault();
          setActiveStep(0);
          setCorrectSend(false);
          console.log('Solicitud cancelada por el usuario.');

          // 🔹 Redirección a la pantalla de inicio
          router.push('/es/inicio/');
        }
      }
    });
  }, [getSwal, isDark, setBlockAll, setStop, resetToDefault, setActiveStep, setCorrectSend]);

  const handleSubmit = useCallback(async () => {
    if (!selectedSendingSystem || !selectedReceivingSystem) {
      PopUp({
        variant: 'simple-warning',
        title: 'Selecciona sistemas de envío y recepción antes de continuar.',
        isDark
      });
      return;
    }
    setLoading(true);
    try {
      const isSuccess = await submitAllData(
        selectedSendingSystem,
        selectedReceivingSystem,
        session?.accessToken,
        discounts_ids,
      );

      if (isSuccess) {
        PopUp({
          variant: 'success-compact',
          title: 'Solicitud enviada con Éxito',
          text: 'Felicitaciones su solicitud fue enviada con éxito, puedes realizar un seguimiento del mismo en la sección de <strong>Centro de Ayuda - Buscar Solicitud</strong> e introduzca los datos solicitados',
          isHtml: true,
          isVertical: true,
          isDark
        });
        setBlockAll(true);
        setCorrectSend(true);
        setErrorMessage(null);
        window.scrollTo({ top: 0 });

         resetToDefault();
      }
    } catch (error: any) {
      // Capturamos mensaje real del error lanzado en el store
      PopUp({
        variant: 'simple-error',
        title: `Hubo un problema al enviar su solicitud. Por favor, inténtelo de nuevo más tarde. ${error.message || `Error desconocido en el envío.`}`,
        isDark: isDark,
      });
      console.error('Error en el proceso de envío:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedSendingSystem, selectedReceivingSystem, submitAllData, session?.accessToken, discounts_ids, getSwal]);

  const onSendClick = useCallback(() => {
    setStop(true);
    if (!loading) void handleSubmit();
  }, [setStop, loading, handleSubmit]);

  return (
    <div
      className={clsx(
        'flex w-full max-w-[800px] flex-col gap-5',
        correctSend && 'mt-48 xs:mt-32',
        (blockAll) && 'mt-72 xs:mt-52',
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
                href="/es/centro-de-ayuda"
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
              className={`relative w-full justify-between sm:flex ${completedSteps[index] ? 'flex md-tablet:items-start' : 'flex-col items-center'} ${!completedSteps[index] && index !== activeStep ? 'opacity-50' : ''
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

            {activeStep === index && <div className="mt-2 rounded-md">{step.render()}</div>}
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

        <AuthButton
          label="Enviar"
          onClick={onSendClick}
          isDark={isDark}
          loading={loading}
          disabled={!completedSteps[2] || blockAll || loading}
          className="w-full max-w-[260px] h-[60px] text-4xl font-semibold" // tamaño más grande
        />
      </div>
    </div>
  );
};

export default StepperContainer;
