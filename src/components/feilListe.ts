import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

const feilListe = (feilmelding: {
  [key: string]: string;
}): FeiloppsummeringFeil[] =>
  Object.keys(feilmelding).map((element) => ({
    skjemaelementId: element,
    feilmelding: feilmelding[element]
  }));

export default feilListe;
