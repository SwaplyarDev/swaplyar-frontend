import { VerificationItem } from '@/types/verifiedUsers';
import UsersTable from './UsersTable';
import auth from '@/auth';
import { getverificationList } from '@/actions/userVerification/verification.action';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface UsersLoaderProps {
  currentPage: number;
}

const UsersLoader: React.FC<UsersLoaderProps> = async ({ currentPage }) => {
  const users = await getverificationList(currentPage, 10);
  console.log('UsersLoader', users);
  const paginated = usersPagination(users.data, 10, currentPage);

  return <UsersTable users={paginated.users} currentPage={currentPage} totalPages={paginated.totalPages} />;
};

export default UsersLoader;

export const usersPagination = (users: VerificationItem[], usersPerPage: number, page: number) => {
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