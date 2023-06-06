import React, { useContext } from 'react';
import { Row } from 'nav-frontend-grid';
import lenker, { buildLenke } from '../../config/lenker';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { KroniskSoknadKvitteringContext } from '../../context/KroniskSoknadKvitteringContext';
import './KroniskKvittering.scss';
import SoknadMottatt from '../gravid/SoknadMottatt';
import PrintKnapp from '../felles/PrintKnapp';
import Fravaersdager from '../notifikasjon/kronisk/soknad/Fravaersdager';
import Dokumentasjon from '../notifikasjon/gravid/soknad/Dokumentasjon';
import { Alert, BodyLong, Heading, Link, Panel } from '@navikt/ds-react';
import Side from '../felles/Side/Side';
import InternLenke from '../felles/InternLenke/InternLenke';
import Language from '../../locale/Language';

const KroniskKvittering = () => {
  const { t } = useTranslation();
  const { language } = useParams();
  const { response } = useContext(KroniskSoknadKvitteringContext);

  const harVedlegg: boolean = response?.response?.harVedlegg ? true : false;
  const fravaer = response?.response?.fravaer;
  const navn = response?.response?.navn;
  const sendtAvNavn = response?.response?.sendtAvNavn;
  const opprettet = response?.response?.opprettet;

  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering' bedriftsmeny={false}>
      <Row>
        <Panel>
          <Heading size='xlarge' level='1'>
            Kvittering for søknad om fritak fra arbeidsgiverperioden knyttet til kronisk eller langvarig sykdom
          </Heading>
        </Panel>

        <Panel>
          <BodyLong>
            En kopi av kvittering er også sendt til meldingsboksen deres i{' '}
            <Link href='https://www.altinn.no'>Altinn</Link>. Meldingen er kun synlig for for de som har tilgang til å
            sende inntektsmelding i altinn. Den ansatte det gjelder er også varslet om søknaden. Trenger du å kontakte
            oss, er det tilstrekkelig å oppgi fødselsnummeret til den ansatte.
          </BodyLong>
        </Panel>

        <Panel>
          <Heading size='small' level='2'>
            Detaljer fra søknaden:
          </Heading>
          <BodyLong className='luft-under'>Navn: {navn}</BodyLong>
          <BodyLong className='luft-under'>
            <Dokumentasjon harVedlegg={harVedlegg} />
          </BodyLong>
          <BodyLong className='luft-under'>
            <Fravaersdager maanedsfravaer={fravaer} />
          </BodyLong>
          <SoknadMottatt className='luft-under' mottatt={opprettet} />
          <BodyLong>Innrapportert av: {sendtAvNavn}</BodyLong>
        </Panel>
        <Panel className='skjul-fra-print'>
          <BodyLong>
            Du kan skrive ut eller lagre kvitteringen ved å klikke på knappen &quot;Skriv ut kvittering&quot;.
          </BodyLong>
        </Panel>
        <Panel>
          <Alert variant='info'>
            Vi anbefaler at bedriften sender selve refusjonskravet før denne søknaden er ferdig behandlet. Da unngår
            dere å oversitte fristen, som er tre måneder.
          </Alert>
        </Panel>
        <Panel>
          <PrintKnapp />
        </Panel>

        <Panel className='lenker-ut-panel'>
          <div>
            <InternLenke to={buildLenke(lenker.KroniskKrav, language as Language)}>Send krav om refusjon</InternLenke>
          </div>
          <div>
            <Link href='https://loginservice.nav.no/slo'>Logg ut</Link>
          </div>
          <div>
            <Link href='/min-side-arbeidsgiver/'>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</Link>
          </div>
        </Panel>
      </Row>
    </Side>
  );
};

export default KroniskKvittering;
