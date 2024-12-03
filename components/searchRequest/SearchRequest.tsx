'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import InputOnlyLine from '../ui/InputOnlyLine/InputOnlyLine';
import { RequestSearch } from '@/types/data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import useStatusManager from '@/hooks/useStatusManager';
import Swal from 'sweetalert2';
import { createRoot } from 'react-dom/client';
import Arrow from '../ui/Arrow/Arrow';
import Tick from '../ui/Tick/Tick';
import ReactDOMServer from 'react-dom/server';

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

  const handleSearchRequest = () => {
    Swal.fire({
      html: `
          <p style="font-size: 16px;">Si cancela esta solicitud, debe generar una nueva solicitud</p>
          <div style="display: flex; flex-direction: column; margin-top: 20px;">
            ${completedSteps
              .map((completed, index) => {
                const tickHTML =
                  index < currentIndex
                    ? ReactDOMServer.renderToString(
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText">
                          <Tick color={`${isDark ? '#414244' : '#FCFBFA'}`} size="15px" />
                        </div>,
                      )
                    : '<div class="h-5 w-5 rounded-full border-[3px] border-lightText bg-lightText dark:border-darkText dark:bg-darkText"></div>';

                return `
                  <div style="display: flex; align-items: center; gap: 10px;">
                    ${tickHTML}
                    <span>${completed}</span>
                  </div>
                  ${
                    index < completedSteps.length - 1
                      ? `<div style="height: 12px; width: 3px; margin-left: 8px; position: relative;">
                      <div style="height: 14px; width: 3px; background-color: ${isDark ? '#FCFBFA' : '#414244'}; position: absolute; top: -1px"></div>
                      </div>`
                      : ''
                  }
                `;
              })
              .join('')}
          </div>
          <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 40px; padding: 0 13px">
            <div id="back-button-container"></div>
          </div>
        `,
      showConfirmButton: false,
      showCancelButton: false,
      background: isDark ? 'rgb(69 69 69)' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      didRender: () => {
        const backElement = document.getElementById('back-button-container');
        if (backElement) {
          const root = createRoot(backElement);
          root.render(
            <button
              onClick={() => Swal.close()}
              className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 flex h-[42px] min-w-[110px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-sm text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
            >
              <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} backRequest={true} />
              Volver
            </button>,
          );
        }
      },
      didOpen: () => {
        const cancelButton = document.getElementById('cancel-button');
        if (cancelButton) {
          cancelButton.addEventListener('click', () => {
            Swal.close();
          });
        }
      },
    });
  };

  const onSubmit: SubmitHandler<RequestSearch> = async (data) => {
    setLoading(true);
    handleAddNextStatus();
    try {
      const response = await fetch(`/v1/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

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
    handleSearchRequest();
  };
  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-16 py-8 md:gap-4">
      <div className="px-8 lg:px-0">
        <h1 className="text-4xl text-lightText dark:text-darkText">Buscar Solicitud</h1>
        <p className="hidden w-96 text-xl font-[500] text-lightText dark:text-darkText md:block">
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
