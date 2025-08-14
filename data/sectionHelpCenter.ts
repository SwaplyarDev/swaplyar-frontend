import { helpCenter1, helpCenter2, helpCenter3, helpCenter5, helpCenter6 } from '@/utils/assets/imgDatabaseCloudinary';

export const sectionLinksHelpCenter = [
  {
    image: helpCenter1,
    title: 'Cancelacion y Reembolso',
    text: 'Cancela tu transferencia para obtener un reembolso.',
    href: '/es/centro-de-ayuda/cancelacion-y-reembolso',
    hrefAuth: '/es/auth/centro-de-ayuda/cancelacion-y-reembolso',
  },
  {
    image: helpCenter2,
    title: 'Buscar Solicitud',
    text: 'Consulte el estado de la transferencia.',
    href: '/es/centro-de-ayuda/estado-de-solicitud',
    hrefAuth: '/es/auth/centro-de-ayuda/buscar-solicitud',
  },
  {
    image: helpCenter3,
    title: 'Editar Solicitud',
    text: 'Edita el nombre de tu destinatario en caso de que creas que cometiste un error.',
    href: '/es/centro-de-ayuda/editar-solicitud',
    hrefAuth: '/es/auth/centro-de-ayuda/editar-solicitud',
  },
];

export const sectionBottomHelpCenter = [
  {
    image: helpCenter5,
    title: 'Chateá con nosotros',
    text: 'Comunicate con nuestro representante de Atención al Cliente para recibir ayuda.',
    href: 'https://wa.me/+5491123832198',
  },
  {
    image: helpCenter6,
    title: 'Otro motivo...',
    text: 'Si necesitás contactarnos por otro motivo, simplemente envianos un email y atenderemos tu solicitud.',
    href: 'mailto:centrodeayuda@swaplyar.com',
  },
];
