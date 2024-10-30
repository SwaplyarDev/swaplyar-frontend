import { useStepperStore } from '@/store/stateStepperStore';
import React from 'react';
import RealStepOne from './realSteps/RealStepOne';
import RealStepTwo from './realSteps/RealStepTwo';
import RealStepThree from './realSteps/RealStepThree';
import StepIndicator from './realSteps/StepIndicator';

const StepperRequestForm = () => {
  const { activeStep, completedSteps, setActiveStep } = useStepperStore();

  const steps = [
    { title: 'Mis Datos', component: <RealStepOne /> },
    { title: 'Información del Destinatario', component: <RealStepTwo /> },
    { title: 'Pago', component: <RealStepThree /> },
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
      {steps.map((step, index) => (
        <section
          key={index}
          className="flex min-h-20 w-full flex-col gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight"
        >
          <div
            className={`cursor-pointer justify-between xs-phone:flex md-tablet:relative md-tablet:flex-col md-tablet:items-center ${!completedSteps[index] && index !== activeStep ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={() => handleStepClick(index)}
          >
            <h2 className="mb-2 text-center text-xl xs-phone:mb-0 xs-phone:text-left md-tablet:absolute md-tablet:left-0">{step.title}</h2>
            <StepIndicator
              currentStep={activeStep}
              completedSteps={completedSteps}
            />
          </div>

          {activeStep === index && (
            <div className="mt-2 rounded-md bg-gray-900 p-4">
              {step.component}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default StepperRequestForm;
