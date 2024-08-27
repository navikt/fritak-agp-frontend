import NotifikasjonType from '../felles/NotifikasjonType';
import env from '../../../config/environment';
import { Paths } from '../../../config/Paths';

const getNotifikasjonUrl = (uuid: string, notifikasjonType: NotifikasjonType, baseurl: string = env.baseUrl) => {
  switch (notifikasjonType) {
    case NotifikasjonType.GravidSoknad:
      return baseurl + Paths.Gravid + '/' + uuid;
    case NotifikasjonType.GravidKrav:
    case NotifikasjonType.GravidKravSlettet:
      return baseurl + Paths.GravidKrav + '/' + uuid;
    case NotifikasjonType.KroniskSoknad:
      return baseurl + Paths.Kronisk + '/' + uuid;
    case NotifikasjonType.KroniskKrav:
    case NotifikasjonType.KroniskKravSlettet:
      return baseurl + Paths.KroniskKrav + '/' + uuid;
    default:
      throw new Error('Ikke laget ennå');
  }
};

export default getNotifikasjonUrl;
