import { useEffect, useState } from 'react';
import { updateTransaction } from '@/actions/transactions/transactions.action';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { useTransactionStore } from '@/store/transactionModalStorage';
import Swal from 'sweetalert2';

interface AprobarRechazarProps {
  selected: 'stop' | 'accepted' | 'rejected' | null;
  onSelectChange: (value: 'stop' | 'accepted' | 'rejected' | null) => void;
  componentStates: {
    aprooveReject: 'stop' | 'accepted' | 'rejected' | null;
    confirmTransButton: boolean | null;
    discrepancySection: boolean | null;
    transferRealized: boolean;
  };
}

const AprobarRechazar: React.FC<AprobarRechazarProps> = ({ selected, onSelectChange }) => {
  const { componentStates } = useTransactionStore();

  if (componentStates.confirmTransButton === false && selected !== 'rejected') {
    onSelectChange('rejected');
  }
  const buttonAction = (action: string) => {
    Swal.fire({
      title: '¿Estás seguro que deseas rechazarlo?',

      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'rgb(1,42,142)',
      cancelButtonColor: 'rgb(205,24,24)',
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage('Debes ingresar un motivo');
        }
        return value;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Motivo enviado:', result.value);
      }
    });

    console.log(action);
  };

  return (
    <article className="inline-flex items-center justify-start self-stretch">
      <article className="inline-flex w-[382px] flex-col items-start justify-center gap-2.5 py-2.5">
        <article className="flex h-[59px] flex-col items-center justify-start gap-2 self-stretch">
          <article className="flex h-6 flex-col items-center justify-start gap-2 self-stretch">
            <h2 className="lightText titleFont self-stretch text-xl font-medium">Aprobar/Rechazar Solicitud</h2>
          </article>

          <article className="inline-flex items-center justify-start gap-4 self-stretch">
            {/* BOTONES */}
            <article
              className={`inline-flex w-[110px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                selected === 'accepted'
                  ? 'bg-[#0b5300] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                  : 'bg-[#d3d3d3]'
              } ${!componentStates.confirmTransButton && 'cursor-not-allowed'} `}
              onClick={() => {
                if (componentStates.confirmTransButton) {
                  onSelectChange('accepted');
                }
              }}
            >
              <button
                className={`titleFont titleFont self-stretch text-center text-base font-normal ${!componentStates.confirmTransButton && 'cursor-not-allowed'}`}
              >
                Aprobar
              </button>
            </article>
            <article
              className={`inline-flex w-[110px] flex-col items-center justify-center gap-2.5 rounded-lg border-2 px-2.5 py-1 ${
                selected === 'stop'
                  ? 'border-[#cd1818] font-extrabold text-[#cd1818] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                  : 'border-[#d3d3d3]'
              } ${!componentStates.confirmTransButton && 'cursor-not-allowed'}`}
              onClick={() => {
                if (componentStates.confirmTransButton) {
                  onSelectChange('stop');
                }
              }}
            >
              <button
                className={`titleFont self-stretch text-center text-base ${!componentStates.confirmTransButton && 'cursor-not-allowed'}`}
              >
                STOP
              </button>
            </article>
            <article
              className={`inline-flex w-[110px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                selected === 'rejected'
                  ? 'bg-[#cd1818] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                  : 'bg-[#d3d3d3]'
              }`}
              onClick={() => onSelectChange('rejected')}
            >
              <button className="titleFont titleFont self-stretch text-center text-base font-normal">Rechazar</button>
            </article>
          </article>
        </article>
      </article>
      {(selected === 'rejected' || componentStates.confirmTransButton === false) && (
        <article>
          <div className="inline-flex h-[81px] w-[375px] flex-col items-start justify-start gap-1">
            <div className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
              <div className="flex shrink grow basis-0 font-['Inter'] font-normal leading-none text-[#252526]">
                Motivo del Rechazo
              </div>
            </div>
            <div className="inline-flex h-[41px] items-center justify-start gap-2.5 self-stretch rounded-lg py-2 pl-[9px] pr-2.5">
              <input className="shrink grow basis-0 rounded-lg font-['Inter'] text-base font-normal leading-none text-[#252526]"></input>
              <article className="w-[1 0px] inline-flex flex-col items-center justify-center gap-2.5 rounded-lg bg-custom-blue px-2.5 py-1 text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <button
                  className="titleFont titleFont self-stretch text-center text-base font-normal"
                  onClick={() => buttonAction('rejected')}
                >
                  Enviar
                </button>
              </article>
            </div>
            <div className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5"></div>
          </div>
        </article>
      )}
      {selected === 'stop' && (
        <article className="flex items-start justify-start gap-2">
          <article className="inline-flex h-[81px] w-[375px] flex-col items-start justify-start gap-1">
            <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
              <p className="titleFont titleFont shrink grow basis-0 text-xs font-normal leading-none">STOP</p>
            </article>
            <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
              <p className="titleFont titleFont shrink grow basis-0 text-xs font-normal leading-none">
                Si los datos de la operación no coinciden (por ejemplo, si el monto es mayor o menor al acordado),
                comunícate con el solicitante para resolverlo antes de continuar.
              </p>
            </article>
          </article>
        </article>
      )}
    </article>
  );
};
export default AprobarRechazar;
