'use client';
import React, { useState } from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { Controller, SubmitHandler, useForm,  useWatch } from 'react-hook-form';
import { FormData, CheckRefundProps } from '@/types/repentance/repentance';
import ReactDOM from 'react-dom';
import { regretsPc, regretsPhone } from '@/utils/assets/imgDatabaseCloudinary';
import Swal from 'sweetalert2';
import { createRoot } from 'react-dom/client';
import Tick from '@/components/ui/Tick/Tick';
import WarningIcon from '@/components/ui/WarningIcon/WarningIcon';
import {
  checkIfRegretExists,
  createRegret,
  cancelRegret
} from '@/actions/repentance/action.repentanceForm';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import SelectCodeCountry from '@/components/request/form/inputs/SelectCodeCountry';
const URLRepentance = process.env.NEXT_PUBLIC_BACKEND_URL;


const RepentanceForm = () => {
  const { isDark } = useDarkTheme();
    const [isRequestSent, setIsRequestSent] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar el spinner
  const [hasAlert, setHasAlert] = useState(false);  // Estado para verificar si hay una alerta activa

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    
  } = useForm<FormData>();
  // const onSubmit: SubmitHandler<FormData> = (data) => {handleRepentanceProcess();};
  const [formData, setFormData] = useState<FormData>({
    transaction_id: '',
    last_name: '',
    email: '',
    phone_number: '',
    note: '',
    calling_code: { value: '', label: '', callingCode: '' },
    status: '',
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 

  const handleRepentanceProcess = async (data: FormData): Promise<void> => {
    setIsLoading(true);

    try {
      // Verificar si ya existe una solicitud de arrepentimiento
      const exists = await checkIfRegretExists({
        transaction_id: data.transaction_id,
        email: data.email,
        last_name: data.last_name,
      });

      setIsLoading(false);

      if (exists) {
        // Mostrar alerta si ya existe
        Swal.fire({
                didRender: () => {
                  const warningContainer =
                    document.getElementById('warning-container');
                  if (warningContainer) {
                    const root = createRoot(warningContainer);
                    root.render(<WarningIcon isDark={isDark} />);
                  }
                },
                title: '',
                html: `
                <div className="flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#454545] gap-[15px] rounded-xl px-[15px] py-5 xs-phone:py-[10px] max-w-[467.45px] w-full">
                  <div id="warning-container" className="flex items-center justify-center mb-4"></div>
                  <h2 className="text-2xl text-[#252526] dark:text-[#ebe7e0] mb-4">Esta solicitud ya genero una alerta de cancelación o reembolso</h2>
                  <button id="back-button"  className="${isDark ? 'buttonSecondDark text-white' : 'buttonSecond text-buttonsLigth'} relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 hover:bg-transparent dark:border-darkText dark:hover:bg-transparent">
                    ← Volver
                  </button>
                </div>
              `,
                customClass: {
                  popup: 'confirmAlert',
                },
                showConfirmButton: false,
                showCancelButton: false,
                background: 'transparent',
                color: isDark ? '#ffffff' : '#000000',
                allowOutsideClick: true,
                allowEscapeKey: false,
                allowEnterKey: false,
              });
              document.addEventListener('click', (e) => {
                if ((e.target as HTMLElement).id === 'back-button') {
                  Swal.close();
                }
              });
        return;
      }

      // Mostrar Swal para confirmar el envío
      const result = await  Swal.fire({
            title: `<h1 style="color:white; ${isDark ? 'color: white;' : 'color: black;'}">La solicitud #${formData.transaction_id} se encuentra en proceso</h1>`,
            html: `<div style="text-align: left; ${isDark ? 'color: white;' : 'color: black;'}">
                    <p>¿Desea cancelarla? El reembolso se devolverá a la cuenta de origen utilizada para esta operación.</p>
                    <p style="padding-top: 10px;">Nota: Si la transferencia ya se ha completado, no será posible procesar un reembolso.</p>
                  </div>`,
            icon: 'warning',
            background: isDark ? 'rgb(69 69 69)' : '#ffffff',
            showCancelButton: true,
            showConfirmButton: true,
            buttonsStyling: false, 
            customClass: {
              actions: 'flex flex-row-reverse justify-between w-full px-4', 
              cancelButton: `${
                isDark
                  ? 'buttonSecondDark text-white'
                  : 'buttonSecond text-buttonsLigth'
              } relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 hover:bg-transparent dark:border-darkText dark:hover:bg-transparent`, 
              confirmButton: `${
                isDark ? 'buttonSecondDark' : 'buttonSecond' 
              } disabled={isLoading} dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText`, 
            },
            cancelButtonText: '← Volver',
            confirmButtonText: `${isLoading ? "Cargando..." : "Enviar"}`,
          });

      if (result.isConfirmed) {
        // Enviar la solicitud
        setIsLoading(true);
        const response = await createRegret(data);

        setIsLoading(false);

        if (response.ok) {
          Swal.fire({
                    didRender: () => {
                      const tickContainer = document.getElementById('tick-container');
                      if (tickContainer) {
                        const root = createRoot(tickContainer);
                        root.render(
                          <div
                            style={{
                              backgroundColor: isDark ? '#FCFBFA' : '#414244',
                              borderRadius: '50%',
                              padding: '10px',
                            }}
                          >
                            <Tick color={isDark ? '#414244' : '#FCFBFA'} size="70px" />
                          </div>,
                        );
                      }
                    },
                    title: '',
                    html: `
                          <div className="flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#454545] gap-[15px] rounded-xl px-[15px] py-5 xs-phone:py-[10px] max-w-[467.45px] w-full">
                            <div id="tick-container" className="flex items-center justify-center mb-4"></div>
                            <h2 className="text-2xl text-[#252526] dark:text-[#ebe7e0] mb-4">Solicitud realizada con éxito</h2>
                            <button id="back-button" className="${isDark ? 'buttonSecondDark text-white' : 'buttonSecond text-buttonsLigth'} relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 hover:bg-transparent dark:border-darkText dark:hover:bg-transparent">
                              ← Volver
                            </button>
                          </div>
                        `,
                    customClass: {
                      popup: 'confirmAlert',
                    },
                    showConfirmButton: false,
                    showCancelButton: false,
                    background: isDark ? 'rgb(69 69 69)' : '#ffffff',
                    color: isDark ? '#ffffff' : '#000000',
                    allowOutsideClick: true,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                  });
                  document.addEventListener('click', (e) => {
                    if ((e.target as HTMLElement).id === 'back-button') {
                      Swal.close();
                    }
                  });
                  setFormData({
                    transaction_id: '',
                    last_name: '',
                    email: '',
                    phone_number: '',
                    note: '',
                    calling_code: { value: '', label: '', callingCode: '' },
                    status: '',
                  });
        } else {
          throw new Error(response.message);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Mostrar alerta si se cancela
        Swal.fire({
          icon: "info",
          title: "Solicitud cancelada",
          text: "No se realizó ninguna acción.",
        });
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "Hubo un problema al procesar tu solicitud.",
      });
    }
  };
  const handleInvalidForm = () => {
    Swal.fire({
      icon: "error",
      title: "Datos incorrectos",
      text: "Por favor, revisa los campos e inténtalo nuevamente.",
    });
  }

  const formValues = useWatch({ control });
  return (
    <div className="mx-5 my-7 flex flex-col items-center justify-center lg:mx-0">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="lg:w-3/7 mb-4 hidden flex-col items-start lg:block">
          <h1 className="w-full text-start text-xl">Cancelacion o Reembolso</h1>
          <p className="mt-2 text-justify">
            Ingresa los datos tal cual aparece en el email enviado
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="hidden min-h-full flex-wrap justify-center lg:block">
          <Image
            src={regretsPc}
            alt="regretsPc"
            width={650}
            height={0}
            className="h-full object-cover"
          />
        </div>
        <div className='flex flex-col flex-wrap content-center'>
          <div className="block flex min-h-full w-72 flex-wrap justify-center lg:hidden">
            <Image
              src={regretsPhone}
              alt="regretsPhone"
              width={200}
              height={0}
              className="h-full object-contain"
            />
            <div
              className={`block min-w-full flex-wrap justify-center border-t-4 lg:hidden ${isDark ? 'border-t-white' : 'border-t-buttonsLigth'}`}
            ></div>
          </div>
          <div className="block w-72 flex-col items-start lg:hidden lg:w-2/6">
            <p className="mt-2 text-center text-lg">
              Ingresa los datos tal cual aparece en el email enviado
            </p>
          </div>
        </div>

        <div
          className={`mr-0 flex h-full w-full flex-col justify-center border-0 lg:mr-3 lg:border-l-4 ${isDark ? 'border-l-white' : 'border-l-buttonsLigth'}`}
        >
          <form
            onSubmit={handleSubmit(handleRepentanceProcess, handleInvalidForm)}
            className="ml-2 lg:ml-7 mt-3 flex h-full flex-col justify-evenly"
          >
            <div className="mt-2 w-full">
              <label className="text-lg">
                NUMERO DE SOLICITUD
                <input
                  className={`w-full border-0 border-b-4 border-solid ps-0 text-lg ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth focus:border-buttonsLigth'} outline-none focus:outline-none`}
                  type="text"
                  placeholder="Como figura en el recibo"
                  {...register('transaction_id', {
                    required: '• El número de referencia es obligatorio',
                    pattern: {
                      value: /^[A-Za-z0-9]{10,20}$/,
                      message:
                        '• El número de referencia debe tener entre 10 y 20 caracteres alfanuméricos',
                    },
                  })}
                  onChange={handleChange}
                  required
                />
              </label>
              {errors.transaction_id && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.transaction_id.message}
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
                  {...register('last_name', {
                    required: '• El Apellido es obligatorio',
                    minLength: {
                      value: 2,
                      message: '• Debe ingresar mínimo 2 caracteres',
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
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.last_name.message}
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
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
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
                    className="${isDark ? 'border-b-white focus:border-white' : 'border-b-buttonsLigth focus:border-buttonsLigth'} w-full border-none bg-transparent text-lg focus:border-none focus:outline-none focus:ring-0"
                    type="tel"
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
                // onClick={handleRepentanceProcess}
                disabled={isLoading}
                className={`dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
              >
                {isLoading ? "Cargando..." : "Enviar Solicitud"}
              </button>
            </div>
          </form>
          <div className="ml-2 mt-5 lg:ml-7 flex justify-center text-center">
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

export default RepentanceForm
