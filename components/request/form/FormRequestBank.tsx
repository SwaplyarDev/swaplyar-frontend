'use client';
import Tick from '@/components/ui/Tick/Tick';
import { CountryOption, FormInputs } from '@/types/request/request';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import SelectCountry from './inputs/selectCountry';
import CountrySelect from './inputs/selectCountry';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import SelectBoolean from './inputs/SelectBoolean';
import InputField from '@/components/ui/contact-form/InputField';

const FormRequestBank = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({});
  const [currentCountry, setCurrentCountry] = useState<CountryOption | null>(
    null,
  );
  const { isDark } = useDarkTheme();
  function showFileName(event: any) {
    const fileName = event.target.files[0]?.name || "No hay archivo seleccionado";
    document.getElementById('file-name')!.textContent = fileName;
  }
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
      <section className="flex w-full flex-col gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight">
        <div className="justify-between xs-phone:flex md-tablet:relative md-tablet:flex-col md-tablet:items-center">
          <h3 className="mb-2 text-center text-xl xs-phone:mb-0 xs-phone:text-left md-tablet:absolute md-tablet:left-0">
            Mis Datos
          </h3>
          <div className="flex items-center justify-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
              <Tick />
            </div>
            <div className="h-[3px] w-6 bg-lightText dark:bg-darkText"></div>
            <div className="h-7 w-7 rounded-full border-[3px] border-lightText dark:border-darkText"></div>
            <div className="h-[3px] w-6 bg-lightText dark:bg-darkText"></div>
            <div className="h-7 w-7 rounded-full border-[3px] border-lightText dark:border-darkText"></div>
          </div>
        </div>
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
                error={errors.sender_first_name && 'Este campo es obligatorio'}
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
                error={errors.sender_last_name && 'Este campo es obligatorio'}
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
                placeholder="Email de wise"
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
          <div className="flex w-full">
            <SelectBoolean
              errors={errors}
              setValue={setValue}
              setCurrentCountry={setCurrentCountry}
              register={register}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[14px] text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
          >
            Siguiente
          </button>
        </div>
      </section>

      {/* Seccion 2 del formulaio */}
      <section className="flex w-full flex-col gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight sm-phone:gap-2">
        <div className="justify-between xs-phone:flex md-tablet:relative md-tablet:flex-col md-tablet:items-center">
          <h3 className="mb-2 text-center text-xl xs-phone:mb-0 xs-phone:text-left md-tablet:absolute md-tablet:left-0">
            Información del destinatario
          </h3>
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
        </div>
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
                error={errors.receiver_last_name && 'Este campo es obligatorio'}
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
                error={errors.tax_identification && 'Este campo es obligatorio'}
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
                  errors.transfer_identification && 'Este campo es obligatorio'
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
            className={`m-1 flex items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-1 text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
          >
            Siguiente
          </button>
        </div>
      </section>

      {/* Seccion 3 del formulaio */}
      <section className="flex w-full flex-col gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight sm-phone:gap-2">
        <div className="justify-between xs-phone:flex md-tablet:relative md-tablet:flex-col md-tablet:items-center">
          <h3 className="mb-2 text-center text-xl xs-phone:mb-0 xs-phone:text-left md-tablet:absolute md-tablet:left-0">
            Pago
          </h3>
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
        </div>
        <p className="text-center xs-phone:text-left">
          tienes que realizar el pago de $000 al email asdfgh@asdfgh.com con el
          concepto de "PAGO" para enviarte el dinero a la cuenta
          00000@00000000.com
        </p>
        <div className="mx-0 flex flex-col gap-4 xs:mx-6 sm-phone:mx-0 sm-phone:flex-row sm-phone:gap-8">
          <div className="flex w-full flex-col gap-4">
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
              <InputField
                id="send_amount"
                type="number"
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
                placeholder="Monto a Recibir"
                register={register('receive_amount', { required: true })}
                error={errors.receive_amount && 'Este campo es obligatorio'}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="comprobante"
                className={clsx('cursor-pointer',
                  errors.comprobante
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                <p className='ml-1 text-xs'>Comprobante</p>
                <div
                  className={clsx(
                    'h-[38px] w-full rounded border border-[#6B7280] bg-gray-200 px-5 py-2 dark:bg-lightText flex items-center gap-2',
                    errors.comprobante
                      ? 'border-red-500'
                      : 'hover:border-blue-600 dark:hover:border-white',
                  )}
                >
                  <p className='w-full max-w-40'>Subir comprobante</p>
                  <span id="file-name" className="text-[#6B7280] w-full text-sm">No hay archivo seleccionado</span>
                </div>
              </label>
              <InputField
                id="comprobante"
                type="file"
                file={true}
                onCustomChange={showFileName}
                  // accept="image/*"
                placeholder="SUBIR COMPROBANTE"
                register={register('comprobante', { required: true })}
                error={errors.comprobante && 'Este campo es obligatorio'}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col h-full">
              <label
                htmlFor="nota"
                className={clsx(
                  'ml-1 text-xs',
                  errors.nota
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Nota (opcional)
              </label>
              <textarea
                {...register('nota', { required: true })}
                id="nota"
                placeholder="Añade una nota si lo deseas ;)"
                className={clsx(
                  'h-full w-full rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                  errors.nota
                    ? 'border-red-500'
                    : 'hover:border-blue-600 dark:hover:border-white',
                )}
              ></textarea>
              {errors.nota && (
                <p className="text-sm text-red-500">
                  Este campo es obligatorio
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-between">
        <button>Cancelar esta Solicitud</button>
        <button>ENVIAR</button>
      </div>
    </form>
  );
};

export default FormRequestBank;
