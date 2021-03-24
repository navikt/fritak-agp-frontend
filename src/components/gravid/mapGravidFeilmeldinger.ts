import ValidationResponse from '../../state/validation/ValidationResponse';
import GravidState from './GravidState';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../felles/Feilmeldingspanel/lagFeil';

const mapGravidFeilmeldinger = (response: ValidationResponse, state: GravidState): FeiloppsummeringFeil[] => {
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

export default mapGravidFeilmeldinger;
