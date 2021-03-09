import KravPeriode from './KravPeriode';

interface GravidKravResponse {
  id: string;
  opprettet: string;
  sendtAv: string;
  virksomhetsnummer: string;
  identitetsnummer: string;
  periode: KravPeriode;
  harVedlegg: boolean;
  kontrollDager: number;
  journalpostId: string;
  oppgaveId: number;
  virksomhetsnavn: string;
}

export default GravidKravResponse;
