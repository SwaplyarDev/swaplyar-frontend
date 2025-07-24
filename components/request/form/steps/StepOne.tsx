'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import userInfoStore from '@/store/userInfoStore';

import InputSteps from '@/components/inputSteps/InputSteps';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import SelectBoolean from '../inputs/SelectBoolean';
import SelectCountry from '../inputs/SelectCountry';

import { CountryOption } from '@/types/request/request';

interface FormData {
  sender_first_name: string;
  sender_last_name: string;
  calling_code?: CountryOption;
  phone: string;
  email: string;
  own_account?: string;
}

const StepOne = ({ blockAll }: { blockAll: boolean }) => {
  const { data: session } = useSession();
  const user = userInfoStore((state) => state.user);
  const { isDark } = useDarkTheme();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      sender_first_name: '',
      sender_last_name: '',
      email: '',
      calling_code: undefined,
      phone: '',
      own_account: undefined,
    },
  });

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

  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<FormData | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const formValues = useWatch({ control });

  // Inicializa el formulario con datos del usuario
  useEffect(() => {
    if (!session?.user) return;

    const [firstName, ...rest] = session.user.fullName?.split(' ') ?? [];
    const lastName = rest.join(' ');

    const defaultFormData: FormData = {
      sender_first_name: firstName,
      sender_last_name: lastName,
      email: session.user.email,
      calling_code: formData.stepOne.calling_code,
      phone: session.user.phone,
      own_account: formData.stepOne.own_account,
    };

    reset(defaultFormData);
    setInitialValues(defaultFormData);
  }, [session, formData.stepOne, reset]);

  const deepEqual = (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => keys2.includes(key) && deepEqual(obj1[key], obj2[key]));
  };

  const hasChanges = initialValues && !deepEqual(initialValues, formValues);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    updateFormData(0, data);

    try {
      if (idTransaction) {
        await updateOneStep(idTransaction);
      } else {
        const responseData = await submitOneStep();
        if (responseData) {
          setIdTransaction(responseData.transaction_id);
        } else {
          throw new Error('Respuesta inválida');
        }
      }
      markStepAsCompleted(0);
      setActiveStep(1);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSubmitButton = () => {
    if (loading) {
      return (
        <div className="flex w-full max-w-[300px] items-center justify-center">
          <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="42px" />
        </div>
      );
    }

    if (completedSteps[0] && !hasChanges) {
      return (
        <button
          type="submit"
          className="flex items-center justify-center gap-1 font-textFont text-base text-lightText underline dark:text-darkText"
          disabled={blockAll}
        >
          Tratar
          <ArrowUp />
        </button>
      );
    }

    return (
      <button
        type="submit"
        disabled={!isValid || blockAll}
        className={clsx(
          'flex h-[46px] w-full max-w-[300px] items-center justify-center rounded-3xl px-6 py-[18px] font-titleFont text-base font-semibold',
          isDark ? 'dark:border-darkText dark:bg-darkText dark:text-lightText' : 'border-buttonsLigth bg-buttonsLigth text-white',
          isValid && (isDark ? 'buttonSecondDark' : 'buttonSecond'),
          'disabled:border-gray-400 disabled:bg-custom-blue-300 disabled:text-darkText dark:disabled:bg-calculatorDark2 dark:disabled:text-darkText'
        )}
      >
        Siguiente
      </button>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="mx-0 grid grid-cols-1 gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:grid-cols-2 sm-phone:gap-x-8 sm-phone:gap-y-2">
        <InputSteps
          label="Nombre"
          name="sender_first_name"
          id="sender_first_name"
          type="text"
          placeholder={errors.sender_first_name ? 'Nombre *' : 'Nombre'}
          disabled={blockAll}
          register={register}
          watch={watch}
          rules={{
            required: 'El Nombre es obligatorio',
            pattern: {
              value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
              message: 'El Nombre solo puede contener letras y espacios',
            },
          }}
          error={errors.sender_first_name}
          className="order-1"
        />

        <InputSteps
          id="sender_last_name"
          name="sender_last_name"
          label="Apellido"
          type="text"
          placeholder={errors.sender_last_name ? 'Apellido *' : 'Apellido'}
          disabled={blockAll}
          register={register}
          watch={watch}
          rules={{
            required: 'El Apellido es obligatorio',
            pattern: {
              value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
              message: 'El Apellido solo puede contener letras y espacios',
            },
          }}
          error={errors.sender_last_name}
          className="order-2 sm-phone:order-3"
        />

        <InputSteps
          label="Correo Electrónico"
          name="email"
          id="email"
          type="email"
          placeholder={errors.email ? 'Correo Electrónico *' : 'Correo Electrónico'}
          disabled={blockAll}
          register={register}
          watch={watch}
          rules={{
            required: 'El Correo Electrónico es obligatorio',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: 'El formato del Correo electrónico es inválido',
            },
          }}
          error={errors.email}
          className="order-3 sm-phone:order-2"
        />

        {/* Teléfono */}
        <div className="relative order-4 flex flex-col">
          <label
            htmlFor="phone"
            className={clsx(
              'mb-1 ml-2.5 h-5 font-textFont text-sm transition-opacity duration-300',
              'text-lightText dark:text-darkText',
              isFocused || !!watch('phone') ? 'opacity-100' : 'opacity-0',
            )}
          >
            Teléfono
          </label>
          <div
            className={clsx(
              'flex items-center rounded-2xl border bg-transparent py-2 pr-5',
              'text-lightText dark:bg-inputDark',
              errors.phone
                ? 'border-errorColor placeholder-errorColor'
                : 'border-inputLightDisabled hover:border-inputLight dark:border-transparent dark:hover:border-lightText',
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <Controller
              name="calling_code"
              control={control}
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field, fieldState }) => (
                <SelectCountry
                  selectedCodeCountry={field.value}
                  blockAll={blockAll}
                  setSelectedCodeCountry={field.onChange}
                  errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                  textColor={['lightText', 'lightText']}
                  classNames="pl-4 w-[118px]"
                />
              )}
            />
            <input
              placeholder={isFocused ? '' : errors.phone ? 'Teléfono*' : 'Teléfono'}
              className={clsx(
                'inputChangeAutofillReverse w-full border-none bg-transparent font-textFont',
                errors.phone
                  ? 'placeholder-errorColor'
                  : 'placeholder-inputLightDisabled dark:placeholder-placeholderDark',
              )}
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
          {errors.phone && (
            <p className="px-[10px] font-textFont text-sm text-errorColor">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* ¿Cuenta propia? */}
        <div className="order-5 mx-[10px] flex w-full items-center sm-phone:mx-0 sm-phone:justify-center">
          <p className="h-5 font-textFont text-lightText dark:text-darkText sm-phone:text-sm md:text-lg">
            ¿Se transfiere a una cuenta propia?
          </p>
        </div>
        <div className="order-6 flex w-full flex-col">
          <Controller
            name="own_account"
            control={control}
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field, fieldState }) => (
              <SelectBoolean
                blockAll={blockAll}
                selectedOption={field.value}
                setSelectedOption={field.onChange}
                errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
              />
            )}
          />
        </div>
      </div>

      {/* Botón de acción */}
      <div className="flex justify-center sm-phone:justify-end">{renderSubmitButton()}</div>
    </form>
  );
};

export default StepOne;
