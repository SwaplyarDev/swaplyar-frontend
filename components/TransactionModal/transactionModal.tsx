'use client';
import { useState } from 'react';
import ConfirmarTransferencia from './componentesModal/botonesConfirmarTransferencia';
import AprobarRechazar from './componentesModal/aprobarRechazar';
import DetallesTransaccion from './componentesModal/detallesTransaccion';
import MensajeCliente from './componentesModal/mensajeCliente';
import ImagenesTranferencia from './componentesModal/imagenestranferencia';
import DiscrepanciaOperacion from './componentesModal/botonesDiscrepanciaOperacion';
import TransferenciaRealizadaCliente from './componentesModal/botonesTransferenciaRealizadaCliente';
import Image from 'next/image';
import { clipopup, quill_link } from '@/utils/assets/img-database';
import DatoDestinatario from './componentesModal/datoDestinatario';
import Mensaje from './componentesModal/mensaje';

interface Transaction {
  transaction: {
    transaction_id: string;
    sender_accounts_id: string;
    receiver_accounts_id: string;
    country_transaction: string;
    message: string;
    created_at: string;
    user_id: string | null;
    status: string;
    idAdmin: string | null;
  };
  sender: {
    first_name: string;
    last_name: string;
    identification: string;
    phone_number: string;
    email: string;
    payment_method_id: string;
  };
  receiver: {
    first_name: string;
    last_name: string;
    payment_method_id: string;
  };
  payment_method: {
    sender: {
      value: string;
      details: {
        email_account: string;
        transfer_code: string;
      };
    };
    receiver: {
      value: string;
      details: {
        bank_name: string;
        sender_method_key: string;
        sender_method_value: string;
        document_type: string;
        document_value: string;
      };
    };
  };
  amounts: {
    sent: {
      amount: string;
      currency: string;
    };
    received: {
      amount: string;
      currency: string;
    };
  };
  status: 'pending' | 'completed';
  proof_of_payment: {
    img_transaction: string;
  };
}

interface TransactionModalProps {
  data: Transaction;
  onClose: () => void;
  onUpdate?: (id: string, status: 'pending' | 'completed') => void;
}

