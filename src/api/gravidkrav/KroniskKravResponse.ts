import { Arbeidsgiverperiode } from '../kroniskkrav/KroniskKravRequest';
// import KravPeriode from './KravPeriode';

interface KroniskKravResponse {
  id: string;
  opprettet: string;
  sendtAv: string;
  virksomhetsnummer: string;
  identitetsnummer: string;
  perioder: Array<Arbeidsgiverperiode>;
  harVedlegg: boolean;
  antallDager: number | null;
  journalpostId: string;
  oppgaveId?: string | null;
  virksomhetsnavn: string;
}

export default KroniskKravResponse;
