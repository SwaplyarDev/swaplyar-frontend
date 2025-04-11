export function UserActionButtons() {
  return (
    <div className="flex justify-center space-x-4">
      <button className="rounded-full bg-gray-200 px-6 py-2 font-medium text-gray-700 hover:bg-gray-300">
        Rechazar
      </button>
      <button className="rounded-full bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700">Aprobar</button>
    </div>
  );
}
