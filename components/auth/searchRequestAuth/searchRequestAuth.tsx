'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import InputOnlyLine from '@/components/ui/InputOnlyLine/InputOnlyLine';
import { RequestSearch } from '@/types/data';
import { SubmitHandler, useForm } from 'react-hook-form';

interface TransactionHistoryItem {
  status: string;
  timestamp: string;
}

interface SearchResponse {
  ok: boolean;
  status?: string;
  history?: TransactionHistoryItem[];
  message?: string;
  error?: any;
}
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import useStatusManager from '@/hooks/useStatusManager';
import { searchRequest } from '@/actions/request/action.search-request/action.searchRecuest';
import { showStatusAlert } from '@/components/searchRequest/swalConfig';
import ReactDOMServer from 'react-dom/server';
import {
  Modificada,
  Cancelada,
  Discrepancia,
  Reembolso,
  Enviada,
  Revision,
  DineroEnCamino,
  Finalizada,
} from '@/components/searchRequest/icons';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack';
import { useSession } from 'next-auth/react';
import { searchRequestMovile, searchRequestWeb } from '@/utils/assets/imgDatabaseCloudinary';
//importamos alert para mostrar los errores.
import Swal from 'sweetalert2';
import BottomBorderInput from '@/components/ui/Input/BottomBorderInput';

const SearchRequestAuth = () => {
  const { data: session } = useSession();
  const fullName = session?.user?.fullName || '';
  const [firstName, lastName] = fullName.split(' ');
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
      pending: { text: 'Pago en Revisión', icon: ReactDOMServer.renderToString(<Revision />) },
      in_transit: { text: 'Solicitud Enviada', icon: ReactDOMServer.renderToString(<Enviada />) },
      review_payment: { text: 'Dinero en Camino', icon: ReactDOMServer.renderToString(<DineroEnCamino />) },
      completed: { text: 'Solicitud Finalizada con Éxito', icon: ReactDOMServer.renderToString(<Finalizada />) },
      discrepancy: { text: 'Discrepancia en la Solicitud', icon: ReactDOMServer.renderToString(<Discrepancia />) },
      canceled: { text: 'Solicitud Cancelada', icon: ReactDOMServer.renderToString(<Cancelada />) },
      modified: { text: 'Solicitud Modificada', icon: ReactDOMServer.renderToString(<Modificada />) },
      refunded: { text: 'Dinero Reembolsado con Éxito', icon: ReactDOMServer.renderToString(<Reembolso />) },
      rejected:{ text: 'Solicitud Rechazada', icon: ReactDOMServer.renderToString(<Cancelada />) },
      approved: { text: 'Solicitud Aprobada', icon: ReactDOMServer.renderToString(<Enviada />) },
      refundInTransit: { text: 'Reembolso en Proceso', icon: ReactDOMServer.renderToString(<DineroEnCamino />) }

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
      const response = await searchRequest(data.transactionId, lastName) as SearchResponse;

      if (!response.ok) {
        Swal.fire({
                  title: 'Error',
                  text: response.message || 'Hubo un problema al obtener el estado de la transacción. Intente nuevamente.',
                  icon: 'error',
                  confirmButtonText: 'OK',
                  background: isDark ? '#1e1e1e' : '#fff',
                  color: isDark ? '#ebe7e0' : '#012A8E',
                  confirmButtonColor: isDark ? '#ebe7e0' : '#012A8E',
                });
        throw new Error(response.message || 'Hubo un problema al obtener el estado de la transacción');
      }

      // Crear un objeto de estado basado en la respuesta
      const statusObj = response.history?.reduce((acc, item) => {
        acc[item.status] = item.timestamp;
        return acc;
      }, {} as Record<string, string>) || { [response.status || 'pending']: new Date().toISOString() };

      handleSearchRequest(statusObj);

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
    <section className="mx-auto flex w-full max-w-screen-lg flex-col px-4 py-8 md:gap-4 md:px-8 lg2:px-4">
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
          <BottomBorderInput
            label="Número de Solicitud"
            name="transactionId"
            register={register}
            validation={{ required: 'El Número de Solicitud es Obligatorio' }}
            error={errors.transactionId?.message}
          />
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
          <ButtonBack route="/es/auth/centro-de-ayuda" isDark={isDark} />
        </form>
      </section>
    </section>
  );
};

export default SearchRequestAuth;
