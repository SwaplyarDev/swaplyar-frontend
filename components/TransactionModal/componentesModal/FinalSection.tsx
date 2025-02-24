import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
const MySwal = withReactContent(Swal);

const FinalSection = () => {
  const { data: session } = useSession();
  const userName = session?.user.name;
  return (
    <section className="flex w-[100%] flex-col items-end gap-6">
      <input
        placeholder="Proporcione una nota de como fue el proceso de la solicitud"
        className="min-h-[4.25rem] w-full rounded-lg border-[1px] border-black p-2"
      />
      <div className="flex w-[50%] flex-row justify-end gap-5">
        <button className="rounded-full bg-[#b6a0a0] px-6 py-4 text-2xl font-semibold outline outline-offset-2 outline-[#d0b8b8] transition-all duration-150 hover:bg-[#2C0100] hover:text-darkText hover:outline-[#CE1818] active:bg-[#CE1818]">
          Rechazar
        </button>
        <button className="rounded-full bg-[#9fb69f] px-6 py-4 text-2xl font-semibold outline outline-offset-2 outline-[#b8cfb8] transition-all duration-150 hover:bg-[#002C00] hover:text-darkText hover:outline-[#18CE18] active:bg-[#18CE18]">
          Aprobar
        </button>
      </div>

      <p className="lightText text-right text-base">Esta solicitud fue operada por: {userName}</p>

      <div className="flex flex-row gap-3">
        <button className="rounded-full border-2 border-[#012a8d] bg-[#000c28] p-2.5 text-base font-semibold text-[#ebe7e0]">
          En Proceso
        </button>
        <button onClick={() => MySwal.close()} className="text-xl font-bold">
          Cerrar
        </button>
      </div>
    </section>
  );
};

export default FinalSection;
