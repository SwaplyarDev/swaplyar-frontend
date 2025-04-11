'use client';

import { useState } from 'react';
import { CreditCard, Clock } from 'lucide-react';
import { WalletsModal } from './WalletModal';

export function UserRewardsOptions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'wallets' | 'history'>('wallets');

  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-2 font-medium">Recompensas en Plus Rewards</h3>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => {
              setActiveTab('wallets');
              setIsModalOpen(true);
            }}
            className="flex w-full items-center space-x-2 rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
          >
            <CreditCard className="h-4 w-4" />
            <span className="text-sm">Billeteras Agregadas</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setActiveTab('history');
              setIsModalOpen(true);
            }}
            className="flex w-full items-center space-x-2 rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
          >
            <Clock className="h-4 w-4" />
            <span className="text-sm">Historial de Transacciones</span>
          </button>
        </li>
      </ul>

      {isModalOpen && (
        <WalletsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialTab={activeTab} />
      )}
    </div>
  );
}
