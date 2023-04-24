import Panel from 'nav-frontend-paneler';
import React, { useContext } from 'react';
import Lenke from 'nav-frontend-lenker';
import lenker, { buildLenke } from '../../config/lenker';
import LangKey from '../../locale/LangKey';
import { InternLenke, Language, Oversettelse, Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { GravidKvitteringKeys } from './GravidKvitteringKeys';
import { useParams } from 'react-router-dom';
import formatTiltakBeskrivelse from '../notifikasjon/gravid/soknad/formatTiltakBeskrivelse';
import { GravidSoknadKvitteringContext } from '../../context/GravidSoknadKvitteringContext';
import formatOmplassering from '../notifikasjon/gravid/soknad/formatOmplassering';
import './GravidKvittering.scss';
import SoknadMottatt from './SoknadMottatt';
import PrintKnapp from '../felles/PrintKnapp';
import Dokumentasjon from '../notifikasjon/gravid/soknad/Dokumentasjon';
import environment from '../../config/environment';
import { Alert, Heading, BodyLong } from '@navikt/ds-react';

const GravidKvittering = () => {
  const { language } = useParams();
  const { response } = useContext(GravidSoknadKvitteringContext);

  const tilrettelegge = response?.response?.tilrettelegge;
  const tiltak: string[] | undefined = response?.response?.tiltak;
  const tiltakBeskrivelse = response?.response?.tiltakBeskrivelse;
  const omplassering = response?.response?.omplassering;
  const omplasseringAarsak = response?.response?.omplasseringAarsak;
  const navn = response?.response?.navn;
  const sendtAvNavn = response?.response?.sendtAvNavn;
  const harVedlegg: boolean = response?.response?.harVedlegg ? true : false;
  const opprettet = response?.response?.opprettet;

  return (
    <Side sidetittel='Søknadsskjema' className='gravid-soknad-kvittering' bedriftsmeny={false}>
      <Panel>
        <Heading size='xlarge' level='1'>
          <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_TITTEL} />
        </Heading>
      </Panel>

      <Panel>
        <BodyLong>
          <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_INGRESS} />
        </BodyLong>
      </Panel>

      <Panel>
        <Heading size='small' level='4'>
          Detaljer fra søknaden:
        </Heading>
        <BodyLong className='luft-under'>Navn: {navn}</BodyLong>
        <BodyLong className='luft-under'>
          Tilrettelegging av arbeidsdagen {tilrettelegge ? 'er' : 'er ikke'} forsøkt
        </BodyLong>
        {tilrettelegge && tiltak && (
          <BodyLong>
            Tiltak forsøkt for at den ansatte skal kunne jobbe:
            <ul className='dash'>
              {tiltak.map((enkeltTiltak) => (
                <li key={enkeltTiltak}>{formatTiltakBeskrivelse(enkeltTiltak, tiltakBeskrivelse)}</li>
              ))}
            </ul>
          </BodyLong>
        )}
        {tilrettelegge && (
          <BodyLong className='luft-under'>{formatOmplassering(omplassering, omplasseringAarsak)}</BodyLong>
        )}
        <BodyLong className='luft-under'>
          <Dokumentasjon harVedlegg={harVedlegg} />
        </BodyLong>
        <SoknadMottatt className='luft-under' mottatt={opprettet} />
        <BodyLong>Innrapportert av: {sendtAvNavn}</BodyLong>
      </Panel>
      <Panel className='skjul-fra-print'>
        <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_SKRIV_UT} />
      </Panel>
      <Panel>
        <Alert variant='info'>
          <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_ADVARSEL} />
        </Alert>
      </Panel>
      <Panel className='skjul-fra-print'>
        <PrintKnapp />
      </Panel>
      <Panel className='lenker-ut-panel'>
        <div>
          <Lenke href={buildLenke(lenker.GravidKrav, language as Language)}>
            <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_KRAV} />
          </Lenke>
        </div>
        <div>
          <Lenke href={environment.logoutServiceUrl}>
            <Oversettelse langKey={LangKey.LOGG_UT} />
          </Lenke>
        </div>
        <div>
          <InternLenke to='/min-side-arbeidsgiver/'>
            <Oversettelse langKey={LangKey.MIN_SIDE_ARBEIDSGIVER} />
          </InternLenke>
        </div>
      </Panel>
    </Side>
  );
};

export default GravidKvittering;
