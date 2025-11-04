import GravidKravVisning from '../../../api/gravidkrav/GravidKravVisning';
import KravPeriode from '../../../api/gravidkrav/KravPeriode';
import KroniskKravResponse from '../../../api/gravidkrav/KroniskKravResponse';

const mapKravState = (krav: KroniskKravResponse): GravidKravVisning => {
  const perioder = [...krav.perioder] as unknown as KravPeriode[];
  let totalBelop = 0;
  perioder.forEach((periode) => {
    totalBelop += periode.belop;
  });

  return {
    id: krav.id,
    opprettet: krav.opprettet,
    sendtAv: krav.sendtAv,
    virksomhetsnummer: krav.virksomhetsnummer,
    identitetsnummer: krav.identitetsnummer,
    perioder: krav.perioder as unknown as KravPeriode[],
    totalBelop: totalBelop,
    harVedlegg: krav.harVedlegg,
    antallDager: krav.antallDager,
    journalpostId: krav.journalpostId,
    oppgaveId: krav.oppgaveId ?? null,
    virksomhetsnavn: krav.virksomhetsnavn
  };
};

export default mapKravState;
