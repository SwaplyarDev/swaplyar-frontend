'use client';

import { useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { CheckCircle, XCircle, Clock, X, User, FileText } from 'lucide-react';
import { TransactionService } from './ui/TransactionService';

const MySwal = withReactContent(Swal);

const FinalSection = ({ transId }: { transId: string }) => {
  const { data: session } = useSession();
  const userName = session?.user.name;
  const [note, setNote] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const handleApprove = () => {
    MySwal.fire({
      title: 'Confirmar aprobación',
      html: `
        <div class="flex flex-col items-center">
          <p class="mb-2 text-gray-700">¿Estás seguro que deseas aprobar esta solicitud?</p>
          ${
            note
              ? `
            <div class="bg-gray-100 p-3 rounded-lg w-full max-w-xs text-left mt-2">
              <p class="font-medium text-gray-800 mb-1">Nota:</p>
              <p class="text-gray-700">${note}</p>
            </div>
          `
              : ''
          }
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Aprobar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#0B5300',
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
          title: 'Solicitud aprobada',
          text: 'La solicitud ha sido aprobada exitosamente',
          icon: 'success',
          confirmButtonColor: '#0B5300',
          timer: 2000,
          timerProgressBar: true,
        });
        console.log('Solicitud aprobada con nota:', note);
        // Aquí puedes agregar la lógica para guardar la aprobación
      }
    });
  };

  const handleReject = () => {
    MySwal.fire({
      title: 'Confirmar rechazo',
      html: `
        <div class="flex flex-col items-center">
          <p class="mb-2 text-gray-700">¿Estás seguro que deseas rechazar esta solicitud?</p>
          ${
            note
              ? `
            <div class="bg-gray-100 p-3 rounded-lg w-full max-w-xs text-left mt-2">
              <p class="font-medium text-gray-800 mb-1">Nota:</p>
              <p class="text-gray-700">${note}</p>
            </div>
          `
              : ''
          }
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Rechazar',
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

  return (
    <section className="mt-6 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Campo de notas */}
          <div className="w-full">
            <label htmlFor="process-note" className="mb-2 block flex items-center text-sm font-medium text-gray-700">
              <FileText className="mr-1 h-4 w-4 text-gray-500" />
              Notas del proceso
            </label>

            <div
              className={`flex w-full items-start rounded-lg p-1 transition-all duration-300 ${isInputFocused ? 'bg-blue-50 ring-2 ring-blue-300' : 'border border-gray-300 bg-white'} `}
            >
              <textarea
                id="process-note"
                placeholder="Proporcione una nota de cómo fue el proceso de la solicitud"
                className="min-h-[4.25rem] flex-1 resize-y border-none bg-transparent p-3 text-gray-800 focus:outline-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
            </div>
          </div>

          {/* Botones de acción principales */}
          <div className="flex flex-col justify-end gap-4 md:flex-row md:gap-6">
            <button
              onClick={handleReject}
              onMouseEnter={() => setIsHovering('reject')}
              onMouseLeave={() => setIsHovering(null)}
              className="relative flex items-center justify-center gap-2 rounded-lg border-2 border-red-500 bg-white px-6 py-3 font-medium text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Rechazar solicitud"
            >
              <XCircle className="h-5 w-5" />
              <span className="text-lg">Rechazar</span>
              {isHovering === 'reject' && (
                <span className="animate-fadeIn absolute -top-10 right-0 whitespace-nowrap rounded bg-red-600 px-2 py-1 text-xs text-white">
                  Rechazar esta solicitud
                </span>
              )}
            </button>

            <button
              onClick={handleApprove}
              onMouseEnter={() => setIsHovering('approve')}
              onMouseLeave={() => setIsHovering(null)}
              className="relative flex items-center justify-center gap-2 rounded-lg border-2 border-green-500 bg-white px-6 py-3 font-medium text-green-600 transition-all duration-300 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Aprobar solicitud"
            >
              <CheckCircle className="h-5 w-5" />
              <span className="text-lg">Aprobar</span>
              {isHovering === 'approve' && (
                <span className="animate-fadeIn absolute -top-10 right-0 whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs text-white">
                  Aprobar esta solicitud
                </span>
              )}
            </button>
          </div>

          {/* Información del operador */}
          <div className="mt-4 flex items-center justify-end">
            <p className="flex items-center text-sm text-gray-600">
              <User className="mr-1 h-4 w-4 text-gray-500" />
              Esta solicitud fue operada por:
              <span className="ml-1 font-medium text-gray-800">{userName || 'Usuario no identificado'}</span>
            </p>
          </div>

          {/* Botones de estado y cierre */}
          <div className="mt-2 flex flex-wrap items-center justify-end gap-4">
            <button
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Marcar como en proceso"
            >
              <Clock className="h-4 w-4" />
              <span>En Proceso</span>
            </button>

            <button
              onClick={() => MySwal.close()}
              onMouseEnter={() => setIsHovering('close')}
              onMouseLeave={() => setIsHovering(null)}
              className="relative flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Cerrar modal"
            >
              <X className="h-4 w-4" />
              <span>Cerrar</span>
              {isHovering === 'close' && (
                <span className="animate-fadeIn absolute -top-10 right-0 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-xs text-white">
                  Cerrar sin guardar cambios
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Indicador de estado */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </section>
  );
};

export default FinalSection;
