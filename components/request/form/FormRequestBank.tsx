'use client';
import Tick from '@/components/ui/Tick/Tick';
import { CountryOption, FormInputs } from '@/types/request/request';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import SelectCountry from './inputs/selectCountry';
import CountrySelect from './inputs/selectCountry';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import SelectBoolean from './inputs/selectBoolean';

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
      <section className="flex w-full flex-col gap-3 rounded-2xl bg-calculatorDark p-4 dark:bg-calculatorLight">
        <div className="relative flex flex-col items-center">
          <h3 className="absolute left-0 text-xl">Mis Datos</h3>
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
        <div className="flex gap-8">
          <div className="w-full">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className={clsx(
                  'ml-1',
                  errors.sender_first_name
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Nombre
              </label>
              <input
                className={clsx(
                  'rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                  errors.sender_first_name
                    ? 'mb-0 border-red-500'
                    : 'mb-5 hover:border-blue-600 dark:hover:border-white',
                )}
                type="text"
                {...register('sender_first_name', {
                  required: 'El nombre es obligatorio',
                })}
              />
              {errors.sender_first_name && (
                <p className="mb-5 text-sm text-red-500">
                  • {errors.sender_first_name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="sender_last_name"
                className={clsx(
                  'ml-1',
                  errors.sender_last_name
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Apellido
              </label>
              <input
                className={clsx(
                  'rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                  errors.sender_last_name
                    ? 'mb-0 border-red-500'
                    : 'mb-5 hover:border-blue-600 dark:hover:border-white',
                )}
                type="text"
                {...register('sender_last_name', {
                  required: 'El apellido es obligatorio',
                })}
              />
              {errors.sender_last_name && (
                <p className="mb-5 text-sm text-red-500">
                  • {errors.sender_last_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className={clsx(
                  'ml-1',
                  errors.email
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Correo electrónico
              </label>
              <input
                className={clsx(
                  'rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                  errors.email
                    ? 'mb-0 border-red-500'
                    : 'mb-5 hover:border-blue-600 dark:hover:border-white',
                )}
                type="email"
                {...register('email', {
                  required: 'El correo electrónico es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'El formato del correo electrónico es inválido',
                  },
                })}
              />
              {errors.email && (
                <p className="mb-5 text-sm text-red-500">
                  • {errors.email.message}
                </p>
              )}
            </div>
            <CountrySelect
              errors={errors}
              setValue={setValue}
              setCurrentCountry={setCurrentCountry}
              register={register}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex w-full items-center justify-center">
            <p className="text-lg text-lightText dark:text-darkText">
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
