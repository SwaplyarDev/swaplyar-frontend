import { UserActionButtons } from './UserActionButtons';
import { UserAdditionalInfo } from './UserAdditionalInfo';
import { UserDetailsSection } from './UserDetailsSection';
import { UserDocumentSection } from './UserDocumentSection';
import { UserHeader } from './UserHeader';
import { UserNotesSection } from './UserNotesSection';
import { UserNotFound } from './UserNotFound';
import { UserRewardsOptions } from './UserRewardOptions';
import { UserRewardsSection } from './UserRewardSection';

export async function UserDetailPageComponent({ userId }: { userId: number }) {
  const user = await getUserById(userId);

  if (!user) {
    return <UserNotFound userId={userId} />;
  }

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <UserHeader userId={user.id} />

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <UserDetailsSection code={user.code} />
            <UserAdditionalInfo user={user} />
            <UserDocumentSection />
            <UserAdditionalInfo user={user} />
            <UserActionButtons />
            <UserNotesSection />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <UserRewardsSection user={user} />
            <UserRewardsOptions />
          </div>
        </div>
      </div>
    </div>
  );
}
const data = [
  {
    id: 1,
    code: '2448XPAR',
    name: 'John Doe',
    lastName: 'Smith',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    status: 'active',
    date_subscription: '2021-01-01',
    date_verification: '2021-01-01',
    document_number: '25252525',
    nationality: 'Estados Unidos',
    birth_date: '1985-03-15',
    phone_full: '+5493333333333',
    rewards: [
      {
        type: 'Cupón de Fidelización',
        amount: '$5 USD',
        emission_date: '02 de Enero de 2025',
        usage_date: '26 de Enero 2025',
        transaction: 'Crédito de $5 USD aplicado en la siguiente transacción',
      },
      {
        type: 'Cupón de Fidelización',
        amount: '$5 USD',
        emission_date: '31 de Octubre de 2024',
        usage_date: '1 de Noviembre 2024',
        transaction: 'Crédito de $5 USD aplicado en la siguiente transacción',
      },
      {
        type: 'Cupón de Bienvenida',
        amount: '$10 USD',
        emission_date: '26 de agosto de 2024',
        usage_date: '2 de Septiembre 2024',
        transaction: 'Crédito de $10 USD aplicado en la siguiente transacción',
      },
    ],
    rewards_count: 5,
    rewards_year: 8,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 2,
    code: '3559YQBR',
    name: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+9876543210',
    status: 'pending',
    date_subscription: '2022-05-15',
    date_verification: '2022-05-20',
    document_number: '98765432',
    nationality: 'Canadá',
    birth_date: '1990-07-22',
    phone_full: '+5491122334455',
    rewards: [
      {
        type: 'Cupón de Fidelización',
        amount: '$5 USD',
        emission_date: '15 de Marzo de 2025',
        usage_date: '30 de Marzo 2025',
        transaction: 'Crédito de $5 USD aplicado en la siguiente transacción',
      },
      {
        type: 'Cupón de Bienvenida',
        amount: '$10 USD',
        emission_date: '10 de Diciembre de 2024',
        usage_date: '25 de Diciembre 2024',
        transaction: 'Crédito de $10 USD aplicado en la siguiente transacción',
      },
    ],
    rewards_count: 2,
    rewards_year: 4,
    createdAt: '2022-05-15',
    updatedAt: '2022-06-01',
  },
];

export async function getUserById(id: number) {
  return data.find((user) => user.id === id);
}

export type User = (typeof data)[0];
