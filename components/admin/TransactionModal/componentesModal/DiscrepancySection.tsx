'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, Send, HelpCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { TransactionService } from './ui/TransactionService';

interface DiscrepancySectionProps {
  trans: any; // Using any since TransactionTypeSingle is not provided
  value: boolean | null;
  setDiscrepancySend: (value: boolean) => void;
}

const DiscrepancySection = ({ trans, value, setDiscrepancySend }: DiscrepancySectionProps) => {
  const [discrepancy, setDiscrepancy] = useState<boolean | null>(value);
  const [resolved, setResolved] = useState<boolean | null>(null);
  const [discrepancyReason, setDiscrepancyReason] = useState('');
  const [resolutionReason, setResolutionReason] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isInputTransferIdFocused, setIsInputTransferIdFocused] = useState(false);
  const [isResolutionInputFocused, setIsResolutionInputFocused] = useState(false);
  const [transferId, setTransferId] = useState('');
  // Dialog states
  const [showRequiredDialog, setShowRequiredDialog] = useState(false);
  const [showConfirmDiscrepancyDialog, setShowConfirmDiscrepancyDialog] = useState(false);
  const [showSuccessDiscrepancyDialog, setShowSuccessDiscrepancyDialog] = useState(false);
  const [showRequiredResolutionDialog, setShowRequiredResolutionDialog] = useState(false);
  const [showConfirmResolutionDialog, setShowConfirmResolutionDialog] = useState(false);
  const [showSuccessResolutionDialog, setShowSuccessResolutionDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'discrepancy' | 'resolution'>('discrepancy');

  const { transaction } = trans;

  useEffect(() => {
    // Sync local state with prop value when it changes
    setDiscrepancy(value);
  }, [value]);

  // Auto-close success dialogs after 2 seconds
  useEffect(() => {
    if (showSuccessDiscrepancyDialog || showSuccessResolutionDialog) {
      const timer = setTimeout(() => {
        setShowSuccessDiscrepancyDialog(false);
        setShowSuccessResolutionDialog(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessDiscrepancyDialog, showSuccessResolutionDialog]);

  const handleClick = (newValue: boolean) => {
    setDiscrepancy(newValue);
  };

  const handleSubmitDiscrepancy = () => {
    if (!discrepancyReason.trim()) {
      setDialogType('discrepancy');
      setShowRequiredDialog(true);
      return;
    }

    setShowConfirmDiscrepancyDialog(true);
  };

  const confirmDiscrepancy = async () => {
    setShowConfirmDiscrepancyDialog(false);
    setShowSuccessDiscrepancyDialog(true);
    try {
      const response = await TransactionService('discrepancy', transaction.transaction_id, discrepancyReason);
      console.log(response);
    } catch (error) {
      console.log('Error al enviar el motivo de discrepancia:', error);
    }
    setDiscrepancySend(true);
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
    setShowConfirmResolutionDialog(false);
    setShowSuccessResolutionDialog(true);
    try {
      const response = await TransactionService('approved', transaction.transaction_id, resolutionReason);
    } catch (error) {
      console.log('Error al enviar el motivo de discrepancia:', error);
    }
    setDiscrepancySend(true);
  };

  return (
    <>
      <section className="space-y-6">
        <div className="flex w-full flex-col gap-6">
          {/* Segunda columna: Motivo de discrepancia */}
          {discrepancy === true && (
            <div className="animate-in fade-in flex flex-col gap-4 duration-300">
              <div className="space-y-2">
                <Label htmlFor="discrepancy-reason" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Motivo de la Discrepancia <span className="text-red-500">*</span>
                </Label>

                <div className="flex gap-2">
                  <Input
                    id="discrepancy-reason"
                    placeholder="Explica la discrepancia detalladamente"
                    value={discrepancyReason}
                    onChange={(e) => setDiscrepancyReason(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className={`h-10 transition-all duration-300 ${
                      isInputFocused ? 'border-amber-300 ring-2 ring-amber-300' : ''
                    }`}
                    aria-required="true"
                  />

                  <Button
                    disabled={discrepancyReason.length === 0}
                    onClick={handleSubmitDiscrepancy}
                    className="h-10 bg-amber-500 text-white hover:bg-amber-600"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    <span>Enviar</span>
                  </Button>
                </div>

                <p className="text-muted-foreground text-xs">
                  Describe claramente cuál es la discrepancia encontrada en esta operación.
                </p>
              </div>

              {/* Tercera columna: Discrepancia resuelta */}
              <div className="">
                <div className="">
                  <h3 className="text-lg font-medium text-gray-800">¿Discrepancia Resuelta?</h3>
                </div>

                <div className="flex gap-4">
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => setResolved(true)}
                          variant={resolved === true ? 'default' : 'outline'}
                          className={`relative transition-all duration-300 ${
                            resolved === true
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'hover:border-green-500 hover:text-green-600'
                          }`}
                        >
                          <CheckCircle
                            className={`mr-2 h-5 w-5 ${resolved === true ? 'text-white' : 'text-green-500'}`}
                          />
                          <span>Sí, resuelta</span>
                        </Button>
                      </TooltipTrigger>
                      {resolved !== true && (
                        <TooltipContent side="top" className="border-green-600 bg-green-600 text-white">
                          <p>Marcar como resuelta</p>
                        </TooltipContent>
                      )}
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => setResolved(false)}
                          variant={resolved === false ? 'destructive' : 'outline'}
                          className={`relative transition-all duration-300 ${
                            resolved === false
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'hover:border-red-500 hover:text-red-600'
                          }`}
                        >
                          <XCircle className={`mr-2 h-5 w-5 ${resolved === false ? 'text-white' : 'text-red-500'}`} />
                          <span>No resuelta</span>
                        </Button>
                      </TooltipTrigger>
                      {resolved !== false && (
                        <TooltipContent side="top" className="border-red-600 bg-red-600 text-white">
                          <p>Marcar como no resuelta</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {resolved === true && (
                  <div className="animate-in fade-in mt-4 space-y-4 duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="resolution-reason" className="text-sm font-medium text-gray-700">
                        Motivo de la Resolución <span className="text-red-500">*</span>
                      </Label>

                      <div className="flex gap-2">
                        <Input
                          id="resolution-reason"
                          placeholder="Explica cómo se resolvió la discrepancia"
                          value={resolutionReason}
                          onChange={(e) => setResolutionReason(e.target.value)}
                          onFocus={() => setIsResolutionInputFocused(true)}
                          onBlur={() => setIsResolutionInputFocused(false)}
                          className={`h-10 transition-all duration-300 ${
                            isResolutionInputFocused ? 'border-green-300 ring-2 ring-green-300' : ''
                          }`}
                          aria-required="true"
                        />

                        <Button
                          disabled={resolutionReason.length === 0}
                          onClick={handleSubmitResolution}
                          className="h-10 bg-green-600 text-white hover:bg-green-700"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          <span>Enviar</span>
                        </Button>
                      </div>

                      <p className="text-muted-foreground text-xs">
                        Describe cómo se resolvió la discrepancia encontrada.
                      </p>
                    </div>

                    <Alert variant="default" className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertDescription className="mt-1.5 text-sm text-green-700">
                        La discrepancia ha sido resuelta satisfactoriamente.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {resolved === false && (
                  <>
                    <Alert
                      variant="destructive"
                      className="animate-in fade-in mt-4 border-red-200 bg-red-50 duration-300"
                    >
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="mt-1.5 text-sm text-red-700">
                        La discrepancia no ha sido resuelta. Se requiere atención adicional.
                      </AlertDescription>
                    </Alert>
                    <div className="animate-in fade-in mt-6 max-w-xl duration-300">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Label htmlFor="transfer-id" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            ID de la Transferencia de Devolución
                            <span className="ml-1 text-red-500">*</span>
                          </Label>
                        </div>

                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="transfer-id"
                              type="text"
                              placeholder="Ingresa el ID de la transferencia"
                              value={transferId}
                              onChange={(e) => setTransferId(e.target.value)}
                              onFocus={() => setIsInputTransferIdFocused(true)}
                              onBlur={() => setIsInputTransferIdFocused(false)}
                              className={`h-11 transition-all duration-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 ${
                                isInputTransferIdFocused ? 'ring-primary border-primary ring-2' : ''
                              }`}
                              aria-required="true"
                            />
                          </div>

                          <Button
                            /* Sincronizar el ID de transferencia con el backend */
                            // onClick={}
                            className="h-11 bg-custom-blue text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 dark:hover:shadow-blue-900/20"
                            aria-label="Enviar ID de transferencia"
                          >
                            <span>Enviar</span>
                          </Button>
                        </div>

                        <p className="text-muted-foreground text-xs dark:text-gray-400">
                          Este ID será utilizado para verificar la transferencia en nuestro sistema.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status indicator */}
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

      {/* Confirm Discrepancy Dialog */}
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
              Confirmar
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDiscrepancyDialog(false)}
              className="text-gray-600 dark:border-gray-500 dark:text-gray-300"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Discrepancy Dialog */}
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

      {/* Confirm Resolution Dialog */}
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
              Confirmar
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowConfirmResolutionDialog(false)}
              className="text-gray-600 dark:border-gray-500 dark:text-gray-300"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Resolution Dialog */}
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
    </>
  );
};

export default DiscrepancySection;
