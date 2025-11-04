import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import SelectBoolean from '../inputs/SelectBoolean';
import { CountryOption } from '@/types/request/request';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import SelectCountry from '../inputs/SelectCountry';
import useWalletStore from '@/store/useWalletStore';
import CustomInput from '@/components/ui/Input/CustomInput';
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
  } = useForm<FormData>({ mode: 'onChange', reValidateMode: 'onChange', });
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
    
    const defaultCountry = defaultCountryOptions.find(option => option.callingCode === '+54') || defaultCountryOptions[0];
    const finalCallingCode = calling_code || defaultCountry;
    
    const newValues = {
      first_name,
      last_name,
      calling_code: finalCallingCode,
      phone,
      email,
      own_account,
    };
    
    setValue('first_name', first_name);
    setValue('last_name', last_name);
    setValue('calling_code', finalCallingCode);
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
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
      <div className="mx-0 grid grid-cols-1 gap-2 sm:mx-0 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
        <CustomInput
          label="Nombre"
          type="text"
          name="first_name"
          placeholder={errors.first_name ? 'Nombre *' : 'Nombre'}
          disabled={blockAll}
          register={register}
          value={watch('first_name')}
          validation={{
            required: 'El Nombre es obligatorio',
            pattern: {
              value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
              message: 'El Nombre solo puede contener letras y espacios',
            },
          }}
          error={errors.first_name?.message}
        />

        <CustomInput
          label="Apellido"
          type="text"
          name="last_name"
          placeholder={errors.last_name ? 'Apellido *' : 'Apellido'}
          disabled={blockAll}
          register={register}
          value={watch('last_name')}
          validation={{
            required: 'El Apellido es obligatorio',
            pattern: {
              value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
              message: 'El Apellido solo puede contener letras y espacios',
            },
          }}
          error={errors.last_name?.message}
        />

        <CustomInput
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder={errors.email ? 'Correo Electrónico *' : 'Correo Electrónico'}
          disabled={blockAll}
          register={register}
          value={watch('email')}
          validation={{
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'El formato del correo electrónico es inválido',
            },
          }}
          error={errors.email?.message}
        />
        <div className="relative order-4 flex flex-col w-full">
          <Controller
            name="calling_code"
            control={control}
            defaultValue={defaultCountryOptions.find((option) => option.callingCode === '+54')}
            rules={{ validate: () => true }}
            render={({ field, fieldState }) => (
              <CustomInput
                label="Teléfono"
                type="tel"
                name="phone"
                register={register}
                value={watch('phone')}
                defaultValue=""
                validation={{
                  validate: (value: string) => {
                    if (!value) return 'El número de teléfono es obligatorio';
                    const result = validatePhoneNumber(value, field.value);
                    return result === true ? true : result;
                  },
                }}
                error={errors.phone?.message}
                disabled={blockAll}
              >
                <SelectCountry
                  selectedCodeCountry={field.value}
                  setSelectedCodeCountry={(option) => {
                    field.onChange(option);
                    trigger('phone');
                  }}
                  errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                  textColor={['lightText', 'lightText']}
                  classNames="pl-4 w-full"
                />
              </CustomInput>
            )}
          />
        </div>
        {!selectedWallet && (
          <>
            <div className="order-6 flex w-full justify-center items-center flex-col sm-phone:col-span-2">
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
      <div className="flex max-sm:justify-center sm:justify-end">
        {completedSteps[0] ? (
          hasChanges ? (
            <AuthButton
              label="Siguiente"
              type="submit"
              isDark={isDark}
              loading={loading}
              disabled={!isValid || blockAll}
              className="max-sm:w-full sm:max-w-[344px]"
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
            className="w-full sm:max-w-[344px]"
          />
        )}
      </div>
    </form>
  );
};

export default memo(StepOne);