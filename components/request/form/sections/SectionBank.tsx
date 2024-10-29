import React from 'react';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { FormInputs } from '@/types/request/request';
import { useForm } from 'react-hook-form';
import Tick from '@/components/ui/Tick/Tick';
import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import useDataRequestStore from '@/store/dataRequestStore';
import ArrowDown from '@/components/ui/ArrowDown/ArrowDown';

interface StepContainer1 {
  sender_first_name: string;
  sender_last_name: string;
  email: string;
  phone: string;
  own_account: boolean;
}

interface StepContainer2 {
  receiver_first_name: string;
  receiver_last_name: string;
  tax_identification?: string;
  transfer_identification?: string;
  re_transfer_identification?: string;
  name_of_bank?: string;
  wise_email?: string;
  re_enter_wise_email?: string;
}

interface StepContainer3 {
  send_amount: string;
  receive_amount: string;
  pay_email: string;
  proof_of_payment: FileList;
  note: string;
}

interface Props {
  currentStep: number[];
  nextStep: (step: number) => Promise<void>;
  showTicks2: boolean;
  prevStep: (step: number) => Promise<void>;
  handleOpenSection: (step: number) => void;
  openSection2: boolean;
  handleControlButton: (
    step: number,
    stepContainer1?: StepContainer1,
    stepContainer2?: StepContainer2,
    stepContainer3?: StepContainer3,
  ) => void;
}

