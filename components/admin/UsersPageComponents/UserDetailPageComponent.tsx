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
import {
  getReceiveTransaction,
  getSendTransaction,
  getTransactionByUserId,
} from '@/actions/transactions/admin-transaction';

export async function UserDetailPageComponent({ userId }: { userId: string }) {
  const user = await getUserById(userId);
  if (!user) return <UserNotFound userId={userId} />;
  const transactions = await getTransactionByUserId(user.id);

  return (
    <div className="min-h-screen">
      <div className="">
        <UserHeader userId={user.id} />

        <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
          <div className="space-y-6">
            <UserDetailsSection code={user.id} createdAt={user.createdAt} />
            <UserInfo user={user} />
            <UserDocumentSection user={user} />
            <UserNotesSection />
          </div>

          <div className="space-y-6">
            <TransactionHistorySection transactions={transactions} />
            <WalletsSection />
            <UserRewardsSection user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

async function getUserById(id: string): Promise<User | undefined> {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/users/${id}`, {
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
