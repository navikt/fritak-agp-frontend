import ValidationResponse, { ValidationProblemDetail } from '../state/validation/ValidationResponse';
import KroniskKravState from '../components/kroniskkrav/KroniskKravState';
import GravidKravState from '../components/gravidkrav/GravidKravState';
import { v4 as uuid } from 'uuid';
import HttpStatus from '../api/HttpStatus';
import lagFeil from '../components/felles/Feilmeldingspanel/lagFeil';
import stringishToNumber from '../utils/stringishToNumber';

export interface FeiloppsummeringFeil {
  skjemaelementId: string;
  feilmelding: string;
}

const mapKravFeilmeldinger = <Type>(response: ValidationResponse<Type>, state: KroniskKravState | GravidKravState) => {
  const feilmeldinger: Array<FeiloppsummeringFeil> = [];

  response.violations.forEach((v) => {
    const regexSplitPattern = /([^[.\]])+/g;

    const propertyPathParts = v.propertyPath.match(regexSplitPattern);

    if (!propertyPathParts) {
      return;
    }

    const [propertyPath, pathIndexString, subPath] = propertyPathParts;

    const pathIndex = stringishToNumber(pathIndexString);

    switch (propertyPath) {
      case 'identitetsnummer':
        state.fnrError = v.message;
        feilmeldinger.push(lagFeil('fnr', v.message));
        break;

      case 'virksomhetsnummer':
        state.orgnrError = v.message;
        if (v.validationType === 'MåVæreVirksomhetContraint') {
          feilmeldinger.push(lagFeil('fnr', v.message));
        } else {
          feilmeldinger.push(lagFeil('orgnr', v.message));
        }
        break;

      case 'perioder':
        mapPeriodeFeilmeldinger(subPath, pathIndex, state, v, feilmeldinger);
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

  if (response.status === HttpStatus.NotFound) {
    feilmeldinger.push(lagFeil('backend-' + uuid(), 'Innsendingen feilet'));
  }

  if (response.status === HttpStatus.PayloadTooLarge) {
    feilmeldinger.push(lagFeil('backend-' + uuid(), 'Vedlegget er for stort, vi har begrenset det til 50 MB.'));
  }

  return feilmeldinger;
};

export default mapKravFeilmeldinger;

const mapPeriodeFeilmeldinger = (
  subPath: string,
  pathIndex: number | undefined,
  state: GravidKravState | KroniskKravState,
  v: ValidationProblemDetail,
  feilmeldinger: FeiloppsummeringFeil[]
) => {
  switch (subPath) {
    case 'antallDagerMedRefusjon':
      if (typeof pathIndex === 'number' && state.perioder && state.perioder[pathIndex]) {
        state.perioder[pathIndex].dagerError =
          v.message || 'Antall dager med refusjon er høyere enn antall dager i perioden';
      }
      feilmeldinger.push(
        lagFeil(`dager-${pathIndex}`, v.message || 'Antall dager med refusjon er høyere enn antall dager i perioden')
      );
      break;

    // case 'fom':
    //   if (typeof pathIndex === 'number' && state.perioder && state.perioder[pathIndex]) {
    //     state.perioder[pathIndex].perioder[0].fomError = v.message || 'Fra dato kan ikke være etter til dato';
    //   }

    //   feilmeldinger.push(lagFeil(`fra-dato-${pathIndex}`, v.message || 'Fra dato kan ikke være etter til dato'));
    //   break;

    // case 'tom':
    //   if (typeof pathIndex === 'number' && state.perioder && state.perioder[pathIndex]) {
    //     state.perioder[pathIndex].tomError = v.message;
    //   }

    //   feilmeldinger.push(lagFeil(`til-dato-${pathIndex}`, v.message));
    //   break;

    case 'månedsinntekt':
      if (typeof pathIndex === 'number' && state.perioder && state.perioder[pathIndex]) {
        state.perioder[pathIndex].belopError = v.message || 'Månedsinntekt mangler';
      }

      feilmeldinger.push(lagFeil(`beloep-${pathIndex}`, v.message || 'Månedsinntekt mangler'));
      break;

    case 'gradering':
      if (typeof pathIndex === 'number' && state.perioder && state.perioder[pathIndex]) {
        state.perioder[pathIndex].sykemeldingsgradError = v.message || 'Sykemeldingsgraden må være mellom 20% og 100%';
      }
      feilmeldinger.push(
        lagFeil(`sykemeldingsgrad-${pathIndex}`, v.message || 'Sykemeldingsgraden må være mellom 20% og 100%')
      );
      break;

    default:
      state.periodeError = v.message;
      feilmeldinger.push(lagFeil('dager', v.message || 'Refusjonsdager kan ikke overstige periodelengden'));
  }
};
