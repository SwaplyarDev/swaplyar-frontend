'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import Swal from 'sweetalert2';
import { AlertCircle, CheckCircle, XCircle, Send, HelpCircle } from 'lucide-react';

interface DiscrepancySectionProps {
  trans: TransactionTypeSingle;
  setValue: (arg: boolean) => void;
  value: boolean | null;
  setDiscrepancySend: any;
}

const DiscrepancySection: React.FC<DiscrepancySectionProps> = ({ trans, setValue, value, setDiscrepancySend }) => {
  const [discrepancy, setDiscrepancy] = useState<boolean | null>(value);
  const [resolved, setResolved] = useState<boolean | null>(null);
  const [discrepancyReason, setDiscrepancyReason] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  useEffect(() => {
    // Sincronizar el estado local con el prop value cuando cambie
    setDiscrepancy(value);
  }, [value]);

  const handleClick = (newValue: boolean) => {
    setValue(newValue);
    setDiscrepancy(newValue);

    // Si se cambia a "NO", resetear el estado de resolución
    /* if (!newValue) {
      setResolved(null);
      setDiscrepancyReason('');
    } */
  };

  const handleSubmitDiscrepancy = () => {
    if (!discrepancyReason.trim()) {
      /* @ts-expect-error */
      Swal.fire({
        title: 'Campo requerido',
        text: 'Por favor ingresa el motivo de la discrepancia',
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
      title: 'Confirmar discrepancia',
      html: `
        <div class="flex flex-col items-center">
          <p class="mb-2 text-gray-700">¿Estás seguro que quieres enviar este motivo de discrepancia?</p>
          <div class="bg-gray-100 p-3 rounded-lg w-full max-w-xs text-left">
            <p class="font-medium text-gray-800 mb-1">Motivo:</p>
            <p class="text-gray-700">${discrepancyReason}</p>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'rgb(1,42,142)',
      cancelButtonColor: '#64748b',
      background: '#FFFFFF',
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Discrepancia registrada',
          text: 'El motivo de la discrepancia ha sido registrado exitosamente',
          icon: 'success',
          confirmButtonColor: 'rgb(1,42,142)',
          timer: 2000,
          timerProgressBar: true,
        });
        console.log('Motivo de discrepancia enviado:', discrepancyReason);
        setDiscrepancySend(true);
        // Aquí puedes agregar la lógica para guardar el motivo
      }
    });
  };

  return (
    <section className="w-full overflow-hidden rounded-xl border bg-white shadow-md transition-all duration-300">
      <div className="p-6">
        <h3 className="mb-5 flex items-center justify-center text-center font-titleFont text-xl font-semibold text-gray-800">
          <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
          Discrepancia en la Operación
        </h3>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Primera columna: ¿Hay discrepancia? */}
          <div className="flex flex-col items-center gap-4 md:w-1/3 md:items-start">
            <div className="w-full rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
              <p className="font-medium text-gray-800">¿Existe alguna discrepancia en esta operación?</p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleClick(true)}
                onMouseEnter={() => setIsHovering('yes-discrepancy')}
                onMouseLeave={() => setIsHovering(null)}
                className={`relative flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                  discrepancy === true
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-amber-500 hover:text-amber-600'
                } `}
                aria-pressed={discrepancy === true}
              >
                <AlertCircle className={`h-5 w-5 ${discrepancy === true ? 'text-white' : 'text-amber-500'}`} />
                <span>Sí</span>
                {isHovering === 'yes-discrepancy' && discrepancy !== true && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-amber-500 px-2 py-1 text-xs text-white">
                    Reportar discrepancia
                  </span>
                )}
              </button>

              <button
                onClick={() => handleClick(false)}
                onMouseEnter={() => setIsHovering('no-discrepancy')}
                onMouseLeave={() => setIsHovering(null)}
                className={`relative flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                  discrepancy === false
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-green-500 hover:text-green-600'
                } `}
                aria-pressed={discrepancy === false}
              >
                <CheckCircle className={`h-5 w-5 ${discrepancy === false ? 'text-white' : 'text-green-500'}`} />
                <span>No</span>
                {isHovering === 'no-discrepancy' && discrepancy !== false && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white">
                    Sin discrepancias
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Segunda columna: Motivo de discrepancia */}
          {discrepancy === true && (
            <div className="animate-fadeIn flex flex-col gap-4 md:w-2/3">
              <div className="rounded-lg border border-amber-200 bg-white p-4 shadow-sm">
                <label htmlFor="discrepancy-reason" className="mb-2 block text-sm font-medium text-gray-700">
                  Motivo de la Discrepancia <span className="text-red-500">*</span>
                </label>

                <div
                  className={`flex w-full items-center gap-3 rounded-lg p-1 transition-all duration-300 ${isInputFocused ? 'bg-amber-50 ring-2 ring-amber-300' : 'border border-gray-300 bg-white'} `}
                >
                  <input
                    id="discrepancy-reason"
                    type="text"
                    placeholder="Explica la discrepancia detalladamente"
                    className="h-10 flex-1 border-none bg-transparent px-3 text-gray-800 focus:outline-none"
                    value={discrepancyReason}
                    onChange={(e) => setDiscrepancyReason(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    aria-required="true"
                  />

                  <button
                    disabled={discrepancyReason.length === 0}
                    onClick={handleSubmitDiscrepancy}
                    className="flex h-10 items-center gap-2 rounded-lg bg-amber-500 px-4 font-medium text-white transition-colors duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    aria-label="Enviar motivo de discrepancia"
                  >
                    <Send className="h-4 w-4" />
                    <span>Enviar</span>
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Describe claramente cuál es la discrepancia encontrada en esta operación.
                </p>
              </div>

              {/* Tercera columna: Discrepancia resuelta */}
              <div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
                <h3 className="mb-4 flex items-center justify-center text-center font-titleFont text-lg font-medium text-gray-800">
                  <HelpCircle className="mr-2 h-5 w-5 text-blue-500" />
                  ¿Discrepancia Resuelta?
                </h3>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setResolved(true)}
                    onMouseEnter={() => setIsHovering('yes-resolved')}
                    onMouseLeave={() => setIsHovering(null)}
                    className={`relative flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                      resolved === true
                        ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                        : 'border border-gray-300 bg-white text-gray-700 hover:border-green-500 hover:text-green-600'
                    } `}
                    aria-pressed={resolved === true}
                  >
                    <CheckCircle className={`h-5 w-5 ${resolved === true ? 'text-white' : 'text-green-500'}`} />
                    <span>Sí, resuelta</span>
                    {isHovering === 'yes-resolved' && resolved !== true && (
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white">
                        Marcar como resuelta
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setResolved(false)}
                    onMouseEnter={() => setIsHovering('no-resolved')}
                    onMouseLeave={() => setIsHovering(null)}
                    className={`relative flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                      resolved === false
                        ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                        : 'border border-gray-300 bg-white text-gray-700 hover:border-red-500 hover:text-red-600'
                    } `}
                    aria-pressed={resolved === false}
                  >
                    <XCircle className={`h-5 w-5 ${resolved === false ? 'text-white' : 'text-red-500'}`} />
                    <span>No resuelta</span>
                    {isHovering === 'no-resolved' && resolved !== false && (
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-red-600 px-2 py-1 text-xs text-white">
                        Marcar como no resuelta
                      </span>
                    )}
                  </button>
                </div>

                {resolved === true && (
                  <div className="animate-fadeIn mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
                    <p className="flex items-center text-sm text-green-700">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      La discrepancia ha sido resuelta satisfactoriamente.
                    </p>
                  </div>
                )}

                {resolved === false && (
                  <div className="animate-fadeIn mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="flex items-center text-sm text-red-700">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      La discrepancia no ha sido resuelta. Se requiere atención adicional.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Indicador de estado */}
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
        } `}
      ></div>
    </section>
  );
};

export default DiscrepancySection;
