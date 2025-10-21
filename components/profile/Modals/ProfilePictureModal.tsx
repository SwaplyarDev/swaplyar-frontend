
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { updatePicture } from "../services/profileServices";
import { MdOutlineClose } from "react-icons/md";
import { BsTrash, BsCamera } from "react-icons/bs";
import NextImage from "next/image";
import { UpdatePictureModal } from "./UpdatePictureModal";
import { DeletePictureModal } from "./DeletePictureModal";
import { swaplyArAvatar } from "@/utils/assets/imgDatabaseCloudinary";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/utils/canvasUtils";

interface ProfilePictureModalProps {
  setShow: (show: boolean) => void;
  imgProfile: string;
}

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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = (_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const objectUrl = URL.createObjectURL(selectedFile);
      setImagePreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !session?.accessToken || !croppedAreaPixels) return;

    try {
      setLoading(true);

      // Generar nuevo archivo recortado
      const croppedFile = await getCroppedImg(imagePreview, croppedAreaPixels);

      // Enviar el archivo recortado
      const response = await updatePicture(session.accessToken, croppedFile);

      if (response?.result?.imgUrl) {
        await update({
          user: {
            ...session.user,
            profile: {
              ...(session.user?.profile || {}),
              profilePictureUrl: response.result.imgUrl,
            },
          },
        });
      }

      // Limpieza
      URL.revokeObjectURL(imagePreview);
      setShow(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!session?.accessToken) return;

    try {
      setLoading(true);
      const response = await fetch(swaplyArAvatar);
      const blob = await response.blob();
      const fileFromUrl = new File([blob], "swaplyArAvatar.png", { type: blob.type });

      const res = await updatePicture(session.accessToken, fileFromUrl);

      if (res?.result?.imgUrl) {
        await update({
          user: {
            ...session.user,
            profile: {
              ...(session.user?.profile || {}),
              profilePictureUrl: res.result.imgUrl,
            },
          },
        });
      }

      setShow(false);
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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4">
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full max-w-md flex-col rounded-xl bg-white p-5 shadow-lg dark:bg-zinc-800 text-black dark:text-white sm:max-w-lg md:max-w-xl lg:max-w-3xl"
      >
        <button
          type="button"
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-2xl"
        >
          <MdOutlineClose />
        </button>

        <div className="flex flex-col items-center text-center">
          <h2 className="mb-4 w-full text-start text-lg sm:text-xl font-semibold">
            Foto de perfil
          </h2>

          {file ? (
            <div className="flex flex-col items-center space-y-1 w-3/4  lg:w-1/2">
              <div className="relative w-full  h-40 lg:h-64 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <Cropper
                  image={imagePreview}
                  crop={crop}
                  zoom={zoom}
                  cropShape="round"
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              <div className="w-full max-w-2xl space-y-4">
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                />
              </div>
            </div>
          ) : (
            <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700">
              <NextImage
                src={imagePreview}
                alt="Imagen de perfil"
                fill
                className="object-cover rounded-full"
                sizes="150px"
              />
            </div>
          )}
        </div>

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
      </form>
    </div>
  );
}





// "use client";

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { updatePicture } from "../services/profileServices";
// import { MdOutlineClose } from "react-icons/md";
// import { BsTrash, BsCamera } from "react-icons/bs";
// import Image from "next/image";
// import { UpdatePictureModal } from "./UpdatePictureModal";
// import { DeletePictureModal } from './DeletePictureModal';
// import { swaplyArAvatar } from "@/utils/assets/imgDatabaseCloudinary";
// import Cropper, { Area } from 'react-easy-crop';

// interface ProfilePictureModalProps {
//   setShow: (show: boolean) => void;
//   imgProfile: string;
// }

// export default function ProfilePictureModal({ setShow, imgProfile }: ProfilePictureModalProps) {
//   const { data: session, update } = useSession();
//   const [openDelete, setOpenDelete] = useState(false);
//   const [modalUpdatePhoto, setModalUpdatePhoto] = useState(false);
//   const [file, setFile] = useState<File | null>(null); // Cambiado a null
//   const [imagePreview, setImagePreview] = useState<string>(imgProfile);
//   const [loading, setLoading] = useState(false);
//   const [crop, setCrop] = useState({ x: 0, y: 0 })
//   const [zoom, setZoom] = useState(1)
//   const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
//     console.log(croppedArea, croppedAreaPixels)
//   }
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);

//       // Crear URL para el preview
//       const objectUrl = URL.createObjectURL(selectedFile);
//       setImagePreview(objectUrl);
//     }
//   };



//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file || !session?.accessToken) return;

