// Hooks
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

import clsx from 'clsx';

// Components
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';

// Types
import { System } from '@/types/data';

interface IProps {
  isProccessing: boolean;
  handleSubmit: () => void;
  sendAmount: string;
  sendAmountNum: number;
  receiveAmountNum: number;
  isSendAmountValid: (arg0: number, arg1: string | undefined) => boolean;
  isReceiveAmountValid: (arg0: number, arg1: string | undefined) => boolean;
  selectedSendingSystem: System | null;
  selectedReceivingSystem: System | null;
}

export default function BtnProccessPayment({
  isProccessing,
  handleSubmit,
  sendAmount,
  sendAmountNum,
  receiveAmountNum,
  isSendAmountValid,
  isReceiveAmountValid,
  selectedSendingSystem,
  selectedReceivingSystem,
}: IProps) {
  const { isDark } = useDarkTheme();

  if (isProccessing) {
    return (
      <div className="mt-4">
        <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="44px" />
      </div>
    );
  } else {
    return (
      <button
        className={clsx(
          isDark ? 'buttonSecondDark' : 'buttonSecond',
          'w-full max-w-[340px] rounded-full bg-custom-blue-800 px-[14px] py-3 font-titleFont text-base font-semibold text-custom-whiteD disabled:bg-custom-blue-300 dark:bg-custom-whiteD dark:text-lightText dark:disabled:bg-custom-grayD-500 dark:disabled:text-custom-whiteD',
        )}
        onClick={handleSubmit}
        disabled={
          isProccessing ||
          sendAmount === '' ||
          isNaN(sendAmountNum) ||
          isNaN(receiveAmountNum) ||
          !isSendAmountValid(sendAmountNum, selectedSendingSystem?.id) ||
          !isReceiveAmountValid(receiveAmountNum, selectedReceivingSystem?.id)
        }
      >
        Procesar pago
      </button>
    );
  }
}
