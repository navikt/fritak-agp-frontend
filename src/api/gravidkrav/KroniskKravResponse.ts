import KravPeriode from './KravPeriode';
import KravPeriodeMedDelperiode from './KravPeriodeMedDelperiode';

interface KroniskKravResponse {
  id: string;
  opprettet: string;
  sendtAv: string;
  virksomhetsnummer: string;
  identitetsnummer: string;
  perioder: Array<KravPeriode | KravPeriodeMedDelperiode>;
  harVedlegg: boolean;
  antallDager: number | null;
  journalpostId: string;
  oppgaveId?: string | null;
  virksomhetsnavn: string;
}

export default KroniskKravResponse;
