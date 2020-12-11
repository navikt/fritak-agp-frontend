import { FeiloppsummeringFeil } from 'nav-frontend-skjema/src/feiloppsummering';
import { Omplassering, OmplasseringAarsak, Tiltak } from './gravidSideEnums';
import GravidStatus from './GravidStatus';

interface GravidSideProps {
  fnr?: string;
  orgnr?: string;
  tilrettelegge?: boolean;
  bekreftet?: boolean;
  bekreftetFeilmelding?: string;
  videre?: boolean;
  tiltak?: Tiltak[];
  tiltakBeskrivelse?: string;
  dokumentasjon?: string;
  dokumentasjonFeilmelding?: string;
  omplassering?: Omplassering;
  omplasseringAarsak?: OmplasseringAarsak;
  validated?: boolean;
  submitted?: boolean;
  feilOppsummeringer?: Array<FeiloppsummeringFeil>;
  status?: GravidStatus;
}

export default GravidSideProps;
