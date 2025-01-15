import { create } from 'zustand';

// Definimos la interfaz para el estado del usuario
interface User {
  id: string;
  fullName: string;
  role: string;
  email: string;
}

interface UserVerification {
  email: string;
  message: string;
  user_id: string;
}

interface UserInfoStoreState {
  user: User | null;
  userVerification: UserVerification | null;
  setUser: (user: User) => void;
  setUserVerification: (userVerification: UserVerification) => void;
  clearUser: () => void;
}

// Creación del store de Zustand
const userInfoStore = create<UserInfoStoreState>((set) => ({
  user: null, // Estado inicial sin usuario
  userVerification: null,

  setUserVerification: (userVerification) => set({ userVerification }),

  // Función para establecer el usuario
  setUser: (user) => set({ user }),

  // Función para limpiar los datos del usuario
  clearUser: () => set({ user: null }),
}));

export default userInfoStore;
