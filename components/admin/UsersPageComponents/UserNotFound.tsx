export function UserNotFound({ verificationId }: { verificationId: string }) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-500">Usuario no encontrado</h1>
        <p className="text-gray-600">El usuario con ID de verificación {verificationId} no existe en nuestra base de datos.</p>
      </div>
    </div>
  );
}
