export interface BlogPost {
    blog_id: string;       // O número, dependiendo de cómo viene desde la API
    title: string;
    body: string;
    url_image: string;
    created_at: string;    // Cambiar a `Date` si prefieres usar objetos de fecha
}