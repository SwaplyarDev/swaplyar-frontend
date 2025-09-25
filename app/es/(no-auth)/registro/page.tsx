import { RegisterForm } from "@/components/auth/auth-form-register";
import FlyerTrabajo from "@/components/FlyerTrabajo/FlyerTrabajo";
import AnimatedBlurredCircles from "@/components/ui/animations/AnimatedBlurredCircles";
import { FlyerTrabajoImg } from "@/utils/assets/imgDatabaseCloudinary";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Registrate | Accede a Beneficios',
    description:
        'Regístrate en SwaplyAr para realizar transacciones seguras y obtener beneficios exclusivos de nuestro programa de fidelización',
};

export default function RegisterPage() {
    return (
        <>
            <AnimatedBlurredCircles tope="top-[124px]" />
            <section className="flex min-h-screen flex-col items-center justify-center py-5">
                <div className="w-full max-w-[552px] px-5 hover:cursor-grab active:cursor-grabbing">
                    <RegisterForm />
                </div>
            </section>
            <FlyerTrabajo href="" imageSrc={FlyerTrabajoImg} />
        </>
    );
}