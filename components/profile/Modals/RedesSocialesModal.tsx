'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import AddSocialNetwork from '../ui/AddSocialNetwork';
import { useProfileStore, PlataformSocial } from '@/store/useProfileStore';
import ProfileModalLayout from './ProfileModalLayout';
import { IconInstagram, IconFacebook, IconTwitterX, IconLinkedin } from '@/components/ui/IconsRed';

type SocialMediaModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

type SocialOption = {
  value: string;
  label: string;
  image: React.ReactNode;
};

// Helper para obtener el icono según el tipo de red social
const getSocialIcon = (type: string) => {
  switch (type) {
    case 'facebook':
      return <IconFacebook className="w-7 h-7" />;
    case 'instagram':
      return <IconInstagram className="w-7 h-7" />;
    case 'twitterX':
      return <IconTwitterX className="w-7 h-7" />;
    case 'Linkedin':
      return <IconLinkedin className="w-7 h-7" />;
    default:
      return null;
  }
};

const RedesSocialesModal = ({ show, setShow }: SocialMediaModalProps) => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const { socialAccounts, addSocial, removeSocial } = useProfileStore();
  const [loading, setLoading] = useState(false);

  const [selectedRed, setSelectedRed] = useState<SocialOption | null>(null);
  const [username, setUsername] = useState('');

  const isFormValid = selectedRed && username.trim() !== '';

  const handleSave = async () => {
    if (!isFormValid || !token) return;

    try {
      setLoading(true);
      await addSocial(token, {
        id: Date.now().toString(),
        type: selectedRed.value as PlataformSocial,
        username,
      });

      // Limpiar el formulario
      setSelectedRed(null);
      setUsername('');

      // Cerrar modal después de agregar
      /* setShow(false); */
    } catch (err) {
      console.error('Error al agregar red social:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSocial = async (id: string) => {
    if (!token) return;
    
    try {
      setLoading(true);
      await removeSocial(token, id);
    } catch (err) {
      console.error('Error al remover red social:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileModalLayout
      show={show}
      setShow={setShow}
      title="Agrega tus redes sociales"
      onSave={handleSave}
      loading={loading}
      buttonDisabled={!isFormValid}
      saveButtonLabel="Guardar"
    >
      <div className="mb-6 mt-4 space-y-5 w-full">
        {/* Formulario para agregar red social */}
        <div className="space-y-3">
          <div className="flex flex-col gap-3 text-start font-textFont">
            <span>Conecta tus redes sociales para enviarte promociones, alertas y beneficios exclusivos por mensaje directo.</span>
            <span className="italic font-light">
              Usaremos esta cuenta cada vez que te hablemos por mensajes o notificaciones.
            </span>
          </div>

          <AddSocialNetwork 
            selectedRed={selectedRed}
            onSelectRed={setSelectedRed}
            username={username}
            onUsernameChange={setUsername}
          />
        </div>

        {/* Redes sociales conectadas */}
        {socialAccounts.length > 0 && (
          <div className="space-y-3">
            <span className="block text-start font-textFont mb-2">Redes Sociales Conectadas</span>
            <div className="flex flex-col gap-2">
              {socialAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex gap-3 p-3 border border-inputLightDisabled justify-between rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    {getSocialIcon(account.type)}
                    <span>{account.username}</span>
                  </div>
                  <button
                    className="content-center rounded-full p-1 justify-center text-red-500 hover:underline flex items-center gap-1"
                    onClick={() => handleRemoveSocial(account.id)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProfileModalLayout>
  );
};

export default RedesSocialesModal;
