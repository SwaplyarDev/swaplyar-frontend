import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useSystemStore } from '@/store/useSystemStore';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';
import { error } from 'console';

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

const StepTwo = ({ blockAll }: { blockAll: boolean }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
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

    setValue('receiver_first_name', formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_first_name : receiver_first_name);
    setValue('receiver_last_name', formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_last_name : receiver_last_name);
    setValue('tax_identification', tax_identification);
    setValue('transfer_identification', transfer_identification);
    setValue('re_transfer_identification', re_transfer_identification);
    setValue('name_of_bank', name_of_bank);
    setValue('wise_email', wise_email);
    setValue('re_enter_wise_email', re_enter_wise_email);

    // Guardar los valores iniciales al montar el componente
    setInitialValues(newValues);
    console.log(newValues);
  }, [formData.stepTwo, setValue, formData.stepOne?.own_account, formData.stepOne?.sender_first_name, formData.stepOne?.sender_last_name]);

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
                value={formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_first_name : undefined}
                defaultValue={formData.stepOne?.own_account !== 'Si' ? undefined : ''}
                placeholder="Nombre"
                register={register('receiver_first_name', {
                  required: 'El Nombre es obligatorio',
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                    message: 'El Nombre solo puede contener letras y espacios',
                  },
                })}
                error={
                  errors.receiver_first_name &&
                  errors.receiver_first_name.message
                }
                disabled={blockAll || formData.stepOne?.own_account === 'Si'}
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
                disabled={blockAll || formData.stepOne?.own_account === 'Si'}
                id="receiver_last_name"
                value={formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_last_name : undefined}
                defaultValue={formData.stepOne?.own_account !== 'Si' ? undefined : ''}
                type="text"
                placeholder="Apellido"
                register={register('receiver_last_name', {
                  required: 'El Apellido es obligatorio',
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                    message:
                      'El Apellido solo puede contener letras y espacios',
                  },
                })}
                error={
                  errors.receiver_last_name && errors.receiver_last_name.message
                }
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
                disabled={blockAll}
                id="tax_identification"
                type="text"
                placeholder="TAX ID/CUIT/CUIL"
                register={register('tax_identification', {
                  required: 'El TAX ID/CUIT/CUIL es obligatorio',
                  pattern: {
                    value: /^(?:\d{9}|\d{11}|\d{2}-\d{8}-\d{1})$/,  //valida 11 caracteres o 14 pero con guiones
                    message: 'El formato de TAX ID/CUIT/CUIL es inválido',
                  },
                })}
                error={
                  errors.tax_identification && errors.tax_identification.message
                }
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
                disabled={blockAll}
                id="transfer_identification"
                type="text"
                placeholder="CBU/CVU/ALIAS"
                register={register('transfer_identification', {
                  required: 'El CBU/CVU/ALIAS es obligatorio',
                  pattern: {
                    value: /^(?:\d{22}|[a-zA-Z0-9._-]{3,30})$/i,
                    message: 'El formato de CBU/CVU/ALIAS es inválido',
                  },
                })}
                error={
                  errors.transfer_identification &&
                  errors.transfer_identification.message
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
                disabled={blockAll}
                id="re_transfer_identification"
                type="text"
                placeholder="RE-ENTER CBU/CVU/ALIAS"
                register={register('re_transfer_identification', {
                  required: 'El RE-ENTER CBU/CVU/ALIAS es obligatorio',
                  validate: (value) => {
                    const originalValue = getValues('transfer_identification');
                    return (
                      value === originalValue ||
                      'Debe coincidir con el CBU/CVU/ALIAS ingresado anteriormente'
                    );
                  },
                })}
                error={
                  errors.re_transfer_identification &&
                  errors.re_transfer_identification.message
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
                disabled={blockAll}
                id="name_of_bank"
                type="text"
                placeholder="Nombre del Banco"
                register={register('name_of_bank', {
                  required: 'El Nombre del Banco es obligatorio',
                  pattern: {
                    value: /^[A-Za-z0-9\s&.'-_]{1,60}$/i,
                    message:
                      'El Nombre del Banco solo puede contener 60 caracteres',
                  },
                })}
                error={errors.name_of_bank && errors.name_of_bank.message}
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
                disabled={blockAll || formData.stepOne?.own_account === 'Si'}
                id="receiver_first_name"
                type="text"
                value={formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_first_name : undefined}
                defaultValue={formData.stepOne?.own_account !== 'Si' ? undefined : ''}
                placeholder="Nombre"
                register={register('receiver_first_name', {
                  required: 'El Nombre es obligatorio',
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                    message: 'El Nombre solo puede contener letras y espacios',
                  },
                })}
                error={
                  errors.receiver_first_name &&
                  errors.receiver_first_name.message
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
                disabled={blockAll || formData.stepOne?.own_account === 'Si'}
                id="receiver_last_name"
                type="text"
                value={formData.stepOne?.own_account === 'Si' ? formData.stepOne?.sender_last_name : undefined}
                defaultValue={formData.stepOne?.own_account !== 'Si' ? undefined : ''}
                placeholder="Apellido"
                register={register('receiver_last_name', {
                  required: 'El Apellido es obligatorio',
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                    message:
                      'El Apellido solo puede contener letras y espacios',
                  },
                })}
                error={
                  errors.receiver_last_name && errors.receiver_last_name.message
                }
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
                disabled={blockAll}
                id="wise_email"
                type="email"
                placeholder="Email de wise"
                register={register('wise_email', {
                  required: 'El Email de Wise es obligatorio',
                  pattern: {
                    // value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: 'El formato del Email de Wise es inválido',
                  },
                })}
                error={errors.wise_email && errors.wise_email.message}
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
                disabled={blockAll}
                id="re_enter_wise_email"
                type="email"
                placeholder="RE-ENTER Email de Wise"
                register={register('re_enter_wise_email', {
                  required: 'El RE-ENTER Email de Wise es obligatorio',
                  validate: (value) => {
                    const originalValue = getValues('wise_email');
                    return (
                      value === originalValue ||
                      'Debe coincidir con el Email de Wise ingresado anteriormente'
                    );
                  },
                })}
                error={
                  errors.re_enter_wise_email &&
                  errors.re_enter_wise_email.message
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

export default StepTwo;
