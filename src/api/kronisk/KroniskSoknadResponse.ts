import { MaanedsFravaer } from '../../components/notifikasjon/kronisk/soknad/Fravaersdager';

interface KroniskSoknadResponse {
  id: string;
  opprettet: string;
  virksomhetsnummer: string;
  virksomhetsnavn: string;
  identitetsnummer: string;
  arbeidstyper: string[];
  paakjenningstyper: string[];
  paakjenningBeskrivelse?: string;
  fravaer: MaanedsFravaer[];
  navn: string;
  sendtAv: string;
  sendtAvNavn: string;
  harVedlegg: boolean;
  journalpostId: string;
  oppgaveId: string;
}

export default KroniskSoknadResponse;
