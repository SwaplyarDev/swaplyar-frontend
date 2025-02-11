import {
  howToUse1,
  howToUse2,
  howToUse3,
  howToUseDark1,
  howToUseDark2,
  howToUseDark3,
} from '@/utils/assets/img-database';

export interface IHowToUseListItem {
  item: string;
}

export interface IHowToUse {
  src: string;
  srcDark: string;
  title: string;
  text: string;
  list?: boolean;
  listItem?: IHowToUseListItem[];
}

export const howToUseData: IHowToUse[] = [
  {
    src: howToUse1,
    srcDark: howToUseDark2,
    title: 'Paso 1: Selecciona la billetera y el monto',
    text: 'Elige la billetera desde la que harás el cambio e ingresa el monto deseado. Luego, presiona "Procesar Pago".',
  },
  {
    src: howToUse2,
    srcDark: howToUseDark1,
    title: 'Paso 2: Completa el formulario y sube el comprobante',
    text: 'Se abrirá un formulario dividido en tres secciones:',
    list: true,
    listItem: [
      {
        item: 'Datos personales: Nombre, apellido, número de teléfono y correo electrónico.',
      },
      {
        item: 'Datos de destino: Nombre, apellido y dirección de la billetera o cuenta bancaria donde recibirás el dinero.',
      },
      {
        item: 'Pago: Realiza la transferencia y sube el comprobante.',
      },
    ],
  },
  {
    src: howToUse3,
    srcDark: howToUseDark3,
    title: 'Paso 3: Confirmación y acreditación',
    text: 'Nuestro equipo verificará tu solicitud. En menos de 5 minutos, el dinero estará en tu cuenta bancaria o billetera, de forma rápida y segura.',
  },
];
