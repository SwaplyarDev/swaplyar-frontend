import CloseButton from './ui/CloseButton';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);
const SkeletonModal = () => {
  return (
    <section className="flex flex-col gap-5 p-6">
      <div className="flex flex-row gap-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex min-h-16 w-[30%] animate-pulse overflow-hidden rounded-lg bg-gray-300 p-3"
          ></div>
        ))}
      </div>
      <div className="flex w-[100%] flex-row justify-between gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex min-h-[14rem] w-[25%] animate-pulse overflow-hidden rounded-lg bg-gray-300 p-3"
          ></div>
        ))}
      </div>
      <div className="flex min-h-12 w-[100%] animate-pulse overflow-hidden rounded-full bg-gray-300 p-3"></div>
      <div className="flex min-h-24 w-[100%] animate-pulse overflow-hidden rounded-full bg-gray-300 p-3"></div>
      <div className="flex min-h-[40rem] w-[100%] animate-pulse overflow-hidden rounded-xl bg-gray-300 p-3"></div>
    </section>
  );
};

export default SkeletonModal;
