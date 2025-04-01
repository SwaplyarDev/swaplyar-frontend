'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { CheckCircle, XCircle, Send, AlertCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { TooltipContent } from '@/components/ui/Tooltip';
import { Tooltip, TooltipTrigger } from '@/components/ui/Tooltip';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { useSession } from 'next-auth/react';

interface ConfirmTransButtonProps {
  value: boolean | null;
  setValue: (arg: boolean) => void;
  trans: TransactionTypeSingle;
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
  const [transferId, setTransferId] = useState<string>(trans.payment_method?.sender?.details?.transfer_code || '');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  // Modal states
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isSubmitting, setIsSubmittingLocal] = useState(false);
  const [submitResult, setSubmitResult] = useState<boolean | null>(null);
  // Añadir un nuevo estado para el mensaje de error
  const [errorMessage, setErrorMessage] = useState<string>('');

  const sendButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Sincronizar el estado local con el prop value cuando cambie
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

    // Pasamos 'review_payment' como status y un objeto con transfer_id como form
    submit(
      'review_payment',
      { transfer_id: transferId },
      // Manejar estado de envío
      (isSubmitting: boolean) => {
        setIsSubmitting(isSubmitting);
      },
      // Capturar mensaje de error
      (error: string | null) => {
        setSubmitError(error);
        if (error) {
          setErrorMessage(error);
        }
      },
      // Manejar resultado
      (success: boolean) => {
        setSubmitSuccess(success);
        setIsSubmittingLocal(false);
        setShowConfirmModal(false);

        // Mostrar el modal de resultado después de un breve retraso
        setTimeout(() => {
          setSubmitResult(success);
          setShowResultModal(true);

          if (success) {
            console.log('ID de transferencia enviado:', transferId);
          }
        }, 300);
      },
    );
  };

  const handleResultModalClose = () => {
    setShowResultModal(false);
    if (submitResult) {
      setTransferId('');
    }
  };

  const handleClick = (newValue: boolean) => {
    setValue(newValue);
    setSelected(newValue);
  };

  // Función para obtener el icono según la variante
  const getIcon = (variant: 'success' | 'error' | 'warning' | 'default' = 'default') => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="h-10 w-10 text-green-500" />;
      case 'error':
        return <XCircle className="h-10 w-10 text-red-500" />;
      case 'warning':
        return <XCircle className="h-10 w-10 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="rounded-lg border bg-white p-4">
        <h3 className="text-lg font-semibold">Confirmación de transferencia</h3>
        <p className="text-sm text-gray-800">
          ¿La transferencia ha sido recibida y ya está reflejada en nuestra cuenta?
        </p>

        <div className="mt-2 flex gap-4">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleClick(true)}
                  variant={selected === true ? 'default' : 'outline'}
                  className={`relative min-w-[160px] transition-all duration-300 ${
                    selected === true
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'hover:border-green-500 hover:text-green-600'
                  }`}
                  size="lg"
                >
                  <CheckCircle className={`mr-2 h-5 w-5 ${selected === true ? 'text-white' : 'text-green-500'}`} />
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
                  className={`relative min-w-[160px] transition-all duration-300 ${
                    selected === false
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'hover:border-red-500 hover:text-red-600'
                  }`}
                  size="lg"
                >
                  <XCircle className={`mr-2 h-5 w-5 ${selected === false ? 'text-white' : 'text-red-500'}`} />
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
                <Label htmlFor="transfer-id" className="text-sm font-medium">
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
                    className={`h-11 transition-all duration-300 ${
                      isInputFocused ? 'ring-primary border-primary ring-2' : ''
                    }`}
                    aria-required="true"
                  />
                </div>

                <Button
                  ref={sendButtonRef}
                  onClick={handleSubmitTransferId}
                  className="h-11 bg-custom-blue text-white hover:bg-blue-700"
                  aria-label="Enviar ID de transferencia"
                >
                  <span>Enviar</span>
                </Button>
              </div>

              <p className="text-muted-foreground text-xs">
                Este ID será utilizado para verificar la transferencia en nuestro sistema.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal de validación (campo requerido) */}
      <Dialog open={showValidationModal} onOpenChange={setShowValidationModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center text-center">
              {getIcon('warning')}
              <DialogTitle className="mt-2 text-xl font-semibold">Campo requerido</DialogTitle>
            </div>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <p className="text-center text-gray-700">Por favor ingresa el ID de la transferencia.</p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowValidationModal(false)}
              className="bg-amber-600 text-white hover:bg-amber-700"
            >
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación */}
      <Dialog open={showConfirmModal} onOpenChange={(open) => !isSubmitting && setShowConfirmModal(open)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Confirmar ID de transferencia</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-700">¿Estás seguro de agregar este ID?</p>
            <div className="w-full max-w-xs rounded-lg bg-gray-100 p-3 text-center">
              <span className="font-medium text-gray-800">{transferId}</span>
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-3">
            {!isSubmitting && (
              <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                Cancelar
              </Button>
            )}
            <Button
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
              className="bg-custom-blue text-white hover:bg-blue-700"
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de resultado */}
      <Dialog open={showResultModal} onOpenChange={handleResultModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center text-center">
              {getIcon(submitResult ? 'success' : 'error')}
              <DialogTitle className="mt-2 text-xl font-semibold">
                {submitResult ? 'ID registrado' : 'Error'}
              </DialogTitle>
            </div>
          </DialogHeader>
          {submitResult ? (
            <p className="text-center text-gray-700">El ID de transferencia ha sido registrado exitosamente.</p>
          ) : (
            <div className="flex flex-col items-center">
              <p className="mb-2 font-bold text-red-700">No se pudo registrar el ID de transferencia</p>
              {errorMessage ? (
                <div className="w-full max-w-xs rounded-lg bg-red-100 p-3">
                  <span className="font-medium text-red-800">{errorMessage}</span>
                </div>
              ) : (
                <div className="w-full max-w-xs rounded-lg bg-red-100 p-3 text-center">
                  <span className="font-medium text-red-800">{transferId}</span>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex justify-end gap-3">
            {!submitResult && (
              <Button variant="outline" onClick={handleResultModalClose}>
                Cancelar
              </Button>
            )}
            <Button
              onClick={handleResultModalClose}
              className={
                submitResult ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'
              }
            >
              {submitResult ? 'Aceptar' : 'Intentar de nuevo'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmTransButton;
