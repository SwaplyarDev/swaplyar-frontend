import { VerifyCodePage } from "@/components/auth/verify-code-page";
import FlyerTrabajo from "@/components/FlyerTrabajo/FlyerTrabajo";
import { FlyerGif } from "@/utils/assets/imgDatabaseCloudinary";

export default function EmailVerificationPage() {
  return (
    <>
      <VerifyCodePage />
      <FlyerTrabajo imageSrc={FlyerGif}>
        <></>
      </FlyerTrabajo>
    </>
  );
}