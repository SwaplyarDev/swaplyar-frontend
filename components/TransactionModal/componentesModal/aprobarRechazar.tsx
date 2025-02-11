import { useState } from 'react';
import { updateTransaction } from '@/actions/transactions/transactions.action';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
export default function AprobarRechazar() {
  const [selected, setSelected] = useState<'aprobar' | 'stop' | 'rechazar' | null>(null);
  const [inputDenied, setInputDenied] = useState<TransactionTypeSingle>({
    transaction: {
      transaction: {
        transaction_id: '123456', // Esto debería venir dinámicamente de la transacción en contexto
        sender_accounts_id: '',
        receiver_accounts_id: '',
        country_transaction: '',
        message: '',
        created_at: new Date().toISOString(),
        user_id: null,
        status: 'denied',
        idAdmin: null,
      },
      sender: {
        first_name: '',
        last_name: '',
        identification: '',
        phone_number: '',
        email: '',
        payment_method_id: '',
      },
      receiver: {
        first_name: '',
        last_name: '',
        payment_method_id: '',
      },
      payment_method: {
        sender: {
          value: '',
          details: {
            email_account: '',
            transfer_code: '',
          },
        },
        receiver: {
          value: '',
          details: {
            bank_name: '',
            sender_method_key: '',
            sender_method_value: '',
            document_type: '',
            document_value: '',
          },
        },
      },
      amounts: {
        sent: {
          amount: '',
          currency: '',
        },
        received: {
          amount: '',
          currency: '',
        },
      },
      status: 'denied',
      proof_of_payment: {
        img_transaction: '',
      },
    },
  });
  //https://apiswaplyar.vercel.app/api/v1/transactions/1t2sfp3vkfb

  const handleClick = (button: 'aprobar' | 'stop' | 'rechazar') => {
    setSelected((prev) => (prev === button ? null : button));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDenied((prev) => ({
      ...prev,
      transaction: {
        ...prev.transaction,
        transaction: {
          ...prev.transaction.transaction,
          message: e.target.value, // Aquí guardamos el motivo del rechazo
        },
      },
    }));
  };

  const sendData = async (e: React.FormEvent) => {
    console.log(inputDenied);
    e.preventDefault();

    try {
      // Suponiendo que inputDenied es solo el motivo de rechazo, necesitas construir el objeto transaction
      const transactionData: TransactionTypeSingle = {
        transaction: {
          transaction: {
            transaction_id: 'ID_DE_EJEMPLO', // Aquí debes pasar el ID real de la transacción
            sender_accounts_id: '123456',
            receiver_accounts_id: '789012',
            country_transaction: 'Argentina',
            message: 'inputDenied', // Aquí se usa inputDenied como el mensaje de rechazo
            created_at: new Date().toISOString(),
            user_id: null,
            status: 'rechazado',
            idAdmin: 'admin123',
          },
          sender: {
            first_name: 'Juan',
            last_name: 'Pérez',
            identification: 'DNI 12345678',
            phone_number: '123456789',
            email: 'juan@example.com',
            payment_method_id: 'pm_001',
          },
          receiver: {
            first_name: 'María',
            last_name: 'López',
            payment_method_id: 'pm_002',
          },
          payment_method: {
            sender: {
              value: '1000',
              details: {
                email_account: 'juan@example.com',
                transfer_code: 'TRX1234',
              },
            },
            receiver: {
              value: '1000',
              details: {
                bank_name: 'Banco Ejemplo',
                sender_method_key: 'Clave',
                sender_method_value: 'Valor',
                document_type: 'DNI',
                document_value: '12345678',
              },
            },
          },
          amounts: {
            sent: {
              amount: '1000',
              currency: 'USD',
            },
            received: {
              amount: '950',
              currency: 'USD',
            },
          },
          status: 'rechazado',
          proof_of_payment: {
            img_transaction: 'imagen.jpg',
          },
        },
      };

      const response = await updateTransaction(transactionData);

      if (response) {
        console.log('Transacción actualizada con éxito:', response);
      } else {
        console.error('Error al actualizar la transacción');
      }
    } catch (error) {
      console.error('Error en sendData:', error);
    }
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
                selected === 'aprobar'
                  ? 'bg-[#0b5300] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                  : 'bg-[#d3d3d3]'
              }`}
              onClick={() => handleClick('aprobar')}
            >
              <button className="titleFont titleFont self-stretch text-center text-base font-normal">Aprobar</button>
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
              <button className="titleFont titleFont self-stretch text-center text-base font-normal">Rechazar</button>
            </article>
          </article>
        </article>
      </article>
      {selected === 'rechazar' && (
        <article>
          <div className="inline-flex h-[81px] w-[375px] flex-col items-start justify-start gap-1">
            <div className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
              <div className="shrink grow basis-0 font-['Inter'] text-xs font-normal leading-none text-[#252526]">
                Motivo del Rechazo
              </div>
            </div>
            <div className="inline-flex h-[41px] items-center justify-start gap-2.5 self-stretch rounded-lg py-2 pl-[9px] pr-2.5">
              <input
                className="shrink grow basis-0 rounded-lg font-['Inter'] text-base font-normal leading-none text-[#252526]"
                onChange={onChange}
              ></input>
              <article className="w-[1 0px] inline-flex flex-col items-center justify-center gap-2.5 rounded-lg bg-custom-blue px-2.5 py-1 text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <button
                  className="titleFont titleFont self-stretch text-center text-base font-normal"
                  onClick={sendData}
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
}
