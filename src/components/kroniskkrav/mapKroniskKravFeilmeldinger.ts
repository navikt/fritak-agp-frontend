import ValidationResponse from '../../api/ValidationResponse';
import KroniskKravState from './KroniskKravState';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '../lagFeil';

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
        if (state.periode && state.periode[index]) {
          state.periode[index].fraError = v.message;
        } else {
          state.periode = state.periode ?? [];
          state.periode[index] = {
            fraError: v.message
          };
        }
        feilmeldinger.push(lagFeil('fra', v.message));
        break;

      case 'periode.tom':
        if (state.periode && state.periode[index]) {
          state.periode[index].tilError = v.message;
        } else {
          state.periode = state.periode ?? [];
          state.periode[index] = {
            tilError: v.message
          };
        }

        feilmeldinger.push(lagFeil('til', v.message));
        break;

      case 'periode.antallDagerMedRefusjon':
        if (state.periode && state.periode[index]) {
          state.periode[index].dagerError = v.message;
        } else {
          state.periode = state.periode ?? [];
          state.periode[index] = {
            dagerError: v.message
          };
        }

        feilmeldinger.push(lagFeil('dager', v.message));
        break;

      case 'periode.beloep':
        if (state.periode && state.periode[index]) {
          state.periode[index].beloepError = v.message;
        } else {
          state.periode = state.periode ?? [];
          state.periode[index] = {
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
