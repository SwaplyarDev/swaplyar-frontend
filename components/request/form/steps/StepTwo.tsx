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
import { RedType } from '@/types/request/request';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';

interface FormData {
  receiver_first_name: string;
  receiver_last_name: string;
  document_type: string | undefined;
  method_key: string | undefined;
  tax_identification: string;
  transfer_identification: string;
  re_transfer_identification: string;
  name_of_bank: string;
  bank_email: string;
  re_enter_bank_email: string;
  usdt_direction: string;
  re_enter_usdt_direction: string;
  red_selection: RedType | undefined;
  recieveAmountRed: string;
  pix_key: string;
  individual_tax_id: string;
}

const StepTwo = ({ blockAll }: { blockAll: boolean }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    clearErrors,
  } = useForm<FormData>({ mode: 'onChange' });
  const { markStepAsCompleted, setActiveStep, formData, updateFormData, completedSteps } = useStepperStore();
  const { selectedReceivingSystem } = useSystemStore();
  const { isDark } = useDarkTheme();

  const [initialValues, setInitialValues] = useState<FormData | null>(null);

  const formValues = useWatch({ control });

  useEffect(() => {
    const {
      receiver_first_name,
      receiver_last_name,
      document_type,
      method_key,
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
      pix_key,
      individual_tax_id,
    } = formData.stepTwo;
    const newValues = {
      receiver_first_name,
      receiver_last_name,
      document_type,
      method_key,
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
      pix_key,
      individual_tax_id,
    };

    console.log('Document Type: ', document_type);
    console.log('Method Key: ', method_key);

    setValue(
      'receiver_first_name',
      formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_first_name : receiver_first_name,
    );
    setValue(
      'receiver_last_name',
      formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_last_name : receiver_last_name,
    );
    setValue('document_type', document_type);
    setValue('method_key', method_key);
    setValue('tax_identification', tax_identification);
    setValue('transfer_identification', transfer_identification);
    setValue('re_transfer_identification', re_transfer_identification);
    setValue('name_of_bank', name_of_bank);
    setValue('bank_email', bank_email);
    setValue('re_enter_bank_email', re_enter_bank_email);
    setValue('usdt_direction', usdt_direction);
    setValue('re_enter_usdt_direction', re_enter_usdt_direction);
    setValue('red_selection', red_selection);
    setValue('recieveAmountRed', recieveAmountRed);
    setValue('pix_key', pix_key);
    setValue('individual_tax_id', individual_tax_id);

    setInitialValues(newValues);
    console.log(newValues);
  }, [
    formData.stepTwo,
    setValue,
    formData.stepOne?.own_account,
    formData.stepOne?.sender_first_name,
    formData.stepOne?.sender_last_name,
  ]);

  const [loading, setLoading] = useState(false);
  const onSubmit = (data: FormData) => {
    setLoading(true);
    updateFormData(1, data);
    markStepAsCompleted(1);
    setActiveStep(2);
    setLoading(false);
  };

  const hasChanges =
    initialValues &&
    !Object.keys(initialValues).every(
      (key) => initialValues[key as keyof FormData] === formValues[key as keyof FormData],
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
            control={control}
            formValues={formValues}
            clearErrors={clearErrors}
            setValue={setValue}
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
      case 'wise_usd':
      case 'wise_eur':
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
        );
      case 'pix':
        return (
          <StepTwoPix
            register={register}
            errors={errors}
            getValues={getValues}
            blockAll={blockAll}
            formData={formData}
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
            <button
              type="submit"
              className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[18px] text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
              disabled={!isValid || blockAll || loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} />
                  Cargando...
                </div>
              ) : (
                'Siguiente'
              )}
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
            className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[18px] text-sm font-bold text-white disabled:border-gray-400 disabled:bg-calculatorLight2 disabled:text-lightText dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-calculatorDark2 ${isDark ? isValid && 'buttonSecondDark' : isValid && 'buttonSecond'}`}
            disabled={!isValid || blockAll || loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} />
                Cargando...
              </div>
            ) : (
              'Siguiente'
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default StepTwo;
