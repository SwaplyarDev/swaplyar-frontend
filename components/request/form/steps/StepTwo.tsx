import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useSystemStore } from '@/store/useSystemStore';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';

interface FormData {
  receiver_first_name: string;
  receiver_last_name: string;
  tax_identification: string;
  transfer_identification: string;
  re_transfer_identification: string;
  name_of_bank: string;
  wise_email: string;
  re_enter_wise_email: string;
}

const StepTwo = () => {
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
  const { selectedReceivingSystem } = useSystemStore();
  const { isDark } = useDarkTheme();

  // Estado para guardar los valores iniciales
  const [initialValues, setInitialValues] = useState<FormData | null>(null);

  // Observar cambios en los inputs
  const formValues = useWatch({ control });

  useEffect(() => {
    const {
      receiver_first_name,
      receiver_last_name,
      tax_identification,
      transfer_identification,
      re_transfer_identification,
      name_of_bank,
      wise_email,
      re_enter_wise_email,
    } = formData.stepTwo; 
    const newValues = {
      receiver_first_name,
      receiver_last_name,
      tax_identification,
      transfer_identification,
      re_transfer_identification,
      name_of_bank,
      wise_email,
      re_enter_wise_email,
    }; 

    setValue('receiver_first_name', receiver_first_name);
    setValue('receiver_last_name', receiver_last_name);
    setValue('tax_identification', tax_identification);
    setValue('transfer_identification', transfer_identification);
    setValue('re_transfer_identification', re_transfer_identification);
    setValue('name_of_bank', name_of_bank);
    setValue('wise_email', wise_email);
    setValue('re_enter_wise_email', re_enter_wise_email);

    // Guardar los valores iniciales al montar el componente
    setInitialValues(newValues);
  }, [formData.stepTwo, setValue]);

  const onSubmit = (data: FormData) => {
    updateFormData(1, data); // Actualiza los datos del formulario en Zustand
    markStepAsCompleted(1); // Marcar este paso como completado
    setActiveStep(2); // Ir al siguiente paso
  };

  // Determinar si se han hecho cambios en el formulario
  const hasChanges =
    initialValues &&
    !Object.keys(initialValues).every(
      (key) =>
        initialValues[key as keyof FormData] ===
        formValues[key as keyof FormData],
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {selectedReceivingSystem?.id == 'bank' ? (
        <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="receiver_first_name"
                className={clsx(
                  'ml-1 text-xs',
                  errors.receiver_first_name
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Nombre
              </label>
              <InputField
                id="receiver_first_name"
                type="text"
                placeholder="Nombre"
                register={register('receiver_first_name', { required: true })}
                error={
                  errors.receiver_first_name && 'Este campo es obligatorio'
                }
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="receiver_last_name"
                className={clsx(
                  'ml-1 text-xs',
                  errors.receiver_last_name
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Apellido
              </label>
              <InputField
                id="receiver_last_name"
                type="text"
                placeholder="Apellido"
                register={register('receiver_last_name', { required: true })}
                error={errors.receiver_last_name && 'Este campo es obligatorio'}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="tax_identification"
                className={clsx(
                  'ml-1 text-xs',
                  errors.tax_identification
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                TAX ID/CUIT/CUIL
              </label>
              <InputField
                id="tax_identification"
                type="text"
                placeholder="TAX ID/CUIT/CUIL"
                register={register('tax_identification', { required: true })}
                error={errors.tax_identification && 'Este campo es obligatorio'}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="transfer_identification"
                className={clsx(
                  'ml-1 text-xs',
                  errors.transfer_identification
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                CBU/CVU/ALIAS
              </label>
              <InputField
                id="transfer_identification"
                type="text"
                placeholder="CBU/CVU/ALIAS"
                register={register('transfer_identification', {
                  required: true,
                })}
                error={
                  errors.transfer_identification && 'Este campo es obligatorio'
                }
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="re_transfer_identification"
                className={clsx(
                  'ml-1 text-xs',
                  errors.re_transfer_identification
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                RE-ENTER CBU/CVU/ALIAS
              </label>
              <InputField
                id="re_transfer_identification"
                type="text"
                placeholder="RE-ENTER CBU/CVU/ALIAS"
                register={register('re_transfer_identification', {
                  required: true,
                })}
                error={
                  errors.re_transfer_identification &&
                  'Este campo es obligatorio'
                }
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="name_of_bank"
                className={clsx(
                  'ml-1 text-xs',
                  errors.name_of_bank
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Nombre del Banco
              </label>
              <InputField
                id="name_of_bank"
                type="text"
                placeholder="Nombre del Banco"
                register={register('name_of_bank', {
                  required: true,
                })}
                error={errors.name_of_bank && 'Este campo es obligatorio'}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="receiver_first_name"
                className={clsx(
                  'ml-1 text-xs',
                  errors.receiver_first_name
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Nombre
              </label>
              <InputField
                id="receiver_first_name"
                type="text"
                placeholder="Nombre"
                register={register('receiver_first_name', { required: true })}
                error={
                  errors.receiver_first_name && 'Este campo es obligatorio'
                }
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="receiver_last_name"
                className={clsx(
                  'ml-1 text-xs',
                  errors.receiver_last_name
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Apellido
              </label>
              <InputField
                id="receiver_last_name"
                type="text"
                placeholder="Apellido"
                register={register('receiver_last_name', { required: true })}
                error={errors.receiver_last_name && 'Este campo es obligatorio'}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="wise_email"
                className={clsx(
                  'ml-1 text-xs',
                  errors.wise_email
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Email de Wise
              </label>
              <InputField
                id="wise_email"
                type="email"
                placeholder="Email de wise"
                register={register('wise_email', { required: true })}
                error={errors.wise_email && 'Este campo es obligatorio'}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="re_enter_wise_email"
                className={clsx(
                  'ml-1 text-xs',
                  errors.re_enter_wise_email
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                RE-ENTER Email de Wise
              </label>
              <InputField
                id="re_enter_wise_email"
                type="email"
                placeholder="RE-ENTER Email de Wise"
                register={register('re_enter_wise_email', { required: true })}
                error={
                  errors.re_enter_wise_email && 'Este campo es obligatorio'
                }
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        {completedSteps[1] ? (
          hasChanges ? (
            <button
              type="submit"
              className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[14px] text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
              disabled={!isValid}
            >
              Siguiente
            </button>
          ) : (
            <button
              className="flex items-center justify-center gap-1 text-base text-lightText underline dark:text-darkText"
              type="submit"
            >
              Tratar
              <ArrowUp />
            </button>
          )
        ) : (
          <button
            type="submit"
            className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[14px] text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            disabled={!isValid}
          >
            Siguiente
          </button>
        )}
      </div>
    </form>
  );
};

export default StepTwo;
