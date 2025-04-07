'use client';

import {
  PaypalLightImg,
  PaypalDarkImg,
  WiseUsdImg,
  WiseUsdDarkImg,
  WiseEurImg,
  WiseEurDarkImg,
  PayoneerUsdImg,
  PayoneerUsdDarkImg,
  PayoneerEurImg,
  PayoneerEurDarkImg,
  TetherDarkImg,
  TetherImg,
} from '@/utils/assets/img-database';
import { BankImg } from '@/utils/assets/imgDatabaseCloudinary';
import { BankDarkImg } from '@/utils/assets/imgDatabaseCloudinary';

interface WalletIconProps {
  type: string;
}

export default function WalletIcon({ type }: WalletIconProps) {
  switch (type) {
    case 'paypal':
      return (
        <div className="flex h-10 w-full items-center justify-center">
          <img src={PaypalLightImg || '/placeholder.svg'} alt="Paypal" className="h-10 text-white dark:hidden" />
          <img src={PaypalDarkImg || '/placeholder.svg'} alt="Paypal" className="hidden h-10 text-white dark:block" />
        </div>
      );
    case 'transferencia':
      return (
        <div className="flex h-10 w-full items-center justify-center">
          <img src={BankImg || '/placeholder.svg'} alt="Paypal" className="h-10 text-white dark:hidden" />
          <img src={BankDarkImg || '/placeholder.svg'} alt="Paypal" className="hidden h-10 text-white dark:block" />
        </div>
      );
    case 'tether':
      return (
        <div className="flex h-10 w-full items-center justify-center">
          <img src={TetherImg || '/placeholder.svg'} alt="Paypal" className="h-10 text-white dark:hidden" />
          <img src={TetherDarkImg || '/placeholder.svg'} alt="Paypal" className="hidden h-10 text-white dark:block" />
        </div>
      );
    case 'wise':
    case 'wise-usd':
      return (
        <div className="flex h-10 w-full items-center justify-center">
          <img src={WiseUsdImg || '/placeholder.svg'} alt="Wise USD" className="h-10 text-white dark:hidden" />
          <img
            src={WiseUsdDarkImg || '/placeholder.svg'}
            alt="Wise USD"
            className="hidden h-10 text-white dark:block"
          />
        </div>
      );
    case 'wise-eur':
      return (
        <div className="flex h-10 w-full items-center justify-center">
          <img src={WiseEurImg || '/placeholder.svg'} alt="Wise EUR" className="h-10 text-white dark:hidden" />
          <img
            src={WiseEurDarkImg || '/placeholder.svg'}
            alt="Wise EUR"
            className="hidden h-10 text-white dark:block"
          />
        </div>
      );
    case 'payoneer-usd':
      return (
        <div className="flex h-10 w-full items-center justify-center">
          <img src={PayoneerUsdImg || '/placeholder.svg'} alt="Payoneer USD" className="h-10 text-white dark:hidden" />
          <img
            src={PayoneerUsdDarkImg || '/placeholder.svg'}
            alt="Payoneer USD"
            className="hidden h-10 text-white dark:block"
          />
        </div>
      );
    case 'payoneer-eur':
      return (
        <div className="flex h-10 w-full items-center justify-center">
          <img src={PayoneerEurImg || '/placeholder.svg'} alt="Payoneer EUR" className="h-10 text-white dark:hidden" />
          <img
            src={PayoneerEurDarkImg || '/placeholder.svg'}
            alt="Payoneer EUR"
            className="hidden h-10 text-white dark:block"
          />
        </div>
      );
    case 'blockchain':
      return (
        <div className="flex h-10 w-full items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-white">
            <path
              fill="currentColor"
              d="M12 4.5l4.5 4.5-4.5 4.5-4.5-4.5L12 4.5zM7.5 10.5L12 15l4.5-4.5L12 19.5l-4.5-4.5z"
            />
          </svg>
        </div>
      );
    default:
      return (
        <div className="flex h-10 w-full items-center justify-center">
          <span className="text-xs font-bold text-white">ARS</span>
        </div>
      );
  }
}
