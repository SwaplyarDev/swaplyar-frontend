import type React from 'react';
import Image from 'next/image';
import { MockImagesTransDark, MockImagesTransLight } from '@/data/mockImagesTransaction';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { SwaplyArLogoSolo } from '@/utils/assets/imgDatabaseCloudinary';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Flecha from './utils/Flechas';

interface TransactionProps {
  trans: TransactionTypeSingle;
}

const TransferImages: React.FC<TransactionProps> = ({ trans }) => {
  const { payment_method, transaction } = trans;
  const { regret_id, note_id } = transaction;
  const { isDark } = useDarkTheme();

  // Find payment method images
  let senderImg = null;
  let receiverImg = null;

  if (isDark) {
    senderImg = MockImagesTransDark.find((img) => img.name === payment_method.sender.value)?.image;
    receiverImg = MockImagesTransDark.find((img) => img.name === payment_method.receiver.value)?.image;
  } else {
    senderImg = MockImagesTransLight.find((img) => img.name === payment_method.sender.value)?.image;
    receiverImg = MockImagesTransLight.find((img) => img.name === payment_method.receiver.value)?.image;
  }

  // Determine alert status
  const hasAlert = false;
  const alertType = false;

  // Alert styling based on type
  const alertStyles = {
    normal: {
      border: 'border-blue-600 dark:border-blue-700',
      bg: 'bg-white dark:bg-gray-800',
      text: 'text-gray-900 dark:text-gray-100',
      icon: 'text-blue-600 dark:text-blue-400',
      hover: 'hover:bg-gray-50 dark:hover:bg-gray-800/80',
    },
  };

  const currentStyle = alertStyles.normal;

  return (
    <section
      className={`relative overflow-hidden rounded-lg ${currentStyle.border} ${currentStyle.bg} ${currentStyle.hover} border shadow-sm transition-all duration-300 hover:shadow-md`}
    >
      {/* Alert Banner (if applicable) */}
      {hasAlert && (
        <div className={`flex items-center gap-3 border-b ${currentStyle.border} p-3 ${currentStyle.hover}`}>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStyle.bg} ${currentStyle.icon}`}
          >
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${currentStyle.text}`}>ALERTA</h3>
            {/* @ts-expect-error */}
            <p className={`font-medium ${currentStyle.text}`}>{alertStyles.title}</p>
          </div>
        </div>
      )}

      {/* Transfer Visualization */}
      <div className="flex flex-col items-center justify-between gap-4 p-4 md:flex-row md:items-center">
        {/* Swaplyar Avatar (only shown when no alert) */}
        {!hasAlert && (
          <div className={`h-full border-r pr-10 ${currentStyle.border}`}>
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 p-1 dark:bg-blue-900/30">
              <Image
                src={SwaplyArLogoSolo}
                alt="Swaplyar"
                width={64}
                height={64}
                className="h-full w-full rounded-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Transfer Flow */}
        <div className="flex flex-1 flex-col items-center gap-3 md:flex-row md:justify-center">
          {/* Sender */}
          <div className="group relative flex h-20 w-full max-w-[200px] items-center justify-center overflow-hidden rounded-lg bg-white p-2 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-800/80">
            {senderImg ? (
              <Image
                src={senderImg || '/placeholder.svg'}
                alt={`Método de pago: ${payment_method.sender.value}`}
                width={180}
                height={60}
                className="h-auto max-h-full w-auto max-w-full object-contain"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-red-500 dark:text-red-400">
                <p>Imagen no disponible</p>
              </div>
            )}
            <div className="absolute -bottom-full left-0 right-0 bg-black/70 p-1 text-center text-xs text-white transition-all group-hover:bottom-0">
              {payment_method.sender.value}
            </div>
          </div>

          {/* Arrows */}
          <div className="flex items-center justify-center p-2">
            <div className="flex items-center">
              <Flecha styles={`${isDark ? '#FFFFFF' : '#012A8E'}`} />
              <Flecha styles={`${isDark ? '#FFFFFF' : '#012A8E'}`} />
              <Flecha styles={`${isDark ? '#FFFFFF' : '#012A8E'}`} />
            </div>
          </div>

          {/* Receiver */}
          <div className="group relative flex h-20 w-full max-w-[200px] items-center justify-center overflow-hidden rounded-lg bg-white p-2 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-800/80">
            {receiverImg ? (
              <Image
                src={receiverImg || '/placeholder.svg'}
                alt={`Método de recepción: ${payment_method.receiver.value}`}
                width={180}
                height={60}
                className="h-auto max-h-full w-auto max-w-full object-contain"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-red-500 dark:text-red-400">
                <p>Imagen no disponible</p>
              </div>
            )}
            <div className="absolute -bottom-full left-0 right-0 bg-black/70 p-1 text-center text-xs text-white transition-all group-hover:bottom-0">
              {payment_method.receiver.value}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferImages;
