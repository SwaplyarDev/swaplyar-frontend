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
    <div className='mt-20'>
      <div className="mx-auto flex w-full max-w-screen-lg flex-col px-4 py-8 md:gap-4 md:px-8 lg2:px-0">
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

        <section className="relative mx-auto mt-[38px] flex min-h-[500px] w-full max-w-[1047px] flex-col items-center justify-center">
          <Image
            className="hidden w-[680px] drop-shadow-light dark:drop-shadow-darkmode lg2:block lg2:absolute lg2:left-0 lg2:top-0"
            src={searchRequestWeb}
            alt="SwaplyAr Search Request™"
            width={680}
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
            className="flex w-[490px] h-[180px] flex-col items-center gap-4  lg2:absolute lg2:right-0 lg2:top-[20px] lg2:mt-0"
          >
            <div className="flex h-[50px] w-full flex-col ">
            
              <InputOnlyLine
                placeholder={
                  errors.transactionId ? 'Número de Solicitud*' : 'N° de Solicitud'
                }
                id="numberOfRequest"
                register={register('transactionId', { required: 'El Número de Solicitud es Obligatorio' })}
                error={errors.transactionId?.message}
              />
            </div>

            <div className="flex h-[50px] w-full flex-col">
              
              <InputOnlyLine
                placeholder={errors.lastNameRequest ? 'Apellido*' : 'Apellido'}
                id="lastNameRequest"
                register={register('lastNameRequest', { required: 'El Apellido es Obligatorio' })}
                error={errors.lastNameRequest?.message}
              />
            </div>

            <div className="flex h-[50px] w-full flex-row items-center justify-between">
              <ButtonBack route="/es/centro-de-ayuda" isDark={isDark} className="!mx-0" />
              <ButtonAuth
                label="Buscar Solicitud"
                type="submit"
                isDark={isDark}
                loading={loading}
                disabled={!isValid || loading}
                className="w-[408px]"
                variant="primary"
              />
            </div>
           
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
