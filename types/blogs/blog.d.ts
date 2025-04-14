export interface BlogPost {
  sub_title: string;
  title: string;
  body: string;
  url_image: string;
  created_at: string;
  blog_id: string;
}

export interface CardContentProps {
  data: {
    blog_id?: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    blog_id: string;
    sections: {
      sidebar: {
        content: string[];
      };
      mainContent: {
        content: {
          text: string | string[];
          style: string;
        }[];
      };
    };
  };
}

export interface RandomCardProps {
  blog_id: string;
  title: string;
  description: string;
  image: string;
  slug: string; // Added slug property
}

interface BlogPostCardProps {
  id?: string;
  blog_id: string;
  category: string;
  title: string;
  body: string;
  image: string;
  created_at: string;
  subtitulos: any[];
  create_at: string;
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

export interface Blog {
  blog_id: string;
  sub_title: string;
  category: string;
  title: string;
  body: string;
  url_image: string;
  created_at: string;
  ver: string;
  status: string;
}
