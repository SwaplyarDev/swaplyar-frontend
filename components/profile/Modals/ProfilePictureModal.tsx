"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { updatePicture } from "../services/profileServices";
import { MdOutlineClose, MdDeleteOutline, MdOutlinePhotoCamera } from "react-icons/md";
import Image from "next/image";

interface ProfilePictureModalProps {
  setShow: (show: boolean) => void;
  imgProfile: string;
}

export default function ProfilePictureModal({ setShow, imgProfile }: ProfilePictureModalProps) {
  const { data: session, update } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !session?.accessToken) return;

    try {
      setLoading(true);
      const response = await updatePicture(session.accessToken, file);

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

      setShow(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full max-w-md flex-col rounded-xl bg-white p-5 shadow-lg dark:bg-zinc-800 text-black dark:text-white sm:max-w-lg md:max-w-xl lg:max-w-3xl"
      >
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-2xl "
        >
          <MdOutlineClose />
        </button>

        {/* Imagen de perfil */}
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-4 w-full text-start text-lg sm:text-xl font-semibold">
            Foto de perfil
          </h2>
          <Image
            className="rounded-full border border-zinc-300 dark:border-zinc-700"
            src={imgProfile}
            alt="Imagen de perfil"
            width={130}
            height={130}
          />
        </div>

        {/* Acciones */}
        <div className="mt-6 flex flex-col sm:flex-row w-full items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-zinc-400/40">
          <div className="flex w-full sm:w-1/2 flex-col items-center justify-center gap-1 py-3 sm:py-4 hover:bg-zinc-100 dark:hover:bg-zinc-700  transition-colors cursor-pointer">
            <MdOutlinePhotoCamera size={28} className="sm:size-7" />
            <h2 className="text-sm sm:text-base font-semibold">Actualizar foto</h2>
          </div>

          <div className="flex w-full sm:w-1/2 flex-col items-center justify-center gap-1 py-3 sm:py-4 hover:bg-zinc-100 dark:hover:bg-zinc-700  transition-colors cursor-pointer">
            <MdDeleteOutline size={28} className="sm:size-7" />
            <h2 className="text-sm sm:text-base font-semibold">Eliminar</h2>
          </div>
        </div>

        {/* Input oculto y botón opcional */}
        {/* 
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="submit"
            disabled={loading || !file}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400 transition"
          >
            {loading ? "Subiendo..." : "Guardar"}
          </button>
        </div>
        */}
      </form>
    </div>
  );
}
