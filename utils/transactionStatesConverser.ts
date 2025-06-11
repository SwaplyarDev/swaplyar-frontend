const TransactionStates = {
  pending: '1',
  review_payment: '2',
  approved: '3',
  rejected: '4',
  refund_in_transit: '5',
  in_transit: '6',
  discrepancy: '7',
  canceled: '8',
  modified: '9',
  refunded: '10',
  completed: '11',
} as const;

interface ComponentStatesType {
  aprooveReject: 'stop' | 'accepted' | 'canceled' | null;
  confirmTransButton: boolean | null;
  discrepancySection: boolean;
  transferRealized: boolean;
}

type TransactionStateKeys = keyof typeof TransactionStates;
type TransactionStateValues = (typeof TransactionStates)[TransactionStateKeys];

interface ComponentStates {
  aprooveReject: 'stop' | 'canceled' | 'accepted' | null;
  confirmTransButton: boolean | null;
  discrepancySection: boolean | null;
  transferRealized: boolean;
}

const stateToNumberMap: Record<string, TransactionStateValues> = {
  pending: TransactionStates.pending,
  review_payment: TransactionStates.review_payment,
  aproved: TransactionStates.approved,
  rejected: TransactionStates.rejected,
  refund_in_transit: TransactionStates.refund_in_transit,
  in_transit: TransactionStates.in_transit,
  discrepancy: TransactionStates.discrepancy,
  canceled: TransactionStates.canceled,
  modified: TransactionStates.modified,
  refunded: TransactionStates.refunded,
  completed: TransactionStates.completed,
};

const numberToStateMap: Record<TransactionStateValues, string> = {
  '1': 'pending',
  '2': 'review_payment',
  '3': 'approved',
  '4': 'rejected',
  '5': 'refund_in_transit',
  '6': 'in_transit',
  '7': 'discrepancy',
  '8': 'canceled',
  '9': 'modified',
  '10': 'refunded',
  '11': 'completed',
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
      case '1':
        return {
          aprooveReject: null,
          confirmTransButton: false,
          discrepancySection: null,
          transferRealized: false,
        };
      case '2':
        return {
          aprooveReject: 'stop',
          confirmTransButton: true,
          discrepancySection: null,
          transferRealized: false,
        };
      case '3':
        return {
          aprooveReject: 'accepted',
          confirmTransButton: false,
          discrepancySection: null,
          transferRealized: false,
        };
      case '4':
        return {
          aprooveReject: 'canceled',
          confirmTransButton: false,
          discrepancySection: null,
          transferRealized: false,
        };
      case '5':
        return {
          aprooveReject: null,
          confirmTransButton: false,
          discrepancySection: null,
          transferRealized: false,
        };
      case '6':
        return {
          aprooveReject: null,
          confirmTransButton: false,
          discrepancySection: null,
          transferRealized: false,
        };
      case '7':
        return {
          aprooveReject: null,
          confirmTransButton: false,
          discrepancySection: true,
          transferRealized: false,
        };
      case '8':
        return {
          aprooveReject: 'canceled',
          confirmTransButton: false,
          discrepancySection: null,
          transferRealized: false,
        };
      case '9':
        return {
          aprooveReject: null,
          confirmTransButton: false,
          discrepancySection: null,
          transferRealized: false,
        };
      case '10':
        return {
          aprooveReject: null,
          confirmTransButton: false,
          discrepancySection: null,
          transferRealized: true,
        };
      case '11':
        return {
          aprooveReject: null,
          confirmTransButton: false,
          discrepancySection: null,
          transferRealized: true,
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
