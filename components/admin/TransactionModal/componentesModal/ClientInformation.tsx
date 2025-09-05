'use client';

import React from 'react';
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
import MessageWpp from './ui/MessageWpp';
import DiscrepancySection from './DiscrepancySection';
import { TransactionFlowState } from '../../utils/useTransactionHistoryState';

interface ClientInformationProps {
  transactionFlow: TransactionFlowState & { refreshStatus: () => void };
}

const ClientInformation: React.FC<ClientInformationProps> = React.memo(({ transactionFlow }) => {
  const { trans } = useTransactionStore();
  const transaction = trans;
  const [select, setSelect] = useState<boolean | null>(null);
  const [transferStatus, setTransferStatus] = useState<boolean | null>(null);
  const [userClickedNoOnTransfer, setUserClickedNoOnTransfer] = useState<boolean>(false);
  

  const handleStopClick = () => {
    if (select) {
      setSelect(false);
    } else {
      setSelect(true);
    }
  };


  const handleTransferStatusChange = (status: boolean | null) => {
    setTransferStatus(status);
    
    if (status === false) {
      setUserClickedNoOnTransfer(true);
    } else {
      setUserClickedNoOnTransfer(false);
    }
  };

const shouldDisableStopButton = transferStatus !== false && !userClickedNoOnTransfer;

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
          <Button
  variant="outline"
  onClick={handleStopClick}
  disabled={shouldDisableStopButton}
  className={`rounded-3xl ${
    shouldDisableStopButton
      ? 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
      : select
      ? 'bg-amber-500 text-white shadow-lg shadow-amber-200 dark:bg-amber-600 dark:shadow-amber-900/20'
      : 'border-2 border-amber-500 bg-white text-gray-700 hover:bg-amber-50 dark:border-amber-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-amber-900/20'
  } `}
>
            <AlertTriangle
              className={
                shouldDisableStopButton
                  ? `h-5 w-5 text-gray-400 dark:text-gray-500`
                  : select 
                  ? `h-5 w-5 text-white dark:text-white` 
                  : `h-5 w-5 text-amber-500 dark:text-amber-400`
              }
            />
            <span className={
              shouldDisableStopButton
                ? 'font-bold text-gray-400 dark:text-gray-500'
                : 'font-bold'
            }>
              STOP
            </span>
          </Button>
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

        {select === true && (
          <div className="animate-in fade-in mt-6 space-y-4 duration-300">
            <Alert className="border-l-4 border-l-amber-500 bg-amber-50 transition-all duration-300 hover:bg-amber-100 dark:border-l-amber-600 dark:bg-amber-900/20 dark:hover:bg-amber-900/30">
              <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-300">Información sobre STOP</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                <p className="mt-1">
                  Si los datos de la operación no coinciden (por ejemplo, si el monto es mayor o menor al acordado),
                  comunícate con el solicitante para resolverlo antes de continuar.
                </p>
                <p className="mt-2">Esta acción pausará el proceso hasta que se resuelvan las discrepancias.</p>
              </AlertDescription>
            </Alert>
            <MessageWpp text="Comunicate mediante **WhatsApp** del Remitente por si los datos del Destinarario no coincide en el momento de realizar la Transaferencia, y deja esta seccion en **STOP** hasta resolver el incombeniente  " />
    
            <DiscrepancySection 
              trans={trans} 
              value={true} 
              transactionFlow={transactionFlow}
            />
          </div>
        )}
        
        {!select && (
          <TransferClient 
            onTransferStatusChange={handleTransferStatusChange} 
            transactionFlow={transactionFlow} 
          />
        )}
      </CardHeader>

      <div
        className={`h-1.5 w-full transition-all duration-500 ${
          transaction.regret_id ? 'bg-destructive dark:bg-red-700' : 'bg-primary dark:bg-blue-700'
        }`}
      ></div>
    </Card>
  );
});

ClientInformation.displayName = 'ClientInformation';

export default ClientInformation;