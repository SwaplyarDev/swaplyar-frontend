"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { updatePicture } from "../services/profileServices";

export default function ProfilePictureModal({ setShow }: { setShow: (show: boolean) => void }) {
  const { data: session } = useSession();
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
      await updatePicture(session.accessToken, file);
      setShow(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-800 text-black dark:text-white"
      >
        <h2 className="mb-4 text-xl">Cambiar Foto de Perfil</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={() => setShow(false)} className="rounded px-4 py-2 border">
            Cancelar
          </button>
          <button type="submit" disabled={loading || !file} className="rounded bg-blue-500 px-4 py-2 text-white">
            {loading ? "Subiendo..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
