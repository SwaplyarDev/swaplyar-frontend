'use client';

import Image from 'next/image';
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
} from '@/utils/assets/imgDatabaseCloudinary';

interface WalletIconProps {
  accountType: string; // userAccValues.accountType
  provider?: string; // userAccValues.type  (paypal | wise | payoneer | ...)
  currency?: string; // userAccValues.currency (USD | EUR | ...)
  accountName?: string; // opcional fallback (userAccValues.accountName)
}

export default function WalletIcon({ accountType, provider, currency, accountName }: WalletIconProps) {
  console.log('🧪 Props:', { accountType, provider, currency, accountName });

  const normalize = (accountType?: string, provider?: string, currency?: string, accountName?: string) => {
    const acct = (accountType || '').toLowerCase().trim();
    // preferimos provider (type), si no existe usamos accountName como fallback
    const prov = (provider || accountName || '').toLowerCase().trim();
    const curr = (currency || '').toLowerCase().trim();

    if (acct === 'receiver_crypto' || prov === 'crypto') return 'tether';
    if (acct === 'pix' || prov === 'pix') return 'pix';
    if (acct === 'bank' || prov === 'bank' || prov === 'transferencia') return 'transferencia';

    if (acct === 'virtual_bank') {
      if (prov.includes('paypal')) return 'paypal';

      if (prov.includes('wise')) {
        return curr === 'usd' ? 'wise-usd' : 'wise-eur';
      }

      if (prov.includes('payoneer')) {
        return curr === 'usd' ? 'payoneer-usd' : 'payoneer-eur';
      }
    }
    const typeKey = normalize(accountType, provider, currency, accountName);

    return acct || prov || 'unknown';
  };

  const typeKey = normalize(accountType, provider, currency, accountName);
  switch (typeKey) {
    case 'paypal':
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <Image src={PaypalImg} alt="Paypal" width={200} height={200} className="h-12 w-auto dark:hidden sm:h-20" />
          <Image
            src={PaypalDarkImg}
            alt="Paypal"
            width={200}
            height={200}
            className="hidden h-12 w-auto dark:block sm:h-20"
          />
        </div>
      );

    case 'wise-usd':
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <Image src={WiseUsdImg} alt="Wise USD" width={200} height={200} className="h-12 w-auto dark:hidden sm:h-20" />
          <Image
            src={WiseUsdDarkImg}
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
          <Image src={WiseEurImg} alt="Wise EUR" width={200} height={200} className="h-12 w-auto dark:hidden sm:h-20" />
          <Image
            src={WiseEurDarkImg}
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
            src={PayoneerUsdImg}
            alt="Payoneer USD"
            width={200}
            height={200}
            className="h-12 w-auto dark:hidden sm:h-20"
          />
          <Image
            src={PayoneerUsdDarkImg}
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
            src={PayoneerEurImg}
            alt="Payoneer EUR"
            width={200}
            height={200}
            className="h-12 w-auto dark:hidden sm:h-20"
          />
          <Image
            src={PayoneerEurDarkImg}
            alt="Payoneer EUR"
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
            src={BankImg}
            alt="Transferencia"
            width={200}
            height={200}
            className="h-14 w-auto dark:hidden sm:h-20"
          />
          <Image
            src={BankDarkImg}
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
          <Image src={TetherImg} alt="Tether" width={200} height={200} className="h-12 w-auto dark:hidden sm:h-20" />
          <Image
            src={TetherDarkImg}
            alt="Tether"
            width={200}
            height={200}
            className="hidden h-12 w-auto dark:block sm:h-20"
          />
        </div>
      );

    case 'pix':
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <Image src={PixImg} alt="Pix" width={200} height={200} className="h-12 w-auto dark:hidden sm:h-20" />
          <Image src={PixImg} alt="Pix" width={200} height={200} className="hidden h-12 w-auto dark:block sm:h-20" />
        </div>
      );

    default:
      return (
        <div className="ml-4 flex h-10 items-start justify-start">
          <span className="text-xs font-bold text-white">?</span>
        </div>
      );
  }
}
