import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

export const pushFeilmelding = (
  skjemaelementId: string,
  feilmelding: string,
  feilmeldinger: Array<FeiloppsummeringFeil>
) => {
  feilmeldinger.push({
    skjemaelementId: skjemaelementId,
    feilmelding: feilmelding
  });
};
