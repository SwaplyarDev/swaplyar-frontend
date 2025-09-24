'use client';

import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

import { useStepperStore } from '@/store/stateStepperStore';
import { useSystemStore } from '@/store/useSystemStore';
import useWalletStore from '@/store/useWalletStore';
import { StepTwoData } from '@/types/transactions/stepperStoretypes';

// Carga diferida de los sub-formularios
const StepTwoBank = dynamic(() => import('./stepsTwoOptions/StepTwoBank'));
const StepTwoPayoneer = dynamic(() => import('./stepsTwoOptions/StepTwoPayoneer'));
const StepTwoPaypal = dynamic(() => import('./stepsTwoOptions/StepTwoPaypal'));
const StepTwoWise = dynamic(() => import('./stepsTwoOptions/StepTwoWise'));
const StepTwoTether = dynamic(() => import('./stepsTwoOptions/StepTwoTether'));
const StepTwoPix = dynamic(() => import('./stepsTwoOptions/StepTwoPix'));
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const StepTwo = ({ blockAll }: { blockAll: boolean }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<StepTwoData>({ mode: 'onChange' });

  const { markStepAsCompleted, setActiveStep, formData, updateFormData, completedSteps } = useStepperStore();
  const { selectedReceivingSystem } = useSystemStore();
  const { selectedWallet } = useWalletStore();
  const { isDark } = useDarkTheme();

  // --- LÓGICA CORREGIDA PARA RELLENAR EL FORMULARIO ---
  useEffect(() => {
    // 1. Limpiamos el formulario y lo inicializamos con datos guardados del stepper (si existen)
    reset(formData.stepTwo || {});

    // 2. Obtenemos el objeto de detalle de la billetera seleccionada de forma segura
    const detail = selectedWallet?.details?.[0];

    // 3. Si no hay una billetera seleccionada, manejamos el caso de "cuenta propia"
    if (!detail) {
      if (formData.stepOne?.own_account === 'Si' || formData.stepOne?.own_account === 'true') {
        setValue('receiver_first_name', formData.stepOne.first_name, { shouldValidate: true });
        setValue('receiver_last_name', formData.stepOne.last_name, { shouldValidate: true });
      }
      return; // Salimos si no hay billetera seleccionada
    }

    // 4. Si hay una billetera, rellenamos los campos desde el objeto 'detail'
    setValue('receiver_first_name', detail.firstName || '', { shouldValidate: true });
    setValue('receiver_last_name', detail.lastName || '', { shouldValidate: true });

    switch (selectedWallet.type) {
      case 'bank':
        setValue('transfer_identification', detail.sendMethodValue || '', { shouldValidate: true });
        setValue('re_transfer_identification', detail.sendMethodValue || '', { shouldValidate: true });
        setValue('tax_identification', detail.documentValue || '', { shouldValidate: true });
        setValue('name_of_bank', detail.bankName || '', { shouldValidate: true });
        break;

      case 'virtual_bank':
        setValue('bank_email', detail.emailAccount || '', { shouldValidate: true });
        setValue('re_enter_bank_email', detail.emailAccount || '', { shouldValidate: true });
        break;

      case 'receiver_crypto':
        setValue('usdt_direction', detail.wallet || '', { shouldValidate: true });
        setValue('re_enter_usdt_direction', detail.wallet || '', { shouldValidate: true });
        setValue('red_selection', {
          value: detail.network || '',
          label: detail.network?.toUpperCase() || '',
          image: <></>, // Puedes dejar esto o quitarlo si no lo usas
        });
        break;

      case 'pix':
        setValue('pixId', detail.pixKey || '', { shouldValidate: true });
        setValue('pixKey', detail.pixValue || '', { shouldValidate: true });
        setValue('individual_tax_id', detail.cpf || '', { shouldValidate: true });
        break;
    }
  }, [selectedWallet, formData.stepOne, setValue, reset]);

  const onSubmit = (data: StepTwoData) => {
    updateFormData(1, data);
    markStepAsCompleted(1);
    setActiveStep(2);
  };

  const renderSelectedSystem = () => {
    switch (selectedReceivingSystem?.id) {
      case 'bank':
        return (
          <StepTwoBank
            register={register}
            errors={errors}
            getValues={getValues}
            blockAll={blockAll}
            formData={formData}
            formValues={watch()}
            watch={watch}
          />
        );
      case 'payoneer_usd':
      case 'payoneer_eur':
        return (
          <StepTwoPayoneer
            register={register}
            errors={errors}
            getValues={getValues}
            blockAll={blockAll}
            formData={formData}
            watch={watch}
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
            watch={watch}
          />
        );
      case 'wise_usd':
      case 'wise_eur':
        return (
          <StepTwoWise
            register={register}
            errors={errors}
            getValues={getValues}
            blockAll={blockAll}
            formData={formData}
            watch={watch}
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
            watch={watch}
            completedSteps={completedSteps}
          />
        );
      case 'pix':
        return (
          <StepTwoPix
            register={register}
            errors={errors}
            getValues={getValues}
            blockAll={blockAll}
            formData={formData}
            watch={watch}
            completedSteps={completedSteps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {renderSelectedSystem()}

      <div className="flex justify-center sm-phone:justify-end">
        {completedSteps[1] ? (
          // El botón cambia a "Editar" si el paso ya está completado
          <button
            className="flex items-center justify-center gap-1 font-textFont text-base text-lightText underline dark:text-darkText"
            type="submit"
            disabled={blockAll}
          >
            Editar
          </button>
        ) : (
          <button
            type="submit"
            className={`flex h-[46px] w-full max-w-[300px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[18px] font-titleFont text-base font-semibold text-white disabled:border-gray-400 disabled:bg-custom-blue-300 disabled:text-darkText dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-calculatorDark2 dark:disabled:text-darkText ${isDark ? isValid && 'buttonSecondDark' : isValid && 'buttonSecond'}`}
            disabled={!isValid || blockAll}
          >
            Siguiente
          </button>
        )}
      </div>
    </form>
  );
};

export default memo(StepTwo);
