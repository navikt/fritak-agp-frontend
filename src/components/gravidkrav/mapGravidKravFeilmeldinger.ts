import ValidationResponse from '../../state/validation/ValidationResponse';
import GravidKravState from './GravidKravState';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../felles/Feilmeldingspanel/lagFeil';

const mapGravidKravFeilmeldinger = (response: ValidationResponse, state: GravidKravState) => {
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

      case 'periode.fom':
        state.fraError = v.message;
        feilmeldinger.push(lagFeil('fra', v.message));
        break;

      case 'periode.tom':
        state.tilError = v.message;
        feilmeldinger.push(lagFeil('til', v.message));
        break;

      case 'periode.antallDagerMedRefusjon':
        state.dagerError = v.message;
        feilmeldinger.push(lagFeil('dager', v.message));
        break;

      case 'periode.beloep':
        state.beloepError = v.message;
        feilmeldinger.push(lagFeil('beloep', v.message));
        break;

      case 'bekreftet':
        state.bekreftError = v.message;
        feilmeldinger.push(lagFeil('bekreft', v.message));
        break;

      case 'dokumentasjon':
        state.dokumentasjonError = v.message;
        feilmeldinger.push(lagFeil('dokumentasjon', v.message));
        break;

      case 'periode':
        state.dagerError = v.message;
        feilmeldinger.push(
          lagFeil('dager', v.message.length ? v.message : 'Refusjonsdager kan ikke overstige periodelengden')
        );
    }
  });
  return feilmeldinger;
};

export default mapGravidKravFeilmeldinger;
