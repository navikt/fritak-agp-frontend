import { datoToString, DatoVelger, Oversettelse, stringishToNumber } from '@navikt/helse-arbeidsgiver-felles-frontend';
import dayjs from 'dayjs';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Input, Label } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { useEffect } from 'react';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import SelectDager from '../felles/SelectDager/SelectDager';
import { KroniskKravPeriode } from './KroniskKravState';
import './KravPeriode.scss';
import { useTranslation } from 'react-i18next';
import LangKey from '../../locale/LangKey';
import { Fareknapp } from 'nav-frontend-knapper';
import beregnRefusjon from './beregnRefusjon';
import { MIN_KRONISK_DATO } from '../../config/konstanter';

interface KravPeriodeProps {
  dispatch: any;
  enkeltPeriode: KroniskKravPeriode;
  index: number;
  lonnspliktDager: number | undefined;
  slettbar: boolean;
  Actions: any;
}

const KravPeriode = (props: KravPeriodeProps) => {
  const { t } = useTranslation();
  const dispatch = props.dispatch;

  const Actions = props.Actions;
  const fjernPeriode = (itemId: string): void => {
    console.log('Slettehandler', itemId, Actions.DeletePeriode); // eslint-disable-line

    dispatch({
      type: Actions.DeletePeriode,
      payload: {
        itemId
      }
    });
  };

  const fraDatoValgt = (fraDato: Date, itemId: string) => {
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

  const beregnetRefusjon = beregnRefusjon(props.enkeltPeriode, props.lonnspliktDager).toLocaleString('nb-NO');

  const today = new Date();

  const oddClass = props.index % 2 ? 'odd' : 'even';

  const defaultFom =
    props.enkeltPeriode.fom && props.enkeltPeriode.fom.year
      ? dayjs(datoToString(props.enkeltPeriode.fom)).toDate()
      : undefined;
  const defaultTom =
    props.enkeltPeriode.tom && props.enkeltPeriode.tom.year
      ? dayjs(datoToString(props.enkeltPeriode.tom)).toDate()
      : undefined;
  const defaultSykemeldingsgrad = props.enkeltPeriode.sykemeldingsgrad
    ? stringishToNumber(props.enkeltPeriode.sykemeldingsgrad)
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
  }, []); // eslint-disable-line

  return (
    <div className='krav-kort'>
      <div className={'periodewrapper ' + oddClass} data-testid='krav-periode-wrapper'>
        <div>
          <DatoVelger
            className='datovelger-periode'
            id={`fra-dato-${props.index}`}
            placeholder={t(LangKey.KRONISK_KRAV_PERIODE_FORMAT)}
            label={t(LangKey.KRONISK_KRAV_PERIODE_FRA)}
            onChange={(fraDato: Date) => {
              fraDatoValgt(fraDato, props.enkeltPeriode.uniqueKey);
            }}
            feilmelding={props.enkeltPeriode.fomError}
            maxDate={today}
            minDate={MIN_KRONISK_DATO}
            dato={defaultFom}
          />
        </div>
        <div>
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
            maxDate={today}
            dato={defaultTom}
          />
        </div>
        <div className='antall-dager'>
          <Label htmlFor={`dager-${props.index}`}>
            {t(LangKey.KRONISK_KRAV_PERIODE_DAGER_LABEL)}
            <Hjelpetekst className='krav-padding-hjelpetekst' title={t(LangKey.KRONISK_KRAV_PERIODE_DAGER_TITTEL)}>
              {t(LangKey.KRONISK_KRAV_PERIODE_DAGER_HJELPETEKST)}
            </Hjelpetekst>
          </Label>
          <SelectDager
            className='periode-elementer'
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
        </div>
        <div className='periode-elementer'>
          <Label htmlFor={`belop-${props.index}`}>
            {t(LangKey.KRONISK_KRAV_PERIODE_BELOP_TEXT)}
            <Hjelpetekst
              className='krav-padding-hjelpetekst'
              title={t(LangKey.KRONISK_KRAV_PERIODE_BELOP_HJELP_TITTEL)}
            >
              <Systemtittel>{t(LangKey.KRONISK_KRAV_PERIODE_BELOP_TITTEL)}</Systemtittel>
              <Oversettelse langKey={LangKey.KRONISK_KRAV_PERIODE_BELOP_HJELPETEKST} />
            </Hjelpetekst>
          </Label>
          <Input
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
            feil={props.enkeltPeriode.belopError}
          />
        </div>
      </div>
      <div className={'periodewrapper ' + oddClass}>
        <div>
          <Label htmlFor={`sykemeldingsgrad-${props.index}`}>
            Sykemeldingsgrad
            <Hjelpetekst className='krav-padding-hjelpetekst' title='Gradert sykmelding'>
              <Systemtittel>Gradert sykmelding</Systemtittel>
              Sykmeldingsgrad, minimum 20%
            </Hjelpetekst>
          </Label>
          <Input
            id={`sykemeldingsgrad-${props.index}`}
            inputMode='numeric'
            pattern='[0-9]*'
            placeholder='100%'
            defaultValue={defaultSykemeldingsgrad}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: Actions.Sykemeldingsgrad,
                payload: {
                  sykemeldingsgrad: event.currentTarget.value,
                  itemId: props.enkeltPeriode.uniqueKey
                }
              })
            }
            feil={props.enkeltPeriode.sykemeldingsgradError}
          />
        </div>
        <div>
          <Label htmlFor={`belop-${props.index}`}>
            {t(LangKey.KRONISK_KRAV_PERIODE_BEREGNET_LABEL)}
            <Hjelpetekst
              className='krav-padding-hjelpetekst veldig-lang-hjelpetekst'
              title={t(LangKey.KRONISK_KRAV_PERIODE_BEREGNET_TITTEL)}
            >
              <Oversettelse langKey={LangKey.KRONISK_KRAV_PERIODE_BEREGNET_HJELPETEKST} />
            </Hjelpetekst>
          </Label>
          <div className='skjemalelement tekstvisning'>
            {t(LangKey.KRONER)}&nbsp;{beregnetRefusjon}
          </div>
        </div>
        {props.slettbar && (
          <div className='slett-periode-wrapper'>
            <Fareknapp onClick={() => fjernPeriode(props.enkeltPeriode.uniqueKey)} className='slett-periode'>
              Slett
            </Fareknapp>
          </div>
        )}
      </div>
    </div>
  );
};

export default KravPeriode;
