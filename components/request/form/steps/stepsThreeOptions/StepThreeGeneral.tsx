import React, { Dispatch, SetStateAction, useState } from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InputCopy from '../../inputs/InputCopy';
import { System } from '@/types/data';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { FieldError } from 'react-hook-form';
import { detectarMail } from '@/utils/validationUtils';
import FileUpload from '@/components/ui/FileUpload/FileUpload';
import PopUp from '@/components/ui/PopUp/PopUp';

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
  previewImage: string | null;
  setPreviewImage: Dispatch<SetStateAction<string | null>>;
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
  previewImage,
  setPreviewImage,
}) => {
  const { isDark } = useDarkTheme();
  const emailAccount = detectarMail(selectedSendingSystem);
  const handleOpenReceiptPopup = () => {
    PopUp({
      variant: 'receipt-examples',
      isDark: isDark,
    });
  };

  return (
    <>
      <p className='text-sm sm:text-base font-textFont leading-5 sm:leading-6 dark:text-custom-grayD-200 text-custom-grayD-600'>        
        Realiza el pago a
        {selectedSendingSystem?.name === 'Bank' ? (
          <span>
            {' '}la cuenta de <span className="font-semibold underline">JOHAN JAVIER SUAREZ MERCHAN</span> y el ALIAS es{' '}
            <span className="font-semibold underline">SwaplyAr.com</span>
          </span>
        ) : (
          <span>l email {emailAccount}</span>
        )}
        {' '}por el monto de{' '}
        <span className="font-semibold underline">
          {selectedSendingSystem?.coinSign} {sendAmount}
        </span>{' '}
        y coloca <strong>PAGO</strong> en la opción de concepto.
      </p>
      <div className="mx-0 flex flex-col gap-4 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
        <div className="flex w-full flex-col gap-4">
          <InputCopy
            id="pay_email"
            name="pay_email"
            label="Email a pagar"
            type="text"
            value={selectedSendingSystem?.name === 'Bank' ? 'SwaplyAr.com' : emailAccount}
            disabled={true}
            placeholder=""
            register={register}
            watch={watch}
            rules={{
              required: false,
            }}
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
          <InputCopy
            label="Monto a recibir"
            name="recieve_amount"
            id="recieve_amount"
            type="text"
            placeholder="Monto Recibir"
            disabled={true}
            value={`${selectedReceivingSystem?.coinSign} ${receiveAmount?.toString()}`}
            register={register}
            watch={watch}
            rules={{
              required: 'Este campo es obligatorio',
            }}
            error={errors.send_amount ? (errors.send_amount as FieldError) : undefined}
          />
          <div className="flex w-full flex-col gap-4">
            <div className='flex flex-col text-start text-sm'>
            <span className='text-sm sm:text-base font-textFont leading-5 sm:leading-6 dark:text-custom-grayD-200 text-custom-grayD-600'> 
              Sube el comprobante de pago / los pagos 
            </span>
            <span className='text-sm sm:text-base font-textFont leading-5 sm:leading-6 dark:text-custom-grayD-200 text-custom-grayD-600'>
              Si tienes dudas, puedes consultar los <span> </span>
              <strong className="text-custom-blue dark:text-darkText cursor-pointer" onClick={handleOpenReceiptPopup}>
                ejemplos de como subir la documentación
              </strong>
            </span>
            </div>
            <FileUpload
              label="Comprobante"
              name="proof_of_payment"
              restRegister={restRegister}
              watch={watch}
              handleChange={handleChange}
              previewImage={previewImage}
              onRemoveImage={() => setPreviewImage(null)}
              error={errors.proof_of_payment ? 'Este campo es obligatorio' : undefined}
              isDark={isDark}
              accept=".png,.jpg,.pdf"
              maxSizeText="max. 5MB"
              maxSizeMB={5}
              showPreview={true}
              disabled={blockAll}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StepThreeGeneral;
