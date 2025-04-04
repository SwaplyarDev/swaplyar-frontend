interface WalletIconProps {
  type: string;
}

export default function WalletIcon({ type }: WalletIconProps) {
  switch (type) {
    case 'paypal':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#003087]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white">
            <path
              fill="currentColor"
              d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.023-.024.13a.804.804 0 0 1-.794.68h-2.52a.67.67 0 0 1-.662-.78l.04-.18 1.067-6.816.034-.18a.804.804 0 0 1 .794-.68h.5c3.238 0 5.774-1.314 6.514-5.12.256-1.313.192-2.447-.3-3.327"
            />
          </svg>
        </div>
      );
    case 'transferencia':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
          <span className="text-xs font-bold text-white">TB</span>
        </div>
      );
    case 'tether':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#26A17B]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white">
            <path fill="currentColor" d="M12 4.5l4.5 4.5-4.5 4.5-4.5-4.5L12 4.5z" />
          </svg>
        </div>
      );
    case 'wise':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00B9FF]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white">
            <path
              fill="currentColor"
              d="M16.617 7.382c-.71 0-1.286.576-1.286 1.286 0 .71.576 1.286 1.286 1.286.71 0 1.286-.576 1.286-1.286 0-.71-.576-1.286-1.286-1.286zm-9.234 0c-.71 0-1.286.576-1.286 1.286 0 .71.576 1.286 1.286 1.286.71 0 1.286-.576 1.286-1.286 0-.71-.576-1.286-1.286-1.286zm4.617 0c-.71 0-1.286.576-1.286 1.286 0 .71.576 1.286 1.286 1.286.71 0 1.286-.576 1.286-1.286 0-.71-.576-1.286-1.286-1.286z"
            />
          </svg>
        </div>
      );
    case 'blockchain':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00E5FF]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white">
            <path
              fill="currentColor"
              d="M12 4.5l4.5 4.5-4.5 4.5-4.5-4.5L12 4.5zM7.5 10.5L12 15l4.5-4.5L12 19.5l-4.5-4.5z"
            />
          </svg>
        </div>
      );
    default:
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
          <span className="text-xs font-bold text-white">W</span>
        </div>
      );
  }
}
