'use client';

import { useState } from 'react';
import { Search, CreditCard, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { TransactionByUserId } from '@/types/transactionsBackEnd2';
import { formatDate } from '@/utils/utils';


export function TransactionHistorySection({ transactions }: { transactions: TransactionByUserId }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  console.log('transactions in TransactionHistorySection:', transactions);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
        <div className="scrollable-list mb-4 max-h-[500px] divide-y overflow-y-auto rounded-lg border scrollbar dark:divide-gray-700 dark:border-gray-700">
          {transactions?.meta?.totalItems && transactions.meta.totalItems > 0 ? (
            transactions.data.map((transaction) => (
              <div key={transaction.id} className="p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SvgTransactionType type={transaction.finalStatus === 'pending' ? 'subscription' : 'transfer'} />
                    <div className="flex flex-col items-start gap-1">
                      <p className="font-medium dark:text-white">{transaction.message}</p>

                      {/* remitente */}
                      <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                        From: {`${transaction.senderAccount.firstName || ""} ${transaction.senderAccount.lastName || ""}`}
                      </p>

                      {/* receptor */}
                      <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                        To: {`${transaction.receiverAccount.firstName || ""} ${transaction.receiverAccount.lastName || ""}`}
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>

                  </div>
                  <p className={`font-semibold`}>${transaction.amount.amountSent}</p>
                </div>
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

function SvgTransactionType({ type }: { type: 'deposit' | 'refund' | 'transfer' | 'subscription' }) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full ${
        type === 'deposit' || type === 'refund'
          ? 'bg-green-50 dark:bg-green-900/50'
          : type === 'transfer'
            ? 'bg-purple-50 dark:bg-purple-900/50'
            : type === 'subscription'
              ? 'bg-amber-50 dark:bg-amber-900/50'
              : 'bg-blue-50 dark:bg-blue-900/50'
      }`}
    >
      {type === 'subscription' ? (
        <Clock className={`h-5 w-5 text-amber-600 dark:text-amber-400`} />
      ) : (
        <CreditCard
          className={`h-5 w-5 ${
            type === 'deposit' || type === 'refund'
              ? 'text-green-600 dark:text-green-400'
              : type === 'transfer'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-blue-600 dark:text-blue-400'
          }`}
        />
      )}
    </div>
  );
}
