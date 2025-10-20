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
  PixDarkImg,
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
      return { logo: PixImg, logoDark: PixDarkImg };
    case 'bank':
      return { logo: BankImg, logoDark: BankDarkImg };
    default:
      return { logo: '/icons/default.svg', logoDark: '/icons/default.svg' };
  }
};

export default function WalletSelect({ filteredWallets, selectedWalletId, onChange }: WalletSelectProps) {
  const { isDark } = useDarkTheme();

  const getPrimaryText = (wallet: Wallet, detail: any) => {
    switch (detail.platformId) {
      case 'virtual_bank':
        return detail.emailAccount || '';
      case 'pix':
        return detail.pixValue || '';
      case 'receiver_crypto':
        const addr = detail.wallet || '';
        return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
      case 'bank':
        return detail.sendMethodValue || ''; // ALIAS, CBU, etc.
      default:
        return wallet.name;
    }
  };

  const selectedWallet = React.useMemo(
    () => (selectedWalletId ? filteredWallets.find((w) => w.id === selectedWalletId) : null),
    [selectedWalletId, filteredWallets],
  );

  return (
    <div className="relative w-full max-w-lg pb-2">
      {/* El componente Select. Fíjate que el botón 'X' ya no está dentro del Trigger. */}
      <Select value={selectedWalletId ?? ''} onValueChange={onChange}>
        <SelectTrigger className="h-auto min-h-[40px] w-full border-blue-600 pr-10 ...">
          {selectedWallet ? (
            <div className="flex min-w-0 items-center gap-4">
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
                className="h-auto w-auto flex-shrink-0 rounded-sm"
              />
              <span className="truncate text-sm font-medium">
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
                      width={60}
                      height={60}
                      className="h-auto w-auto rounded-sm"
                    />
                  </div>
                  <div className="min-w-0">
                    <SelectPrimitive.ItemText>
                      <span className="truncate text-sm font-medium text-blue-800">{primaryText}</span>
                    </SelectPrimitive.ItemText>
                  </div>
                  <div className="ml-auto flex-shrink-0 pl-4">
                    <span className="truncate text-sm font-medium text-blue-800">{secondaryText}</span>
                  </div>
                </div>
              </SelectPrimitive.Item>
            );
          })}
        </SelectContent>
      </Select>

      {/* --- EL BOTÓN 'X' AHORA ESTÁ AQUÍ, FUERA DEL SELECT --- */}
      {/* Se renderiza solo si hay una billetera seleccionada y se posiciona encima. */}
      {selectedWallet && (
        <button
          type="button"
          onClick={() => onChange('none')}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-0.5 text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Limpiar selección"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}
