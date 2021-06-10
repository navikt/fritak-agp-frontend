import ValidationResponse from '../../state/validation/ValidationResponse';
import GravidKravState from './GravidKravState';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../felles/Feilmeldingspanel/lagFeil';

const mapGravidKravFeilmeldinger = (response: ValidationResponse, state: GravidKravState) => {
  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  response.violations.forEach((violation, rowIndex) => {
    const uniqueKey = state.perioder ? state.perioder[rowIndex].uniqueKey : 'uniqueKey';

    switch (violation.propertyPath) {
      case 'identitetsnummer':
        state.fnrError = violation.message;
        feilmeldinger.push(lagFeil('fnr', violation.message));
        break;

      case 'virksomhetsnummer':
        state.orgnrError = violation.message;
        feilmeldinger.push(lagFeil('orgnr', violation.message));
        break;

      case 'periode.fom':
        if (state.perioder) {
          state.perioder[rowIndex].fomError = violation.message;
        }
        feilmeldinger.push(lagFeil('fra-dato-' + uniqueKey, violation.message));
        break;

      case 'periode.tom':
        if (state.perioder) {
          state.perioder[rowIndex].tomError = violation.message;
        }
        feilmeldinger.push(lagFeil('til-dato-' + uniqueKey, violation.message));
        break;

      case 'periode.antallDagerMedRefusjon':
        if (state.perioder) {
          state.perioder[rowIndex].dagerError = violation.message;
        }
        feilmeldinger.push(lagFeil('dager-' + uniqueKey, violation.message));
        break;

      case 'periode.beloep':
        if (state.perioder) {
          state.perioder[rowIndex].beloepError = violation.message;
        }
        feilmeldinger.push(lagFeil('beloep-' + uniqueKey, violation.message));
        break;

      case 'bekreftet':
        state.bekreftError = violation.message;
        feilmeldinger.push(lagFeil('bekreft-' + uniqueKey, violation.message));
        break;

      case 'dokumentasjon':
        state.dokumentasjonError = violation.message;
        feilmeldinger.push(lagFeil('dokumentasjon', violation.message));
        break;

      case 'perioder':
        if (state.perioder) {
          state.perioder[rowIndex].dagerError = violation.message;
        }
        feilmeldinger.push(
          lagFeil(
            'dager',
            violation.message.length ? violation.message : 'Refusjonsdager kan ikke overstige periodelengden'
          )
        );
    }
  });
  return feilmeldinger;
};

export default mapGravidKravFeilmeldinger;
