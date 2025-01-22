import EditSoli from '@/components/EditSolicitud/EditSoli';
import NewSwaply from '@/components/NewSwaplyAR/newSwaply';

const editRequestPage: React.FC = () => {
  return (
    <>
      <div className="flex-column container flex w-full flex-wrap items-center justify-center px-2 pt-10 lg:px-0 xl:px-20">
        <EditSoli></EditSoli>
      </div>
      <div className="w-full">
        <NewSwaply></NewSwaply>
      </div>
    </>
  );
};

export default editRequestPage;
