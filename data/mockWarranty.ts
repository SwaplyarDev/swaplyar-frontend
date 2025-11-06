import { Aumeno, Caida, Transacciones } from '@/utils/assets/imgDatabaseCloudinary';

interface linkType {
  name: string;
  link: string;
}

interface textWarrantyType {
  text: string;
  links?: linkType[] | linkType;
}

export const TextWarranty = [
  {
    text: 'En SwaplyAr, nos comprometemos a que cada cambio de divisas sea seguro y confiable. Con nuestra garantía de satisfacción, podés estar seguro de que tus operaciones se manejaran con la mayor eficiencia y cuidado. ¡Confiá en nosotros para una experiencia sin preocupaciones!',
  },
  {
    title: 'Ventajas Exclusivas al Elegir SwaplyAr para tus Transacciones',
    text: ' En SwaplyAr, no solo garantizamos seguridad total y atención personalizada en cada transacción, sino que también ofrecemos.',
    links: {
      link: '',
      name: 'Beneficios Adicionales',
    },
  },
  {
    text: 'En SwaplyAr, no solo garantizamos seguridad total y atención personalizada en cada transacción, sino que también ofrecemos Beneficios Adicionales. A nuestros usuarios registrados les brindamos promociones exclusivas y cubrimos las comisiones por ti. Mientras que otros servicios aplican comisiones del 5.6% + $0.30 USD en PayPal, nosotros absorbemos esos costos para ofrecerte el mejor valor. Además, trabajamos con múltiples billeteras virtuales como',
    links: [
      {
        link: '',
        name: 'Payoneer',
      },
      {
        link: '',
        name: 'Wise',
      },
      {
        link: '',
        name: 'Pix',
      },
      {
        link: '',
        name: 'USDT',
      },
    ],
  },
  {
    text: ' para brindarte aún más opciones y flexibilidad.',
  },
];

export const cardsData = [
  {
    src: Transacciones,
    alt: 'Imagen de Apoyo',
    title: 'Transacciones',
    backTitle: 'Directas y Seguras',
    backText:
      'Asegurá que el dinero se mueva directamente de SwaplyAr al usuario, sin intermediarios, ofreciendo mayor rapidez y seguridad en cada transacción.',
  },
  {
    src: Aumeno,
    alt: 'Imagen de Transparencia',
    title: 'Aumento',
    backTitle: 'Aumento en la cotización',
    backText:
      'Al confirmar tu pago, fijamos la cotización. Si no recibís el dinero en 8 horas y hay aumento, ajustamos tu tasa.',
  },
  {
    src: Caida,
    alt: 'Imagen de Simplicidad',
    title: 'Caída',
    backTitle: 'Caída en la cotización',
    backText:
      'Confirmá tu pago, bloqueamos la cotización inicial. Si la cotización cae y no has recibido el dinero en 5 horas, mantenemos fijo el valor original.',
  },
];
