'use client';

import { Wallet as WalletList } from '@/types/wallets';
import { CreditCard, ChevronDown } from 'lucide-react';
import { Logos, tipoCuenta } from './WalletList';

interface WalletsListProps {
  wallet: WalletList;
  onSelectWallet: (wallet: any) => void;
}

export function WalletDetail({ wallet, onSelectWallet }: WalletsListProps) {
  const transactions = [
    {
      id: 1,
      type: 'deposit',
      title: 'Depósito recibido',
      amount: '+$250.00',
      date: '27 Mar 2025',
      time: '10:45 AM',
    },
    {
      id: 2,
      type: 'payment',
      title: 'Pago de servicio',
      amount: '-$45.99',
      date: '25 Mar 2025',
      time: '08:30 AM',
    },
    {
      id: 3,
      type: 'transfer',
      title: 'Transferencia enviada',
      amount: '-$120.50',
      date: '20 Mar 2025',
      time: '15:22 PM',
    },
    {
      id: 4,
      type: 'refund',
      title: 'Reembolso',
      amount: '+$35.00',
      date: '18 Mar 2025',
      time: '11:15 AM',
    },
  ];


  return (
    <div className="mb-4">
      <button
        onClick={() => onSelectWallet(null)}
        className="mb-4 flex items-center text-blue-600 hover:underline dark:text-blue-400"
      >
        <ChevronDown className="mr-1 h-4 w-4 rotate-90" />
        <span>Volver a la lista</span>
      </button>

      {/* Wallet Info */}
      <div className="rounded-t-lg border-b bg-white p-4 dark:border-gray-700 dark:bg-gray-800/90">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center">
              <Logos wallet={wallet} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold dark:text-white">{wallet.accountName}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">ID: {wallet.details[0].userAccount.account_id}</p>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  wallet.details[0].userAccount.status ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {wallet.details[0].userAccount.status ? 'Activa' : 'Inactiva'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Details */}
      <div className="border-b p-4">
        <h4 className="mb-2 font-medium">Detalles de la {tipoCuenta(wallet.payment_type)}</h4>
      </div> 
      <div className="border-b p-4">
        {wallet.details[0].email && <p className="text-gray-600 dark:text-gray-400">Email: {wallet.details[0].email}</p>}
        {wallet.details[0].firstName && <p className="text-gray-600 dark:text-gray-400">Nombre: {wallet.details[0].firstName}</p>}
        {wallet.details[0].lastName && <p className="text-gray-600 dark:text-gray-400">Apellido: {wallet.details[0].lastName}</p>}
        {wallet.details[0].bank_name && <p className="text-gray-600 dark:text-gray-400">Banco: {wallet.details[0].bank_name}</p>}
        {wallet.details[0].currency && <p className="text-gray-600 dark:text-gray-400">Moneda: {wallet.details[0].currency}</p>}
        {wallet.details[0].send_method_key && <p className="text-gray-600 dark:text-gray-400">{wallet.details[0].send_method_key}: {wallet.details[0].send_method_value}</p>}
        {wallet.details[0].document_type && wallet.details[0].document_value && <p className="text-gray-600 dark:text-gray-400">{wallet.details[0].document_type}: {wallet.details[0].document_value}</p>}
        {wallet.details[0].transfer_code && <p className="text-gray-600 dark:text-gray-400">Código de Transferencia: {wallet.details[0].transfer_code}</p>}
        {wallet.details[0].receiver_crypto && <p className="text-gray-600 dark:text-gray-400">Receptor Cripto: {wallet.details[0].receiver_crypto}</p>}
        {wallet.details[0].network && <p className="text-gray-600 dark:text-gray-400">Red: {wallet.details[0].network}</p>}
        {wallet.details[0].wallet && <p className="text-gray-600 dark:text-gray-400">Billetera: {wallet.details[0].wallet}</p>}
        {wallet.details[0].iban && <p className="text-gray-600 dark:text-gray-400">IBAN: {wallet.details[0].iban}</p>}
        {wallet.details[0].bic && <p className="text-gray-600 dark:text-gray-400">BIC: {wallet.details[0].bic}</p>}
        {wallet.details[0].wise_id && <p className="text-gray-600 dark:text-gray-400">ID de Wise: {wallet.details[0].wise_id}</p>}
        {wallet.details[0].pix_key && <p className="text-gray-600 dark:text-gray-400">Clave PIX: {wallet.details[0].pix_key}</p>}
        {wallet.details[0].pix_value && <p className="text-gray-600 dark:text-gray-400">Valor PIX: {wallet.details[0].pix_value}</p>}
        {wallet.details[0].cpf && <p className="text-gray-600 dark:text-gray-400">CPF: {wallet.details[0].cpf}</p>}
        {wallet.details[0].cpf && <p className="text-gray-600 dark:text-gray-400">Creada: {wallet.details[0].userAccount.createdAt}</p>}

      </div>

      {/* Recent Transactions */}
      <div className="border-b p-4">
        <h4 className="mb-2 font-medium">Transacciones recientes</h4>
      </div> 

      {/* Transactions List */}
      <div className="flex-1 divide-y overflow-y-auto">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 transition-colors hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    transaction.type === 'deposit' || transaction.type === 'refund'
                      ? 'bg-green-50'
                      : transaction.type === 'transfer'
                        ? 'bg-purple-50'
                        : 'bg-blue-50'
                  }`}
                >
                  <CreditCard
                    className={`h-5 w-5 ${
                      transaction.type === 'deposit' || transaction.type === 'refund'
                        ? 'text-green-600'
                        : transaction.type === 'transfer'
                          ? 'text-purple-600'
                          : 'text-blue-600'
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="mt-0.5 text-sm text-gray-600">{transaction.date}</p>
                  <p className="mt-1 text-xs text-gray-500">{transaction.time}</p>
                </div>
              </div>
              <p className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.amount}
              </p>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
}

