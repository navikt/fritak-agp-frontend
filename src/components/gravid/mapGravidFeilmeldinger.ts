import { ValidationResponse } from '../../state/validation/ValidationResponse';
import GravidState from './GravidState';
import { GravidSoknadResponse } from '../../api/gravid/GravidSoknadResponse';
import { v4 as uuid } from 'uuid';
import HttpStatus from '../../api/HttpStatus';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';
import { lagFeil } from '../felles/Feilmeldingspanel/lagFeil';

const mapGravidFeilmeldinger = (
  response: ValidationResponse<GravidSoknadResponse>,
  state: GravidState
): FeiloppsummeringFeil[] => {
  const feilmeldinger = new Array<FeiloppsummeringFeil>();
  response.violations.forEach((v) => {
    switch (v.propertyPath) {
      case 'fnr':
        state.fnrError = v.message;
        feilmeldinger.push(lagFeil('fnr', v.message));
        break;

      case 'termindato':
        state.termindatoError = v.message;
        feilmeldinger.push(lagFeil('termindato', v.message));
        break;

      case 'virksomhetsnummer':
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

  if (response.status === HttpStatus.NotFound) {
    feilmeldinger.push(lagFeil('backend-' + uuid(), 'Innsendingen feilet'));
  }

  if (response.status === HttpStatus.PayloadTooLarge) {
    feilmeldinger.push(lagFeil('backend-' + uuid(), 'Vedlegget er for stort, vi har begrenset det til 50 MB.'));
  }

  return feilmeldinger;
};

export default mapGravidFeilmeldinger;
