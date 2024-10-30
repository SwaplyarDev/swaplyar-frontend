// /app/request/page.tsx
import FormRequestBank from "@/components/request/form/StepperContainer";
import RequestRegisterForm from "@/components/request/form/RequestRegisterForm";
import { Form } from "react-hook-form";

const RequestPage = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <FormRequestBank/>
    </div>
  );
};

export default RequestPage;
