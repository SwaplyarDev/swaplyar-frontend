import { create } from 'zustand';

// Definimos la interfaz para el estado del usuario
interface User {
  id: string;
  fullName: string;
  role: string;
  email: string;
}

interface UserInfoStoreState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

// Creación del store de Zustand
const userInfoStore = create<UserInfoStoreState>((set) => ({
  user: null, // Estado inicial sin usuario

  // Función para establecer el usuario
  setUser: (user) => set({ user }),

  // Función para limpiar los datos del usuario
  clearUser: () => set({ user: null }),
}));

export default userInfoStore;
