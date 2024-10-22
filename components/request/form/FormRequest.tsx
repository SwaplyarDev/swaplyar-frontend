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
    <form
    className="flex flex-col max-w-[1000px] w-full gap-5"
    >

    <div className='flex justify-between'>
        <h2 className='text-xl font-bold text-lightText dark:text-darkText'>
        Formulario de Solicitud
        </h2>
        <div className='text-xs mt-2'>
        <p>
            Tiempo Restante
        </p> 
        </div>
    </div>

    <section className='bg-[#e6e8ef62] p-4 dark:bg-calculatorDark rounded-2xl w-full'>
        <div className='flex relative flex-col items-center'>
          <h3 className="text-xl absolute left-0">Mis Datos</h3>
          <div className='flex items-center justify-center'>
            <div className='rounded-full dark:bg-darkText dark:border-darkText bg-lightText border-lightText h-7 w-7 flex items-center justify-center'>
              <Tick/>
            </div>
            <div className='h-[3px] w-6 dark:bg-darkText bg-lightText'></div>
            <div className='rounded-full border-[3px] dark:border-darkText h-7 w-7 border-lightText'></div>
            <div className='h-[3px] w-6 dark:bg-darkText bg-lightText'></div>
            <div className='rounded-full border-[3px] dark:border-darkText h-7 w-7 border-lightText'></div>
          </div>
        </div> 
        <div className='flex flex-col'>
            <div className='flex gap-5'>
                <div>
                    <label htmlFor="Email" className='text-xs block'>Email</label>
                    <input type="email" />    
                </div>
                <div>
                    <label htmlFor="Email" className='text-xs block'>Email</label>
                    <input type="email" />
                </div>
            </div>
            <div className='flex gap-5'>
                <div>
                    <label htmlFor="Apellido" className='text-xs block'>Apellido</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="Telefono" className='text-xs block'>Telefono</label>
                    <input type="number" />
                </div>
            </div>
        </div>
        <div className='flex justify-between'>
        <p>
            ¿Se transfiere a una cuenta propia?
        </p>
        <select name="Seleccione" id="Seleccione" className='text-black'>
        <option value="Seleccion" selected disabled>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
        </select>
        </div>
        <div className='flex justify-end'>
        <button className={`relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}>
            siguiente
        </button>
        </div>
    </section>

    <section className='bg-[#e6e8ef62] p-4 dark:bg-calculatorDark rounded-2xl w-full'>
        <div className='flex relative flex-col items-center'>
          <h3 className="text-xl absolute left-0">Información del destinatario</h3>
          <div className='flex items-center justify-center'>
            <div className='rounded-full dark:bg-darkText dark:border-darkText bg-lightText border-lightText h-7 w-7 flex items-center justify-center'>
              <Tick/>
            </div>
            <div className='h-[3px] w-6 dark:bg-darkText bg-lightText'></div>
            <div className='rounded-full dark:bg-darkText dark:border-darkText bg-lightText border-lightText h-7 w-7 flex items-center justify-center'>
              <Tick/>
            </div>
            <div className='h-[3px] w-6 dark:bg-darkText bg-lightText'></div>
            <div className='rounded-full border-[3px] dark:border-darkText h-7 w-7 border-lightText'></div>
          </div>
        </div>
        <div className='flex gap-16'>
            <div className='w-full'>
                <div>
                    <label
                        htmlFor="monto_enviar"
                        className={clsx(
                            errors.monto_enviar
                            ? 'text-red-500'
                            : 'text-lightText dark:text-darkText',
                        )}
                        >
                        Monto a pagar
                    </label>
                    <InputField
                    id="monto-enviar"
                    type='number'
                    placeholder="Monto Enviar"
                    register={register('monto_enviar', { required: true })}
                    error={errors.monto_enviar && 'Este campo es obligatorio'}
                    /> 
                </div> 
                <div>
                    <label
                        htmlFor="monto_enviar"
                        className={clsx(
                            errors.monto_enviar
                            ? 'text-red-500'
                            : 'text-lightText dark:text-darkText',
                        )}
                        >
                        Monto a pagar
                    </label>
                    <InputField
                    id="monto-enviar"
                    type='number'
                    placeholder="Monto Enviar"
                    register={register('monto_enviar', { required: true })}
                    error={errors.monto_enviar && 'Este campo es obligatorio'}
                    /> 
                </div>     
            </div>
            <div className='w-full'>
                <div>
                    <label
                        htmlFor="monto_enviar"
                        className={clsx(
                            errors.monto_enviar
                            ? 'text-red-500'
                            : 'text-lightText dark:text-darkText',
                        )}
                        >
                        Monto a pagar
                    </label>
                    <InputField
                    id="monto-enviar"
                    type='number'
                    placeholder="Monto Enviar"
                    register={register('monto_enviar', { required: true })}
                    error={errors.monto_enviar && 'Este campo es obligatorio'}
                    /> 
                </div> 
                <div>
                    <label
                        htmlFor="monto_enviar"
                        className={clsx(
                            errors.monto_enviar
                            ? 'text-red-500'
                            : 'text-lightText dark:text-darkText',
                        )}
                        >
                        Monto a pagar
                    </label>
                    <InputField
                    id="monto-enviar"
                    type='number'
                    placeholder="Monto Enviar"
                    register={register('monto_enviar', { required: true })}
                    error={errors.monto_enviar && 'Este campo es obligatorio'}
                    /> 
                </div>             
            </div>
        </div>
        <div className='flex justify-end'>
            <button className={`relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}>
                siguiente
            </button>
        </div>
    </section>

    <section className='bg-[#e6e8ef62] p-4 dark:bg-calculatorDark rounded-2xl w-full'>
        <div className='flex relative flex-col items-center'>
          <h3 className="text-xl absolute left-0">Pago</h3>
          <div className='flex items-center justify-center'>
            <div className='rounded-full dark:bg-darkText dark:border-darkText bg-lightText border-lightText h-7 w-7 flex items-center justify-center'>
              <Tick/>
            </div>
            <div className='h-[3px] w-6 dark:bg-darkText bg-lightText'></div>
            <div className='rounded-full dark:bg-darkText dark:border-darkText bg-lightText border-lightText h-7 w-7 flex items-center justify-center'>
              <Tick/>
            </div>
            <div className='h-[3px] w-6 dark:bg-darkText bg-lightText'></div>
            <div className='rounded-full dark:bg-darkText dark:border-darkText bg-lightText border-lightText h-7 w-7 flex items-center justify-center'>
              <Tick/>
            </div>
          </div>
        </div> 
        <p>
            tienes que realizar el pago de $000 al email asdfgh@asdfgh.com con el concepto de ''PAGO'' para enviarte el dinero a la cuenta 00000@00000000.com
        </p>
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="flex w-full flex-col">
            <label
                htmlFor="monto_enviar"
                className={clsx(
                    'block',
                    errors.monto_enviar
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
                >
                Monto a pagar
            </label>
            <InputField
              id="monto-enviar"
              type='number'
              placeholder="Monto Enviar"
              register={register('monto_enviar', { required: true })}
              error={errors.monto_enviar && 'Este campo es obligatorio'}
            />
            <label
                htmlFor="monto_recibir"
                className={clsx(
                    'block',
                    errors.monto_recibir
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
                >
                Monto a Recibir
            </label>
            <InputField
              id="monto_recibir"
              type='number'
              placeholder="Monto a Recibir"
              register={register('monto_recibir', { required: true })}
              error={errors.monto_recibir && 'Este campo es obligatorio'}
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
