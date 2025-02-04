'use client';
import { useEffect, useState } from 'react';
import TransactionModal from '@/components/TransactionModal/transactionModal';
import Image from 'next/image';

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

export default function PracticaPage() {
  const transactionId = 'ebzay3pdht7';
  const [data, setData] = useState<Transaction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://apiswaplyar.vercel.app/api/v1/transactions')
      .then((response) => response.json())
      // .then((data) => setData(data[0])) // Get the first transaction
      .then((data) => {
        const filteredTransaction = data.find(
          (transaccion: Transaction) => transaccion.transaction.transaction_id === transactionId,
        );
        setData(filteredTransaction || null);
      })
      .catch((error) => console.error('Error fetching transactions:', error));
  }, []);
  console.log(data);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="min-h-[2000px] p-6">
      <h1 className="mb-4 text-2xl font-bold">Página de Práctica</h1>
      <ul>
        <li key={data.transaction.transaction_id} className="mb-2">
          <span>
            {data.sender.first_name} {data.sender.last_name} sent
            {data.amounts.sent.amount} {data.amounts.sent.currency} to
            {data.receiver.first_name} {data.receiver.last_name}.
          </span>
          <span> - Status: {data.status}</span>
          <span> - Date: {data.transaction.created_at}</span>
          <button onClick={openModal} className="ml-4 rounded bg-blue-600 px-4 py-2 text-white">
            Ver Detalles
          </button>
        </li>
      </ul>

      {modalOpen && <TransactionModal data={data} onClose={closeModal} />}
    </div>
  );
}
