import { FeiloppsummeringFeil } from '../../../validation/mapKravFeilmeldinger';

export const lagFeil = (felt: string, melding: string): FeiloppsummeringFeil => {
  return {
    skjemaelementId: felt,
    feilmelding: melding
  };
};
