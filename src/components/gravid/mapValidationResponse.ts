import ValidationResponse from '../../api/ValidationResponse';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../lagFeil';
import GravidState from './GravidState';

export const mapValidationResponse = (
  response: ValidationResponse,
  state: GravidState
): GravidState => {
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
      const feilmeldinger = new Array<FeiloppsummeringFeil>();
      response.violations.forEach((v) => {
        switch (v.propertyPath) {
          case 'fnr':
            nextState.fnrError = v.message;
            feilmeldinger.push(lagFeil('fnr', v.message));
            break;
          case 'orgnr':
            nextState.orgnrError = v.message;
            feilmeldinger.push(lagFeil('orgnr', v.message));
            break;
          case 'bekreftet':
            nextState.bekreftError = v.message;
            feilmeldinger.push(lagFeil('bekreft', v.message));
            break;
          case 'dokumentasjon':
            nextState.dokumentasjonError = v.message;
            feilmeldinger.push(lagFeil('dokumentasjon', v.message));
            break;
        }
      });

      nextState.kvittering = false;
      nextState.progress = false;
      nextState.error = false;
      nextState.feilmeldinger = feilmeldinger;
      return nextState;
    default:
      nextState.error = true;
      nextState.kvittering = false;
      nextState.progress = false;
      nextState.feilmeldinger = new Array<FeiloppsummeringFeil>();
      nextState.feilmeldinger.push(
        lagFeil('ukjent', 'Klarte ikke å sende inn skjema. Prøv igjen senere.')
      );
      return nextState;
  }
};
