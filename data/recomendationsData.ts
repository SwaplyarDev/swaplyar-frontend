import { userRecomend1, userRecomend2, userRecomend3 } from '@/utils/assets/imgDatabaseCloudinary';

const recomendationsData = [
  {
    id: 1,
    name: 'Renan Dias Baptista',
    description:
      '¡SwaplyAr es la mejor plataforma de cambio de Argentina! Siempre consigo las mejores tarifas y el cambio es súper rápido. La atención es excelente, están disponibles 24/7 y resuelven todo al instante. Súper confiable y sin vueltas. ¡Mi opción número uno para cambiar dinero!',
    date: 'fecha 15/12/2024',
    image: userRecomend1,
    href: 'https://www.linkedin.com/in/renan-dias-b9745284/',
    qualification: 5,
    largeText: true,
  },
  {
    id: 2,
    name: 'Facundo Gaudelli',
    description: 'Muy correcto el servicio, muchas gracias',
    date: 'fecha 23/01/2025',
    image: userRecomend2,
    href: 'https://www.instagram.com/facundogaudelli/',
    qualification: 4,
  },
  {
    id: 3,
    name: 'Nelson Chuquen',
    description:
      'Excelente servicio, lo utilizo bastante para poder cambiar mis dólares de Paypal a pesos argentinos, el proceso es rápido y seguro. Recomendado',
    date: 'fecha 05/02/2025',
    image: userRecomend3,
    href: 'https://www.linkedin.com/in/nelson-chuquen/',
    qualification: 5,
  },
];

export default recomendationsData;
