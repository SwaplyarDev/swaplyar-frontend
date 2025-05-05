'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';

interface WalletsListProps {
  onSelectWallet: (wallet: any) => void;
}

export function WalletsList({ onSelectWallet }: WalletsListProps) {
  const wallets = [
    {
      id: 1,
      name: 'Mastercard',
      number: '0180539262018029334',
      status: 'active',
      isPrimary: true,
      country: 'ES',
    },
    {
      id: 2,
      name: 'BBVA',
      number: 'usuario0879',
      status: 'inactive',
      isPrimary: false,
    },
    {
      id: 3,
      name: 'PayPal',
      number: 'ejemplo@ejemplo.com',
      status: 'active',
      isPrimary: false,
    },
    {
      id: 4,
      name: 'Wire',
      number: 'ejemplo@ejemplo.com',
      status: 'active',
      isPrimary: false,
      country: 'ES',
    },
  ];

  return (
    <div className="divide-y">
      {wallets.map((wallet) => (
        <div
          key={wallet.id}
          className="cursor-pointer p-4 transition-colors hover:bg-gray-50"
          onClick={() => onSelectWallet(wallet)}
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-50">
                <div className="relative h-6 w-6">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt={wallet.name}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{wallet.name}</p>
                  {wallet.isPrimary && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">Principal</span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-gray-600">{wallet.number}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${wallet.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}
                  ></span>
                  <span className="text-xs text-gray-500">{wallet.status === 'active' ? 'Activa' : 'Inactiva'}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="rounded-full bg-red-50 p-1.5 transition-colors hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle delete logic here
                }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
              {wallet.country && (
                <div className="flex items-center justify-center rounded-full bg-blue-50 p-1.5">
                  <span className="text-xs font-medium text-blue-600">{wallet.country}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
