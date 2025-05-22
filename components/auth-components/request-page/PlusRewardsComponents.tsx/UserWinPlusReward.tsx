import Image from 'next/image';
import { userWinReward } from '@/utils/assets/imgDatabaseCloudinary';

export default function UserWinPlusReward() {
  return (
    <div className="flex w-[388px] flex-col">
      <Image src={userWinReward} alt="Has ganado 10 dolares" height={386} width={386} />

      <p className="text-[21px]/[31.5px] font-bold text-custom-blue-800 dark:text-custom-whiteD">
        Has Ganado $10 USD
        <span className="text-base font-light text-lightText dark:text-custom-whiteD"> de </span>
        Plus Rewards
        <br />
        <span className="text-sm font-light text-lightText dark:text-custom-whiteD">
          tu regalo se activará automáticamente.
        </span>
        <br />
        <b className="text-sm font-bold text-lightText dark:text-custom-whiteD">¡Sigue avanzando!</b>
      </p>
    </div>
  );
}
