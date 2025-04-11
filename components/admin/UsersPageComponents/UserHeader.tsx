import { User } from 'lucide-react';

export function UserHeader({ userId }: { userId: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-6">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
          <User className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Detalles del Usuario</h1>
          <p className="text-sm text-gray-500">ID: {userId}</p>
        </div>
      </div>
    </div>
  );
}
