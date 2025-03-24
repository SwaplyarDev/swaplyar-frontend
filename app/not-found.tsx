import { redirect } from 'next/navigation';

export default function NotFoundPage() {
  redirect('/es/error/404');
}
