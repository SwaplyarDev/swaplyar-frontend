// /info/loyalty-program/page.tsx

'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import RewardCard from '@/components/ui/reward-card/RewardCard';
import {
  CentroDeAyuda,
  Rewards1,
  Rewards2,
  Rewards3,
} from '@/utils/assets/img-database';

function LoyaltyProgram() {
  return (
    <div className="py-10">
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>

      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">
          SwaplyAr Plus Rewards™ premia tu fidelidad
        </h1>
        <div className="mt-4">
          <button
            id="submit-25456"
            className="rounded bg-blue-600 px-4 py-2 text-white"
            onClick={() => (window.location.href = '/auth/new-account')}
          >
            ¡Únete ya!
          </button>
        </div>
      </div>

      <div className="bg-gray-100 py-10 dark:bg-black">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
            Obtén beneficios exclusivos cada vez que realices intercambio de
            divisa con SwaplyAr Plus Rewards.
          </h2>
          <p className="text-black dark:text-white">
            ¿No estás inscrito todavía?&nbsp;
            <a className="text-blue-800" href="/">
              Crea
            </a>
            &nbsp;un perfil SwaplyAr o&nbsp;
            <a className="text-blue-800" href="/">
              inicia
            </a>
            &nbsp;sesión en tu perfil, y haz clic en &quot;inscríbite&quot; para
            unirte.&nbsp;
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center bg-gray-100 py-10 dark:bg-black">
        <RewardCard
          imageSrc={Rewards1}
          imageAlt="paso 1 de como cambiar tu dinero en SwaplyAr"
          title="Regalo de Bienvenida"
          description="Únete a SwaplyAr Plus Rewards™ y recibe 10 pesos por cada dólar en el cargo de tu segunda solicitud"
          linkText="solicitud"
          linkHref="/"
        />
        <RewardCard
          imageSrc={Rewards2}
          imageAlt="paso 2 de como cambiar tu dinero en SwaplyAr"
          title="Los premios nunca terminan"
          description="Recompensas Continuas: Gana 15 pesos por cada dólar en el cargo después de completar 5 solicitudes"
          linkText="solicitudes"
          linkHref="/"
        />
        <RewardCard
          imageSrc={Rewards3}
          imageAlt="paso 3 de como cambiar tu dinero en SwaplyAr"
          title="Exclusivo"
          description="¡Promociones exclusivas y acceso a ofertas únicas!"
          linkText=""
          linkHref=""
        />
      </div>

      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        <div className="text-black dark:text-white">
          <p>
            Para conocer los Términos y Condiciones del programa MoneyGram Plus
            Rewards, haz
            <a
              className="text-blue-800"
              href="/SAPR-Terms-Conditions-ES.pdf"
              target="_blank"
            >
              {' '}
              clic aquí
            </a>
            .
          </p>
          <p>
            <a className="text-blue-800" href="/centro-de-ayuda.html">
              ¿Necesitas ayuda?
            </a>
          </p>
        </div>
      </FlyerTrabajo>
    </div>
  );
}

export default LoyaltyProgram;
