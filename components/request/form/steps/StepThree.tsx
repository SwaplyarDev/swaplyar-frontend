import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { memo, useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSystemStore } from '@/store/useSystemStore';
import dynamic from 'next/dynamic';
import AuthButton from '@/components/auth/AuthButton';
import NETWORKS_DATA from '@/components/ui/PopUp/networksData';
import clsx from 'clsx';

const StepThreeGeneral = dynamic(() => import('./stepsThreeOptions/StepThreeGeneral'));
const StepThreeTether = dynamic(() => import('./stepsThreeOptions/StepThreeTether'));

interface FormData {
  send_amount: string;
  receive_amount: string;
  pay_email: string;
  proof_of_payment: File[] | null;
  note: string;
  network?: string;
  wallet?: string;
  red_selection?: {
    value: string;
    label: string;
  };
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
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [storedFiles, setStoredFiles] = useState<File[]>([]);

  const formValues = useWatch({ control });

  const sendAmount = formData.stepThree.send_amount;
  const receiveAmount = formData.stepThree.receive_amount;
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();

  const redSelection = watch('red_selection');

  // Setear valores iniciales del formulario
  useEffect(() => {
    const { proof_of_payment, note, red_selection } = formData.stepThree;
    
    const newValues = {
      ...formData.stepThree,
      proof_of_payment,
      note,
    };
    
    const sendAmountValue = sendAmount || '0';
    const receiveAmountValue = receiveAmount || '0';
           
    setValue('send_amount', sendAmountValue, { shouldValidate: true });
    setValue('receive_amount', receiveAmountValue, { shouldValidate: true });
    
    setValue('pay_email', '');
    setValue('proof_of_payment', proof_of_payment);
    setValue('note', note);

    if (selectedSendingSystem?.id === 'tether') {
      const defaultRedSelection = red_selection || {
        value: 'tron',
        label: 'Tron (TRC20)',
        image: NETWORKS_DATA.tron.image,
      };
      setValue('red_selection', defaultRedSelection, { shouldValidate: true });

      const networkKey = defaultRedSelection.value as keyof typeof NETWORKS_DATA;
      const networkData = NETWORKS_DATA[networkKey];
      if (networkData) {
        setValue('network', networkData.name, { shouldValidate: true });
        setValue('wallet', networkData.wallet, { shouldValidate: true });
      }
    }

    setInitialValues(newValues);
  }, [formData.stepThree, setValue, receiveAmount, sendAmount, selectedSendingSystem]);

  // Inicializar previews de imágenes SOLO al montar si hay archivos guardados
  useEffect(() => {
    const initialProofOfPayment = formData.stepThree.proof_of_payment;
    
    if (initialProofOfPayment && initialProofOfPayment.length > 0) {
      const files = Array.from(initialProofOfPayment);
      const previews = files
        .filter(file => file.type.startsWith('image/'))
        .map(file => URL.createObjectURL(file));
      
      setPreviewImages(previews);
      setStoredFiles(files);
    }
  }, []);

  useEffect(() => {
    if (selectedSendingSystem?.id === 'tether' && redSelection?.value) {
      const networkKey = redSelection.value as keyof typeof NETWORKS_DATA;
      const networkData = NETWORKS_DATA[networkKey];

      if (networkData) {
        setValue('network', networkData.name);
        setValue('wallet', networkData.wallet);
      }
    }
  }, [redSelection, selectedSendingSystem, setValue]);

  const [loading, setLoading] = useState(false);
  const onSubmit = (data: FormData) => {
    
    data.proof_of_payment = storedFiles;

    setLoading(true);
    updateFormData(2, data);
    markStepAsCompleted(2);
    setActiveStep(3);
    setLoading(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasChanges = useMemo(
    () => {
      const result = initialValues &&
        !Object.keys(initialValues).every(
          (key) => initialValues[key as keyof FormData] === formValues[key as keyof FormData],
        );
      return result;
    },
    [initialValues, formValues],
  );

  const { onChange, ...restRegister } = register('proof_of_payment', {
    required: false,
    validate: (value) => {
      return true;
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    if (newFiles.length === 0) return;

    const combined = [...storedFiles, ...newFiles].slice(0, 5);
    
    setStoredFiles(combined);

    const newPreviews = newFiles
      .map(file => (file.type.startsWith('image/') ? URL.createObjectURL(file) : null))
      .filter(Boolean) as string[];
   
    setPreviewImages(prev => {
      const updatedPreviews = [...prev, ...newPreviews].slice(0, 5);
      return updatedPreviews;
    });
    
    setValue('proof_of_payment', combined, { shouldValidate: true });
    
    const dataTransfer = new DataTransfer();
    combined.forEach(file => dataTransfer.items.add(file));
    
    const syntheticEvent = {
      ...event,
      target: {
        ...event.target,
        files: dataTransfer.files
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
  };  

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);

    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    
    setStoredFiles((prev) => {
      const updatedFiles = prev.filter((_, i) => i !== index);
      
      setValue('proof_of_payment', updatedFiles, { shouldValidate: true });
      
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach(file => dataTransfer.items.add(file));
      
      const syntheticEvent = {
        target: {
          files: dataTransfer.files
        },
        currentTarget: {
          files: dataTransfer.files
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(syntheticEvent);

      if (updatedFiles.length === 0) {
        completedSteps[2] = false;
      }

      return updatedFiles;
    });
  };

  useEffect(() => {
    const hasImages = storedFiles.length > 0;

    if (hasImages && !completedSteps[2]) {
      markStepAsCompleted(2);
    }

    if (!hasImages && completedSteps[2]) {
      completedSteps[2] = false;
    }
  }, [storedFiles, completedSteps, markStepAsCompleted]);

  useEffect(() => {
    return () => {
      previewImages.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

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
            handleRemoveImage={handleRemoveImage}
            watch={watch}
            restRegister={restRegister}
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
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
            handleRemoveImage={handleRemoveImage}
            watch={watch}
            restRegister={restRegister}
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
            control={control}
          />
        );
      default:
        return '';
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {renderSelectedSystem()}

      <div className="flex justify-end">
        {completedSteps[2] ? (
          hasChanges ? (
            <>
              <AuthButton
                label="Ya realicé el pago"
                type="submit"
                isDark={isDark}
                loading={loading}
                disabled={storedFiles.length < 1}
                className="w-full sm:max-w-[300px]"
              />
            </>
          ) : (
            <>
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
            </>
          )
        ) : (
          <>
            <AuthButton
              label="Ya realicé el pago"
              type="submit"
              isDark={isDark}
              loading={loading}
              disabled={storedFiles.length < 1}
              className="w-full sm:max-w-[300px]"
            />
          </>
        )}
      </div>
    </form>
  );
};

export default memo(StepThree);