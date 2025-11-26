
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import NextImage from "next/image";
import { avatarUser1, avatarUser2, avatarUser3, avatarUser4 } from "@/utils/assets/imgDatabaseCloudinary";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/utils/canvasUtils";
import ProfileModalLayout from "./ProfileModalLayout";
import FileUpload from "@/components/ui/FileUpload/FileUpload";
import { useProfileStore } from "@/store/useProfileStore";
import { Trash2Icon } from "lucide-react";

interface ProfilePictureModalProps {
  setShow: (show: boolean) => void;
  imgProfile: string;
}

// Esta array de imagenes va a tener imagenes de avatar por defecto
const AVATAR_ICONS = [
  { name: "avatar 1", image: avatarUser1 },
  { name: "avatar 2", image: avatarUser2 },
  { name: "avatar 3", image: avatarUser3 },
  { name: "avatar 4", image: avatarUser4 },
]

type ModalState = 'initial' | 'crop' | 'current' | 'delete-confirmation';

export default function ProfilePictureModal({
  setShow,
  imgProfile,
}: ProfilePictureModalProps) {
  const { data: session, update } = useSession();

  // Estados principales
  const [modalState, setModalState] = useState<ModalState>('initial');
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(imgProfile);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const { updatePicture } = useProfileStore();

  // Detectar si la imagen actual es un avatar por defecto o una foto personalizada
  const isCustomPicture = !AVATAR_ICONS.some(avatar => avatar.image === imgProfile);

  // Inicializar estado basado en si hay imagen personalizada
  useEffect(() => {
    if (isCustomPicture) {
      setModalState('current');
    } else {
      setModalState('initial');
    }
  }, [isCustomPicture]);

  const onCropComplete = (_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setSelectedAvatar(null);

      const objectUrl = URL.createObjectURL(selectedFile);
      setImagePreview(objectUrl);
      setModalState('crop');
    }
  };

  const handleSelectAvatar = (avatarName: string) => {
    setSelectedAvatar(avatarName);
    const avatar = AVATAR_ICONS.find(av => av.name === avatarName);
    if (avatar) {
      setImagePreview(avatar.image);
    }
  };

  const handleSubmit = async () => {
    if (!session?.accessToken) return;

    try {
      setLoading(true);

      // Si hay un avatar seleccionado, solo hacer update directo
      // Esto se va a cambiar para que actualice directamente la imagen de perfil y no tenga que subir la imagen a cloudinary otra vez
      if (selectedAvatar) {
        const avatar = AVATAR_ICONS.find(av => av.name === selectedAvatar);
        if (avatar) {
          const response = await fetch(avatar.image);
          const blob = await response.blob();
          const fileFromUrl = new File([blob], "avatar.png", { type: blob.type });
          await updatePicture(session.accessToken, fileFromUrl);
        }
      }

      // Si hay un archivo cargado, recortarlo y subirlo
      if (file && croppedAreaPixels) {
        const fileToUpload = await getCroppedImg(imagePreview, croppedAreaPixels, rotation);
        await updatePicture(session.accessToken, fileToUpload);
        URL.revokeObjectURL(imagePreview);
      }

      setShow(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDeleteAndSelectAvatar = async () => {
    if (!selectedAvatar || !session?.accessToken) return;

    try {
      setLoading(true);
      const avatar = AVATAR_ICONS.find(av => av.name === selectedAvatar);
      if (avatar) {
        const response = await fetch(avatar.image);
        const blob = await response.blob();
        const fileFromUrl = new File([blob], "avatar.png", { type: blob.type });
        await updatePicture(session.accessToken, fileFromUrl);

        await update({
          user: {
            ...session.user,
            profile: {
              ...(session.user?.profile || {}),
              profilePictureUrl: avatar.image,
            },
          },
        });
      }

      setModalState('initial');
      setSelectedAvatar(null);
      setFile(null);
      setShow(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = () => {
    setFile(null);
    setSelectedAvatar(null);
    setModalState('initial');
  };

  // Limpiar URLs al desmontar
  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [file, imagePreview]);

  return (
    <ProfileModalLayout
      show={true}
      setShow={setShow}
      title={
        modalState === 'crop'
          ? "Recortar o Girar"
          : modalState === 'initial'
            ? "Subir Icono de la Red"
          : modalState === 'delete-confirmation'
            ? "Borrar foto de perfil"
            : "Foto de perfil"
      }
      onSave={
        modalState === 'current'
          ? handleChangeImage
          : modalState === 'delete-confirmation'
            ? handleConfirmDeleteAndSelectAvatar
            : handleSubmit
      }
      loading={loading}
      buttonDisabled={
        modalState === 'initial' && selectedAvatar === null ||
        modalState === 'crop' && !croppedAreaPixels ||
        modalState === 'delete-confirmation' && !selectedAvatar
      }
      saveButtonLabel={
        modalState === 'crop'
          ? "Guardar foto"
          : modalState === 'current'
            ? "Cambiar"
            : modalState === 'delete-confirmation'
              ? "Confirmar"
              : "Guardar"
      }
      className="!gap-3"
    >
      {/* ESTADO 1: Imagen Actual - Mostrar foto actual con opción de eliminar o cambiar */}
      {modalState === 'current' && (
        <div className="relative flex flex-col items-center gap-4 w-[176px] justify-self-center">
          <div className="relative size-[176px] rounded-full overflow-hidden">
            <NextImage
              src={imgProfile}
              alt="Foto de perfil actual"
              fill
              className="object-cover rounded-full"
              sizes="176px"
            />
          </div>
          <button
            onClick={() => setModalState('delete-confirmation')}
            disabled={loading}
            className="absolute top-0 right-0 flex items-center gap-2 p-2 rounded-full border-2 border-red-300 bg-errorColor hover:bg-errorColorDark disabled:opacity-50 text-white font-semibold transition"
          >
            <Trash2Icon className="size-5" />
          </button>
        </div>
      )}

      {/* ESTADO 2: Inicial - Mostrar selector de avatares y upload */}
      {modalState === 'initial' && (
        <>
          <div className="flex justify-start">
            <span className="font-textFont italic text-start">Subir la imagen que se mostrara en tu perfil o seleccione uno de los personajes que más te guste</span>
          </div>

          <div className="flex justify-between my-9">
            {AVATAR_ICONS.map((avatar) => (
              <div
                key={avatar.name}
                className={`relative size-20 shadow-infoCard rounded-full overflow-hidden border-4 cursor-pointer hover:border-custom-blue ${selectedAvatar === avatar.name ? 'border-custom-blue' : 'border-custom-blue md:border-custom-whiteD-500 dark:border-custom-whiteD-500'
                  }`}
                onClick={() => handleSelectAvatar(avatar.name)}
              >
                <NextImage
                  src={avatar.image}
                  alt={avatar.name}
                  fill
                  className="object-cover rounded-full"
                  sizes="70px"
                />
              </div>
            ))}
          </div>

          <FileUpload
            handleChange={handleFileChange}
            maxFiles={1}
          />
        </>
      )}

      {/* ESTADO 3: Crop - Mostrar cropper de imagen */}
      {modalState === 'crop' && (
          <div className="flex flex-col items-center space-y-1 w-full">
            <div className="relative w-full h-40 lg:h-64 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <Cropper
                image={imagePreview}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                cropShape="round"
                aspect={1}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="w-full max-w-2xl space-y-4">
              <div>
                <label className="text-sm block my-2">Zoom</label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-buttonsExtraLigthDark rounded-lg cursor-pointer range !border-none range-slider accent-custom-blue"
                />
              </div>
              <div>
                <label className="text-sm block mb-2">Rotación</label>
                <input
                  type="range"
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-2 bg-buttonsExtraLigthDark rounded-lg cursor-pointer range !border-none range-slider accent-custom-blue"
                />
              </div>
            </div>
          </div>
      )}

      {/* ESTADO 4: Delete Confirmation - Mostrar confirmación y selector de avatares */}
      {modalState === 'delete-confirmation' && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col justify-center">
            <span className="font-textFont italic text-start my-4">¿Seguro que quieres eliminar la foto de perfil?</span>
            <span className="font-textFont italic text-start mb-4">al eliminar la foto de perfil, se seleccionara una de estas imagen aleatoriamente o seleccione la imagen que mas desee</span>
          </div>

          <div className="flex justify-between gap-2 mb-4">
            {AVATAR_ICONS.map((avatar) => (
              <div
                key={avatar.name}
                className={`relative size-20 shadow-infoCard rounded-full overflow-hidden border-4 cursor-pointer hover:border-custom-blue ${selectedAvatar === avatar.name ? 'border-custom-blue' : 'border-custom-blue md:border-custom-whiteD-500 dark:border-custom-whiteD-500'
                  }`}
                onClick={() => setSelectedAvatar(avatar.name)}
              >
                <NextImage
                  src={avatar.image}
                  alt={avatar.name}
                  fill
                  className="object-cover rounded-full"
                  sizes="70px"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </ProfileModalLayout>
  );
}