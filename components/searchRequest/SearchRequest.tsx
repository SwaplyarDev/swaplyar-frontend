'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import InputOnlyLine from '../ui/InputOnlyLine/InputOnlyLine';
import { RequestSearch } from '@/types/data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import useStatusManager from '@/hooks/useStatusManager';
import { searchRequest } from '@/actions/request/action.search-request/action.searchRecuest';
import FlyerTrabajo from '../FlyerTrabajo/FlyerTrabajo';
import ButtonBack from '../ui/ButtonBack/ButtonBack';
import { FlyerGif, searchRequestMovile, searchRequestWeb } from '@/utils/assets/imgDatabaseCloudinary';
import ButtonAuth from '../auth/AuthButton';
import PopUp from '../ui/PopUp/PopUp';

interface SearchResponse {
  ok: boolean;
  message?: string;
  history?: { status: string; timestamp: string }[];
  status?: AdminStatus;
}

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

  const handleSearchRequest = (history: { status: string; timestamp: string }[]) => {
    const statusMessages: Record<AdminStatus, string> = {
      [AdminStatus.Pending]: 'Pago en Revisión',
      [AdminStatus.InTransit]: 'Solicitud Enviada',
      [AdminStatus.ReviewPayment]: 'Dinero en Camino',
      [AdminStatus.Completed]: 'Solicitud Finalizada con Éxito',
      [AdminStatus.Discrepancy]: 'Discrepancia en la Solicitud',
      [AdminStatus.Canceled]: 'Solicitud Cancelada',
      [AdminStatus.Modified]: 'Solicitud Modificada',
      [AdminStatus.Refunded]: 'Dinero Reembolsado con Éxito',
      [AdminStatus.Approved]: 'Solicitud Aprobada',
      [AdminStatus.Rejected]: 'Solicitud Rechazada',
      [AdminStatus.RefundInTransit]: 'Reembolso en Proceso',
    };

    const uniqueStatuses = Array.from(new Set(history.map((h) => h.status)));
    const messages = uniqueStatuses
      .map((status) => statusMessages[status as AdminStatus])
      .filter(Boolean);

    const currentStatus = history[history.length - 1]?.status as AdminStatus;
    const dynamicTitle = (currentStatus === AdminStatus.Completed || currentStatus === AdminStatus.Refunded)
      ? 'Solicitud Finalizada' 
      : 'Solicitud en Proceso';

    PopUp({
      variant: 'success-with-status',
      title: dynamicTitle,
      text: 'Te puedes comunicar con el equipo de soporte mediante WhatsApp al numero <strong>+54 9 11 2383-2198</strong>',
      isHtml: true,
      status: messages,
      isDark,
      actionButton: {
        text: 'Contactar por WhatsApp',
        style: 'whatsapp',
        onClick: () => {
          window.open('https://wa.me/5493874553521', '_blank');
        }
      }
    });
  };

  const onSubmit: SubmitHandler<RequestSearch> = async (data) => {
    setLoading(true);
    handleAddNextStatus();

    try {
      console.log('Datos enviados:', data);
      const response = await searchRequest(data.transactionId, data.lastNameRequest) as SearchResponse;

      if (!response.ok) {
        PopUp({
          variant: 'simple-error',
          title: response.message || 'Hubo un problema al obtener el estado de la transacción. Intente nuevamente.',
          isDark
        });
        throw new Error(response.message || 'Hubo un problema al obtener el estado de la transacción');
      }

      // Si no hay historial, crear uno con el estado actual
      const history = response.history ||
        (response.status ? [{ status: response.status, timestamp: new Date().toISOString() }] :
          [{ status: AdminStatus.Pending, timestamp: new Date().toISOString() }]);

      handleSearchRequest(history);
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
              <ButtonAuth
                label="Buscar Solicitud"
                type="submit"
                isDark={isDark}
                loading={loading}
                disabled={!isValid || loading}
                className="w-[280px]"
                variant="primary"
              />
            </div>


            <ButtonBack route="/es/centro-de-ayuda" isDark={isDark} />
          </form>
        </section>
      </div>

      <div className="mt-10">
        <FlyerTrabajo
          imageSrc={FlyerGif}
          href="/es/registro"
          description="Crea tu cuenta para hacer seguimiento de tus solicitudes en tiempo real"
          nameButton="Crear mi cuenta"
        />
      </div>
    </div>
  );
};

export default SearchRequest;
