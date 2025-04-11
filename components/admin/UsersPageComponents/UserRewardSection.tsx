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
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-4 text-lg font-semibold">Recompensas en Plus Rewards</h3>
      <div className="mb-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Fecha de inscripción:</span>
          <span className="font-medium">{user.date_subscription}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Recompensas que obtuviste en 2024:</span>
          <span className="font-medium">{user.rewards_year}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Recompensas que obtuviste en total:</span>
          <span className="font-medium">{user.rewards_count}</span>
        </div>
      </div>

      {/* Rewards List */}
      <div className="space-y-4">
        {user.rewards.map((reward, index) => (
          <div key={index} className="rounded-lg border bg-white p-3">
            <div className="mb-1 flex justify-between">
              <span className="font-medium">{reward.type}:</span>
              <span className="font-bold text-green-600">{reward.amount}</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha de Emisión:</span>
                <span>{reward.emission_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo:</span>
                <span className="text-xs">{reward.transaction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha de Uso:</span>
                <span>{reward.usage_date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
