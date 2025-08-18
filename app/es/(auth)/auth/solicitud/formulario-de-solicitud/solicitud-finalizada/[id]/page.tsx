import SolicitudFinalizada from "@/components/SolicitudFinalizada/SolicitudFinalizada";
import { Suspense } from "react";

const Page = () => {
  return (
    <main className="relative overflow-hidden">
      <Suspense fallback={<div>Cargando...</div>}>
        <SolicitudFinalizada />
      </Suspense>
    </main>
  )
};

export default Page;
