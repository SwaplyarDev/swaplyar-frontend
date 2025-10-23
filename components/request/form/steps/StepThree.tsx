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
import AuthButton from '@/components/auth/AuthButton';

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

    // Hacemos scroll hacia arriba cuando se completa step3 sino se queda abajo en el footer
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

      <div className="flex justify-center sm-phone:justify-end sm-tablet:justify-center lg:justify-end">
        {completedSteps[2] ? (
          hasChanges ? (
            <AuthButton
              label="Siguiente"
              type="submit"
              isDark={isDark}
              loading={loading}
              disabled={!isValid || blockAll}
              className="w-full max-w-[300px]"
            />
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
        ) : (
          <AuthButton
            label="Siguiente"
            type="submit"
            isDark={isDark}
            loading={loading}
            disabled={!isValid || blockAll}
            className="w-full max-w-[300px]"
          />
        )}
      </div>
    </form>
  );
};

export default memo(StepThree);
