import React from 'react';
import Image from 'next/image';

// Definición de tipos para las props de cada tarjeta
interface RecommendationCardProps {
  name: string; // Nombre de la persona
  description: string; // Descripción
  date: string; // Fecha
  image?: string; // URL de la imagen
}

// Componente reutilizable para una tarjeta de recomendación
const RecommendationCard: React.FC<RecommendationCardProps> = ({ name, description, date, image }) => {
  return (
    <article className="h-[542px] flex-shrink-0 rounded-[16px] border-[#012A8E] bg-[#D6E2FF] p-4 text-center shadow-md dark:border-[#EBE7E0] dark:bg-[#969696] sm:w-[330px] lg:w-[358px]">
      {/* Encabezado de la tarjeta */}
      <header className="mb-3">
        {/* Imagen circular */}
        <figure className="flex justify-center">
          <div className="h-[140px] w-[140px] overflow-hidden rounded-full bg-[#D9D9D9] dark:bg-[#D9D9D9]">
            {image ? <Image src={image} alt={`${name}`} width={140} height={140} className="object-cover" /> : null}
          </div>
          <figcaption className="sr-only">{name}</figcaption>
        </figure>
      </header>

      {/* Contenido principal */}
      <section className="mb-3">
        {/* Estrellas */}
        <div className="flex justify-center space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="flex h-[42px] w-[42px] items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="39" viewBox="0 0 40 39" fill="none">
                <path
                  d="M20 0.441406L24.7148 14.952H39.9722L27.6287 23.9201L32.3435 38.4308L20 29.4627L7.65651 38.4308L12.3713 23.9201L0.027813 14.952H15.2852L20 0.441406Z"
                  fill="#D9D9D9"
                />
              </svg>
            </span>
          ))}
        </div>
      </section>

      {/* Información adicional */}
      <section className="pb-3">
        <h3 className="mb-2 text-[16px] font-light leading-[24px] text-black">{name}</h3>
        <div className="flex h-[216px] w-[300px] shrink-0 text-left md:w-[317px]">
          <p className="mb-4 text-[16px] font-light leading-[24px] text-black">{description}</p>
        </div>
      </section>

      {/* Pie de tarjeta */}
      <footer>
        <p className="mt-4 text-right text-[16px] font-light leading-[24px] text-black">{date}</p>
      </footer>
    </article>
  );
};

// Componente principal de recomendaciones
interface RecommendationsProps {
  items: {
    id: number;
    name: string;
    description: string;
    date: string;
    image?: string;
  }[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ items }) => {
  return (
    <section className="flex w-full flex-col items-center p-2 sm:w-auto">
      {/* Encabezado con texto dinámico según el tema */}
      <h2 className="mb-4 text-center text-[36px] font-bold text-gray-900 dark:text-gray-100">
        <span className="block dark:hidden">Que dicen nuestros clientes de SwaplyAr</span>
        <span className="hidden dark:block">Ya somos más personas felices :)</span>
      </h2>
      {/* Contenedor de tarjetas con desplazamiento horizontal */}
      <div className="scrollbar-hide flex w-full space-x-4 overflow-x-auto p-4 lg:w-auto">
        {items.map((item) => (
          <RecommendationCard
            key={item.id}
            name={item.name}
            description={item.description}
            date={item.date}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
