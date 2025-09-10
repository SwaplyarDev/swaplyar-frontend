import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { memo, useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSystemStore } from '@/store/useSystemStore';
import dynamic from 'next/dynamic';
const StepThreeGeneral = dynamic(() => import('./stepsThreeOptions/StepThreeGeneral'));
const StepThreeTether = dynamic(() => import('./stepsThreeOptions/StepThreeTether'));
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import InfoStep from '@/components/ui/InfoStep/InfoStep';
import clsx from 'clsx';

interface FormData {
  send_amount: string;
  receive_amount: string;
  pay_email: string;
  proof_of_payment: FileList | null;
  note: string;
  network?: string;
  wallet?: string;
}

const StepThree = ({ blockAll }: { blockAll: boolean }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
  } = useForm<FormData>({ mode: 'onChange' });
  const { markStepAsCompleted, setActiveStep, formData, updateFormData, completedSteps } = useStepperStore();
  const { isDark } = useDarkTheme();

  const [initialValues, setInitialValues] = useState<FormData | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const formValues = useWatch({ control });

  const receiveAmount = typeof window !== 'undefined' ? localStorage.getItem('receiveAmount') : null;
  const sendAmount = typeof window !== 'undefined' ? localStorage.getItem('sendAmount') : null;
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();

  useEffect(() => {
    const { proof_of_payment, note } = formData.stepThree;
    const newValues = {
      ...formData.stepThree,
      proof_of_payment,
      note,
    };
    if (sendAmount && receiveAmount) {
      setValue('send_amount', sendAmount);
      setValue('receive_amount', receiveAmount);
    }
    setValue('pay_email', '');
    setValue('proof_of_payment', proof_of_payment);
    setValue('note', note);

    if (selectedSendingSystem?.id === 'tether') {
      setValue('network', 'TRC-20');
      setValue('wallet', 'TSgBPeFSb9TxJWyzDjDfuNqBktF898ZFUb');
    }

    setInitialValues(newValues);
  }, [formData.stepThree, setValue, receiveAmount, sendAmount, selectedSendingSystem]);

  const [loading, setLoading] = useState(false);
  const onSubmit = (data: FormData) => {
    setLoading(true);
    updateFormData(2, data);
    markStepAsCompleted(2);
    setActiveStep(3);
    setLoading(false);
  };

  const hasChanges = useMemo(
    () =>
      initialValues &&
      !Object.keys(initialValues).every(
        (key) => initialValues[key as keyof FormData] === formValues[key as keyof FormData],
      ),
    [initialValues, formValues],
  );

  const { onChange, ...restRegister } = register('proof_of_payment', {
    required: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
      } else {
        setPreviewImage(null);
      }
    }
    onChange(event);
  };

  const renderSelectedSystem = () => {
    switch (selectedSendingSystem?.id) {
      case 'bank':
      case 'paypal':
      case 'payoneer_usd':
      case 'payoneer_eur':
      case 'wise_usd':
      case 'wise_eur':
      case 'pix':
        return (
          <StepThreeGeneral
            register={register}
            errors={errors}
            getValues={getValues}
            blockAll={blockAll}
            formData={formData}
            sendAmount={sendAmount}
            selectedSendingSystem={selectedSendingSystem}
            selectedReceivingSystem={selectedReceivingSystem}
            receiveAmount={receiveAmount}
            handleChange={handleChange}
            watch={watch}
            restRegister={restRegister}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
        );
      case 'tether':
        return (
          <StepThreeTether
            register={register}
            errors={errors}
            getValues={getValues}
            blockAll={blockAll}
            formData={formData}
            sendAmount={sendAmount}
            selectedSendingSystem={selectedSendingSystem}
            selectedReceivingSystem={selectedReceivingSystem}
            receiveAmount={receiveAmount}
            handleChange={handleChange}
            watch={watch}
            restRegister={restRegister}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
        );
      default:
        return '';
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div
        className={clsx(
          completedSteps[2] ? 'absolute right-14 top-[30px] xs-phone:top-[26px] sm:top-4' : 'absolute right-5 top-4',
        )}
      >
        <InfoStep />
      </div>
      {renderSelectedSystem()}

      <div className="flex justify-center sm-phone:justify-end">
        {completedSteps[2] ? (
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

export default memo(StepThree);
