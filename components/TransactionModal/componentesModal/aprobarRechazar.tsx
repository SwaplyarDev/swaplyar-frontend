'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useTransactionStore } from '@/store/transactionModalStorage';
import Swal from 'sweetalert2';
import { CheckCircle, XCircle, AlertTriangle, Send, Info } from 'lucide-react';
import { TransactionService } from './ui/TransactionService';
import DiscrepancySection from './DiscrepancySection';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';

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
    <section className="w-full overflow-hidden rounded-xl border bg-white shadow-md transition-all duration-300">
      <div className="p-6">
        <h2 className="mb-5 flex items-center justify-center text-center font-titleFont text-xl font-semibold text-gray-800">
          <Info className="mr-2 h-5 w-5 text-blue-600" />
          Aprobar/Rechazar Solicitud
        </h2>

        <div className="flex flex-col space-y-6">
          {/* Botones de acción */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => componentStates.confirmTransButton && onSelectChange('accepted')}
              onMouseEnter={() => setIsHovering('accepted')}
              onMouseLeave={() => setIsHovering(null)}
              disabled={!componentStates.confirmTransButton}
              className={getButtonClass('accepted')}
              aria-pressed={selected === 'accepted'}
            >
              <CheckCircle className={`h-5 w-5 ${selected === 'accepted' ? 'text-white' : 'text-green-500'}`} />
              <span>Aprobar</span>
              {isHovering === 'accepted' && componentStates.confirmTransButton && selected !== 'accepted' && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white">
                  Aprobar solicitud
                </span>
              )}
            </button>

            <button
              onClick={() => componentStates.confirmTransButton && onSelectChange('stop')}
              onMouseEnter={() => setIsHovering('stop')}
              onMouseLeave={() => setIsHovering(null)}
              disabled={!componentStates.confirmTransButton}
              className={getButtonClass('stop')}
              aria-pressed={selected === 'stop'}
            >
              <AlertTriangle className={`h-5 w-5 ${selected === 'stop' ? 'text-white' : 'text-amber-500'}`} />
              <span className="font-bold">STOP</span>
              {isHovering === 'stop' && componentStates.confirmTransButton && selected !== 'stop' && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-amber-500 px-2 py-1 text-xs text-white">
                  Pausar para revisión
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectChange('canceled')}
              onMouseEnter={() => setIsHovering('canceled')}
              onMouseLeave={() => setIsHovering(null)}
              className={getButtonClass('canceled')}
              aria-pressed={selected === 'canceled'}
            >
              <XCircle className={`h-5 w-5 ${selected === 'canceled' ? 'text-white' : 'text-red-500'}`} />
              <span>Rechazar</span>
              {isHovering === 'canceled' && selected !== 'canceled' && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-red-600 px-2 py-1 text-xs text-white">
                  Rechazar solicitud
                </span>
              )}
            </button>
          </div>

          {/* Contenido condicional basado en la selección */}
          {(selected === 'canceled' || componentStates.confirmTransButton === false) && (
            <div className="animate-fadeIn mt-4 rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
              <label htmlFor="rejection-reason" className="mb-2 block text-sm font-medium text-gray-700">
                Motivo del Rechazo <span className="text-red-500">*</span>
              </label>

              <div
                className={`flex w-full items-center gap-3 rounded-lg p-1 transition-all duration-300 ${isInputFocused ? 'bg-white ring-2 ring-red-300' : 'border border-gray-300 bg-white'} `}
              >
                <input
                  id="rejection-reason"
                  type="text"
                  placeholder="Ingresa el motivo del rechazo"
                  className="h-10 flex-1 border-none bg-transparent px-3 text-gray-800 focus:outline-none"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  aria-required="true"
                />

                <button
                  onClick={handleSubmitRejection}
                  className="flex h-10 items-center gap-2 rounded-lg bg-red-600 px-4 font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Enviar motivo de rechazo"
                >
                  <Send className="h-4 w-4" />
                  <span>Enviar</span>
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Este motivo será comunicado al cliente como razón del rechazo.
              </p>
            </div>
          )}

          {selected === 'stop' && (
            <>
              <div className="animate-fadeIn mt-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
                <h3 className="mb-2 flex items-center font-medium text-amber-800">
                  <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                  Información sobre STOP
                </h3>
                <p className="text-sm text-amber-700">
                  Si los datos de la operación no coinciden (por ejemplo, si el monto es mayor o menor al acordado),
                  comunícate con el solicitante para resolverlo antes de continuar.
                </p>
                <p className="mt-2 text-sm text-amber-700">
                  Esta acción pausará el proceso hasta que se resuelvan las discrepancias.
                </p>
              </div>

              <DiscrepancySection
                trans={trans}
                value={true}
                /*  setValue={(value) => handleComponentStateChange('discrepancySection', value)} */
                setDiscrepancySend={setDiscrepancySend} // Añadido el prop que faltaba
              />
            </>
          )}

          {selected === 'accepted' && (
            <div className="animate-fadeIn mt-4 rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
              <h3 className="mb-2 flex items-center font-medium text-green-800">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Información sobre Aprobación
              </h3>
              <p className="text-sm text-green-700">
                Al aprobar esta solicitud, confirmas que todos los datos son correctos y que la transferencia puede ser
                procesada.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Indicador de estado */}
      <div
        className={`h-1.5 w-full transition-all duration-500 ${selected === 'accepted' ? 'bg-green-500' : selected === 'stop' ? 'bg-amber-500' : selected === 'canceled' ? 'bg-red-500' : 'bg-gray-200'} `}
      ></div>
    </section>
  );
};

export default AprobarRechazar;
