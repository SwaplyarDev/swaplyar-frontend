'use client';
import Image from 'next/image';
import { ImagePlusRewards } from '../ImagePlusRewards';
import { useTransactions } from '@/components/historial/use-transactions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AmountTransactions from '../AmountTransactions';
import HasGanadoDiezDolares from './HasGanadoDiezDolares';
import WelcomeReward from './WelcomeReward';
import PopUpSessionExpire from './PopUpSessionExpire';

import { getDiscounts } from '@/actions/discounts/discounts.action';
import VerifyAccount from './VerifyAccount';

interface IDiscountsData {
  user_discounts_id: string;
  code_id: string;
  user_id: string;
  transactions_id: string;
  is_used: 'FALSE' | 'TRUE';
  created_at: string;
  used_at: string;
  code: string;
  discount: string;
}

interface IDiscountsObject {
  data: IDiscountsData[];
}

export default function PlusRewardInitial() {
  const { data: session, status } = useSession();
  const [discounts, setDiscounts] = useState<IDiscountsObject | null>(null);

  useEffect(() => {
    async function functionGetDiscounts() {
      if (!session?.accessToken) return;

      try {
        const discountsData = await getDiscounts(session.accessToken);
        setDiscounts(discountsData);
      } catch (error) {
        console.error(error);
      }
    }

    functionGetDiscounts();
  }, [session]);

  // Pantalla de carga mientras se obtiene la session
  if (status === 'loading') {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  // Session expirada
  // TODO: mostrar el popup, a los 5seg se hace un logout, cuando sale del popup tambien, o si acepta con un boton
  // ! No se probó la funcionalidad del popup
  if (!session || !session.accessToken) {
    return <PopUpSessionExpire />;
  }

  console.log(session, discounts);

  // ! Continuacion del proyecto: Tengo que ver la forma de verificar mi cuenta para saber si funciona el renderizar componentes despues de estar verificado y chequear que se renderice bien el componente de solo verificar cuenta cuando el usuario no tiene descuentos

  // const starsAndQuantity = await get

  // const [totalAmount, setTotalAmount] = useState(0);
  // const [totalTransactions, setTotalTransactions] = useState(0);

  // const hidden = transactions.length === 0 ? 'flex' : 'hidden';

  // useEffect(() => {

  //   const arrayAmounts = transactions.map((transaction) => Number(transaction.amounts.sent.amount));
  //   const accumulatedAmount = arrayAmounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  //   setTotalAmount(accumulatedAmount);
  //   setTotalTransactions(transactions.length);

  // try {
  //   const descuentos = getDiscounts();
  //   setDiscounts(descuentos);
  // } catch (error) {
  //   console.error('Error fetching discounts:', error);
  // }

  //   fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/discount/user-discounts/user`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `user_id ${session?.accessToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then( response => response.json())
  //     .then( data => setDiscounts(data))
  //     .catch( error => console.log("Error fetching discounts:", error))

  // }, [transactions]);

  // console.log('descuentos', discounts);

  return (
    <section className="relative m-auto flex w-full max-w-7xl items-center">
      <section className="mx-auto flex w-full max-w-md flex-col justify-center rounded-lg p-6 font-light text-lightText dark:text-custom-whiteD xs-mini-phone:p-7 xs-phone:p-8 md-phone:p-10 md:flex-row-reverse lg:flex-col">
        <article className="flex flex-col justify-center xs-phone:mb-8 lg:justify-between">
          <div className="ml-24 xs-mini-phone:w-64 xs-phone:w-48 md-phone:w-52 lg:ml-0 lg:w-64">
            <ImagePlusRewards />
          </div>

          <article className="mb-5 text-end xs-phone:mb-6">
            <p className="align-text-top text-sm xs-mini-phone:text-base">Tu Código de Miembro:</p>

            {session?.user.id ? (
              <h2 className="title text-3xl font-bold xs-mini-phone:text-[32px] xs-phone:text-[36px] md-phone:text-[40px]">
                {session.user.id.toUpperCase()}
              </h2>
            ) : (
              <div className="ml-auto mt-2 flex h-4 w-[70%] animate-pulse overflow-hidden rounded-full bg-gray-300 p-3 md:h-8"></div>
            )}
          </article>
        </article>

        {
          // CASE: Usuario no verificado con descuento de 3USD
          session?.user.userVerification === null ? (
            discounts?.data.some((discount) => discount.discount === '3' && discount.is_used === 'FALSE') ? (
              <div className="flex w-[388px] flex-col items-center gap-[19px]">
                <WelcomeReward />
                <VerifyAccount />
              </div>
            ) : (
              // CASE: Usuario no verificado sin descuentos
              <VerifyAccount />
            )
          ) : // CASE: Usuario verificado con descuento de 3USD y 5USD
          discounts?.data.some((discount) => discount.discount === '3' && discount.is_used === 'FALSE') &&
            discounts?.data.some((discount) => discount.discount === '5' && discount.is_used === 'FALSE') ? (
            <>Usuario Verificado con 3 y 5 usd</>
          ) : (
            // CASE: Usuario verificado con descuento de 5USD
            <>Usuario Verificado solo</>
          )
        }

        {/* {totalTransactions === 5 && totalAmount >= 500 ? (
          <HasGanadoDiezDolares />
        ) : (
          <div>
            {transactions.length === 0 && !session?.user.userVerification ? (
              <BienvenidaVerificacion
                cantTransactions={totalTransactions}
                userVerification={session?.user.userVerification}
              />
            ) : (
              <p>
                Haz completado <b className="font-semibold">{totalTransactions}/5</b> solicitudes exitosas y acumulado
                <b className="font-semibold">{totalAmount}/500 USD</b>
              </p>
            )}

            {session?.user.userVerification ? (
              <AmountTransactions amountTotal={totalAmount} totalTransactions={totalTransactions} />
            ) : (
              <article className="relative mb-6 rounded-lg p-2">
                <div className="text-center">
                  <p className="font-bold xs-phone:text-lg">Aún no has verificado tu cuenta.</p>
                  <p className="whitespace-nowrap text-sm xs-mini-phone:text-base">
                    Veríficala ahora y obtén{' '}
                    <span className="whitespace-nowrap font-bold text-custom-blue-800 dark:text-custom-whiteD">
                      $5 USD{' '}
                    </span>
                    adicionales
                    <br></br>
                    <span> en tu solicitud.</span>
                  </p>
                </div>
                <div className="flex justify-center">
                  <VerifyButton />
                </div>
              </article>
            )}
          </div>
        )} */}
      </section>
    </section>
  );
}
