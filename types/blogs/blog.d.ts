export interface BlogPost {
  title: string;
  body: string;
  url_image: string;
  created_at: string;
  blog_id: string;
}

interface BlogPostCardProps {
  title: string;
  body: string;
  url_image: string;
  created_at: string;
}

export interface BlogResponse {
  blogsPerPage: any[];
  meta: {
    totalPages: number;
  };
}

export interface UseFetchBlogsProps {
  currentPage: number;
  searchTerm: string;
  setTotalPages: (pages: number) => void;
}
