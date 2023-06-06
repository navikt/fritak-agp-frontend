import ValidationResponse from '../../state/validation/ValidationResponse';
import KroniskState from './KroniskState';
import KroniskSoknadResponse from '../../api/kronisk/KroniskSoknadResponse';
import { v4 as uuid } from 'uuid';
import HttpStatus from '../../api/HttpStatus';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';
import lagFeil from '../felles/Feilmeldingspanel/lagFeil';

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

  if (response.status === HttpStatus.NotFound) {
    feilmeldinger.push(lagFeil('backend-' + uuid(), 'Innsendingen feilet'));
  }

  if (response.status === HttpStatus.PayloadTooLarge) {
    feilmeldinger.push(lagFeil('backend-' + uuid(), 'Vedlegget er for stort, vi har begrenset det til 50 MB.'));
  }

  return feilmeldinger;
};

export default mapKroniskFeilmeldinger;
