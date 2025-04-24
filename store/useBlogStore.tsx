import { create } from 'zustand';

interface Blog {
  slug: any;
  image: any;
  description: any;
  blog_id: string;
  sub_title: string;
  category: string;
  title: string;
  body: string;
  url_image: string;
  date: string;
  ver: string;
  status: string;
}
interface BlogStore {
  blogs: Blog[];
  isLoading: boolean;
  setIsLoading: (arg: boolean) => void;
  setBlogs: (blogs: Blog[]) => void; // Función para actualizar el estado
}

const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  setBlogs: (blogs) => set({ blogs }), // Actualiza el estado
}));

export default useBlogStore;