//     try {
//       setLoading(true);
//       const response = await updatePicture(session.accessToken, file);

//       if (response?.result?.imgUrl) {
//         await update({
//           user: {
//             ...session.user,
//             profile: {
//               ...(session.user?.profile || {}),
//               profilePictureUrl: response.result.imgUrl,
//             },
//           },
//         });
//       }

//       // Limpiar URLs creadas
//       if (file) {
//         URL.revokeObjectURL(imagePreview);
//       }

//       setShow(false);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleRemoveImage = async () => {
//     if (!session?.accessToken) return;

//     try {
//       setLoading(true);

//       // Convertir la URL a File
//       const response = await fetch(swaplyArAvatar);
//       const blob = await response.blob();
//       const fileFromUrl = new File([blob], "swaplyArAvatar.png", { type: blob.type });

//       // Enviar al service
//       const res = await updatePicture(session.accessToken, fileFromUrl);

//       if (res?.result?.imgUrl) {
//         await update({
//           user: {
//             ...session.user,
//             profile: {
//               ...(session.user?.profile || {}),
//               profilePictureUrl: res.result.imgUrl,
//             },
//           },
//         });
//       }

//       setShow(false);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Limpiar URLs al desmontar el componente
//   useEffect(() => {
//     return () => {
//       if (file) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [file, imagePreview]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="relative flex w-full max-w-md flex-col rounded-xl bg-white p-5 shadow-lg dark:bg-zinc-800 text-black dark:text-white sm:max-w-lg md:max-w-xl lg:max-w-3xl"
//       >
//         <button
//           type="button"
//           onClick={() => setShow(false)}
//           className="absolute top-3 right-3 text-2xl"
//         >
//           <MdOutlineClose />
//         </button>

//         {/* Imagen de perfil con preview */}
//         <div className="flex flex-col items-center text-center">
//           <h2 className="mb-4 w-full text-start text-lg sm:text-xl font-semibold">
//             Foto de perfil
//           </h2>
//           {file ? (
//             <div className="flex flex-col items-center space-y-8 w-1/2">
//               {/* Contenedor del Cropper */}
//               <div className="relative w-full max-w-md h-64 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
//                 <Cropper
//                   image={imagePreview}
//                   crop={crop}
//                   zoom={zoom}
//                   cropShape="round"
//                   aspect={1}
//                   onCropChange={setCrop}
//                   onCropComplete={onCropComplete}
//                   onZoomChange={setZoom}
//                 />
//               </div>

//               {/* Controles */}
//               <div className="w-full max-w-2xl space-y-4">
//                 <input
//                   type="range"
//                   value={zoom}
//                   min={1}
//                   max={3}
//                   step={0.1}
//                   onChange={(e) => setZoom(Number(e.target.value))}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
//                 />


//               </div>

//             </div>
//           ) : (
//             <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700">

//               <Image
//                 src={imagePreview}
//                 alt="Imagen de perfil"
//                 fill
//                 className="object-cover rounded-full"
//                 sizes="150px"
//               />
//             </div>
//           )}




//         </div>

//         {openDelete ? (
//           <DeletePictureModal loading={loading} removeImage={handleRemoveImage} setShow={setOpenDelete} />

//         ) : modalUpdatePhoto ? (
//           <UpdatePictureModal
//             file={file}
//             handleFileChange={handleFileChange}
//             loading={loading}

//           />
//         ) : (
//           <section className="mt-6 flex flex-col sm:flex-row w-full items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-zinc-400/40">
//             <div className="flex w-full sm:w-1/2 flex-col items-center justify-center py-3 transition-colors">
//               <div
//                 onClick={() => setModalUpdatePhoto(true)}
//                 className="cursor-pointer flex flex-col justify-center items-center hover:font-semibold hover:text-[#012d8a]"
//               >
//                 <BsCamera className="w-7 h-7 lg:w-8 lg:h-8 py-1 " />
//                 <h2 className="text-sm sm:text-base font-semibold ">
//                   {file ? "Cambiar Foto" : "Cargar Foto"}
//                 </h2>
//               </div>
//             </div>

//             <div className="flex w-full sm:w-1/2 flex-col items-center justify-center py-3 transition-colors">
//               <div
//                 onClick={() => setOpenDelete(true)}
//                 className="cursor-pointer flex flex-col justify-center hover:text-red-500 items-center"
//               >
//                 <BsTrash className="w-7 h-7 lg:w-8 lg:h-8 py-1" />
//                 <h2 className="text-sm sm:text-base font-semibold">
//                   Eliminar
//                 </h2>
//               </div>
//             </div>
//           </section>
//         )}
//       </form>
//     </div>
//   );
// }