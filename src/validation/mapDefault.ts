import { ValidationState } from './ValidationState';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../components/lagFeil';

const mapDefault = (state: ValidationState): ValidationState => {
  state.error = true;
  state.kvittering = false;
  state.progress = false;
  state.feilmeldinger = new Array<FeiloppsummeringFeil>();
  state.feilmeldinger.push(lagFeil('ukjent', 'Klarte ikke å sende inn skjema. Prøv igjen senere.'));
  return state;
};

export default mapDefault;
