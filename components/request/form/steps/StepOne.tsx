import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';
import SelectBoolean from '../inputs/SelectBoolean';
import SelectCountry from '../inputs/SelectCountry';
import { CountryOption } from '@/types/request/request';

interface FormData {
  sender_first_name: string;
  sender_last_name: string;
  phone: string;
  email: string;
  own_account: string | undefined;
}

const StepOne = ({blockAll}: {blockAll: boolean}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({ mode: 'onChange' });

  const [currentCountry, setCurrentCountry] = useState<CountryOption | null>(
    null,
  );

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

  // Cargar los datos del formulario al montar el componente
  useEffect(() => {
    const { sender_first_name, sender_last_name, phone, email, own_account } =
      formData.stepOne;
    const newValues = {
      sender_first_name,
      sender_last_name,
      phone,
      email,
      own_account,
    };
    setValue('sender_first_name', sender_first_name);
    setValue('sender_last_name', sender_last_name);
    setValue('phone', phone);
    setValue('email', email);
    setValue('own_account', own_account);

    // Guardar los valores iniciales al montar el componente
    setInitialValues(newValues);
  }, [formData.stepOne, setValue]);

  const onSubmit = (data: FormData) => {
    updateFormData(0, data); // Actualiza los datos del formulario en Zustand
    markStepAsCompleted(0); // Marcar este paso como completado
    setActiveStep(1); // Ir al siguiente paso
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
      <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className={clsx(
                'ml-1 text-xs',
                errors.sender_first_name
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Nombre
            </label>
            <InputField
              id="sender_first_name"
              type="text"
              placeholder="Nombre"
              register={register('sender_first_name', { required: true })}
              error={errors.sender_first_name && 'Este campo es obligatorio'}
              disabled={blockAll}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="sender_last_name"
              className={clsx(
                'ml-1 text-xs',
                errors.sender_last_name
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Apellido
            </label>
            <InputField
              id="sender_last_name"
              type="text"
              placeholder="Apellido"
              register={register('sender_last_name', { required: true })}
              error={errors.sender_last_name && 'Este campo es obligatorio'}
              disabled={blockAll}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className={clsx(
                'ml-1 text-xs',
                errors.email
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Correo electrónico
            </label>
            <InputField
              id="email"
              type="email"
              placeholder="Email"
              register={register('email', { required: true })}
              error={errors.email && 'Este campo es obligatorio'}
              disabled={blockAll}
            />
          </div>
          <SelectCountry
            errors={errors}
            setValue={setValue}
            setCurrentCountry={setCurrentCountry}
            register={register}
            blockALl={blockAll}
          />
        </div>
      </div>
      <div className="mx-0 flex flex-col gap-0 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
        <div className="flex w-full items-center justify-start sm-phone:justify-center">
          <p className="ml-1 text-xs text-lightText dark:text-darkText sm-phone:ml-0 sm-phone:text-sm md:text-lg">
            ¿Se transfiere a una cuenta propia?
          </p>
        </div>
        <div className="flex w-full flex-col">
          <Controller
            name="own_account"
            control={control}
            defaultValue={undefined}
            disabled={blockAll}
            rules={{
              required: 'Este campo es obligatorio',
            }}
            render={({ field, fieldState }) => (
              <SelectBoolean
                selectedOption={field.value}
                setSelectedOption={(option) => field.onChange(option)}
                errors={
                  fieldState.error ? { [field.name]: fieldState.error } : {}
                }
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end">
        {completedSteps[0] ? (
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

export default StepOne;
