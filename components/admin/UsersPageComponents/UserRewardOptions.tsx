'use client';

import { useState } from 'react';
import { CreditCard, Clock } from 'lucide-react';

export function UserRewardsOptions() {
  const [activeTab, setActiveTab] = useState<'wallets' | 'history'>('wallets');

  return (
    <div className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-2 font-medium dark:text-white">Recompensas en Plus Rewards</h3>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => {
              setActiveTab('wallets');
            }}
            className="flex w-full items-center space-x-2 rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
          >
            <CreditCard className="h-4 w-4" />
            <span className="text-sm">Billeteras Agregadas</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setActiveTab('history');
            }}
            className="flex w-full items-center space-x-2 rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
          >
            <Clock className="h-4 w-4" />
            <span className="text-sm">Historial de Transacciones</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
