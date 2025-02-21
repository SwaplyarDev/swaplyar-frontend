import LauyOutAdmin from '@/components/admin/LayoutAdmin/LayoutAdmin';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <LauyOutAdmin />
      {children}
    </section>
  );
}
