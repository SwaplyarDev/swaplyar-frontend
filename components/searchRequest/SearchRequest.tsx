'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import InputOnlyLine from '../ui/InputOnlyLine/InputOnlyLine';
import { RequestSearch } from '@/types/data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import useStatusManager from '@/hooks/useStatusManager';
import Swal from 'sweetalert2';
import { searchRequest } from '@/actions/request/action.search-request/action.searchRecuest';

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

  const handleSearchRequest = (statuses: Array<keyof typeof statusMessages>) => {
    const statusMessages = {
      pending: 'Solicitud Enviada',
      received: 'Pago en Revisión',
      ended: 'Solicitud Finalizada con Éxito',
      cancelation: 'Solicitud Cancelada',
      modified: 'Reembolso Solicitado',
      refund: 'Dinero Reembolsado con Éxito',
      discrepancy: 'Discrepancia en la Solicitud',
    };

    // Crea una lista de mensajes con los estados recibidos
    const messages = statuses.map((status) => statusMessages[status]);

    Swal.fire({
      html: `<ul>
        ${messages.map((msg) => `<li>${msg}</li>`).join('')}
      </ul>`, // Mantén el código de Swal como está
      showConfirmButton: false,
      showCancelButton: false,
      background: isDark ? 'rgb(69 69 69)' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      didRender: () => {
        /* Código de renderizado del botón "Volver" */
      },
      didOpen: () => {
        /* Código de apertura de cancel button */
      },
    });
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
    <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-16 py-8 md:gap-4">
      <div className="px-8 lg:px-0">
        <h1 className="text-4xl text-lightText dark:text-darkText">Buscar Solicitud</h1>
        <p className="hidden text-xl font-[500] text-lightText dark:text-darkText md:block">
          Ingresa los datos tal cual aparece en el email enviado
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
          <div className="h-1 w-full bg-buttonsLigth dark:bg-darkText"></div>
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
            <label htmlFor="numberOfRequest" className="text-lg">
              NUMERO DE SOLICITUD
            </label>
            <InputOnlyLine
              placeholder="como figura en el recibo"
              id="numberOfRequest"
              register={register('numberOfRequest')}
              error={errors.numberOfRequest?.message}
              classStyle="text-start md:text-end text-lg pl-0"
            />
          </div>
          <div className="flex w-full flex-col items-start md:items-end">
            <label htmlFor="lastNameRequest" className="text-lg">
              APELLIDO
            </label>
            <InputOnlyLine
              placeholder="como figura en el recibo"
              id="lastNameRequest"
              register={register('lastNameRequest')}
              error={errors.lastNameRequest?.message}
              classStyle="text-start md:text-end text-lg pl-0"
            />
          </div>
          <div className="mt-8 h-1 w-full max-w-md bg-buttonsLigth dark:bg-darkText md:hidden"></div>
          <div className="flex flex-col gap-4">
            <button
              className={`relative m-1 h-10 w-52 items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
            <button
              type="button"
              className="text-lg font-bold underline transition-all duration-300 ease-in-out hover:no-underline"
            >
              Salir
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SearchRequest;
