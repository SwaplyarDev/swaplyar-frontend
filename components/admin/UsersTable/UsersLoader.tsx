import { VerificationItem } from '@/types/verifiedUsers';
import UsersTable from './UsersTable';
import { getverificationList } from '@/actions/userVerification/verification.action';
import { UserVerifyListProvider } from '@/hooks/admin/usersPageHooks/useUserVerifyListState';
import auth from '@/auth';
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
interface UsersLoaderProps {
  currentPage: number;
}

const UsersLoader: React.FC<UsersLoaderProps> = async ({ currentPage }) => {
  return <UsersTable currentPage={currentPage} />;
};

export default UsersLoader;

async function getUsers(page: Number, perPage: number) {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/admin/list`, {
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

const usersPagination = (users: VerificationItem[], usersPerPage: number, page: number) => {
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
