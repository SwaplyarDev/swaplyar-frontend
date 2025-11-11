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
      className={`rs-wrapper-v4 mx-auto mt-[60px] navbar-desktop:mt-[120px] w-full px-4 pb-8 md:px-8 navbar-desktop:max-w-screen-desktop navbar-desktop:max-h-64 bg navbar-desktop:py-4 navbar-desktop:px-2 ${isAdminPage && 'hidden'}`}
    >
      {pathname.includes('blog') ? <FooterBlog /> : <FooterPrincipal />}
    </footer>
  );
}