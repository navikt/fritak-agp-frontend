import dayjs from 'dayjs';

import React, { useEffect } from 'react';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import SelectDager from '../felles/SelectDager/SelectDager';
import './KravPeriode.scss';
import { useTranslation } from 'react-i18next';
import LangKey from '../../locale/LangKey';
import beregnRefusjon from './beregnRefusjon';
import { MIN_KRONISK_DATO } from '../../config/konstanter';
import { Button, HelpText, TextField } from '@navikt/ds-react';
import '@navikt/ds-css';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import Datovelger from '../datovelger/Datovelger';
import TextLabel from '../TextLabel';
import stringishToNumber from '../../utils/stringishToNumber';
import { datoToString } from '../../utils/dato/Dato';
import textify from '../../utils/textify';
import { KroniskKravAction } from './Actions';
import { KroniskKravPeriode } from './KroniskKravState';
import { GravidKravAction } from '../gravidkrav/Actions';
import { Actions } from '../../context/kravPeriodeActions';

export type KravPeriodeAction = GravidKravAction | KroniskKravAction;

interface EnkeltPeriode {
  uniqueKey: string;
  fom?: { year?: number } | undefined;
  tom?: { year?: number } | undefined;
  fomError?: string;
  tomError?: string;
  dager?: number;
  dagerError?: string;
  belop?: number;
  belopError?: string;
  sykmeldingsgrad?: string | number;
  sykmeldingsgradError?: string;
}

interface KravPeriodeProps {
  dispatch: React.Dispatch<KravPeriodeAction>;
  enkeltPeriode: EnkeltPeriode;
  index: number;
  lonnspliktDager: number | undefined;
  slettbar: boolean;
}

