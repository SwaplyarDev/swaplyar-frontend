// Images
import { ImagePlusRewards } from '../ImagePlusRewards';

// Types
import { IDiscountsObject } from '@/types/discounts/discounts';

// Components
import VerifyAccount from './VerifyAccount';
import WelcomeReward from './WelcomeReward';
import UserVerifiedWithoutTransactions from './UserVerifiedWithoutTransactions';
import UserWinPlusReward from './UserWinPlusReward';
import AmountTransactions from '../AmountTransactions';
import UncompleteRewardText from './UncompleteRewardText';
import ErrorComponent from '../ErrorComponent';

// Actions
import { getUserStarsAndAmount } from '@/actions/Discounts/userStarsAndAmount.action';

interface IProps {
  discounts: IDiscountsObject | null;
  errors: string[];
  userVerification: null | true;
  userId: string;
  accessToken: string | undefined;
}

interface IStarsAndAmount {
  data: {
    quantity: string;
    stars: string;
  };
}

export default async function PlusRewardInitial({ discounts, errors, userVerification, userId, accessToken }: IProps) {
  const errorsCopy = errors;
  let stars: number = 0;
  let amountTransactions: number = 0;

  if (errorsCopy[0]) {
    return <ErrorComponent errors={errors} />;
  }

  try {
    // El accessToken va a existir porque sino errors[0] tendría algo
    const starsAndAmountData: IStarsAndAmount = await getUserStarsAndAmount(accessToken!);

    stars = Number(starsAndAmountData.data.stars);
    amountTransactions = Number(starsAndAmountData.data.quantity);
  } catch (error) {
    console.log(error);
    const errorMessage = 'Error al cargar las estrellas y montos de transacciones.';
    errorsCopy.push(errorMessage);
  }

  if (errorsCopy[0]) {
    return <ErrorComponent errors={errors} />;
  }

  const isUserVerified: null | true = userVerification;

  // Los descuentos vienen con un campo is_used, pero la api solo devuelve aquellos descuentos que no han sido usados
  const userHave3Discount: undefined | boolean = discounts?.data.some((discount) => discount.discount === '3');
  const userHave5Discount: undefined | boolean = discounts?.data.some((discount) => discount.discount === '5');

  const haveEnoughStars: boolean = stars >= 5;
  const haveEnoughAmount: boolean = amountTransactions >= 500;

  return (
    <section className="relative m-auto flex w-full max-w-7xl items-center">
      <section className="flex w-full flex-col justify-center rounded-lg font-light text-lightText dark:text-custom-whiteD xs-phone:p-8 md-phone:p-10 md:flex-row-reverse lg:flex-col">
        <article className="flex flex-col justify-center xs:mx-auto xs:w-[388px] xs-phone:mb-8 lg:justify-between">
          <div className="xs-mini-phone:w-64 xs-phone:w-48 md-phone:w-52 md:w-full lg:ml-0 lg:w-64">
            <ImagePlusRewards />
          </div>

          <article className="mb-5 text-end xs-phone:mb-6">
            <p className="align-text-top text-sm xs-mini-phone:text-base">Tu Código de Miembro:</p>
            <p className="title text-3xl font-bold xs-mini-phone:text-[32px] xs-phone:text-[36px] md-phone:text-[40px]">
              {userId.toUpperCase()}
            </p>
          </article>
        </article>

        {!isUserVerified ? (
          userHave3Discount ? (
            <div className="flex w-full flex-col items-center gap-[19px]">
              <WelcomeReward />
              <VerifyAccount />
            </div>
          ) : (
            <VerifyAccount />
          )
        ) : userHave5Discount ? (
          <div className="flex w-full flex-col items-center gap-9">
            <UserVerifiedWithoutTransactions userHave3Discount={userHave3Discount} />
            <AmountTransactions amountTotal={0} totalTransactions={0} />
          </div>
        ) : haveEnoughStars && haveEnoughAmount ? (
          <UserWinPlusReward />
        ) : (
          <div className="flex w-full flex-col items-center gap-9">
            <UncompleteRewardText stars={stars} quantity={amountTransactions} />
            <AmountTransactions amountTotal={amountTransactions} totalTransactions={stars} />
          </div>
        )}
      </section>
    </section>
  );
}
