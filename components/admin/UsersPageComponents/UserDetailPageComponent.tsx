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
import { getAllUsers, getUserById } from '@/actions/users/users.action';
import auth from '@/auth';

export async function UserDetailPageComponent({ userId }: { userId: string }) {
  const session = await auth();

  let user: any = await getUserById(session?.accessToken || '', userId);

  user = { ...user, profile: user.profile };

  if (!user) {
    return <UserNotFound userId={userId} />;
  }

  return (
    <div className="min-h-screen">
      <div className="">
        <UserHeader userId={user.profile.users_id} />

        <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
          <div className="space-y-6">
            <UserDetailsSection code={user.location_id} />
            <UserInfo user={user} />
            <UserDocumentSection user={user} />
            <UserNotesSection />
          </div>

          <div className="space-y-6">
            <TransactionHistorySection />
            <WalletsSection />
            <UserRewardsSection user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
