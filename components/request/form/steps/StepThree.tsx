import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSystemStore } from '@/store/useSystemStore';
import StepThreeGeneral from './stepsThreeOptions/StepThreeGeneral';
import StepThreeTether from './stepsThreeOptions/StepThreeTether';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';

interface FormData {
  send_amount: string;
  receive_amount: string;
  pay_email: string;
  proof_of_payment: FileList | null;
  note: string;
}

const StepThree = ({ blockAll }: { blockAll: boolean }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm<FormData>({ mode: 'onChange' });
  const { markStepAsCompleted, setActiveStep, formData, updateFormData, completedSteps } = useStepperStore();
  const { isDark } = useDarkTheme();

  const [initialValues, setInitialValues] = useState<FormData | null>(null);

  const formValues = useWatch({ control });

  const receiveAmount = localStorage.getItem('receiveAmount');
  const sendAmount = localStorage.getItem('sendAmount');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { selectedSendingSystem } = useSystemStore();

  function showFileName(event: any) {
    // Tomar el archivo del evento y asignarlo a `selectedFile`
    const file = event.target.files[0] || null;

    // Si hay un archivo seleccionado, actualizar el estado y mostrar el nombre
    console.log(file);
    if (file) {
      setSelectedFile(file);
      document.getElementById('file-name')!.textContent = file.name;
    } else {
      // Si no hay archivo cargado, mostrar mensaje predeterminado
      document.getElementById('file-name')!.textContent = 'No hay archivo seleccionado';
    }
  }

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
    setValue('pay_email', '00000@00000000.com');
    setValue('proof_of_payment', proof_of_payment);
    setValue('note', note);

    setInitialValues(newValues);
    console.log(proof_of_payment);
  }, [formData.stepThree, setValue, receiveAmount, sendAmount]);

  const [loading, setLoading] = useState(false);
  const onSubmit = (data: FormData) => {
    setLoading(true);
    console.log(data);
    updateFormData(2, data);
    markStepAsCompleted(2);
    setActiveStep(3);
    setLoading(false);
  };

  const hasChanges =
    initialValues &&
    !Object.keys(initialValues).every(
      (key) => initialValues[key as keyof FormData] === formValues[key as keyof FormData],
    );

  const { onChange, ...restRegister } = register('proof_of_payment', {
    required: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event); // Llamamos al onChange de register
    if (showFileName) showFileName(event); // Ejecutamos la función personalizada si existe
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
            receiveAmount={receiveAmount}
            handleChange={handleChange}
            restRegister={restRegister}
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
            receiveAmount={receiveAmount}
            handleChange={handleChange}
            restRegister={restRegister}
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
        {completedSteps[2] ? (
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

export default StepThree;
