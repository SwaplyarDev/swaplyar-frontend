'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import type { TransactionTypeSingle, TransactionV2 } from '@/types/transactions/transactionsType';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { TooltipContent } from '@/components/ui/Tooltip';
import { Tooltip, TooltipTrigger } from '@/components/ui/Tooltip';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

interface ConfirmTransButtonProps {
  value: boolean | null;
  setValue: (arg: boolean) => void;
  trans: TransactionV2;
  submit: any;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setSubmitError: (error: string | null) => void;
  setSubmitSuccess: (success: boolean) => void;
}

const ConfirmTransButton: React.FC<ConfirmTransButtonProps> = ({
  trans,
  value,
  setValue,
  submit,
  setIsSubmitting,
  setSubmitError,
  setSubmitSuccess,
}) => {
  const [selected, setSelected] = useState<boolean | null>(value);
  const [transferId, setTransferId] = useState<string>(trans.receiverAccount?.paymentMethod?.sendMethodValue || '');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isSubmitting, setIsSubmittingLocal] = useState(false);
  const [submitResult, setSubmitResult] = useState<boolean | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const sendButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSubmitTransferId = () => {
    if (!transferId.trim()) {
      setShowValidationModal(true);
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    setIsSubmittingLocal(true);
    setShowConfirmModal(false);

    submit(
      'review_payment',
      {
        review: transferId,
      },
      (isSubmitting: boolean) => {
        setIsSubmitting(isSubmitting);
      },
      (error: string | null) => {
        setIsSubmittingLocal(false);
        setSubmitError(error);
        if (error) {
          setErrorMessage(error);
          setSubmitResult(false);
          setShowResultModal(true);
        }
      },
      (success: boolean) => {
        setIsSubmittingLocal(false);
        setSubmitSuccess(success);

        if (success) {
          setSubmitResult(true);
          setShowResultModal(true);
          setTransferId('');
        }
      },
    );
  };

  const handleResultModalClose = () => {
    setShowResultModal(false);
    setSubmitResult(null);
    setErrorMessage('');
  };

  const handleClick = (newValue: boolean) => {
    setValue(newValue);
    setSelected(newValue);
  };

  const getIcon = (variant: 'success' | 'error' | 'warning' | 'default' = 'default') => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="h-10 w-10 text-green-500 dark:text-green-400" />;
      case 'error':
        return <XCircle className="h-10 w-10 text-red-500 dark:text-red-400" />;
      case 'warning':
        return <XCircle className="h-10 w-10 text-amber-500 dark:text-amber-400" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/90 dark:hover:bg-gray-800">
        <h3 className="text-lg font-semibold dark:text-white">Confirmación de transferencia</h3>
        <p className="text-sm dark:text-gray-300">
          ¿La transferencia ha sido recibida y ya está reflejada en nuestra cuenta?
        </p>

        <div className="mt-2 flex justify-center gap-4">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleClick(true)}
                  variant={selected === true ? 'default' : 'outline'}
                  className={`relative min-w-[160px] rounded-3xl transition-all duration-300 ${
                    selected === true
                      ? 'bg-green-600 text-white shadow-sm hover:bg-green-700 hover:shadow-green-200 dark:bg-green-700 dark:hover:bg-green-600 dark:hover:shadow-green-900/20'
                      : 'hover:border-green-500 hover:bg-green-50 hover:text-green-600 dark:border-gray-600 dark:hover:bg-green-900/20 dark:hover:text-green-400'
                  }`}
                  size="lg"
                >
                  <CheckCircle
                    className={`mr-2 h-5 w-5 ${selected === true ? 'text-white' : 'text-green-500 dark:text-green-400'}`}
                  />
                  <span>Sí, confirmado</span>
                </Button>
              </TooltipTrigger>
              {selected !== true && (
                <TooltipContent side="top" className="border-green-600 bg-green-600 text-white">
                  <p>Confirmar recepción</p>
                </TooltipContent>
              )}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleClick(false)}
                  variant={selected === false ? 'destructive' : 'outline'}
                  className={`relative min-w-[160px] rounded-3xl transition-all duration-300 ${
                    selected === false
                      ? 'bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-red-200 dark:bg-red-700 dark:hover:bg-red-600 dark:hover:shadow-red-900/20'
                      : 'hover:border-red-500 hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                  }`}
                  size="lg"
                >
                  <XCircle
                    className={`mr-2 h-5 w-5 ${selected === false ? 'text-white' : 'text-red-500 dark:text-red-400'}`}
                  />
                  <span>No recibida</span>
                </Button>
              </TooltipTrigger>
              {selected !== false && (
                <TooltipContent side="top" className="border-red-600 bg-red-600 text-white">
                  <p>Marcar como no recibida</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>

        {selected === true && (
          <div className="animate-in fade-in mt-6 max-w-xl duration-300">
            <div className="space-y-3">
              <div className="flex items-center">
                <Label htmlFor="transfer-id" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  ID de la Transferencia
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
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className={`h-11 transition-all duration-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 ${
                      isInputFocused ? 'ring-primary border-primary ring-2' : ''
                    }`}
                    aria-required="true"
                  />
                </div>

                <Button
                  ref={sendButtonRef}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmitTransferId();
                  }}
                  className="buttonSecond h-11 rounded-3xl bg-custom-blue text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 dark:hover:shadow-blue-900/20"
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
        )}
      </div>

      <Dialog open={showValidationModal} onOpenChange={setShowValidationModal}>
        <DialogContent className="dark:border-gray-700 dark:bg-gray-800 sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center text-center">
              {getIcon('warning')}
              <DialogTitle className="mt-2 text-xl font-semibold dark:text-white">Campo requerido</DialogTitle>
            </div>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <p className="text-center text-gray-700 dark:text-gray-300">Por favor ingresa el ID de la transferencia.</p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowValidationModal(false)}
              className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600"
            >
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmModal} onOpenChange={(open) => !isSubmitting && setShowConfirmModal(open)}>
        <DialogContent className="dark:border-gray-700 dark:bg-gray-800 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center dark:text-white">Confirmar ID de transferencia</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-700 dark:text-gray-300">¿Estás seguro de agregar este ID?</p>
            <div className="w-full max-w-xs rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-700">
              <span className="font-medium text-gray-800 dark:text-gray-200">{transferId}</span>
            </div>
          </div>
          <DialogFooter>
            <div className="flex w-full justify-center gap-3">
              <Button
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                className="bg-custom-blue text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Confirmar
              </Button>
              {!isSubmitting && (
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmModal(false)}
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancelar
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showResultModal} onOpenChange={handleResultModalClose}>
        <DialogContent className="dark:border-gray-700 dark:bg-gray-800 sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center text-center">
              {getIcon(submitResult ? 'success' : 'error')}
              <DialogTitle className="mt-2 text-xl font-semibold dark:text-white">
                {submitResult ? 'ID registrado' : 'Error'}
              </DialogTitle>
            </div>
          </DialogHeader>
          {submitResult ? (
            <p className="text-center text-gray-700 dark:text-gray-300">
              El ID de transferencia ha sido registrado exitosamente.
            </p>
          ) : (
            <div className="flex w-full flex-col items-center text-center">
              <p className="mb-2 font-bold text-red-700 dark:text-red-400">
                No se pudo registrar el ID de transferencia
              </p>
              {errorMessage ? (
                <div className="w-full max-w-xs rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                  <span className="font-medium text-red-800 dark:text-red-300">{errorMessage}</span>
                </div>
              ) : (
                <div className="w-full max-w-xs rounded-lg bg-red-100 p-3 text-center dark:bg-red-900/30">
                  <span className="font-medium text-red-800 dark:text-red-300">{transferId}</span>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <div className="flex w-full justify-center gap-3">
              {!submitResult && (
                <Button
                  variant="outline"
                  onClick={handleResultModalClose}
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancelar
                </Button>
              )}
              <Button
                onClick={handleResultModalClose}
                className={
                  submitResult
                    ? 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600'
                    : 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600'
                }
              >
                {submitResult ? 'Aceptar' : 'Intentar de nuevo'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmTransButton;
