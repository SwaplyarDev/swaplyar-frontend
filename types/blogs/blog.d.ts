export interface BlogPost {
  title: string;
  body: string;
  url_image: string;
  created_at: string; // Cambiar a `Date` si prefieres usar objetos de fecha
  blog_id: string; // O número, dependiendo de cómo viene desde la API
}

interface BlogPostCardProps {
  title: string;
  body: string;
  url_image: string;
  created_at: string;
}
