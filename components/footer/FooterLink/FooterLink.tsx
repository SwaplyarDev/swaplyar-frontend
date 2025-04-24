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
    <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }}>
      <Link href={href} {...(view ? { onClick: () => setView(view) } : {})}>
        <p
          className={`font-textFont text-base font-light hover:text-buttonsLigth dark:text-buttonsExtraLigthDark dark:hover:text-buttonsLigthDark ${isActive ? 'text-buttonsLigth after:bg-buttonsLigth after:content-[""] dark:text-buttonsLigthDark dark:after:bg-buttonsLigthDark' : 'text-buttonsExtraLigth'}`}
        >
          {label}
        </p>
      </Link>
    </motion.div>
  );
}
