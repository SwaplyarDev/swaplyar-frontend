import { VerificationItem } from '@/types/verifiedUsers';
import UsersTable from './UsersTable';
import { getverificationList } from '@/actions/userVerification/verification.action';
import { UserVerifyListProvider } from '@/hooks/admin/usersPageHooks/useUserVerifyListState';

interface UsersLoaderProps {
  currentPage: number;
}

const UsersLoader: React.FC<UsersLoaderProps> = async ({ currentPage }) => {

  return (
    <UsersTable currentPage={currentPage} />
  );
};

export default UsersLoader;
