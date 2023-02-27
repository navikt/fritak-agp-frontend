import React, { useContext } from 'react';
import { Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import lenker, { buildLenke } from '../../config/lenker';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import { InternLenke, Language, Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { useParams } from 'react-router-dom';
import { KroniskSoknadKvitteringContext } from '../../context/KroniskSoknadKvitteringContext';
import './KroniskKvittering.scss';
import SoknadMottatt from '../gravid/SoknadMottatt';
import PrintKnapp from '../felles/PrintKnapp';
import Fravaersdager from '../notifikasjon/kronisk/soknad/Fravaersdager';
import Dokumentasjon from '../notifikasjon/gravid/soknad/Dokumentasjon';
import { Alert } from '@navikt/ds-react';

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
          <Sidetittel>
            Kvittering for søknad om fritak fra arbeidsgiverperioden knyttet til kronisk eller langvarig sykdom
          </Sidetittel>
        </Panel>

        <Panel>
          <Normaltekst>
            En kopi av kvittering er også sendt til meldingsboksen deres i{' '}
            <Lenke href='https://www.altinn.no'>Altinn</Lenke>. Meldingen er kun synlig for for de som har tilgang til å
            sende inntektsmelding i altinn. Den ansatte det gjelder er også varslet om søknaden. Trenger du å kontakte
            oss, er det tilstrekkelig å oppgi fødselsnummeret til den ansatte.
          </Normaltekst>
        </Panel>

        <Panel>
          <Undertittel>Detaljer fra søknaden:</Undertittel>
          <Normaltekst className='luft-under'>Navn: {navn}</Normaltekst>
          <Normaltekst className='luft-under'>
            <Dokumentasjon harVedlegg={harVedlegg} />
          </Normaltekst>
          <Normaltekst className='luft-under'>
            <Fravaersdager maanedsfravaer={fravaer} />
          </Normaltekst>
          <SoknadMottatt className='luft-under' mottatt={opprettet} />
          <Normaltekst>Innrapportert av: {sendtAvNavn}</Normaltekst>
        </Panel>
        <Panel className='skjul-fra-print'>
          <Normaltekst>
            Du kan skrive ut eller lagre kvitteringen ved å klikke på knappen &quot;Skriv ut kvittering&quot;.
          </Normaltekst>
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
