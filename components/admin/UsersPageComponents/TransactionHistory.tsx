import { CreditCard } from 'lucide-react';

export function TransactionHistory() {
  return (
    <div className="divide-y">
      <div className="bg-gray-50 p-3">
        <h3 className="text-sm font-medium text-gray-500">Hoy</h3>
      </div>

      <div className="p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Depósito recibido</p>
              <p className="mt-0.5 text-sm text-gray-600">Mastercard •••• 9334</p>
              <p className="mt-1 text-xs text-gray-500">10:45 AM</p>
            </div>
          </div>
          <p className="font-semibold text-green-600">+$250.00</p>
        </div>
      </div>

      <div className="p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Pago de servicio</p>
              <p className="mt-0.5 text-sm text-gray-600">PayPal</p>
              <p className="mt-1 text-xs text-gray-500">08:30 AM</p>
            </div>
          </div>
          <p className="font-semibold text-red-600">-$45.99</p>
        </div>
      </div>

      <div className="bg-gray-50 p-3">
        <h3 className="text-sm font-medium text-gray-500">Ayer</h3>
      </div>

      <div className="p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
              <CreditCard className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium">Transferencia enviada</p>
              <p className="mt-0.5 text-sm text-gray-600">Wire Transfer</p>
              <p className="mt-1 text-xs text-gray-500">15:22 PM</p>
            </div>
          </div>
          <p className="font-semibold text-red-600">-$120.50</p>
        </div>
      </div>

      <div className="p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Reembolso</p>
              <p className="mt-0.5 text-sm text-gray-600">Mastercard •••• 9334</p>
              <p className="mt-1 text-xs text-gray-500">11:15 AM</p>
            </div>
          </div>
          <p className="font-semibold text-green-600">+$35.00</p>
        </div>
      </div>

      <div className="bg-gray-50 p-3">
        <h3 className="text-sm font-medium text-gray-500">Semana pasada</h3>
      </div>

      <div className="p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Suscripción mensual</p>
              <p className="mt-0.5 text-sm text-gray-600">PayPal</p>
              <p className="mt-1 text-xs text-gray-500">Mar 20, 2025</p>
            </div>
          </div>
          <p className="font-semibold text-red-600">-$15.99</p>
        </div>
      </div>
    </div>
  );
}
