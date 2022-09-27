import { useNavigate, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import { Language } from '@navikt/helse-arbeidsgiver-felles-frontend';

const KvitteringLink = () => {
  const { language } = useParams();

  const navigate = useNavigate();

  navigate(buildLenke(lenker.KroniskKvittering, (language as Language) || Language.nb), { replace: true });
  return null;
};

export default KvitteringLink;
