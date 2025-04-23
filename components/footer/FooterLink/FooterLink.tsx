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
    <div className="transform transition-all duration-200 ease-in-out hover:scale-[1.01] hover:font-bold">
      <Link
        href={href}
        {...(view ? { onClick: () => setView(view) } : {})}
        className={`font-textFont text-base hover:text-buttonsLigth dark:text-buttonsExtraLigthDark dark:hover:text-buttonsLigthDark ${isActive ? 'relative font-bold text-buttonsLigth after:bg-buttonsLigth after:content-[""] dark:text-buttonsLigthDark dark:after:bg-buttonsLigthDark' : 'font-light text-buttonsExtraLigth'}`}
      >
        {label}
      </Link>
    </div>
  );
}
