import React from 'react';
import clsx from 'clsx';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import InputCopy from '../../inputs/InputCopy';
import InputField from '@/components/ui/contact-form/InputField';
import { System } from '@/types/data';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

interface StepThreeGeneralProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
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
}) => {
  const { isDark } = useDarkTheme();
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
  };

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
          <div className="flex flex-col">
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
          </div>
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
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="proof_of_payment"
              className={clsx(
                'cursor-pointer',
                errors.proof_of_payment ? 'text-red-500' : 'text-lightText dark:text-darkText',
              )}
            >
              <p className="ml-1 h-5 text-xs">Comprobante con formato: PNG o JPG</p>
              <div className="file-upload flex flex-col justify-between rounded-2xl">
                <div className="group flex h-full w-full flex-col items-center justify-center rounded-2xl border-[1px] border-inputLightDisabled py-2 text-center hover:border-inputLight dark:border-disabledDarkText dark:border-transparent dark:text-lightText dark:hover:border-darkText">
                  {!file ? (
                    <>
                      <p className="mb-1 hidden text-sm text-inputLightDisabled group-hover:text-buttonsLigth dark:text-disabledDarkText group-hover:dark:text-darkText lg:inline-block">
                        SUBIR COMPROBANTE
                      </p>
                      <label
                        className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative mt-5 h-[48px] w-full max-w-[200px] items-center justify-center rounded-3xl border border-disabledButtonsLigth bg-disabledButtonsLigth p-[10px] text-lg text-darkText group-hover:border-buttonsLigth group-hover:bg-buttonsLigth group-hover:text-darkText dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText group-hover:dark:border-darkText group-hover:dark:bg-darkText group-hover:dark:text-lightText lg:mt-0`}
                      >
                        Subir Archivo
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".png,.jpg,.pdf"
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                      </label>
                    </>
                  ) : (
                    <div className="flex items-center">
                      <p className="text-sm text-buttonsLigth group-hover:text-darkText dark:text-disabledDarkText">
                        Archivo seleccionado: {file.name}
                      </p>
                      <button
                        onClick={handleFileRemove}
                        className="ml-3 rounded-full bg-buttonsLigth px-2 text-darkText hover:bg-errorColor dark:bg-darkText dark:text-lightText hover:dark:bg-errorColor"
                        aria-label="Eliminar archivo"
                      >
                        X
                      </button>
                    </div>
                  )}
                  {!file && (
                    <p className="mt-1 text-xs text-inputLightDisabled group-hover:text-buttonsLigth dark:text-disabledDarkText group-hover:dark:text-darkText">
                      Formatos de archivo: PNG, JPG, PDF
                    </p>
                  )}
                </div>
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
      </div>
    </>
  );
};

export default StepThreeGeneral;
