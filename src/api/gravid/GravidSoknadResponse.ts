export interface GravidSoknadResponse {
  id: string;
  opprettet: string;
  virksomhetsnummer: string;
  virksomhetsnavn: string;
  identitetsnummer: string;
  tilrettelegge: boolean;
  tiltak: string[];
  tiltakBeskrivelse: string;
  omplassering: string;
  omplasseringAarsak: string;
  sendtAv: string;
  sendtAvNavn: string;
  termindato: string;
  harVedlegg: boolean;
  journalpostId: string;
  oppgaveId: string;
  navn: string;
}

export default GravidSoknadResponse;
