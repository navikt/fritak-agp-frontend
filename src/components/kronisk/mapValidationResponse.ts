import KroniskState from './KroniskState';
import ValidationResponse from '../../api/ValidationResponse';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../lagFeil';

export const mapValidationResponse = (
  response: ValidationResponse,
  state: KroniskState
): KroniskState => {
  const nextState = Object.assign({}, state);
  switch (response.status) {
    case 201:
      nextState.kvittering = true;
      nextState.progress = false;
      nextState.error = false;
      nextState.accessDenied = false;
      return nextState;
    case 401:
      console.log('401');
      nextState.kvittering = false;
      nextState.progress = false;
      nextState.error = true;
      nextState.accessDenied = true;
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
          case 'kommentar':
            nextState.kommentarError = v.message;
            feilmeldinger.push(lagFeil('kommentar', v.message));
            break;
          case 'arbeidstyper':
            nextState.arbeidError = v.message;
            feilmeldinger.push(lagFeil('arbeidsutfører', v.message));
            break;
          case 'paakjenningstyper':
            nextState.paakjenningerError = v.message;
            feilmeldinger.push(lagFeil('paakjenninger', v.message));
            break;
          case 'bekreftet':
            nextState.bekreftError = v.message;
            feilmeldinger.push(lagFeil('bekreft', v.message));
            break;
          case 'dokumentasjon':
            nextState.dokumentasjonError = v.message;
            feilmeldinger.push(lagFeil('dokumentasjon', v.message));
            break;
          case 'fravaer':
            nextState.fravaerError = v.message;
            feilmeldinger.push(lagFeil('fravaer', v.message));
            break;
        }
      });

      nextState.kvittering = false;
      nextState.progress = false;
      nextState.error = false;
      nextState.feilmeldinger = feilmeldinger;
      nextState.accessDenied = false;
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
