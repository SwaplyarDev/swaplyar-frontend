'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useTransactionStore } from '@/store/transactionModalStorage';
import Swal from 'sweetalert2';
import { CheckCircle, XCircle, AlertTriangle, Send, Info } from 'lucide-react';
import { TransactionService } from './ui/TransactionService';
import DiscrepancySection from './DiscrepancySection';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { Tooltip } from '@/components/ui/Tooltip';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';
import { AlertTitle } from '@mui/material';
import { Alert, AlertDescription } from '@/components/ui/Alert';

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

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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

  // Automatically select 'canceled' if confirmTransButton is false
  useEffect(() => {
    if (componentStates.confirmTransButton === false && selected !== 'canceled') {
      onSelectChange('canceled');
    }
  }, [componentStates.confirmTransButton, selected, onSelectChange]);

  const handleSubmitRejection = async () => {
    if (!rejectionReason.trim()) {
      /* @ts-expect-error */
      Swal.fire({
        title: 'Campo requerido',
        text: 'Por favor ingresa el motivo del rechazo',
        icon: 'warning',
        iconColor: '#D75600',
        confirmButtonColor: 'rgb(1,42,142)',
        background: '#FFFFFF',
        customClass: {
          title: 'text-gray-800 font-titleFont',
          content: 'text-gray-700',
        },
      });
      return;
    }

    Swal.fire({
      title: 'Confirmar rechazo',
      html: `
        <div class="flex flex-col items-center">
          <p class="mb-2 text-gray-700">¿Estás seguro que deseas rechazar esta solicitud?</p>
          <div class="bg-gray-100 p-3 rounded-lg w-full max-w-xs text-left">
            <p class="font-medium text-gray-800 mb-1">Motivo:</p>
            <p class="text-gray-700">${rejectionReason}</p>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirmar rechazo',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#CE1818',
      cancelButtonColor: '#64748b',
      background: '#FFFFFF',
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Mostrar indicador de carga
          Swal.fire({
            title: 'Procesando...',
            text: 'Estamos procesando tu solicitud',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const response = await TransactionService('canceled', transId);

          /* @ts-expect-error */
          if (response?.message === 'Status updated successfully') {
            Swal.fire({
              title: 'Solicitud rechazada',
              text: 'La solicitud ha sido rechazada exitosamente',
              icon: 'success',
              confirmButtonColor: 'rgb(1,42,142)',
              timer: 2000,
              timerProgressBar: true,
            });
          } else {
            throw new Error('Error al procesar la solicitud');
          }
        } catch (error) {
          console.log('Error al rechazar la transacción:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al procesar la solicitud. Por favor intenta nuevamente.',
            icon: 'error',
            confirmButtonColor: 'rgb(1,42,142)',
          });
        }
      }
    });
  };

  const getButtonClass = (type: 'accepted' | 'stop' | 'canceled') => {
    const isDisabled = !componentStates.confirmTransButton && type !== 'canceled';
    const baseClass =
      'relative flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-300';

    if (isDisabled) {
      return `${baseClass} bg-gray-200 text-gray-400 cursor-not-allowed`;
    }

    switch (type) {
      case 'accepted':
        return `${baseClass} ${
          selected === 'accepted'
            ? 'bg-green-600 text-white shadow-lg shadow-green-200'
            : 'bg-white text-gray-700 border border-gray-300 hover:border-green-500 hover:text-green-600'
        }`;
      case 'stop':
        return `${baseClass} ${
          selected === 'stop'
            ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
            : 'bg-white text-gray-700 border-2 border-amber-500 hover:bg-amber-50'
        }`;
      case 'canceled':
        return `${baseClass} ${
          selected === 'canceled'
            ? 'bg-red-600 text-white shadow-lg shadow-red-200'
            : 'bg-white text-gray-700 border border-gray-300 hover:border-red-500 hover:text-red-600'
        }`;
    }
  };

  return (
    <>
      <div className="rounded-lg border bg-white p-4">
        <h3 className="text-lg font-semibold">Aprobar/Rechazar Solicitud</h3>

        <div className="mt-2 flex flex-wrap gap-4">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => componentStates.confirmTransButton && onSelectChange('accepted')}
                  disabled={!componentStates.confirmTransButton}
                  variant="outline"
                  className={getButtonClass('accepted')}
                  aria-pressed={selected === 'accepted'}
                >
                  <CheckCircle
                    className={`mr-2 h-5 w-5 ${selected === 'accepted' ? 'text-white' : 'text-green-500'}`}
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
                  className={getButtonClass('stop')}
                  aria-pressed={selected === 'stop'}
                >
                  <AlertTriangle className={`mr-2 h-5 w-5 ${selected === 'stop' ? 'text-white' : 'text-amber-500'}`} />
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
                  className={getButtonClass('canceled')}
                  aria-pressed={selected === 'canceled'}
                >
                  <XCircle className={`mr-2 h-5 w-5 ${selected === 'canceled' ? 'text-white' : 'text-red-500'}`} />
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

        {/* Rejection Section */}
        {(selected === 'canceled' || componentStates.confirmTransButton === false) && (
          <div className="animate-in fade-in mt-6 duration-300">
            <div className="space-y-3">
              <div className="flex items-center">
                <Label htmlFor="transfer-id" className="text-sm font-medium">
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
                    className={`h-11 transition-all duration-300 ${
                      isInputFocused ? 'ring-primary border-primary ring-2' : ''
                    }`}
                    aria-required="true"
                  />
                </div>

                <Button
                  onClick={handleSubmitRejection}
                  className="h-11 bg-custom-blue text-white hover:bg-blue-700"
                  aria-label="Enviar ID de transferencia"
                >
                  <span>Enviar</span>
                </Button>
              </div>

              <p className="text-muted-foreground text-xs">Este motivo será enviado al cliente.</p>
            </div>
          </div>
        )}

        {/* Stop Section */}
        {selected === 'stop' && (
          <div className="animate-in fade-in mt-6 space-y-4 duration-300">
            <Alert className="border-l-4 border-l-amber-500 bg-amber-50">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <AlertTitle className="text-amber-800">Información sobre STOP</AlertTitle>
              <AlertDescription className="text-amber-700">
                <p className="mt-1">
                  Si los datos de la operación no coinciden (por ejemplo, si el monto es mayor o menor al acordado),
                  comunícate con el solicitante para resolverlo antes de continuar.
                </p>
                <p className="mt-2">Esta acción pausará el proceso hasta que se resuelvan las discrepancias.</p>
              </AlertDescription>
            </Alert>

            <DiscrepancySection trans={trans} value={true} setDiscrepancySend={setDiscrepancySend} />
          </div>
        )}

        {/* Accepted Section */}
        {selected === 'accepted' && (
          <div className="animate-in fade-in mt-6 duration-300">
            <Alert className="border-l-4 border-l-green-500 bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <AlertTitle className="text-green-800">Información sobre Aprobación</AlertTitle>
              <AlertDescription className="text-green-700">
                Al aprobar esta solicitud, confirmas que todos los datos son correctos y que la transferencia puede ser
                procesada.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </>
  );
};

export default AprobarRechazar;
