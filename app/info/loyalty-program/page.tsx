// /info/loyalty-program/page.tsx

"use client";
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import RewardCard from '@/components/ui/reward-card/RewardCard';

function LoyaltyProgram() {
  return (
    <div className="py-10">

      <FlyerTrabajo
        imageSrc="/images/centro-ayuda.png"
      >
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
          SwaplyAr Plus Rewards™ premia tu fidelidad
        </h1>
        <div className="mt-4">
          <button
            id="submit-25456"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => (window.location.href = '/auth/new-account')}
          >
            ¡Únete ya!
          </button>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-black py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
            Obtén beneficios exclusivos cada vez que realices intercambio de divisa con SwaplyAr Plus Rewards.
          </h2>
          <p className="text-black dark:text-white">
            ¿No estás inscrito todavía?&nbsp;<a className="text-blue-800" href="/">Crea</a>&nbsp;un perfil SwaplyAr o&nbsp;<a className="text-blue-800" href="/">inicia</a>&nbsp;sesión en tu perfil, y haz clic en &quot;inscríbite&quot; para unirte.&nbsp; 
          </p>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-black py-10 flex flex-wrap justify-center">
        <RewardCard 
          imageSrc="/images/rewards1.png" 
          imageAlt="paso 1 de como cambiar tu dinero en SwaplyAr" 
          title="Regalo de Bienvenida"
          description="Únete a SwaplyAr Plus Rewards™ y recibe 10 pesos por cada dólar en el cargo de tu segunda solicitud"
          linkText="solicitud"
          linkHref="/"
        />
        <RewardCard 
          imageSrc="/images/rewards2.png" 
          imageAlt="paso 2 de como cambiar tu dinero en SwaplyAr" 
          title="Los premios nunca terminan"
          description="Recompensas Continuas: Gana 15 pesos por cada dólar en el cargo después de completar 5 solicitudes"
          linkText="solicitudes"
          linkHref="/"
        />
        <RewardCard 
          imageSrc="/images/rewards3.png" 
          imageAlt="paso 3 de como cambiar tu dinero en SwaplyAr" 
          title="Exclusivo"
          description="¡Promociones exclusivas y acceso a ofertas únicas!"
          linkText=""
          linkHref=""
        />
      </div>

      <FlyerTrabajo
        imageSrc="/images/centro-ayuda.png"
      >
        <div className="dark:text-white text-black">
          <p>
            Para conocer los Términos y Condiciones del programa MoneyGram Plus Rewards, haz
            <a className="text-blue-800" href="/SAPR-Terms-Conditions-ES.pdf" target="_blank"> clic aquí</a>.
          </p>
          <p>
            <a className="text-blue-800" href="/centro-de-ayuda.html">¿Necesitas ayuda?</a>
          </p>
        </div>
      </FlyerTrabajo>

    </div>
  );
}

export default LoyaltyProgram;
