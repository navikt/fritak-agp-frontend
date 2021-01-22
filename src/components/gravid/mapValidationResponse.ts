import ValidationResponse from '../../api/ValidationResponse';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../lagFeil';
import GravidState from './GravidState';

export const mapFeilmeldinger = (response: ValidationResponse, state: GravidState) => {
  const feilmeldinger = new Array<FeiloppsummeringFeil>();
  response.violations.forEach((v) => {
    switch (v.propertyPath) {
      case 'fnr':
        state.fnrError = v.message;
        feilmeldinger.push(lagFeil('fnr', v.message));
        break;
      case 'orgnr':
        state.orgnrError = v.message;
        feilmeldinger.push(lagFeil('orgnr', v.message));
        break;

      case 'tilrettelegge':
        feilmeldinger.push(lagFeil('tilrettelegge', v.message));
        break;
      case 'bekreftet':
        state.bekreftError = v.message;
        feilmeldinger.push(lagFeil('bekreft', v.message));
        break;

      case 'tiltak':
        state.tiltakError = v.message;
        feilmeldinger.push(lagFeil('tiltak', v.message));
        break;

      case 'tiltakBeskrivelse':
        state.tiltakBeskrivelseError = v.message;
        feilmeldinger.push(lagFeil('tiltakBeskrivelse', v.message));
        break;

      case 'omplassering':
        state.omplasseringError = v.message;
        feilmeldinger.push(lagFeil('omplassering', v.message));
        break;

      case 'omplasseringAarsak':
        state.omplasseringAarsakError = v.message;
        feilmeldinger.push(lagFeil('omplasseringAarsak', v.message));
        break;

      case 'dokumentasjon':
        state.dokumentasjonError = v.message;
        feilmeldinger.push(lagFeil('dokumentasjon', v.message));
        break;
    }
  });
  return feilmeldinger;
};

export const mapValidationResponse = (response: ValidationResponse, state: GravidState): GravidState => {
  const nextState = Object.assign({}, state);
  switch (response.status) {
    case 201:
      nextState.kvittering = true;
      nextState.progress = false;
      nextState.error = false;
      nextState.login = false;
      return nextState;
    case 401:
      nextState.kvittering = false;
      nextState.progress = false;
      nextState.error = true;
      nextState.login = true;
      return nextState;
    case 422:
      nextState.kvittering = false;
      nextState.progress = false;
      nextState.error = false;
      nextState.feilmeldinger = mapFeilmeldinger(response, nextState);
      return nextState;
    default:
      nextState.error = true;
      nextState.kvittering = false;
      nextState.progress = false;
      nextState.feilmeldinger = new Array<FeiloppsummeringFeil>();
      nextState.feilmeldinger.push(lagFeil('ukjent', 'Klarte ikke å sende inn skjema. Prøv igjen senere.'));
      return nextState;
  }
};
