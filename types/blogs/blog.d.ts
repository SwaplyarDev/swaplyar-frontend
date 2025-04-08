export interface BlogPost {
  sub_title: string;
  title: string;
  body: string;
  url_image: string;
  created_at: string;
  blog_id: string;
}

interface BlogPostCardProps {
  id?: string;
  blog_id: string;
  category: string;
  title: string;
  body: string;
  url_image: string;
  created_at: string;
  subtitulos: any[];
  create_at: string;
}
interface dataBlog {
  slug: string;
  sections: {
    sidebar: {
      content: (string | string[])[];
    };
    mainContent: {
      content: (
        | {
            text: string;
            style: string;
          }
        | {
            text: (string | string[])[];
            style: string;
          }
      )[];
    };
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
