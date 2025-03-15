// /components/footer/Footer.tsx
'use client';

import { usePathname } from 'next/navigation';
import FooterBlog from './FooterBlog/FooterBlog';
import FooterPrincipal from './FooterPrincipal/FooterPrincipal';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="rs-wrapper-v4 mx-auto w-full px-4 py-8 md:px-8 lg:max-w-[1204px] lg:px-4">
      {pathname.includes('blog') ? <FooterBlog /> : <FooterPrincipal />}
    </footer>
  );
}
