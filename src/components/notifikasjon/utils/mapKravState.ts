import dayjs from 'dayjs';
import GravidKravResponse from '../../../api/gravidkrav/GravidKravResponse';
import KroniskKravResponse from '../../../api/gravidkrav/KroniskKravResponse';

const mapKravState = (krav: KroniskKravResponse): GravidKravResponse => ({
  id: krav.id,
  opprettet: krav.opprettet,
  sendtAv: krav.sendtAv,
  virksomhetsnummer: krav.virksomhetsnummer,
  identitetsnummer: krav.identitetsnummer,
  periode: krav.perioder.reduce((prev, current) => {
    prev.beloep += current.beloep;
    prev.antallDagerMedRefusjon += current.antallDagerMedRefusjon;
    prev.fom = dayjs(prev.fom).isBefore(dayjs(current.fom)) ? prev.fom : current.fom;
    prev.tom = dayjs(prev.tom).isAfter(dayjs(current.tom)) ? prev.tom : current.tom;
    return prev;
  }),
  harVedlegg: krav.harVedlegg,
  kontrollDager: krav.kontrollDager,
  journalpostId: krav.journalpostId,
  oppgaveId: krav.oppgaveId ?? null,
  virksomhetsnavn: krav.virksomhetsnavn
});

export default mapKravState;
