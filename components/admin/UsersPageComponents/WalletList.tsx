'use client';

import Image from 'next/image';
import { Wallet as WalletList, PaymentType } from '@/types/wallets';
import {
  BankDarkImg,
  BankImg,
  PayoneerUsdDarkImg,
  PayoneerUsdImg,
  PaypalDarkImg,
  PaypalImg,
  PixImg,
  TetherDarkImg,
  TetherImg,
  WiseUsdDarkImg,
  WiseUsdImg,
} from '@/utils/assets/imgDatabaseCloudinary';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

interface WalletsListProps {
  wallets: WalletList[];
  onSelectWallet: (wallet: any) => void;
}

export function WalletsList({ wallets, onSelectWallet }: WalletsListProps) {
  return (
    <div className="divide-y">
      {wallets.map((wallet) => (
        <div
          key={wallet.details[0].detailId}
          className="cursor-pointer p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
          onClick={() => onSelectWallet(wallet)}
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="flex items-center justify-center">
                <Logos wallet={wallet} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{wallet.accountName}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400"> {tipoCuenta(wallet.payment_type)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${wallet.details[0].userAccount?.status ? 'bg-green-500' : 'bg-red-500'}`}
                  ></span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {wallet.details[0].userAccount?.status ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {wallet.details[0].currency && (
                <div className="flex items-center justify-center rounded-full bg-blue-50 p-1.5 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                  <span className="text-xs font-medium">{wallet.details[0].currency}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const tipoCuenta = (payment_type: PaymentType) => {
  switch (payment_type) {
    case PaymentType.BANK:
      return 'Cuenta Bancaria';
    case PaymentType.PAYONEER:
      return 'Cuenta Payoneer';
    case PaymentType.PAYPAL:
      return 'Cuenta PayPal';
    case PaymentType.PIX:
      return 'Cuenta Pix';
    case PaymentType.RECEIVER_CRYPTO:
      return 'Cuenta Cripto';
    case PaymentType.VIRTUAL_BANK:
      return 'Cuenta Banco Virtual';
    case PaymentType.WISE:
      return 'Cuenta Wise';
    default:
      return 'Tipo Desconocido';
  }
};

export const Logos = ({ wallet }: { wallet: WalletList }) => {
  const { isDark } = useDarkTheme();
  const detail = wallet.details?.[0];
  if (!detail) return null;

  const imgProps = {
    width: 80,
    height: 80,
    className: "w-[80px]",
    unoptimized: true,
  };

  switch (wallet.payment_type) {
    case PaymentType.BANK:
      return (
        <Image
          src={isDark ? BankDarkImg : BankImg}
          alt="Banco"
          {...imgProps}
        />
      );

    case PaymentType.PIX:
      return (
        <Image
          src={PixImg}
          alt="Pix"
          {...imgProps}
        />
      );

    case PaymentType.RECEIVER_CRYPTO:
      return (
        <Image
          src={isDark ? TetherDarkImg : TetherImg}
          alt="Tether"
          {...imgProps}
        />
      );

    case PaymentType.VIRTUAL_BANK:
      switch (detail.type) {
        case PaymentType.PAYONEER:
          return (
            <Image
              src={isDark ? PayoneerUsdDarkImg : PayoneerUsdImg}
              alt="Payoneer"
              {...imgProps}
            />
          );

        case PaymentType.PAYPAL:
          return (
            <Image
              src={isDark ? PaypalDarkImg : PaypalImg}
              alt="PayPal"
              {...imgProps}
            />
          );

        case PaymentType.WISE:
          return (
            <Image
              src={isDark ? WiseUsdDarkImg : WiseUsdImg}
              alt="Wise"
              {...imgProps}
            />
          );

        default:
          return null;
      }

    default:
      return null;
  }
};


