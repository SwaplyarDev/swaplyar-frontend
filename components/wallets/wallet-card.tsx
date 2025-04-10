'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Trash, TrashIcon, X } from 'lucide-react';
import type {
  WalletType,
  PayPalDetail,
  TransferenciaDetail,
  TetherDetail,
  WiseDetail,
  BlockchainDetail,
  LegacyDetail,
} from './wallet-types';
import WalletIcon from './wallet-icon';

interface WalletCardProps {
  wallet: WalletType;
}

export default function WalletCard({ wallet }: WalletCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // Replace with your actual API endpoint
      const response = await fetch(`/api/wallets/${wallet.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete wallet');
      }

      // In a real application, you would update the UI here
      // For example, by removing the wallet from the list
      // or by triggering a refetch of the wallets
    } catch (err) {
      console.error('Error deleting wallet:', err);
      alert('Error deleting wallet. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Render details based on wallet type
  const renderDetails = () => {
    if (wallet.details.length === 0) return null;

    switch (wallet.type) {
      case 'paypal':
        return (wallet.details as PayPalDetail[]).map((detail, index) => (
          <div
            key={index}
            className={`mb-3 flex items-end justify-between last:mb-0 ${index === 0 ? '' : 'border-t-2 border-[#012d8a] pt-2'}`}
          >
            <div className="flex flex-col">
              <span className="text-gray-600 dark:text-white">Correo</span>
              <span className="font-medium dark:text-white">{detail.correo}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 dark:text-white">Nombre</span>
              <span className="font-medium dark:text-white">{detail.nombre}</span>
            </div>
            <div className="flex flex-col">
              <Button variant="outline" className="aspect-square h-10 hover:bg-red-500 hover:text-white" size="sm">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ));

      case 'transferencia':
        return (wallet.details as TransferenciaDetail[]).map((detail, index) => (
          <div
            key={index}
            className={`mb-3 flex items-end justify-between last:mb-0 ${index === 0 ? '' : 'border-t-2 border-[#012d8a] pt-2'}`}
          >
            <div className="flex flex-col">
              <span className="text-gray-600 dark:text-white">CVU</span>
              <span className="font-medium dark:text-white">{detail.cvu}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 dark:text-white">DNI</span>
              <span className="font-medium dark:text-white">{detail.dni}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 dark:text-white">Banco</span>
              <span className="font-medium dark:text-white">{detail.nombreBanco}</span>
            </div>
            <div className="flex flex-col">
              <Button variant="outline" className="aspect-square h-10 hover:bg-red-500 hover:text-white" size="sm">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ));

      case 'tether':
        return (wallet.details as TetherDetail[]).map((detail, index) => (
          <div
            key={index}
            className={`mb-3 flex items-end justify-between last:mb-0 ${index === 0 ? '' : 'border-t-2 border-[#012d8a] pt-2'}`}
          >
            <div className="flex flex-col">
              <span className="text-gray-600 dark:text-white">Direccion</span>
              <span className="font-medium dark:text-white">{detail.direction}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 dark:text-white">Red</span>
              <span className="font-medium dark:text-white">{detail.red}</span>
            </div>
            <div className="flex flex-col">
              <Button variant="outline" className="aspect-square h-10 hover:bg-red-500 hover:text-white" size="sm">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ));

      default:
        // Check if it's using the legacy format
        if (wallet.details.length > 0 && 'label' in wallet.details[0]) {
          return (wallet.details as LegacyDetail[]).map((detail, index) => (
            <div key={index} className="mb-3 flex justify-between last:mb-0">
              <span className="text-gray-600 dark:text-white">{detail.label}</span>
              <span
                className={`font-medium ${detail.label === 'Estado' ? `text-${detail.value.color}-600 dark:text-white` : 'dark:text-white'}`}
              >
                {detail.value.text}
              </span>
            </div>
          ));
        }

        // Default fallback
        return <div className="text-gray-600 dark:text-white">No details available</div>;
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md dark:border-[#4B4B4B]">
      <div className="border-b bg-gray-50 p-5 dark:border-[#373737] dark:bg-[#4B4B4B]">
        <div className="flex items-center justify-between dark:text-white">
          <div className="flex items-center gap-3">
            <WalletIcon type={wallet.type} />
            {/* <span className="font-bold text-gray-800 dark:text-white">{wallet.name}</span> */}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 rounded-full p-0 text-red-500 hover:bg-red-50"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="mt-1 text-sm text-gray-500 dark:text-white">{wallet.identifier}</div>
      </div>

      <div className="p-5 dark:bg-[#4B4B4B]">{renderDetails()}</div>
    </div>
  );
}
