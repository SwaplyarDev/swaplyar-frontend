'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import AddAccountForm from '@/components/wallets/addAccountForm';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import WalletIcon from '@/components/wallets/walletIcon';
import { deleteWalletAccount1, getMyWalletAccounts } from '@/actions/virtualWalletAccount/virtualWallets.action';
import { useSession } from 'next-auth/react';
import { mapWalletFromApi } from '@/utils/wallet/mapWalletFromApi';
import { createHandleAccountAdd } from '@/utils/wallet/handleAccountAdded';
import ReusableWalletCard from '@/components/wallets/walletCard';
import { mapWalletDetails } from '@/utils/wallet/mapWalletDetails';
import clsx from 'clsx';

interface Wallet {
  id: string;
  type: string;
  name: string;
  identifier: string;
  details: any[];
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
    if (!token || hasFetched.current) return;
    const fetchWallets = async () => {
      try {
        setLoading(true);
        const response = await getMyWalletAccounts(token);
        const mapped = response.map(mapWalletFromApi);

        setWallets(mapped);
        hasFetched.current = true;
      } catch (err) {
        console.error('Error fetching wallets:', err);
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
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    return a.id.localeCompare(b.id);
  });

  const groupedWallets = orderedWallets.reduce(
    (acc, wallet) => {
      if (!acc[wallet.type]) acc[wallet.type] = [];
      acc[wallet.type].push(wallet);
      return acc;
    },
    {} as { [key: string]: Wallet[] },
  );

  const normalizeType = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'virtual_bank':
      case 'virtualbank':
        return 'virtualBank';
      case 'receiver_crypto':
      case 'crypto':
        return 'crypto';
      case 'paypal':
        return 'paypal';
      case 'wise':
        return 'wise';
      case 'pix':
        return 'pix';
      case 'payoneer':
        return 'payoneer';
      case 'bank':
      case 'banco':
      case 'transferencia':
        return 'bank';
      default:
        return type;
    }
  };

  const handleDelete = async (accountId: string, typeAccount: string) => {
    try {
      const token = session?.accessToken;
      if (!token) throw new Error('No hay token disponible');

      const normalizedType = normalizeType(typeAccount);
      await deleteWalletAccount1(accountId, token, normalizedType);

      const updated = await getMyWalletAccounts(token);

      setWallets(updated.map(mapWalletFromApi));
    } catch (error) {
      console.error('Error eliminando cuenta:', error);
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
    <div className="mx-auto mb-24 mt-20 w-full max-w-[1366px] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16">
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
          <div className="py-10 text-center text-gray-500">No hay billeteras disponibles</div>
        ) : (
          Object.entries(groupedWallets).map(([type, group]) => (
            <div
              key={type}
              className="mx-auto w-full items-center rounded-3xl border bg-[#FFFFFB] py-4 shadow-lg dark:border-gray-700 dark:bg-[#4B4B4B]"
            >
              <div className="flex items-center justify-between sm:mb-6">
                <WalletIcon type={type} />
              </div>
              <div className="space-y-6 bg-[#FFFFFB] dark:bg-[#4B4B4B]">
                {group.map((wallet, index) => (
                  <div key={wallet.id}>
                    <ReusableWalletCard
                      accountId={wallet.id}
                      details={mapWalletDetails(wallet)}
                      type={wallet.type}
                      onDelete={(accountId, typeAccount) => handleDelete(accountId, typeAccount)}
                    />
                    {index !== group.length - 1 && (
                      <hr className="mx-auto mt-6 h-0 w-full max-w-[80%] border-t-2 border-[#012ABE] dark:border-[#EBE7E0]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
