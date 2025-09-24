import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useSystemStore } from '@/store/useSystemStore';
import { memo, useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import dynamic from 'next/dynamic';
const StepTwoBank = dynamic(() => import('./stepsTwoOptions/StepTwoBank'));
const StepTwoPayoneer = dynamic(() => import('./stepsTwoOptions/StepTwoPayoneer'));
const StepTwoPaypal = dynamic(() => import('./stepsTwoOptions/StepTwoPaypal'));
const StepTwoWise = dynamic(() => import('./stepsTwoOptions/StepTwoWise'));
const StepTwoTether = dynamic(() => import('./stepsTwoOptions/StepTwoTether'));
const StepTwoPix = dynamic(() => import('./stepsTwoOptions/StepTwoPix'));
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { StepTwoData } from '@/types/transactions/stepperStoretypes';
import useWalletStore from '@/store/useWalletStore';

const StepTwo = ({ blockAll }: { blockAll: boolean }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
  } = useForm<StepTwoData>({ mode: 'onChange' });
  const { markStepAsCompleted, setActiveStep, formData, updateFormData, completedSteps } = useStepperStore((s) => ({
    markStepAsCompleted: s.markStepAsCompleted,
    setActiveStep: s.setActiveStep,
    formData: s.formData,
    updateFormData: s.updateFormData,
    completedSteps: s.completedSteps,
  }));
  const { selectedReceivingSystem } = useSystemStore((s) => ({ selectedReceivingSystem: s.selectedReceivingSystem }));
  const { selectedWallet } = useWalletStore();
  const { isDark } = useDarkTheme();

  const [initialValues, setInitialValues] = useState<StepTwoData | null>(null);

  const formValues = useWatch({ control });

  useEffect(() => {
    const resetFormFields = () => {
      setValue('receiver_first_name', '');
      setValue('receiver_last_name', '');
      setValue('tax_identification', '');
      setValue('transfer_identification', '');
      setValue('re_transfer_identification', '');
      setValue('name_of_bank', '');
      setValue('bank_email', '');
      setValue('re_enter_bank_email', '');
      setValue('usdt_direction', '');
      setValue('re_enter_usdt_direction', '');
      setValue('pixId', '');
      setValue('pixKey', '');
      setValue('individual_tax_id', '');
    };
    resetFormFields();

    if (selectedWallet) {
      if (selectedWallet.fullName) {
        const nameParts = selectedWallet.fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        setValue('receiver_first_name', firstName, { shouldValidate: true });
        setValue('receiver_last_name', lastName, { shouldValidate: true });
      }
      if (selectedWallet.email) {
        setValue('bank_email', selectedWallet.email, { shouldValidate: true });
        setValue('re_enter_bank_email', selectedWallet.email, { shouldValidate: true });
      }
      switch (selectedWallet.type) {
        case 'bank':
          setValue('transfer_identification', selectedWallet.cbu || selectedWallet.alias || '', {
            shouldValidate: true,
          });
          setValue('re_transfer_identification', selectedWallet.cbu || selectedWallet.alias || '', {
            shouldValidate: true,
          });
          setValue('tax_identification', selectedWallet.taxId || '', { shouldValidate: true });
          setValue('name_of_bank', selectedWallet.bankName || '', { shouldValidate: true });
          break;
        case 'tether':
          setValue('usdt_direction', selectedWallet.walletAddress || '', { shouldValidate: true });
          setValue('re_enter_usdt_direction', selectedWallet.walletAddress || '', { shouldValidate: true });
          setValue('red_selection', {
            value: selectedWallet.network || '',
            label: selectedWallet.network || '',
            image: <></>,
          });
          break;
        case 'pix':
          setValue('pixId', selectedWallet.pixKeyType || '', { shouldValidate: true });
          setValue('pixKey', selectedWallet.pixKeyValue || '', { shouldValidate: true });
          setValue('individual_tax_id', selectedWallet.taxId || '', { shouldValidate: true });
          break;

        case 'wise_usd':
        case 'wise_eur':
        case 'payoneer_usd':
        case 'payoneer_eur':
        case 'paypal':
          break;
      }
    } else if (formData.stepOne?.own_account === 'Si' || formData.stepOne?.own_account === 'true') {
      setValue('receiver_first_name', formData.stepOne.first_name, { shouldValidate: true });
      setValue('receiver_last_name', formData.stepOne.last_name, { shouldValidate: true });
    }
  }, [selectedWallet, formData.stepOne, setValue]);
  [
    formData.stepTwo,
    setValue,
    formData.stepOne?.own_account,
    formData.stepOne?.first_name,
    formData.stepOne?.last_name,
    formData.stepOne?.email,
    selectedWallet,
  ];

  const [loading, setLoading] = useState(false);
  const onSubmit = (data: StepTwoData) => {
    setLoading(true);
    updateFormData(1, data);
    markStepAsCompleted(1);
    setActiveStep(2);
    setLoading(false);
  };

  const hasChanges = useMemo(
    () =>
      initialValues &&
      !Object.keys(initialValues).every(
        (key) => initialValues[key as keyof StepTwoData] === formValues[key as keyof StepTwoData],
      ),
    [initialValues, formValues],
  );

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
            formValues={formValues}
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
        return '';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {renderSelectedSystem()}

      <div className="flex justify-center sm-phone:justify-end">
        {completedSteps[1] ? (
          hasChanges ? (
            loading ? (
              <div className="flex w-full max-w-[300px] items-center justify-center">
                <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="42px" />
              </div>
            ) : (
              <button
                type="submit"
                className={`flex h-[46px] w-full max-w-[300px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[18px] font-titleFont text-base font-semibold text-white disabled:border-gray-400 disabled:bg-custom-blue-300 disabled:text-darkText dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-calculatorDark2 dark:disabled:text-darkText ${isDark ? isValid && 'buttonSecondDark' : isValid && 'buttonSecond'}`}
                disabled={!isValid || blockAll || loading}
              >
                Siguiente
              </button>
            )
          ) : (
            <button
              className="flex items-center justify-center gap-1 font-textFont text-base text-lightText underline dark:text-darkText"
              type="submit"
              disabled={blockAll}
            >
              Tratar
              <ArrowUp />
            </button>
          )
        ) : loading ? (
          <div className="flex w-full max-w-[300px] items-center justify-center">
            <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="42px" />
          </div>
        ) : (
          <button
            type="submit"
            className={`flex h-[46px] w-full max-w-[300px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[18px] font-titleFont text-base font-semibold text-white disabled:border-gray-400 disabled:bg-custom-blue-300 disabled:text-darkText dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-calculatorDark2 dark:disabled:text-darkText ${isDark ? isValid && 'buttonSecondDark' : isValid && 'buttonSecond'}`}
            disabled={!isValid || blockAll || loading}
          >
            Siguiente
          </button>
        )}
      </div>
    </form>
  );
};

export default memo(StepTwo);
