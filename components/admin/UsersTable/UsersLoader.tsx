import { getMyWalletAccounts } from '@/actions/virtualWalletAccount/virtualWallets.action';
import UsersTable from './UsersTable';
import auth from '@/auth';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface UsersLoaderProps {
  currentPage: number;
}

const UsersLoader: React.FC<UsersLoaderProps> = async ({ currentPage }) => {
  const users = await getUsers(currentPage, 10);
  const paginated = usersPagination(users, 10, currentPage);

  return <UsersTable users={paginated.users} currentPage={currentPage} totalPages={paginated.totalPages} />;
};

export default UsersLoader;

async function getUsers(page: Number, perPage: number) {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/users?page=${page}&perPage=${perPage}`, {
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

const usersPagination = (users: any[], usersPerPage: number, page: number) => {
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const i = (page - 1) * usersPerPage;
  const paginatedUsers = users.slice(i, i + usersPerPage);
  return {
    users: paginatedUsers,
    totalUsers,
    totalPages,
  };
};
