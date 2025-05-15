'use client';

import { useState } from 'react';
import { Search, Plus, CreditCard, ChevronDown, ChevronUp, Clock } from 'lucide-react';

export function TransactionHistorySection() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Mock transaction data
  const transactionGroups = [
    {
      title: 'Hoy',
      transactions: [
        {
          id: 1,
          type: 'deposit',
          title: 'Depósito recibido',
          subtitle: 'Mastercard •••• 9334',
          amount: '+$250.00',
          time: '10:45 AM',
        },
        {
          id: 2,
          type: 'payment',
          title: 'Pago de servicio',
          subtitle: 'PayPal',
          amount: '-$45.99',
          time: '08:30 AM',
        },
      ],
    },
    {
      title: 'Ayer',
      transactions: [
        {
          id: 3,
          type: 'transfer',
          title: 'Transferencia enviada',
          subtitle: 'Wire Transfer',
          amount: '-$120.50',
          time: '15:22 PM',
        },
        {
          id: 4,
          type: 'refund',
          title: 'Reembolso',
          subtitle: 'Mastercard •••• 9334',
          amount: '+$35.00',
          time: '11:15 AM',
        },
      ],
    },
    {
      title: 'Semana pasada',
      transactions: [
        {
          id: 5,
          type: 'subscription',
          title: 'Suscripción mensual',
          subtitle: 'PayPal',
          amount: '-$15.99',
          time: 'Mar 20, 2025',
        },
      ],
    },
  ];

  // Filter transactions based on search query
  const filteredTransactionGroups = transactionGroups
    .map((group) => ({
      ...group,
      transactions: group.transactions.filter(
        (transaction) =>
          transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.subtitle.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((group) => group.transactions.length > 0);

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">Historial de Transacciones</h3>
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
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Buscar transacción"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
        </div>

        {/* Transactions List */}
        <div className="scrollable-list mb-4 max-h-[500px] divide-y overflow-y-auto rounded-lg border scrollbar dark:divide-gray-700 dark:border-gray-700">
          {filteredTransactionGroups.length > 0 ? (
            filteredTransactionGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className="bg-gray-50 p-3 dark:bg-gray-700/50">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{group.title}</h3>
                </div>

                {group.transactions.map((transaction) => (
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
                                : transaction.type === 'subscription'
                                  ? 'bg-amber-50 dark:bg-amber-900/50'
                                  : 'bg-blue-50 dark:bg-blue-900/50'
                          }`}
                        >
                          {transaction.type === 'subscription' ? (
                            <Clock className={`h-5 w-5 text-amber-600 dark:text-amber-400`} />
                          ) : (
                            <CreditCard
                              className={`h-5 w-5 ${
                                transaction.type === 'deposit' || transaction.type === 'refund'
                                  ? 'text-green-600 dark:text-green-400'
                                  : transaction.type === 'transfer'
                                    ? 'text-purple-600 dark:text-purple-400'
                                    : 'text-blue-600 dark:text-blue-400'
                              }`}
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{transaction.title}</p>
                          <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">{transaction.subtitle}</p>
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
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No se encontraron transacciones que coincidan con la búsqueda
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