export default function TransactionModal({ data, onClose, onUpdate }: TransactionModalProps) {
  //logica de boton
  const [selected, setSelected] = useState<'aprobar' | 'stop' | 'rechazar' | null>(null);
  const [selectedYesNo1, setSelectedYesNo1] = useState<'si' | 'no' | null>(null);
  const [selectedYesNo2, setSelectedYesNo2] = useState<'si' | 'no' | null>(null);
  const [selectedYesNo3, setSelectedYesNo3] = useState<'si' | 'no' | null>(null);
  const [selectedYesNo4, setSelectedYesNo4] = useState<'si' | 'no' | null>(null);

  const handleClick = (button: 'aprobar' | 'stop' | 'rechazar') => {
    setSelected((prev) => (prev === button ? null : button));
  };
  const handleYesNoClick = (setter: React.Dispatch<React.SetStateAction<'si' | 'no' | null>>, button: 'si' | 'no') => {
    setter((prev) => (prev === button ? null : button)); // Alternar selección
  };

  //logica de api
  const { transaction, receiver, sender } = data;
  const [status, setStatus] = useState<'pending' | 'completed'>(data.status);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/transactionStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: transaction.transaction_id, status }),
      });
      if (response.ok) {
        if (onUpdate) {
          onUpdate(transaction.transaction_id, status);
        }
        onClose();
      }
    } catch (error) {
      console.error('Error updating transaction status', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="titleFont fixed right-0 top-28 max-h-[80vh] transform overflow-y-auto p-4 transition-transform duration-300 ease-in-out">
      <section className="relative h-[1584px] w-[891px] overflow-hidden rounded-bl-2xl rounded-tl-2xl bg-white">
        <article className="absolute left-[186px] top-[27px] inline-flex items-center justify-start gap-6">
          <h1 className="lightText font-sans text-4xl">Solicitud #{transaction.transaction_id}</h1>
        </article>
        <MensajeCliente />
        <article>
          <DetallesTransaccion />
          <article className="absolute left-[40px] top-[425px] inline-flex h-[1118px] flex-col items-end justify-center gap-6">
            <ImagenesTranferencia />
            <article className="flex h-[340px] flex-col items-start justify-start gap-4">
              <article className="flex h-[295px] w-[757px] flex-col items-end justify-start">
                <article className="flex h-[332px] flex-col items-start justify-start gap-2 self-stretch">
                  <ConfirmarTransferencia />

                  <article className="flex h-[117px] flex-col items-start justify-start gap-1">
                    <article className="inline-flex items-center justify-center gap-2">
                      <article className="relative h-6 w-6 overflow-hidden" />
                      <article className="flex items-center justify-start gap-2.5">
                        <p className="w-[379px] text-[10px] font-normal leading-none">
                          El botón STOP se usa para pausar el proceso de la operación en caso de detectar alguna
                          anomalía en la solicitud.
                        </p>
                      </article>
                    </article>
                    <AprobarRechazar />
                  </article>
                  <article className="inline-flex w-[685px] items-center justify-start gap-2">
                    <DiscrepanciaOperacion />
                  </article>
                </article>
              </article>
              <article className="lightText text-2xl font-semibold">
                Informacion para realizar el Pago al cliente{' '}
              </article>
            </article>
            <article className="inline-flex h-10 items-center justify-center gap-2.5 rounded-lg border border-[#ffac79] bg-[#a78b79] p-2.5">
              <button className="text-base font-normal">Editar Destinatario</button>
            </article>
            <article className="inline-flex items-start justify-center gap-[78px]">
              <DatoDestinatario />
              <article className="inline-flex w-[440px] flex-col items-center justify-start gap-2">
                <article className="flex h-[162px] flex-col items-start justify-start self-stretch">
                  <TransferenciaRealizadaCliente />
                  <article className="inline-flex items-center justify-start gap-2 self-stretch"></article>
                </article>
                <article className="flex h-[82px] flex-col items-start justify-start">
                  <p className="lightText self-stretch text-center text-xl font-normal">Subir Comprobante</p>
                  <article className="flex h-[58px] w-[262px] flex-col items-start justify-start gap-2.5 rounded-lg bg-[#d3d3d3] p-2.5">
                    <article className="inline-flex h-[38px] items-center justify-center gap-[5px] self-stretch">
                      <button className="text-base font-normal text-[#415a97]">Subir Comprobante </button>
                      <Image className="mr-1" src={clipopup} alt="clip" width={16} height={16} />
                    </article>
                  </article>
                </article>
              </article>
            </article>
            <article className="inline-flex h-6 w-[262px] items-center justify-start gap-1 p-[3px]">
              <article className="relative h-4 w-4 overflow-hidden" />
              <Image src={quill_link} alt="quill_link" width={16} height={16} />
              <button className="text-center text-[#012a8d] underline">Link del comprobante </button>
            </article>
            <Mensaje />
            <article className="inline-flex items-center justify-start gap-[23px]">
              <article className="flex h-[75px] w-[200px] items-center justify-center gap-2.5 rounded-[45px] border-2 border-[#d0b8b8] p-1">
                <article className="flex shrink grow basis-0 items-center justify-center gap-2.5 self-stretch rounded-[45px] bg-[#b6a0a0] px-2 py-1">
                  <button className="text-2xl font-semibold">Rechazada</button>
                </article>
              </article>
              <article className="flex h-[75px] w-[200px] items-center justify-center gap-2.5 rounded-[45px] border-2 border-[#b8cfb8] p-1">
                <article className="flex shrink grow basis-0 items-center justify-center gap-2.5 self-stretch rounded-[45px] bg-[#9fb69f] px-2 py-1">
                  <button onClick={handleSave} disabled={loading} className="text-2xl font-semibold">
                    {' '}
                    {loading ? 'Finalizado...' : 'Finalizado'}{' '}
                  </button>
                </article>
              </article>
            </article>
            <article className="flex h-[63px] flex-col items-end justify-start gap-[3px]">
              <p className="lightText self-stretch text-right text-base font-normal">
                Esta Solicitud fue Operada por :
              </p>
              <p className="lightText self-stretch text-right text-base font-normal">Jenifer Paola Gutierrez Torrez</p>
              <p className="lightText self-stretch text-right text-base font-normal">16:52 pm</p>
            </article>
          </article>
          <article className="absolute left-[35px] top-[21px] inline-flex h-[50px] w-[120px] items-center justify-center gap-2.5 rounded-[45px] border-2 border-[#012a8d] p-1">
            <article className="flex shrink grow basis-0 items-center justify-center gap-2.5 self-stretch rounded-[45px] bg-[#000c28] px-2 py-1">
              <button className="text-base font-semibold text-[#ebe7e0]">En Proceso</button>
            </article>
          </article>
          <article className="absolute left-[820px] top-[15px] inline-flex h-[41px] flex-col items-end justify-start gap-[3px]">
            <button onClick={onClose} className="relative h-6 w-9 overflow-hidden">
              x
            </button>
          </article>

          <article className="absolute left-[602px] top-[27px] inline-flex h-[41px] flex-col items-end justify-start gap-[3px]">
            <p className="lightText self-stretch text-right text-base font-normal">22 Jul 2024</p>
            <p className="lightText self-stretch text-right text-base font-normal">Jenifer Paola Gutierrez Torrez</p>
          </article>
          <article className="absolute left-[859px] top-[9px] h-6 w-6 overflow-hidden" />
        </article>
      </section>
    </section>
  );
}
