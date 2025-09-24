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
import { normalizeType } from '@/components/admin/utils/normalizeType';

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

  // Función para obtener el texto principal de la billetera
  const getPrimaryText = (wallet: Wallet, detail: any) => {
    switch (
      detail.platformId // Usamos platformId que es más confiable
    ) {
      case 'virtual_bank':
        return detail.emailAccount || ''; // Dato desde los detalles
      case 'pix':
        return detail.pixValue || '';
      case 'receiver_crypto':
        const addr = detail.wallet || '';
        return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
      case 'bank':
        return detail.sendMethodValue || ''; // ALIAS, CBU, etc.
      default:
        return wallet.name; // El apodo de la cuenta como fallback
    }
  };

  const selectedWallet = React.useMemo(
    () => (selectedWalletId ? filteredWallets.find((w) => w.id === selectedWalletId) : null),
    [selectedWalletId, filteredWallets],
  );

  return (
    <div className="w-full max-w-lg pb-2">
      <Select value={selectedWalletId ?? ''} onValueChange={onChange}>
        <SelectTrigger className="h-auto min-h-[40px] w-full border-blue-600 ...">
          {selectedWallet ? (
            <div className="flex items-center gap-4">
              <Image
                src={
                  isDark
                    ? getWalletLogos(
                        normalizeType(selectedWallet.type, selectedWallet.details?.[0]?.type, selectedWallet.currency),
                      ).logoDark
                    : getWalletLogos(
                        normalizeType(selectedWallet.type, selectedWallet.details?.[0]?.type, selectedWallet.currency),
                      ).logo
                }
                alt={selectedWallet.name || 'logo'}
                width={30}
                height={30}
                className="h-auto w-auto rounded-sm"
              />
              <span className="text-sm font-medium">
                {getPrimaryText(selectedWallet, selectedWallet.details?.[0] || {})}
              </span>
            </div>
          ) : (
            <SelectValue placeholder="Selecciona una billetera" />
          )}
        </SelectTrigger>
        <SelectContent className="bg-[#FFFFFB] dark:bg-[#4B4B4B]">
          {filteredWallets.map((wallet) => {
            const detail = wallet.details?.[0] || {};
            const normalizedWalletType = normalizeType(wallet.type, detail.type, wallet.currency);
            const { logo, logoDark } = getWalletLogos(normalizedWalletType);
            const primaryText = getPrimaryText(wallet, detail);
            const secondaryText = `${detail.firstName || ''} ${detail.lastName || ''}`.trim();

            return (
              <SelectPrimitive.Item key={wallet.id} value={wallet.id} className={cn('focus:bg-accent ...')}>
                <div className="flex w-full items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={isDark ? logoDark : logo}
                      alt={wallet.name || 'logo'}
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
                    <span className="truncate text-sm font-medium text-gray-500">{secondaryText}</span>
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
