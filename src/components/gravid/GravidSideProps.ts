import { FeiloppsummeringFeil } from 'nav-frontend-skjema/src/feiloppsummering';
import GravidStatus from './GravidStatus';

interface GravidSideProps {
  fnr?: string;
  orgnr?: string;
  tilrettelegge?: boolean;
  bekreftet?: boolean;
  bekreftetFeilmelding?: string;
  videre?: boolean;
  tiltak?: string;
  tiltakBeskrivelse?: string;
  dokumentasjon?: string;
  dokumentasjonFeilmelding?: string;
  omplassering?: string;
  validated?: boolean;
  submitted?: boolean;
  feilOppsummeringer?: Array<FeiloppsummeringFeil>;
  status?: GravidStatus;
}

export default GravidSideProps;
