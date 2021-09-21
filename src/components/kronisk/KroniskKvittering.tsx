import React, { useContext } from 'react';
import { Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import lenker, { buildLenke } from '../../config/lenker';
import InternLenke from '../felles/InternLenke/InternLenke';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import { Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { useParams } from 'react-router-dom';
import PathParams from '../../locale/PathParams';
import { KroniskSoknadKvitteringContext } from '../../context/KroniskSoknadKvitteringContext';
import formatArbeidstype from '../notifikasjon/kronisk/soknad/formatArbeidstype';
import formatPaakjenninger from '../notifikasjon/kronisk/soknad/formatPaakjenninger';
import formatDokumentasjon from '../notifikasjon/gravid/soknad/formatDokumentasjon';
import formatFravaersdager from '../notifikasjon/kronisk/soknad/formatFravaersdager';
import './KroniskKvittering.scss';

const KroniskKvittering = () => {
  const { t } = useTranslation();
  const { language } = useParams<PathParams>();
  const { response } = useContext(KroniskSoknadKvitteringContext);

  const arbeidstyper: string[] | undefined = response?.response?.arbeidstyper;
  const paakjenningstyper: string[] | undefined = response?.response?.paakjenningstyper;
  const paakjenningBeskrivelse: string | undefined = response?.response?.paakjenningBeskrivelse;
  const harVedlegg: boolean | undefined = response?.response?.harVedlegg;
  const fravaer = response?.response?.fravaer;

  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering'>
      <Row>
        <Panel>
          <Sidetittel>Søknaden er mottatt</Sidetittel>
        </Panel>

        <Panel>
          <Normaltekst>
            En kvittering er sendt til meldingsboksen deres i <Lenke href='https://www.altinn.no'>Altinn</Lenke>. Den
            ansatte har også fått melding om at søknaden er sendt. Trenger du å kontakte oss, er det tilstrekkelig å
            oppgi fødselsnummeret til den ansatte.
          </Normaltekst>
        </Panel>

        <Panel>
          <Undertittel>Detaljer fra søknaden:</Undertittel>
          <Normaltekst>
            Type arbeid: <ul className='dash'>{formatArbeidstype(arbeidstyper)}</ul>
          </Normaltekst>
          <Normaltekst>
            Påkjenninger på arbeidsstedet:
            <ul className='dash'>{formatPaakjenninger(paakjenningstyper, paakjenningBeskrivelse)}</ul>
          </Normaltekst>
          <Normaltekst className='luft-under'>{formatDokumentasjon(harVedlegg)}</Normaltekst>
          <Normaltekst>{formatFravaersdager(fravaer)}</Normaltekst>
        </Panel>

        <Panel>
          <AlertStripeInfo>
            Vi anbefaler at bedriften sender selve refusjonskravet før denne søknaden er ferdig behandlet. Da unngår
            dere å oversitte fristen, som er tre måneder.
          </AlertStripeInfo>
        </Panel>

        <Panel className='lenker-ut-panel'>
          <div>
            <InternLenke to={buildLenke(lenker.KroniskKrav, language)}>Send krav om refusjon</InternLenke>
          </div>
          <div>
            <Lenke href='https://loginservice.nav.no/slo'>Logg ut</Lenke>
          </div>
          <div>
            <Lenke href='/min-side-arbeidsgiver/'>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</Lenke>
          </div>
        </Panel>
      </Row>
    </Side>
  );
};

export default KroniskKvittering;
