import { create } from 'zustand';

interface Blog {
  blog_id: string;
  sub_title: string;
  title: string;
  body: string;
  url_image: string;
  created_at: string;
  ver: string;
  status: string;
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
