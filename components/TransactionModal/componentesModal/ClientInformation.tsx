'use client';

import type React from 'react';
import { useState } from 'react';
import { Edit, AlertTriangle, ArrowLeftRight } from 'lucide-react';
import { useTransactionStore } from '@/store/transactionModalStorage';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import RecieverData from '@/components/TransactionModal/componentesModal/RecieverData';
import TransferClient from './TransferClient';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import ModalEditReciever from '@/components/TransactionModal/componentesModal/ModalEditReciever/ModalEditReciever';

interface ClientInformationProps {
  trans: TransactionTypeSingle;
  modal: boolean;
  setModal: (arg: boolean) => void;
}

const ClientInformation: React.FC<ClientInformationProps> = ({ modal, setModal }) => {
  const { trans } = useTransactionStore();
  const { transaction } = trans;
  const [open, setOpen] = useState(modal);

  // Update parent state when dialog changes
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setModal(open);
  };

  return (
    <Card className="w-full overflow-hidden bg-white transition-all duration-300">
      <CardHeader className="p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2 className="flex items-center text-xl font-semibold text-gray-800 md:text-2xl">
            {transaction.regret_id ? (
              <ArrowLeftRight className="text-destructive mr-2 h-6 w-6" />
            ) : (
              <ArrowLeftRight className="text-primary mr-2 h-6 w-6" />
            )}
            {transaction.regret_id ? 'Información para el Reembolso' : 'Información para realizar el Pago'}
          </h2>

          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="bg-gradient-to-r from-amber-600 to-orange-700 hover:shadow-lg hover:shadow-orange-200"
              >
                <Edit className="mr-2 h-4 w-4 text-white" />
                <span className="text-white">Editar Destinatario</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl">
              {/* Wrap your existing modal component */}
              <ModalEditReciever modal={open} setModal={setOpen} trans={trans} />
            </DialogContent>
          </Dialog>
        </div>

        {transaction.regret_id && (
          <Alert
            variant="destructive"
            className="animate-in fade-in border-l-destructive bg-destructive/10 mt-4 border-l-4 duration-300"
          >
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-destructive font-medium">Reembolso requerido</AlertTitle>
            <AlertDescription className="text-destructive/90 text-sm">
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
          transaction.regret_id ? 'bg-destructive' : 'bg-primary'
        }`}
      ></div>
    </Card>
  );
};

export default ClientInformation;
