import NotifikasjonType from '../felles/NotifikasjonType';
import env from '../../../config/environment';
import { Paths } from '../../../config/Paths';

const getNotifikasjonUrl = (uuid: string, notifikasjonType: NotifikasjonType, baseurl: string = env.baseUrl) => {
  switch (notifikasjonType) {
    case NotifikasjonType.GravidSoknad:
      return baseurl + Paths.Gravid + '/' + uuid;
    case NotifikasjonType.GravidKrav:
      return baseurl + Paths.GravidKrav + '/' + uuid;
    case NotifikasjonType.GravidKravSlettet:
      return baseurl + Paths.GravidKrav + '/' + uuid + '?slettet';
    case NotifikasjonType.KroniskSoknad:
      return baseurl + Paths.Kronisk + '/' + uuid;
    case NotifikasjonType.KroniskKrav:
      return baseurl + Paths.KroniskKrav + '/' + uuid;
    case NotifikasjonType.KroniskKravSlettet:
      return baseurl + Paths.KroniskKrav + '/' + uuid + '?slettet';
    default:
      throw new Error('Ikke laget ennå');
  }
};

export default getNotifikasjonUrl;
