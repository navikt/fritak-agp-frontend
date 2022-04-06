import ValidationResponse from '../../state/validation/ValidationResponse';
import KroniskState from './KroniskState';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '@navikt/helse-arbeidsgiver-felles-frontend';
import KroniskSoknadResponse from '../../api/kronisk/KroniskSoknadResponse';

const mapKroniskFeilmeldinger = (response: ValidationResponse<KroniskSoknadResponse>, state: KroniskState) => {
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
      case 'antallPerioder':
        state.antallPerioderError = v.message;
        feilmeldinger.push(lagFeil('soknad-perioder', v.message));
    }
  });
  return feilmeldinger;
};

export default mapKroniskFeilmeldinger;
