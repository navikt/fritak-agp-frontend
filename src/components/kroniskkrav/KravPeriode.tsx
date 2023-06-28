import dayjs from 'dayjs';

import React, { useEffect } from 'react';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import SelectDager from '../felles/SelectDager/SelectDager';
import { Delperiode, KroniskKravPeriode } from './KroniskKravState';
import './KravPeriode.scss';
import { useTranslation } from 'react-i18next';
import LangKey from '../../locale/LangKey';
import beregnRefusjon from './beregnRefusjon';
import { MIN_KRONISK_DATO } from '../../config/konstanter';
import { Button, ErrorMessage, HelpText, TextField } from '@navikt/ds-react';
import '@navikt/ds-css';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import Datovelger from '../datovelger/Datovelger';
import TextLabel from '../TextLabel';
import stringishToNumber from '../../utils/stringishToNumber';
import textify from '../../utils/textify';
import LeggTilKnapp from '../felles/LeggTilKnapp/LeggTilKnapp';
import ButtonSlette from '../felles/ButtonSlette';
import antallDagerIArbeidsgiverperiode from '../../utils/antallDagerIArbeidsgiverperiode';
import formatISO from '../../utils/formatISO';

interface KravPeriodeProps {
  dispatch: any;
  enkeltPeriode: KroniskKravPeriode;
  index: number;
  lonnspliktDager: number | undefined;
  slettbar: boolean;
  Actions: any;
  id: string;
}

