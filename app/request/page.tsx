// /app/request/page.tsx
import RequestRegisterForm from "@/components/request/form/RequestRegisterForm";
import StepperContainer from "@/components/request/form/StepperContainer";
import FormRequestBank from "@/components/request/form/StepperContainer";
import { Form } from "react-hook-form";

const RequestPage = () => {
  return (
    <div className="flex items-center justify-center  xs-phone:px-10 py-10 px-5">
      <StepperContainer/>
    </div>
  );
};

export default RequestPage;
