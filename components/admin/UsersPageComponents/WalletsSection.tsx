'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { WalletsResponse, Wallet as WalletR, PaymentType } from '@/types/wallets';
import { WalletsList } from './WalletList';
import { WalletDetail } from './WalletDetails';

export function WalletsSection({wallets}: { wallets: WalletR[] }) {

  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<WalletR | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Filter wallets based on search query
  const filteredWallets = wallets.filter(
    (wallet) =>
      wallet.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallet.details[0].account_id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
                <WalletsList wallets={filteredWallets} onSelectWallet={setSelectedWallet} />
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No se encontraron billeteras que coincidan con la búsqueda
                </div>
              )}
            </div>
          </>

        ) : (
          <WalletDetail wallet={selectedWallet} onSelectWallet={setSelectedWallet} />
        )}
      </div>
    </div>
  );
}
