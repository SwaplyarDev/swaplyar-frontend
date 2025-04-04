'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { X } from 'lucide-react';
import type { WalletType } from './wallet-types';
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

  return (
    <div className="overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md">
      <div className="border-b bg-gray-50 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WalletIcon type={wallet.type} />
            <span className="font-bold text-gray-800">{wallet.name}</span>
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
        <div className="mt-1 text-sm text-gray-500">{wallet.identifier}</div>
      </div>

      <div className="p-5">
        {wallet.details.map((detail: any, index: number) => (
          <div key={index} className="mb-3 flex justify-between last:mb-0">
            <span className="text-gray-600">{detail.label}</span>
            <span className={`font-medium ${detail.label === 'Estado' ? `text-${detail.value.color}-600` : ''}`}>
              {detail.value.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
