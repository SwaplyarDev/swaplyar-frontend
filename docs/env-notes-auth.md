Para evitar el error "UntrustedHost" de Auth.js/NextAuth en local o Vercel:

- En desarrollo local, define:

  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_SECRET=coloca_un_valor_seguro

- En despliegue, ajusta NEXTAUTH_URL al dominio real (https://tu-dominio.com) y mantén NEXTAUTH_SECRET en un valor seguro.

También puedes usar AUTH_URL en Auth.js v5, pero NEXTAUTH_URL sigue siendo reconocido.

Además, en auth.ts se estableció trustHost: true para confiar en el host de los encabezados cuando sea necesario.
