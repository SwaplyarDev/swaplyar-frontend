'use client';

import Image from 'next/image';
import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import {
  PaypalDarkImg,
  PayoneerUsdImg,
  PayoneerUsdDarkImg,
  WiseUsdImg,
  WiseUsdDarkImg,
  TetherImg,
  TetherDarkImg,
  PixImg,
  BankDarkImg,
  BankImg,
  PaypalImg,
  WiseEurImg,
  WiseEurDarkImg,
  PayoneerEurImg,
  PayoneerEurDarkImg,
} from '@/utils/assets/imgDatabaseCloudinary';
import { Wallet } from '@/store/useWalletStore';
import { cn } from '@/lib/utils';

interface WalletSelectProps {
  filteredWallets: Wallet[];
  selectedWalletId: string | null;
  onChange: (walletId: string) => void;
}

const getWalletLogos = (type: string) => {
  switch (type) {
    case 'paypal':
      return { logo: PaypalImg, logoDark: PaypalDarkImg };
    case 'payoneer_eur':
      return { logo: PayoneerEurImg, logoDark: PayoneerEurDarkImg };
    case 'payoneer_usd':
      return { logo: PayoneerUsdImg, logoDark: PayoneerUsdDarkImg };
    case 'wise_eur':
      return { logo: WiseEurImg, logoDark: WiseEurDarkImg };
    case 'wise_usd':
      return { logo: WiseUsdImg, logoDark: WiseUsdDarkImg };
    case 'tether':
      return { logo: TetherImg, logoDark: TetherDarkImg };
    case 'pix':
      return { logo: PixImg, logoDark: PixImg };
    case 'bank':
      return { logo: BankImg, logoDark: BankDarkImg };
    default:
      return { logo: '/icons/default.svg', logoDark: '/icons/default.svg' };
  }
};

export default function WalletSelect({ filteredWallets, selectedWalletId, onChange }: WalletSelectProps) {
  const { isDark } = useDarkTheme();

  const selectedWallet = React.useMemo(
    () => (selectedWalletId ? filteredWallets.find((w) => w.id === selectedWalletId) : null),
    [selectedWalletId, filteredWallets],
  );

  const getPrimaryText = (wallet: Wallet) => {
    if (wallet.type.startsWith('payoneer') || wallet.type.startsWith('wise') || wallet.type === 'paypal') {
      return wallet.email || '';
    }
    switch (wallet.type) {
      case 'pix':
        return wallet.pixKeyValue || '';
      case 'tether':
        return wallet.walletAddress ? `${wallet.walletAddress.slice(0, 6)}...${wallet.walletAddress.slice(-4)}` : '';
      case 'bank':
        return wallet.alias || wallet.cbu || '';
      default:
        return wallet.label;
    }
  };

  return (
    <div className="w-full max-w-lg pb-2">
      <Select value={selectedWalletId ?? ''} onValueChange={onChange}>
        <SelectTrigger className="h-auto min-h-[40px] w-full border-blue-600 focus:shadow-none ...">
          {selectedWallet ? (
            <div className="flex items-center gap-4">
              <Image
                src={isDark ? getWalletLogos(selectedWallet.type).logoDark : getWalletLogos(selectedWallet.type).logo}
                alt={selectedWallet.label || 'logo'}
                width={30}
                height={30}
                className="h-auto w-auto rounded-sm"
              />
              <span className="text-sm font-medium">{getPrimaryText(selectedWallet)}</span>
            </div>
          ) : (
            <SelectValue placeholder="Selecciona una billetera" />
          )}
        </SelectTrigger>
        <SelectContent className="bg-[#FFFFFB] dark:bg-[#4B4B4B]">
          {filteredWallets.map((wallet) => {
            const { logo, logoDark } = getWalletLogos(wallet.type);
            const primaryText = getPrimaryText(wallet);
            const secondaryText =
              wallet.fullName || (wallet.type === 'tether' && wallet.network ? wallet.network.toUpperCase() : '');

            return (
              <SelectPrimitive.Item
                key={wallet.id}
                value={wallet.id}
                className={cn(
                  'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                  'pl-2',
                  'data-[state=checked]:bg-blue-100 dark:data-[state=checked]:bg-blue-900/30',
                )}
              >
                <div className="flex w-full items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={isDark ? logoDark : logo}
                      alt={wallet.label || 'logo'}
                      width={40}
                      height={40}
                      className="h-auto w-auto rounded-sm"
                    />
                  </div>
                  <div className="min-w-0">
                    <SelectPrimitive.ItemText>
                      <span className="truncate text-sm font-medium">{primaryText}</span>
                    </SelectPrimitive.ItemText>
                  </div>
                  <div className="ml-auto flex-shrink-0 pl-4">
                    <span className="truncate text-sm font-medium">{secondaryText}</span>
                  </div>
                </div>
              </SelectPrimitive.Item>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
