'use client';

import type React from 'react';
import { useState } from 'react';
import { Edit, AlertTriangle, ArrowLeftRight } from 'lucide-react';
import { useTransactionStore } from '@/store/transactionModalStorage';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import RecieverData from '@/components/admin/TransactionModal/componentesModal/RecieverData';
import TransferClient from './TransferClient';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader } from '@/components/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import ModalEditReciever from '@/components/admin/TransactionModal/componentesModal/ModalEditReciever/ModalEditReciever';

const ClientInformation: React.FC = () => {
  const { trans } = useTransactionStore();
  const { transaction } = trans;

  // Update parent state when dialog changes

  return (
    <Card className="w-full overflow-hidden border-black bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/90 dark:hover:bg-gray-800">
      <CardHeader className="p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2 className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-100 md:text-2xl">
            {transaction.regret_id ? (
              <ArrowLeftRight className="text-destructive mr-2 h-6 w-6 dark:text-red-400" />
            ) : (
              <ArrowLeftRight className="text-primary mr-2 h-6 w-6 dark:text-blue-400" />
            )}
            {transaction.regret_id ? 'Información para el Reembolso' : 'Información para realizar el Pago'}
          </h2>
        </div>

        {transaction.regret_id && (
          <Alert
            variant="destructive"
            className="animate-in fade-in border-l-destructive bg-destructive/10 dark:bg-destructive/20 dark:border-destructive/70 mt-4 border-l-4 duration-300"
          >
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-destructive font-medium dark:text-red-400">Reembolso requerido</AlertTitle>
            <AlertDescription className="text-destructive/90 text-sm dark:text-red-400/90">
              Si la discrepancia no fue resuelta, se tiene que generar el reembolso del dinero al cliente, a la cuenta
              de origen.
            </AlertDescription>
          </Alert>
        )}

        <RecieverData trans={trans} />

        <TransferClient />
      </CardHeader>

      {/* Status indicator */}
      <div
        className={`h-1.5 w-full transition-all duration-500 ${
          transaction.regret_id ? 'bg-destructive dark:bg-red-700' : 'bg-primary dark:bg-blue-700'
        }`}
      ></div>
    </Card>
  );
};

export default ClientInformation;
