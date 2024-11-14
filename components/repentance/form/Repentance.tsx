'use client';
import React, { useState } from 'react';
import  ReactDOM  from 'react-dom';
import { regretsPc, regretsPhone } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form';
import { FormData } from '@/types/repentance/repentance';
import clsx from 'clsx';
import SelectCodeCountry from '@/components/request/form/inputs/SelectCodeCountry';
import Swal from 'sweetalert2';
import Arrow from '@/components/ui/Arrow/Arrow';
import { createRoot } from 'react-dom/client';
import Tick from '@/components/ui/Tick/Tick';
import WarningIcon from '@/components/ui/WarningIcon/WarningIcon';

const RepentanceForm = () => {
  const { isDark } = useDarkTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    referenceNumber: '',
    lastName: '',
    email: '',
    phone_number: '',
    note: '',
    calling_code: { value: '', label: '', callingCode: '' },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSendClick = () => {
    // PROCESO

    // Swal.fire({
    //   title: `<h1 style="color:white; ${isDark ? 'color: white;' : 'color: black;'}" >La solicitud #123456789 se encuentra en proceso</h1>`,
    //   html: `<div style="text-align: left; ${isDark ? 'color: white;' : 'color: black;'}">
    //            <p>¿Desea cancelarla? El reembolso se devolverá a la cuenta de origen utilizada para esta operación.</p>
    //            <p style="padding-top: 10px;">Nota: Si la transferencia ya se ha completado, no será posible procesar un reembolso.</p>
    //          </div>`,
    //   icon: 'warning',
    //   background: isDark ? 'rgb(69 69 69)' : '#ffffff',
    //   showCancelButton: true,
    //   showConfirmButton: true,
    //   buttonsStyling: false, // desactivar estilos predeterminados de SweetAlert
    //   customClass: {
    //     actions: 'flex justify-between w-full px-4', // posición de botones
    //     confirmButton: `${isDark ? 'buttonSecondDark text-white' : 'buttonSecond text-buttonsLigth '} relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3  hover:bg-transparent dark:border-darkText dark:hover:bg-transparent md:hidden  `, // botón Volver con fondo del modal y letras blancas
    //     cancelButton: `${isDark ? 'buttonSecondDark' : 'buttonSecond'} dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText `, // botón Cancelar con fondo blanco y letras negras
    //   },
    //   confirmButtonText: '<- Volver',
    //   cancelButtonText: 'Cancelar',
    // });

    // EXITO

    // Swal.fire({
    //   didRender: () => {
    //     const tickContainer = document.getElementById('tick-container');
    //     if (tickContainer) {
    //       const root = createRoot(tickContainer);
    //       root.render(
    //         <div style={{ backgroundColor: isDark ? '#FCFBFA' : '#414244', borderRadius: '50%', padding: '10px' }}>
    //           <Tick color={isDark ? '#414244' : '#FCFBFA'} size="70px" />
    //         </div>
    //       );
    //     }
    //   },
    //   title: "",
    //   html: `
    //     <div class="flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#454545] gap-[15px] rounded-xl px-[15px] py-5 xs-phone:py-[10px] max-w-[467.45px] w-full">
    //       <div id="tick-container" class="flex items-center justify-center mb-4"></div>
    //       <h2 class="text-2xl text-[#252526] dark:text-[#ebe7e0] mb-4">Solicitud realizada con éxito</h2>
    //       <button id="back-button" class="${isDark ? 'buttonSecondDark text-white' : 'buttonSecond text-buttonsLigth'} relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 hover:bg-transparent dark:border-darkText dark:hover:bg-transparent">
    //         ← Volver
    //       </button>
    //     </div>
    //   `,
    //   customClass: {
    //     popup: 'confirmAlert',
    //   },
    //   showConfirmButton: false,
    //   showCancelButton: false,
    //   background: 'transparent',
    //   color: isDark ? '#ffffff' : '#000000',
    //   allowOutsideClick: true,
    //   allowEscapeKey: false,
    //   allowEnterKey: false,
    // });
    // document.addEventListener('click', (e) => {
    //   if ((e.target as HTMLElement).id === 'back-button') {
    //     Swal.close();
    //   }
    // });

    // DUPLICACION
    
    // Swal.fire({
    //   didRender: () => {
    //     const warningContainer = document.getElementById('warning-container');
    //     if (warningContainer) {
    //       const root = createRoot(warningContainer);
    //       root.render(
            
    //         <WarningIcon isDark={isDark} />
            
    //       );
    //     }
    //   },
    //   title: "",
    //   html: `
    //     <div class="flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#454545] gap-[15px] rounded-xl px-[15px] py-5 xs-phone:py-[10px] max-w-[467.45px] w-full">
    //       <div id="warning-container" class="flex items-center justify-center mb-4"></div>
    //       <h2 class="text-2xl text-[#252526] dark:text-[#ebe7e0] mb-4">Esta solicitud ya genero una alerta de cancelación o reembolso</h2>
    //       <button id="back-button" class="${isDark ? 'buttonSecondDark text-white' : 'buttonSecond text-buttonsLigth'} relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 hover:bg-transparent dark:border-darkText dark:hover:bg-transparent">
    //         ← Volver
    //       </button>
    //     </div>
    //   `,
    //   customClass: {
    //     popup: 'confirmAlert',
    //   },
    //   showConfirmButton: false,
    //   showCancelButton: false,
    //   background: 'transparent',
    //   color: isDark ? '#ffffff' : '#000000',
    //   allowOutsideClick: true,
    //   allowEscapeKey: false,
    //   allowEnterKey: false,
    // });
    // document.addEventListener('click', (e) => {
    //   if ((e.target as HTMLElement).id === 'back-button') {
    //     Swal.close();
    //   }
    // });
  };

  const formValues = useWatch({ control });
  return (
    <div className="my-7 mx-5 lg:mx-0 flex flex-col items-center justify-center ">
      <div className="flex w-full flex-col md:flex-row">
        <div className="hidden md:block md:w-3/7 flex-col items-start mb-4">
          <h1 className="text-start text-xl w-full">Cancelacion o Reembolso</h1>
          <p className="mt-2 text-justify ">
            Ingresa los datos tal cual aparece en el email enviado
          </p>
        </div>
      </div>
    <div className="w-full flex flex-col md:flex-row">
    <div className="min-h-full flex-wrap justify-center hidden md:block ">
    <Image
      src={regretsPc}
      alt="regretsPc"
      width={650}
      height={0}
      className="object-cover h-full"
    />
  </div>
  <div>
  <div className="min-h-full flex flex-wrap justify-center block md:hidden w-72">
    <Image
      src={regretsPhone}
      alt="regretsPhone"
      width={200}
      height={0}
      className='object-contain h-full'
      
    />
    <div className={` min-w-full flex-wrap justify-center block md:hidden border-t-4  ${isDark ? 'border-t-white' : 'border-t-buttonsLigth'}`}></div>
  </div>
  <div className="block w-72 md:hidden md:w-2/6 flex-col items-start">
          <p className="mt-2 text-lg text-center">
            Ingresa los datos tal cual aparece en el email enviado
          </p>
        </div>
  </div>
  
        <div
          className={`mr-0 md:mr-3 h-full w-full flex flex-col justify-center border-0 md:border-l-4 ${isDark ? 'border-l-white' : 'border-l-buttonsLigth'}`}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="ml-7 mt-3 flex h-full flex-col justify-evenly"
          >
            <div className="mt-2 w-full">
              <label className="text-lg">
                NUMERO DE SOLICITUD
                <input
                  className={`w-full border-0 border-b-4 border-solid ps-0 text-lg ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth focus:border-buttonsLigth'} outline-none focus:outline-none`}
                  type="text"
                  placeholder="Como figura en el recibo"
                  {...register('referenceNumber', {
                    required: '• El número de referencia es obligatorio',
                    pattern: {
                      value: /^[A-Za-z0-9]{20,40}$/,
                      message:
                        '• El número de referencia debe tener entre 20 y 40 caracteres alfanuméricos',
                    },
                  })}
                  onChange={handleChange}
                  required
                />
              </label>
              {errors.referenceNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.referenceNumber.message}
                </p>
              )}
            </div>
            <div className="mt-2">
              <label className="text-lg">
                Apellido
                <input
                  className={`w-full border-0 border-b-4 border-solid ps-0 text-lg ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth focus:border-buttonsLigth'} outline-none focus:outline-none`}
                  type="text"
                  placeholder="Como figura en el recibo"
                  {...register('lastName', {
                    required: '• El Nombre y Apellido es obligatorio',
                    minLength: {
                      value: 6,
                      message: '• Debe ingresar mínimo 6 caracteres',
                    },
                    maxLength: {
                      value: 50,
                      message: '• Debe ingresar como máximo 50 caracteres',
                    },
                  })}
                  onChange={handleChange}
                  required
                />
              </label>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="mt-2">
              <label className="text-lg">
                Email
                <input
                  className={`w-full border-0 border-b-4 border-solid ps-0 text-lg ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white dark:hover:border-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth focus:border-buttonsLigth'} outline-none focus:outline-none`}
                  type="email"
                  {...register('email', {
                    required: '• El Email es obligatorio',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message:
                        '• Ingresa un formato válido de email. Ej: Ejemplo@gmail.com',
                    },
                  })}
                  onChange={handleChange}
                  placeholder="El mismo email que colocaste en el formulario"
                  required
                />
              </label>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mt-2 w-full">
              <div className="flex flex-col">
                <label htmlFor="phone_number">Telefono</label>
                <div
                  className={clsx(
                    `flex w-full items-center border-0 border-b-4 border-solid ps-0 text-center text-lg ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth focus:border-buttonsLigth'} outline-none focus:outline-none`,
                    errors.phone_number && !isFocused
                      ? 'border border-red-500 hover:border-blue-600 dark:hover:border-white'
                      : isFocused
                        ? 'border-blue-600 outline-none ring-1 ring-blue-600 ring-offset-blue-600 hover:border-blue-600 dark:hover:border-white'
                        : 'hover:border-blue-600 dark:hover:border-white',
                  )}
                  onFocus={() => setIsFocused(true)} // Manejador de foco en el contenedor
                  onBlur={() => setIsFocused(false)} // Manejador de desenfoque en el contenedor
                  // tabIndex={0} // Asegúrate de que el div pueda recibir el enfoque
                >
                  <Controller
                    name="calling_code"
                    control={control}
                    defaultValue={undefined}
                    rules={{
                      required: 'Este campo es obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                      <SelectCodeCountry
                        selectedCodeCountry={field.value}
                        setSelectedCodeCountry={(option) =>
                          field.onChange(option)
                        }
                        errors={
                          fieldState.error
                            ? { [field.name]: fieldState.error }
                            : {}
                        }
                      />
                    )}
                  />
                  <p className="flex h-full items-center justify-center">
                    {formValues.calling_code?.callingCode}
                  </p>
                  <input
                    placeholder="Telefono"
                    className="${isDark ? 'border-b-white focus:border-white' : 'border-b-buttonsLigth focus:border-buttonsLigth'} w-full border-none bg-transparent text-lg  focus:border-none focus:outline-none focus:ring-0"
                    type="tel"
                    // onFocus={() => setIsFocused(true)} // Agrega onFocus
                    // onBlur={() => setIsFocused(false)} // Agrega onBlur
                    {...register('phone_number', {
                      required: 'El número de teléfono es obligatorio',
                      pattern: {
                        value: /^\d{9,11}$/,
                        message:
                          'Introduce un número válido de entre 9 y 11 dígitos',
                      },
                    })}
                  />
                </div>
                {errors.phone_number && (
                  <p className="mb-5 text-sm text-red-500">
                    • {errors.phone_number.message as string}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <label className="text-lg">
                NOTA OPCIONAL
                <textarea
                  className={`max-h-[500px] min-h-[45px] w-full resize-none border-0 border-b-2 ps-0 text-lg ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth focus:border-buttonsLigth'} outline-none focus:outline-none`}
                  {...register('note', {
                    minLength: {
                      value: 6,
                      message: '• Debe ingresar mínimo 6 caracteres',
                    },
                    maxLength: {
                      value: 500,
                      message: '• Debe ingresar como máximo 500 caracteres',
                    },
                  })}
                  placeholder="Añade una nota mencionando el motivo del reembolso"
                  onChange={handleChange}
                />
              </label>
              {errors.note && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.note.message}
                </p>
              )}
            </div>
            <div className="mt-5 flex justify-center text-center">
              <button
                type="submit"
                onClick={handleSendClick}
                className={`dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
              >
                Enviar Solicitud
              </button>
            </div>
          </form>
          <div className="ml-7 mt-5 flex justify-center text-center">
            <Link href={'/'}>
              <h3
                className={`w-fit border-b font-bold ${isDark ? 'border-b-white text-white' : 'border-black text-black'} `}
              >
                Salir
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepentanceForm;
