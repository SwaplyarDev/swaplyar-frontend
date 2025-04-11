import { UserDetailPageComponent } from '@/components/admin/UsersPageComponents/UserDetailPageComponent';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  return <UserDetailPageComponent userId={Number.parseInt(params.id)} />;
}
