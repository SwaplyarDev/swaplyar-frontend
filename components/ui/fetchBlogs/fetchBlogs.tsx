export interface BlogResponse {
    blogsPerPage: any[]; // Define el tipo correcto de tu estructura de blogs
    meta: {
      totalPages: number;
    };
  }
  
  export const fetchBlogs = async (
    page: number,
    searchTerm: string,
    BASE_URL: string
  ): Promise<BlogResponse> => {
    try {
      let url = `${BASE_URL}/v1/blogs?page=${page}`;
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
  
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
  
      const data: BlogResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  };