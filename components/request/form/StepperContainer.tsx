'use client';
import { useStepperStore } from '@/store/stateStepperStore';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepIndicator from './steps/StepIndicator';
import Tick from '@/components/ui/Tick/Tick';
import ArrowDown from '@/components/ui/ArrowDown/ArrowDown';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Swal from 'sweetalert2';
import { createRoot } from 'react-dom/client';
import Arrow from '@/components/ui/Arrow/Arrow';
import { useRouter } from 'next/navigation';
import { set } from 'react-hook-form';
import { useState } from 'react';

const StepperContainer = () => {
  const { activeStep, completedSteps, setActiveStep } = useStepperStore();
  const [ blockAll , setBlockAll ] = useState(false);
  const navigation = useRouter();

  const steps = [
    { title: 'Mis Datos', component: <StepOne blockAll={blockAll}/> },
    { title: 'Información del Destinatario', component: <StepTwo blockAll={blockAll}/> },
    { title: 'Pago', component: <StepThree blockAll={blockAll}/> },
  ];

  const handleStepClick = (index: number) => {
    if (completedSteps[index] || index === activeStep) {
      setActiveStep(index);
    }
  };
  const { isDark } = useDarkTheme();

  const handleCancelRequest = () => {
    Swal.fire({
      title:
        '<h2 style="font-size: 24px;">¿Estás seguro de que deseas cancelar esta solicitud?</h2>',
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
              <Arrow
                color={isDark ? '#ebe7e0' : '#012c8a'}
                backRequest={true}
              />
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
            Swal.close();
          });
        }
      },
    });
  };

  return (
    <div className="flex w-full max-w-[1000px] flex-col gap-5">
      <div className="flex justify-between px-2">
        <h1 className="text-2xl font-bold text-lightText dark:text-darkText">
          Formulario de Solicitud
        </h1>
        <div>
          <p>Tiempo Restante</p>
        </div>
      </div>
      {steps.map((step, index) => {
        return (
          <section
            key={index}
            className="flex min-h-20 w-full flex-col gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight"
          >
            <div
              className={`justify-between xs-phone:flex md-tablet:relative md-tablet:flex-col md-tablet:items-center ${
                !completedSteps[index] && index !== activeStep
                  ? 'opacity-50'
                  : ''
              }`}
            >
              <h2 className="mb-2 text-center text-xl xs-phone:mb-0 xs-phone:text-left md-tablet:absolute md-tablet:left-0">
                {step.title}
              </h2>
              {/* Mostrar StepIndicator solo si no está completado y es el paso actual */}
              {activeStep === index && !completedSteps[index] && (
                <StepIndicator
                  currentStep={activeStep}
                  completedSteps={completedSteps}
                />
              )}
              {/* Mostrar el botón solo para pasos completados o si es el paso anterior al actual */}
              {(index < activeStep || completedSteps[index]) && (
                <div className="flex w-full flex-col items-end justify-end">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
                    <Tick />
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

            {activeStep === index && (
              <div className="mt-2 rounded-md">{step.component}</div>
            )}
          </section>
        );
      })}
      <div className="flex flex-col items-center gap-4 sm-phone:flex-row sm-phone:justify-between sm-phone:gap-0">
        <button className="text-2xl font-light" onClick={handleCancelRequest} disabled={blockAll}>
          Cancelar esta Solicitud
        </button>
        <button
          disabled={completedSteps[2] == false || blockAll}
          className={`h-12 relative items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-9 py-[3px] font-bold text-white disabled:border-gray-400 disabled:bg-calculatorLight2 disabled:text-lightText dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-calculatorDark2 ${isDark ? completedSteps[2] == true && 'buttonSecondDark' : completedSteps[2] == true && 'buttonSecond'}`}
        >
          ENVIAR
        </button>
      </div>
    </div>
  );
};

export default StepperContainer;
