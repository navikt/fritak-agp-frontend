import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

export interface ValidationState {
  kvittering?: boolean;
  submitting?: boolean;
  validated?: boolean;
  progress?: boolean;
  error?: boolean;
  login?: boolean;
  notAuthorized?: boolean;
  serverError?: boolean;
  feilmeldinger: Array<FeiloppsummeringFeil>;
}
