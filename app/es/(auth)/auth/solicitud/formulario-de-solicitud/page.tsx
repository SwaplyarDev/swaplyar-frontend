import dynamic from 'next/dynamic';
const StepperContainer = dynamic(() => import('@/components/request/form/StepperContainer'), { ssr: false });

const Page = () => {
  return (
      <div className="flex items-center justify-center px-5 py-10 xs-phone:px-10">
        <StepperContainer />
      </div>
  )
};

export default Page;
