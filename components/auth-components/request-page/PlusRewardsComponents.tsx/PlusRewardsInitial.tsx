'use client';
import Image from 'next/image';
import { ImagePlusRewards } from '../ImagePlusRewards';
import { useTransactions } from '@/components/historial/use-transactions';
import AmountTransactions from '../AmountTransactions';
import HasGanadoDiezDolares from './HasGanadoDiezDolares';

// Hooks
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Actions
import { getDiscounts } from '@/actions/discounts/discounts.action';

// Types
import { IDiscountsObject } from '@/types/discounts/discounts';

// Components
import VerifyAccount from './VerifyAccount';
import PopUpSessionExpire from './PopUpSessionExpire';
import WelcomeReward from './WelcomeReward';
import UserVerifiedWithoutTransactions from './UserVerifiedWithoutTransactions';

export default function PlusRewardInitial() {
  const { data: session, status } = useSession();
  const transactions = useTransactions();
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

  console.log(session, discounts, transactions);

  // ? El useTransactions obtiene todas las transacciones en vez de solo las del usuario (el "problema" está en el fetch), por lo cual ¿hago un fetch por mi cuenta?. Igualmente de momento hay un error en el fetch y devuelve un mockup
  // ? En principio creo que el useTransactions ya no lo tengo que usar porque está la api que me devuelve las estrellas y el monto total de las transacciones. Estas estrellas representan las transacciones

  // TODO: Crear una función que solicite las estrellas y monto total de las transacciones

  // ? Nota: en la 3ra imagen (usuario verificado con 3 y 5 usd), si el usuario ya hizo uso del descuento de 3usd significa que realizó una transaccion, por lo que se debería mostrar la 4ta imagen. Pero al mostrar la 4ta imagen, el usuario ya no sabe que tiene el descuento de 5usd adicionales
  // * Solución: la 3ra imagen solo se muestra cuando el usuario no uso los 3 y 5 usd, y a la 4ta imagen habría que agregarle el descuento de 5usd en caso que no lo haya usado

  // const starsAndQuantity = await get

  const isUserVerified: null | true = session?.user.userVerification;
  const userHave3Discount: undefined | boolean = discounts?.data.some(
    (discount) => discount.discount === '3' && discount.is_used === 'FALSE',
  );

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
          // Revisar si el usuario NO está verificado y si tiene descuentos
          !isUserVerified ? (
            userHave3Discount ? (
              // CASE: Usuario no verificado con descuento de 3USD
              <div className="flex w-[388px] flex-col items-center gap-[19px]">
                <WelcomeReward />
                <VerifyAccount />
              </div>
            ) : (
              // CASE: Usuario no verificado y sin descuentos
              <VerifyAccount />
            )
          ) : // Revisar si el usuario NO tiene transacciones
          // TODO: lógica para revisar que el usuario tenga transacciones (si no tiene, mostrar lo de abajo. Si tiene, mostrar directamente la 4ta imagen y ver que se hace con los 5usd que quedan colgados)
          true ? (
            // CASE: Usuario verificado con descuento de 3USD y 5USD
            <div className="flex w-[388px] flex-col items-center gap-9">
              <UserVerifiedWithoutTransactions />
              <AmountTransactions amountTotal={0} totalTransactions={0} />
            </div>
          ) : (
            // CASE: Usuario verificado con su primera transacción hecha
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
