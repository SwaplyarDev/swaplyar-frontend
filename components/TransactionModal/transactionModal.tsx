'use client';
import { useState, useEffect } from 'react';
import AprobarRechazar from './componentesModal/aprobarRechazar';
import DetallesTransaccion from './componentesModal/detallesTransaccion';
import MensajeCliente from './componentesModal/mensajeCliente';
import InfoStatus from './componentesModal/InfoStatus';
import ImagenesTranferencia from './componentesModal/imagenestranferencia';
import DiscrepanciaOperacion from './componentesModal/botonesDiscrepanciaOperacion';
import TransferenciaRealizadaCliente from './componentesModal/botonesTransferenciaRealizadaCliente';
import Image from 'next/image';
import { TransactionTypeSingle, emptyTransaction } from '@/types/transactions/transactionsType';
import { clipopup } from '@/utils/assets/img-database';
import DatoDestinatario from './componentesModal/datoDestinatario';
import Mensaje from './componentesModal/mensaje';
import { getTransactionById } from '@/actions/transactions/transactions.action';

interface TransactionModalProps {
  modal: boolean;
  setModal: (arg: boolean) => void;
  transId: string;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ modal, setModal, transId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trans, setTransaction] = useState<TransactionTypeSingle>(emptyTransaction);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        if (transId) {
          const trans = await getTransactionById(transId);
          if (trans !== null) {
            setTransaction(trans);
            console.log('Transaction state updated:', trans);
          }
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [transId]);

  return (
    <section
      onClick={() => setModal(!modal)}
      className={`fixed right-0 z-[101] flex w-full justify-end bg-gray-900/[0.4] ${modal ? 'visible' : 'invisible'}`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className={`my-28 flex max-h-[48rem] flex-col gap-8 overflow-y-auto rounded-lg bg-white p-6 font-textFont shadow-lg transition-all duration-300 ${modal ? 'opacity-100' : 'translate-x-[30vw] opacity-0'}`}
      >
        <InfoStatus trans={trans} transId={transId} />
        <DetallesTransaccion transaction={trans} isLoading={isLoading} />
        <ImagenesTranferencia trans={trans} />

        <AprobarRechazar />
        <DiscrepanciaOperacion />
        <h2 className="lightText text-2xl font-semibold">Información para realizar el pago al cliente</h2>
        <button className="rounded-lg border border-[#ffac79] bg-[#a78b79] p-2.5">Editar Destinatario</button>
        <DatoDestinatario />
        <TransferenciaRealizadaCliente />
        <p className="lightText text-center text-xl">Subir Comprobante</p>
        <button className="flex items-center gap-2 rounded-lg bg-[#d3d3d3] p-2.5">
          Subir Comprobante <Image src={clipopup} alt="clip" width={16} height={16} />
        </button>
        <button className="text-[#012a8d] underline">Link del comprobante</button>
        <Mensaje />
        <div className="flex gap-5">
          <button className="rounded-full border-2 border-[#d0b8b8] bg-[#b6a0a0] p-2.5 text-2xl font-semibold">
            Rechazada
          </button>
          <button className="rounded-full border-2 border-[#b8cfb8] bg-[#9fb69f] p-2.5 text-2xl font-semibold">
            Aprobada
          </button>
        </div>
        <p className="lightText text-right text-base">
          Esta solicitud fue operada por: Jenifer Paola Gutierrez Torrez - 16:52 pm
        </p>
        <button className="rounded-full border-2 border-[#012a8d] bg-[#000c28] p-2.5 text-base font-semibold text-[#ebe7e0]">
          En Proceso
        </button>
        <button onClick={() => setModal(false)} className="text-xl font-bold">
          Cerrar
        </button>
      </section>
    </section>
  );
};

export default TransactionModal;
