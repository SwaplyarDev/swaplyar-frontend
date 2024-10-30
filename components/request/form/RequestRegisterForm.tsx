'use client';
import clsx from 'clsx';
import CountrySelect from './inputs/selectCountry';
import { useEffect, useState } from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { CountryOption, FormInputs } from '@/types/request/request';
import Tick from '@/components/ui/Tick/Tick';
import InputField from '@/components/ui/contact-form/InputField';
import SelectBoolean from './inputs/SelectBoolean';
import { Controller, set, useForm } from 'react-hook-form';
import { useSystemStore } from '@/store/useSystemStore';
import SectionBank from './sections/SectionBank';
import SectionOther from './sections/SectionOther';
import { useAmountCalculator } from '@/hooks/useAmountCalculator';
import useDataRequestStore from '@/store/dataRequestStore';
import InputCopy from './inputs/InputCopy';
import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import ArrowDown from '@/components/ui/ArrowDown/ArrowDown';

interface Option {
  value: string;
  label: string;
}

const RequestRegisterForm = () => {
  const {
    register,
    setValue,
    formState: { errors },
    trigger,
    control,
    watch,
  } = useForm<FormInputs>({});
  const [currentCountry, setCurrentCountry] = useState<CountryOption | null>(
    null,
  );

  const [currentStep, setCurrentStep] = useState<number[]>([1]);
  const [openSection1, setOpenSection1] = useState<boolean>(false);
  const [openSection2, setOpenSection2] = useState<boolean>(false);
  const [openSection3, setOpenSection3] = useState<boolean>(false);

  const [showTicks1, setShowTicks1] = useState<boolean>(false);
  const [showTicks2, setShowTicks2] = useState<boolean>(false);
  const [showTicks3, setShowTicks3] = useState<boolean>(false);

  const receiveAmount = localStorage.getItem('receiveAmount');
  const sendAmount = localStorage.getItem('sendAmount');
  const { isDark } = useDarkTheme();
  const { section1, setSection1, setSection2, section3, setSection3 } =
    useDataRequestStore();

  function showFileName(event: any) {
    const fileName =
      event.target.files[0]?.name || 'No hay archivo seleccionado';
    document.getElementById('file-name')!.textContent = fileName;
  }

  const { selectedReceivingSystem } = useSystemStore();

  const fieldsStep1 = [
    'sender_first_name',
    'sender_last_name',
    'email',
    'phone',
    'own_account',
  ] as const;
  const fieldsBankStep2 = [
    'receiver_first_name',
    'receiver_last_name',
    'tax_identification',
    're_transfer_identification',
    'name_of_bank',
  ] as const;
  const fieldsOtherStep2 = [
    'receiver_first_name',
    'receiver_last_name',
    'wise_email',
    're_enter_wise_email',
  ] as const;
  const fieldsStep3 = [
    'send_amount',
    'receive_amount',
    'pay_email',
    'proof_of_payment',
    'note',
  ] as const;

  const getFieldsForStep = (step: number): readonly (keyof FormInputs)[] => {
    switch (step) {
      case 1:
        return fieldsStep1;
      case 2:
        return selectedReceivingSystem?.id === 'bank'
          ? fieldsBankStep2
          : fieldsOtherStep2;
      case 3:
        return fieldsStep3;
      default:
        return [];
    }
  };

  const nextStep = async (step: number) => {
    const valid = await trigger(getFieldsForStep(step));

    if (valid) {
      setCurrentStep(() => [step + 1]);
    }
  };
  const prevStep = async (step: number) => {
    const valid = await trigger(getFieldsForStep(step));
    if (valid) {
      setCurrentStep(() => [step - 1]);
    }
  };
  // console.log('RequestRegisterForm: ', currentStep);
  const closeStep = async (step: number) => {
    const valid = await trigger(getFieldsForStep(step));
    if (valid) {
      switch (step) {
        case 1:
          setOpenSection1(false);
          break;
        case 2:
          setOpenSection2(false);
          break;
        case 3:
          setOpenSection3(false);
          break;
        default:
      }
    }
  };

  const handleOpenSection = (step: number) => {
    switch (step) {
      case 1:
        setOpenSection1(!openSection1);
        break;
      case 2:
        setOpenSection2(!openSection2);
        break;
      case 3:
        setOpenSection3(!openSection3);
        break;
      default:
    }
  };
  const senderFirstName = watch('sender_first_name');
  const senderLastName = watch('sender_last_name');
  const email = watch('email');
  const phone = watch('phone');
  const ownAccount = watch('own_account');
  const sendAmountValue = watch('send_amount');
  const receiveAmountValue = watch('receive_amount');
  const payEmail = watch('pay_email');
  const proofOfPayment = watch('proof_of_payment');
  const note = watch('note');

  const handleControlButton = (
    step: number,
    stepContainer1?: {
      sender_first_name: string;
      sender_last_name: string;
      email: string;
      phone: string;
      own_account: boolean;
    },
    stepContainer2?: {
      receiver_first_name: string;
      receiver_last_name: string;
      tax_identification?: string;
      re_transfer_identification?: string;
      name_of_bank?: string;
      wise_email?: string;
      re_enter_wise_email?: string;
    },
    stepContainer3?: {
      send_amount: string;
      receive_amount: string;
      pay_email: string;
      proof_of_payment: FileList;
      note: string;
    },
  ) => {
    console.log('step: ', step);
    console.log('stepContainer2: ', stepContainer2);
    switch (step) {
      case 1:
        if (openSection1) {
          closeStep(1);
        }
        nextStep(1);
        if (stepContainer1) {
          setSection1(stepContainer1);
        }
        setShowTicks1(true);
        break;
      case 2:
        if (openSection2) {
          closeStep(2);
        }
        nextStep(2);
        if (stepContainer2) {
          setSection2(stepContainer2);
        }
        setShowTicks2(true);
        break;
      case 3:
        if (openSection3) {
          closeStep(3);
        }
        nextStep(3);
        if (stepContainer3) {
          setSection3(stepContainer3);
        }
        setShowTicks3(true);
        break;
      default:
    }
  };

  // console.log('section1: ', section1);
  return (
    <form className="flex w-full max-w-[1000px] flex-col gap-5">
      <div className="flex justify-between px-2">
        <h2 className="text-2xl font-bold text-lightText dark:text-darkText">
          Formulario de Solicitud
        </h2>
        <div>
          <p>Tiempo Restante</p>
        </div>
      </div>

      {/* Seccion 1 del formulaio */}
      <section className="flex min-h-20 w-full flex-col gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight">
        <div className="justify-between xs-phone:flex md-tablet:relative md-tablet:flex-col md-tablet:items-center">
          <h3 className="mb-2 text-center text-xl xs-phone:mb-0 xs-phone:text-left md-tablet:absolute md-tablet:left-0">
            Mis Datos
          </h3>
          {!showTicks1 && (
            <div className="flex items-center justify-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
                <Tick />
              </div>
              <div className="h-[3px] w-6 bg-lightText dark:bg-darkText"></div>
              <div className="h-7 w-7 rounded-full border-[3px] border-lightText dark:border-darkText"></div>
              <div className="h-[3px] w-6 bg-lightText dark:bg-darkText"></div>
              <div className="h-7 w-7 rounded-full border-[3px] border-lightText dark:border-darkText"></div>
            </div>
          )}
          {showTicks1 && (
            <div className="flex w-full flex-col items-end justify-end">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
                <Tick />
              </div>
              <button
                onClick={() => {
                  prevStep(2);
                  handleOpenSection(1);
                }}
                className={clsx(
                  'flex items-center justify-center gap-1 text-base text-lightText underline dark:text-darkText',
                  openSection1 && 'hidden',
                )}
                type="button"
              >
                Tratar
                <ArrowDown />
              </button>
            </div>
          )}
        </div>
        {(currentStep.find((step) => step == 1) || openSection1 == true) && (
          <>
            <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className={clsx(
                      'ml-1 text-xs',
                      errors.sender_first_name
                        ? 'text-red-500'
                        : 'text-lightText dark:text-darkText',
                    )}
                  >
                    Nombre
                  </label>
                  <InputField
                    id="sender_first_name"
                    type="text"
                    placeholder="Nombre"
                    register={register('sender_first_name', { required: true })}
                    error={
                      errors.sender_first_name && 'Este campo es obligatorio'
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="sender_last_name"
                    className={clsx(
                      'ml-1 text-xs',
                      errors.sender_last_name
                        ? 'text-red-500'
                        : 'text-lightText dark:text-darkText',
                    )}
                  >
                    Apellido
                  </label>
                  <InputField
                    id="sender_last_name"
                    type="text"
                    placeholder="Apellido"
                    register={register('sender_last_name', { required: true })}
                    error={
                      errors.sender_last_name && 'Este campo es obligatorio'
                    }
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className={clsx(
                      'ml-1 text-xs',
                      errors.email
                        ? 'text-red-500'
                        : 'text-lightText dark:text-darkText',
                    )}
                  >
                    Correo electrónico
                  </label>
                  <InputField
                    id="email"
                    type="email"
                    placeholder="Email"
                    register={register('email', { required: true })}
                    error={errors.email && 'Este campo es obligatorio'}
                  />
                </div>
                <CountrySelect
                  errors={errors}
                  setValue={setValue}
                  setCurrentCountry={setCurrentCountry}
                  register={register}
                />
              </div>
            </div>
            <div className="mx-0 flex flex-col gap-0 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
              <div className="flex w-full items-center justify-start sm-phone:justify-center">
                <p className="ml-1 text-xs text-lightText dark:text-darkText sm-phone:ml-0 sm-phone:text-sm md:text-lg">
                  ¿Se transfiere a una cuenta propia?
                </p>
              </div>
              <div className="flex w-full flex-col">
                <Controller
                  name="own_account"
                  control={control}
                  defaultValue={undefined}
                  rules={{
                    required: 'Este campo es obligatorio',
                  }}
                  render={({ field, fieldState }) => (
                    <SelectBoolean
                      selectedOption={field.value}
                      setSelectedOption={(option) => field.onChange(option)}
                      errors={
                        fieldState.error
                          ? { [field.name]: fieldState.error }
                          : {}
                      }
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              {openSection1 &&
              senderFirstName == section1.sender_first_name &&
              senderLastName == section1.sender_last_name &&
              email == section1.email &&
              phone == section1.phone &&
              ownAccount == section1.own_account ? (
                <button
                  onClick={() => {
                    handleOpenSection(1);
                    nextStep(1);
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
                    handleControlButton(1, {
                      sender_first_name: senderFirstName,
                      sender_last_name: senderLastName,
                      email: email,
                      phone: phone,
                      own_account: ownAccount,
                    })
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

      {/* Seccion 2 del formulaio */}
      {selectedReceivingSystem?.id == 'bank' ? (
        <SectionBank
          currentStep={currentStep}
          nextStep={nextStep}
          showTicks2={showTicks2}
          prevStep={prevStep}
          handleOpenSection={handleOpenSection}
          openSection2={openSection2}
          handleControlButton={handleControlButton}
        />
      ) : (
        <SectionOther
          currentStep={currentStep}
          nextStep={nextStep}
          showTicks2={showTicks2}
          prevStep={prevStep}
          handleOpenSection={handleOpenSection}
          openSection2={openSection2}
          handleControlButton={handleControlButton}
        />
      )}

      {/* Seccion 3 del formulaio */}
      <section className="flex min-h-20 w-full flex-col gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight">
        <div className="justify-between xs-phone:flex md-tablet:relative md-tablet:flex-col md-tablet:items-center">
          <h3 className="mb-2 text-center text-xl xs-phone:mb-0 xs-phone:text-left md-tablet:absolute md-tablet:left-0">
            Pago
          </h3>
          {currentStep.find((step) => step == 3) && !showTicks3 && (
            <div className="flex items-center justify-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
                <Tick />
              </div>
              <div className="h-[3px] w-6 bg-lightText dark:bg-darkText"></div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
                <Tick />
              </div>
              <div className="h-[3px] w-6 bg-lightText dark:bg-darkText"></div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
                <Tick />
              </div>
            </div>
          )}
          {showTicks3 && (
            <div className="flex w-full flex-col items-end justify-end">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
                <Tick />
              </div>
              <button
                onClick={() => {
                  prevStep(4);
                  handleOpenSection(3);
                }}
                className={clsx(
                  'flex items-center justify-center gap-1 text-base text-lightText underline dark:text-darkText',
                  openSection1 && 'hidden',
                )}
                type="button"
              >
                Tratar
                <ArrowDown />
              </button>
            </div>
          )}
        </div>
        {(currentStep.find((step) => step == 3) || openSection3 == true) && (
          <>
            {' '}
            <p className="text-left">
              tienes que realizar el pago de $000 al email asdfgh@asdfgh.com con
              el concepto de "PAGO" para enviarte el dinero a la cuenta
              00000@00000000.com
            </p>
            <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="pay_email"
                    className={clsx(
                      'ml-1 text-xs',
                      errors.pay_email
                        ? 'text-red-500'
                        : 'text-lightText dark:text-darkText',
                    )}
                  >
                    Email a pagar
                  </label>
                  <InputField
                    id="pay_email"
                    type="text"
                    value={'00000@00000000.com'}
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
                      'ml-1 text-xs',
                      errors.send_amount
                        ? 'text-red-500'
                        : 'text-lightText dark:text-darkText',
                    )}
                  >
                    Monto a pagar
                  </label>
                  <InputCopy
                    id="send_amount"
                    type="number"
                    value={sendAmount?.toString()}
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
                      'ml-1 text-xs',
                      errors.receive_amount
                        ? 'text-red-500'
                        : 'text-lightText dark:text-darkText',
                    )}
                  >
                    Monto a Recibir
                  </label>
                  <InputField
                    id="receive_amount"
                    type="number"
                    value={receiveAmount?.toString()}
                    disabled={true}
                    placeholder="Monto a Recibir"
                    register={register('receive_amount', { required: true })}
                    error={errors.receive_amount && 'Este campo es obligatorio'}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="proof_of_payment"
                    className={clsx(
                      'cursor-pointer',
                      errors.proof_of_payment
                        ? 'text-red-500'
                        : 'text-lightText dark:text-darkText',
                    )}
                  >
                    <p className="ml-1 text-xs">Comprobante</p>
                    <div
                      className={clsx(
                        'flex w-full flex-col items-center gap-2 rounded border border-[#6B7280] bg-gray-200 px-5 py-2 dark:bg-lightText xs-phone:flex-row sm-phone:flex-col lg-tablet:h-[38px] lg-tablet:flex-row lg-tablet:items-center',
                        errors.proof_of_payment
                          ? 'border-red-500'
                          : 'hover:border-blue-600 dark:hover:border-white',
                      )}
                    >
                      <p className="w-full text-sm xs-phone:max-w-32 sm-phone:max-w-[inherit] lg-tablet:max-w-40 lg-tablet:text-base">
                        Subir comprobante
                      </p>
                      <span
                        id="file-name"
                        className="w-full text-xs text-[#6B7280] lg-tablet:text-sm"
                      >
                        No hay archivo seleccionado
                      </span>
                    </div>
                  </label>
                  <InputField
                    id="proof_of_payment"
                    type="file"
                    file={true}
                    onCustomChange={showFileName}
                    // accept="image/*"
                    placeholder="SUBIR COMPROBANTE"
                    register={register('proof_of_payment', { required: true })}
                    error={
                      errors.proof_of_payment && 'Este campo es obligatorio'
                    }
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-4">
                <div className="flex h-full flex-col">
                  <label
                    htmlFor="note"
                    className={clsx(
                      'ml-1 text-xs',
                      errors.note
                        ? 'text-red-500'
                        : 'text-lightText dark:text-darkText',
                    )}
                  >
                    Nota (opcional)
                  </label>
                  <textarea
                    {...register('note', { required: true })}
                    id="note"
                    placeholder="Añade una nota si lo deseas ;)"
                    className={clsx(
                      'h-full w-full rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                      errors.note
                        ? 'border-red-500'
                        : 'hover:border-blue-600 dark:hover:border-white',
                    )}
                  ></textarea>
                  {errors.note && (
                    <p className="text-sm text-red-500">
                      Este campo es obligatorio
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center sm-phone:justify-end">
              {openSection3 &&
              sendAmountValue == section3.send_amount &&
              receiveAmountValue == section3.receive_amount &&
              proofOfPayment == section3.proof_of_payment &&
              note == section3.note &&
              payEmail == section3.pay_email ? (
                <button
                  onClick={() => {
                    handleOpenSection(3);
                    nextStep(3);
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
                    handleControlButton(3, undefined, undefined, {
                      send_amount: sendAmountValue,
                      receive_amount: receiveAmountValue,
                      proof_of_payment: proofOfPayment,
                      note: note,
                      pay_email: payEmail,
                    })
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
      <div className="flex flex-col items-center gap-4 sm-phone:flex-row sm-phone:justify-between sm-phone:gap-0">
        <button className="text-2xl font-light">Cancelar esta Solicitud</button>
        <button
          className={`m-1 flex items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-9 py-[3px] text-lg font-extrabold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
        >
          ENVIAR
        </button>
      </div>
    </form>
  );
};

export default RequestRegisterForm;
