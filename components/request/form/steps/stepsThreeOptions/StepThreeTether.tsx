import React, { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InputCopy from '../../inputs/InputCopy';
import IconTron from '@/components/ui/IconsRed/IconTron';
import Image from 'next/image';
import { System } from '@/types/data';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { qrDark, qrLight } from '@/utils/assets/img-database';

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
  previewImage: string | null;
  setPreviewImage: Dispatch<SetStateAction<string | null>>;
}

const StepThreeTether: React.FC<StepThreeTetherProps> = ({
  register,
  errors,
  blockAll,
  formData,
  sendAmount,
  selectedSendingSystem,
  handleChange,
  restRegister,
  previewImage,
  setPreviewImage,
  watch,
}) => {
  const { isDark } = useDarkTheme();

  const proofOfPayment = watch('proof_of_payment');

  const handleRemoveImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPreviewImage(null);
  };

  return (
    <>
      <p className="text-left font-textFont">
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
          <InputCopy
            id="pay_usdt_direction"
            name="pay_usdt_direction"
            label="Dirección USDT a pagar"
            type="text"
            value="TSgBPeFSb9TxJWyzDjDfuNqBktF898ZFUb"
            disabled={true}
            placeholder=""
            register={register}
            watch={watch}
            rules={{ required: 'Este campo es obligatorio' }}
            error={errors.pay_usdt_direction ? (errors.pay_usdt_direction as FieldError) : undefined}
          />
          <InputCopy
            id="send_amount"
            name="send_amount"
            label="Monto a pagar"
            type="number"
            disabled={true}
            placeholder="Monto Enviar"
            register={register}
            watch={watch}
            rules={{ required: 'Este campo es obligatorio' }}
            error={errors.send_amount ? (errors.send_amount as FieldError) : undefined}
          />
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
            disabledWithoutMargin={true}
          />

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
                  'group relative flex h-full max-h-[295px] w-full flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl border-[1px] border-inputLightDisabled bg-[#fafafa95] py-2 text-center hover:border-inputLight dark:border-disabledDarkText dark:text-lightText dark:hover:border-darkText',
                  errors.proof_of_payment
                    ? 'border-errorColor dark:border-errorColor'
                    : 'hover:border-blue-600 dark:hover:border-white',
                )}
              >
                {previewImage ? (
                  <div className="absolute -z-10 max-h-full">
                    <div className="flex justify-center">
                      <img src={previewImage} alt="Preview" className="h-auto max-w-full rounded-lg shadow-md" />
                    </div>
                  </div>
                ) : null}
                <p
                  className={clsx(
                    'mb-1 text-sm',
                    previewImage
                      ? 'text-base text-[#011b5b]'
                      : 'text-inputLightDisabled group-hover:text-buttonsLigth dark:text-darkText',
                  )}
                >
                  {previewImage
                    ? `Archivo seleccionado: ${proofOfPayment && proofOfPayment[0] && proofOfPayment[0].name}`
                    : 'SUBIR COMPROBANTE'}
                </p>
                {previewImage ? (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="bg-errborder-errorColor h-[48px] w-full max-w-[200px] items-center justify-center rounded-3xl border border-errorColor bg-errorColor p-[10px] font-textFont text-base text-darkText lg:mt-0"
                  >
                    Eliminar IMG
                  </button>
                ) : (
                  <div
                    className={`${
                      isDark ? 'buttonSecondDark' : 'buttonSecond'
                    } relative h-[48px] w-full max-w-[200px] items-center justify-center rounded-3xl border border-disabledButtonsLigth bg-disabledButtonsLigth p-[10px] text-lg text-darkText group-hover:border-buttonsLigth group-hover:bg-buttonsLigth group-hover:text-darkText dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText group-hover:dark:border-darkText group-hover:dark:bg-darkText group-hover:dark:text-lightText lg:mt-0`}
                  >
                    Subir Archivo
                  </div>
                )}

                <span id="file-name" className="min-h-[20px] w-full text-xs text-[#6B7280] lg-tablet:text-sm">
                  {previewImage ? '' : 'No hay archivo seleccionado'}
                </span>

                {errors.proof_of_payment && 'Este campo es obligatorio' && (
                  <p className="text-sm text-errorColor">Este campo es obligatorio, accepta: .png, .jpg y .pdf</p>
                )}
              </div>
            </label>
            {!previewImage && (
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
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-full flex-col">
            <div className="ml-1 flex gap-2 text-xs">
              <p
                className={clsx(
                  'font-textFont text-lightText dark:text-darkText',
                  'mb-1 ml-2.5 text-sm transition-opacity duration-300',
                )}
              >
                Red: Tron (TRC-20)
              </p>
              <IconTron size="18px" />
            </div>
            <div
              className={clsx(
                'group flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-2xl border-[1px] border-inputLightDisabled py-2 text-center hover:border-inputLight dark:border-disabledDarkText dark:text-lightText dark:hover:border-darkText',
              )}
            >
              <div className="flex w-full items-center justify-center">
                <Image className="w-full" src={isDark ? qrLight : qrDark} alt="qr" width={200} height={200} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepThreeTether;
