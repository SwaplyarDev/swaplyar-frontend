'use client';
import { useStepperStore } from '@/store/stateStepperStore';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepIndicator from './steps/StepIndicator';
import Tick from '@/components/ui/Tick/Tick';
import ArrowDown from '@/components/ui/ArrowDown/ArrowDown';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const StepperContainer = () => {
  const { activeStep, completedSteps, setActiveStep } = useStepperStore();

  const steps = [
    { title: 'Mis Datos', component: <StepOne /> },
    { title: 'Información del Destinatario', component: <StepTwo /> },
    { title: 'Pago', component: <StepThree /> },
  ];

  const handleStepClick = (index: number) => {
    if (completedSteps[index] || index === activeStep) {
      setActiveStep(index);
    }
  };
  const { isDark } = useDarkTheme();

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
        <button className="text-2xl font-light">Cancelar esta Solicitud</button>
        <button
          disabled={completedSteps[2] == false}
          className={`relative items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-9 py-[3px] font-bold text-white disabled:border-gray-400 disabled:bg-calculatorLight2 disabled:text-lightText dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-calculatorDark2 ${isDark ? completedSteps[2] == true && 'buttonSecondDark' : completedSteps[2] == true &&'buttonSecond'}`}
        >
          ENVIAR
        </button>
      </div>
    </div>
  );
};

export default StepperContainer;
