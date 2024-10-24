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
        <div className="md-tablet:relative xs-phone:flex md-tablet:flex-col md-tablet:items-center justify-between ">
          <h3 className="md-tablet:absolute md-tablet:left-0 text-xl text-center mb-2 xs-phone:mb-0 xs-phone:text-left">Mis Datos</h3>
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
        <div className="flex sm-phone:gap-8 sm-phone:flex-row flex-col gap-4 mx-0 xs:mx-6 sm-phone:mx-0 ">
          <div className="w-full flex gap-4 sm-phone:gap-3 flex-col sm-phone:justify-center">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className={clsx(
                  'text-xs ml-1',
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
                  'text-xs ml-1',
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
          <div className="w-full flex gap-4 sm-phone:gap-3 flex-col sm-phone:justify-center">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className={clsx(
                  'text-xs ml-1',
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
        <div className="flex sm-phone:gap-8 sm-phone:flex-row flex-col gap-0 mx-0 xs:mx-6 sm-phone:mx-0  ">
          <div className="flex w-full items-center justify-start sm-phone:justify-center">
            <p className="text-xs sm-phone:text-sm md:text-lg text-lightText dark:text-darkText ml-1 sm-phone:ml-0">
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

      <section className="flex w-full flex-col sm-phone:gap-2 gap-4 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight">
        <div className="md-tablet:relative xs-phone:flex md-tablet:flex-col md-tablet:items-center justify-between ">
          <h3 className="md-tablet:absolute md-tablet:left-0 text-xl text-center mb-2 xs-phone:mb-0 xs-phone:text-left ">
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
        <div className="flex sm-phone:gap-8 sm-phone:flex-row flex-col gap-4 mx-0 xs:mx-6 sm-phone:mx-0 ">
          <div className="w-full flex gap-4 sm-phone:gap-3 flex-col sm-phone:justify-center">
            <div className='flex flex-col'>
              <label
                htmlFor="receiver_first_name"
                className={clsx(
                  "text-xs ml-1",
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
            <div className='flex flex-col'>
              <label
                htmlFor="receiver_last_name"
                className={clsx(
                  "text-xs ml-1",
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
          </div>
          <div className="w-full flex gap-4 sm-phone:gap-3 flex-col sm-phone:justify-center">
            <div className='flex flex-col'>
              <label
                htmlFor="wise_email"
                className={clsx(
                  "text-xs ml-1",
                  errors.wise_email
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Email de Wise
              </label>
              <InputField
                id="wise_email"
                type="email"
                placeholder="Email de wise"
                register={register('wise_email', { required: true })}
                error={errors.wise_email && 'Este campo es obligatorio'}
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor="re_enter_wise_email"
                className={clsx(
                  "text-xs ml-1",
                  errors.re_enter_wise_email
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                RE-ENTER Email de Wise
              </label>
              <InputField
                id="re_enter_wise_email"
                type="email"
                placeholder="RE-ENTER Email de Wise"
                register={register('re_enter_wise_email', { required: true })}
                error={
                  errors.re_enter_wise_email && 'Este campo es obligatorio'
                }
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

      {/* Seccion 2 del formulaio */}
      <section className="w-full rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight">
        <div>
          <h3>Información del destinatario</h3>
          <div></div>
        </div>
        <div>
          <label htmlFor="">Nombre</label>
          <input type="text" />
          <label htmlFor="">Apellido</label>
          <input type="text" />
          <label htmlFor="">TAX ID/CUIT/CUIL</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">CBU/CVU/ALIAS</label>
          <input type="text" />
          <label htmlFor="">RE-ENTER CBU/CVU/ALIAS</label>
          <input type="text" />
          <label htmlFor="">Nombre del Banco</label>
          <input type="text" />
        </div>
        <div>
          <button>Siguente</button>
        </div>
      </section>

      {/* Seccion 3 del formulaio */}
      <section className="w-full rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight">
        <div>
          <h3>Pago</h3>
          <div></div>
        </div>
        <p>
          Tienes que realizar el pago de $000 al email asdfgh@asdfgh.com con el
          concepto de "Pago" para enviarte el dinero a la cuenta
          00000@00000000.com
        </p>
        <div>
          <label htmlFor="">Monto a pagar</label>
          <input type="text" />
          <label htmlFor="">Monto a Recibir</label>
          <input type="text" />
          <label htmlFor="">Comprobante</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Nota (opcional)</label>
          <input type="text" />
        </div>
        <div>
          <button>Siguente</button>
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
