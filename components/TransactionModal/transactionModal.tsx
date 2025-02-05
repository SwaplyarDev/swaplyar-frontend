'use client';
import { PixDarkImg, strokepopup, swaplyarAvatarpopup } from '@/utils/assets/img-database';
import { BankDarkImg, BankImg, PayoneerUsdDarkImg } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import { useState } from 'react';

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
    <section className="fixed right-0 top-28 max-h-[80vh] transform overflow-y-auto p-4 transition-transform duration-300 ease-in-out">
      <section className="relative h-[1584px] w-[891px] overflow-hidden rounded-bl-2xl rounded-tl-2xl bg-white">
        <article className="absolute left-[186px] top-[27px] inline-flex items-center justify-start gap-6">
          <h1 className="lightText font-sans text-4xl">Solicitud #{transaction.transaction_id}</h1>
        </article>
        <label className="absolute left-[40px] top-[331px] h-[66px] w-[812px] overflow-hidden rounded-lg border border-black">
          <article className="absolute left-[801px] top-[48px] h-[0px] w-2.5 origin-top-left rotate-[143.13deg] border border-black"></article>
          <article className="absolute left-[801px] top-[45px] h-[0px] w-[15px] origin-top-left rotate-[143.13deg] border border-black"></article>
          <input
            type="text"
            className="h-full w-full border-none px-3 py-2 outline-none"
            placeholder="Enter text here"
          />
        </label>
        <h2 className="lightText titleFont absolute left-[46px] top-[312px] text-base font-semibold">
          Mensaje del Cliente
        </h2>
        <article>
          <article className="absolute left-[23px] top-[100px] inline-flex w-[832.01px] items-center justify-center pb-10">
            {/* contenedor datos de solicitante  */}
            <article className="relative h-[165px] w-[832.01px]">
              <p className="lightText titleFont absolute left-[95px] top-0 text-xl font-semibold">
                Datos del Solicitante
              </p>
              <article className="absolute left-[108px] top-[25px] inline-flex h-[38px] w-[173px] flex-col items-start justify-start">
                <p className="lightText titleFont self-stretch">Nombre y Apellidos</p>
                <p className="lightText titleFont self-stretch">
                  {data.sender.first_name} {data.sender.last_name}{' '}
                </p>
              </article>

              <article className="absolute left-[111px] top-[74px] inline-flex h-[38px] w-[159px] flex-col items-start justify-start">
                <p className="lightText titleFont self-stretch">Correo Electronico</p>
                <p className="lightText titleFont self-stretch">{data.sender.email}</p>
              </article>

              <article className="absolute left-[86px] top-[70px] h-[0px] w-[217.01px] border border-[#979797]"></article>
              <article className="absolute left-[86px] top-[120px] h-[0px] w-[217.01px] border border-[#979797]"></article>
              <article className="absolute left-[115px] top-[120px] inline-flex h-[39px] w-[159px] flex-col items-start justify-start">
                <p className="lightText titleFont self-stretch text-base font-normal">N° Telefonico</p>
                <p className="titleFont titleFont self-stretch text-base font-normal">{data.sender.phone_number}</p>
              </article>
              <p className="lightText titleFont absolute left-[352px] top-0 text-xl font-semibold">
                Datos del Destinatario
              </p>
              <article className="absolute left-[347px] top-[28px] inline-flex h-[98px] w-[228px] flex-col items-start justify-start gap-px">
                <p className="lightText titleFont self-stretch text-base font-normal">Direccion USDT</p>
                <p className="titleFont titleFont self-stretch text-base font-normal">{data.receiver.first_name}</p>

                <article className="h-[0px] w-[217.01px] border border-[#979797]"></article>
                <article className="flex h-[38px] flex-col items-start justify-start">
                  <p className="lightText titleFont self-stretch text-base font-normal">RED</p>
                  <p className="lightText titleFont w-[228px] text-base font-light">TRON (TRC-20)</p>
                </article>
              </article>
              <article className="absolute left-[615px] top-0 inline-flex h-[165px] w-[217.01px] flex-col items-center justify-start gap-[3px]">
                <article className="flex h-9 flex-col items-end justify-start">
                  <p className="lightText titleFont self-stretch text-xl font-semibold">Datos del Pago</p>
                  <p className="lightText titleFont self-stretch text-right text-[10px] font-normal">
                    BILLETERA/MONEDA
                  </p>
                </article>
                <article className="flex h-[38px] flex-col items-start justify-start">
                  <p className="lightText titleFont self-stretch text-base font-normal">Monto a Transferir</p>
                  <article className="inline-flex items-center justify-end gap-1">
                    <p className="lightText titleFont text-base font-normal">450</p>
                    <p className="lightText titleFont text-base font-normal">/</p>
                    <article className="flex w-[71px] items-center justify-center">
                      <p className="lightText titleFont text-base font-normal">Payoneer</p>
                    </article>
                    <p className="lightText titleFont text-base font-normal">/</p>
                    <article className="flex h-[19px] w-8 items-center justify-center">
                      <p className="lightText titleFont text-base font-normal">EUR</p>
                    </article>
                  </article>
                </article>
                <article className="mt-1 h-[0px] w-[217.01px] border border-[#979797]"></article>
                <article className="flex h-[38px] flex-col items-start justify-start">
                  <p className="lightText titleFont self-stretch text-base font-normal">Monto a Recibir</p>
                  <article className="inline-flex items-center justify-start gap-0.5">
                    <p className="lightText titleFont text-base font-normal">387</p>
                    <article className="lightText titleFont text-base font-normal">/</article>
                    <article className="flex h-[19px] w-11 items-center justify-center">
                      <p className="lightText titleFont text-base font-normal">USDT</p>
                    </article>
                    <p className="lightText titleFont text-base font-normal">/</p>
                    <article className="flex h-[19px] w-11 items-center justify-center">
                      <p className="lightText titleFont text-base font-normal">USDT</p>
                    </article>
                  </article>
                </article>
                <article className="mt-1 h-[0px] self-stretch border border-[#979797]"></article>
                <article className="flex h-[38px] flex-col items-start justify-start">
                  <p className="lightText titleFont self-stretch text-base font-normal">Link del Comprobante</p>
                  <p className="titleFont self-stretch text-base font-normal text-[#012a8d]">
                    sdrg897ashf98sdfgn98......
                  </p>
                </article>
              </article>
              <article className="absolute left-0 top-0 h-10 w-10 overflow-hidden" />
            </article>
          </article>
          <article className="absolute left-[40px] top-[425px] inline-flex h-[1118px] flex-col items-end justify-center gap-6">
            <article className="inline-flex items-center justify-start gap-[98.25px] overflow-hidden rounded-[121px] border-2 border-[#012a8d] pb-[9px] pl-3.5 pr-[171.25px] pt-2">
              <article className="inline-flex h-[60px] w-[60px] items-center justify-center">
                <Image className="h-[60px] w-[60px]" src={swaplyarAvatarpopup} alt="avatar" width={200} height={200} />
              </article>
              <article className="inline-flex items-center justify-center gap-4 self-stretch">
                <article className="flex h-[70px] w-[200px] items-center justify-center">
                  <Image
                    className="h-[70px] w-[200px]"
                    alt="imagen1"
                    src={BankImg}
                    width={200}
                    height={70}
                    unoptimized={true}
                  />
                </article>
                <article className="flex w-[10%] flex-row items-center justify-center">
                  <Image
                    className="ml-3 h-[16px] w-[16px]"
                    alt="imagen1"
                    src={strokepopup}
                    width={19.167}
                    height={10.833}
                  />
                  <Image className="h-[16px] w-[16px]" alt="imagen1" src={strokepopup} width={19.167} height={10.833} />
                  <Image
                    className="mr-3 h-[16px] w-[16px]"
                    alt="imagen1"
                    src={strokepopup}
                    width={19.167}
                    height={10.833}
                  />
                </article>
                <article className="flex items-center justify-start gap-0.5" />
                <article className="flex h-[70px] w-[200px] items-center justify-center">
                  <Image
                    className="h-[70px] w-[200px]"
                    alt="imagen1"
                    src={PixDarkImg}
                    width={200}
                    height={70}
                    unoptimized={true}
                  />
                </article>
              </article>
            </article>
            <article className="flex h-[340px] flex-col items-start justify-start gap-4">
              <article className="flex h-[295px] w-[757px] flex-col items-end justify-start">
                <article className="flex h-[332px] flex-col items-start justify-start gap-2 self-stretch">
                  <article className="inline-flex items-center justify-start gap-4">
                    <article className="inline-flex h-[81px] w-[342px] flex-col items-center justify-center gap-2">
                      <article className="lightText titleFont text-xl font-medium">
                        La transferencia ha sido recibida y <br />
                        ya está reflejada en nuestra cuenta.
                      </article>
                      <article className="inline-flex items-center justify-start gap-4">
                        <article
                          className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                            selectedYesNo4 === 'si'
                              ? 'bg-[#0b5300] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                              : 'bg-[#d3d3d3]'
                          }`}
                          onClick={() => handleYesNoClick(setSelectedYesNo4, 'si')}
                        >
                          <button className="titleFont self-stretch text-center">SI</button>
                        </article>
                        <article
                          className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                            selectedYesNo4 === 'no'
                              ? 'bg-[#cd1818] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                              : 'bg-[#d3d3d3]'
                          }`}
                          onClick={() => handleYesNoClick(setSelectedYesNo4, 'no')}
                        >
                          <button className="titleFont titleFont self-stretch text-center text-base font-normal">
                            NO
                          </button>
                        </article>
                      </article>
                    </article>
                    {selectedYesNo4 === 'si' && (
                      <article className="inline-flex h-[81px] w-[262px] flex-col items-start justify-start gap-1">
                        <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
                          <p className="titleFont titleFont shrink grow basis-0 text-xs font-normal leading-none">
                            ID de la Transferencia
                          </p>
                        </article>
                        <label className="inline-flex h-[41px] items-center justify-start gap-2.5 self-stretch rounded-lg border border-[#252526] bg-white py-2 pl-[9px] pr-2.5">
                          <input
                            className="h-full w-full border-none outline-none focus:border-transparent focus:ring-0"
                            type="text"
                            placeholder="4536tygsdeyhe45"
                          />
                        </label>
                        <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
                          <article className="titleFont shrink grow basis-0 text-xs font-normal leading-none"></article>
                        </article>
                      </article>
                    )}
                  </article>
                  <article className="flex h-[117px] flex-col items-start justify-start gap-1">
                    <article className="inline-flex items-center justify-center gap-2">
                      <article className="relative h-6 w-6 overflow-hidden" />
                      <article className="flex items-center justify-start gap-2.5">
                        <p className="titleFont w-[379px] text-[10px] font-normal leading-none">
                          El botón STOP se usa para pausar el proceso de la operación en caso de detectar alguna
                          anomalía en la solicitud.
                        </p>
                      </article>
                    </article>
                    <article className="inline-flex items-center justify-start self-stretch">
                      <article className="inline-flex w-[382px] flex-col items-start justify-center gap-2.5 py-2.5">
                        <article className="flex h-[59px] flex-col items-center justify-start gap-2 self-stretch">
                          <article className="flex h-6 flex-col items-center justify-start gap-2 self-stretch">
                            <h2 className="lightText titleFont self-stretch text-xl font-medium">
                              Aprobar/Rechazar Solicitud
                            </h2>
                          </article>
                          <article className="inline-flex items-center justify-start gap-4 self-stretch">
                            {/* BOTONES */}
                            <article
                              className={`inline-flex w-[110px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                                selected === 'aprobar'
                                  ? 'bg-[#0b5300] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                                  : 'bg-[#d3d3d3]'
                              }`}
                              onClick={() => handleClick('aprobar')}
                            >
                              <button className="titleFont titleFont self-stretch text-center text-base font-normal">
                                Aprobar
                              </button>
                            </article>
                            <article
                              className={`inline-flex w-[110px] flex-col items-center justify-center gap-2.5 rounded-lg border-2 px-2.5 py-1 ${
                                selected === 'stop'
                                  ? 'border-[#cd1818] font-extrabold text-[#cd1818] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                                  : 'border-[#d3d3d3]'
                              }`}
                              onClick={() => handleClick('stop')}
                            >
                              {/*  */}
                              <button className="titleFont self-stretch text-center text-base">STOP</button>
                            </article>
                            <article
                              className={`inline-flex w-[110px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                                selected === 'rechazar'
                                  ? 'bg-[#cd1818] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                                  : 'bg-[#d3d3d3]'
                              }`}
                              onClick={() => handleClick('rechazar')}
                            >
                              <button className="titleFont titleFont self-stretch text-center text-base font-normal">
                                Rechazar
                              </button>
                            </article>
                          </article>
                        </article>
                      </article>
                      {selected === 'stop' && (
                        <article className="flex items-start justify-start gap-2">
                          <article className="inline-flex h-[81px] w-[375px] flex-col items-start justify-start gap-1">
                            <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
                              <p className="titleFont titleFont shrink grow basis-0 text-xs font-normal leading-none">
                                STOP
                              </p>
                            </article>
                            <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
                              <p className="titleFont titleFont shrink grow basis-0 text-xs font-normal leading-none">
                                Si los datos de la operación no coinciden (por ejemplo, si el monto es mayor o menor al
                                acordado), comunícate con el solicitante para resolverlo antes de continuar.
                              </p>
                            </article>
                          </article>
                        </article>
                      )}
                    </article>
                  </article>
                  <article className="inline-flex w-[685px] items-center justify-start gap-2">
                    <article className="inline-flex w-[150px] flex-col items-center justify-center gap-1.5">
                      <article className="lightText titleFont self-stretch text-xl font-medium">
                        Discrepancia <br />
                        en la Operacion
                      </article>
                      <article className="inline-flex items-center justify-start gap-4 self-stretch">
                        <article
                          className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                            selectedYesNo1 === 'si'
                              ? 'bg-[#0b5300] text-base font-medium text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                              : 'bg-[#d3d3d3]'
                          }`}
                          onClick={() => handleYesNoClick(setSelectedYesNo1, 'si')}
                        >
                          <button className="titleFont self-stretch text-center text-base">SI</button>
                        </article>
                        <article
                          className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                            selectedYesNo1 === 'no'
                              ? 'bg-[#cd1818] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                              : 'bg-[#d3d3d3]'
                          }`}
                          onClick={() => handleYesNoClick(setSelectedYesNo1, 'no')}
                        >
                          <button className="titleFont titleFont self-stretch text-center text-base font-normal">
                            NO
                          </button>
                        </article>
                      </article>
                    </article>
                    <article className="inline-flex h-[81px] w-[262px] flex-col items-start justify-start gap-1">
                      <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
                        <p className="titleFont shrink grow basis-0 text-xs font-normal leading-none">
                          Motivo de la Discrepancia
                        </p>
                      </article>
                      <label className="inline-flex h-[41px] items-center justify-start gap-2.5 self-stretch rounded-lg border border-[#252526] bg-white py-2 pl-[9px] pr-2.5">
                        <input
                          className="h-full w-full shrink border-none text-[13px] leading-none outline-none focus:border-transparent focus:ring-0"
                          placeholder="la direccion de la billetera no es valida"
                          // titleFont shrink grow basis-0 text-[15px] leading-none
                        />
                      </label>
                      <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5"></article>
                    </article>
                    <article className="inline-flex w-[217px] flex-col items-center justify-start gap-2">
                      <p className="lightText titleFont self-stretch text-xl font-medium">Discrepancia Resuelta</p>
                      <article className="inline-flex items-center justify-center gap-4 self-stretch">
                        <article
                          className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                            selectedYesNo2 === 'si'
                              ? 'bg-[#0b5300] text-base font-medium text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                              : 'bg-[#d3d3d3]'
                          }`}
                          onClick={() => handleYesNoClick(setSelectedYesNo2, 'si')}
                        >
                          <button className="titleFont self-stretch text-center text-base">SI</button>
                        </article>
                        <article
                          className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                            selectedYesNo2 === 'no'
                              ? 'bg-[#cd1818] text-base font-medium text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                              : 'bg-[#d3d3d3]'
                          }`}
                          onClick={() => handleYesNoClick(setSelectedYesNo2, 'no')}
                        >
                          <button className="titleFont titleFont self-stretch text-center text-base font-normal">
                            NO
                          </button>
                        </article>
                      </article>
                    </article>
                  </article>
                </article>
              </article>
              <article className="lightText titleFont text-2xl font-semibold">
                Informacion para realizar el Pago al cliente{' '}
              </article>
            </article>
            <article className="inline-flex h-10 items-center justify-center gap-2.5 rounded-lg border border-[#ffac79] bg-[#a78b79] p-2.5">
              <button className="titleFont titleFont text-base font-normal">Editar Destinatario</button>
            </article>
            <article className="inline-flex items-start justify-center gap-[78px]">
              <article className="inline-flex flex-col items-start justify-center gap-2">
                <p className="lightText titleFont text-xl font-semibold">Datos del Destinatario</p>
                <article className="h-[0px] w-[217.01px] border border-[#979797]"></article>
                <article className="flex h-[39px] flex-col items-start justify-start gap-px self-stretch">
                  <p className="lightText titleFont self-stretch text-base font-normal">Nombre y Apellidos</p>
                  <article className="titleFont titleFont self-stretch text-base font-normal">
                    {data.receiver.first_name}
                  </article>
                </article>
                <article className="h-[0px] w-[217.01px] border border-[#979797]"></article>
                <article className="flex h-[38px] flex-col items-start justify-start self-stretch">
                  <p className="lightText titleFont self-stretch text-base font-normal">Email a realizar el Pago</p>
                  <p className="lightText titleFont self-stretch text-base font-normal">
                    {data.payment_method.sender.details.email_account}
                  </p>
                </article>
              </article>
              <article className="inline-flex w-[440px] flex-col items-center justify-start gap-2">
                <article className="flex h-[162px] flex-col items-start justify-start self-stretch">
                  <article className="flex flex-col items-center justify-center gap-1">
                    <article className="flex h-[81px] flex-col items-center justify-start gap-2 self-stretch">
                      <article className="lightText titleFont text-center text-xl font-semibold">
                        Transferencia Realizada al Ciente
                      </article>
                      <article className="inline-flex items-center justify-start gap-4">
                        <article
                          className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                            selectedYesNo3 === 'si'
                              ? 'bg-[#0b5300] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                              : 'bg-[#d3d3d3]'
                          }`}
                          onClick={() => handleYesNoClick(setSelectedYesNo3, 'si')}
                        >
                          <button className="titleFont titleFont self-stretch text-center text-base font-normal">
                            SI
                          </button>
                        </article>
                        <article
                          className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                            selectedYesNo3 === 'no'
                              ? 'bg-[#cd1818] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                              : 'bg-[#d3d3d3]'
                          }`}
                          onClick={() => handleYesNoClick(setSelectedYesNo3, 'no')}
                        >
                          <button className="titleFont titleFont self-stretch text-center text-base font-normal">
                            NO
                          </button>
                        </article>
                      </article>
                    </article>
                  </article>
                  <article className="inline-flex items-center justify-start gap-2 self-stretch">
                    <article className="inline-flex h-[81px] w-[262px] flex-col items-center justify-center gap-1"></article>
                    <article className="inline-flex h-[81px] w-[170px] flex-col items-start justify-start gap-1"></article>
                  </article>
                </article>
                <article className="flex h-[82px] flex-col items-start justify-start">
                  <p className="lightText titleFont self-stretch text-center text-xl font-normal">Subir Comprobante</p>
                  <article className="flex h-[58px] w-[262px] flex-col items-start justify-start gap-2.5 rounded-lg bg-[#d3d3d3] p-2.5">
                    <article className="inline-flex h-[38px] items-center justify-center gap-[5px] self-stretch">
                      <button className="titleFont text-base font-normal text-[#415a97]">Subir Comprobante </button>
                      <article className="relative h-4 w-4 origin-top-left rotate-90 overflow-hidden" />
                    </article>
                  </article>
                </article>
              </article>
            </article>
            <article className="inline-flex h-6 w-[262px] items-center justify-start gap-2.5 p-[3px]">
              <article className="relative h-4 w-4 overflow-hidden" />
              <button className="titleFont text-center text-xl font-normal text-[#969696]">
                Link del comprobante{' '}
              </button>
            </article>
            <article className="flex h-[69px] flex-col items-start justify-start">
              <p className="text-[8px] font-medium text-custom-grayD">Mensaje</p>

              <label className="flex h-[59px] w-[812px] items-center overflow-hidden rounded-lg border border-custom-blue-800 px-3">
                <article className="absolute left-[12px] top-[3px] h-[0px] w-2.5 origin-top-left rotate-[143.13deg] border"></article>
                <article className="absolute left-[12px] top-0 h-[0px] w-[15px] origin-top-left rotate-[143.13deg] border"></article>
                <input
                  className="h-full w-full border-none outline-none focus:border-transparent focus:ring-0"
                  placeholder="Se realizó la modificación solicitada por el cliente con éxito."
                  type="text"
                />
              </label>
            </article>
            <article className="inline-flex items-center justify-start gap-[23px]">
              <article className="flex h-[75px] w-[200px] items-center justify-center gap-2.5 rounded-[45px] border-2 border-[#d0b8b8] p-1">
                <article className="flex shrink grow basis-0 items-center justify-center gap-2.5 self-stretch rounded-[45px] bg-[#b6a0a0] px-2 py-1">
                  <button className="titleFont titleFont text-2xl font-semibold">Rechazada</button>
                </article>
              </article>
              <article className="flex h-[75px] w-[200px] items-center justify-center gap-2.5 rounded-[45px] border-2 border-[#b8cfb8] p-1">
                <article className="flex shrink grow basis-0 items-center justify-center gap-2.5 self-stretch rounded-[45px] bg-[#9fb69f] px-2 py-1">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="titleFont titleFont text-2xl font-semibold"
                  >
                    {' '}
                    {loading ? 'Finalizado...' : 'Finalizado'}{' '}
                  </button>
                </article>
              </article>
            </article>
            <article className="flex h-[63px] flex-col items-end justify-start gap-[3px]">
              <p className="lightText titleFont self-stretch text-right text-base font-normal">
                Esta Solicitud fue Operada por :
              </p>
              <p className="lightText titleFont self-stretch text-right text-base font-normal">
                Jenifer Paola Gutierrez Torrez
              </p>
              <p className="lightText titleFont self-stretch text-right text-base font-normal">16:52 pm</p>
            </article>
          </article>
          <article className="absolute left-[35px] top-[21px] inline-flex h-[50px] w-[120px] items-center justify-center gap-2.5 rounded-[45px] border-2 border-[#012a8d] p-1">
            <article className="flex shrink grow basis-0 items-center justify-center gap-2.5 self-stretch rounded-[45px] bg-[#000c28] px-2 py-1">
              <button className="titleFont text-base font-semibold text-[#ebe7e0]">En Proceso</button>
            </article>
          </article>
          <article className="absolute left-[820px] top-[15px] inline-flex h-[41px] flex-col items-end justify-start gap-[3px]">
            <button onClick={onClose} className="relative h-6 w-9 overflow-hidden">
              x
            </button>
          </article>

          <article className="absolute left-[602px] top-[27px] inline-flex h-[41px] flex-col items-end justify-start gap-[3px]">
            <p className="lightText titleFont self-stretch text-right text-base font-normal">22 Jul 2024</p>
            <p className="lightText titleFont self-stretch text-right text-base font-normal">
              Jenifer Paola Gutierrez Torrez
            </p>
          </article>
          <article className="absolute left-[859px] top-[9px] h-6 w-6 overflow-hidden" />
        </article>
      </section>
    </section>
  );
}
