'use client';

import Image from 'next/image';
import { CreditCard, Trash2 } from 'lucide-react';

interface WalletDetailProps {
  wallet: any;
}

export function WalletDetail({ wallet }: WalletDetailProps) {
  const transactions = [
    {
      id: 1,
      type: 'deposit',
      title: 'Depósito recibido',
      amount: '+$250.00',
      date: '27 Mar 2025',
      time: '10:45 AM',
    },
    {
      id: 2,
      type: 'payment',
      title: 'Pago de servicio',
      amount: '-$45.99',
      date: '25 Mar 2025',
      time: '08:30 AM',
    },
    {
      id: 3,
      type: 'transfer',
      title: 'Transferencia enviada',
      amount: '-$120.50',
      date: '20 Mar 2025',
      time: '15:22 PM',
    },
    {
      id: 4,
      type: 'refund',
      title: 'Reembolso',
      amount: '+$35.00',
      date: '18 Mar 2025',
      time: '11:15 AM',
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Wallet Info */}
      <div className="border-b p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-blue-50">
            <div className="relative h-8 w-8">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt={wallet.name}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{wallet.name}</h3>
              {wallet.isPrimary && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">Principal</span>
              )}
            </div>
            <p className="text-gray-600">{wallet.number}</p>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`inline-block h-2 w-2 rounded-full ${wallet.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}
              ></span>
              <span className="text-sm text-gray-500">{wallet.status === 'active' ? 'Activa' : 'Inactiva'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-2 gap-4 border-b p-4">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="mb-1 text-xs text-gray-500">Balance disponible</p>
          <p className="text-lg font-semibold text-green-600">$1,250.00</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="mb-1 text-xs text-gray-500">Transacciones</p>
          <p className="text-lg font-semibold">24</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="border-b p-4">
        <h4 className="mb-2 font-medium">Transacciones recientes</h4>
      </div>

      {/* Transactions List */}
      <div className="flex-1 divide-y overflow-y-auto">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 transition-colors hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    transaction.type === 'deposit' || transaction.type === 'refund'
                      ? 'bg-green-50'
                      : transaction.type === 'transfer'
                        ? 'bg-purple-50'
                        : 'bg-blue-50'
                  }`}
                >
                  <CreditCard
                    className={`h-5 w-5 ${
                      transaction.type === 'deposit' || transaction.type === 'refund'
                        ? 'text-green-600'
                        : transaction.type === 'transfer'
                          ? 'text-purple-600'
                          : 'text-blue-600'
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="mt-0.5 text-sm text-gray-600">{transaction.date}</p>
                  <p className="mt-1 text-xs text-gray-500">{transaction.time}</p>
                </div>
              </div>
              <p className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.amount}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto border-t p-4">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 py-2.5 text-gray-800 transition-colors hover:bg-gray-200">
            <Trash2 className="h-4 w-4" />
            <span>Eliminar</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-white transition-colors hover:bg-blue-700">
            <CreditCard className="h-4 w-4" />
            <span>Editar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