const KravPeriode = (props: KravPeriodeProps) => {
  const { t } = useTranslation();
  const dispatch = props.dispatch;

  const Actions = props.Actions;
  const fjernPeriode = (itemId: string): void => {
    dispatch({
      type: Actions.DeletePeriode,
      payload: {
        itemId
      }
    });
  };

  const fraDatoValgt = (fraDato: Date | undefined, itemId: string, periodeItemId: string) => {
    if (fraDato) {
      getGrunnbeloep(dayjs(fraDato).format('YYYY-MM-DD'))
        .then((grunnbelopRespons) => {
          if (grunnbelopRespons.grunnbeloep) {
            dispatch({
              type: Actions.Grunnbeloep,
              payload: {
                grunnbeloep: grunnbelopRespons.grunnbeloep.grunnbeloep,
                itemId: itemId
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    dispatch({
      type: Actions.Fra,
      payload: {
        fra: fraDato,
        itemId: periodeItemId
      }
    });
  };

  const beregnetRefusjon = beregnRefusjon(props.enkeltPeriode, props.lonnspliktDager).toLocaleString('nb-NO');

  const today = new Date();

  const defaultSykemeldingsgrad = props.enkeltPeriode.sykemeldingsgrad
    ? stringishToNumber(props.enkeltPeriode.sykemeldingsgrad)
    : '';

  useEffect(() => {
    if (harFom(props.enkeltPeriode.perioder)) {
      getGrunnbeloep(formatISO(minimumFom(props.enkeltPeriode.perioder)))
        .then((grunnbelopRespons) => {
          if (grunnbelopRespons.grunnbeloep) {
            dispatch({
              type: Actions.Grunnbeloep,
              payload: {
                grunnbeloep: grunnbelopRespons.grunnbeloep.grunnbeloep,
                itemId: props.enkeltPeriode.uniqueKey
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []); // eslint-disable-line

  const kanSlettes = props.enkeltPeriode.perioder.length > 1;

  const dagerIPerioden = antallDagerIArbeidsgiverperiode(props.enkeltPeriode.perioder);

  return (
    <div className='krav-periode-wrapper' data-testid='krav-periode-wrapper' id={props.id}>
      {props.enkeltPeriode.perioder.map((periode, index) => (
        <>
          <div className='krav-kort-dato' key={periode.uniqueKey}>
            <Datovelger
              id={`fra-dato-${props.index}-${index}`}
              label={<div className='label-uten-hjelp'>{t(LangKey.KRONISK_KRAV_PERIODE_FRA)}</div>}
              onDateChange={(fraDato: Date | undefined) => {
                fraDatoValgt(fraDato, props.enkeltPeriode.uniqueKey, periode.uniqueKey);
              }}
              error={periode.fomError}
              toDate={today}
              fromDate={MIN_KRONISK_DATO}
              defaultSelected={periode.fom}
              onValidate={(val) =>
                dispatch({
                  type: Actions.FraValidering,
                  payload: {
                    validering: val,
                    itemId: props.enkeltPeriode.uniqueKey
                  }
                })
              }
            />

            <Datovelger
              id={`til-dato-${props.index}-${index}`}
              label={<div className='label-uten-hjelp'>{t(LangKey.KRONISK_KRAV_PERIODE_TIL)}</div>}
              onDateChange={(tilDate: Date | undefined) => {
                dispatch({
                  type: Actions.Til,
                  payload: {
                    til: tilDate,
                    itemId: periode.uniqueKey
                  }
                });
              }}
              error={periode.tomError}
              toDate={today}
              defaultSelected={periode.tom}
              onValidate={(val) =>
                dispatch({
                  type: Actions.TilValidering,
                  payload: {
                    validering: val,
                    itemId: props.enkeltPeriode.uniqueKey
                  }
                })
              }
            />
            {!kanSlettes && dagerIPerioden > 16 && index + 1 === props.enkeltPeriode.perioder.length && (
              <ErrorMessage className='dagesvarsel'>
                Arbeidsgiverperioden kan maksimalt være 16 dager. Det er oppgitt {dagerIPerioden} dager
              </ErrorMessage>
            )}
            {kanSlettes && (
              <ButtonSlette
                title='Slett periode'
                className='periode-button-slette'
                onClick={() =>
                  dispatch({
                    type: Actions.SlettDelperiode,
                    payload: {
                      itemId: periode.uniqueKey
                    }
                  })
                }
              />
            )}
          </div>
          {kanSlettes && dagerIPerioden > 16 && index + 1 === props.enkeltPeriode.perioder.length && (
            <div className='kort-feilmelding-oppsumering'>
              <ErrorMessage>
                Arbeidsgiverperioden kan maksimalt være 16 dager. Det er oppgitt {dagerIPerioden} dager
              </ErrorMessage>
            </div>
          )}
        </>
      ))}
      <LeggTilKnapp
        onClick={() =>
          dispatch({
            type: Actions.AddDelperiode,
            payload: {
              itemId: props.enkeltPeriode.uniqueKey
            }
          })
        }
        className='legg-til-kronis-periode'
      >
        + Legg til ny rad
      </LeggTilKnapp>
      <div className='krav-kort'>
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
          className='periode-elementer antall-dager'
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
          id={`sykemeldingsgrad-${props.index}`}
          className='sykmeldingsgrad'
          label={
            <div className='label-med-hjelp'>
              Sykemeldingsgrad
              <HelpText className='krav-padding-hjelpetekst' title='Gradert sykmelding'>
                <TextLabel>Gradert sykmelding</TextLabel>
                Sykmeldingsgrad, minimum 20%
              </HelpText>
            </div>
          }
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
          error={props.enkeltPeriode.sykemeldingsgradError}
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
          <div className='skjemalelement tekstvisning beregnet-refusjon'>
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
    </div>
  );
};

export default KravPeriode;

function harFom(perioder) {
  if (!perioder || perioder.length === 0) {
    return false;
  }
  return !!perioder.find((periode) => {
    return periode.fom?.year;
  });
}

function minimumFom(perioder: Array<Delperiode>): Date {
  let minimumFomVerdi: Date = new Date();

  perioder.forEach((periode) => {
    const fom = periode.fom ? periode.fom : minimumFomVerdi;
    minimumFomVerdi = fom < minimumFomVerdi ? fom : minimumFomVerdi;
  });

  return minimumFomVerdi;
}
