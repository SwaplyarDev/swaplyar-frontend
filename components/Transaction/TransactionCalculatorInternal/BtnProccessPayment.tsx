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
  // isDisabled: boolean;
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
  // isDisabled,
}: IProps) {
  const { isDark } = useDarkTheme();

  if (isProccessing) {
    return (
      <div>
        <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size={window.innerWidth < 698 ? '40px' : window.innerWidth < 1024 ? '42px' : '44px'} />
      </div>
    );
  } else {
    return (
      <button
        className={clsx(
          isDark ? 'buttonSecondDark' : 'buttonSecond',
          'w-full rounded-full bg-custom-blue-800 py-2.5 font-titleFont text-base flex items-center justify-center font-semibold text-custom-whiteD disabled:bg-custom-blue-300 dark:bg-custom-whiteD dark:text-custom-grayD dark:disabled:bg-custom-grayD-500 dark:disabled:text-custom-whiteD max-h-[38px] sm:max-h-[42px]',
        )}
        onClick={handleSubmit}
        disabled={
          // isDisabled ||
          isProccessing ||
          sendAmount === '' ||
          receiveAmountNum === 0 ||
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
