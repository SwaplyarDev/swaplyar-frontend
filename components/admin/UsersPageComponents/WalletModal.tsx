'use client';

import { useState } from 'react';
import { X, ChevronLeft, Search, Plus, CreditCard, Clock } from 'lucide-react';
import { WalletDetail } from './WalletDetails';
import { WalletsList } from './WalletList';
import { TransactionHistory } from './TransactionHistory';

interface WalletsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'wallets' | 'history';
}

export function WalletsModal({ isOpen, onClose, initialTab }: WalletsModalProps) {
  const [activeTab, setActiveTab] = useState<'wallets' | 'history'>(initialTab);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);

  const handleSelectWallet = (wallet: any) => {
    setSelectedWallet(wallet);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="animate-in fade-in zoom-in w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl duration-300"
        style={{ height: '600px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <ChevronLeft
              className="h-5 w-5 cursor-pointer text-gray-500"
              onClick={() => (selectedWallet ? setSelectedWallet(null) : onClose())}
            />
            <h2 className="text-lg font-semibold">
              {selectedWallet ? `Detalles de ${selectedWallet.name}` : 'Plus Rewards'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full p-1 transition-colors hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {!selectedWallet ? (
          <>
            {/* Tabs */}
            <div className="flex border-b">
              <button
                className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 transition-colors ${
                  activeTab === 'wallets' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('wallets')}
              >
                <CreditCard className="h-4 w-4" />
                <span>Billeteras Agregadas</span>
              </button>
              <button
                className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 transition-colors ${
                  activeTab === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('history')}
              >
                <Clock className="h-4 w-4" />
                <span>Historial</span>
              </button>
            </div>

            {/* Search */}
            <div className="border-b p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar billetera o transacción"
                  className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto" style={{ height: 'calc(600px - 170px)' }}>
              {activeTab === 'wallets' ? <WalletsList onSelectWallet={handleSelectWallet} /> : <TransactionHistory />}
            </div>

            {/* Footer */}
            <div className="border-t p-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-white transition-colors hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>{activeTab === 'wallets' ? 'Agregar nueva billetera' : 'Ver más transacciones'}</span>
              </button>
            </div>
          </>
        ) : (
          <WalletDetail wallet={selectedWallet} />
        )}
      </div>
    </div>
  );
}
