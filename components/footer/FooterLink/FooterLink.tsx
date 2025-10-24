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
          className={`text-[#012A8E] ${isActive && "underline"} transition-transform duration-300 ease-in-out hover:scale-105 hover:text-buttonsLigth dark:text-buttonsExtraLigthDark dark:hover:text-buttonsLigthDark`}
      
          >
            {label}
          </p>
         
        </div>
      </Link>

  );
}
