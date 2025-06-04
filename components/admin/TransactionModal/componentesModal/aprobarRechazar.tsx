'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useTransactionStore } from '@/store/transactionModalStorage';
import Swal from 'sweetalert2';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { TransactionService } from './ui/TransactionService';
import DiscrepancySection from './DiscrepancySection';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { Tooltip } from '@/components/ui/Tooltip';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';
import { AlertTitle } from '@mui/material';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { useSession } from 'next-auth/react';
import MessageWpp from './ui/MessageWpp';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import ServerErrorModal from '../../ModalErrorServidor/ModalErrorSevidor';
import clsx from 'clsx';

interface AprobarRechazarProps {
  selected: 'stop' | 'accepted' | 'canceled' | null;
  onSelectChange: (value: 'stop' | 'accepted' | 'canceled' | null) => void;
  componentStates: {
    aprooveReject: 'stop' | 'accepted' | 'canceled' | null;
    confirmTransButton: boolean | null;
    discrepancySection: boolean | null;
    transferRealized: boolean;
  };
  transId: string;
  trans: TransactionTypeSingle;
  handleComponentStateChange: (key: keyof any['componentStates'], value: any) => void;
  setDiscrepancySend: (value: boolean) => void;
}

const AprobarRechazar: React.FC<AprobarRechazarProps> = ({
  selected,
  onSelectChange,
  transId,
  trans,
  handleComponentStateChange,
  setDiscrepancySend,
}) => {
  const { componentStates } = useTransactionStore();
  const [rejectionReason, setRejectionReason] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const [openModalReject, setOpenModalReject] = useState(false);
  const [openModalRejectResponse, setOpenModalRejectResponse] = useState(false);
  const [modalServidor, setModalServidor] = useState(true);

  useEffect(() => {
    if (componentStates.confirmTransButton === false && selected !== 'canceled') {
      onSelectChange('canceled');
    }
  }, [componentStates.confirmTransButton, selected, onSelectChange]);

  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>('');

  const handleSubmitRejection = async () => {
    if (!rejectionReason.trim()) return;

    try {
      const response = await acceptReject();
      setApiResponse(response);
      setOpenModalReject(false);
      setOpenModalRejectResponse(true);
    } catch (error: any) {
      console.error('Error al rechazar la transacción:', error);
      setApiResponse(null);
      setOpenModalReject(false);
      setOpenModalRejectResponse(true);
    }
  };

  const acceptReject = async () => {
    const response = await TransactionService('canceled', transId, {
      descripcion: rejectionReason,
    });
    return response;
  };

  const getButtonClass = (type: 'accepted' | 'stop' | 'canceled') => {
    const isDisabled = !componentStates.confirmTransButton && type !== 'canceled';
    const baseClass =
      'w-[150px] h-[40px] relative flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-300';

    if (isDisabled) {
      return `${baseClass}  bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed`;
    }

    switch (type) {
      case 'accepted':
        return `${baseClass} ${
          selected === 'accepted'
            ? 'bg-green-600 dark:bg-green-700 text-white shadow-lg shadow-green-200 dark:shadow-green-900/20'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400'
        }`;
      case 'stop':
        return `${baseClass} ${
          selected === 'stop'
            ? 'bg-amber-500 dark:bg-amber-600 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/20'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-amber-500 dark:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20'
        }`;
      case 'canceled':
        return `${baseClass} ${
          selected === 'canceled'
            ? 'bg-red-600 dark:bg-red-700 text-white shadow-lg shadow-red-200 dark:shadow-red-900/20'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400'
        }`;
    }
  };

  return (
    <>
      <div className="rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/90 dark:hover:bg-gray-800">
        <h3 className="text-lg font-semibold dark:text-white">Aprobar/Rechazar Solicitud</h3>

        <div className="mt-2 flex flex-wrap justify-between gap-4">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => componentStates.confirmTransButton && onSelectChange('accepted')}
                  disabled={!componentStates.confirmTransButton}
                  variant="outline"
                  className={clsx(getButtonClass('accepted'), 'rounded-3xl')}
                  aria-pressed={selected === 'accepted'}
                >
                  <CheckCircle
                    className={`mr-2 h-5 w-5 ${selected === 'accepted' ? 'text-white' : 'text-green-500 dark:text-green-400'}`}
                  />
                  <span>Aprobar</span>
                </Button>
              </TooltipTrigger>
              {componentStates.confirmTransButton && selected !== 'accepted' && (
                <TooltipContent side="top" className="border-green-600 bg-green-600 text-white">
                  <p>Aprobar solicitud</p>
                </TooltipContent>
              )}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => componentStates.confirmTransButton && onSelectChange('stop')}
                  disabled={!componentStates.confirmTransButton}
                  variant="outline"
                  className={clsx(getButtonClass('stop'), 'rounded-3xl')}
                  aria-pressed={selected === 'stop'}
                >
                  <AlertTriangle
                    className={`mr-2 h-5 w-5 ${selected === 'stop' ? 'text-white' : 'text-amber-500 dark:text-amber-400'}`}
                  />
                  <span className="font-bold">STOP</span>
                </Button>
              </TooltipTrigger>
              {componentStates.confirmTransButton && selected !== 'stop' && (
                <TooltipContent side="top" className="border-amber-500 bg-amber-500 text-white">
                  <p>Pausar para revisión</p>
                </TooltipContent>
              )}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => onSelectChange('canceled')}
                  variant="outline"
                  className={clsx(getButtonClass('canceled'), 'rounded-3xl')}
                  aria-pressed={selected === 'canceled'}
                >
                  <XCircle
                    className={`mr-2 h-5 w-5 ${selected === 'canceled' ? 'text-white' : 'text-red-500 dark:text-red-400'}`}
                  />
                  <span>Rechazar</span>
                </Button>
              </TooltipTrigger>
              {selected !== 'canceled' && (
                <TooltipContent side="top" className="border-red-600 bg-red-600 text-white">
                  <p>Rechazar solicitud</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>

        {(selected === 'canceled' || componentStates.confirmTransButton === false) && (
          <div className="animate-in fade-in mt-6 duration-300">
            <div className="space-y-3">
              <div className="flex items-center">
                <Label htmlFor="transfer-id" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Motivo del Rechazo
                  <span className="ml-1 text-red-500">*</span>
                </Label>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="rejection-reason"
                    type="text"
                    placeholder="Ingresa el motivo del rechazo"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className={`h-11 transition-all duration-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 ${
                      isInputFocused ? 'ring-primary border-primary ring-2' : ''
                    }`}
                    aria-required="true"
                  />
                </div>

                <Button
                  onClick={() => setOpenModalReject(true)}
                  className="buttonSecond h-11 rounded-3xl bg-custom-blue text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 dark:hover:shadow-blue-900/20"
                  aria-label="Enviar ID de transferencia"
                >
                  <span>Enviar</span>
                </Button>
              </div>

              <p className="text-muted-foreground text-xs dark:text-gray-400">Este motivo será enviado al cliente.</p>
            </div>
          </div>
        )}

        {selected === 'stop' && (
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
            <MessageWpp text="Comunicate mediante **WhatsApp** del Remitente para solucionar la discrepancia " />
            <DiscrepancySection trans={trans} value={true} setDiscrepancySend={setDiscrepancySend} />
          </div>
        )}

        {selected === 'accepted' && (
          <div className="animate-in fade-in mt-6 duration-300">
            <Alert className="border-l-4 border-l-green-500 bg-green-50 transition-all duration-300 hover:bg-green-100 dark:border-l-green-600 dark:bg-green-900/20 dark:hover:bg-green-900/30">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-300">Información sobre Aprobación</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                Al aprobar esta solicitud, confirmas que todos los datos son correctos y que la transferencia puede ser
                procesada.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      <Dialog open={openModalReject} onOpenChange={setOpenModalReject}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar Rechazo</DialogTitle>
          </DialogHeader>
          <div className="mt-2 text-center">
            <p className="text-gray-700 dark:text-gray-300">Estas seguro de enviar el motivo de rechazo?</p>
          </div>
          <DialogFooter className="mt-4 sm:justify-center">
            <Button onClick={handleSubmitRejection} className="bg-red-600 text-white">
              <span>Enviar</span>
            </Button>
            <Button className="text-white" onClick={() => setOpenModalReject(false)}>
              <span>Cancelar</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openModalRejectResponse} onOpenChange={setOpenModalRejectResponse}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Resultado del Rechazo</DialogTitle>
          </DialogHeader>
          <div className="mt-2 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              {apiResponse
                ? apiResponse.newStatus.message
                : 'Error del servidor, intente de nuevo en un momento. Si el error persiste contacte con el soporte.'}
            </p>
          </div>
          <DialogFooter className="mt-4 sm:justify-center">
            <Button onClick={() => setOpenModalRejectResponse(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AprobarRechazar;
