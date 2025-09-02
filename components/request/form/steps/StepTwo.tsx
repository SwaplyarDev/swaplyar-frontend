import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useSystemStore } from '@/store/useSystemStore';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import StepTwoBank from './stepsTwoOptions/StepTwoBank';
import StepTwoPayoneer from './stepsTwoOptions/StepTwoPayoneer';
import StepTwoPaypal from './stepsTwoOptions/StepTwoPaypal';
import StepTwoWise from './stepsTwoOptions/StepTwoWise';
import StepTwoTether from './stepsTwoOptions/StepTwoTether';
import StepTwoPix from './stepsTwoOptions/StepTwoPix';
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
  const { markStepAsCompleted, setActiveStep, formData, updateFormData, completedSteps } = useStepperStore();
  const { selectedReceivingSystem } = useSystemStore();
  const { selectedWallet } = useWalletStore();
  const { isDark } = useDarkTheme();

  const [initialValues, setInitialValues] = useState<StepTwoData | null>(null);

  const formValues = useWatch({ control });

  useEffect(() => {
    console.log('🕵️‍♂️ DEBUG StepTwo: Billetera recibida:', selectedWallet);
    const {
      receiver_first_name,
      receiver_last_name,
      tax_identification,
      transfer_identification,
      re_transfer_identification,
      name_of_bank,
      bank_email,
      re_enter_bank_email,
      usdt_direction,
      re_enter_usdt_direction,
      red_selection,
      recieveAmountRed,
      pixId,
      pixKey,
      individual_tax_id,
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
      usdt_direction,
      re_enter_usdt_direction,
      red_selection,
      recieveAmountRed,
      pixId,
      pixKey,
      individual_tax_id,
    };

    setValue(
      'receiver_first_name',
      formData.stepOne?.own_account === 'Si' ? formData.stepOne?.first_name : receiver_first_name,
    );
    setValue(
      'receiver_last_name',
      formData.stepOne?.own_account === 'Si' ? formData.stepOne?.last_name : receiver_last_name,
    );
    setValue('tax_identification', formData.stepOne?.own_account === 'Si' ? tax_identification : '');
    setValue('transfer_identification', transfer_identification);
    setValue('re_transfer_identification', re_transfer_identification);
    setValue('name_of_bank', name_of_bank);
    setValue('bank_email', formData.stepOne?.own_account === 'Si' ? formData.stepOne?.email : bank_email);
    setValue('re_enter_bank_email', re_enter_bank_email);
    setValue('usdt_direction', usdt_direction);
    setValue('re_enter_usdt_direction', re_enter_usdt_direction);
    setValue('red_selection', red_selection);
    setValue('recieveAmountRed', recieveAmountRed);
    setValue('pixId', pixId);
    setValue('pixKey', pixKey);
    setValue('individual_tax_id', individual_tax_id);

    if (selectedWallet) {
      if (selectedWallet.fullName) {
        const nameParts = selectedWallet.fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        setValue('receiver_first_name', firstName);
        setValue('receiver_last_name', lastName);
      }
      if (selectedWallet.email) {
        setValue('bank_email', selectedWallet.email);
        setValue('re_enter_bank_email', selectedWallet.email);
      }
      switch (selectedWallet.type) {
        case 'bank':
          setValue('transfer_identification', selectedWallet.cbu || selectedWallet.alias || '');
          setValue('re_transfer_identification', selectedWallet.cbu || selectedWallet.alias || '');
          setValue('tax_identification', selectedWallet.taxId || '');
          break;

        case 'tether':
          setValue('usdt_direction', selectedWallet.walletAddress || '');
          setValue('re_enter_usdt_direction', selectedWallet.walletAddress || '');
          setValue('red_selection', selectedWallet.network || '');
          break;

        case 'pix':
          setValue('pixId', selectedWallet.pixKeyType || '');
          setValue('pixKey', selectedWallet.pixKeyValue || '');
          setValue('individual_tax_id', selectedWallet.taxId || ''); // <-- CORREGIDO
          break;

        case 'wise_usd':
        case 'wise_eur':
        case 'payoneer_usd':
        case 'payoneer_eur':
        case 'paypal':
          break;
      }
    }
    setInitialValues(newValues);
  }, [
    formData.stepTwo,
    setValue,
    formData.stepOne?.own_account,
    formData.stepOne?.first_name,
    formData.stepOne?.last_name,
    selectedWallet,
  ]);

  const [loading, setLoading] = useState(false);
  const onSubmit = (data: StepTwoData) => {
    setLoading(true);
    updateFormData(1, data);
    markStepAsCompleted(1);
    setActiveStep(2);
    setLoading(false);
  };

  const hasChanges =
    initialValues &&
    !Object.keys(initialValues).every(
      (key) => initialValues[key as keyof StepTwoData] === formValues[key as keyof StepTwoData],
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

export default StepTwo;
