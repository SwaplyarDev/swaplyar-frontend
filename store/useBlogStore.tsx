import { create } from 'zustand';

interface Blog {
  id: number;            
  title: string;          
  content: string;        
  author: string;         
  imageUrl: string;       
  publishedAt: string;
}

interface BlogState {
  blogs: Blog[];
  isLoading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
}

// Creación del store con Zustand
const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  isLoading: false,
  error: null,

  fetchBlogs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('https://swaplyar-back.vercel.app/api/v1/blogs');
      const data = await response.json();
      
      // Verificar si data es un array. Si no lo es, se asigna un array vacío.
      if (Array.isArray(data)) {
        set({ blogs: data, isLoading: false });
      } else {
        set({ blogs: [], isLoading: false, error: 'Invalid data format' });
      }
      
    } catch (error) {
      set({ error: 'Failed to fetch blogs', isLoading: false });
    }
  }
}));

export default useBlogStore;