const KravPeriode = (props: KravPeriodeProps) => {
  const { t } = useTranslation();
  const dispatch = props.dispatch;

  const fjernPeriode = (itemId: string): void => {
    dispatch({
      type: Actions.DeletePeriode,
      payload: {
        itemId
      }
    });
  };

  const fraDatoValgt = (fraDato: Date | undefined, itemId: string) => {
    if (fraDato) {
      getGrunnbeloep(dayjs(fraDato).format('YYYY-MM-DD')).then((grunnbelopRespons) => {
        if (grunnbelopRespons.grunnbeloep) {
          dispatch({
            type: Actions.Grunnbeloep,
            payload: {
              grunnbeloep: grunnbelopRespons.grunnbeloep.grunnbeloep,
              itemId: itemId
            }
          });
        }
      });
    }
    dispatch({
      type: Actions.Fra,
      payload: {
        fra: fraDato,
        itemId: itemId
      }
    });
  };

  const beregnetRefusjon = beregnRefusjon(
    props.enkeltPeriode as KroniskKravPeriode,
    props.lonnspliktDager
  ).toLocaleString('nb-NO');

  const today = new Date();

  const defaultFom =
    props.enkeltPeriode.fom && props.enkeltPeriode.fom.year
      ? dayjs(datoToString(props.enkeltPeriode.fom)).toDate()
      : undefined;
  const defaultTom =
    props.enkeltPeriode.tom && props.enkeltPeriode.tom.year
      ? dayjs(datoToString(props.enkeltPeriode.tom)).toDate()
      : undefined;
  const defaultSykmeldingsgrad = props.enkeltPeriode.sykmeldingsgrad
    ? stringishToNumber(props.enkeltPeriode.sykmeldingsgrad)
    : '';

  useEffect(() => {
    if (props.enkeltPeriode.fom && props.enkeltPeriode.fom.year) {
      getGrunnbeloep(datoToString(props.enkeltPeriode.fom)).then((grunnbelopRespons) => {
        if (grunnbelopRespons.grunnbeloep) {
          dispatch({
            type: Actions.Grunnbeloep,
            payload: {
              grunnbeloep: grunnbelopRespons.grunnbeloep.grunnbeloep,
              itemId: props.enkeltPeriode.uniqueKey
            }
          });
        }
      });
    }
  }, []);

  return (
    <div className='krav-kort' data-testid='krav-periode-wrapper'>
      <Datovelger
        id={`fra-dato-${props.index}`}
        label={<div className='label-uten-hjelp'>{t(LangKey.KRONISK_KRAV_PERIODE_FRA)}</div>}
        onDateChange={(fraDato: Date | undefined) => {
          fraDatoValgt(fraDato, props.enkeltPeriode.uniqueKey);
        }}
        error={props.enkeltPeriode.fomError}
        toDate={today}
        fromDate={MIN_KRONISK_DATO}
        defaultSelected={defaultFom}
      />

      <Datovelger
        id={`til-dato-${props.index}`}
        label={<div className='label-uten-hjelp'>{t(LangKey.KRONISK_KRAV_PERIODE_TIL)}</div>}
        onDateChange={(tilDate: Date | undefined) => {
          dispatch({
            type: Actions.Til,
            payload: {
              til: tilDate,
              itemId: props.enkeltPeriode.uniqueKey
            }
          });
        }}
        error={props.enkeltPeriode.tomError}
        toDate={today}
        defaultSelected={defaultTom}
      />

      <SelectDager
        label={
          <div className='label-med-hjelp'>
            {t(LangKey.KRONISK_KRAV_PERIODE_DAGER_LABEL)}
            <HelpText
              className='krav-padding-hjelpetekst'
              title={textify(t(LangKey.KRONISK_KRAV_PERIODE_DAGER_TITTEL))}
            >
              {t(LangKey.KRONISK_KRAV_PERIODE_DAGER_HJELPETEKST)}
            </HelpText>
          </div>
        }
        className='periode-elementer'
        id={`dager-${props.index}`}
        value={props.enkeltPeriode.dager}
        onChange={(event: React.FormEvent<HTMLSelectElement>) =>
          dispatch({
            type: Actions.Dager,
            payload: {
              dager: stringishToNumber(event.currentTarget.value),
              itemId: props.enkeltPeriode.uniqueKey
            }
          })
        }
        error={props.enkeltPeriode.dagerError}
      />

      <TextField
        label={
          <div className='label-med-hjelp'>
            {t(LangKey.KRONISK_KRAV_PERIODE_BELOP_TEXT)}
            <HelpText
              className='krav-padding-hjelpetekst'
              title={textify(t(LangKey.KRONISK_KRAV_PERIODE_BELOP_HJELP_TITTEL))}
            >
              <TextLabel>{t(LangKey.KRONISK_KRAV_PERIODE_BELOP_TITTEL)}</TextLabel>
              <Oversettelse langKey={LangKey.KRONISK_KRAV_PERIODE_BELOP_HJELPETEKST} />
            </HelpText>
          </div>
        }
        className='mnd-inntekt'
        id={`belop-${props.index}`}
        inputMode='numeric'
        pattern='[0-9]*'
        placeholder='Kr:'
        defaultValue={props.enkeltPeriode.belop}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: Actions.Beloep,
            payload: {
              belop: stringishToNumber(event.currentTarget.value),
              itemId: props.enkeltPeriode.uniqueKey
            }
          })
        }
        error={props.enkeltPeriode.belopError}
      />

      <TextField
        id={`sykmeldingsgrad-${props.index}`}
        label={
          <div className='label-med-hjelp'>
            Sykmeldingsgrad
            <HelpText className='krav-padding-hjelpetekst' title='Gradert sykmelding'>
              <TextLabel>Gradert sykmelding</TextLabel>
              Sykmeldingsgrad, minimum 20%
            </HelpText>
          </div>
        }
        inputMode='numeric'
        pattern='[0-9]*'
        placeholder='100%'
        defaultValue={defaultSykmeldingsgrad}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: Actions.Sykmeldingsgrad,
            payload: {
              sykmeldingsgrad: event.currentTarget.value,
              itemId: props.enkeltPeriode.uniqueKey
            }
          })
        }
        error={props.enkeltPeriode.sykmeldingsgradError}
      />

      <div>
        <TextLabel>
          <div className='label-med-hjelp'>
            {t(LangKey.KRONISK_KRAV_PERIODE_BEREGNET_LABEL)}
            <HelpText
              className='krav-padding-hjelpetekst veldig-lang-hjelpetekst'
              title={textify(t(LangKey.KRONISK_KRAV_PERIODE_BEREGNET_TITTEL))}
            >
              <Oversettelse langKey={LangKey.KRONISK_KRAV_PERIODE_BEREGNET_HJELPETEKST} />
            </HelpText>
          </div>
        </TextLabel>
        <div className='skjemalelement tekstvisning'>
          {t(LangKey.KRONER)}&nbsp;{beregnetRefusjon}
        </div>
      </div>
      {props.slettbar && (
        <div className='slett-periode-wrapper'>
          <Button
            variant='danger'
            onClick={() => fjernPeriode(props.enkeltPeriode.uniqueKey)}
            className='slett-periode'
          >
            Slett
          </Button>
        </div>
      )}
    </div>
  );
};

export default KravPeriode;
