import ValidationResponse from '../../state/validation/ValidationResponse';
import KroniskKravState from './KroniskKravState';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { lagFeil } from '@navikt/helse-arbeidsgiver-felles-frontend';

const mapKroniskKravFeilmeldinger = (response: ValidationResponse, state: KroniskKravState) => {
  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  response.violations.forEach((v, index) => {
    const uniqueKey = state.perioder && state.perioder[index] ? state.perioder[index].uniqueKey : 'uniqueKey';

    const regexSplitPattern = /([^\[.\]])+/g;

    const propertyPathParts = v.propertyPath.match(regexSplitPattern);

    if (!propertyPathParts) {
      return feilmeldinger;
    }

    let [propertyPath, pathIndex, subPath] = propertyPathParts;

    switch (propertyPath) {
      case 'identitetsnummer':
        state.fnrError = v.message;
        feilmeldinger.push(lagFeil('fnr', v.message));
        break;

      case 'virksomhetsnummer':
        state.orgnrError = v.message;
        feilmeldinger.push(lagFeil('orgnr', v.message));
        break;

      case 'perioder':
        switch (subPath) {
          case 'antallDagerMedRefusjon':
            if (state.perioder && state.perioder[pathIndex]) {
              state.perioder[pathIndex].dagerError =
                v.message || 'Antall dager med refusjon er høyere enn antall dager i perioden';
            }
            feilmeldinger.push(
              lagFeil(
                `dager-${pathIndex}`,
                v.message || 'Antall dager med refusjon er høyere enn antall dager i perioden'
              )
            );
            break;

          case 'fom':
            if (state.perioder && state.perioder[pathIndex]) {
              state.perioder[pathIndex].fomError = v.message || 'Fra dato kan ikke være etter til dato';
            } else {
              state.perioder = state.perioder ?? [];
              state.perioder[pathIndex] = {
                uniqueKey,
                fomError: v.message
              };
            }
            feilmeldinger.push(lagFeil(`fra-dato-${pathIndex}`, v.message || 'Fra dato kan ikke være etter til dato'));
            break;

          case 'tom':
            if (state.perioder && state.perioder[pathIndex]) {
              state.perioder[pathIndex].tomError = v.message;
            } else {
              state.perioder = state.perioder ?? [];
              state.perioder[pathIndex] = {
                uniqueKey,
                tomError: v.message
              };
            }

            feilmeldinger.push(lagFeil(`til-dato-${pathIndex}`, v.message));
            break;

          case 'månedsinntekt':
            if (state.perioder && state.perioder[pathIndex]) {
              state.perioder[pathIndex].beloepError = v.message || 'Månedsinntekt mangler';
            } else {
              state.perioder = state.perioder ?? [];
              state.perioder[pathIndex] = {
                uniqueKey,
                beloepError: v.message
              };
            }

            feilmeldinger.push(lagFeil(`beloep-${pathIndex}`, v.message || 'Månedsinntekt mangler'));
            break;

          default:
            state.periodeError = v.message;
            feilmeldinger.push(
              lagFeil(
                'dager',
                v.message.length ? v.message : 'Refusjonsdager kan ikke overstige periodelengden ' + subPath
              )
            );
        }
        break;

      case 'bekreftet':
        state.bekreftError = v.message;
        feilmeldinger.push(lagFeil('bekreft', v.message));
        break;

      case 'antallDager':
        state.antallDagerError = v.message;
        feilmeldinger.push(lagFeil('kontrollsporsmaal-lonn-arbeidsdager', v.message));
        break;
    }
  });
  return feilmeldinger;
};

export default mapKroniskKravFeilmeldinger;
