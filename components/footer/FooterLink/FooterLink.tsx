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
 
      <Link href={href} {...(view ? { onClick: () => setView(view) } : {})}>
        <div className="align-center  flex justify-center">
          <p
            className={`absolute font-textFont text-base text-buttonsExtraLigth transition-transform duration-300 ease-in-out hover:scale-105 hover:text-buttonsLigth dark:text-buttonsExtraLigthDark dark:hover:text-buttonsLigthDark ${
              isActive
                ? ' underline  border-[#012a8e]  text-buttonsLigth dark:border-[#d6e2ff] dark:text-buttonsLigthDark'
                : 'font-light'
            } `}
          >
            {label}
          </p>
          <span className="invisible relative  inline-block min-w-max">{label}</span>
        </div>
      </Link>

  );
}
