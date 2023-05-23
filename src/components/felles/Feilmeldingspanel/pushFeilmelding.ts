import { FeiloppsummeringFeil } from '../../../validation/mapKravFeilmeldinger';

export const pushFeilmelding = (
  skjemaelementId: string,
  feilmelding: string,
  feilmeldinger: Array<FeiloppsummeringFeil>
) => {
  feilmeldinger.push({
    skjemaelementId: '#' + skjemaelementId,
    feilmelding: feilmelding
  });
};

export default pushFeilmelding;
