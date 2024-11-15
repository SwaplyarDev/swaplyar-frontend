import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useSystemStore } from '@/store/useSystemStore';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';
import { error } from 'console';
import StepTwoBank from './stepsTwoOptions/StepTwoBank';
import StepTwoPayoneer from './stepsTwoOptions/StepTwoPayoneer';
import StepTwoPaypal from './stepsTwoOptions/StepTwoPaypal';
import StepTwoWise from './stepsTwoOptions/StepTwoWise';
import StepTwoTether from './stepsTwoOptions/StepTwoTether';

interface FormData {
  receiver_first_name: string;
  receiver_last_name: string;
  tax_identification: string;
  transfer_identification: string;
  re_transfer_identification: string;
  name_of_bank: string;
  bank_email: string;
  re_enter_bank_email: string;
}

const StepTwo = ({ blockAll }: { blockAll: boolean }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm<FormData>({ mode: 'onChange' });
  const {
    markStepAsCompleted,
    setActiveStep,
    formData,
    updateFormData,
    completedSteps,
  } = useStepperStore();
  const { selectedReceivingSystem, selectedSendingSystem } = useSystemStore();
  const { isDark } = useDarkTheme();

  // Estado para guardar los valores iniciales
  const [initialValues, setInitialValues] = useState<FormData | null>(null);

  // Observar cambios en los inputs
  const formValues = useWatch({ control });

  useEffect(() => {
    const {
      receiver_first_name,
      receiver_last_name,
      tax_identification,
      transfer_identification,
      re_transfer_identification,
      name_of_bank,
      bank_email,
      re_enter_bank_email,
    } = formData.stepTwo;
    const newValues = {
      receiver_first_name,
      receiver_last_name,
      tax_identification,
      transfer_identification,
      re_transfer_identification,
      name_of_bank,
      bank_email,
      re_enter_bank_email,
    };

    setValue(
      'receiver_first_name',
      formData.stepOne?.own_account === 'Si'
        ? formData.stepOne?.sender_first_name
        : receiver_first_name,
    );
    setValue(
      'receiver_last_name',
      formData.stepOne?.own_account === 'Si'
        ? formData.stepOne?.sender_last_name
        : receiver_last_name,
    );
    setValue('tax_identification', tax_identification);
    setValue('transfer_identification', transfer_identification);
    setValue('re_transfer_identification', re_transfer_identification);
    setValue('name_of_bank', name_of_bank);
    setValue('bank_email', bank_email);
    setValue('re_enter_bank_email', re_enter_bank_email);

    // Guardar los valores iniciales al montar el componente
    setInitialValues(newValues);
    console.log(newValues);
  }, [
    formData.stepTwo,
    setValue,
    formData.stepOne?.own_account,
    formData.stepOne?.sender_first_name,
    formData.stepOne?.sender_last_name,
  ]);

  const onSubmit = (data: FormData) => {
    updateFormData(1, data); // Actualiza los datos del formulario en Zustand
    markStepAsCompleted(1); // Marcar este paso como completado
    setActiveStep(2); // Ir al siguiente paso
  };

  // Determinar si se han hecho cambios en el formulario
  const hasChanges =
    initialValues &&
    !Object.keys(initialValues).every(
      (key) =>
        initialValues[key as keyof FormData] ===
        formValues[key as keyof FormData],
    );

  // const fullName = selectedReceivingSystem?.name;
  // const firstPart = fullName ? fullName.split(' ')[0] : '';

  const renderSelectedSystem = () => {
    switch (selectedReceivingSystem?.id) {
      case 'bank':
        return (
          // <StepTwoBank
          //   register={register}
          //   errors={errors}
          //   getValues={getValues}
          //   blockAll={blockAll}
          //   formData={formData}
          // />
          <StepTwoTether
          register={register}
          errors={errors}
          getValues={getValues}
          blockAll={blockAll}
          formData={formData}
          control={control}
        />
        );
      case 'payoneer':
        return (
          <StepTwoPayoneer
            register={register}
            errors={errors}
            getValues={getValues}
            blockAll={blockAll}
            formData={formData}
          />
        );
      case 'paypal':
        return (
          <StepTwoPaypal
            register={register}
            errors={errors}
            getValues={getValues}
            blockAll={blockAll}
            formData={formData}
          />
        );
      case 'wise':
        return (
          <StepTwoWise
            register={register}
            errors={errors}
            getValues={getValues}
            blockAll={blockAll}
            formData={formData}
          />
        );
      case 'tether':
        return (
          <StepTwoTether
            register={register}
            errors={errors}
            getValues={getValues}
            blockAll={blockAll}
            formData={formData}
            control={control}
          />
        )
      default:
        return '';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      {renderSelectedSystem()}

      <div className="flex justify-end">
        {completedSteps[1] ? (
          hasChanges ? (
            <button
              type="submit"
              className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[14px] text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
              disabled={!isValid || blockAll}
            >
              Siguiente
            </button>
          ) : (
            <button
              className="flex items-center justify-center gap-1 text-base text-lightText underline dark:text-darkText"
              type="submit"
              disabled={blockAll}
            >
              Tratar
              <ArrowUp />
            </button>
          )
        ) : (
          <button
            type="submit"
            className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[14px] text-sm font-bold text-white disabled:border-gray-400 disabled:bg-calculatorLight2 disabled:text-lightText dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-calculatorDark2 ${isDark ? isValid && 'buttonSecondDark' : isValid && 'buttonSecond'}`}
            disabled={!isValid || blockAll}
          >
            Siguiente
          </button>
        )}
      </div>
    </form>
  );
};

export default StepTwo;
