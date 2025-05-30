import Image from 'next/image';

// Types
import { IDiscountsObject } from '@/types/discounts/discounts';

// Components
import { IconTrophy } from './IconTrophy';

interface IProps {
  balance: number;
  discountsData?: IDiscountsObject;
}

export default function Coupons({ balance, discountsData }: IProps) {
  return (
    <div className="flex w-full gap-12">
      <div className="w-180px flex flex-1 flex-col gap-2">
        <p className="text-end text-xs text-lightText dark:text-darkText">Saldo sin Cupón</p>
        <p className="text-end text-2xl font-light text-lightText dark:text-darkText">
          {balance}
          <span className="text-custom-blue-800 dark:text-darkText"> ARS</span>
          <span className="ml-auto block h-[2px] w-[180px] bg-buttonsLigth"></span>
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center gap-1">
        <p className="text-center text-xs text-lightText dark:text-darkText">Recompensa de Bienvenida Express</p>
        <div className="flex h-[41px] min-w-[180px] max-w-[190px] items-center justify-center gap-4 rounded-2xl border border-[#FCC21B] bg-[#FFFFF8] px-[10px] py-2">
          <IconTrophy />
          <p className="text-lg font-normal text-lightText">+3 USD</p>
        </div>
      </div>
    </div>
  );
}
