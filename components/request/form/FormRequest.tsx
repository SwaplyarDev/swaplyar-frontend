// /components/request/requestRegister.tsx

'use client';

import clsx from 'clsx';
import SelectCountry from './inputs/selectCountry';
import PayerInfo from './inputs/payerInfo';
import ReceiverInfo from './inputs/receiverInfo';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { requestRegister } from '@/actions/request/action.requestRegister';
import Swal from 'sweetalert2';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { CountryOption, FormInputs } from '@/types/request/request';
import Image from 'next/image';
import Tick from '@/components/ui/Tick/Tick';
import InputField from '@/components/ui/contact-form/InputField';

export const FormRequest = () => {
  const { isDark } = useDarkTheme();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();
  return (
    <form className="flex w-full max-w-[1000px] flex-col gap-5">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-lightText dark:text-darkText">
          Formulario de Solicitud
        </h2>
        <div className="mt-2 text-xs">
          <p>Tiempo Restante</p>
        </div>
      </div>

      <section className="w-full rounded-2xl bg-[#e6e8ef62] p-4 dark:bg-calculatorDark">
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
        <div className="flex flex-col">
          <div className="flex gap-5">
            <div>
              <label htmlFor="Email" className="block text-xs">
                Email
              </label>
              <input type="email" />
            </div>
            <div>
              <label htmlFor="Email" className="block text-xs">
                Email
              </label>
              <input type="email" />
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <label htmlFor="Apellido" className="block text-xs">
                Apellido
              </label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="Telefono" className="block text-xs">
                Telefono
              </label>
              <input type="number" />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <p>¿Se transfiere a una cuenta propia?</p>
          <select name="Seleccione" id="Seleccione" className="text-black">
            <option value="Seleccion" selected disabled>
              Seleccione
            </option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[14px] text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
          >
            Siguiente
          </button>
        </div>
      </section>

      <section className="flex w-full flex-col gap-2 rounded-2xl bg-[#e6e8ef62] p-4 dark:bg-calculatorDark">
        <div className="relative flex flex-col items-center">
          <h3 className="absolute left-0 text-xl">
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
        <div className="flex gap-8">
          <div className="w-full">
            <div>
              <label
                htmlFor="receiver_first_name"
                className={clsx(
                  "text-xs m-2",
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
            <div>
              <label
                htmlFor="receiver_last_name"
                className={clsx(
                  "text-xs m-2",
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
          <div className="w-full">
            <div>
              <label
                htmlFor="wise_email"
                className={clsx(
                  "text-xs m-2",
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
            <div>
              <label
                htmlFor="re_enter_wise_email"
                className={clsx(
                  "text-xs m-2",
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
            className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[14px] text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
          >
            Siguiente
          </button>
        </div>
      </section>

      <section className="w-full rounded-2xl bg-[#e6e8ef62] p-4 dark:bg-calculatorDark">
        <div className="relative flex flex-col items-center">
          <h3 className="absolute left-0 text-xl">Pago</h3>
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
        </div>
        <p>
          tienes que realizar el pago de $000 al email asdfgh@asdfgh.com con el
          concepto de ''PAGO'' para enviarte el dinero a la cuenta
          00000@00000000.com
        </p>
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="flex w-full flex-col">
            <label
              htmlFor="send_amount"
              className={clsx(
                'block',
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
            <label
              htmlFor="receive_amount"
              className={clsx(
                'block',
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
            <label
              htmlFor="comprobante"
              className={clsx(
                'block',
                errors.comprobante
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Comprobante
            </label>
            <InputField
              id="comprobante"
              type="file"
              //   accept="image/*"
              placeholder="SUBIR COMPROBANTE"
              register={register('comprobante', { required: true })}
              error={errors.comprobante && 'Este campo es obligatorio'}
            />
          </div>
          <div className="flex w-full flex-col">
            <label
              htmlFor="nota"
              className={clsx(
                'block',
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
              rows={7}
              placeholder="Añade una nota si lo deseas ;)"
              className={clsx(
                'max-w-full rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                errors.nota
                  ? 'border-red-500'
                  : 'hover:border-blue-600 dark:hover:border-white',
              )}
            ></textarea>
            {errors.nota && (
              <p className="text-sm text-red-500">Este campo es obligatorio</p>
            )}
          </div>
        </div>
      </section>
    </form>
  );
};

export default FormRequest;
