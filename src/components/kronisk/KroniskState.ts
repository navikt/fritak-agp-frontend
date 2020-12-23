import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ArbeidType } from './ArbeidType';
import { PåkjenningerType } from './PåkjenningerType';
import { Årsfravær } from './Årsfravær';

export const defaultKroniskState = (): KroniskState => {
  return {
    fnr: '',
    orgnr: '',
    fravær: [],
    arbeid: [],
    påkjenninger: [],
    kommentar: '',
    dokumentasjon: '',
    bekreft: false,
    feilmeldinger: Array<FeiloppsummeringFeil>()
  };
};

export default interface KroniskState {
  fnr?: string;
  fnrError?: string;
  orgnr?: string;
  orgnrError?: string;
  arbeid?: Array<ArbeidType>;
  arbeidError?: string;
  påkjenninger?: Array<PåkjenningerType>;
  påkjenningerError?: string;
  kommentar?: string;
  kommentarError?: string;
  dokumentasjon?: string;
  dokumentasjonError?: string;
  fravær?: Array<Årsfravær>;
  fraværError?: string;
  feilmeldinger?: Array<FeiloppsummeringFeil>;
  validated?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  bekreft?: boolean;
  bekreftError?: string;
}
