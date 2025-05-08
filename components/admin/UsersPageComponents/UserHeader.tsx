import { User } from 'lucide-react';
import BackButton from '../Sidebar/componentsSidebar/Navigation/BackButto';

export function UserHeader({ userId }: { userId: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <BackButton />
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <User className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Detalles del Usuario</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">ID: {userId}</p>
        </div>
      </div>
    </div>
  );
}
