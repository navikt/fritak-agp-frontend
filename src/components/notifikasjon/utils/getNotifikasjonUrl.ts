import NotifikasjonType from '../felles/NotifikasjonType';
import env from '../../../config/environment';

const getNotifikasjonUrl = (uuid: string, notifikasjonType: NotifikasjonType, baseurl: string = env.baseUrl) => {
  switch (notifikasjonType) {
    case NotifikasjonType.GravidSoknad:
      return baseurl + '/api/v1/gravid/soeknad/' + uuid;
    case NotifikasjonType.GravidKrav:
      return baseurl + '/api/v1/gravid/krav/' + uuid;
    case NotifikasjonType.KroniskSoknad:
      return baseurl + '/api/v1/kronisk/soeknad/' + uuid;
    case NotifikasjonType.KroniskKrav:
      return baseurl + '/api/v1/kronisk/krav/' + uuid;
    default:
      throw new Error('Ikke laget ennå');
  }
};

export default getNotifikasjonUrl;
