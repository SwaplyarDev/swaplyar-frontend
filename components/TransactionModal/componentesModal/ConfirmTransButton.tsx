'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import Swal from 'sweetalert2';
import { CheckCircle, XCircle, Send, AlertCircle } from 'lucide-react';

interface ConfirmTransButtonProps {
  value: boolean | null;
  setValue: (arg: boolean) => void;
  trans: TransactionTypeSingle;
}

const ConfirmTransButton: React.FC<ConfirmTransButtonProps> = ({ trans, value, setValue }) => {
  const [selected, setSelected] = useState<boolean | null>(value);
  const [transferId, setTransferId] = useState<string>(trans.payment_method?.sender?.details?.transfer_code || '');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  useEffect(() => {
    // Sincronizar el estado local con el prop value cuando cambie
    setSelected(value);
  }, [value]);

  const handleSubmitTransferId = () => {
    if (!transferId.trim()) {
      /* @ts-ignore */
      Swal.fire({
        title: 'Campo requerido',
        text: 'Por favor ingresa el ID de la transferencia',
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
      title: 'Confirmar ID de transferencia',
      html: `
        <div class="flex flex-col items-center">
          <p class="mb-2 text-gray-700">¿Estás seguro de agregar este ID?</p>
          <div class="bg-gray-100 p-3 rounded-lg w-full max-w-xs text-center">
            <span class="font-medium text-gray-800">${transferId}</span>
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
          title: 'ID registrado',
          text: 'El ID de transferencia ha sido registrado exitosamente',
          icon: 'success',
          confirmButtonColor: 'rgb(1,42,142)',
          timer: 2000,
          timerProgressBar: true,
        });
        console.log('ID de transferencia enviado:', transferId);
        // Aquí puedes agregar la lógica para guardar el ID
      }
    });
  };

  const handleClick = (newValue: boolean) => {
    setValue(newValue);
    setSelected(newValue);
  };

  return (
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
  );
};

export default ConfirmTransButton;
