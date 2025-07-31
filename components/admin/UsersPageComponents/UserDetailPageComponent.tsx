import { UserAdditionalInfo } from './UserAdditionalInfo';
import { UserDetailsSection } from './UserDetailsSection';
import { UserDocumentSection } from './UserDocumentSection';
import { UserHeader } from './UserHeader';
import { UserInfo } from './UserInfo';
import { UserNotesSection } from './UserNotesSection';
import { UserNotFound } from './UserNotFound';
import { TransactionHistorySection } from './TransactionHistorySection';
import { WalletsSection } from './WalletsSection';
import { UserRewardsSection } from './UserRewardSection';
import auth from '@/auth';
import { User } from '@/types/user';
import { SingleVerificationResponse, VerifiedUsersResponse } from '@/types/verifiedUsers';
import { getTransactionByUserId } from '@/actions/transactions/admin-transaction';

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
            <UserDocumentSection user={verification.data} />
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

async function getVerificationById(id: string): Promise<SingleVerificationResponse | undefined> {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/verification/admin/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Error fetching user');
    }
    const user = await response.json();
    return user;
  } catch (e) {
    console.error('Error fetching user:', e);
  }
}