const SectionBank = ({
  currentStep,
  nextStep,
  showTicks2,
  prevStep,
  handleOpenSection,
  openSection2,
  handleControlButton,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({});
  const { isDark } = useDarkTheme();
  const { section2 } = useDataRequestStore();
  const receiverFirstName = watch('receiver_first_name');
  const receiverLastName = watch('receiver_last_name');
  const taxIdentification = watch('tax_identification');
  const transferIdentification = watch('transfer_identification');
  const reTransferIdentification = watch('re_transfer_identification');
  const nameOfBank = watch('name_of_bank');
  // console.log('SectionBank: ', currentStep);
  // console.log('section2 - SectionBank: ', section2);
  console.log('openSection2: ', openSection2)
  console.log('receiverFirstName == section2.receiver_first_name: ',receiverFirstName == section2.receiver_first_name)
  console.log('receiverLastName == section2.receiver_last_name: ',receiverLastName == section2.receiver_last_name)
  console.log('taxIdentification == section2.tax_identification: ',taxIdentification == section2.tax_identification)
  console.log('transferIdentification == section2.re_transfer_identification: ',transferIdentification == section2.transfer_identification)
  console.log('reTransferIdentification == section2.re_transfer_identification: ',reTransferIdentification == section2.re_transfer_identification)
  console.log('nameOfBank == section2.name_of_bank: ',nameOfBank == section2.name_of_bank)

  return (
    <section className="flex min-h-20 w-full flex-col gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight">
      <div className="justify-between xs-phone:flex md-tablet:relative md-tablet:flex-col md-tablet:items-center">
        <h3 className="mb-2 text-center text-xl xs-phone:mb-0 xs-phone:text-left md-tablet:absolute md-tablet:left-0">
          Información del destinatario
        </h3>
        {currentStep.find((step) => step == 2) && !showTicks2 && (
          <div className="flex items-center justify-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
              <Tick />
            </div>
            <div className="h-[3px] w-6 bg-lightText dark:bg-darkText"></div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
              <Tick />
            </div>
            <div className="h-[3px] w-6 bg-lightText dark:bg-darkText"></div>
            <div className="h-7 w-7 rounded-full border-[3px] border-lightText dark:border-darkText"></div>
          </div>
        )}
        {showTicks2 && (
          <div className="flex w-full flex-col items-end justify-end">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
              <Tick />
            </div>
            <button
              onClick={() => {
                prevStep(3);
                handleOpenSection(2);
              }}
              className={clsx(
                'flex items-center justify-center gap-1 text-base text-lightText underline dark:text-darkText',
                openSection2 && 'hidden',
              )}
              type="button"
            >
              Tratar
              <ArrowDown />
            </button>
          </div>
        )}
      </div>
      {(currentStep.find((step) => step == 2) || openSection2 == true) && (
        <>
          <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="receiver_first_name"
                  className={clsx(
                    'ml-1 text-xs',
                    errors.receiver_first_name
                      ? 'text-red-500'
                      : 'text-lightText dark:text-darkText',
                  )}
                >
                  Nombre
                </label>
                <InputField
                  id="receiver_first_name"
                  type="text"
                  placeholder="Nombre"
                  register={register('receiver_first_name', { required: true })}
                  error={
                    errors.receiver_first_name && 'Este campo es obligatorio'
                  }
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="receiver_last_name"
                  className={clsx(
                    'ml-1 text-xs',
                    errors.receiver_last_name
                      ? 'text-red-500'
                      : 'text-lightText dark:text-darkText',
                  )}
                >
                  Apellido
                </label>
                <InputField
                  id="receiver_last_name"
                  type="text"
                  placeholder="Apellido"
                  register={register('receiver_last_name', { required: true })}
                  error={
                    errors.receiver_last_name && 'Este campo es obligatorio'
                  }
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="tax_identification"
                  className={clsx(
                    'ml-1 text-xs',
                    errors.tax_identification
                      ? 'text-red-500'
                      : 'text-lightText dark:text-darkText',
                  )}
                >
                  TAX ID/CUIT/CUIL
                </label>
                <InputField
                  id="tax_identification"
                  type="text"
                  placeholder="TAX ID/CUIT/CUIL"
                  register={register('tax_identification', { required: true })}
                  error={
                    errors.tax_identification && 'Este campo es obligatorio'
                  }
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="transfer_identification"
                  className={clsx(
                    'ml-1 text-xs',
                    errors.transfer_identification
                      ? 'text-red-500'
                      : 'text-lightText dark:text-darkText',
                  )}
                >
                  CBU/CVU/ALIAS
                </label>
                <InputField
                  id="transfer_identification"
                  type="email"
                  placeholder="CBU/CVU/ALIAS"
                  register={register('transfer_identification', {
                    required: true,
                  })}
                  error={
                    errors.transfer_identification &&
                    'Este campo es obligatorio'
                  }
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="re_transfer_identification"
                  className={clsx(
                    'ml-1 text-xs',
                    errors.re_transfer_identification
                      ? 'text-red-500'
                      : 'text-lightText dark:text-darkText',
                  )}
                >
                  RE-ENTER CBU/CVU/ALIAS
                </label>
                <InputField
                  id="re_transfer_identification"
                  type="email"
                  placeholder="RE-ENTER CBU/CVU/ALIAS"
                  register={register('re_transfer_identification', {
                    required: true,
                  })}
                  error={
                    errors.re_transfer_identification &&
                    'Este campo es obligatorio'
                  }
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="name_of_bank"
                  className={clsx(
                    'ml-1 text-xs',
                    errors.name_of_bank
                      ? 'text-red-500'
                      : 'text-lightText dark:text-darkText',
                  )}
                >
                  Nombre del Banco
                </label>
                <InputField
                  id="name_of_bank"
                  type="email"
                  placeholder="Nombre del Banco"
                  register={register('name_of_bank', {
                    required: true,
                  })}
                  error={errors.name_of_bank && 'Este campo es obligatorio'}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {openSection2 &&
            receiverFirstName == section2.receiver_first_name &&
            receiverLastName == section2.receiver_last_name &&
            taxIdentification == section2.tax_identification &&
            transferIdentification == section2.transfer_identification &&
            reTransferIdentification == section2.re_transfer_identification &&
            nameOfBank == section2.name_of_bank ? (
              <button
                onClick={() => {
                  handleOpenSection(2);
                  nextStep(2);
                }}
                className={clsx(
                  'flex items-center justify-center gap-1 text-base text-lightText underline dark:text-darkText',
                )}
                type="button"
              >
                Tratar
                <ArrowUp />
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  handleControlButton(2, undefined, {
                    receiver_first_name: receiverFirstName,
                    receiver_last_name: receiverLastName,
                    tax_identification: taxIdentification,
                    transfer_identification: transferIdentification,
                    re_transfer_identification: reTransferIdentification,
                    name_of_bank: nameOfBank,
                  }, undefined)                  
                }
                className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[14px] text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
              >
                Siguiente
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SectionBank;
