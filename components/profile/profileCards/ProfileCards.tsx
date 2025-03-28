import { Email, Instagram, WhatsApp } from '@mui/icons-material';
import { Card } from '../Profile';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

type ProfileCardsProps = {
  content: Card;
};

const ProfileCards = ({ content }: ProfileCardsProps) => {
  const { isDark } = useDarkTheme();

  return (
    <div className="">
      {content === Card.INFOPERSONAL && (
        <section className="h-[252px] w-[768px]">
          <h2>Informacion Personal</h2>
          <div className="flex justify-between">
            <div>
              <p>Nombre Legal:</p>
              <p>Nacionalidad:</p>
              <p>N° Documento:</p>
              <p>Fecha Nacimiento:</p>
            </div>
            <div>
              <p>Oa</p>
              <p>Argentina</p>
              <p>12345678</p>
              <p>01/01/2000</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p>Apodo</p>
            <div className="flex">
              <p className="mr-10">Suarez Oa</p>
              <span onClick={() => console.log('hola')}>Editar</span>
            </div>
          </div>
        </section>
      )}
      {content === Card.EMAIL && (
        <section className="my-20 h-[148px] w-[768px]">
          <div className="flex justify-between">
            <h2>Correo Electronico</h2>
            <Email />
          </div>
          <p>ceo_oa@swaplyar.com</p>
        </section>
      )}
      {content === Card.WHATSAPP && (
        <section className="my-20 h-[148px] w-[768px]">
          <div className="flex justify-between">
            <h2>Whatsapp</h2>
            <WhatsApp />
          </div>
          <div className="flex justify-between">
            <p>12345678</p>
            <span onClick={() => console.log('hola')}>Editar</span>
          </div>
        </section>
      )}
      {content === Card.REDES && (
        <section className="my-20 h-[148px] w-[768px] rounded-2xl bg-[#4B4B4B]">
          <div className="flex justify-between p-4">
            <h2 className="font-Roboto">Redes Sociales</h2>
            <Instagram />
          </div>
          <div className="flex justify-between p-4">
            <p>swaplyar</p>
            <div className="flex flex-col items-end">
              <p>Suarez_Oa</p>
              <span onClick={() => console.log('hola')}>Editar</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfileCards;
