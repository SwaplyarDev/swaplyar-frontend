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
import ButtonBack from '../ui/ButtonBack/ButtonBack';
import { FlyerGif } from '@/utils/assets/imgDatabaseCloudinary';

const SearchRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RequestSearch>({
    mode: 'onChange',
  });
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
      received: { text: 'Solicitud Recibida', icon: ReactDOMServer.renderToString(<IconoVacio />) },
      pending: { text: 'Solicitud enviada', icon: ReactDOMServer.renderToString(<IconoVacio />) },
      review_payment: { text: 'Pago en Revisión', icon: ReactDOMServer.renderToString(<RevisionCamino />) },
      completed: { text: 'Solicitud Finalizada con Éxito', icon: ReactDOMServer.renderToString(<IconoVacio />) },
      in_transit: { text: 'Dinero en Camino', icon: ReactDOMServer.renderToString(<RevisionCamino />) },
      canceled: { text: 'Solicitud Cancelada', icon: ReactDOMServer.renderToString(<Cancelada />) },
      modified: { text: 'Solicitud modificada', icon: ReactDOMServer.renderToString(<Modificada />) },
      refunded: { text: 'Reembolso solicitado', icon: ReactDOMServer.renderToString(<Reembolso />) },
      discrepancy: { text: 'Discrepancia en la Solicitud', icon: ReactDOMServer.renderToString(<Discrepancia />) },
    };

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
      .filter((message): message is { text: string; icon: string } => message !== null);

    showStatusAlert(messages, isDark);
  };

  const onSubmit: SubmitHandler<RequestSearch> = async (data) => {
    setLoading(true);
    handleAddNextStatus();
    try {
      const response = await searchRequest(data.numberOfRequest, data.lastNameRequest);

      if (!response.ok) {
        throw new Error(response.message || 'Hubo un problema al obtener el estado de la transacción');
      }

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
      <div className="mx-auto flex w-full max-w-screen-lg flex-col px-4 py-8 md:gap-4 md:px-8 lg2:px-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="flex h-auto w-full max-w-[505px] items-center justify-center text-center font-titleFont text-[38px] font-medium text-lightText dark:text-darkText lg2:text-[40px]">
            Consulta el estado de tu solicitud fácilmente
          </h1>

          <p className="mt-10 flex h-auto w-full max-w-[505px] items-center justify-center text-center font-textFont font-light text-custom-grayD-1000 dark:text-custom-grayD-100 lg2:max-w-[592px]">
            Ingresa el Número de Solicitud y el Apellido tal como figura en el correo electrónico enviado para verificar
            el estado actual de tu solicitud de manera rápida y precisa.
          </p>

          <p className="mt-10 flex h-auto w-full max-w-[515px] items-center justify-center text-left font-textFont text-[21px] font-light text-custom-grayD-1000 dark:text-custom-grayD-100 md:text-center lg2:max-w-full">
            Introduce los datos exactamente como aparecen en el correo electrónico enviado.
          </p>
        </div>
        <section className="relative mt-10 flex min-h-[500px] flex-col items-center justify-center">
          <Image
            className="absolute left-0 hidden w-[588px] lg2:block"
            src="/images/search-request-web.png"
            alt="SwaplyAr Search Request™"
            width={700}
            height={700}
          />
          <div className="flex w-full max-w-[506px] flex-col items-center border-b border-buttonsLigth dark:border-darkText lg2:hidden">
            <Image
              className="h-[200px] w-[200px]"
              src="/images/search-request-phone.png"
              alt="SwaplyAr Search Request Mobile™"
              width={300}
              height={300}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 flex w-full max-w-[466px] flex-col items-center gap-4 lg2:self-end"
          >
            <div className="flex h-[81px] w-full flex-col">
              <label htmlFor="numberOfRequest" className="text-right font-textFont text-xs font-light">
                Número de Solicitud
              </label>
              <InputOnlyLine
                placeholder={
                  errors.numberOfRequest
                    ? 'Número de Solicitud*'
                    : 'N° de Solicitud como figura en el Correo Eletrónico'
                }
                id="numberOfRequest"
                register={register('numberOfRequest', { required: 'El Número de Solicitud es Obligatorio' })}
                error={errors.numberOfRequest?.message}
              />
            </div>
            <div className="flex h-[81px] w-full flex-col">
              <label htmlFor="lastNameRequest" className="text-right font-textFont text-xs font-light">
                Apellido
              </label>
              <InputOnlyLine
                placeholder={errors.lastNameRequest ? 'Apellido*' : 'Apellido como figura en el Correo Eletrónico'}
                id="lastNameRequest"
                register={register('lastNameRequest', { required: 'El Apellido es Obligatorio' })}
                error={errors.lastNameRequest?.message}
              />
            </div>
            <div className="flex h-[50px] flex-col items-center justify-center gap-[18px]">
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingGif color={isDark ? '#ebe7e0' : '#012A8E'} size="50px" />
                </div>
              ) : (
                <button
                  disabled={!isValid}
                  className={`relative flex h-10 w-[280px] items-center justify-center rounded-3xl bg-buttonsLigth px-[14px] py-3 font-titleFont font-semibold text-darkText dark:bg-darkText ${
                    !isValid
                      ? 'bg-disabledButtonsLigth dark:bg-placeholderDark dark:text-darkText'
                      : isDark && isValid
                        ? 'buttonSecondDark text-lightText'
                        : 'buttonSecond'
                  }`}
                >
                  Buscar Solicitud
                </button>
              )}
            </div>
            <ButtonBack route="/info/help-center" isDark={isDark} />
          </form>
        </section>
      </div>
      <div className="mt-10">
        <FlyerTrabajo
          imageSrc={FlyerGif}
          title="¿Nuevo en SwaplyAr?"
          description="Conoce cómo funciona nuestra plataforma y comienza a transferir dinero de forma sencilla y segura."
          nameButton="¡Empieza ahora!"
        />
      </div>
    </div>
  );
};

export default SearchRequest;
