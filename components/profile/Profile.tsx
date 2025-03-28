import Image from 'next/image';
import ProfileCards from './profileCards/ProfileCards';

export enum Card {
  INFOPERSONAL,
  EMAIL,
  WHATSAPP,
  REDES,
}

const Profile = () => {
  return (
    <div>
      <div>
        <h1>Perfil</h1>
        <div>
          <p>Nombre Usuario</p>
          <p>Registrado en: 2019</p>
        </div>
        <Image src="" height={100} width={100} alt="imagen de perfil" />
      </div>
      <div className="flex flex-col items-center">
        <ProfileCards content={Card.INFOPERSONAL} />
        <ProfileCards content={Card.EMAIL} />
        <ProfileCards content={Card.WHATSAPP} />
        <ProfileCards content={Card.REDES} />
      </div>
    </div>
  );
};

export default Profile;
