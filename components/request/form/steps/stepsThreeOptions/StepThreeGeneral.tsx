import React, { useState } from 'react';
import clsx from 'clsx';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InputCopy from '../../inputs/InputCopy';
import { System } from '@/types/data';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';

interface StepThreeGeneralProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  getValues: UseFormGetValues<any>;
  watch: UseFormWatch<any>;
  blockAll: boolean;
  formData: any;
  sendAmount: string | null;
  selectedSendingSystem: System | null;
  selectedReceivingSystem: System | null;
  receiveAmount: string | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  restRegister: any;
}

const StepThreeGeneral: React.FC<StepThreeGeneralProps> = ({
  register,
  errors,
  blockAll,
  formData,
  sendAmount,
  selectedSendingSystem,
  selectedReceivingSystem,
  receiveAmount,
  handleChange,
  restRegister,
  watch,
}) => {
  const { isDark } = useDarkTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <p className="text-left">
        tienes que realizar el pago de{' '}
        <span className="font-semibold underline">
          {selectedSendingSystem?.coinSign} {sendAmount}
        </span>{' '}
        al email asdfgh@asdfgh.com con el concepto de "PAGO" para enviarte el dinero a la cuenta{' '}
        <span className="font-semibold underline">
          {' '}
          {formData.stepTwo.re_enter_bank_email == '' &&
            `${formData.stepTwo.receiver_first_name} ${formData.stepTwo.receiver_last_name}`}{' '}
          {formData.stepTwo.re_enter_bank_email == ''
            ? formData.stepTwo.re_transfer_identification
            : formData.stepTwo.re_enter_bank_email}
        </span>
      </p>
      <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
        <div className="flex w-full flex-col gap-4">
          <InputCopy
            id="pay_email"
            name="pay_email"
            label="Email a pagar"
            type="text"
            value="asdfgh@asdfgh.com"
            disabled={true}
            placeholder=""
            register={register}
            watch={watch}
            rules={{ required: 'Este campo es obligatorio' }}
            error={errors.pay_email ? (errors.pay_email as FieldError) : undefined}
          />
          <InputCopy
            label="Monto a pagar"
            name="send_amount"
            id="send_amount"
            type="text"
            placeholder="Monto Enviar"
            disabled={true}
            value={`${selectedSendingSystem?.coinSign} ${sendAmount?.toString()}`}
            register={register}
            watch={watch}
            rules={{
              required: 'Este campo es obligatorio',
            }}
            error={errors.send_amount ? (errors.send_amount as FieldError) : undefined}
          />
          <InputSteps
            label="Monto a Recibir"
            name="receive_amount"
            id="receive_amount"
            type="text"
            placeholder="Monto a Recibir"
            disabled={true}
            register={register}
            watch={watch}
            rules={{
              required: 'Este campo es obligatorio',
            }}
            error={errors.receive_amount ? (errors.receive_amount as FieldError) : undefined}
            disabledWithoutMargin={true}
          />
          <div className="flex h-full flex-col">
            <label
              htmlFor="note"
              className={clsx(
                'font-textFont text-lightText dark:text-darkText',
                'mb-1 ml-2.5 text-sm transition-opacity duration-300',
                isFocused || watch('note') ? 'opacity-100' : 'opacity-0',
              )}
            >
              Nota (opcional)
            </label>
            <textarea
              {...register('note', { required: false })}
              id="note"
              rows={1}
              disabled={blockAll}
              placeholder={isFocused ? '' : 'Nota (opcional)'}
              className={clsx(
                `block w-full rounded-2xl border border-inputLightDisabled px-3 py-2 placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight focus:placeholder-transparent dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText hover:dark:border-transparent dark:hover:placeholder-lightText focus:dark:border-transparent focus:dark:ring-transparent`,
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => setIsFocused(e.target.value !== '')}
            ></textarea>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <label
            htmlFor="proof_of_payment"
            className={clsx(
              'relative flex h-full cursor-pointer flex-col',
              errors.proof_of_payment ? 'text-errorColor' : 'text-lightText dark:text-darkText',
            )}
          >
            <p className="ml-1 h-5 text-xs">Comprobante</p>
            <div
              className={clsx(
                'group flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-2xl border-[1px] border-inputLightDisabled py-2 text-center hover:border-inputLight dark:border-disabledDarkText dark:text-lightText dark:hover:border-darkText',
                errors.proof_of_payment
                  ? 'border-errorColor dark:border-errorColor'
                  : 'hover:border-blue-600 dark:hover:border-white',
              )}
            >
              <p className="mb-1 hidden text-sm text-inputLightDisabled group-hover:text-buttonsLigth dark:text-disabledDarkText group-hover:dark:text-darkText lg:inline-block">
                SUBIR COMPROBANTE
              </p>
              <div
                className={`${
                  isDark ? 'buttonSecondDark' : 'buttonSecond'
                } relative mt-5 h-[48px] w-full max-w-[200px] items-center justify-center rounded-3xl border border-disabledButtonsLigth bg-disabledButtonsLigth p-[10px] text-lg text-darkText group-hover:border-buttonsLigth group-hover:bg-buttonsLigth group-hover:text-darkText dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText group-hover:dark:border-darkText group-hover:dark:bg-darkText group-hover:dark:text-lightText lg:mt-0`}
              >
                Subir Archivo
              </div>
              <span id="file-name" className="w-full text-xs text-[#6B7280] lg-tablet:text-sm">
                No hay archivo seleccionado
              </span>
              {errors.proof_of_payment && 'Este campo es obligatorio' && (
                <p className="text-sm text-errorColor">Este campo es obligatorio, accepta: .png, .jpg y .pdf</p>
              )}
            </div>
          </label>
          <input
            accept=".png,.jpg,.pdf"
            id="proof_of_payment"
            type="file"
            disabled={blockAll}
            placeholder="SUBIR COMPROBANTE"
            onChange={handleChange}
            {...restRegister}
            className={clsx(
              'hidden h-full w-full rounded border border-[#6B7280] bg-gray-200 px-5 py-2 dark:bg-lightText',
              errors.proof_of_payment && 'Este campo es obligatorio'
                ? 'border-errorColor hover:border-blue-600 dark:hover:border-white'
                : 'hover:border-blue-600 dark:hover:border-white',
            )}
          />
        </div>
      </div>
    </>
  );
};

export default StepThreeGeneral;
