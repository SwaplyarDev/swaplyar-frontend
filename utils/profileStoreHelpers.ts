import { PlataformSocial, SocialMedia } from "@/store/useProfileStore";

// Mapeo de tipos a URLs base
export const SOCIAL_URL_MAP: Record<PlataformSocial, (username: string) => string> = {
  facebook: (u) => `https://facebook.com/${u}`,
  instagram: (u) => `https://instagram.com/${u}`,
  twitterX: (u) => `https://twitter.com/${u}`,
  linkedin: (u) => `https://linkedin.com/in/${u}`,
  tiktok: (u) => `https://tiktok.com/@${u}`,
  snapchat: (u) => `https://snapchat.com/add/${u}`,
  youtube: (u) => `https://youtube.com/${u}`,
  pinterest: (u) => `https://pinterest.com/${u}`,
  whatsappNumber: (u) => u,
};

// Helper para convertir objeto de socials a array
export const convertSocialsToArray = (socials: Record<string, any> | null): SocialMedia[] => {
  if (!socials) return [];
  
  const socialsArray: SocialMedia[] = [];
  const validTypes: PlataformSocial[] = [
    'facebook', 'instagram', 'twitterX', 'linkedin', 
    'whatsappNumber', 'tiktok', 'snapchat', 'youtube', 'pinterest'
  ];
  
  validTypes.forEach((type) => {
    const value = socials[type];
    if (value) {
      // Extraer username de la URL o usar directamente si es whatsappNumber
      let username = value;
      if (type === 'whatsappNumber') {
        username = value;
      } else {
        // Extraer username de URLs como https://instagram.com/username o https://instagram.com/@username
        // Primero eliminar el protocolo y dominio
        const urlParts = value.split('/');
        username = urlParts[urlParts.length - 1]; // Último segmento de la URL
        username = username.replace('@', '').trim(); // Remover @ si existe
      }
      
      if (username) { // Solo agregar si hay username válido
        socialsArray.push({
          id: `${type}-${Date.now()}`,
          type,
          username,
        });
      }
    }
  });
  
  return socialsArray;
};

// Helper para construir el payload del backend
export const buildSocialPayload = (accounts: SocialMedia[]) => {
  const payload: Record<string, string | null> = {};
  const validTypes: PlataformSocial[] = [
    'facebook', 'instagram', 'twitterX', 'linkedin', 
    'whatsappNumber', 'tiktok', 'snapchat', 'youtube', 'pinterest'
  ];
  
  // Inicializar todos los tipos como null
  validTypes.forEach((type) => {
    payload[type] = null;
  });
  
  // Sobrescribir con los valores que existen en accounts
  accounts.forEach((account) => {
    payload[account.type] = SOCIAL_URL_MAP[account.type](account.username);
  });
  
  return payload;
};