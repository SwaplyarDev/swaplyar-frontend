// /components/footer/Footer.tsx
'use client';

import { usePathname } from 'next/navigation';
import FooterBlog from './FooterBlog/FooterBlog';
import FooterPrincipal from './FooterPrincipal/FooterPrincipal';

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes('/admin');

  return (
    <footer
      className={`rs-wrapper-v4 mx-auto w-full px-4 pb-1 md:px-8 lg:max-w-[1204px] lg:px-4 mt-[120px] ${isAdminPage && 'hidden'}`}
    >
      {pathname.includes('blog') ? <FooterBlog /> : <FooterPrincipal />}
    </footer>
  );
}
