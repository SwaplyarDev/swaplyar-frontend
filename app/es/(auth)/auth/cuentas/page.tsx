'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import AddAccountForm from '@/components/wallets/addAccountForm';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import WalletIcon from '@/components/wallets/walletIcon';
import { deleteWalletAccount, getMyWalletAccounts } from '@/actions/virtualWalletAccount/virtualWallets.action';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { mapWalletFromApi } from '@/utils/wallet/mapWalletFromApi';
import { createHandleAccountAdd } from '@/utils/wallet/handleAccountAdded';
import ReusableWalletCard from '@/components/wallets/walletCard';
import { mapWalletDetails } from '@/utils/wallet/mapWalletDetails';
import clsx from 'clsx';
import { normalizeType } from '@/components/admin/utils/normalizeType';

interface Wallet {
  id: string;
  type: string;
  name: string;
  identifier?: string;
  details: any[];
  currency?: string;
  accountName?: string;
}

export default function VirtualWallets() {
  const { data: session } = useSession();
  const { isDark } = useDarkTheme();
  const [walletType, setWalletType] = useState('');
  const [open, setOpen] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const token = session?.accessToken;
    // Si hay error en sesión (por refresh inválido), cerrar sesión
    if ((session as any)?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/es/iniciar-sesion' });
      return;
    }
    if (!token || hasFetched.current) return;
    const fetchWallets = async () => {
      try {
        setLoading(true);
        const response = await getMyWalletAccounts(token);
        console.log('🔍 Datos crudos del backend:', JSON.stringify(response, null, 2));

        if (!Array.isArray(response)) {
          console.warn('La API no devolvió un array');
          setWallets([]);
          return;
        }

        const mapped = response.map(mapWalletFromApi).filter(Boolean); // Filtra los nulos
        setWallets(mapped);
        hasFetched.current = true;
      } catch (err: any) {
        console.error('Error fetching wallets:', err);
        if (err?.message === 'Unauthorized') {
          setError('Tu sesión expiró. Por favor, inicia sesión nuevamente.');
          await signOut({ callbackUrl: '/es/iniciar-sesion' });
          return;
        }
        setError('Error al cargar billeteras. Intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, [session]);

  const handleAccountAdded = createHandleAccountAdd({
    walletType,
    token: session?.accessToken!,
    setWallets,
    setOpen,
    session,
  });

  const orderedWallets = [...wallets].sort((a, b) => {
    const typeA = a?.type ?? '';
    const typeB = b?.type ?? '';
    if (typeA !== typeB) return typeA.localeCompare(typeB);

    const idA = a?.id ?? '';
    const idB = b?.id ?? '';
    return idA.localeCompare(idB);
  });

  const groupedWallets = orderedWallets.reduce(
    (acc, wallet) => {
      const detail = wallet.details?.[0] || {};
      const provider = detail.type; // ej: 'wise', 'payoneer'

      // La llamada correcta, usando los datos del detalle
      const normalized = normalizeType(wallet.type, provider, wallet.currency);

      if (!acc[normalized]) acc[normalized] = [];
      acc[normalized].push(wallet);
      return acc;
    },
    {} as { [key: string]: Wallet[] },
  );

  const handleDelete = async (accountId: string) => {
    console.log('FRONTEND: Enviando ID para eliminar:', accountId);
    const token = session?.accessToken;
    if (!token) {
      setError('No estás autenticado. Por favor, inicia sesión de nuevo.');
      return;
    }

    const originalWallets = [...wallets];

    setWallets((currentWallets) => currentWallets.filter((wallet) => wallet.id !== accountId));

    try {
      await deleteWalletAccount(accountId, token);
    } catch (error) {
      console.error('Error eliminando cuenta:', error);
      setError('No se pudo eliminar la cuenta. Inténtalo de nuevo.');
      setWallets(originalWallets);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#012A8E] dark:border-[#EBE7E0]"></div>
      </div>
    );
  }

  return (
    <section className="mx-auto mb-24 mt-20 w-full max-w-[1366px] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16">
      <div className="mb-8 flex flex-col gap-4">
        <div className="mb-4">
          <h1 className="text-start text-4xl font-bold text-gray-800 dark:text-darkText">
            Cuentas de Billeteras Virtuales
          </h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="mb-6 flex w-full justify-end px-2 sm:justify-end sm:px-0">
            <DialogTrigger asChild>
              <Button
                className={`${
                  isDark
                    ? 'bg-[#EBE7E0] text-black ring-offset-black hover:dark:ring-[#EBE7E0]'
                    : 'bg-[#012A8E] text-white hover:ring-[#012A8E]'
                } rounded-full px-8 py-4 text-xl font-semibold hover:ring-2 hover:ring-offset-2`}
              >
                Añadir Cuenta
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent
            className={clsx(
              'mx-auto flex h-[580px] w-[90%] max-w-md flex-col rounded-2xl p-0',
              isDark ? 'dark:border-[#373737] dark:bg-[#4B4B4B]' : 'bg-white',
            )}
          >
            <AddAccountForm
              onSubmitData={handleAccountAdded}
              walletType={walletType}
              setWalletType={setWalletType}
              isOpen={open}
              setOpen={setOpen}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-5">
        {error ? (
          <div className="py-10 text-center text-red-500">{error}</div>
        ) : wallets.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border bg-[#FFFFFB] p-8 text-center shadow-lg dark:border-gray-700 dark:bg-[#4B4B4B]">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-darkText">Aún no tienes billeteras</h2>
            <p className="max-w-md text-sm text-gray-600 dark:text-custom-grayD-100">
              Agrega una cuenta para recibir o enviar fondos y gestionarlas desde aquí.
            </p>
            <Button
              onClick={() => setOpen(true)}
              className={`${
                isDark
                  ? 'bg-[#EBE7E0] text-black ring-offset-black hover:dark:ring-[#EBE7E0]'
                  : 'bg-[#012A8E] text-white hover:ring-[#012A8E]'
              } rounded-full px-6 py-3 text-base font-semibold hover:ring-2 hover:ring-offset-2`}
            >
              Añadir Cuenta
            </Button>
            <p className="mt-2 text-xs text-gray-600 dark:text-custom-grayD-100">
              ¿Necesitas ayuda?{' '}
              <Link href="/es/centro-de-ayuda" className="font-medium text-[#012A8E] underline dark:text-[#EBE7E0]">
                Ver guía para agregar una cuenta
              </Link>
            </p>
          </div>
        ) : (
          Object.entries(groupedWallets).map(([type, group]) => (
            <div
              key={type}
              className="mx-auto w-full items-center rounded-3xl border bg-[#FFFFFB] py-4 shadow-lg dark:border-gray-700 dark:bg-[#4B4B4B]"
            >
              <div className="flex items-center justify-between sm:mb-6">
                <WalletIcon
                  accountType={type}
                  provider={group[0].name}
                  currency={group[0].details?.[0]?.currency}
                  accountName={group[0].accountName}
                />
              </div>
              <div className="space-y-4 bg-[#FFFFFB] dark:bg-[#4B4B4B]">
                {group.map((wallet) => (
                  <div key={wallet.id}>
                    <ReusableWalletCard
                      accountId={wallet.id}
                      details={mapWalletDetails(wallet)}
                      type={wallet.type}
                      onDelete={(accountId) => handleDelete(accountId)}
                    />
                    <hr className="mx-auto mt-2 h-0 w-full max-w-[80%] border-t-2 border-[#012ABE] dark:border-[#EBE7E0]" />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
