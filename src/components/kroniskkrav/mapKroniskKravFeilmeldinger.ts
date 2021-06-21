import ValidationResponse from '../../state/validation/ValidationResponse';
import KroniskKravState from './KroniskKravState';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '@navikt/helse-arbeidsgiver-felles-frontend';

const mapKroniskKravFeilmeldinger = (response: ValidationResponse, state: KroniskKravState) => {
  const feilmeldinger = new Array<FeiloppsummeringFeil>();
  response.violations.forEach((v, index) => {
    const uniqueKey = state.perioder && state.perioder[index] ? state.perioder[index].uniqueKey : 'uniqueKey';

    switch (v.propertyPath) {
      case 'identitetsnummer':
        state.fnrError = v.message;
        feilmeldinger.push(lagFeil('fnr', v.message));
        break;

      case 'virksomhetsnummer':
        state.orgnrError = v.message;
        feilmeldinger.push(lagFeil('orgnr', v.message));
        break;

      case 'perioder.fom':
        if (v.index) {
          if (state.perioder && state.perioder[v.index]) {
            state.perioder[v.index].fomError = v.message;
          } else {
            state.perioder = state.perioder ?? [];
            state.perioder[v.index] = {
              uniqueKey,
              fomError: v.message
            };
          }
          feilmeldinger.push(lagFeil(`fra-dato-${v.index}`, v.message));
        } else {
          feilmeldinger.push(lagFeil('fra', v.message));
        }
        break;

      case 'perioder.tom':
        if (v.index) {
          if (state.perioder && state.perioder[v.index]) {
            state.perioder[v.index].tomError = v.message;
          } else {
            state.perioder = state.perioder ?? [];
            state.perioder[v.index] = {
              uniqueKey,
              tomError: v.message
            };
          }
          feilmeldinger.push(lagFeil(`til-dato-${v.index}`, v.message));
        } else {
          feilmeldinger.push(lagFeil('til', v.message));
        }
        break;

      case 'periode.antallDagerMedRefusjon':
        if (v.index) {
          if (state.perioder && state.perioder[v.index]) {
            state.perioder[v.index].dagerError = v.message;
          } else {
            state.perioder = state.perioder ?? [];
            state.perioder[v.index] = {
              uniqueKey,
              dagerError: v.message
            };
          }
          feilmeldinger.push(lagFeil(`dager-${v.index}`, v.message));
        } else {
          feilmeldinger.push(lagFeil('dager', v.message));
        }
        break;

      case 'periode.beloep':
        if (v.index) {
          if (state.perioder && state.perioder[v.index]) {
            state.perioder[v.index].beloepError = v.message;
          } else {
            state.perioder = state.perioder ?? [];
            state.perioder[v.index] = {
              uniqueKey,
              beloepError: v.message
            };
          }
          feilmeldinger.push(lagFeil(`belop-${v.index}`, v.message));
        } else {
          feilmeldinger.push(lagFeil('belop', v.message));
        }
        break;

      case 'bekreftet':
        state.bekreftError = v.message;
        feilmeldinger.push(lagFeil('bekreft', v.message));
        break;

      case 'perioder':
        state.periodeError = v.message;
        feilmeldinger.push(
          lagFeil('dager', v.message.length ? v.message : 'Refusjonsdager kan ikke overstige periodelengden')
        );
    }
  });
  return feilmeldinger;
};

export default mapKroniskKravFeilmeldinger;
