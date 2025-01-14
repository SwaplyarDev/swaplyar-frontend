import Image from 'next/image';
import fraudPrevent from '@/public/images/fraudPrevent.png';

const FraudPrevention = () => {
  const mockLinks = [
    {
      text: 'Organizaciones de los Estados Unidos y de Canadá',
      link: '',
    },
    {
      text: 'Federal Trade Commission',
      link: 'https://www.ftc.gov/',
    },

    {
      text: "National Consumers League's Fraud Center",
      link: 'https://fraud.org/',
    },
    {
      text: 'U.S. Postal Inspection Service',
      link: 'https://www.uspis.gov/',
    },
    {
      text: 'Canadian Anti-Fraud Centre',
      link: 'https://antifraudcentre-centreantifraude.ca/',
    },
    {
      text: 'StopFraud.gov',
      link: 'https://www.stopfraud.gov/about.html',
    },
    {
      text: 'Consumer Financial Protection Bureau',
      link: 'https://www.consumerfinance.gov/',
    },
    {
      text: 'Organizaciones del Reino Unido y de Australia',
      link: '',
    },
    {
      text: 'Action Fraud UK',
      link: 'https://www.actionfraud.police.uk/',
    },
    {
      text: 'ScamWatchAustralia',
      link: 'https://www.scamwatch.gov.au/',
    },
  ];

  return (
    <main className="flex w-full flex-col items-center gap-5 py-10">
      <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">Concientización sobre el fraude</h1>
      <section className="flex w-[80%] flex-col justify-items-center gap-5 lg:grid lg:grid-cols-2">
        <article className="flex flex-col gap-5 pt-5 text-xl lg:text-2xl">
          <p>Prevencion del fraude</p>
          <p>Como protegerse del fraude</p>
          <p>Estafas al cliente comunes</p>
          <a
            href=""
            className="text-blue-600 underline decoration-blue-600 transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 dark:text-[#EBE7E0] dark:decoration-[#EBE7E0] dark:hover:decoration-[#97938d]"
          >
            | Otros recursos
          </a>
        </article>
        <article className="flex flex-col gap-5">
          <h2 className="border-t-[1px] border-blue-500 text-xl font-semibold dark:border-[#EBE7E0] md:text-2xl lg:text-3xl">
            Como protegerte del fraude contra Clientes
          </h2>
          <section className="flex flex-col gap-5 rounded-md bg-[#EEEAE3] p-5 dark:bg-[#4B4B4B]">
            <div>
              <p>Hay varias organizaciones que brindan información para ayudarte a protegerte del fraude.</p>
              <p> Selecciona la organización que quieras ver de la lista de abajo para obtener más detalles.</p>
            </div>

            <div className="flex flex-col">
              {mockLinks.map((mock, index) => (
                <a
                  key={index}
                  className="text-blue-600 underline decoration-blue-600 transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 dark:text-[#EBE7E0] dark:decoration-[#EBE7E0] dark:hover:decoration-[#97938d]"
                  href={mock.link}
                >
                  {mock.text}
                </a>
              ))}
            </div>

            <p>
              Si crees haber sido víctima de fraude, completa nuestro formulario en línea para denunciarlo, o si
              sospechas que hubo fraude en una transacción que todavía no ha sido recibida, comunícate con el Centro de
              Atención al Cliente, al WhatsApp +5491123832198, para que cancelen la transacción de inmediato.
            </p>
          </section>
        </article>
      </section>
      <Image
        className="hidden w-[100%] pt-24 dark:hidden lg:flex"
        src={fraudPrevent}
        alt="Fraude-Posible"
        loading="lazy"
      />
    </main>
  );
};

export default FraudPrevention;
