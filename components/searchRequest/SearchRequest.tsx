/**
 * **SearchRequest Component**
 *
 * Este componente se encarga de manejar la búsqueda de solicitudes en SwaplyAr.
 *
 * - **Dependencias principales**:
 *   - `useForm`: Manejo de formularios y validación.
 *   - `useDarkTheme`: Modo oscuro.
 *   - `useStatusManager`: Control del estado de las solicitudes.
 *   - `searchRequest`: Función para buscar solicitudes en la base de datos.
 *   - `showStatusAlert`: Muestra alertas personalizadas basadas en los estados.
 *
 * - **Funciones clave**:
 *   1. `handleAddNextStatus`: Agrega un estado predefinido a la lista de estados actuales.
 *   2. `handleSearchRequest`: Mapea estados únicos recibidos desde el backend a sus descripciones e íconos correspondientes, y muestra un alerta con el resultado.
 *
 *   3. `onSubmit`:
 *      - Envía el formulario, llama al backend y gestiona la respuesta de los estados de la solicitud.
 *
 * - **Interfaz de usuario**:
 *   - Formulario para capturar el número de solicitud y apellido.
 *   - Botón de búsqueda con estado de carga (usando un gif).
 *
 * - **Estados locales**:
 *   - `loading`: Indica si la solicitud está en proceso.
 *   - `currentIndex`: Controla el índice de estados predefinidos.
 */

'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import InputOnlyLine from '../ui/InputOnlyLine/InputOnlyLine';
import { RequestSearch } from '@/types/data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import useStatusManager from '@/hooks/useStatusManager';
import { searchRequest } from '@/actions/request/action.search-request/action.searchRecuest';
import { showStatusAlert } from './swalConfig';
import ReactDOMServer from 'react-dom/server';
import { IconoVacio, RevisionCamino, Modificada, Cancelada, Discrepancia, Reembolso } from './icons';
import LoadingGif from '../ui/LoadingGif/LoadingGif';
import FlyerTrabajo from '../FlyerTrabajo/FlyerTrabajo';
import Link from 'next/link';
import { FlyerGif } from '@/utils/assets/imgDatabaseCloudinary';

const SearchRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestSearch>();
  const [loading, setLoading] = useState(false);
  const { isDark } = useDarkTheme();
  const { statuses, addStatus } = useStatusManager();

  const predefinedStatuses: { [key: string]: string } = {
    1: 'Activo',
    2: 'Inactivo',
    3: 'Pendiente',
    4: 'Suspendido',
  };

  const [currentIndex, setCurrentIndex] = useState(1);

  const completedSteps = statuses;

  const handleAddNextStatus = () => {
    const nextStatus = predefinedStatuses[currentIndex];
    if (nextStatus) {
      addStatus(nextStatus);
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log('No hay más estados para agregar.');
    }
  };

  const handleSearchRequest = (statusObject: Record<string, any>) => {
    const statusMessages = {
      received: {
        text: 'Solicitud Recibida',
        icon: ReactDOMServer.renderToString(<IconoVacio />),
      },
      pending: {
        text: 'Solicitud enviada',
        icon: ReactDOMServer.renderToString(<IconoVacio />),
      },
      review_payment: {
        text: 'Pago en Revisión',
        icon: ReactDOMServer.renderToString(<RevisionCamino />),
      },
      completed: {
        text: 'Solicitud Finalizada con Éxito',
        icon: ReactDOMServer.renderToString(<IconoVacio />),
      },
      in_transit: {
        text: 'Dinero en Camino',
        icon: ReactDOMServer.renderToString(<RevisionCamino />),
      },
      canceled: {
        text: 'Solicitud Cancelada',
        icon: ReactDOMServer.renderToString(<Cancelada />),
      },
      modified: {
        text: 'Solicitud modificada',
        icon: ReactDOMServer.renderToString(<Modificada />),
      },
      refunded: {
        text: 'Reembolso solicitado',
        icon: ReactDOMServer.renderToString(<Reembolso />),
      },
      discrepancy: {
        text: 'Discrepancia en la Solicitud',
        icon: ReactDOMServer.renderToString(<Discrepancia />),
      },
    };

    // Transformar el objeto en un array de claves únicas
    const uniqueStatuses = Array.from(new Set(Object.keys(statusObject)));
    const messages = uniqueStatuses
      .map((status) => {
        const statusInfo = statusMessages[status as keyof typeof statusMessages];

        if (!statusInfo) {
          console.warn(`Estado no reconocido: ${status}`);
          return null;
        }

        return {
          text: statusInfo.text,
          icon: statusInfo.icon,
        };
      })
      .filter((message): message is { text: string; icon: string } => message !== null); // Filtrar posibles `null`

    showStatusAlert(messages, isDark);
  };

  const onSubmit: SubmitHandler<RequestSearch> = async (data) => {
    setLoading(true);
    handleAddNextStatus();
    try {
      // Llamar a la función de búsqueda de solicitud
      const response = await searchRequest(data.numberOfRequest, data.lastNameRequest);

      if (!response.ok) {
        throw new Error(response.message || 'Hubo un problema al obtener el estado de la transacción');
      }

      // `response.status` es un arreglo con los estados de la solicitud
      const statuses = response.status || [];
      handleSearchRequest(statuses);
      console.log(response);

      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error!', error.message);
      } else {
        console.error('An unexpected error occurred', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-16 py-8 md:gap-4">
        <div className="flex flex-col items-center justify-center px-8 lg:px-0">
          <h1 className="flex h-auto w-full max-w-[592px] items-center justify-center text-center text-2xl text-lightText dark:text-darkText md:h-[97px] md:text-4xl">
            Consulta el estado de tu solicitud fácilmente
          </h1>

          <p className="flex h-auto w-full max-w-[600px] items-center justify-center py-6 text-center text-sm text-custom-grayD-1000 dark:text-custom-grayD-100 md:h-[48px] md:py-10 md:text-base">
            Ingresa el Número de Solicitud y el Apellido tal como figura en el correo electrónico enviado para verificar
            el estado actual de tu solicitud de manera rápida y precisa.
          </p>

          <p className="flex h-auto w-full max-w-[762px] items-center justify-center py-6 text-center text-sm text-custom-grayD-1000 dark:text-custom-grayD-100 md:h-[32px] md:py-10 md:text-lg">
            Introduce los datos exactamente como aparecen en el correo electrónico enviado.
          </p>
        </div>
        <section className="relative flex min-h-[500px] flex-col items-center justify-center px-8 md:flex-row md:items-start md:justify-start lg-tablet:min-h-[600px] lg:px-0">
          <Image
            className="absolute left-0 top-0 ml-8 hidden w-[500px] md:block md-tablet:w-[600px] lg-tablet:w-[700px] lg:ml-0"
            src="/images/search-request-web.png"
            alt="SwaplyAr Search Request™"
            width={700}
            height={700}
          />
          <div className="px- flex max-w-md flex-col items-center gap-8 md:hidden">
            <Image
              src="/images/search-request-phone.png"
              alt="SwaplyAr Search Request Mobile™"
              width={300}
              height={300}
            />
            <div className="h-1 w-full bg-custom-blue-300 dark:bg-custom-grayD-500"></div>
            <p className="text-center text-2xl font-[700] text-lightText dark:text-darkText">
              Ingresa los datos tal cual aparece en el email enviado
            </p>
          </div>
          <div className="hidden h-[324px] min-w-[380px] md:block md-tablet:min-w-[410px] lg-tablet:min-w-[510px]"></div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-16 flex w-full max-w-[660px] flex-col items-center gap-8 md:items-end lg-tablet:gap-16"
          >
            <div className="flex w-full flex-col items-start md:items-end">
              <label htmlFor="numberOfRequest" className="text-sm">
                NUMERO DE SOLICITUD
              </label>
              <InputOnlyLine
                placeholder="N° de Solicitud como figura en el Correo Eletrónico"
                id="numberOfRequest"
                register={register('numberOfRequest')}
                error={errors.numberOfRequest?.message}
                classStyle="text-start md:text-end text-lg pl-0 placeholder:text-custom-blue-300 dark:placeholder:text-custom-grayD-500 border-custom-blue-300 dark:border-custom-grayD-500
                dark:focus:border-custom-grayD-500 focus:border-custom-blue-300 hover:border-custom-blue-300"
              />
            </div>
            <div className="flex w-full flex-col items-start md:items-end">
              <label htmlFor="lastNameRequest" className="text-sm">
                APELLIDO
              </label>
              <InputOnlyLine
                placeholder="Apellido como figura en el Correo Eletrónico"
                id="lastNameRequest"
                register={register('lastNameRequest')}
                error={errors.lastNameRequest?.message}
                classStyle="text-start md:text-end text-lg pl-0 placeholder:text-custom-blue-300 dark:placeholder:text-custom-grayD-500 border-custom-blue-300 dark:border-custom-grayD-500 dark:focus:border-custom-grayD-500 focus:border-custom-blue-300 hover:border-custom-blue-300"
              />
            </div>
            <div className="mt-8 h-1 w-full max-w-md bg-custom-blue-300 dark:bg-custom-grayD-500 md:hidden"></div>
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                className={`relative m-1 flex h-10 w-52 items-center justify-center rounded-3xl border border-custom-blue-300 bg-custom-blue-300 text-sm font-bold text-[#FFFFFB] dark:border-custom-grayD-500 dark:bg-custom-grayD-500 dark:text-[#FFFFFB] ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingGif color={isDark ? '#000' : '#ebe7e0'} />
                  </div>
                ) : (
                  'Buscar Solicitud'
                )}
              </button>
              <button
                className={`group flex w-[100px] items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 ${isDark ? 'buttonSecondDark border-white text-white' : 'buttonSecond border-custom-blue-800 text-custom-blue-800'}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H6M12 5l-7 7 7 7" />
                </svg>
                Volver
              </button>
            </div>
          </form>
        </section>
      </div>
      <div className="mt-10">
        <FlyerTrabajo imageSrc={FlyerGif}>
          <p>
            ¿Nuevo en SwaplyAr? <br /> Conoce cómo funciona nuestra plataforma y comienza a transferir dinero de forma
            sencilla y segura.{' '}
          </p>
          <div>
            <button
              id="bannerHTUButton"
              className={`ease group mt-6 rounded-full border-2 border-buttonsLigth bg-buttonsLigth px-4 py-2 text-lg duration-300 hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-black ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              <Link
                href={'/info/how-to-use'}
                className={`ease font-bold text-darkText transition-colors duration-300 ${isDark ? 'dark:text-lightText' : 'text'} `}
              >
                ¡Empieza ahora!
              </Link>
            </button>
          </div>
        </FlyerTrabajo>
      </div>
    </div>
  );
};

export default SearchRequest;
