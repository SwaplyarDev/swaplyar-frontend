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
import InfoStep from '@/components/ui/InfoStep/InfoStep';
// Carga diferida de subcomponentes para reducir el bundle inicial
const StepOne = dynamic(() => import('./steps/StepOne'));
const StepTwo = dynamic(() => import('./steps/StepTwo'));
const StepThree = dynamic(() => import('./steps/StepThree'));
const StepIndicator = dynamic(() => import('./steps/StepIndicator'));
const Cronometro = dynamic(() => import('./Cronometro'), { ssr: false });

type StepperContainerProps = {
  session: Session | null;
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
  const [errorSend, setErrorSend] = useState(false);
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
      if (completedSteps[index] || index === activeStep) {
        setActiveStep(index);
      }
    },
    [completedSteps, activeStep, setActiveStep],
  );

  useEffect(() => {
    return () => {
      setPassFalse();
      try {
        document.cookie = 'requestPass=; Max-Age=0; Path=/; SameSite=Lax';
      } catch { }
    };
  }, [setPassFalse]);

  const handleCancelRequest = useCallback(async () => {
    const Swal = await getSwal();
    const modalHtml = `
      <div class="flex flex-col gap-3 text-[#545454]">
        <h2 class="font-textFont text-2xl font-medium dark:text-darkText">¿Estás seguro de que deseas cancelar esta solicitud?</h2>
        <p class="font-textFont dark:text-darkText">Si cancela esta solicitud, debe generar una nueva solicitud</p>
        <div class="flex flex-col items-center justify-between gap-10 px-[13px] xs-mini-phone:flex-row">
          <div id="back-button-container"></div>
          <div class="flex h-[49px] items-center justify-center">
            <button id="cancel-button" class="${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 flex h-[42px] min-w-[110px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-base text-white dark:border-darkText dark:bg-darkText dark:text-lightText">Cancelar</button>
          </div>
        </div>
      </div>`;
    Swal.fire({
      icon: 'warning',
      html: modalHtml,
      showConfirmButton: false,
      showCancelButton: false,
      background: isDark ? '#252526' : '#ffffff',
      didRender: () => {
        const backElement = document.getElementById('back-button-container');
        if (backElement) {
          backElement.innerHTML = `
            <button id="back-button" type="button" class="group relative m-1 flex h-[46px] min-w-[48px] max-w-[110px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 font-textFont text-lg font-light ${isDark ? 'text-darkText dark:border-darkText' : 'text-buttonsLigth'} hover:bg-transparent">
              <span class="relative h-5 w-5 overflow-hidden inline-flex">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18l-6-6 6-6" stroke="${isDark ? '#ebe7e0' : '#012c8a'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              Volver
            </button>`;
          const backBtn = document.getElementById('back-button');
          backBtn?.addEventListener('click', () => Swal.close());
        }
      },
      didOpen: () => {
        const cancelButton = document.getElementById('cancel-button');
        if (cancelButton) {
          cancelButton.addEventListener('click', async () => {
            setBlockAll(true);
            setStop(true);
            resetToDefault();
            setActiveStep(0);
            setCorrectSend(false);
            setErrorSend(false);
            Swal.close();
            console.log('Solicitud cancelada por el usuario.');

            router.push('/es/inicio/');

            Swal.fire({
              icon: 'error',
              background: '#ffffff00',
              showConfirmButton: false,
              timer: 1000,
            });
          });
        }
      }
    });
  }, [getSwal, isDark, setBlockAll, setStop, resetToDefault, setActiveStep, setCorrectSend, setErrorSend]);

  const handleSubmit = useCallback(async () => {
    if (!selectedSendingSystem || !selectedReceivingSystem) {
      const Swal = await getSwal();
      Swal.fire({ icon: 'error', text: 'Selecciona sistemas de envío y recepción antes de continuar.' });
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
        const Swal = await getSwal();
        Swal.fire({ icon: 'success', background: '#ffffff00', showConfirmButton: false, timer: 1000 });
        setBlockAll(true);
        setCorrectSend(true);
        setErrorSend(false);
        setErrorMessage(null);
        window.scrollTo({ top: 0 });
      }
    } catch (error: any) {
      setErrorSend(true);
      setErrorMessage(error.message || 'Error desconocido en el envío.');
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
                href="/es/centro-de-ayuda"
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
              {errorMessage && (
                <p className="w-full text-center font-textFont text-darkText">
                  {errorMessage}
                </p>
              )}
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
              'relative flex min-h-20 w-full gap-2 rounded-2xl bg-calculatorDark p-3 sm:p-4 md:p-5 dark:bg-calculatorLight',
            )}
          >
            <div
              className={`relative w-full justify-between flex  ${!completedSteps[index] && index !== activeStep ? 'opacity-50' : ''
                }`}
            >
              <div
                className="flex w-full justify-start"
              >
                <h2
                  className='flex max-w-[260px] flex-col items-start justify-end w-full font-textFont text-2xl sm:text-3xl sm:text-left'
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
              <div className='flex flex-col gap-1 justify-between'>
                <div className={`flex justify-end ${completedSteps[index] ? 'hidden' : ''}`}>
                  <InfoStep option="pix" />
                </div>
                {activeStep === index && !completedSteps[index] && (
                  <StepIndicator currentStep={activeStep} completedSteps={completedSteps} className="w-5 h-5 sm:w-[30px] sm:h-[30px]" />
                )}
              </div>
              {(index < activeStep || completedSteps[index]) && (
                <div className='flex flex-col justify-start gap-1'>
                  <div className={`flex justify-end ${!completedSteps[index] ? 'hidden' : ''}`}>
                    <InfoStep option="pix" />
                  </div>
                  <div className='flex flex-col items-end mb-2'>                    
                    <div className="flex h-5 w-5 sm:h-[30px] sm:w-[30px] items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
                      <Tick color={isDark ? '#414244' : '#FCFBFA'} className='h-3 w-3 sm:h-5 sm:w-5' />
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
                </div>
              )}
            </div>
            {activeStep === index && <div>{step.render()}</div>}
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
