'use client';

import type React from 'react';
import RecieverData from '@/components/TransactionModal/componentesModal/RecieverData';
import { useTransactionStore } from '@/store/transactionModalStorage';
import TransferClient from './TransferClient';
import { useState } from 'react';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { Edit, AlertTriangle, ArrowLeftRight } from 'lucide-react';
import ModalEditReciever from './ModalEditReciever/ModalEditReciever';

interface ClientInformationProps {
  trans: TransactionTypeSingle;
  modal: boolean;
  setModal: (arg: boolean) => void;
}

const ClientInformation: React.FC<ClientInformationProps> = ({ modal, setModal }) => {
  const { trans } = useTransactionStore();
  const { transaction } = trans;

  return (
    <section className="mt-6 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h2 className="flex items-center text-xl font-semibold text-gray-800 md:text-2xl">
            {transaction.regret_id ? (
              <ArrowLeftRight className="mr-2 h-6 w-6 text-red-500" />
            ) : (
              <ArrowLeftRight className="mr-2 h-6 w-6 text-blue-600" />
            )}
            {transaction.regret_id ? 'Información para el Reembolso' : 'Información para realizar el Pago'}
          </h2>

          <button
            onClick={() => {
              setModal(!modal);
            }}
            className="relative mt-4 flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-700 px-4 py-2 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 md:mt-0"
            aria-label="Editar destinatario"
          >
            <Edit className="h-4 w-4" />
            <span>Editar Destinatario</span>
          </button>
        </div>

        {modal && <ModalEditReciever modal={modal} setModal={setModal} trans={trans} />}

        {transaction.regret_id && (
          <div className="animate-fadeIn mb-6 rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
              <div>
                <h3 className="mb-1 font-medium text-red-800">Reembolso requerido</h3>
                <p className="text-sm text-red-700">
                  Si la discrepancia no fue resuelta, se tiene que generar el reembolso del dinero al cliente, a la
                  cuenta de origen.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800">
            {transaction.regret_id ? (
              <>
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                Realizar el Reembolso al cliente a la cuenta de Origen
              </>
            ) : (
              <>
                <ArrowLeftRight className="mr-2 h-5 w-5 text-blue-600" />
                Información para realizar el Pago al cliente
              </>
            )}
          </h3>

          <div className="mt-4 flex flex-col gap-6 md:flex-row">
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:w-1/2">
              <RecieverData trans={trans} />
            </div>

            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm md:w-1/2">
              <TransferClient />
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de estado */}
      <div
        className={`h-1.5 w-full transition-all duration-500 ${transaction.regret_id ? 'bg-red-500' : 'bg-blue-500'} `}
      ></div>
    </section>
  );
};

export default ClientInformation;
