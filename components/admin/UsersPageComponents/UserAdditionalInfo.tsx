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
    <div className="space-y-3 rounded-lg border bg-white p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Fecha de Inscripción</p>
          <p className="font-medium">{user.date_subscription}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Nombre</p>
          <p className="font-medium">{user.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Apellido</p>
          <p className="font-medium">{user.lastName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Correo Electrónico</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Nacionalidad</p>
          <p className="font-medium">{user.nationality}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">N° de Documento</p>
          <p className="font-medium">{user.document_number}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
          <p className="font-medium">{user.birth_date}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">N° de Whatsapp</p>
          <p className="font-medium">{user.phone_full}</p>
        </div>
      </div>
    </div>
  );
}
