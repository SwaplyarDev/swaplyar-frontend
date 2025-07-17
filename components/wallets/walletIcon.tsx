'use client';

import {
  PaypalImg,
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
  BankImg,
  BankDarkImg,
  PixImg,
  PixDarkImg,
} from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';

interface WalletIconProps {
  type: string;
}

export default function WalletIcon({ type }: WalletIconProps) {
  function normalizeType(type: string): string {
    switch (type) {
      case 'receiver_crypto':
        return 'tether';
      case 'virtualBank':
        return 'transferencia';
      case 'virtual_bank':
        return 'transferencia';
      case 'payoneer':
        return 'payoneer-usd';
      case 'bank':
        return 'transferencia';
      default:
        return type;
    }
  }
  switch (normalizeType(type)) {
    case 'paypal':
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <Image
            src={PaypalImg || '/placeholder.svg'}
            alt="Paypal"
            width={200}
            height={200}
            className="h-12 w-auto dark:hidden sm:h-20"
          />
          <Image
            src={PaypalDarkImg || '/placeholder.svg'}
            alt="Paypal"
            width={200}
            height={200}
            className="hidden h-12 w-auto dark:block sm:h-20"
          />
        </div>
      );
    case 'transferencia':
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <Image
            src={BankImg || '/placeholder.svg'}
            alt="Transferencia"
            width={200}
            height={200}
            className="h-14 w-auto dark:hidden sm:h-20"
          />
          <Image
            src={BankDarkImg || '/placeholder.svg'}
            alt="Transferencia"
            width={200}
            height={200}
            className="hidden h-14 w-auto dark:block sm:h-20"
          />
        </div>
      );
    case 'tether':
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <Image
            src={TetherImg || '/placeholder.svg'}
            alt="Tether"
            width={200}
            height={200}
            className="h-12 w-auto dark:hidden sm:h-20"
          />
          <Image
            src={TetherDarkImg || '/placeholder.svg'}
            alt="Tether"
            width={200}
            height={200}
            className="hidden h-12 w-auto dark:block sm:h-20"
          />
        </div>
      );
    case 'wise':
    case 'wise-usd':
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <Image
            src={WiseUsdImg || '/placeholder.svg'}
            alt="Wise USD"
            width={200}
            height={200}
            className="h-12 w-auto dark:hidden sm:h-20"
          />
          <Image
            src={WiseUsdDarkImg || '/placeholder.svg'}
            alt="Wise USD"
            width={200}
            height={200}
            className="hidden h-12 w-auto dark:block sm:h-20"
          />
        </div>
      );
    case 'wise-eur':
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <Image
            src={WiseEurImg || '/placeholder.svg'}
            alt="Wise EUR"
            width={200}
            height={200}
            className="h-12 w-auto dark:hidden sm:h-20"
          />
          <Image
            src={WiseEurDarkImg || '/placeholder.svg'}
            alt="Wise EUR"
            width={200}
            height={200}
            className="hidden h-12 w-auto dark:block sm:h-20"
          />
        </div>
      );
    case 'payoneer-usd':
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <Image
            src={PayoneerUsdImg || '/placeholder.svg'}
            alt="Payoneer USD"
            width={200}
            height={200}
            className="h-12 w-auto dark:hidden sm:h-20"
          />
          <Image
            src={PayoneerUsdDarkImg || '/placeholder.svg'}
            alt="Payoneer USD"
            width={200}
            height={200}
            className="hidden h-12 w-auto dark:block sm:h-20"
          />
        </div>
      );
    case 'payoneer-eur':
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <Image
            src={PayoneerEurImg || '/placeholder.svg'}
            alt="Payoneer EUR"
            width={200}
            height={200}
            className="h-12 w-auto dark:hidden sm:h-20"
          />
          <Image
            src={PayoneerEurDarkImg || '/placeholder.svg'}
            alt="Payoneer EUR"
            width={200}
            height={200}
            className="hidden h-12 w-auto dark:block sm:h-20"
          />
        </div>
      );

    case 'pix':
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <Image
            src={PixImg || '/placeholder.svg'}
            alt="Pix"
            width={200}
            height={200}
            className="h-12 w-auto dark:hidden sm:h-20"
          />
          <Image
            src={PixDarkImg || '/placeholder.svg'}
            alt="Pix"
            width={200}
            height={200}
            className="hidden h-12 w-auto dark:block sm:h-20"
          />
        </div>
      );
    default:
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <span className="text-xs font-bold text-white">ARS</span>
        </div>
      );
  }
}
