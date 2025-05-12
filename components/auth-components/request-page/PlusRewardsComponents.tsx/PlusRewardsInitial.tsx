import Image from 'next/image';
import { VerifyButton } from '../VerifyButton';
import { ImagePlusRewards } from '../ImagePlusRewards';
import { useTransactions } from '@/components/historial/use-transactions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AmountTransactions from '../AmountTransactions';
import HasGanadoDiezDolares from './HasGanadoDiezDolares';
import BienvenidaVerificacion from './BienvenidaVerificacion';
import { getDiscounts } from '@/actions/Discounts/discounts.action';
function PlusRewardInitial() {
  const { transactions } = useTransactions();
  const { data: session } = useSession();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [discounts, setDiscounts] = useState<Promise<any> | null>(null);
  console.log(session);
  console.log(transactions);
  const hidden = transactions.length === 0 ? 'flex' : 'hidden';

  useEffect(() => {
    const arrayAmounts = transactions.map((transaction) => Number(transaction.amounts.sent.amount));
    const accumulatedAmount = arrayAmounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setTotalAmount(accumulatedAmount);
    setTotalTransactions(transactions.length);
    try {
      const descuentos = getDiscounts();
      setDiscounts(descuentos);
    } catch (error) {
      console.error('Error fetching discounts:', error);
    }
  }, [transactions]);
  console.log('descuentos', discounts);
  return (
    <section className="relative m-auto flex w-full max-w-7xl items-center">
      <section className="mx-auto flex w-full max-w-md flex-col justify-center rounded-lg p-6 font-light text-lightText dark:text-custom-whiteD xs-mini-phone:p-7 xs-phone:p-8 md-phone:p-10 md:flex-row-reverse lg:flex-col">
        <article className="flex flex-col justify-center xs-phone:mb-8 lg:justify-between">
          <div className="ml-24 xs-mini-phone:w-64 xs-phone:w-48 md-phone:w-52 lg:ml-0 lg:w-64">
            <ImagePlusRewards />
          </div>
          <article className="mb-5 text-end xs-phone:mb-6">
            <p className="align-text-top text-sm xs-mini-phone:text-base">Tu Código de Miembro:</p>
            <h2 className="title text-3xl font-bold xs-mini-phone:text-[32px] xs-phone:text-[36px] md-phone:text-[40px]">
              2448XPAR
            </h2>
          </article>
        </article>
        {totalTransactions === 5 && totalAmount >= 500 ? (
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
        )}
      </section>
    </section>
  );
}

export default PlusRewardInitial;
