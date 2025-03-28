import Image from 'next/image';

const Profile = () => {
  return (
    <div>
      <div>
        <h1>Perfil</h1>
        <div>
          <p>Nombre Usuario</p>
          <p>Regustrado en: 2019</p>
        </div>
        <Image src="" height={100} width={100} alt="imagen de perfil" />
      </div>
      <div>
        {/*Card info presonal*/}
        {/* Card correo electronico */}
        {/* Card Whatsapp */}
        {/* Card Redes Sociales */}
      </div>
    </div>
  );
};

export default Profile;
