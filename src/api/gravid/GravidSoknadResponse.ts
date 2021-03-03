export interface GravidSoknadResponse {
  id: string;
  opprettet: string;
  virksomhetsnummer: string;
  identitetsnummer: string;
  tilrettelegge: boolean;
  tiltak: string[];
  tiltakBeskrivelse: string;
  omplassering: string;
  omplasseringAarsak: string;
  sendtAv: string;
  termindato: string;
  harVedlegg: boolean;
  journalpostId: string;
  oppgaveId: string;
}
