'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

import { useStepperStore } from '@/store/stateStepperStore';
import { useSystemStore } from '@/store/useSystemStore';
import useWalletStore from '@/store/useWalletStore';
import { StepTwoData } from '@/types/transactions/stepperStoretypes';
import clsx from 'clsx';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import AuthButton from '@/components/auth/AuthButton';
import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';

// Carga diferida de los sub-formularios
const StepTwoBank = dynamic(() => import('./stepsTwoOptions/StepTwoBank'));
const StepTwoPayoneer = dynamic(() => import('./stepsTwoOptions/StepTwoPayoneer'));
const StepTwoPaypal = dynamic(() => import('./stepsTwoOptions/StepTwoPaypal'));
const StepTwoWise = dynamic(() => import('./stepsTwoOptions/StepTwoWise'));
const StepTwoTether = dynamic(() => import('./stepsTwoOptions/StepTwoTether'));
const StepTwoPix = dynamic(() => import('./stepsTwoOptions/StepTwoPix'));

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
  //agregué el useState para initialValues
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<StepTwoData | null>(null);
  // --- LÓGICA CORREGIDA PARA RELLENAR EL FORMULARIO ---
  useEffect(() => {
    // 1. Limpiamos el formulario y lo inicializamos con datos guardados del stepper (si existen) y guardamos initial values
    reset(formData.stepTwo || {});
    setInitialValues(formData.stepTwo || {});
    // 2. Obtenemos el objeto de detalle de la billetera seleccionada de forma segura
    const detail = selectedWallet?.details?.[0];

    // 3. Si no hay una billetera seleccionada, manejamos el caso de "cuenta propia"
    if (!detail) {
      if (formData.stepOne?.own_account === 'SI') {
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
  }, [selectedWallet, formData.stepOne, setValue, reset, formData.stepTwo]);

  // 🔹 Deep comparison para detectar cambios y pooder usar condicional al renderizar el button

  const deepEqual = useCallback((obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
    }
    return true;
  }, []);

  const formValues = watch();
  const hasChanges = useMemo(
    () => initialValues && !deepEqual(initialValues, formValues),
    [initialValues, formValues, deepEqual],
  );



  const onSubmit = (data: StepTwoData) => {
    setLoading(true);
    updateFormData(1, data);
    markStepAsCompleted(1);
    setActiveStep(2);
    setLoading(false);
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
      <div className="flex justify-end">
        {completedSteps[1] ? (
          hasChanges ? (
            <AuthButton
              label="Siguiente"
              type="submit"
              isDark={isDark}
              loading={loading}
              disabled={!isValid || blockAll}
              className="w-full sm:max-w-[344px]"
            />
          ) : (
            <button
              className="group flex items-center justify-center gap-1 font-textFont text-base text-lightText underline dark:text-darkText"
              type="submit"
              disabled={blockAll}
            >
              Tratar
              <div
                className={clsx(
                  "flex h-5 w-5 sm:h-[30px] sm:w-[30px] items-center justify-center rounded-full border-lightText transition-all duration-300",
                  isDark
                    ? "group-bg-[#414244]"
                    : "group-bg-custom-whiteD-900 group-hover:bg-buttonsLigth group-focus:shadow-[0_4px_4px_rgba(1,42,142,0.3)]"
                )}
              >
                <ArrowUp
                  className={clsx(
                    "h-4 w-4 sm:h-6 sm:w-6 transition-colors duration-300",
                    isDark
                      ? "group-text-[#414244]"
                      : "group-text-[#012a8e] group-hover:text-[#FCFBFA]"
                  )}
                />
              </div> 
            </button>
          )
        ) : (
          <AuthButton
            label="Siguiente"
            type="submit"
            isDark={isDark}
            loading={loading}
            disabled={!isValid || blockAll}
            className="w-full sm:max-w-[344px]"
          />
        )}
      </div>
    </form>
  );
};

export default memo(StepTwo);
