import KravPeriode from './KravPeriode';

interface GravidKravVisning {
  id: string;
  opprettet: string;
  sendtAv: string;
  virksomhetsnummer: string;
  identitetsnummer: string;
  perioder: KravPeriode[];
  totalBelop: number | null;
  harVedlegg: boolean;
  antallDager: number | null;
  journalpostId: string;
  oppgaveId: string | null;
  virksomhetsnavn: string;
}

export default GravidKravVisning;
