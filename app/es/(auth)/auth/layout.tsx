import { FooterInternal } from '@/components/auth/layout-components/FooterInternal';
import NavbarInternal from '@/components/auth/layout-components/NavbarInternal';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarInternal />
      <main className="bg-white dark:bg-lightText">{children}</main>
      <FooterInternal />
    </>
  );
}
