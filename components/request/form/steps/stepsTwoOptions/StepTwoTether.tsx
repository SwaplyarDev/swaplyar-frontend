import React from 'react';
import { Control, FieldErrors, UseFormRegister, UseFormGetValues, UseFormWatch, Controller } from 'react-hook-form';
import SelectRed from '../../inputs/SelectRed';
import InfoStep from '@/components/ui/InfoStep/InfoStep';
import clsx from 'clsx';
import CustomInput from '@/components/ui/Input/CustomInput';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

interface StepTwoTetherProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
  control: Control<any>;
  watch: UseFormWatch<any>;
  completedSteps: boolean[];
}

const StepTwoTether: React.FC<StepTwoTetherProps> = ({
  register,
  errors,
  getValues,
  blockAll,
  formData,
  control,
  watch,
  completedSteps,
}) => {
  const { isDark } = useDarkTheme();
  
  return (
    <>
      <div
        className={clsx(
          completedSteps[1]
            ? 'absolute right-[15px] top-[15px] sm:right-14'
            : 'absolute right-3 sm:right-4 md:right-5 top-3 sm:top-4 md:top-5'
        )}
      >
        <InfoStep option="cripto" />
      </div>

      <div className="flex flex-col gap-2 sm:mx-0 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
        <p
          className={`pb-2 text-xs sm:text-sm font-textFont leading-5 sm:leading-6 ${
            isDark ? "text-custom-grayD-200" : "text-custom-grayD-600"
          }`}
        >
          Para un depósito correcto, asegúrese de que la dirección del monedero es exacta. 
          De lo contrario, los fondos que enviamos a la dirección indicada no se añadirán ni se reembolsarán.
        </p>
        <div className="relative flex w-full flex-col">
          <Controller
            name="red_selection"
            control={control}
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => (
              <SelectRed
                blockAll={blockAll}
                selectedRed={field.value ?? undefined}
                setSelectedRed={field.onChange}
                errors={errors}
              />
            )}
          />
        </div>
        <CustomInput
          label="Dirección USDT"
          name="usdt_direction"
          type="text"
          placeholder="Dirección USDT"
          disabled={blockAll}
          register={register}
          value={watch('usdt_direction')}
          validation={{
            required: 'La dirección de USDT es obligatoria',
            pattern: {
              value: /^(0x[a-fA-F0-9]{40}|T[a-zA-Z0-9]{33})$/,
              message: 'La dirección de USDT no es válida',
            },
          }}
          error={errors.usdt_direction?.message as string}
        />

        <CustomInput
          label="RE-ENTER Dirección USDT"
          name="re_enter_usdt_direction"
          type="text"
          placeholder="RE-ENTER Dirección USDT"
          disabled={blockAll}
          register={register}
          value={watch('re_enter_usdt_direction')}
          validation={{
            required: 'La dirección de USDT es obligatoria',
            validate: (value: string) => {
              const originalValue = getValues('usdt_direction');
              return (
                value === originalValue || 'Debe coincidir con la Dirección USDT'
              );
            },
          }}
          error={errors.re_enter_usdt_direction?.message as string}
        />
      </div>
    </>
  );
};

export default StepTwoTether;