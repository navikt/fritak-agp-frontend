import { DatoVelger, InternLenke, Oversettelse, stringishToNumber } from '@navikt/helse-arbeidsgiver-felles-frontend';
import dayjs from 'dayjs';
import { Column, Row } from 'nav-frontend-grid';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Input, Label } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import SelectDager from '../felles/SelectDager/SelectDager';
import { Actions } from './Actions';
import { KroniskKravPeriode } from './KroniskKravState';
import './KravPeriode.scss';
import { useTranslation } from 'react-i18next';
import LangKey from '../../locale/LangKey';

interface KravPeriodeProps {
  dispatch: any;
  enkeltPeriode: KroniskKravPeriode;
  index: number;
}

const beregnRefusjon = (enkeltPeriode: KroniskKravPeriode): number => {
  if (!enkeltPeriode.beloep || !enkeltPeriode.dager || !enkeltPeriode.grunnbeloep) {
    return 0;
  }

  const aarsBeloep = enkeltPeriode.beloep * 12;
  const aarsGrunnbeloep = enkeltPeriode.grunnbeloep * 6;

  if (aarsBeloep > aarsGrunnbeloep) {
    const gRefusjon = (aarsGrunnbeloep / 260) * enkeltPeriode.dager;
    return Math.round((gRefusjon + Number.EPSILON) * 100) / 100;
  } else {
    const aarsRefusjon = (aarsBeloep / 260) * enkeltPeriode.dager;
    return Math.round((aarsRefusjon + Number.EPSILON) * 100) / 100;
  }
};

const KravPeriode = (props: KravPeriodeProps) => {
  const { t } = useTranslation();
  const dispatch = props.dispatch;

  const fjernPeriode = (periode: number): void => {
    dispatch({
      type: Actions.DeletePeriod,
      payload: {
        periode: periode
      }
    });
  };

  const fraDatoValgt = (fraDato: Date, itemId: string) => {
    if (fraDato) {
      getGrunnbeloep(dayjs(fraDato).format('YYYY-MM-DD')).then((grunnbeloepRespons) => {
        if (grunnbeloepRespons.grunnbeloep) {
          dispatch({
            type: Actions.Grunnbeloep,
            payload: {
              grunnbeloep: grunnbeloepRespons.grunnbeloep.grunnbeloep,
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

  const beregnetRefusjon = beregnRefusjon(props.enkeltPeriode);

  return (
    <Row
      className={props.index > 0 ? 'hide-labels periodewrapper' : 'periodewrapper'}
      data-testid='krav-periode-wrapper'
    >
      <Column sm='2' xs='6'>
        <DatoVelger
          className='datovelger-periode'
          id={`fra-dato-${props.index}`}
          placeholder={t(LangKey.KRONISK_KRAV_PERIODE_FORMAT)}
          label={t(LangKey.KRONISK_KRAV_PERIODE_FRA)}
          onChange={(fraDato: Date) => {
            fraDatoValgt(fraDato, props.enkeltPeriode.uniqueKey);
          }}
          feilmelding={props.enkeltPeriode.fomError}
        />
      </Column>
      <Column sm='2' xs='6'>
        <DatoVelger
          className='datovelger-periode'
          id={`til-dato-${props.index}`}
          placeholder={t(LangKey.KRONISK_KRAV_PERIODE_FORMAT)}
          label={t(LangKey.KRONISK_KRAV_PERIODE_TIL)}
          onChange={(tilDate: Date) => {
            dispatch({
              type: Actions.Til,
              payload: {
                til: tilDate,
                itemId: props.enkeltPeriode.uniqueKey
              }
            });
          }}
          feilmelding={props.enkeltPeriode.tomError}
        />
      </Column>
      <Column sm='2' xs='6'>
        <Label htmlFor={`dager-${props.index}`}>
          {t(LangKey.KRONISK_KRAV_PERIODE_DAGER_LABEL)}
          <Hjelpetekst className='krav-padding-hjelpetekst'>
            {t(LangKey.KRONISK_KRAV_PERIODE_DAGER_HJELPETEKST)}
          </Hjelpetekst>
        </Label>
        <SelectDager
          id={`dager-${props.index}`}
          value={props.enkeltPeriode.dager}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: Actions.Dager,
              payload: {
                dager: stringishToNumber(event.currentTarget.value),
                itemId: props.enkeltPeriode.uniqueKey
              }
            })
          }
          feil={props.enkeltPeriode.dagerError}
        />
      </Column>
      <Column sm='2' xs='6'>
        <Label htmlFor={`belop-${props.index}`}>
          {t(LangKey.KRONISK_KRAV_PERIODE_BELOP_TEXT)}
          <Hjelpetekst className='krav-padding-hjelpetekst'>
            <Systemtittel>{t(LangKey.KRONISK_KRAV_PERIODE_BELOP_TITTEL)}</Systemtittel>
            <Oversettelse langKey={LangKey.KRONISK_KRAV_PERIODE_BELOP_HJELPETEKST} />
          </Hjelpetekst>
        </Label>
        <Input
          id={`belop-${props.index}`}
          inputMode='numeric'
          pattern='[0-9]*'
          placeholder='Kr:'
          defaultValue={props.enkeltPeriode.beloep}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: Actions.Beloep,
              payload: {
                beloep: stringishToNumber(event.currentTarget.value),
                itemId: props.enkeltPeriode.uniqueKey
              }
            })
          }
          feil={props.enkeltPeriode.beloepError}
        />
      </Column>
      <Column sm='3' xs='6'>
        <Label htmlFor={`belop-${props.index}`}>
          {t(LangKey.KRONISK_KRAV_PERIODE_BEREGNET_LABEL)}
          <Hjelpetekst className='krav-padding-hjelpetekst'>
            <Oversettelse langKey={LangKey.KRONISK_KRAV_PERIODE_BEREGNET_HJELPETEKST} />
          </Hjelpetekst>
        </Label>
        <div className='skjemalelement tekstvisning'>
          {t(LangKey.KRONER)}&nbsp;{beregnetRefusjon} kr
        </div>
      </Column>
      <Column sm='1' xs='6' className='slett-periode-wrapper'>
        {props.index > 0 && (
          <InternLenke onClick={() => fjernPeriode(props.index)} className='slett-periode'>
            Slett
          </InternLenke>
        )}
      </Column>
    </Row>
  );
};

export default KravPeriode;
