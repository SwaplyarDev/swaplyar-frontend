
import { UserDetailsSection } from './UserDetailsSection';
import { UserDocumentSection } from './UserDocumentSection';
import { UserHeader } from './UserHeader';
import { UserInfo } from './UserInfo';
import { UserNotesSection } from './UserNotesSection';
import { UserNotFound } from './UserNotFound';
import { TransactionHistorySection } from './TransactionHistorySection';
import { WalletsSection } from './WalletsSection';
import { getTransactionByUserId } from '@/actions/transactions/admin-transaction';
import { getVerificationById } from '@/actions/userVerification/verification.action';

export async function UserDetailPageComponent({ verificationId }: { verificationId: string }) {
  const verification = await getVerificationById(verificationId);
  if (!verification?.success) return <UserNotFound verificationId={verificationId} />;
  const transactions = await getTransactionByUserId(verification?.data.users_id);

  return (
    <div className="min-h-screen">
      <div className="">
        <UserHeader userId={verification.data.users_id} />

        <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
          <div className="space-y-6">
            <UserDetailsSection code={verification.data.users_id} createdAt={verification.data.created_at} />
            <UserInfo user={verification.data} />
            <UserDocumentSection verification={verification.data} />
            <UserNotesSection note_rejection={verification.data.note_rejection} />
          </div>

          <div className="space-y-6">
            <TransactionHistorySection transactions={transactions} />
            <WalletsSection />
            {/* <UserRewardsSection user={user} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

