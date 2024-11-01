// /app/request/page.tsx
import RequestRegisterForm from "@/components/request/form/RequestRegisterForm";
import StepperContainer from "@/components/request/form/StepperContainer";
import FormRequestBank from "@/components/request/form/StepperContainer";
import { Form } from "react-hook-form";

const RequestPage = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <StepperContainer/>
    </div>
  );
};

export default RequestPage;
