// /app/request/page.tsx
import FormRequest from '@/components/request/form/FormRequest';
import FormRequestBank from '@/components/request/form/FormRequestBank';

const RequestPage = () => {
  return (
    <div className="flex flex-col-reverse items-center justify-center p-10 lg:flex-row lg:gap-8">
      <FormRequestBank/>
      {/* <FormRequest/> */}
    </div>
  );
};

export default RequestPage;
