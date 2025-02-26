import React from 'react';
import { Controller, FieldErrors, UseFormGetValues, UseFormRegister, useWatch, UseFormWatch } from 'react-hook-form';
import SelectRed from '../../inputs/SelectRed';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';
import InfoStep from '@/components/ui/InfoStep/InfoStep';
import clsx from 'clsx';

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
  const receiveAmount = localStorage.getItem('receiveAmount');
  console.log(formValues.red_selection);
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
          <Controller
            name="red_selection"
            control={control}
            defaultValue={undefined}
            rules={{
              required: 'Este campo es obligatorio',
            }}
            render={({ field, fieldState }) => (
              <SelectRed
                blockAll={blockAll}
                selectedRed={field.value}
                setSelectedRed={(option) => field.onChange(option)}
                errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
              />
            )}
          />
        </div>

        <InputSteps
          label="Recibes exactamente"
          name="recieveAmountRed"
          id="recieveAmountRed"
          type="text"
          placeholder={`Monto a Recibir por ${formValues.red_selection?.label ? formValues.red_selection?.label : 'Red'}`}
          disabled={true}
          value={`${receiveAmount} USDT ${formValues.red_selection?.label ? formValues.red_selection?.label : 'Red'}`}
          register={register}
          watch={watch}
          rules={{
            required: false,
          }}
          error={errors.recieveAmountRed ? (errors.recieveAmountRed as FieldError) : undefined}
          className="order-4"
        />
      </div>
    </>
  );
};

export default StepTwoTether;
