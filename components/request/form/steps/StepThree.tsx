import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';
import InputCopy from '../inputs/InputCopy';

interface FormData {
  send_amount: string;
  receive_amount: string;
  pay_email: string;
  proof_of_payment: FileList | null;
  note: string;
}

const StepThree = ({blockAll}: {blockAll: boolean}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({ mode: 'onChange' });
  const {
    markStepAsCompleted,
    setActiveStep,
    formData,
    updateFormData,
    completedSteps,
  } = useStepperStore();
  const { isDark } = useDarkTheme();

  // Estado para guardar los valores iniciales
  const [initialValues, setInitialValues] = useState<FormData | null>(null);

  // Observar cambios en los inputs
  const formValues = useWatch({ control });

  const receiveAmount = localStorage.getItem('receiveAmount');
  const sendAmount = localStorage.getItem('sendAmount');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function showFileName(event: any) {
    // Tomar el archivo del evento y asignarlo a `selectedFile`
    const file = event.target.files[0] || null;
    
    // Si hay un archivo seleccionado, actualizar el estado y mostrar el nombre
    if (file) {
      setSelectedFile(file);
      document.getElementById('file-name')!.textContent = file.name;
    } else if (selectedFile) {
      // Si no hay nuevo archivo y ya había uno cargado, mostrar el archivo anterior
      document.getElementById('file-name')!.textContent = selectedFile.name;
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

    if (proof_of_payment && proof_of_payment.length > 0) {
      setSelectedFile(proof_of_payment[0]);
      document.getElementById('file-name')!.textContent = proof_of_payment[0].name;
    }
  }, [formData.stepThree, setValue, receiveAmount, sendAmount]);

  const onSubmit = (data: FormData) => {
    updateFormData(2, data); // Actualiza los datos del formulario en Zustand
    markStepAsCompleted(2); // Marcar este paso como completado
    setActiveStep(3); // Aquí podrías finalizar el proceso o realizar una acción adicional
  };

  // Determinar si se han hecho cambios en el formulario
  const hasChanges =
    initialValues &&
    !Object.keys(initialValues).every(
      (key) =>
        initialValues[key as keyof FormData] ===
        formValues[key as keyof FormData],
    );

  console.log(formValues);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p className="text-left">
        tienes que realizar el pago de $000 al email asdfgh@asdfgh.com con el
        concepto de "PAGO" para enviarte el dinero a la cuenta
        00000@00000000.com
      </p>
      <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="pay_email"
              className={clsx(
                'ml-1 text-xs',
                errors.pay_email
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Email a pagar
            </label>
            <InputCopy
              id="pay_email"
              type="text"
              value={'00000@00000000.com'}
              disabled={true}
              placeholder=""
              register={register('pay_email', { required: true })}
              error={errors.pay_email && 'Este campo es obligatorio'}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="send_amount"
              className={clsx(
                'ml-1 text-xs',
                errors.send_amount
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Monto a pagar
            </label>
            <InputCopy
              id="send_amount"
              type="number"
              value={sendAmount?.toString()}
              disabled={true}
              placeholder="Monto Enviar"
              register={register('send_amount', { required: true })}
              error={errors.send_amount && 'Este campo es obligatorio'}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="receive_amount"
              className={clsx(
                'ml-1 text-xs',
                errors.receive_amount
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Monto a Recibir
            </label>
            <InputField
              id="receive_amount"
              type="number"
              value={receiveAmount?.toString()}
              disabled={true}
              placeholder="Monto a Recibir"
              register={register('receive_amount', { required: true })}
              error={errors.receive_amount && 'Este campo es obligatorio'}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="proof_of_payment"
              className={clsx(
                'cursor-pointer',
                errors.proof_of_payment
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              <p className="ml-1 text-xs">Comprobante</p>
              <div
                className={clsx(
                  'flex w-full flex-col items-center gap-2 rounded border border-[#6B7280] bg-gray-200 px-5 py-2 dark:bg-lightText xs-phone:flex-row sm-phone:flex-col lg-tablet:h-[38px] lg-tablet:flex-row lg-tablet:items-center',
                  errors.proof_of_payment
                    ? 'border-red-500'
                    : 'hover:border-blue-600 dark:hover:border-white',
                )}
              >
                <p className="w-full text-sm xs-phone:max-w-32 sm-phone:max-w-[inherit] lg-tablet:max-w-40 lg-tablet:text-base">
                  Subir comprobante
                </p>
                <span
                  id="file-name"
                  className="w-full text-xs text-[#6B7280] lg-tablet:text-sm"
                >
                  No hay archivo seleccionado
                </span>
              </div>
            </label>
            <InputField
              id="proof_of_payment"
              type="file"
              file={true}
              onCustomChange={showFileName}
              // accept="image/*"
              placeholder="SUBIR COMPROBANTE"
              register={register('proof_of_payment', { required: true })}
              error={errors.proof_of_payment && 'Este campo es obligatorio'}
              disabled={blockAll}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-full flex-col">
            <label
              htmlFor="note"
              className={clsx(
                'ml-1 text-xs',
                errors.note
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Nota (opcional)
            </label>
            <textarea
              {...register('note', { required: true })}
              id="note"
              disabled={blockAll}
              placeholder="Añade una nota si lo deseas ;)"
              className={clsx(
                'h-full w-full rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                errors.note
                  ? 'border-red-500'
                  : 'hover:border-blue-600 dark:hover:border-white',
              )}
            ></textarea>
            {errors.note && (
              <p className="text-sm text-red-500">Este campo es obligatorio</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        {completedSteps[2] ? (
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

export default StepThree;
