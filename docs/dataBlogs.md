# Estructura General

El array **dataBlogs** contiene objetos que representan artículos de blog.
Cada blog contiene campos principales , los cuales son:

- **blog_id**: Identificador único del artículo

- **title**: Título principal del artículo

- **image**: Ruta a la imagen destacada del artículo

- **slug**: URL para el artículo 

- **description**: Breve descripción/resumen del artículo

- **category**: Categoría temática del artículo (ej. "Mercado")

- **date**: Fecha de publicación

- **sections** : Secciones del contenido (sidebar y mainContent)

## Estructura de Secciones

#### 1. Sidebar (sections.sidebar)
- **content**: Array que contiene los elementos que aparecerán en la barra lateral
    - Puede contener strings simples o arrays anidados para agrupar elementos relacionados

#### 2. Main Content (sections.mainContent)
- content: Array de objetos que representan párrafos/secciones del contenido principal

    - Cada objeto tiene:

        - text: El contenido textual (puede ser string, array de strings o estructura más compleja segun el style)

        - style: tipo de texto que se requiere 
            
### Tipos de texto (style)

El campo style puede variar segun el tipo de texto que se requiera en el momento de renderizar, estos pueden ser:
- normal (parrafos)
- subtitle (subtitulos)
- ul (listas desordenadas)
- ol (listas ordenadas)
    - **importante**:  los objetos que contengan "style: ol" o "style: ul" , el campo text del mismo es un array que puede contener a su vez varios arrays anidados.


### Nota Adicional
 - El contenido de la pagina (contenido de campo "text" o contenido del array "content" para la **sideBar**) puede tener palabras u oraciones encerradas entre ** para texto en negrita.