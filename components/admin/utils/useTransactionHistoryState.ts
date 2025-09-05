'use client';

import { useState, useEffect, useCallback } from 'react';
import { getTransactionStatusHistory } from '@/actions/transactions/transactions.action';
import { debounce } from '@mui/material';

export interface TransactionStatusEntry {
  id: string;
  status: string;
  changedAt: string;
  message: string;
  changedByAdmin: {
    id: string;
    name: string;
  };
}

export interface TransactionFlowState {
  currentStatus: string;
  statusHistory: TransactionStatusEntry[];
  isLoading: boolean;
  error: string | null;

  isTransferConfirmed: boolean;
  hasPassedThroughReviewPayment: boolean;
  hasPassedThroughDiscrepancy: boolean;
  hasPassedThroughModified: boolean;
  isApproved: boolean;
  isRejected: boolean;
  isInDiscrepancy: boolean;
  isTransferInTransit: boolean;
  canClickYesButton: boolean;
  isUnderReview: boolean;

  isTransferCompleted: boolean;
  isTransferRefunded: boolean;
  shouldEnableYesButton: boolean;
  shouldEnableNoButton: boolean;
  shouldEnableEditButton: boolean;
  shouldShowYesAsSelected: boolean;
  shouldShowNoAsSelected: boolean;

  isCurrentlyApproved: boolean;
  isCompleted: boolean;
  hasPassedThrougInTransit: boolean;

  shouldShowConfirmButton: boolean;
  shouldShowApproveReject: boolean;
  shouldShowDiscrepancySection: boolean;
  shouldShowFinalSection: boolean;
  shouldShowClientInformationDirectly: boolean;

  initialConfirmButtonValue: boolean | null;
  initialApproveRejectValue: 'stop' | 'accepted' | 'canceled' | null;
}

