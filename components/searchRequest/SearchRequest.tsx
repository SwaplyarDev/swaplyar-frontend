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
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import BottomBorderInput from '../ui/Input/BottomBorderInput';

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
    <>
      <div className='my-[60px] lg2:my-[120px]'>
        <AnimatedBlurredCircles tope="top-[124px]" />
        <div className="mx-auto flex w-full max-w-screen-lg flex-col px-4 md:gap-4 md:px-8 lg2:px-0">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="mx-auto mt-10 md:mt-[90px] flex min-h-full w-full max-w-[506px] flex-wrap justify-center md:hidden">
              <Image
                className="h-[150px] w-[150px] drop-shadow-light dark:drop-shadow-darkmode"
                src={searchRequestMovile}
                alt="SwaplyAr Search Request Mobile™"
                width={300}
                height={300}
              />
              <div
                className={`min-w-full flex-wrap justify-center border-t-2 lg2:hidden ${isDark ? 'border-t-white' : 'border-t-buttonsLigth'}`}
              ></div>
            </div>
            <h1 className="mx-auto max-w-[506px] text-center font-titleFont text-3.5xl leading-[120%] md:text-[40px] font-medium md:max-w-[704px]">
              Consulta el estado de tu solicitud fácilmente
            </h1>

            <p className="mx-auto max-w-[679px] text-center font-textFont font-light lg2:max-w-[792px]">
              Ingresa el Número de Solicitud y el Apellido tal como figura en el correo electrónico enviado para verificar
              el estado actual de tu solicitud de manera rápida y precisa.
            </p>

            <p className="mt-2 md:mb-2 w-full font-textFont text-center font-light md:text-xl lg2:mx-auto lg2:max-w-[637px]">
              Introduce los datos exactamente como aparecen en el correo electrónico enviado.
            </p>
          </div>

          <section className="relative flex w-full flex-col items-center lg2:flex-row lg2:justify-end lg2:items-start lg2:h-[520px]">
            <div className={`relative mt-2 hidden w-[302px] md:w-[508px] lg2:w-[714px] items-center justify-center md:block lg2:absolute lg2:top-0 lg2:left-0`}>
              <Image
                className="w-[680px] drop-shadow-light dark:drop-shadow-darkmode"
                src={searchRequestWeb}
                alt="SwaplyAr Search Request™"
                width={680}
                height={700}
              />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex h-[180px] flex-col items-center gap-5 lg2:max-w-[490px]"
            >
              <BottomBorderInput
                label="Número de Solicitud"
                type="text"
                name="transactionId"
                register={register}
                validation={{
                  required: 'El Número de Solicitud es Obligatorio',
                }}
                error={errors.transactionId?.message}
              />
              
              <BottomBorderInput
                label="Apellido"
                type="text"
                name="lastNameRequest"
                register={register}
                validation={{
                  required: 'El Apellido es Obligatorio',
                }}
                error={errors.lastNameRequest?.message}
              />

              <div className="w-full flex flex-row items-center justify-between gap-4 md:mt-4 md:justify-center">
                <ButtonBack route="/es/centro-de-ayuda" isDark={isDark} className="!mx-0" />
                <ButtonAuth
                  label="Buscar Solicitud"
                  type="submit"
                  isDark={isDark}
                  loading={loading}
                  disabled={!isValid || loading}
                  className='w-[272px] md:w-[394px]'
                  variant="primary"
                />
              </div>

            </form>
          </section>
        </div>
      </div>
      <FlyerTrabajo
        imageSrc={FlyerGif}
        href="/es/registro"
        description="Crea tu cuenta para hacer seguimiento de tus solicitudes en tiempo real"
        nameButton="Crear mi cuenta"
      />
    </>
  );
};

export default SearchRequest;
