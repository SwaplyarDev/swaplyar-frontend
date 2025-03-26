import useStore from '@/store/authViewStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FooterLinkProps {
  href: string;
  label: string;
  view?: 'login' | 'register';
}

export function FooterLink({ href, label, view }: FooterLinkProps) {
  const { setView } = useStore();
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      {...(view ? { onClick: () => setView(view) } : {})}
      className={`rs-link w-fit font-textFont text-base transition-all duration-300 ease-in-out hover:text-[17px] hover:text-buttonsLigth dark:text-buttonsExtraLigthDark dark:hover:text-buttonsLigthDark ${isActive ? 'relative font-bold text-buttonsLigth after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-buttonsLigth after:content-[""] dark:text-buttonsLigthDark dark:after:bg-buttonsLigthDark' : 'font-light text-buttonsExtraLigth'}`}
    >
      {label}
    </Link>
  );
}
