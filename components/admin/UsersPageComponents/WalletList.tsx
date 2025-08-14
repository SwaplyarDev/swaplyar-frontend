'use client';

import Image from 'next/image';
import { Wallet as WalletList, PaymentType } from '@/types/wallets';
import { Wallet, Banknote, Coins } from 'lucide-react';

interface WalletsListProps {
  wallets: WalletList[];
  onSelectWallet: (wallet: any) => void;
}

export function WalletsList({wallets,  onSelectWallet }: WalletsListProps) {

  return (
    <div className="divide-y">
      {wallets.map((wallet) => (
        <div
          key={wallet.details[0].account_id}
          className="cursor-pointer p-4 transition-colors hover:bg-gray-50"
          onClick={() => onSelectWallet(wallet)}
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-blue-50">
                <Logos payment_type={wallet.payment_type} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{wallet.accountName}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-600"> {tipoCuenta(wallet.payment_type )}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${wallet.status  ? 'bg-green-500' : 'bg-red-500'}`}
                  ></span>
                  <span className="text-xs text-gray-500">{wallet.status ? 'Activa' : 'Inactiva'}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {wallet.currency && (
                <div className="flex items-center justify-center rounded-full bg-blue-50 p-1.5">
                  <span className="text-xs font-medium text-blue-600">{wallet.currency}</span>
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
}

export const Logos = ({ payment_type }: { payment_type: PaymentType }) => {

  const logoPayoneer = "https://www.svgrepo.com/show/508715/payoneer.svg";
  const logoWise = "https://cdn.worldvectorlogo.com/logos/wise-1.svg";
  const logoPaypal = "https://cdn.worldvectorlogo.com/logos/paypal-3.svg";
  const logoPix = "https://cdn.worldvectorlogo.com/logos/pix-2.svg";
  
  switch (payment_type) {
    case PaymentType.BANK:
      return <Banknote className="h-7 w-7 text-blue-600 dark:text-blue-400" />
    case PaymentType.PAYONEER:
      return <Image src={logoPayoneer} alt="Payoneer" className="h-9 w-9 text-blue-600 dark:text-blue-400" />;
    case PaymentType.PAYPAL:
      return <Image src={logoPaypal} alt="PayPal" className="h-9 w-9 text-blue-600 dark:text-blue-400" />;
    case PaymentType.PIX:
      return <Image src={logoPix} alt="Pix" className="h-9 w-9 text-blue-600 dark:text-blue-400" />;
    case PaymentType.RECEIVER_CRYPTO:
      return <Coins className="h-9 w-9 text-blue-600 dark:text-blue-400" />;
    case PaymentType.VIRTUAL_BANK:
      return <Wallet className="h-7 w-7 text-blue-600 dark:text-blue-400" />;
    case PaymentType.WISE:
      return <Image src={logoWise} alt="Wise" className="h-9 w-9 text-blue-600 dark:text-blue-400" />;
  }
}


