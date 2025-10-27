import { VerifyCodePage } from '@/components/auth/verify-code-page';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';

export default function EmailVerificationPage() {
  return (
    <>
      <VerifyCodePage />
      <div className="mt-[120px]">
        <FlyerTrabajo 
          href="/es/como-usar-swaplyar" 
          imageSrc="https://res.cloudinary.com/dwrhturiy/image/upload/v1752679095/Frame_15_cup0cq.png"
        
        />
      </div>
    </>
  );
}
