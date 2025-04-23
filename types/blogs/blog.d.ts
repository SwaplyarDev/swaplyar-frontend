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
    sections: {
      sidebar: {
        content: {
          text: string | string[];
          style: string;
        }[];
      };
      mainContent: {
        content: {
          text: string | string[];
          style: string;
        }[];
      };
    };
    slug: string;
    title: string;
    image: string;
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
  blog_id: string;
  slug: string;
  seccion: string;
  title: string;
  description: string;
  side_bar: string;
  image: string;
  category: string;
  date: string;
  content_elements: ContentElements;
}
interface ContentElements {
  id_element: string;
  content: Content;
}
interface Content {
  text: string | string[];
  style: {
    id_style: string;
    style_name: string;
  };
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
}

export interface Blog {
  blog_id: string;
  slug: string;
  category: string;
  title: string;
  description?: string;
  image?: string;
  date?: string;
}
