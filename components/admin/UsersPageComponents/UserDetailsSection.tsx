export function UserDetailsSection({ code }: { code: string }) {
  return (
    <div className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">Código de Miembro</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Fecha de Solicitud</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-yellow-400"></div>
          <span className="text-lg font-bold">{code ? code : 'No disponible'}</span>
        </div>
        <span className="text-sm">{new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
}
