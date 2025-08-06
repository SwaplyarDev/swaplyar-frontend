import { UserDetailPageComponent } from '@/components/admin/UsersPageComponents/UserDetailPageComponent';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  return <UserDetailPageComponent verificationId={params.id} />;
}
