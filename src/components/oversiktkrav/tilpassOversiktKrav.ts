import dayjs from 'dayjs';

export interface KravRad {
  kravId: string;
  opprettet: Date;
  fnr: string;
  navn: string;
}

const tilpassOversiktKrav = (kravRespons): KravRad[] => {
  const kravrader = [...kravRespons.gravidKrav, ...kravRespons.kroniskKrav];
  return kravrader
    .map((rad): KravRad => {
      return {
        kravId: rad.id,
        opprettet: dayjs(rad.opprettet).toDate(),
        fnr: rad.identitetsnummer,
        navn: rad.navn
      };
    })
    .sort((a, b) => Number(dayjs(a.opprettet).isBefore(b.opprettet)));
};

export default tilpassOversiktKrav;
