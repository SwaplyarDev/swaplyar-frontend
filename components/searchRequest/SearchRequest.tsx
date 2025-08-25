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
import { Modificada, Cancelada, Discrepancia, Reembolso, Enviada, Revision, DineroEnCamino, Finalizada } from './icons';
import LoadingGif from '../ui/LoadingGif/LoadingGif';
import FlyerTrabajo from '../FlyerTrabajo/FlyerTrabajo';
import ButtonBack from '../ui/ButtonBack/ButtonBack';
import { FlyerGif, searchRequestMovile, searchRequestWeb } from '@/utils/assets/imgDatabaseCloudinary';

export enum AdminStatus {
  Pending = 'pending',
  ReviewPayment = 'review_payment',
  Approved = 'approved',
  Rejected = 'rejected',
  RefundInTransit = 'refund_in_transit',
  InTransit = 'in_transit',
  Discrepancy = 'discrepancy',
  Canceled = 'canceled',
  Modified = 'modified',
  Refunded = 'refunded',
  Completed = 'completed',
}

const SearchRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RequestSearch>({ mode: 'onChange' });
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

  const handleSearchRequest = (history: { status: string }[]) => {
    const statusMessages: Record<AdminStatus, { text: string; icon: string }> = {
      [AdminStatus.Pending]: { text: 'Pago en Revisión', icon: ReactDOMServer.renderToString(<Revision />) },
      [AdminStatus.ReviewPayment]: { text: 'Dinero en Camino', icon: ReactDOMServer.renderToString(<DineroEnCamino />) },
      [AdminStatus.Completed]: { text: 'Solicitud Finalizada con Éxito', icon: ReactDOMServer.renderToString(<Finalizada />) },
      [AdminStatus.InTransit]: { text: 'Solicitud Enviada', icon: ReactDOMServer.renderToString(<Enviada />) },
      [AdminStatus.Canceled]: { text: 'Solicitud Cancelada', icon: ReactDOMServer.renderToString(<Cancelada />) },
      [AdminStatus.Modified]: { text: 'Solicitud Modificada', icon: ReactDOMServer.renderToString(<Modificada />) },
      [AdminStatus.Discrepancy]: { text: 'Discrepancia en la Solicitud', icon: ReactDOMServer.renderToString(<Discrepancia />) },
      [AdminStatus.Refunded]: { text: 'Dinero Reembolsado con Éxito', icon: ReactDOMServer.renderToString(<Reembolso />) },
      [AdminStatus.Approved]: { text: 'Solicitud Aprobada', icon: ReactDOMServer.renderToString(<Enviada />) },
      [AdminStatus.Rejected]: { text: 'Solicitud Rechazada', icon: ReactDOMServer.renderToString(<Cancelada />) },
      [AdminStatus.RefundInTransit]: { text: 'Reembolso en Proceso', icon: ReactDOMServer.renderToString(<DineroEnCamino />) },
    };

    const uniqueStatuses = Array.from(new Set(history.map((h) => h.status)));
    const messages = uniqueStatuses
      .map((status) => statusMessages[status as AdminStatus])
      .filter(Boolean);

    showStatusAlert(messages, isDark);
  };

  const onSubmit: SubmitHandler<RequestSearch> = async (data) => {
    setLoading(true);
    handleAddNextStatus();

    try {
      console.log('Datos enviados:', data);
      const response = await searchRequest(data.transactionId, data.lastNameRequest);

      if (!response.ok) {
        throw new Error(response.message || 'Hubo un problema al obtener el estado de la transacción');
      }

      handleSearchRequest(response.history);
      console.log('Respuesta completa:', response);

      reset({ transactionId: '', lastNameRequest: '' });
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
            className="absolute left-0 hidden w-[588px] drop-shadow-light dark:drop-shadow-darkmode lg2:block"
            src={searchRequestWeb}
            alt="SwaplyAr Search Request™"
            width={700}
            height={700}
          />
          <div className="flex w-full max-w-[506px] flex-col items-center border-b border-buttonsLigth dark:border-darkText lg2:hidden">
            <Image
              className="h-[200px] w-[200px] drop-shadow-light dark:drop-shadow-darkmode"
              src={searchRequestMovile}
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
                  errors.transactionId ? 'Número de Solicitud*' : 'N° de Solicitud como figura en el Correo Eletrónico'
                }
                id="numberOfRequest"
                register={register('transactionId', { required: 'El Número de Solicitud es Obligatorio' })}
                error={errors.transactionId?.message}
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

            <ButtonBack route="/es/centro-de-ayuda" isDark={isDark} />
          </form>
        </section>
      </div>

      <div className="mt-10">
        <FlyerTrabajo
          imageSrc={FlyerGif}
          href="/es/iniciar-sesion-o-registro"
          description="Crea tu cuenta para hacer seguimiento de tus solicitudes en tiempo real"
          nameButton="Crear mi cuenta"
        />
      </div>
    </div>
  );
};

export default SearchRequest;
