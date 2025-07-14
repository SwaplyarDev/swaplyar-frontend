import useStore from '@/store/authViewStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
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
    <motion.div transition={{ duration: 0.1 }}>
      <Link href={href} {...(view ? { onClick: () => setView(view) } : {})}>
        <div className="align-center flex justify-center">
          <p
            className={`absolute font-textFont text-base font-[300] hover:font-[400] hover:text-buttonsLigth dark:text-buttonsExtraLigthDark dark:hover:text-buttonsLigthDark ${isActive ? 'text-buttonsLigth after:bg-buttonsLigth after:content-[""] dark:text-buttonsLigthDark dark:after:bg-buttonsLigthDark' : 'text-buttonsExtraLigth'}`}
          >
            {label}
          </p>
          <span className="invisible relative mx-2 inline-block min-w-max">{label}</span>
        </div>
      </Link>
    </motion.div>
  );
}
