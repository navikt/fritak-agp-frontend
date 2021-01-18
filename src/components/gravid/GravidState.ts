import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { OmplasseringAarsak } from './OmplasseringAarsak';
import { Tiltak } from './Tiltak';
import { Omplassering } from './Omplassering';

export const defaultGravidState = (state?: GravidState): GravidState => {
  return Object.assign(
    {
      fnr: '',
      orgnr: '',
      dokumentasjon: '',
      bekreft: false,
      feilmeldinger: Array<FeiloppsummeringFeil>()
    },
    state || {}
  );
};

export default interface GravidState {
  fnr?: string;
  fnrError?: string;
  orgnr?: string;
  orgnrError?: string;
  tilrettelegge?: boolean;
  tiltak?: Array<Tiltak>;
  tiltakError?: string;
  tiltakBeskrivelse?: string;
  tiltakBeskrivelseError?: string;
  omplassering?: Omplassering;
  omplasseringError?: string;
  omplasseringAarsak?: OmplasseringAarsak;
  omplasseringAarsakError?: string;

  videre?: boolean;
  dokumentasjon?: string;
  dokumentasjonError?: string;

  feilmeldinger: Array<FeiloppsummeringFeil>;
  validated?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  bekreft?: boolean;
  bekreftError?: string;
  error?: boolean;
  login?: boolean;
  submitting?: boolean;
}
