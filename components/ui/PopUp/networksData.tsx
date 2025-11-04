import IconArbitrum from "../IconsRed/IconArbitrum";
import IconBnb from "../IconsRed/IconBnb";
import IconOptimism from "../IconsRed/IconOptimism";
import IconTron from "../IconsRed/IconTron";
import { qrDark, qrLight } from '@/utils/assets/imgDatabaseCloudinary';

const NETWORKS_DATA = {
  arbitrum: {
    name: 'Arbitrum One',
    label: 'Arbitrum One',
    qrLight: qrLight,
    qrDark: qrDark,
    wallet: process.env.NEXT_PUBLIC_WALLET_ARBITRUM || '0x1234...ARBI',
    image: <IconArbitrum className="w-7 h-7" />,
    value: 'arbitrum',
    currency: 'ARB'
  },
  bnb: {
    name: 'BNB Chain (BEP-20)',
    label: 'BNB Chain (BEP-20)',
    qrLight: qrLight,
    qrDark: qrDark,
    wallet: process.env.NEXT_PUBLIC_WALLET_BNB || '0x1234...BNB',
    image: <IconBnb className="w-7 h-7" />,
    value: 'bnb',
    currency: 'BNB'
  },
  tron: {
    name: 'Tron (TRC20)',
    label: 'Tron (TRC20)',
    qrLight: qrLight,
    qrDark: qrDark,
    wallet: process.env.NEXT_PUBLIC_WALLET_TRON || 'TABC1234TRON',
    image: <IconTron className="w-7 h-7" />,
    value: 'tron',
    currency: 'TRX'
  },
  optimism: {
    name: 'Optimism',
    label: 'Optimism',
    qrLight: qrLight,
    qrDark: qrDark,
    wallet: process.env.NEXT_PUBLIC_WALLET_OPTIMISM || '0x1234...OPTI',
    image: <IconOptimism className="w-7 h-7" />,
    value: 'optimism',
    currency: 'OP'
  },
} as const;

export default NETWORKS_DATA;
