
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { updatePicture } from "../services/profileServices";
import NextImage from "next/image";
import { UpdatePictureModal } from "./UpdatePictureModal";
import { DeletePictureModal } from "./DeletePictureModal";
import { swaplyArAvatar } from "@/utils/assets/imgDatabaseCloudinary";
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

const AVATAR_ICONS = [
  { name: "avatar 1", image: swaplyArAvatar },
  { name: "avatar 2", image: swaplyArAvatar },
  { name: "avatar 3", image: swaplyArAvatar },
  { name: "avatar 4", image: swaplyArAvatar },
]

export default function ProfilePictureModal({
  setShow,
  imgProfile,
}: ProfilePictureModalProps) {
  const { data: session, update } = useSession();
  const [openDelete, setOpenDelete] = useState(false);
  const [modalUpdatePhoto, setModalUpdatePhoto] = useState(false);
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
  const isCustomPicture = imgProfile && !imgProfile.includes('swaplyArAvatar');
  const [showCurrentPicture, setShowCurrentPicture] = useState(isCustomPicture);

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
    }
  };

  const handleSubmit = async () => {
    if (!session?.accessToken) return;

    try {
      setLoading(true);

      // Si hay un avatar seleccionado, solo hacer update directo
      if (selectedAvatar) {
        const avatar = AVATAR_ICONS.find(av => av.name === selectedAvatar);
        if (avatar) {
          const response = await fetch(avatar.image);
          const blob = await response.blob();
          const fileFromUrl = new File([blob], "avatar.png", { type: blob.type });
          const res = await updatePicture(session.accessToken, fileFromUrl);
          console.log('Respuesta de updatePicture:', res);
        }
      }

      // Si hay un archivo cargado, recortarlo y subirlo
      if (file && croppedAreaPixels) {
        const fileToUpload = await getCroppedImg(imagePreview, croppedAreaPixels, rotation);

        // Enviar el archivo recortado
        const res = await updatePicture(session.accessToken, fileToUpload);
        console.log('Respuesta de updatePicture:', res);

        // Limpieza
        URL.revokeObjectURL(imagePreview);
        setShow(false);
        return;
      }

      // Si no hay ni archivo ni avatar, no continuar
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setShow(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!session?.accessToken) return;

    try {
      setLoading(true);
      const response = await fetch(swaplyArAvatar);
      const blob = await response.blob();
      const fileFromUrl = new File([blob], "swaplyArAvatar.png", { type: blob.type });

      await updatePicture(session.accessToken, fileFromUrl);

      await update({
        user: {
          ...session.user,
          profile: {
            ...(session.user?.profile || {}),
            profilePictureUrl: swaplyArAvatar,
          },
        },
      });
      setShowCurrentPicture(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
      title={file ? "Recortar o Girar" : "Foto de perfil"}
      onSave={handleSubmit}
      loading={loading}
      buttonDisabled={!file && (selectedAvatar === null) && !showCurrentPicture}
      saveButtonLabel={file ? "Subir foto" : selectedAvatar ? "Cambiar Avatar" : "Guardar"}
      className="!gap-3"
    >
      {/* Mostrar foto actual si existe */}
      {showCurrentPicture && !file && (
        <div className="relative flex flex-col items-center gap-4 w-full">
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
            onClick={() => {
              handleRemoveImage();
              setShowCurrentPicture(false);
            }}
            disabled={loading}
            className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 border-red-300 bg-errorColor hover:bg-errorColorDark disabled:opacity-50 text-white font-semibold transition"
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      )}

      {!file && !showCurrentPicture && (
        <>
          <div className="flex justify-start">
            <span className="font-textFont italic text-start">Subir la imagen que se mostrara en tu perfil o seleccione uno de los personajes que más te guste</span>
          </div>

          <div className="flex justify-between my-9">
            {AVATAR_ICONS.map((avatar) => (
              <div
                key={avatar.name}
                className={`relative size-20 rounded-full overflow-hidden border-4 cursor-pointer hover:border-custom-blue ${selectedAvatar === avatar.name ? 'border-custom-blue' : 'border-custom-whiteD-500'
                  }`}
                onClick={() => {
                  setSelectedAvatar(avatar.name);
                  setImagePreview(avatar.image);
                  setFile(null);
                }}
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
        </>
      )}



      <div className="flex flex-col items-center text-center w-full min-w-[500px]">
        {file ? (
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
        ) : (
          <>
            {/* <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700">
            <NextImage
              src={imagePreview}
              alt="Imagen de perfil"
              fill
              className="object-cover rounded-full"
              sizes="150px"
            />
          </div> */}
            <FileUpload
              handleChange={handleFileChange}
              maxFiles={1}
            />
          </>
        )}

        {/* <>
          {openDelete ? (
            <DeletePictureModal
              loading={loading}
              removeImage={handleRemoveImage}
              setShow={setOpenDelete}
            />
          ) : modalUpdatePhoto ? (
            <UpdatePictureModal
              file={file}
              handleFileChange={handleFileChange}
              loading={loading}
            />
          ) : (
            <section className="mt-6 flex flex-col sm:flex-row w-full items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-zinc-400/40">
              <div className="flex w-full sm:w-1/2 flex-col items-center justify-center py-3 transition-colors">
                <div
                  onClick={() => setModalUpdatePhoto(true)}
                  className="cursor-pointer flex flex-col justify-center items-center hover:font-semibold hover:text-[#012d8a]"
                >
                  <BsCamera className="w-7 h-7 lg:w-8 lg:h-8 py-1" />
                  <h2 className="text-sm sm:text-base font-semibold">
                    {file ? "Cambiar Foto" : "Cargar Foto"}
                  </h2>
                </div>
              </div>

              <div className="flex w-full sm:w-1/2 flex-col items-center justify-center py-3 transition-colors">
                <div
                  onClick={() => setOpenDelete(true)}
                  className="cursor-pointer flex flex-col justify-center hover:text-red-500 items-center"
                >
                  <BsTrash className="w-7 h-7 lg:w-8 lg:h-8 py-1" />
                  <h2 className="text-sm sm:text-base font-semibold">Eliminar</h2>
                </div>
              </div>
            </section>
          )}
        </> */}
      </div>
    </ProfileModalLayout>
  );
}