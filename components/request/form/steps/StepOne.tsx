import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';
import SelectBoolean from '../inputs/SelectBoolean';
import SelectCodeCountry from '../inputs/SelectCodeCountry';
import { CountryOption } from '@/types/request/request';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import SelectCountry from '../inputs/SelectCountry';

interface FormData {
  sender_first_name: string;
  sender_last_name: string;
  calling_code: CountryOption | undefined;
  phone: string;
  email: string;
  own_account: string | undefined;
}

const StepOne = ({ blockAll }: { blockAll: boolean }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<FormData>({ mode: 'onChange' });

  const {
    markStepAsCompleted,
    setActiveStep,
    formData,
    updateFormData,
    completedSteps,
    submitOneStep,
    updateOneStep,
    idTransaction,
    setIdTransaction,
  } = useStepperStore();
  const { isDark } = useDarkTheme();

  const [initialValues, setInitialValues] = useState<FormData | null>(null);

  const formValues = useWatch({ control });

  useEffect(() => {
    const { sender_first_name, sender_last_name, calling_code, phone, email, own_account } = formData.stepOne;
    const newValues = {
      sender_first_name,
      sender_last_name,
      calling_code,
      phone,
      email,
      own_account,
    };
    setValue('sender_first_name', sender_first_name);
    setValue('sender_last_name', sender_last_name);
    setValue('calling_code', calling_code);
    setValue('phone', phone);
    setValue('email', email);
    setValue('own_account', own_account);

    console.log(newValues);
    setInitialValues(newValues);
  }, [formData.stepOne, setValue]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    updateFormData(0, data);

    if (idTransaction) {
      updateOneStep(idTransaction);
      markStepAsCompleted(0);
      setActiveStep(1);
    } else {
      const responseData = await submitOneStep();

      if (responseData) {
        console.log('Datos enviados y respuesta recibida:', responseData);
        setIdTransaction(responseData.transaction_id);
        markStepAsCompleted(0);
        setActiveStep(1);
        setLoading(false);
      } else {
        console.error('No se pudo completar el envío de los datos');
      }
    }
  };

  const deepEqual = (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
  };

  const hasChanges = initialValues && !deepEqual(initialValues, formValues);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className={clsx(
                'ml-1 h-5 text-xs',
                errors.sender_first_name ? 'text-red-500' : 'text-lightText dark:text-darkText',
              )}
            >
              Nombre
            </label>
            <InputField
              id="sender_first_name"
              type="text"
              placeholder="Nombre"
              disabled={blockAll}
              register={register('sender_first_name', {
                required: 'El Nombre es obligatorio',
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                  message: 'El Nombre solo puede contener letras y espacios',
                },
              })}
              error={errors.sender_first_name && errors.sender_first_name.message}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="sender_last_name"
              className={clsx(
                'ml-1 h-5 text-xs',
                errors.sender_last_name ? 'text-red-500' : 'text-lightText dark:text-darkText',
              )}
            >
              Apellido
            </label>
            <InputField
              id="sender_last_name"
              type="text"
              placeholder="Apellido"
              disabled={blockAll}
              register={register('sender_last_name', {
                required: 'El Apellido es obligatorio',
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                  message: 'El Apellido solo puede contener letras y espacios',
                },
              })}
              error={errors.sender_last_name && errors.sender_last_name.message}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className={clsx('ml-1 h-5 text-xs', errors.email ? 'text-red-500' : 'text-lightText dark:text-darkText')}
            >
              Correo electrónico
            </label>
            <InputField
              id="email"
              type="email"
              placeholder="Email"
              disabled={blockAll}
              register={register('email', {
                required: 'El Correo es obligatorio',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: 'El formato del Correo electrónico es inválido',
                },
              })}
              error={errors.email && errors.email.message}
            />
          </div>
          <div
            className={clsx(
              'flex min-h-[98px] flex-col',
              errors.phone && 'justify-end',
              isFocused || !!watch('phone') ? '' : 'pt-5',
            )}
          >
            <label
              htmlFor="phone"
              className={clsx(
                'ml-1 h-5 text-xs',
                isFocused || !!watch('phone') ? '' : 'hidden',
                errors.phone ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
              )}
            >
              Telefono
            </label>
            <div
              className={clsx(
                'flex max-h-[38px] items-center rounded border border-[#6B7280] bg-gray-200 dark:bg-lightText',
                errors.phone && !isFocused
                  ? 'border border-red-500 hover:border-blue-600 dark:hover:border-white'
                  : isFocused
                    ? 'border-blue-600 outline-none ring-1 ring-blue-600 ring-offset-blue-600 hover:border-blue-600 dark:hover:border-white'
                    : 'hover:border-blue-600 dark:hover:border-white',
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <Controller
                name="calling_code"
                control={control}
                defaultValue={undefined}
                rules={{
                  required: 'Este campo es obligatorio',
                }}
                render={({ field, fieldState }) => (
                  <SelectCountry
                    blockAll={blockAll}
                    selectedCodeCountry={field.value}
                    setSelectedCodeCountry={(option) => field.onChange(option)}
                    errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                  />
                )}
              />
              <p className="flex h-full items-center justify-center">{formValues.calling_code?.callingCode}</p>
              <input
                placeholder="Telefono"
                className="w-full border-none bg-transparent focus:border-none focus:outline-none focus:ring-0"
                type="tel"
                disabled={blockAll}
                {...register('phone', {
                  required: 'El número de teléfono es obligatorio',
                  pattern: {
                    value: /^\d{9,11}$/,
                    message: 'Introduce un número válido de entre 9 y 11 dígitos',
                  },
                })}
              />
            </div>
            {errors.phone && <p className="mb-5 text-sm text-red-500">• {errors.phone.message as string}</p>}
          </div>
        </div>
      </div>
      <div className="mx-0 flex flex-col gap-0 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
        <div className="flex w-full items-center justify-start sm-phone:justify-center">
          <p className="ml-1 h-5 text-xs text-lightText dark:text-darkText sm-phone:ml-0 sm-phone:text-sm md:text-lg">
            ¿Se transfiere a una cuenta propia?
          </p>
        </div>
        <div className="flex w-full flex-col">
          <Controller
            name="own_account"
            control={control}
            defaultValue={undefined}
            rules={{
              required: 'Este campo es obligatorio',
            }}
            render={({ field, fieldState }) => (
              <SelectBoolean
                blockAll={blockAll}
                selectedOption={field.value}
                setSelectedOption={(option) => field.onChange(option)}
                errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-center sm-phone:justify-end">
        {completedSteps[0] ? (
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

export default StepOne;
