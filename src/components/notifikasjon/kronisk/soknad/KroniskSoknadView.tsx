import React from 'react';
import NotifikasjonInnhold from '../../felles/NotifikasjonInnhold';
import NotifikasjonType from '../../felles/NotifikasjonType';
import KroniskSoknadResponse from '../../../../api/kronisk/KroniskSoknadResponse';
import formatInnsendtAv from '../../gravid/soknad/formatInnsendtAv';
import formatDokumentasjon from '../../gravid/soknad/formatDokumentasjon';
import formatFravaersdager from './formatFravaersdager';
import formatArbeidstype from './formatArbeidstype';
import formatPaakjenninger from './formatPaakjenninger';
import './KroniskSoknadView.scss';
import Lenke from 'nav-frontend-lenker';

export interface KroniskSoknadNotifikasjonProps {
  kroniskSoknadResponse: KroniskSoknadResponse;
}

const KroniskSoknadView = ({ kroniskSoknadResponse }: KroniskSoknadNotifikasjonProps) => {
  return (
    <NotifikasjonInnhold
      title='Informasjon om sykepenger'
      type={NotifikasjonType.KroniskSoknad}
      dato={kroniskSoknadResponse.opprettet}
    >
      <p>
        Arbeidsgiveren din, {kroniskSoknadResponse.virksomhetsnavn}, har i dag søkt om utvidet støtte fra NAV angående
        sykepenger til deg. NAV har en egen ordning når sykefraværet blir høyere på grunn av kronisk/langvarig sykdom.
        Vanligvis skal arbeidsgiveren dekke de første 16 dagene av et sykefravær. Nå søker arbeidsgiveren din om at NAV
        dekker sykepengene dine fra første dag.
      </p>
      <p>
        Du trenger ikke å foreta deg noe i forbindelse med dette. Vi tar kontakt med deg igjen hvis det blir behov for
        det.
      </p>
      <p>Når vi har behandlet søknaden fra arbeidsgiveren din, vil du få en melding fra oss om resultatet.</p>
      <h3>Detaljer fra søknaden:</h3>
      <p>
        Type arbeid: <ul className='dash'>{formatArbeidstype(kroniskSoknadResponse.arbeidstyper)}</ul>
      </p>
      <p>
        Påkjenninger på arbeidsstedet:
        <ul className='dash'>
          {formatPaakjenninger(kroniskSoknadResponse.paakjenningstyper, kroniskSoknadResponse.paakjenningBeskrivelse)}
        </ul>
      </p>
      <p>{formatDokumentasjon(kroniskSoknadResponse.harVedlegg)}</p>
      <p>{formatFravaersdager(kroniskSoknadResponse.fravaer)}</p>
      <p>{formatInnsendtAv(kroniskSoknadResponse.sendtAv)}</p>
      <p>
        <Lenke href='https://www.nav.no/no/bedrift/oppfolging/sykemeldt-arbeidstaker/sykepenger/kronisk-syk-arbeidstaker'>
          Om du vil, kan du lese om arbeidsgiverens rett til å få dekket utgiftene.
        </Lenke>
      </p>
    </NotifikasjonInnhold>
  );
};

export default KroniskSoknadView;
