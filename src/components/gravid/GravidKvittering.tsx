import React, { useContext } from 'react';
import lenker, { buildLenke } from '../../config/lenker';
import LangKey from '../../locale/LangKey';
import { GravidKvitteringKeys } from './GravidKvitteringKeys';
import { useParams, Link } from 'react-router-dom';
import formatTiltakBeskrivelse from '../notifikasjon/gravid/soknad/formatTiltakBeskrivelse';
import { GravidSoknadKvitteringContext } from '../../context/GravidSoknadKvitteringContext';
import formatOmplassering from '../notifikasjon/gravid/soknad/formatOmplassering';
import './GravidKvittering.scss';
import SoknadMottatt from './SoknadMottatt';
import PrintKnapp from '../felles/PrintKnapp';
import Dokumentasjon from '../notifikasjon/gravid/soknad/Dokumentasjon';
import environment from '../../config/environment';
import { Alert, Heading, BodyLong, Box } from '@navikt/ds-react';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import Side from '../felles/Side/Side';
import { Language } from '../../locale/Language';
import InternLenke from '../felles/InternLenke/InternLenke';

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
      <Box padding='space-4' borderRadius='2'>
        <Heading size='xlarge' level='1'>
          <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_TITTEL} />
        </Heading>
      </Box>
      <Box padding='space-4' borderRadius='2'>
        <BodyLong>
          <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_INGRESS} />
        </BodyLong>
      </Box>
      <Box padding='space-4' borderRadius='2'>
        <Heading size='small' level='2'>
          Detaljer fra søknaden:
        </Heading>
        <BodyLong className='luft-under'>Navn: {navn}</BodyLong>
        <BodyLong className='luft-under'>
          Tilrettelegging av arbeidsdagen {tilrettelegge ? 'er' : 'er ikke'} forsøkt
        </BodyLong>
        {tilrettelegge && tiltak && tiltak.length > 0 && (
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
      </Box>
      <Box padding='space-4' borderRadius='2' className='skjul-fra-print'>
        <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_SKRIV_UT} />
      </Box>
      <Box padding='space-4' borderRadius='2'>
        <Alert variant='info'>
          <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_ADVARSEL} />
        </Alert>
      </Box>
      <Box padding='space-4' borderRadius='2' className='skjul-fra-print'>
        <PrintKnapp />
      </Box>
      <Box padding='space-4' borderRadius='2' className='lenker-ut-panel'>
        <div>
          <Link to={buildLenke(lenker.GravidKrav, language as Language)}>
            <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_KRAV} />
          </Link>
        </div>
        <div>
          <Link to={environment.logoutServiceUrl} className='lenke'>
            <Oversettelse langKey={LangKey.LOGG_UT} />
          </Link>
        </div>
        <div>
          <InternLenke to={environment.minSideArbeidsgiver}>
            <Oversettelse langKey={LangKey.MIN_SIDE_ARBEIDSGIVER} />
          </InternLenke>
        </div>
      </Box>
    </Side>
  );
};

export default GravidKvittering;
