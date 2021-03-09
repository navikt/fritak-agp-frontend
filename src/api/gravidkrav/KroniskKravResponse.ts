import KravPeriode from './KravPeriode';

interface KroniskKravResponse {
  id: string;
  opprettet: string;
  sendtAv: string;
  virksomhetsnummer: string;
  identitetsnummer: string;
  perioder: Array<KravPeriode>;
  harVedlegg: boolean;
  kontrollDager: number;
  journalpostId: string;
  oppgaveId: number;
  virksomhetsnavn: string;
}

export default KroniskKravResponse;
