interface User {
  date_subscription: string;
  name: string;
  lastName: string;
  email: string;
  nationality: string;
  document_number: string;
  birth_date: string;
  phone_full: string;
  rewards_year: number;
  rewards_count: number;
  rewards: {
    type: string;
    amount: string; // Cambiado de number a string
    emission_date: string;
    transaction: string;
    usage_date: string;
  }[];
}

export function UserRewardsSection({ user }: { user: User }) {
  return (
    <div className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-semibold dark:text-white">Recompensas en Plus Rewards</h3>
      <div className="mb-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Fecha de inscripción:</span>
          <span className="font-medium dark:text-gray-200">{user.date_subscription}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Recompensas que obtuviste en 2024:</span>
          <span className="font-medium dark:text-gray-200">{user.rewards_year}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Recompensas que obtuviste en total:</span>
          <span className="font-medium dark:text-gray-200">{user.rewards_count}</span>
        </div>
      </div>

      {/* Rewards List */}
      <div className="space-y-4">
        {user.rewards.map((reward, index) => (
          <div key={index} className="rounded-lg border bg-white p-3 dark:border-gray-700 dark:bg-gray-700/50">
            <div className="mb-1 flex justify-between">
              <span className="font-medium dark:text-white">{reward.type}:</span>
              <span className="font-bold text-green-600 dark:text-green-400">{reward.amount}</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Fecha de Emisión:</span>
                <span className="dark:text-gray-300">{reward.emission_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tipo:</span>
                <span className="text-xs dark:text-gray-300">{reward.transaction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Fecha de Uso:</span>
                <span className="dark:text-gray-300">{reward.usage_date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
