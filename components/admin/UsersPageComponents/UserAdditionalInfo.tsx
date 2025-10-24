'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Edit } from 'lucide-react';
import { EditUserModal } from './EditUserModal';
import { getUserProfileById } from '@/actions/userVerification/verification.action';


export function UserAdditionalInfo({ user }: { user: any }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
  const fetchProfile = async () => {
    const res = await getUserProfileById(user.user_id);
    setProfile(res.data);
    console.log(res.data);
  };
  if (user.user_id) fetchProfile();
}, [user.user_id, refreshKey]);


  const handleProfileUpdated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (!profile)
    return (
      <div className="rounded-lg border bg-white p-4 dark:bg-gray-800">
        <p className="text-sm text-gray-500">Cargando perfil del usuario...</p>
      </div>
    );

  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="font-medium dark:text-white">Información del Usuario</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Nombre', value: profile.firstName },
            { label: 'Apellido', value: profile.lastName },
            { label: 'Correo', value: profile.email },
            { label: 'Teléfono', value: profile.phone },
            { label: 'País', value: profile.user?.locations?.[0]?.country },
            { label: 'Apodo', value: profile.nickName },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
              <p className="font-medium dark:text-gray-200">{item.value || 'No disponible'}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-1 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Edit className="h-4 w-4 text-blue-500" /> Editar
          </button>
        </div>
      </div>

      {openModal && (
        <EditUserModal
          user={profile}
          onClose={() => setOpenModal(false)}
          onUpdated={handleProfileUpdated} 
        />
      )}
    </div>
  );
}
