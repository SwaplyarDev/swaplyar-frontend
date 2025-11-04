// /components/footer/Footer.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import FooterBlog from './FooterBlog/FooterBlog';
import FooterPrincipal from './FooterPrincipal/FooterPrincipal';

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes('/admin');
  const [marginTop, setMarginTop] = useState('80px');

  useEffect(() => {
    const handleResize = () => {
      setMarginTop(window.innerWidth >= 1024 ? '120px' : '80px');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer
      className={`rs-wrapper-v4 mx-auto w-full px-4 pb-8 md:px-8 lg:max-w-[1204px] lg:max-h-[256px] bg lg:py-[16px] lg:px-[8px] ${isAdminPage && 'hidden'}`}
      style={{ marginTop }}
    >
      {pathname.includes('blog') ? <FooterBlog /> : <FooterPrincipal />}
    </footer>
  );
}