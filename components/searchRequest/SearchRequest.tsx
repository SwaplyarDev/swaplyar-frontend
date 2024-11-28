'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import InputOnlyLine from '../ui/InputOnlyLine/InputOnlyLine';
import { RequestSearch } from '@/types/data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';

const SearchRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestSearch>();
  const [loading, setLoading] = useState(false);
  const { isDark } = useDarkTheme();
  const onSubmit: SubmitHandler<RequestSearch> = async (data) => {
    setLoading(true);
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
  };
  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-4 py-4">
      <div className="px-4">
        <h1 className="text-4xl text-lightText dark:text-darkText">Buscar Solicitud</h1>
        <p className="text-xl text-lightText dark:text-darkText">
          Ingresa los datos tal cual aparece en el email enviado
        </p>
      </div>
      <section className="relative flex min-h-[700px] items-start justify-start px-4 lg:px-0">
        <Image
          className="absolute left-0 top-0 w-[600px] lg-tablet:w-[700px]"
          src="/images/search-request-web.png"
          alt="SwaplyAr Search Request™"
          width={700}
          height={700}
        />
        <div className="h-[324px] min-w-[410px] lg-tablet:min-w-[510px]"></div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-16 flex w-full max-w-[660px] flex-col items-end gap-16">
          <div className="flex w-full flex-col items-end">
            <label htmlFor="numberOfRequest" className="text-lg">
              NUMERO DE SOLICITUD
            </label>
            <InputOnlyLine
              placeholder="como figura en el recibo"
              id="numberOfRequest"
              register={register('numberOfRequest')}
              error={errors.numberOfRequest?.message}
              classStyle="text-end text-lg"
            />
          </div>
          <div className="flex w-full flex-col items-end">
            <label htmlFor="lastNameRequest" className="text-lg">
              APELLIDO
            </label>
            <InputOnlyLine
              placeholder="como figura en el recibo"
              id="lastNameRequest"
              register={register('lastNameRequest')}
              error={errors.lastNameRequest?.message}
              classStyle="text-end text-lg"
            />
          </div>
          <div className="flex flex-col gap-4">
            <button
              className={`relative m-1 h-10 w-52 items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
            <button type="button" className="text-lg font-bold underline">
              Salir
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SearchRequest;
