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

export function UserAdditionalInfo({ user }: { user: User }) {
  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
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
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Nacionalidad</p>
          <p className="font-medium dark:text-gray-200">{user.nationality}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">N° de Documento</p>
          <p className="font-medium dark:text-gray-200">{user.document_number}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Fecha de Nacimiento</p>
          <p className="font-medium dark:text-gray-200">{user.birth_date}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">N° de Whatsapp</p>
          <p className="font-medium dark:text-gray-200">{user.phone_full}</p>
        </div>
      </div>
    </div>
  );
}
