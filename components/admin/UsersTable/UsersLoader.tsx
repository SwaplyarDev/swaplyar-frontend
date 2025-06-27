import { getAllTransactions } from '@/actions/transactions/transactions.action';
import TransactionsTable from '@/components/admin/TransactionsTable/TransactionsTable/TransactionsTable';
import UsersTable from './UsersTable';
import { getAllUsers } from '@/actions/users/users.action';
import auth from '@/auth';

interface UsersLoaderProps {
  currentPage: number;
}

const UsersLoader: React.FC<UsersLoaderProps> = async ({ currentPage }) => {
  const session = await auth();

  let data = await getAllUsers(session?.accessToken || '');
  function mergeUsersWithProfiles(users: any[], profiles: any[]) {
    const profileMap = new Map(profiles.map((profile) => [profile.users_id, profile]));

    return users.map((user) => {
      const profile = profileMap.get(user.jh);
      return {
        ...user,
        profile: profile,
      };
    });
  }

  data = mergeUsersWithProfiles(data.user, data.profiles);

  return <UsersTable users={data} currentPage={currentPage} />;
};

export default UsersLoader;
