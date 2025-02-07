import howToUse1 from '@/public/images/howToUse1.png';
import howToUse2 from '@/public/images/howToUse2.png';
import howToUse3 from '@/public/images/howToUse3.png';
import howToUseDark1 from '@/public/images/howToUseDark1.png';
import howToUseDark2 from '@/public/images/howToUseDark2.png';
import howToUseDark3 from '@/public/images/howToUseDark3.png';
import { StaticImageData } from 'next/image';

export interface IHowToUseListItem {
  item: string;
}

export interface IHowToUse {
  src: StaticImageData;
  srcDark: StaticImageData;
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
