import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import clsx from 'clsx';
import SelectBoolean from '../inputs/SelectBoolean';
import { CountryOption } from '@/types/request/request';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import SelectCountry from '../inputs/SelectCountry';
import InputSteps from '@/components/inputSteps/InputSteps';
import useWalletStore from '@/store/useWalletStore';
//importamos validacion nueva para los telefonos.
import { validatePhoneNumber } from '@/utils/validatePhoneNumber'; 
import { defaultCountryOptions } from '@/utils/defaultCountryOptions';
import AuthButton from '@/components/auth/AuthButton';

interface FormData {
  first_name: string;
  last_name: string;
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
    trigger,
  } = useForm<FormData>({ mode: 'onChange' });
  const { selectedWallet } = useWalletStore();
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
  } = useStepperStore((s) => ({
    markStepAsCompleted: s.markStepAsCompleted,
    setActiveStep: s.setActiveStep,
    formData: s.formData,
    updateFormData: s.updateFormData,
    completedSteps: s.completedSteps,
    submitOneStep: s.submitOneStep,
    updateOneStep: s.updateOneStep,
    idTransaction: s.idTransaction,
    setIdTransaction: s.setIdTransaction,
  }));
  const { isDark } = useDarkTheme();

  const [initialValues, setInitialValues] = useState<FormData | null>(null);

  const formValues = useWatch({ control });

  useEffect(() => {
    const { first_name, last_name, calling_code, phone, email, own_account } = formData.stepOne;
    const newValues = {
      first_name,
      last_name,
      calling_code,
      phone,
      email,
      own_account,
    };
    setValue('first_name', first_name);
    setValue('last_name', last_name);
    setValue('calling_code', calling_code);
    setValue('phone', phone);
    setValue('email', email);
    setValue('own_account', own_account);

    setInitialValues(newValues);
  }, [formData.stepOne, setValue]);
  useEffect(() => {
    if (selectedWallet) {
      setValue('own_account', 'false');
      updateFormData(0, { own_account: 'false' });
    }
  }, [selectedWallet, setValue, updateFormData]);
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
        setIdTransaction(responseData.transaction_id);
        markStepAsCompleted(0);
        setActiveStep(1);
        setLoading(false);
      } else {
        console.error('No se pudo completar el envío de los datos');
      }
    }
  };

  const deepEqual = useCallback((obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
    }
    return true;
  }, []);

  const hasChanges = useMemo(
    () => initialValues && !deepEqual(initialValues, formValues),
    [initialValues, formValues, deepEqual],
  );

  const [isFocused, setIsFocused] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="mx-0 grid grid-cols-1 gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:grid-cols-2 sm-phone:gap-x-8 sm-phone:gap-y-2">
        <InputSteps
          label="Nombre"
          name="first_name"
          id="first_name"
          type="text"
          placeholder={errors.first_name ? 'Nombre *' : 'Nombre'}
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
          error={errors.first_name}
          className={'order-1'}
        />

        <InputSteps
          id="last_name"
          name="last_name"
          label="Apellido"
          type="text"
          placeholder={errors.last_name ? 'Apellido *' : 'Apellido'}
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
          error={errors.last_name}
          className={`order-2 sm-phone:order-3`}
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
        <div className="relative order-4 flex flex-col">
          <label
            htmlFor="phone"
            className={clsx(
              'mb-1 ml-2.5 h-5 font-textFont text-sm text-lightText transition-opacity duration-300 dark:text-darkText',
              isFocused || !!watch('phone') ? 'opacity-100' : 'opacity-0',
            )}
          >
            Telefono
          </label>
          <div
            className={clsx(
              'flex max-h-[42px] max-w-full items-center rounded-2xl border bg-transparent py-2 pr-5 text-lightText focus:shadow-none focus:outline-none focus:ring-0 dark:bg-inputDark',
              watch('phone') && 'border-inputLight dark:border-lightText',
              errors.phone
                ? 'mb-0 border-errorColor placeholder-errorColor'
                : 'mb-5 border-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:hover:border-lightText dark:hover:placeholder-lightText',
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <Controller
              name="calling_code"
              control={control}
              defaultValue={defaultCountryOptions.find((option) => option.callingCode === '+54')}
              rules={{
                required: 'Este campo es obligatorio',
              }}
              render={({ field, fieldState }) => (
                <SelectCountry
                  selectedCodeCountry={field.value}
                  blockAll={blockAll}
                  setSelectedCodeCountry={(option) => {
                    field.onChange(option)
                    trigger('phone');
                  }}
                  errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                  textColor={['lightText', 'lightText']}
                  classNames="pl-4 w-[118px]"
                />
              )}
            />
            <input
              placeholder={isFocused ? '' : errors.phone ? 'Telefono*' : 'Telefono'}
              className={clsx(
                'inputChangeAutofillReverse w-full border-none bg-transparent font-textFont focus:border-none focus:outline-none focus:ring-0',
                errors.phone
                  ? 'placeholder-errorColor'
                  : 'placeholder-inputLightDisabled dark:placeholder-placeholderDark',
              )}
              type="tel"
              disabled={blockAll}
              {...register('phone', {
                required: 'El número de teléfono es obligatorio',
                validate:(value)=>{
                  const country = watch('calling_code');
                  const result = validatePhoneNumber(value, country);
                  return result === true ? true : result;
                },
              })}
            />
          </div>
          {errors.phone && (
            <p className="px-[10px] font-textFont text-sm text-errorColor">{errors.phone.message as string}</p>
          )}
        </div>
        {!selectedWallet && (
          <>
            <div className="order-5 mx-[10px] flex w-full items-center justify-start sm-phone:mx-0 sm-phone:justify-center">
              <p className="h-5 font-textFont text-lightText dark:text-darkText sm-phone:ml-0 sm-phone:text-sm md:text-lg">
                ¿Se transfiere a una cuenta propia?
              </p>
            </div>
            <div className="order-6 flex w-full flex-col">
              <Controller
                name="own_account"
                control={control}
                defaultValue={'Seleccione una opción'}
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
          </>
        )}
      </div>
      <div className="flex justify-center sm-phone:justify-end">
  {completedSteps[0] ? (
    hasChanges ? (
      <AuthButton
        label="Siguiente"
        type="submit"
        isDark={isDark}
        loading={loading}
        disabled={!isValid || blockAll}
        className="w-full max-w-[300px] "
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
      className="w-full max-w-[300px] "
    />
  )}
</div>

    </form>
  );
};

export default memo(StepOne);
