'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, CreditCard, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

interface Wallet {
  id: number;
  name: string;
  number: string;
  status: string;
  isPrimary?: boolean;
  country?: string;
}

export function WalletsSection() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Mock data for wallets
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

  // Filter wallets based on search query
  const filteredWallets = wallets.filter(
    (wallet) =>
      wallet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallet.number.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Mock transactions for wallet details
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
    <div className="rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">Billeteras Agregadas</h3>
        <button
          onClick={toggleExpand}
          className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={isExpanded ? 'Colapsar sección' : 'Expandir sección'}
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {!selectedWallet ? (
          <>
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar billetera"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
            </div>

            {/* Wallets List */}
            <div className="mb-4 max-h-[500px] divide-y overflow-y-auto rounded-lg border dark:divide-gray-700 dark:border-gray-700">
              {filteredWallets.length > 0 ? (
                filteredWallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className="cursor-pointer p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    onClick={() => setSelectedWallet(wallet)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-50 dark:bg-blue-900/50">
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
                            <p className="font-medium dark:text-white">{wallet.name}</p>
                            {wallet.isPrimary && (
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                Principal
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">{wallet.number}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`inline-block h-2 w-2 rounded-full ${
                                wallet.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            ></span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {wallet.status === 'active' ? 'Activa' : 'Inactiva'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          className="rounded-full bg-red-50 p-1.5 transition-colors hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete logic here
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                        </button>
                        {wallet.country && (
                          <div className="flex items-center justify-center rounded-full bg-blue-50 p-1.5 dark:bg-blue-900/50">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              {wallet.country}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No se encontraron billeteras que coincidan con la búsqueda
                </div>
              )}
            </div>

            {/* Add Wallet Button */}
            {/* <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 dark:bg-blue-700 py-2.5 text-white transition-colors hover:bg-blue-700 dark:hover:bg-blue-600">
              <Plus className="h-4 w-4" />
              <span>Agregar nueva billetera</span>
            </button> */}
          </>
        ) : (
          <>
            {/* Wallet Detail View */}
            <div className="mb-4">
              <button
                onClick={() => setSelectedWallet(null)}
                className="mb-4 flex items-center text-blue-600 hover:underline dark:text-blue-400"
              >
                <ChevronDown className="mr-1 h-4 w-4 rotate-90" />
                <span>Volver a la lista</span>
              </button>

              {/* Wallet Info */}
              <div className="rounded-t-lg border-b bg-white p-4 dark:border-gray-700 dark:bg-gray-800/90">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-blue-50 dark:bg-blue-900/50">
                    <div className="relative h-8 w-8">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt={selectedWallet.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold dark:text-white">{selectedWallet.name}</h3>
                      {selectedWallet.isPrimary && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          Principal
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{selectedWallet.number}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${
                          selectedWallet.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      ></span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedWallet.status === 'active' ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Stats */}
              <div className="grid grid-cols-2 gap-4 border-b bg-white p-4 dark:border-gray-700 dark:bg-gray-800/90">
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                  <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Balance disponible</p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">$1,250.00</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                  <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Transacciones</p>
                  <p className="text-lg font-semibold dark:text-white">24</p>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="border-b bg-white p-4 dark:border-gray-700 dark:bg-gray-800/90">
                <h4 className="mb-2 font-medium dark:text-white">Transacciones recientes</h4>
              </div>

              {/* Transactions List */}
              <div className="max-h-[300px] divide-y overflow-y-auto bg-white dark:divide-gray-700 dark:bg-gray-800/90">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            transaction.type === 'deposit' || transaction.type === 'refund'
                              ? 'bg-green-50 dark:bg-green-900/50'
                              : transaction.type === 'transfer'
                                ? 'bg-purple-50 dark:bg-purple-900/50'
                                : 'bg-blue-50 dark:bg-blue-900/50'
                          }`}
                        >
                          <CreditCard
                            className={`h-5 w-5 ${
                              transaction.type === 'deposit' || transaction.type === 'refund'
                                ? 'text-green-600 dark:text-green-400'
                                : transaction.type === 'transfer'
                                  ? 'text-purple-600 dark:text-purple-400'
                                  : 'text-blue-600 dark:text-blue-400'
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{transaction.title}</p>
                          <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">{transaction.date}</p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">{transaction.time}</p>
                        </div>
                      </div>
                      <p
                        className={`font-semibold ${
                          transaction.amount.startsWith('+')
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {transaction.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 rounded-b-lg bg-white p-4 dark:bg-gray-800/90">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 py-2.5 text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                    <Trash2 className="h-4 w-4" />
                    <span>Eliminar</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                    <CreditCard className="h-4 w-4" />
                    <span>Editar</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
