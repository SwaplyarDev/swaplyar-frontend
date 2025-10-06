import RequestAccessGuard from '@/components/request/form/RequestAccessGuard';
import SolicitudFlowWrapper from '@/components/request/form/SolicitudFlowWrapper';

const Page = () => {
  return (
    <RequestAccessGuard>
      
    <div className="flex items-center justify-center px-5 py-10 xs-phone:px-10">
      <SolicitudFlowWrapper />
    </div>

    </RequestAccessGuard>
  );
};

export default Page;
