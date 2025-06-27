'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

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
    amount: string;
    emission_date: string;
    transaction: string;
    usage_date: string;
  }[];
}

export function UserRewardsSection({ user }: { user: User }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="rounded-lg border bg-white p-4 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">Recompensas en Plus Rewards</h3>
        <button
          onClick={toggleExpand}
          className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={isExpanded ? 'Colapsar sección' : 'Expandir sección'}
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
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
          {/* {user.rewards.map((reward, index) => (
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
          ))} */}
        </div>
      </div>
    </div>
  );
}
