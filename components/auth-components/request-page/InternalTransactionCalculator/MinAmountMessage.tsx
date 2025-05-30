import clsx from 'clsx';

// Types
import { System } from '@/types/data';

interface IProps {
  sendAmount: string;
  sendAmountNum: number;
  receiveAmountNum: number;
  isSendAmountValid: (arg0: number, arg1: string | undefined) => boolean;
  isReceiveAmountValid: (arg0: number, arg1: string | undefined) => boolean;
  selectedSendingSystem: System | null;
  selectedReceivingSystem: System | null;
}

export default function MinAmountMessage({
  sendAmount,
  sendAmountNum,
  receiveAmountNum,
  isSendAmountValid,
  isReceiveAmountValid,
  selectedSendingSystem,
  selectedReceivingSystem,
}: IProps) {
  return (
    <div className="flex min-h-[40px] w-full items-end justify-center">
      {sendAmount === '' ? null : (
        <div
          className={clsx(
            !isSendAmountValid(sendAmountNum, selectedSendingSystem?.id) ||
              !isReceiveAmountValid(receiveAmountNum, selectedReceivingSystem?.id)
              ? 'block'
              : 'hidden',
          )}
        >
          {!isReceiveAmountValid(receiveAmountNum, selectedReceivingSystem?.id) ? (
            selectedReceivingSystem?.id === 'payoneer_usd' ? (
              <p className="p-1 text-sm text-[#f44336]">Payoneer USD requiere recibir al menos 50 USD</p>
            ) : selectedReceivingSystem?.id === 'payoneer_eur' ? (
              <p className="p-1 text-sm text-[#f44336]">Payoneer EUR requiere recibir al menos 50 EUR</p>
            ) : null
          ) : (
            !isSendAmountValid(sendAmountNum, selectedSendingSystem?.id) &&
            (selectedSendingSystem?.id === 'payoneer_usd' || selectedSendingSystem?.id === 'payoneer_eur' ? (
              <p className="p-1 text-sm text-[#f44336]">
                {selectedSendingSystem?.id === 'payoneer_usd'
                  ? 'El monto mínimo desde Payoneer USD es 50 USD'
                  : 'El monto mínimo desde Payoneer EUR es 50 EUR'}
              </p>
            ) : (
              <p className="p-1 text-sm text-[#f44336]">El monto mínimo a enviar es 10 USD</p>
            ))
          )}
        </div>
      )}
    </div>
  );
}
