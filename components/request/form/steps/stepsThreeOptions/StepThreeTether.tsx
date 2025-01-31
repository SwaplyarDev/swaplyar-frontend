import React from 'react';
import clsx from 'clsx';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InputCopy from '../../inputs/InputCopy';
import InputField from '@/components/ui/contact-form/InputField';
import IconTron from '@/components/ui/IconsRed/IconTron';
import Image from 'next/image';
import { System } from '@/types/data';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';

interface StepThreeTetherProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  blockAll: boolean;
  formData: any;
  sendAmount: string | null;
  selectedSendingSystem: System | null;
  selectedReceivingSystem: System | null;
  receiveAmount: string | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  restRegister: any;
}

const StepThreeTether: React.FC<StepThreeTetherProps> = ({
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
  return (
    <>
      <p className="text-left">
        tienes que realizar el pago de{' '}
        <span className="font-semibold underline">
          {sendAmount} {selectedSendingSystem?.coin}
        </span>{' '}
        a las direccion <span className="font-semibold underline">TSgBPeFSb9TxJWyzDjDfuNqBktF898ZFUb</span> con el
        concepto de "PAGO" para enviarte el dinero a la cuenta{' '}
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
              htmlFor="pay_usdt_direction"
              className={clsx(
                'ml-1 h-5 text-xs',
                errors.pay_usdt_direction ? 'text-red-500' : 'text-lightText dark:text-darkText',
              )}
            >
              Direccion USDT a pagar
            </label>
            <InputCopy
              id="pay_usdt_direction"
              type="text"
              value={'TSgBPeFSb9TxJWyzDjDfuNqBktF898ZFUb'}
              disabled={true}
              placeholder=""
              register={register('pay_usdt_direction', { required: true })}
              error={errors.pay_usdt_direction && 'Este campo es obligatorio'}
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
              type="number"
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
              type="number"
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
            type="number"
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
            <div className="ml-1 flex gap-2 text-xs">
              <p>Red: Tron (TRC-20)</p>
              <IconTron />
            </div>
            <div
              className={clsx(
                'h-full w-full rounded border border-[#6B7280] px-5 py-2 hover:border-blue-600 dark:bg-lightText dark:hover:border-white',
              )}
            >
              <p>QR</p>
              <div className="flex w-full items-center justify-center">
                <Image src={'/images/QR_image.png'} alt="qr" width={200} height={200} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepThreeTether;
