import { FooterInternal } from '@/components/auth/layout-components/FooterInternal';
import NavbarInternal from '@/components/auth/layout-components/NavbarInternal';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarInternal />
      <main className="flex min-h-screen flex-col bg-white dark:bg-lightText">
        <div className="flex flex-grow items-center justify-center">{children}</div>
      </main>
      <FooterInternal />
    </>
  );
}
