interface KroniskSoknadResponse {
  id: string;
  opprettet: string;
  virksomhetsnummer: string;
  virksomhetsnavn: string;

  arbeidstyper: string[];
  paakjenningstyper: string[];
  paakjenningBeskrivelse?: string;
  fravaer: string[];

  sendtAv: string;
  harVedlegg: boolean;
  journalpostId: string;
  oppgaveId: string;
}

export default KroniskSoknadResponse;
