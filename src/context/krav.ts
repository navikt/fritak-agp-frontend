interface Periode {
  fom: string;
  tom: string;
  antallDagerMedRefusjon: number;
  månedsinntekt: number;
  gradering: number;
  dagsats: number;
  belop: number;
}

interface Krav {
  id: string;
  opprettet: string;
  sendtAv: string;
  virksomhetsnummer: string;
  identitetsnummer: string;
  navn: string;
  perioder: Periode[];
  kontrollDager: number | null;
  antallDager: number;
  journalpostId: string;
  oppgaveId: string;
  virksomhetsnavn: string;
  sendtAvNavn: string;
  status: string;
}

export interface GravidKrav extends Krav {
  harVedlegg: boolean;
}

export type KroniskKrav = Krav;
