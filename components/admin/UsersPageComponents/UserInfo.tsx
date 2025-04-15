interface User {
  date_subscription: string;
  name: string;
  lastName: string;
  email: string;
  nationality: string;
  document_number: string;
  birth_date: string;
  phone_full: string;
}

export function UserInfo({ user }: { user: User }) {
  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h1 className="text-xl text-gray-800 dark:text-gray-100">Informacion Basica del Usuario</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Fecha de Inscripción</p>
          <p className="font-medium dark:text-gray-200">{user.date_subscription}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Nombre</p>
          <p className="font-medium dark:text-gray-200">{user.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Apellido</p>
          <p className="font-medium dark:text-gray-200">{user.lastName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Correo Electrónico</p>
          <p className="font-medium dark:text-gray-200">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
