import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

export interface ValidationState {
  kvittering?: boolean;
  submitting?: boolean;
  validated?: boolean;
  progress?: boolean;
  error?: boolean;
  login?: boolean;
  feilmeldinger: Array<FeiloppsummeringFeil>;
}
