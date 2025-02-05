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
        {/* <div className="flex flex-col">
          <label
            htmlFor="usdt_direction"
            className={clsx(
              'ml-1 h-5 text-xs',
              errors.usdt_direction ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            Direccion USDT
          </label>
          <InputField
            disabled={blockAll}
            id="usdt_direction"
            type="text"
            placeholder="Direccion USDT"
            register={register('usdt_direction', {
              required: 'La dirección de USDT es obligatorio',
              pattern: {
                value: /^(0x[a-fA-F0-9]{40}|T[a-zA-Z0-9]{33})$/,
                message: 'La dirección de USDT no es válida',
              },
            })}
            error={errors.usdt_direction?.message ? String(errors.usdt_direction.message) : undefined}
          />
        </div> */}

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
        {/* <div className="flex flex-col">
          <label
            htmlFor="re_enter_usdt_direction"
            className={clsx(
              'ml-1 h-5 text-xs',
              errors.re_enter_usdt_direction ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            RE-ENTER Direccion USDT
          </label>
          <InputField
            disabled={blockAll}
            id="re_enter_usdt_direction"
            type="text"
            placeholder="RE-ENTER Direccion USDT"
            register={register('re_enter_usdt_direction', {
              required: `La dirección de USDT es obligatorio`,
              validate: (value) => {
                const originalValue = getValues('usdt_direction');
                return value === originalValue || 'Debe coincidir con la Direccion USDT';
              },
            })}
            error={errors.re_enter_usdt_direction?.message ? String(errors.re_enter_usdt_direction.message) : undefined}
          />
        </div> */}
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

        {/* <div className="flex flex-col">
          <label
            htmlFor="recieveAmountRed"
            className={clsx(
              'ml-1 h-5 text-xs',
              errors.recieveAmountRed ? 'text-red-500' : 'text-lightText dark:text-darkText',
            )}
          >
            Recibes exactamente
          </label>
          <InputField
            disabled={true}
            id="recieveAmountRed"
            type="text"
            value={`${receiveAmount} USDT ${formValues.red_selection?.label ? formValues.red_selection?.label : 'Red'}`}
            placeholder={`Monto a Recibir por ${formValues.red_selection?.label ? formValues.red_selection?.label : 'Red'}`}
            register={register('recieveAmountRed', {
              required: 'El monto es obligatorio',
            })}
            error={errors.recieveAmountRed?.message ? String(errors.recieveAmountRed.message) : undefined}
          />
        </div> */}

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
