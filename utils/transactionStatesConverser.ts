const TransactionStates = {
  PENDING: '1',
  REVIEW_PAYMENT: '2',
  IN_TRANSIT: '3',
  MODIFIED: '4',
  DISCREPANCY: '5',
  REJECTED: '6',
  REFUNDED: '7',
  COMPLETED: '8',
  CANCELED: '9',
} as const;

interface ComponentStatesType {
  aprooveReject: 'stop' | 'accepted' | 'rejected' | null;
  confirmTransButton: boolean | null;
  discrepancySection: boolean;
  transferRealized: boolean;
}

type TransactionStateKeys = keyof typeof TransactionStates;
type TransactionStateValues = (typeof TransactionStates)[TransactionStateKeys];

interface ComponentStates {
  aprooveReject: 'stop' | 'rejected' | 'accepted' | null;
  confirmTransButton: boolean | null;
  discrepancySection: boolean | null;
  transferRealized: boolean;
}

const stateToNumberMap: Record<string, TransactionStateValues> = {
  pending: TransactionStates.PENDING,
  review_payment: TransactionStates.REVIEW_PAYMENT,
  in_transit: TransactionStates.IN_TRANSIT,
  modified: TransactionStates.MODIFIED,
  discrepancy: TransactionStates.DISCREPANCY,
  rejected: TransactionStates.REJECTED,
  refunded: TransactionStates.REFUNDED,
  completed: TransactionStates.COMPLETED,
  canceled: TransactionStates.CANCELED,
};

const numberToStateMap: Record<TransactionStateValues, string> = {
  '1': 'pending',
  '2': 'review_payment',
  '3': 'in_transit',
  '4': 'modified',
  '5': 'discrepancy',
  '6': 'rejected',
  '7': 'refunded',
  '8': 'completed',
  '9': 'canceled',
};

export const convertTransactionState = (value: string | undefined): string | undefined => {
  if (value) {
    if (stateToNumberMap[value]) {
      return stateToNumberMap[value];
    } else if (numberToStateMap[value as TransactionStateValues]) {
      return numberToStateMap[value as TransactionStateValues]; // Convierte de número a estado
    }
  }
};

export const getComponentStatesFromStatus = (value: string | undefined): ComponentStates => {
  if (value) {
    switch (value) {
      case '1': // PENDING
        return {
          aprooveReject: null,
          confirmTransButton: false,
          discrepancySection: null,
          transferRealized: false,
        };

      case '6': // REJECTED
        return {
          aprooveReject: 'rejected',
          confirmTransButton: false,
          discrepancySection: null,
          transferRealized: false,
        };

      case '5': // DISCREPANCY
        return {
          aprooveReject: 'stop',
          confirmTransButton: true,
          discrepancySection: null,
          transferRealized: false,
        };

      case '2': // REVIEW_PAYMENT
        return {
          aprooveReject: 'stop',
          confirmTransButton: true,
          discrepancySection: null,
          transferRealized: false,
        };

      case '3': // IN_TRANSIT
        return {
          aprooveReject: 'accepted',
          confirmTransButton: true,
          discrepancySection: null,
          transferRealized: false,
        };

      case '8': // COMPLETED
        return {
          aprooveReject: 'accepted',
          confirmTransButton: true,
          discrepancySection: null,
          transferRealized: true,
        };

      default:
        return {
          aprooveReject: null,
          confirmTransButton: null,
          discrepancySection: null,
          transferRealized: false,
        };
    }
  }
  return {
    aprooveReject: null,
    confirmTransButton: null,
    discrepancySection: null,
    transferRealized: false,
  };
};
