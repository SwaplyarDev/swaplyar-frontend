'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Cloud from '../ui/Cloud/Cloud';
import { nube1, nube2 } from '@/utils/assets/img-database';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { FormRequestCompleted } from '@/types/repentance/repentance';
import { useParams, useSearchParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const SolicitudFinalizada = ({ children }: { children?: React.ReactNode }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { isDark } = useDarkTheme();
  const params = useParams();
  const searchParams = useSearchParams();

  const transactionId = Array.isArray(params.id) ? params.id[0] : params.id;

  const rawParams = decodeURIComponent(searchParams.toString());

  // Convertir los parámetros a un objeto
  const queryParams = new URLSearchParams(rawParams.replace(/\?/g, '&'));

  // Extraer los valores correctamente
  const amountSent = queryParams.get('amount_sent');
  const currencySent = queryParams.get('currency_sent');
  const amountReceived = queryParams.get('amount_received');
  const currencyReceived = queryParams.get('currency_received');
  const paymentMethod = queryParams.get('payment_method');
  const receivedMethod = queryParams.get('received_method');

  const { register, handleSubmit, setValue, watch, reset } = useForm<FormRequestCompleted>({
    mode: 'onChange',
    defaultValues: {
      transaction_id: transactionId,
      stars_amount: 0,
    },
  });

  const selectedRating = watch('stars_amount');

  const onSubmit = async (data: FormRequestCompleted) => {
    try {
      const response = await fetch(`${API_URL}/v1/qualification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, stars_amount: data.stars_amount.toString() }),
      });

      console.log(response);
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    reset();
  };

  const StarIcon: React.FC<{ index: number }> = ({ index }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      className={`h-[50px] w-[50px] cursor-pointer ${index <= selectedRating ? 'fill-[rgba(255,217,0,1)]' : 'fill-[rgba(188,188,188,1)]'} md:h-[100px] md:w-[100px]`}
      onMouseOver={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(null)}
      onClick={() => setValue('stars_amount', index)}
    >
      <path d="M50 0L61.2257 34.5491H97.5528L68.1636 55.9017L79.3893 90.4509L50 69.0983L20.6107 90.4509L31.8364 55.9017L2.44717 34.5491H38.7743L50 0Z" />
    </svg>
  );

  return (
    <div className="mx-auto flex w-full max-w-screen-phone flex-col gap-4 px-4 py-10 xs-mini-phone2:max-w-screen-tablet md:max-w-screen-desktop md:gap-6 md:px-8 lg2:px-4">
      <div className="-z-30">
        <Cloud classes="md:-left-52 -left-[500px] top-60 w-[629px] h-[451px] min-w-[629px]" src={nube2} alt="Nube 2" />
        <Cloud
          classes="md:-left-72 -left-[500px] top-[500px] w-[612px] h-[438px] min-w-[612px]"
          src={nube2}
          alt="Nube 2"
        />
        <Cloud classes="md:-left-60 -left-[500px] top-0 w-[669px] h-[399px] min-w-[669px]" src={nube1} alt="Nube 1" />
      </div>

      <div className="-z-30">
        <Cloud
          classes="md:-right-20 -right-[300px] top-72 w-[371px] h-[266px] min-w-[371px]"
          src={nube2}
          alt="Nube 2"
        />
        <Cloud classes="md:-right-56 -right-[450px] top-0 w-[559px] h-[400px] min-w-[559px]" src={nube2} alt="Nube 2" />
        <Cloud
          classes="md:-right-60 -right-[350px] top-[460px] w-[471px] h-[281px] min-w-[471px]"
          src={nube1}
          alt="Nube 1"
        />
      </div>
      <h1 className="text-center font-titleFont text-[38px] font-medium lg2:text-[40px]">
        Solicitud finalizada con éxito. <br /> Gracias por Elegir SwaplyAr
      </h1>
      <p className="text-center font-titleFont text-[40px] font-medium">{transactionId}</p>
      <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-[9px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="101" height="100" viewBox="0 0 101 100" fill="none">
          <path
            d="M44.6693 69.1668L74.0443 39.7918L68.2109 33.9585L44.6693 57.5002L32.7943 45.6252L26.9609 51.4585L44.6693 69.1668Z"
            fill="#0A9411"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50.5026 91.6668C44.7387 91.6668 39.3221 90.5724 34.2526 88.3835C29.1832 86.1946 24.7734 83.2266 21.0234 79.4793C17.2734 75.7321 14.3054 71.3224 12.1193 66.2502C9.93317 61.1779 8.83872 55.7613 8.83594 50.0002C8.83316 44.2391 9.92761 38.8224 12.1193 33.7502C14.3109 28.6779 17.279 24.2682 21.0234 20.521C24.7679 16.7738 29.1776 13.8057 34.2526 11.6168C39.3276 9.42794 44.7443 8.3335 50.5026 8.3335C56.2609 8.3335 61.6776 9.42794 66.7526 11.6168C71.8276 13.8057 76.2373 16.7738 79.9818 20.521C83.7262 24.2682 86.6957 28.6779 88.8901 33.7502C91.0845 38.8224 92.1776 44.2391 92.1693 50.0002C92.1609 55.7613 91.0665 61.1779 88.8859 66.2502C86.7054 71.3224 83.7373 75.7321 79.9818 79.4793C76.2262 83.2266 71.8165 86.196 66.7526 88.3877C61.6887 90.5793 56.2721 91.6724 50.5026 91.6668ZM74.1484 73.646C67.6901 80.1043 59.8082 83.3335 50.5026 83.3335C41.1971 83.3335 33.3151 80.1043 26.8568 73.646C20.3984 67.1877 17.1693 59.3057 17.1693 50.0002C17.1693 40.6946 20.3984 32.8127 26.8568 26.3543C33.3151 19.896 41.1971 16.6668 50.5026 16.6668C59.8082 16.6668 67.6901 19.896 74.1484 26.3543C80.6068 32.8127 83.8359 40.6946 83.8359 50.0002C83.8359 59.3057 80.6068 67.1877 74.1484 73.646Z"
            fill="#0A9411"
          />
        </svg>
        <p className="text-center font-titleFont text-[61px] font-semibold">{amountSent}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[24px] font-normal">Con tu cuenta</p>

        {paymentMethod == 'bank' ? (
          isDark ? (
            <Image src="/images/21.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/22.png" alt="ARS" width={200} height={70} />
          )
        ) : paymentMethod == 'payoneer_eur' ? (
          isDark ? (
            <Image src="/images/25.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/26.png" alt="ARS" width={200} height={70} />
          )
        ) : paymentMethod == 'payoneer_usd' ? (
          isDark ? (
            <Image src="/images/23.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/24.png" alt="ARS" width={200} height={70} />
          )
        ) : paymentMethod == 'pix' ? (
          isDark ? (
            <Image src="/images/35.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/36.png" alt="ARS" width={200} height={70} />
          )
        ) : paymentMethod == 'paypal' ? (
          isDark ? (
            <Image src="/images/31.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/32.png" alt="ARS" width={200} height={70} />
          )
        ) : paymentMethod == 'wise_usd' ? (
          isDark ? (
            <Image src="/images/27.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/28.png" alt="ARS" width={200} height={70} />
          )
        ) : paymentMethod == 'theter' ? (
          isDark ? (
            <Image src="/images/33.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/34.png" alt="ARS" width={200} height={70} />
          )
        ) : isDark ? (
          <Image src="/images/29.png" alt="ARS" width={200} height={70} />
        ) : (
          <Image src="/images/30.png" alt="ARS" width={200} height={70} />
        )}

        <p className="text-[24px] font-normal">a la cuenta</p>
        {receivedMethod == 'bank=' ? (
          isDark ? (
            <Image src="/images/21.png" alt="bank" width={200} height={70} />
          ) : (
            <Image src="/images/22.png" alt="ARS" width={200} height={70} />
          )
        ) : receivedMethod == 'payoneer_eur=' ? (
          isDark ? (
            <Image src="/images/25.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/26.png" alt="ARS" width={200} height={70} />
          )
        ) : receivedMethod == 'payoneer_usd=' ? (
          isDark ? (
            <Image src="/images/23.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/24.png" alt="ARS" width={200} height={70} />
          )
        ) : receivedMethod == 'pix=' ? (
          isDark ? (
            <Image src="/images/35.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/36.png" alt="ARS" width={200} height={70} />
          )
        ) : receivedMethod == 'paypal=' ? (
          isDark ? (
            <Image src="/images/31.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/32.png" alt="ARS" width={200} height={70} />
          )
        ) : receivedMethod == 'wise_usd=' ? (
          isDark ? (
            <Image src="/images/27.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/28.png" alt="ARS" width={200} height={70} />
          )
        ) : receivedMethod == 'theter=' ? (
          isDark ? (
            <Image src="/images/33.png" alt="ARS" width={200} height={70} />
          ) : (
            <Image src="/images/34.png" alt="ARS" width={200} height={70} />
          )
        ) : isDark ? (
          <Image src="/images/29.png" alt="ARS" width={200} height={70} />
        ) : (
          <Image src="/images/30.png" alt="ARS" width={200} height={70} />
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex w-full max-w-[465px] flex-col gap-4">
        <div className="cursor mb-4 flex w-full justify-center gap-2">
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} index={index + 1} />
          ))}
        </div>
        <input type="hidden" {...register('stars_amount', { required: true })} />

        {/* <div className="max-h-[148px]">
          <label className="font-textFont text-xs font-light">
            Mensaje
            <textarea
              {...register('message')}
              className={clsx(
                'placeholder-text-gray-900 h-[45px] max-h-[128px] min-h-[45px] w-full border-0 border-b-[1px] border-solid ps-0 text-xs placeholder:font-light xs:text-lg',
                isDark
                  ? 'border-b-darkText bg-transparent text-darkText placeholder:text-placeholderDark focus:border-darkText'
                  : 'border-b-buttonsLigth bg-transparent outline-none placeholder:text-buttonExpandDark focus:border-buttonsLigth focus:outline-none',
              )}
              placeholder="Tu comentario es muy valioso para nosotros"
            />
          </label>
        </div> */}
        <button
          type="submit"
          disabled={selectedRating === 0}
          className={clsx(
            'mx-auto mt-2 flex h-[42px] w-[280px] items-center justify-center rounded-3xl py-3 text-center font-titleFont font-semibold',
            selectedRating > 0
              ? isDark
                ? 'buttonSecondDark hover:bg-relative border-darkText bg-darkText text-lightText'
                : 'buttonSecond border border-buttonsLigth bg-buttonsLigth text-darkText hover:bg-buttonsLigth'
              : isDark
                ? 'cursor-not-allowed bg-placeholderDark'
                : 'cursor-not-allowed bg-buttonExpandDark text-darkText',
          )}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default SolicitudFinalizada;
