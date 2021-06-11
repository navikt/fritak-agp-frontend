import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Aarsak } from './Aarsak';
import { Tiltak } from './Tiltak';
import { Omplassering } from './Omplassering';
import { Dato } from '../../utils/dato/Dato';
import { ValidationState } from '@navikt/helse-arbeidsgiver-felles-frontend';

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

export default interface GravidState extends ValidationState {
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
  omplasseringAarsak?: Aarsak;
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
  termindato?: Dato;
  termindatoError?: string;
}
