import React from 'react';
import clsx from 'clsx';
import InputField from '@/components/ui/contact-form/InputField';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { FormInputs } from '@/types/request/request';
import { useForm } from 'react-hook-form';
import Tick from '@/components/ui/Tick/Tick';

interface Props {
  currentStep: number;
  nextStep: () => void;
}

const SectionBank = ({ currentStep, nextStep }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({});
  const { isDark } = useDarkTheme();
  return (
    <section className="flex min-h-20 w-full flex-col gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight">
      <div className="justify-between xs-phone:flex md-tablet:relative md-tablet:flex-col md-tablet:items-center">
        <h3 className="mb-2 text-center text-xl xs-phone:mb-0 xs-phone:text-left md-tablet:absolute md-tablet:left-0">
          Información del destinatario
        </h3>
        {currentStep == 2 && (
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
      </div>
      {currentStep == 2 && (
        <>
          {' '}
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
            <button
              type="button"
              onClick={nextStep}
              className={`m-1 flex items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-1 text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default SectionBank;
