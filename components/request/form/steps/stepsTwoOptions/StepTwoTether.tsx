import React from 'react';
import { Controller, FieldErrors, UseFormGetValues, UseFormRegister, useWatch, UseFormWatch } from 'react-hook-form';
import SelectRed from '../../inputs/SelectRed';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';
import InfoStep from '@/components/ui/InfoStep/InfoStep';
import clsx from 'clsx';
import { System } from '@/types/data';

interface StepTwoTetherProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
  control: any;
  completedSteps: boolean[];
}

const StepTwoTether: React.FC<StepTwoTetherProps> = ({
  register,
  errors,
  getValues,
  blockAll,
  control,
  watch,
  completedSteps,
}) => {
  const formValues = useWatch({ control });
  return (
    <>
      <div
        className={clsx(
          completedSteps[1]
            ? 'absolute right-[15px] top-[15px] sm:right-14'
            : 'absolute right-5 top-[9rem] mini-phone:top-4',
        )}
      >
        <InfoStep option="cripto" />
      </div>
      <div className="mx-0 grid grid-cols-1 gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:grid-cols-2 sm-phone:gap-x-8 sm-phone:gap-y-2">
        <InputSteps
          label="Dirección USDT"
          name="usdt_direction"
          id="usdt_direction"
          type="text"
          placeholder="Dirección USDT"
          disabled={blockAll}
          register={register}
          watch={watch}
          rules={{
            required: 'La dirección de USDT es obligatoria',
            pattern: {
              value: /^(0x[a-fA-F0-9]{40}|T[a-zA-Z0-9]{33})$/,
              message: 'La dirección de USDT no es válida',
            },
          }}
          error={errors.usdt_direction ? (errors.usdt_direction as FieldError) : undefined}
          className="order-1"
        />
        <InputSteps
          label="RE-ENTER Dirección USDT"
          name="re_enter_usdt_direction"
          id="re_enter_usdt_direction"
          type="text"
          placeholder="RE-ENTER Dirección USDT"
          disabled={blockAll}
          register={register}
          watch={watch}
          rules={{
            required: 'La dirección de USDT es obligatoria',
            validate: (value) => {
              const originalValue = getValues('usdt_direction');
              return value === originalValue || 'Debe coincidir con la Dirección USDT';
            },
          }}
          error={errors.re_enter_usdt_direction ? (errors.re_enter_usdt_direction as FieldError) : undefined}
          className="order-2 sm-phone:order-3"
        />

        <div className="realative order-3 flex w-full flex-col sm-phone:order-2">
          <InputSteps
            label="Red"
            name="red_selection"
            id="red_selection"
            type="text"
            placeholder="Red de la billetera"
            disabled={blockAll}
            register={register}
            watch={watch}
            readOnly
            rules={{
              required: 'La red es obligatoria',
            }}
            error={errors.red_selection ? (errors.red_selection as FieldError) : undefined}
            className="order-3 sm-phone:order-2"
          />
        </div>
      </div>
    </>
  );
};

export default StepTwoTether;
