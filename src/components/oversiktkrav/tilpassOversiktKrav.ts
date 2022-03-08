import dayjs from 'dayjs';

export interface KravRad {
  kravId: string;
  opprettet: Date;
  fnr: string;
  navn: string;
  kravtype: string;
}

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

export interface KroniskKrav extends Krav {}

export interface EksisterendeKrav {
  gravidKrav: GravidKrav[] | [];
  kroniskKrav: KroniskKrav[] | [];
}

const mapKrav = (krav: GravidKrav[] | KroniskKrav[], kravType: string): KravRad[] => {
  return krav
    .filter((ufiltrert) => {
      return ufiltrert.status === 'OPPRETTET';
    })
    .map((rad): KravRad => {
      return {
        kravId: rad.id,
        opprettet: dayjs(rad.opprettet).toDate(),
        fnr: rad.identitetsnummer,
        navn: rad.navn,
        kravtype: kravType
      };
    });
};

const tilpassOversiktKrav = (gravidKrav: GravidKrav[], kroniskKrav: KroniskKrav[]): KravRad[] => {
  return [...mapKrav(gravidKrav, 'gravidKrav'), ...mapKrav(kroniskKrav, 'kroniskKrav')];
};

export default tilpassOversiktKrav;
