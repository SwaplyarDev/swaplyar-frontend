import Image from 'next/image';
import ProfileCards from './profileCards/ProfileCards';
import { swaplyArAvatar } from '@/utils/assets/img-database';

export enum Card {
  INFOPERSONAL,
  EMAIL,
  WHATSAPP,
  REDES,
}

const Profile = () => {
  return (
    <div className="font-textFont">
      <div className="flex h-[184px] items-start justify-between bg-[#4B4B4B] px-16 xs:h-[150px]">
        <h1 className="weight-bold font-titleFont text-3xl xs:text-2xl">Perfil De Usuario</h1>
        <div className="mt-12 flex justify-evenly gap-5">
          <div className="flex flex-col justify-end">
            <p>Oa Johan Javier Suarez</p>
            <p className="underline">Registrado en: 2019</p>
          </div>
          <Image src={swaplyArAvatar} height={100} width={100} alt="imagen de perfil" className="rounded-full" />
        </div>
      </div>
      <div className="flex h-[800px] min-h-screen flex-col items-center justify-around">
        <ProfileCards content={Card.INFOPERSONAL} />
        <ProfileCards content={Card.EMAIL} />
        <ProfileCards content={Card.WHATSAPP} />
        <ProfileCards content={Card.REDES} />
      </div>
    </div>
  );
};

export default Profile;
