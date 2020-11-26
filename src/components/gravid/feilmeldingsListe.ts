import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

const feilmeldingsliste = (feilmelding: {
  [key: string]: string;
}): FeiloppsummeringFeil[] =>
  Object.keys(feilmelding).map((element) => ({
    skjemaelementId: element,
    feilmelding: feilmelding[element]
  }));

export default feilmeldingsliste;
