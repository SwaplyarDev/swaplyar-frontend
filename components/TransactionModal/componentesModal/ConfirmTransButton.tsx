'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { CheckCircle, XCircle, Send, AlertCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

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
      <section className="mt-5 w-full overflow-hidden rounded-xl border bg-white transition-all duration-300">
        <div className="p-6">
          <h3 className="mb-5 text-center font-titleFont text-xl font-semibold text-gray-800">
            <span className="inline-flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-blue-600" />
              Confirmación de transferencia
            </span>
          </h3>

          <div className="flex flex-col space-y-6">
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
              <p className="font-medium text-gray-800">
                ¿La transferencia ha sido recibida y ya está reflejada en nuestra cuenta?
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleClick(true)}
                onMouseEnter={() => setIsHovering('yes')}
                onMouseLeave={() => setIsHovering(null)}
                className={`relative flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                  selected === true
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-green-500 hover:text-green-600'
                } `}
              >
                <CheckCircle className={`h-5 w-5 ${selected === true ? 'text-white' : 'text-green-500'}`} />
                <span>Sí, confirmado</span>
                {isHovering === 'yes' && selected !== true && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white">
                    Confirmar recepción
                  </span>
                )}
              </button>

              <button
                onClick={() => handleClick(false)}
                onMouseEnter={() => setIsHovering('no')}
                onMouseLeave={() => setIsHovering(null)}
                className={`relative flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                  selected === false
                    ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-red-500 hover:text-red-600'
                } `}
              >
                <XCircle className={`h-5 w-5 ${selected === false ? 'text-white' : 'text-red-500'}`} />
                <span>No recibida</span>
                {isHovering === 'no' && selected !== false && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-red-600 px-2 py-1 text-xs text-white">
                    Marcar como no recibida
                  </span>
                )}
              </button>
            </div>

            {selected === true && (
              <div className="animate-fadeIn mt-4">
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <label htmlFor="transfer-id" className="mb-2 block text-sm font-medium text-gray-700">
                    ID de la Transferencia <span className="text-red-500">*</span>
                  </label>

                  <div
                    className={`flex w-full items-center gap-3 rounded-lg p-1 transition-all duration-300 ${isInputFocused ? 'bg-blue-50 ring-2 ring-blue-300' : 'border border-gray-300 bg-white'} `}
                  >
                    <input
                      id="transfer-id"
                      type="text"
                      placeholder="Ingresa el ID de la transferencia"
                      className="h-10 flex-1 border-none bg-transparent px-3 text-gray-800 focus:outline-none"
                      value={transferId}
                      onChange={(e) => setTransferId(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      aria-required="true"
                    />

                    <button
                      ref={sendButtonRef}
                      onClick={handleSubmitTransferId}
                      className="flex h-10 items-center gap-2 rounded-lg bg-custom-blue px-4 font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Enviar ID de transferencia"
                    >
                      <Send className="h-4 w-4" />
                      <span>Enviar</span>
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    Este ID será utilizado para verificar la transferencia en nuestro sistema.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Indicador de estado */}
        <div
          className={`h-1.5 w-full transition-all duration-500 ${selected === true ? 'bg-green-500' : selected === false ? 'bg-red-500' : 'bg-gray-200'} `}
        ></div>
      </section>

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
            <Button onClick={() => setShowValidationModal(false)} className="bg-amber-600 hover:bg-amber-700">
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
            <Button onClick={handleConfirmSubmit} disabled={isSubmitting} className="bg-custom-blue hover:bg-blue-700">
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
              className={submitResult ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
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
