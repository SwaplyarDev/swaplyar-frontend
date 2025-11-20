'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileStore } from '@/store/useProfileStore';
import { useSession } from 'next-auth/react';
import CustomInput from '@/components/ui/Input/CustomInput';
import ProfileModalLayout from './ProfileModalLayout';

type InfoPersonalModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

type FormData = {
  alias: string;
  country: string;
  department: string;
};

const InfoPersonalModal = ({ show, setShow }: InfoPersonalModalProps) => {
  const { data: session, update } = useSession();
  const token = session?.accessToken;
  const { updateNickname, userProfile } = useProfileStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({ mode: 'onChange' });

  useEffect(() => {
    setValue('alias', userProfile?.nickName || '');
  }, [setValue, userProfile?.nickName]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!token) throw new Error("No access token available");
      setLoading(true);

      if (data.alias) {
        // Update profile via store
        await updateNickname(token, data.alias);

        // Update session
        if (session?.user) {
          await update({
            user: {
              ...session.user,
              profile: {
                ...session.user.profile,
                nickName: data.alias,
              },
            },
          });
        }
      }

      setShow(false);
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileModalLayout
      show={show}
      setShow={setShow}
      title="Editar Apodo"
      onSave={handleSubmit(onSubmit)}
      loading={loading}
      saveButtonLabel="Guardar"
    >
      <div className="flex flex-col gap-4 text-start font-textFont">
        <span>Decinos cómo te gusta que te llamen</span>
        <span className="italic font-light">Usaremos este apodo cada vez que te hablemos por mensajes o notificaciones.</span>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <CustomInput
            label="Apodo"
            register={register}
            name="alias"
            type="text"
            placeholder="Apodo"
            value={watch('alias')}
          />
        </form>
      </div>
    </ProfileModalLayout>
  );
};

export default InfoPersonalModal;