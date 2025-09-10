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

  switch (wallet.payment_type) {
    case PaymentType.BANK:
      if (isDark) {
        return <Image src={BankDarkImg} alt="Banco" className="w-[80px]" />;
      } else {
        return <Image src={BankImg} alt="Banco" className="w-[80px]" />;
      }

    case PaymentType.PIX:
      if (isDark) {
        return <Image src={PixImg} alt="Pix" className="w-[80px]" />;
      }
      return <Image src={PixImg} alt="Pix" className="w-[80px]" />;

    case PaymentType.RECEIVER_CRYPTO:
      if (isDark) {
        return <Image src={TetherDarkImg} alt="Tether" className="w-[80px]" />;
      }
      return <Image src={TetherImg} alt="Tether" className="w-[80px]" />;

    case PaymentType.VIRTUAL_BANK:
      switch (wallet.details[0].type) {
        case PaymentType.PAYONEER:
          if (isDark) {
            return <Image src={PayoneerUsdDarkImg} alt="Payoneer" className="w-[80px]" />;
          }
          return <Image src={PayoneerUsdImg} alt="Payoneer" className="w-[80px]" />;

        case PaymentType.PAYPAL:
          if (isDark) {
            return <Image src={PaypalDarkImg} alt="PayPal" className="w-[80px]" />;
          }
          return <Image src={PaypalImg} alt="PayPal" className="w-[80px]" />;

        case PaymentType.WISE:
          if (isDark) {
            return <Image src={WiseUsdDarkImg} alt="Wise" className="w-[80px]" />;
          }
          return <Image src={WiseUsdImg} alt="Wise" className="w-[80px]" />;
      }
  }
};
