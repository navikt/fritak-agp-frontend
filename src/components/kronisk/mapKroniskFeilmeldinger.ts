import KroniskState from './KroniskState';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../felles/Feilmeldingspanel/lagFeil';
import { ValidationResponse } from '@navikt/helse-arbeidsgiver-felles-frontend';

const mapKroniskFeilmeldinger = (response: ValidationResponse, state: KroniskState) => {
  const feilmeldinger = new Array<FeiloppsummeringFeil>();
  response.violations.forEach((v) => {
    switch (v.propertyPath) {
      case 'identitetsnummer':
        state.fnrError = v.message;
        feilmeldinger.push(lagFeil('fnr', v.message));
        break;
      case 'virksomhetsnummer':
        state.orgnrError = v.message;
        feilmeldinger.push(lagFeil('orgnr', v.message));
        break;
      case 'kommentar':
        state.kommentarError = v.message;
        feilmeldinger.push(lagFeil('kommentar', v.message));
        break;
      case 'arbeidstyper':
        state.arbeidError = v.message;
        feilmeldinger.push(lagFeil('arbeidsutfører', v.message));
        break;
      case 'paakjenningstyper':
        state.paakjenningerError = v.message;
        feilmeldinger.push(lagFeil('paakjenninger', v.message));
        break;
      case 'bekreftet':
        state.bekreftError = v.message;
        feilmeldinger.push(lagFeil('bekreft', v.message));
        break;
      case 'dokumentasjon':
        state.dokumentasjonError = v.message;
        feilmeldinger.push(lagFeil('dokumentasjon', v.message));
        break;
      case 'fravaer':
        state.fravaerError = v.message;
        feilmeldinger.push(lagFeil('fravaer', v.message));
        break;
    }
  });
  return feilmeldinger;
};

export default mapKroniskFeilmeldinger;
