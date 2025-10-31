import React from 'react';
import { Control, FieldErrors, UseFormRegister, UseFormGetValues, UseFormWatch, Controller } from 'react-hook-form';
import SelectRed from '../../inputs/SelectRed';
import InfoStep from '@/components/ui/InfoStep/InfoStep';
import clsx from 'clsx';
import CustomInput from '@/components/ui/Input/CustomInput';

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
  return (
    <div className="space-y-4">
      <div
        className={clsx(
          completedSteps[1]
            ? 'absolute right-[15px] top-[15px] sm:right-14'
            : 'absolute right-5 top-[9rem] mini-phone:top-4'
        )}
      >
        <InfoStep option="cripto" />
      </div>

      <div className="flex flex-col gap-4 xs:mx-6 sm-phone:grid-cols-2 sm-phone:gap-x-8 sm-phone:gap-y-2">
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

        <div className="relative order-3 flex w-full flex-col sm-phone:order-2">
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
      </div>
    </div>
  );
};

export default StepTwoTether;