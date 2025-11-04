import React, { Dispatch, SetStateAction, useState } from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch, Controller, Control } from 'react-hook-form';
import InputCopy from '../../inputs/InputCopy';
import { System } from '@/types/data';
import InputSteps from '@/components/inputSteps/InputSteps';
import { FieldError } from 'react-hook-form';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { FileUpload } from '@/components/ui/FileUpload/FileUpload';
import SelectRed from '../../inputs/SelectRed';
import { QrCode } from 'lucide-react';
import { PopUp } from '@/components/ui/PopUp/PopUp';
import NETWORKS_DATA from '@/components/ui/PopUp/networksData';

interface StepThreeTetherProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  control: Control<any>;
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
  receiveAmount,
  selectedSendingSystem,
  selectedReceivingSystem,
  handleChange,
  restRegister,
  previewImage,
  setPreviewImage,
  watch,
  control,
}) => {
  const { isDark } = useDarkTheme();

  const selectedRedValue = watch('red_selection');
  const formSendAmount = watch('send_amount');
  const formReceiveAmount = watch('receive_amount');

  // Obtener datos de la red seleccionada
  const currentNetwork = NETWORKS_DATA[selectedRedValue?.value as keyof typeof NETWORKS_DATA] || NETWORKS_DATA.tron;
  const currentWalletAddress = currentNetwork.wallet;

  const handleOpenUsdtPopup = () => {
    const selectedNetwork = selectedRedValue?.value || 'tron';
    
    // Convertir a array el formato de NETWORKS_DATA para que sea compatible
    const networksArray = Object.values(NETWORKS_DATA).map(network => ({
      value: network.value,
      label: network.label,
      image: network.image,
      wallet: network.wallet,
      qrLight: network.qrLight,
      qrDark: network.qrDark,
    }));
    
    PopUp({
      variant: 'usdt-deposit',
      title: 'Depósitar USDT',
      isDark: isDark,
      networks: networksArray,
      networkName: selectedNetwork as any,
    });
  };

  const handleOpenReceiptPopup = () => { 
    PopUp({
      variant: 'receipt-examples',
      isDark: isDark,
    });
  };

  return (
    <>
      <p className="text-left font-textFont text-custom-grayD dark:text-darkText text-sm ">
        Asegúrese de que mediante esta dirección solo se hacen depósitos de USDT. De lo contrario, los fondos que haya enviado nose añadirán a la billetera disponible ni se reembolsarán.
      </p>
      <div className="mx-0 flex flex-col gap-4 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full gap-2">
            <div className="flex-1">
              <Controller
                name="red_selection"
                control={control}
                rules={{ required: 'Este campo es obligatorio' }}
                render={({ field }) => (
                  <SelectRed
                    blockAll={blockAll}
                    selectedRed={field.value ?? undefined}
                    setSelectedRed={field.onChange}
                    errors={errors}
                  />
                )}
              />
            </div>
            <button
              type="button"
              onClick={handleOpenUsdtPopup}
              className="flex justify-center p-1 items-center border border-transparent hover:border-custom-blue dark:hover:border-white rounded-md"
              title="Ver código QR"
              disabled={blockAll}
            >
              <QrCode className="size-9 text-custom-grayD-500 hover:text-custom-blue dark:hover:text-darkText" />
            </button>
          </div>
          <InputCopy
            id="wallet"
            name="wallet"
            label="Dirección USDT a pagar"
            type="text"
            value={currentWalletAddress}
            disabled={true}
            placeholder=""
            register={register}
            watch={watch}
            rules={{ required: 'Este campo es obligatorio' }}
            error={errors.wallet ? (errors.wallet as FieldError) : undefined}
          />
          <InputCopy
            id="send_amount"
            name="send_amount"
            label="Monto a pagar"
            type="text"
            value={`${selectedSendingSystem?.coinSign} ${formSendAmount}`}
            disabled={true}
            placeholder="Monto Enviar"
            register={register}
            watch={watch}
            rules={{ required: 'Este campo es obligatorio' }}
            error={errors.send_amount ? (errors.send_amount as FieldError) : undefined}
          />
          <InputCopy
            label="Monto a Recibir"
            name="receive_amount"
            id="receive_amount"
            type="text"
            placeholder="Monto a Recibir"
            value={`${selectedReceivingSystem?.coinSign} ${formReceiveAmount}`}
            disabled={true}
            register={register}
            watch={watch}
            rules={{
              required: 'Este campo es obligatorio',
            }}
            error={errors.receive_amount ? (errors.receive_amount as FieldError) : undefined}
          />

          <div className="flex w-full flex-col gap-4">
            <div className='flex flex-col text-start text-sm'>
            <span>Sube el comprobante de pago / los pagos</span>
            <span>Si tienes dudas, puedes consultar los <strong className="text-custom-blue dark:text-darkText cursor-pointer" onClick={handleOpenReceiptPopup}>ejemplos de como subir la documentación</strong></span>
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

export default StepThreeTether;
