'use client';

import { updateTransactionStatus } from '@/actions/transactions/transaction-status.action';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { AlertCircle, CheckCircle, Loader2, Send, XCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ServerErrorModal from '../../ModalErrorServidor/ModalErrorSevidor';
import { TransactionService } from './ui/TransactionService';
import { TransactionV2 } from '@/types/transactions/transactionsType';
import ClientInformation from './ClientInformation';
import { TransactionFlowState } from '../../utils/useTransactionHistoryState';

interface DiscrepancySectionProps {
  trans: TransactionV2;
  value: boolean | null;
  hasPassedThroughDiscrepancy?: boolean;
  hasPassedThroughModified?: boolean;
  currentStatus?: string;
  transactionFlow: TransactionFlowState & { refreshStatus: () => void };
}

const DiscrepancySection = ({
  trans,
  value,
  hasPassedThroughDiscrepancy = false,
  hasPassedThroughModified = false,
  currentStatus = '',
  transactionFlow
}: DiscrepancySectionProps) => {
  const [discrepancy, setDiscrepancy] = useState<boolean | null>(value);
  const [resolved, setResolved] = useState<boolean | null>(null);
  const [discrepancyReason, setDiscrepancyReason] = useState('');
  const [resolutionReason, setResolutionReason] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isResolutionInputFocused, setIsResolutionInputFocused] = useState(false);
  const [isRejectionInputFocused, setIsRejectionInputFocused] = useState(false);
  const [modalServidor, setModalServidor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResolvingLoading, setIsResolvingLoading] = useState(false);
  const [showRequiredDialog, setShowRequiredDialog] = useState(false);
  const [showConfirmDiscrepancyDialog, setShowConfirmDiscrepancyDialog] = useState(false);
  const [showSuccessDiscrepancyDialog, setShowSuccessDiscrepancyDialog] = useState(false);
  const [showRequiredResolutionDialog, setShowRequiredResolutionDialog] = useState(false);
  const [showConfirmResolutionDialog, setShowConfirmResolutionDialog] = useState(false);
  const [showSuccessResolutionDialog, setShowSuccessResolutionDialog] = useState(false);
  const [showRequiredRejectionDialog, setShowRequiredRejectionDialog] = useState(false);
  const [showConfirmRejectionDialog, setShowConfirmRejectionDialog] = useState(false);
  const [showSuccessRejectionDialog, setShowSuccessRejectionDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'discrepancy' | 'resolution' | 'rejection'>('discrepancy');
  const [hasMarkedAsResolved, setHasMarkedAsResolved] = useState(false);

  const isDiscrepancyFieldDisabled =
    ['discrepancy', 'modified', 'approved'].includes(trans.finalStatus) ||
    hasPassedThroughDiscrepancy ||
    currentStatus === 'approved';

  const isResolutionFieldDisabled =
    trans.finalStatus === 'approved' || currentStatus === 'approved' || hasPassedThroughModified;

  const session = useSession();
  const token = session.data?.accessToken || '';
  const transactionId = trans.id;

  useEffect(() => {
    if (hasPassedThroughModified || currentStatus === 'modified' || trans.finalStatus === 'modified') {
      setResolved(true);
      setHasMarkedAsResolved(true);
    }

    if (hasPassedThroughDiscrepancy || currentStatus === 'discrepancy') {
      setDiscrepancy(true);
    }
  }, [hasPassedThroughModified, hasPassedThroughDiscrepancy, currentStatus, trans.finalStatus]);

  useEffect(() => {
    setDiscrepancy(value);
  }, [value]);

  useEffect(() => {
    if (showSuccessDiscrepancyDialog || showSuccessResolutionDialog || showSuccessRejectionDialog) {
      const timer = setTimeout(() => {
        setShowSuccessDiscrepancyDialog(false);
        setShowSuccessResolutionDialog(false);
        setShowSuccessRejectionDialog(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessDiscrepancyDialog, showSuccessResolutionDialog, showSuccessRejectionDialog]);

  const handleSubmitDiscrepancy = () => {
    if (!discrepancyReason.trim()) {
      setDialogType('discrepancy');
      setShowRequiredDialog(true);
      return;
    }
    setShowConfirmDiscrepancyDialog(true);
  };

  const confirmDiscrepancy = async () => {
    try {
      setIsLoading(true);
      const response = await TransactionService('discrepancy', transactionId, {
        descripcion: discrepancyReason,
      });

      if (!response) {
        setIsLoading(false);
        setShowConfirmDiscrepancyDialog(false);
        setModalServidor(true);
      } else {
        setIsLoading(false);
        setShowConfirmDiscrepancyDialog(false);
        setShowSuccessDiscrepancyDialog(true);
        transactionFlow.refreshStatus(); 
      }
    } catch (error) {
      console.log('Error al enviar el motivo de discrepancia:', error);
      setModalServidor(true);
      setShowSuccessDiscrepancyDialog(false);
    }
  };

  const handleResolvedClick = async () => {
    try {
      setIsResolvingLoading(true);
      setResolved(true);
      setHasMarkedAsResolved(true);

      const response = await updateTransactionStatus('modified', transactionId, {
        descripcion: 'Discrepancia marcada como resuelta',
      });

      if (!response || response.error) {
        setModalServidor(true);
        setResolved(null);
        setHasMarkedAsResolved(false);
      } else {
        transactionFlow.refreshStatus(); 
      }
    } catch (error) {
      console.error('Error al marcar como resuelta:', error);
      setModalServidor(true);
      setResolved(null);
      setHasMarkedAsResolved(false);
    } finally {
      setIsResolvingLoading(false);
    }
  };

  const handleSubmitResolution = () => {
    if (!resolutionReason.trim()) {
      setDialogType('resolution');
      setShowRequiredDialog(true);
      return;
    }
    setShowConfirmResolutionDialog(true);
  };

  const confirmResolution = async () => {
    try {
      setIsLoading(true);
      const response = await updateTransactionStatus('approved', transactionId, {
        descripcion: resolutionReason,
      });

      if (!response || response.error) {
        setIsLoading(false);
        setShowConfirmResolutionDialog(false);
        setModalServidor(true);
      } else {
        setIsLoading(false);
        setShowConfirmResolutionDialog(false);
        setShowSuccessResolutionDialog(true);
        transactionFlow.refreshStatus(); 
      }
    } catch (error) {
      console.error('Error en confirmResolution:', error);
      setIsLoading(false);
      setShowConfirmResolutionDialog(false);
      setModalServidor(true);
    }
  };

  const handleSubmitRejection = () => {
    if (!rejectionReason.trim()) {
      setDialogType('rejection');
      setShowRequiredDialog(true);
      return;
    }
    setShowConfirmRejectionDialog(true);
  };

  const confirmRejection = async () => {
    try {
      setIsLoading(true);
      const response = await updateTransactionStatus('refunded', transactionId, {
        descripcion: rejectionReason,
      });

      if (!response) {
        setIsLoading(false);
        setShowConfirmRejectionDialog(false);
        setModalServidor(true);
      } else {
        setIsLoading(false);
        setShowConfirmRejectionDialog(false);
        setShowSuccessRejectionDialog(true);
        transactionFlow.refreshStatus();
      }
    } catch (error) {
      setIsLoading(false);
      setShowConfirmRejectionDialog(false);
      setModalServidor(true);
    }
  };

  return (
    <>
      <section className="space-y-6">
        <div className="flex w-full flex-col gap-6">
          {discrepancy === true && (
            <div className="animate-in fade-in flex flex-col gap-4 duration-300">
              <div className="space-y-2">
                <Label htmlFor="discrepancy-reason" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Motivo de la Discrepancia <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="discrepancy-reason"
                    placeholder={
                      ['discrepancy', 'modified', 'approved', 'in_transit', 'completed', 'refunded'].includes(trans.finalStatus)
                        ? 'Ya se ha registrado una discrepancia para esta transacción'
                        : 'Explica la discrepancia detalladamente'
                    }
                    value={discrepancyReason}
                    onChange={(e) => setDiscrepancyReason(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    disabled={['discrepancy', 'modified', 'approved', 'in_transit', 'completed', 'refunded'].includes(trans.finalStatus)}
                    className={`h-10 transition-all duration-300 ${
                      ['discrepancy', 'modified', 'approved'].includes(trans.finalStatus)
                        ? 'cursor-not-allowed bg-gray-100 opacity-50 dark:bg-gray-600'
                        : isInputFocused
                          ? 'border-amber-300 ring-2 ring-amber-300'
                          : ''
                    }`}
                    aria-required="true"
                  />
                  <Button
                    disabled={
                      discrepancyReason.length === 0 ||
                      ['discrepancy', 'modified', 'approved'].includes(trans.finalStatus)
                    }
                    onClick={handleSubmitDiscrepancy}
                    className={`h-10 rounded-3xl transition-all duration-300 ${
                      ['discrepancy', 'modified', 'approved'].includes(trans.finalStatus)
                        ? 'cursor-not-allowed bg-gray-400 opacity-50 hover:bg-gray-400'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    <span>
                      {['discrepancy', 'modified', 'approved'].includes(trans.finalStatus) ? 'Enviado' : 'Enviar'}
                    </span>
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  {['discrepancy', 'modified', 'approved'].includes(trans.finalStatus)
                    ? 'El motivo de discrepancia ya ha sido registrado para esta transacción.'
                    : 'Describe claramente cuál es la discrepancia encontrada en esta operación.'}
                </p>
              </div>

              <div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">¿Discrepancia Resuelta?</h3>
                </div>
                <div className="flex gap-4">
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleResolvedClick}
                          disabled={hasMarkedAsResolved || isResolvingLoading} 
                          variant={resolved === true ? 'default' : 'outline'}
                          className={`relative rounded-3xl transition-all duration-300 ${
                            resolved === true
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : hasMarkedAsResolved || isResolvingLoading
                                ? 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                                : 'hover:border-green-500 hover:text-green-600'
                          }`}
                        >
                          {isResolvingLoading ? ( 
                            <Loader2 className="mr-2 h-5 w-5 animate-spin text-gray-400" />
                          ) : (
                            <CheckCircle
                              className={`mr-2 h-5 w-5 ${
                                resolved === true
                                  ? 'text-white'
                                  : hasMarkedAsResolved
                                    ? 'text-gray-400'
                                    : 'text-green-500'
                              }`}
                            />
                          )}
                          <span>{isResolvingLoading ? 'Procesando...' : 'Sí, resuelta'}</span> 
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className={
                          hasMarkedAsResolved || isResolvingLoading
                            ? 'border-gray-500 bg-gray-500 text-white'
                            : resolved === true
                              ? 'border-green-600 bg-green-600 text-white'
                              : 'border-green-600 bg-green-600 text-white'
                        }
                      >
                        <p>
                          {isResolvingLoading
                            ? 'Procesando solicitud...'
                            : hasMarkedAsResolved
                              ? 'Ya marcada como resuelta'
                              : resolved === true
                                ? 'Marcada como resuelta'
                                : 'Marcar como resuelta'}
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => !hasMarkedAsResolved && setResolved(false)}
                          disabled={hasMarkedAsResolved || isResolvingLoading} 
                          variant={resolved === false ? 'destructive' : 'outline'}
                          className={`relative rounded-3xl transition-all duration-300 ${
                            resolved === false
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : hasMarkedAsResolved || isResolvingLoading
                                ? 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                                : 'hover:border-red-500 hover:text-red-600'
                          }`}
                        >
                          <XCircle
                            className={`mr-2 h-5 w-5 ${
                              resolved === false ? 'text-white' : hasMarkedAsResolved ? 'text-gray-400' : 'text-red-500'
                            }`}
                          />
                          <span>No resuelta</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className={
                          hasMarkedAsResolved || isResolvingLoading
                            ? 'border-gray-500 bg-gray-500 text-white'
                            : resolved === false
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-red-600 bg-red-600 text-white'
                        }
                      >
                        <p>
                          {isResolvingLoading
                            ? 'Procesando...'
                            : hasMarkedAsResolved
                              ? 'Deshabilitado - Ya se marcó como resuelta'
                              : resolved === false
                                ? 'Marcada como no resuelta'
                                : 'Marcar como no resuelta'}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {resolved === true && (
                  <div className="animate-in fade-in mt-4 space-y-4 duration-300">
                    <Alert variant="default" className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertDescription className="mt-1.5 text-sm text-green-700">
                        {trans.finalStatus === 'modified'
                          ? 'La discrepancia ha sido resuelta y la transacción ha sido modificada.'
                          : 'La discrepancia ha sido resuelta satisfactoriamente.'}
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label
                        htmlFor="resolution-reason"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Motivo de la Resolución <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="resolution-reason"
                          placeholder={
                            ['approved', 'in_transit', 'completed'].includes(trans.finalStatus)
                              ? 'La resolución ya ha sido registrada'
                              : 'Explica cómo se resolvió la discrepancia'
                          }
                          value={resolutionReason}
                          onChange={(e) => setResolutionReason(e.target.value)}
                          onFocus={() => setIsResolutionInputFocused(true)}
                          onBlur={() => setIsResolutionInputFocused(false)}
                          disabled={['approved', 'in_transit', 'completed', 'refunded'].includes(trans.finalStatus)}
                          className={`h-10 transition-all duration-300 ${
                            trans.finalStatus === 'approved'
                              ? 'cursor-not-allowed bg-gray-100 opacity-50 dark:bg-gray-600'
                              : isResolutionInputFocused
                                ? 'border-green-300 ring-2 ring-green-300'
                                : ''
                          }`}
                          aria-required="true"
                        />
                        <Button
                          disabled={resolutionReason.length === 0 || trans.finalStatus === 'approved'}
                          onClick={handleSubmitResolution}
                          className={`h-10 rounded-3xl transition-all duration-300 ${
                            trans.finalStatus === 'approved'
                              ? 'cursor-not-allowed bg-gray-400 opacity-50 hover:bg-gray-400'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          <span>{trans.finalStatus === 'approved' ? 'Enviado' : 'Enviar'}</span>
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {[ 'approved','in_transit', 'completed'].includes(trans.finalStatus)
                          ? 'El motivo de resolución ya ha sido registrado para esta transacción.'
                          : 'Describe cómo se resolvió la discrepancia encontrada.'}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button
                        disabled={true}
                        className="h-10 cursor-not-allowed rounded-3xl bg-gray-300 text-gray-500 opacity-50"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Rechazar Solicitud
                      </Button>
                    </div>
                  </div>
                )}

                {resolved === false && (
                  <div className="animate-in fade-in mt-4 space-y-4 duration-300">
                    <Alert variant="destructive" className="border-red-200 bg-[#F8C0C0]">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="mt-1.5 text-sm text-red-700">
                        La discrepancia no se pudo resolver.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label
                        htmlFor="rejection-reason"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Motivo por el que no se resolvió la discrepancia <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="rejection-reason"
                          placeholder="Motivo del rechazo"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          onFocus={() => setIsRejectionInputFocused(true)}
                          onBlur={() => setIsRejectionInputFocused(false)}
                          className={`h-10 transition-all duration-300 ${
                            isRejectionInputFocused ? 'border-red-300 ring-2 ring-red-300' : ''
                          }`}
                          aria-required="true"
                        />
                        <Button
                          disabled={rejectionReason.length === 0}
                          onClick={handleSubmitRejection}
                          className="h-10 rounded-3xl bg-blue-500 text-white hover:bg-blue-600"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Enviar
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        Describe por qué no se pudo resolver la discrepancia.
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button className="h-10 rounded-3xl bg-red-500 text-white hover:bg-red-600">
                        <XCircle className="mr-2 h-4 w-4" />
                        Rechazar Solicitud
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div
          className={`h-1.5 w-full transition-all duration-500 ${
            discrepancy === true
              ? resolved === true
                ? 'bg-green-500'
                : resolved === false
                  ? 'bg-red-500'
                  : 'bg-amber-500'
              : discrepancy === false
                ? 'bg-green-500'
                : 'bg-gray-200'
          }`}
        ></div>
      </section>

      <Dialog open={showConfirmDiscrepancyDialog} onOpenChange={setShowConfirmDiscrepancyDialog}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">Confirmar discrepancia</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              ¿Estás seguro que quieres enviar este motivo de discrepancia?
            </p>
            <div className="w-full max-w-xs rounded-lg bg-gray-100 p-3 text-left dark:bg-gray-700/30">
              <p className="mb-1 font-medium text-gray-800 dark:text-gray-200">Motivo:</p>
              <p className="text-gray-700 dark:text-gray-300">{discrepancyReason}</p>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-center">
            <Button
              variant="default"
              onClick={confirmDiscrepancy}
              className="bg-[rgb(1,42,142)] text-white hover:bg-[rgb(1,32,112)] dark:bg-blue-900 dark:hover:bg-blue-950"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirmar"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDiscrepancyDialog(false)}
              className="text-gray-600 dark:border-gray-500 dark:text-gray-300"
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmResolutionDialog} onOpenChange={setShowConfirmResolutionDialog}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">Confirmar resolución</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              ¿Estás seguro que quieres enviar este motivo de resolución?
            </p>
            <div className="w-full max-w-xs rounded-lg bg-gray-100 p-3 text-left dark:bg-gray-700/30">
              <p className="mb-1 font-medium text-gray-800 dark:text-gray-200">Motivo:</p>
              <p className="text-gray-700 dark:text-gray-300">{resolutionReason}</p>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-center">
            <Button
              variant="default"
              onClick={confirmResolution}
              className="bg-[rgb(1,42,142)] text-white hover:bg-[rgb(1,32,112)] dark:bg-blue-900 dark:hover:bg-blue-950"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirmar"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowConfirmResolutionDialog(false)}
              className="text-gray-600 dark:border-gray-500 dark:text-gray-300"
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

     <Dialog open={showConfirmRejectionDialog} onOpenChange={setShowConfirmRejectionDialog}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">Confirmar rechazo</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              ¿Estás seguro que quieres enviar este motivo de rechazo?
            </p>
            <div className="w-full max-w-xs rounded-lg bg-gray-100 p-3 text-left dark:bg-gray-700/30">
              <p className="mb-1 font-medium text-gray-800 dark:text-gray-200">Motivo:</p>
              <p className="text-gray-700 dark:text-gray-300">{rejectionReason}</p>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-center">
            <Button
              variant="default"
              onClick={confirmRejection}
              className="bg-[rgb(1,42,142)] text-white hover:bg-[rgb(1,32,112)] dark:bg-blue-900 dark:hover:bg-blue-950"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirmar"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowConfirmRejectionDialog(false)}
              className="text-gray-600 dark:border-gray-500 dark:text-gray-300"
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDiscrepancyDialog} onOpenChange={setShowSuccessDiscrepancyDialog}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              Discrepancia registrada
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700 dark:text-gray-300">
            El motivo de la discrepancia ha sido registrado exitosamente
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessResolutionDialog} onOpenChange={setShowSuccessResolutionDialog}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              Resolución registrada
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700 dark:text-gray-300">
            El motivo de la resolución ha sido registrado exitosamente
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessRejectionDialog} onOpenChange={setShowSuccessRejectionDialog}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              Rechazo registrado
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700 dark:text-gray-300">
            El motivo del rechazo ha sido registrado exitosamente
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={showRequiredDialog} onOpenChange={setShowRequiredDialog}>
        <DialogContent className="border border-gray-300 bg-white text-gray-800 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
              Campo requerido
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700 dark:text-gray-300">
            {dialogType === 'discrepancy'
              ? 'Debes ingresar un motivo de discrepancia para continuar.'
              : dialogType === 'resolution'
                ? 'Debes ingresar un motivo de resolución para continuar.'
                : 'Debes ingresar un motivo de rechazo para continuar.'}
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <ServerErrorModal
        isOpen={modalServidor}
        onClose={() => setModalServidor(false)}
        title="Error en el servidor"
        message="Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo."
      />
    </>
  );
};

export default DiscrepancySection;