import KravPeriode from './KravPeriode';

interface GravidKravResponse {
  id: string;
  opprettet: string;
  sendtAv: string;
  virksomhetsnummer: string;
  identitetsnummer: string;
  perioder: Array<KravPeriode>;
  harVedlegg: boolean;
  antallDager: number | null;
  journalpostId: string;
  oppgaveId: string | null;
  virksomhetsnavn: string;
}

export default GravidKravResponse;
