import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

export const lagFeil = (felt: string, melding: string): FeiloppsummeringFeil => {
  return {
    skjemaelementId: felt,
    feilmelding: melding
  };
};
