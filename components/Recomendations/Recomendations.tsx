import React from 'react';
import Image from 'next/image';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

// Definición de tipos para las props de cada tarjeta
interface RecommendationCardProps {
  name: string; // Nombre de la persona
  description: string; // Descripción
  date: string; // Fecha
  image?: string; // URL de la imagen
  href: string; // URL del usuario
  qualification: number; // Calificación del usuario
}

// Componente reutilizable para una tarjeta de recomendación
const RecommendationCard: React.FC<RecommendationCardProps> = ({
  name,
  description,
  date,
  image,
  href,
  qualification,
}) => {
  return (
    <article className="relative flex h-[450px] w-[280px] flex-shrink-0 flex-col justify-between rounded-[16px] border border-buttonsLigth bg-[#D6E2FF] p-4 text-center shadow-md dark:border-[#EBE7E0] dark:bg-[#969696] sm:w-[330px] lg:w-[358px]">
      <Link href={href} target="_blank">
        <SquareArrowOutUpRight className="absolute right-3 top-3 text-placeholderDark transition-all hover:text-buttonsLigth" />
      </Link>
      <div className="h-full">
        {/* Encabezado de la tarjeta */}
        <header className="mb-3">
          {/* Imagen circular */}
          <figure className="flex justify-center">
            <div className="h-[100px] w-[100px] overflow-hidden rounded-full bg-[#D9D9D9] dark:bg-[#D9D9D9] md:h-[150px] md:w-[150px]">
              {image ? <Image src={image} alt={`${name}`} width={300} height={300} className="object-cover" /> : null}
            </div>
            <figcaption className="sr-only">{name}</figcaption>
          </figure>
        </header>

        {/* Contenido principal */}
        <section className="mb-3">
          {/* Estrellas */}
          <div className="flex justify-center space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="flex h-[30px] w-[30px] items-center justify-center md:h-[42px] md:w-[42px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="39" viewBox="0 0 40 39" fill="none">
                  <path
                    d="M20 0.441406L24.7148 14.952H39.9722L27.6287 23.9201L32.3435 38.4308L20 29.4627L7.65651 38.4308L12.3713 23.9201L0.027813 14.952H15.2852L20 0.441406Z"
                    fill={`${qualification === index ? '#D9D9D9' : '#FFD900'}`}
                  />
                </svg>
              </span>
            ))}
          </div>
        </section>

        {/* Información adicional */}
        <section>
          <h3 className="font-semibold leading-[24px] text-black">{name}</h3>
          <p className="text-start text-sm font-light leading-[24px] text-black">{description}</p>
        </section>
      </div>

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
    href: string;
    qualification: number;
  }[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({ items }) => {
  return (
    <section className="flex w-full flex-col items-center gap-10">
      {/* Encabezado con texto dinámico según el tema */}
      <h2 className="text-center text-[36px] text-lightText dark:text-darkText">
        Que dicen nuestros clientes de SwaplyAr
      </h2>
      {/* Contenedor de tarjetas con desplazamiento horizontal */}
      <div className="flex w-full gap-[31px] overflow-x-auto scrollbar-hide">
        {items.map((item) => (
          <RecommendationCard
            key={item.id}
            name={item.name}
            description={item.description}
            date={item.date}
            image={item.image}
            href={item.href}
            qualification={item.qualification}
          />
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
