import { id } from 'date-fns/locale';

export const profileMock = {
  informacionPersonal: {
    nombreLegal: 'Oa Johan Javier Suarez Merchan',
    nacionalidad: 'Argentina',
    numeroDocumento: '123456789',
    fechaNacimiento: '1990-01-01',
    apodo: 'Suarez Oa',
  },
  anioRegistro: '2019',
  email: 'ceo_oa@swaplyar.com',
  whatsapp: '+5491123832198',
  redesSociales: [
    { id: '1', type: 'instagram', username: 'suarez_oa' },
    { id: '2', type: 'twitter', username: 'suarez_oa' },
  ],
};
