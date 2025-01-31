import React from 'react';
import clsx from 'clsx';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InputCopy from '../../inputs/InputCopy';
import InputField from '@/components/ui/contact-form/InputField';
import { System } from '@/types/data';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';

interface StepThreeGeneralProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  getValues: UseFormGetValues<any>;
  watch: UseFormWatch<any>; // 🔹 Agregado para solucionar el primer error
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
  console.log(' selectedSendingSystem: ', selectedSendingSystem);
  console.log(' selectedReceivingSystem: ', selectedReceivingSystem);
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
          <div className="flex flex-col">
            <label
              htmlFor="pay_email"
              className={clsx(
                'ml-1 h-5 text-xs',
                errors.pay_email ? 'text-red-500' : 'text-lightText dark:text-darkText',
              )}
            >
              Email a pagar
            </label>
            <InputCopy
              id="pay_email"
              type="text"
              value={'asdfgh@asdfgh.com'}
              disabled={true}
              placeholder=""
              register={register('pay_email', { required: true })}
              error={errors.pay_email && 'Este campo es obligatorio'}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="send_amount"
              className={clsx(
                'ml-1 h-5 text-xs',
                errors.send_amount ? 'text-red-500' : 'text-lightText dark:text-darkText',
              )}
            >
              Monto a pagar
            </label>
            <InputCopy
              id="send_amount"
              type="text"
              value={`${selectedSendingSystem?.coinSign} ${sendAmount?.toString()}`}
              disabled={true}
              placeholder="Monto Enviar"
              register={register('send_amount', { required: true })}
              error={errors.send_amount && 'Este campo es obligatorio'}
            />
          </div>

          {/* <div className="flex flex-col">
            <label
              htmlFor="receive_amount"
              className={clsx(
                'ml-1 h-5 text-xs',
                errors.receive_amount ? 'text-red-500' : 'text-lightText dark:text-darkText',
              )}
            >
              Monto a Recibir
            </label>
            <InputField
              id="receive_amount"
              type="text"
              value={`${selectedReceivingSystem?.coinSign} ${receiveAmount?.toString()}`}
              disabled={true}
              placeholder="Monto a Recibir"
              register={register('receive_amount', { required: true })}
              error={errors.receive_amount && 'Este campo es obligatorio'}
            />
          </div> */}

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
          />

          <div className="flex flex-col">
            <label
              htmlFor="proof_of_payment"
              className={clsx(
                'cursor-pointer',
                errors.proof_of_payment ? 'text-red-500' : 'text-lightText dark:text-darkText',
              )}
            >
              <p className="ml-1 h-5 text-xs">Comprobante con formato: PNG o JPG</p>
              <div
                className={clsx(
                  'flex w-full flex-col items-center gap-2 rounded border border-[#6B7280] bg-gray-200 px-5 py-2 dark:bg-lightText xs-phone:flex-row sm-phone:flex-col lg-tablet:h-[38px] lg-tablet:flex-row lg-tablet:items-center',
                  errors.proof_of_payment ? 'border-red-500' : 'hover:border-blue-600 dark:hover:border-white',
                )}
              >
                <p className="w-full text-sm xs-phone:max-w-32 sm-phone:max-w-[inherit] lg-tablet:max-w-40 lg-tablet:text-base">
                  Subir comprobante
                </p>
                <span id="file-name" className="w-full text-xs text-[#6B7280] lg-tablet:text-sm">
                  No hay archivo seleccionado
                </span>
              </div>
            </label>
            <div className="flex h-full flex-col">
              <input
                id="proof_of_payment"
                type="file"
                disabled={blockAll}
                placeholder="SUBIR COMPROBANTE"
                onChange={handleChange}
                {...restRegister}
                className={clsx(
                  'hidden h-full w-full rounded border border-[#6B7280] bg-gray-200 px-5 py-2 dark:bg-lightText',
                  errors.proof_of_payment && 'Este campo es obligatorio'
                    ? 'border-red-500 hover:border-blue-600 dark:hover:border-white'
                    : 'hover:border-blue-600 dark:hover:border-white',
                )}
              />
              {errors.proof_of_payment && 'Este campo es obligatorio' && (
                <p className="text-sm text-red-500">• Este campo es obligatorio</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-full flex-col">
            <label
              htmlFor="note"
              className={clsx('ml-1 h-5 text-xs', errors.note ? 'text-red-500' : 'text-lightText dark:text-darkText')}
            >
              Nota (opcional)
            </label>
            <textarea
              {...register('note', { required: false })}
              id="note"
              disabled={blockAll}
              placeholder="Añade una nota si lo deseas ;)"
              className={clsx(
                'h-full w-full rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                errors.note ? 'border-red-500' : 'hover:border-blue-600 dark:hover:border-white',
              )}
            ></textarea>
            {errors.note && <p className="text-sm text-red-500">Este campo es obligatorio</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default StepThreeGeneral;
