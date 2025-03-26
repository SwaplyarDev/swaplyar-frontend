export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <footer className="p-4 text-center">Footer</footer>
    </>
  );
}
