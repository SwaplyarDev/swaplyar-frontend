import React from 'react';
import {
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  useWatch,
  UseFormWatch,
  useForm,
} from 'react-hook-form';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';
import SelectRed from '../../inputs/SelectRed';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';

interface StepTwoTetherProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
  control: any;
}

const StepTwoTether: React.FC<StepTwoTetherProps> = ({ register, errors, getValues, blockAll, control, watch }) => {
  const formValues = useWatch({ control });
  const receiveAmount = localStorage.getItem('receiveAmount');
  console.log(formValues.red_selection);
  return (
    <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
      <div className="flex w-full flex-col gap-4">
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
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="realative flex w-full flex-col">
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
            required: 'El monto es obligatorio',
          }}
          error={errors.recieveAmountRed ? (errors.recieveAmountRed as FieldError) : undefined}
        />
      </div>
    </div>
  );
};

export default StepTwoTether;
