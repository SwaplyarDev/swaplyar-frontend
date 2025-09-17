'use client';

import Image from 'next/image';
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

  return (
    <div className="w-full max-w-lg pb-2">
      <Select value={selectedWalletId ?? ''} onValueChange={onChange}>
        <SelectTrigger className="max-h-[90%] w-full border-blue-600 focus:shadow-none focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 dark:border-white">
          <SelectValue placeholder="Selecciona una billetera" />
        </SelectTrigger>
        <SelectContent className="bg-[#FFFFFB] dark:bg-[#4B4B4B]">
          {filteredWallets.map((wallet) => {
            const { logo, logoDark } = getWalletLogos(wallet.type);

            let primaryText = '';
            let secondaryText = wallet.fullName || '';

            if (wallet.type.startsWith('payoneer') || wallet.type.startsWith('wise') || wallet.type === 'paypal') {
              primaryText = wallet.email || '';
            } else {
              switch (wallet.type) {
                case 'pix':
                  primaryText = wallet.pixKeyValue || '';
                  break;
                case 'tether':
                  primaryText = wallet.walletAddress
                    ? `${wallet.walletAddress.slice(0, 6)}...${wallet.walletAddress.slice(-4)}`
                    : '';
                  secondaryText = wallet.fullName || (wallet.network ? wallet.network.toUpperCase() : '');
                  break;
                case 'bank':
                  primaryText = wallet.alias || wallet.cbu || '';
                  break;
                default:
                  primaryText = wallet.label;
              }
            }

            return (
              <SelectItem key={wallet.id} value={wallet.id} className="cursor-pointer text-blue-800 dark:text-white">
                <div className="grid w-full items-center gap-4" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
                  <div className="flex items-center justify-center">
                    <Image
                      src={isDark ? logoDark : logo}
                      alt={wallet.label || 'logo'}
                      width={45}
                      height={45}
                      className="h-auto w-auto rounded-sm"
                    />
                  </div>

                  <div className="flex justify-start">
                    <span className="truncate text-sm font-medium">{primaryText}</span>
                  </div>
                  <div className="flex justify-end">
                    {secondaryText && <span className="truncate text-sm font-medium">{secondaryText}</span>}
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
