import { create } from 'zustand';

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  publishedAt: string;
}

interface BlogStore {
  blogs: Blog[];
  setBlogs: (blogs: Blog[]) => void; // Función para actualizar el estado
}

const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }), // Actualiza el estado
}));

export default useBlogStore;