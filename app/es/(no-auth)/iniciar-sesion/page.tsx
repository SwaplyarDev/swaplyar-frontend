import { LoginForm } from "@/components/auth/auth-form-login";
import FlyerTrabajo from "@/components/FlyerTrabajo/FlyerTrabajo";
import AnimatedBlurredCircles from "@/components/ui/animations/AnimatedBlurredCircles";
import { FlyerTrabajoImg } from "@/utils/assets/imgDatabaseCloudinary";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Inicia Sesión | Accede a Beneficios',
    description:
        'Inicia sesión en SwaplyAr para realizar transacciones seguras y obtener beneficios exclusivos de nuestro programa de fidelización',
};

export default function LoginPage() {
    return (
        <>
            <AnimatedBlurredCircles tope="top-[124px]" />
            <section className="flex flex-col items-center justify-center">
                <div className="w-full max-w-[552px]">
                    <LoginForm />
                </div>
            </section>
            <FlyerTrabajo href="" imageSrc={FlyerTrabajoImg} />
        </>
    );
}