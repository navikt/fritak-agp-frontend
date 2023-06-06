export interface KravRad {
  kravId: string;
  opprettet: Date;
  fnr: string;
  navn: string;
  kravtype: string;
}

interface Arbeidsgiverperiode {
  perioder: Array<Periode>;
  antallDagerMedRefusjon: number;
  månedsinntekt: number;
  gradering: number;
  dagsats: number;
  belop: number;
}

interface Periode {
  fom: string;
  tom: string;
}

interface Krav {
  id: string;
  opprettet: string;
  sendtAv: string;
  virksomhetsnummer: string;
  identitetsnummer: string;
  navn: string;
  perioder: Array<Arbeidsgiverperiode>;
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

export interface KroniskKrav extends Krav {}

export interface EksisterendeKrav {
  gravidKrav: GravidKrav[] | [];
  kroniskKrav: KroniskKrav[] | [];
}
