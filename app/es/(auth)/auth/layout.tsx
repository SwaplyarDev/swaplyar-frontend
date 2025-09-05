import { FooterInternal } from '@/components/auth/layout-components/FooterInternal';
import NavbarInternal from '@/components/auth/layout-components/NavbarInternal';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-inherit">
      <NavbarInternal />
      <main className="min-h-screen bg-inherit">{children}</main>
      <FooterInternal />
    </div>
  );
}