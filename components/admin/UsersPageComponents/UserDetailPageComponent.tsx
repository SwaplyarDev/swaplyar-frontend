
import { UserDetailsSection } from './UserDetailsSection';
import { UserDocumentSection } from './UserDocumentSection';
import { UserHeader } from './UserHeader';
import { UserInfo } from './UserInfo';
import { UserNotesSection } from './UserNotesSection';
import { UserNotFound } from './UserNotFound';
import { TransactionHistorySection } from './TransactionHistorySection';
import { WalletsSection } from './WalletsSection';
import { getVerificationById } from '@/actions/userVerification/verification.action';
import { UserVerifyProvider } from '@/hooks/admin/usersPageHooks/useUserVerifyState';
import { UserRewardsSection } from './UserRewardSection';
import { getUserWalletAccountByUserId } from '@/actions/virtualWalletAccount/virtualWallets.action';
import auth from '@/auth';
import { getDiscountsByUserId } from '@/actions/Discounts/discounts.action';

export async function UserDetailPageComponent({ verificationId }: { verificationId: string }) {
  const session = await auth();
  const token = session?.accessToken;
  const verification = await getVerificationById(verificationId);
  if (!verification?.success) return <UserNotFound verificationId={verificationId} />;
  const wallets = await getUserWalletAccountByUserId(verification?.data.user_id, token || '');
  const discounts = await getDiscountsByUserId(verification?.data.user_id, token || '');

  return (
    <div className="min-h-screen">
      <UserVerifyProvider verification={verification.data}>
        <div className="">
          <UserHeader userId={verification.data.id} />

          <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
            <div className="space-y-6">
              <UserDetailsSection code={verification.data.user_id} createdAt={verification.data.submitted_at} />
              <UserInfo />
              <UserDocumentSection />
              <UserNotesSection />
            </div>

            <div className="space-y-6">
              {/* 
                No hay relacion directa entre el usuario y las transacciones, seccion a agregar dentro de componente WalletDetails
                
                <TransactionHistorySection transactions={transactions} />  
              */} 
              {wallets.length > 0 ? (
                <WalletsSection wallets={wallets} />
              ) : (
                <div className="border rounded-md p-4 text-muted-foreground text-sm italic">
                  Este usuario no tiene cuentas registradas.
                </div>
              )}
              <UserRewardsSection discounts={discounts} /> 
            </div>
          </div>
        </div>
      </UserVerifyProvider>
    </div>
  );
}
