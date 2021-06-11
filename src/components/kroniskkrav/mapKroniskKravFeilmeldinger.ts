import ValidationResponse from '../../state/validation/ValidationResponse';
import KroniskKravState from './KroniskKravState';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../felles/Feilmeldingspanel/lagFeil';

const mapKroniskKravFeilmeldinger = (response: ValidationResponse, state: KroniskKravState) => {
  const feilmeldinger = new Array<FeiloppsummeringFeil>();
  response.violations.forEach((v, index) => {
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
        if (state.perioder && state.perioder[index]) {
          state.perioder[index].fraError = v.message;
        } else {
          state.perioder = state.perioder ?? [];
          state.perioder[index] = {
            fraError: v.message
          };
        }
        feilmeldinger.push(lagFeil('fra', v.message));
        break;

      case 'periode.tom':
        if (state.perioder && state.perioder[index]) {
          state.perioder[index].tilError = v.message;
        } else {
          state.perioder = state.perioder ?? [];
          state.perioder[index] = {
            tilError: v.message
          };
        }

        feilmeldinger.push(lagFeil('til', v.message));
        break;

      case 'periode.antallDagerMedRefusjon':
        if (state.perioder && state.perioder[index]) {
          state.perioder[index].dagerError = v.message;
        } else {
          state.perioder = state.perioder ?? [];
          state.perioder[index] = {
            dagerError: v.message
          };
        }

        feilmeldinger.push(lagFeil('dager', v.message));
        break;

      case 'periode.beloep':
        if (state.perioder && state.perioder[index]) {
          state.perioder[index].beloepError = v.message;
        } else {
          state.perioder = state.perioder ?? [];
          state.perioder[index] = {
            beloepError: v.message
          };
        }

        feilmeldinger.push(lagFeil('beloep', v.message));
        break;

      case 'bekreftet':
        state.bekreftError = v.message;
        feilmeldinger.push(lagFeil('bekreft', v.message));
        break;

      case 'periode':
        state.periodeError = v.message;
        feilmeldinger.push(
          lagFeil('dager', v.message.length ? v.message : 'Refusjonsdager kan ikke overstige periodelengden')
        );
    }
  });
  return feilmeldinger;
};

export default mapKroniskKravFeilmeldinger;
