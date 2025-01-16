import React from 'react';

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
    <div className="w-72 flex-shrink-0 rounded-lg border border-[#012A8E] bg-[#D6E2FF] p-4 text-center shadow-md dark:border-[#EBE7E0] dark:bg-[#969696]">
      {/* Imagen circular */}
      <div className="mb-3 flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          {image ? (
            <img src={image} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full rounded-full bg-gray-200 dark:bg-gray-600" />
          )}
        </div>
      </div>
      {/* Estrellas */}
      <div className="mb-3 flex justify-center">
        {'★'
          .repeat(5)
          .split('')
          .map((star, index) => (
            <span key={index} className="mx-0.5 text-4xl text-[#D9D9D9]">
              {star}
            </span>
          ))}
      </div>
      {/* Nombre */}
      <h3 className="mb-2 text-lg text-gray-900 dark:text-black">{name}</h3>
      {/* Descripción */}
      <p className="mb-2 text-sm text-black dark:text-black">{description}</p>
      {/* Fecha */}
      <p className="text-right text-xs text-black dark:text-black">{date}</p>
    </div>
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
    <div className="flex w-full flex-col items-center p-5">
      <h2 className="font-bold text-gray-900 dark:text-gray-100 sm:text-xl md:text-xl lg:text-2xl">
        Ya somos más personas felices :)
      </h2>
      {/* Contenedor de tarjetas con desplazamiento horizontal */}
      <div className="scrollbar-hide w-full overflow-x-auto p-4 sm:w-auto">
        <div className="flex space-x-4">
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
      </div>
    </div>
  );
};

export default Recommendations;
