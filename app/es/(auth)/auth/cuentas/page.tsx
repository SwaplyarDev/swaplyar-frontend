'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
/* import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select" */
import AddAccountForm from '@/components/wallets/add-account-form';
import WalletCard from '@/components/wallets/wallet-card';

export default function VirtualWallets() {
  const [open, setOpen] = useState(false);
  const [wallets, setWallets] = useState([
    {
      id: '1',
      type: 'paypal',
      name: 'PayPal',
      identifier: 'ejemplo@ejemplo.com',
      details: [
        {
          correo: 'ejemplo@ejemplo.com',
          nombre: 'Juan Perez',
        },
        {
          correo: 'ejemplo@ejemplo.com',
          nombre: 'Juan Perez',
        },
      ],
    },
    {
      id: '2',
      type: 'transferencia',
      name: 'Transferencia',
      identifier: '1234567890',
      details: [
        {
          cvu: '1234567890',
          dni: '1234567890',
          nombreBanco: 'Banco de ejemplo',
          nombreUsuario: 'Juan Perez',
        },
      ],
    },
    {
      id: '3',
      type: 'tether',
      name: 'Tether',
      identifier: '1234567890',
      details: [
        {
          direction: 'GJJHalsjdfjJOjjhsvdhfcssduhfHHON',
          red: 'Tron (TRC20)',
        },
      ],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.ejemplo.com';

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/wallets`);

        if (!response.ok) {
          throw new Error('Failed to fetch wallets');
        }

        const data = await response.json();
        setWallets(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching wallets:', err);
        /* setError("Error loading wallets. Please try again later.") */
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  return (
    <div className="mx-auto mb-24 mt-8 w-full max-w-[1000px] rounded-xl p-6 sm:my-6">
      <div className="mb-8 flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
          Cuentas de Billeteras Virtuales
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-md bg-[#012d8a] px-6 py-2 text-white">Añadir Cuenta</Button>
          </DialogTrigger>
          <DialogContent className="dark:border-[#373737] dark:bg-[#4B4B4B] sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl dark:text-white">Datos de la Cuenta</DialogTitle>
              <DialogDescription className="text-center text-gray-500 dark:text-white">
                Complete los datos para agregar una nueva cuenta
              </DialogDescription>
            </DialogHeader>
            <AddAccountForm />
            <DialogFooter className="flex sm:justify-between">
              <Button variant="outline" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Volver
              </Button>
              <Button type="submit" className="bg-[#012d8a] px-8 text-white">
                Agregar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-5">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">{error}</div>
        ) : wallets.length === 0 ? (
          <div className="py-10 text-center text-gray-500">No hay billeteras disponibles</div>
        ) : (
          wallets.map((wallet, index) => <WalletCard key={index} wallet={wallet} />)
        )}
      </div>
    </div>
  );
}
