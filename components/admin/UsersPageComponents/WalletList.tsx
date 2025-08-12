'use client';

import Image from 'next/image';
import { WalletsResponse, Wallet as WalletList, PaymentType } from '@/types/wallets';
import { Search, Plus, CreditCard, ChevronDown, ChevronUp, Trash2, Wallet, Banknote } from 'lucide-react';

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
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-50">
                <div className="relative h-6 w-6">
                    <Logos payment_type={wallet.payment_type} />
                </div>
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
  const ejemploLink = "data:image/png;base64,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";
  switch (payment_type) {
    case PaymentType.BANK:
      return <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    case PaymentType.PAYONEER:
      return <Image src={ejemploLink} alt="Payoneer" className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    case PaymentType.PAYPAL:
      return <Image src={ejemploLink} alt="PayPal" className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    case PaymentType.PIX:
      return <Image src={ejemploLink} alt="Pix" className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    case PaymentType.RECEIVER_CRYPTO:
      return <Image src={ejemploLink} alt="Receiver Crypto" className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    case PaymentType.VIRTUAL_BANK:
      return <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    case PaymentType.WISE:
      return <Image src={ejemploLink} alt="Wise" className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
  }
}