export const useTransactionFlow = (transId: string, token: string) => {
  const [state, setState] = useState<TransactionFlowState>({
    currentStatus: '',
    statusHistory: [],
    isLoading: true,
    error: null,

    isTransferConfirmed: false,
    hasPassedThroughReviewPayment: false,
    hasPassedThroughDiscrepancy: false,
    hasPassedThroughModified: false,
    isApproved: false,
    isRejected: false,
    isInDiscrepancy: false,
    isTransferInTransit: false,
    canClickYesButton: false,
    isUnderReview: false,

    isTransferCompleted: false,
    isTransferRefunded: false,
    shouldEnableYesButton: false,
    shouldEnableNoButton: false,
    shouldEnableEditButton: false,
    shouldShowYesAsSelected: false,
    shouldShowNoAsSelected: false,

    isCurrentlyApproved: false,
    isCompleted: false,
    hasPassedThrougInTransit: false,

    shouldShowConfirmButton: true,
    shouldShowApproveReject: false,
    shouldShowDiscrepancySection: false,
    shouldShowFinalSection: false,
    shouldShowClientInformationDirectly: false,

    initialConfirmButtonValue: false,
    initialApproveRejectValue: null,
  });

  const analyzeStatusHistory = useCallback((history: TransactionStatusEntry[]) => {
    if (!history || history.length === 0) {
      return {
        currentStatus: '',
        isTransferConfirmed: false,
        hasPassedThroughReviewPayment: false,
        hasPassedThroughDiscrepancy: false,
        hasPassedThroughModified: false,
        isApproved: false,
        isRejected: false,
        isInDiscrepancy: false,
        isTransferInTransit: false,
        canClickYesButton: false,
        isCurrentlyApproved: false,
        isTransferCompleted: false,
        isTransferRefunded: false,
        shouldEnableYesButton: false,
        shouldEnableNoButton: false,
        shouldEnableEditButton: false,
        shouldShowYesAsSelected: false,
        shouldShowNoAsSelected: false,
        isCompleted: false,
        hasPassedThrougInTransit: false,
      };
    }

    const currentStatus = history[0].status;
    const isCurrentlyApproved = currentStatus === 'approved';
    const isCompleted = currentStatus === 'completed';
    const hasPassedThroughReviewPayment = history.some((entry) => entry.status === 'review_payment');
    const hasPassedThroughDiscrepancy = history.some((entry) => entry.status === 'discrepancy');
    const hasPassedThroughModified = history.some((entry) => entry.status === 'modified');
    const hasPassedThrougInTransit = history.some((entry) => entry.status === 'in_transit');

    const hasEverBeenApproved = history.some((entry) => entry.status === 'approved');

    const confirmYesStatuses = [
      'review_payment',
      'approved',
      'discrepancy',
      'refunded',
      'completed',
      'modified',
      'in_transit',
    ];
    const isTransferConfirmed = hasPassedThroughReviewPayment || confirmYesStatuses.includes(currentStatus);

    const isRejected = currentStatus === 'canceled' || currentStatus === 'rejected';
    const isInDiscrepancy = currentStatus === 'discrepancy' || currentStatus === 'modified';
    const isApproved =
      hasEverBeenApproved &&
      (currentStatus === 'approved' || currentStatus === 'in_transit' || currentStatus === 'completed') &&
      !hasPassedThroughDiscrepancy;

    const isUnderReview = currentStatus === "review_payment"

    const isTransferInTransit = ['in_transit', 'completed', 'refunded'].includes(currentStatus);
    const canClickYesButton = currentStatus === 'approved' && !isInDiscrepancy;

    const isTransferCompleted = currentStatus === 'completed';
    const isTransferRefunded = currentStatus === 'refunded';

    const shouldEnableYesButton = isCurrentlyApproved && !isTransferInTransit && !isRejected;
    const shouldEnableNoButton = isCurrentlyApproved && !isTransferInTransit && !isRejected;
    const shouldEnableEditButton = isRejected && !isTransferInTransit;

    const shouldShowYesAsSelected = isTransferInTransit;
    const shouldShowNoAsSelected = isRejected && !isTransferInTransit;

    return {
      currentStatus,
      isTransferConfirmed,
      hasPassedThroughReviewPayment,
      hasPassedThroughDiscrepancy,
      hasPassedThroughModified,
      isApproved,
      isRejected,
      isInDiscrepancy,
      isTransferInTransit,
      canClickYesButton,
      isCurrentlyApproved,
      isTransferCompleted,
      isTransferRefunded,
      shouldEnableYesButton,
      shouldEnableNoButton,
      shouldEnableEditButton,
      shouldShowYesAsSelected,
      shouldShowNoAsSelected,
      isCompleted,
      hasPassedThrougInTransit,
      isUnderReview,
    };
  }, []);

  const determineComponentVisibility = useCallback(
    (analysisResult: ReturnType<typeof analyzeStatusHistory>) => {
      const {
        currentStatus,
        isTransferConfirmed,
        hasPassedThroughDiscrepancy,
        isApproved,
        isRejected,
        hasPassedThroughModified,
        isInDiscrepancy,
        isCurrentlyApproved,
        hasPassedThroughReviewPayment,
        isCompleted,
        hasPassedThrougInTransit,
      } = analysisResult;

      let initialConfirmButtonValue: boolean | null = false;
      if (isTransferConfirmed) {
        initialConfirmButtonValue = true;
      } else if (currentStatus === 'rejected') {
        initialConfirmButtonValue = false;
      }

      let initialApproveRejectValue: 'stop' | 'accepted' | 'canceled' | null = null;
      if (hasPassedThroughDiscrepancy || isInDiscrepancy) {
        initialApproveRejectValue = 'stop';
      } else if (isApproved) {
        initialApproveRejectValue = 'accepted';
      } else if (isRejected) {
        initialApproveRejectValue = 'canceled';
      }

      const shouldShowConfirmButton = true;

      const wentDirectToApproved =
        isCurrentlyApproved && hasPassedThroughReviewPayment && !hasPassedThroughDiscrepancy && !isInDiscrepancy;

      const shouldShowApproveReject =
        hasPassedThroughDiscrepancy ||
        isInDiscrepancy ||
        wentDirectToApproved ||
        (initialConfirmButtonValue !== null && !isCurrentlyApproved);

      const shouldShowDiscrepancySection =
        initialApproveRejectValue === 'stop' || hasPassedThroughDiscrepancy || isInDiscrepancy;

      let shouldShowFinalSection = false;
      if (isCurrentlyApproved && !isInDiscrepancy) {
        shouldShowFinalSection = true;
      } else if (['in_transit', 'completed', 'refunded'].includes(currentStatus)) {
        shouldShowFinalSection = true;
      } else if (isRejected && !hasPassedThroughDiscrepancy) {
        shouldShowFinalSection = true;
      }

      const shouldShowClientInformationDirectly =
        isCurrentlyApproved ||
        (hasPassedThroughDiscrepancy && (hasPassedThroughModified || currentStatus === 'approved')) ||
        isCompleted ||
        hasPassedThrougInTransit;

      return {
        shouldShowConfirmButton,
        shouldShowApproveReject,
        shouldShowDiscrepancySection,
        shouldShowFinalSection,
        shouldShowClientInformationDirectly,
        initialConfirmButtonValue,
        initialApproveRejectValue,
      };
    },
    [],
  );

  const fetchStatusHistory = useCallback(async () => {
    if (!transId || !token) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const history = await getTransactionStatusHistory(transId, token);
      const analysisResult = analyzeStatusHistory(history);
      const componentVisibility = determineComponentVisibility(analysisResult);

      setState((prev) => ({
        ...prev,
        statusHistory: history,
        isLoading: false,
        ...analysisResult,
        ...componentVisibility,
      }));
    } catch (error) {
      console.error('Error fetching transaction status history:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }));
    }
  }, [transId, token, analyzeStatusHistory, determineComponentVisibility]);

  const refreshStatus = useCallback(
    debounce(() => {
      fetchStatusHistory();
    }, 100),
    [fetchStatusHistory],
  );

  useEffect(() => {
    fetchStatusHistory();
  }, [fetchStatusHistory]);

  return {
    ...state,
    refreshStatus,
  };
};