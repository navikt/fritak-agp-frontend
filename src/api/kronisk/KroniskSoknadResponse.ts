import { MaanedsFravaer } from '../../components/notifikasjon/kronisk/soknad/formatFravaersdager';

interface KroniskSoknadResponse {
  id: string;
  opprettet: string;
  virksomhetsnummer: string;
  virksomhetsnavn: string;

  arbeidstyper: string[];
  paakjenningstyper: string[];
  paakjenningBeskrivelse?: string;
  fravaer: MaanedsFravaer[];

  sendtAv: string;
  sendtAvNavn: string;
  harVedlegg: boolean;
  journalpostId: string;
  oppgaveId: string;
}

export default KroniskSoknadResponse;
