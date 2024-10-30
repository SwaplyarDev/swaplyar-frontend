'use client';
import { useStepperStore } from '@/store/stateStepperStore';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepIndicator from './realSteps/StepIndicator';
import Tick from '@/components/ui/Tick/Tick';
import ArrowDown from '@/components/ui/ArrowDown/ArrowDown';

const StepperContainer = () => {
  const { activeStep, completedSteps, setActiveStep } = useStepperStore();

  const steps = [
    { title: 'Paso 1: Mis Datos', component: <StepOne /> },
    { title: 'Paso 2: Información del Destinatario', component: <StepTwo /> },
    { title: 'Paso 3: Pago', component: <StepThree /> },
  ];

  const handleStepClick = (index: number) => {
    if (completedSteps[index] || index === activeStep) {
      setActiveStep(index);
    }
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
        console.log(completedSteps[index]);
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
    </div>
  );
};

export default StepperContainer;
