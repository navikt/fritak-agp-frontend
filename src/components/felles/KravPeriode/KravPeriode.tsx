import { differenceInCalendarDays, format, parseISO } from 'date-fns';

import React, { useEffect, useState } from 'react';
import getGrunnbeloep from '../../../api/grunnbelop/getGrunnbeloep';
import SelectDager from '../SelectDager/SelectDager';
import type { KravPeriodeData } from '../../../state/KravPeriodeData';
import './KravPeriode.scss';
import { useTranslation } from 'react-i18next';
import LangKey from '../../../locale/LangKey';
import beregnRefusjon from './beregnRefusjon';
import { MIN_KRONISK_DATO } from '../../../config/konstanter';
import { Button, ErrorMessage, HelpText, TextField } from '@navikt/ds-react';
import Oversettelse from '../Oversettelse/Oversettelse';
import Datovelger from '../../datovelger/Datovelger';
import TextLabel from '../../TextLabel';
import stringishToNumber from '../../../utils/stringishToNumber';
import { datoToString } from '../../../utils/dato/Dato';
import textify from '../../../utils/textify';
import { TrashIcon } from '@navikt/aksel-icons';

interface KravPeriodeProps {
  enkeltPeriode: KravPeriodeData;
  index: number;
  lonnspliktDager: number | undefined;
  slettbar: boolean;
  onFraChange: (fra: Date | undefined) => void;
  onTilChange: (til: Date | undefined) => void;
  onDagerChange: (dager: number | undefined) => void;
  onBeloepChange: (beloep: number | undefined) => void;
  onSykemeldingsgradChange: (sykemeldingsgrad: string) => void;
  onGrunnbeloepChange: (grunnbeloep: number) => void;
  onDelete: () => void;
}

const KravPeriode = (props: KravPeriodeProps) => {
  const { t } = useTranslation();

  const [startDato, setStartDato] = useState<Date | undefined>(undefined);
  const [sluttDato, setSluttDato] = useState<Date | undefined>(undefined);

  const fraDatoValgt = (fraDato: Date | undefined) => {
    if (fraDato) {
      void getGrunnbeloep(format(fraDato, 'yyyy-MM-dd')).then((grunnbeloepRespons) => {
        if (grunnbeloepRespons.grunnbeloep) {
          props.onGrunnbeloepChange(grunnbeloepRespons.grunnbeloep.grunnbeloep);
        }
      });
    }
    setStartDato(fraDato);
    props.onFraChange(fraDato);
  };

  const tilDatoValgt = (tilDato: Date | undefined) => {
    setSluttDato(tilDato);
    props.onTilChange(tilDato);
  };

  // const beregnetRefusjon = beregnRefusjon(props.enkeltPeriode, props.lonnspliktDager).toLocaleString('nb-NO');

  const today = new Date();

  const defaultFom = props.enkeltPeriode.fom?.year ? parseISO(datoToString(props.enkeltPeriode.fom)) : undefined;
  const defaultTom = props.enkeltPeriode.tom?.year ? parseISO(datoToString(props.enkeltPeriode.tom)) : undefined;
  const defaultSykemeldingsgrad = props.enkeltPeriode.sykemeldingsgrad
    ? stringishToNumber(props.enkeltPeriode.sykemeldingsgrad)
    : '';

  useEffect(() => {
    if (props.enkeltPeriode.fom?.year) {
      void getGrunnbeloep(datoToString(props.enkeltPeriode.fom)).then((grunnbeloepRespons) => {
        if (grunnbeloepRespons.grunnbeloep) {
          props.onGrunnbeloepChange(grunnbeloepRespons.grunnbeloep.grunnbeloep);
        }
      });
    }
  }, []);

  useEffect(() => {
    const dager = startDato && sluttDato ? differenceInCalendarDays(sluttDato, startDato) + 1 : undefined;
    props.onDagerChange(dager);
    console.log('Dager endret:', dager);
  }, [startDato, sluttDato]);

  return (
    <div className='krav-kort' data-testid='krav-periode-wrapper'>
      <Datovelger
        id={`fra-dato-${props.index}`}
        label={<div className='label-uten-hjelp'>{t(LangKey.KRONISK_KRAV_PERIODE_FRA)}</div>}
        onDateChange={fraDatoValgt}
        error={props.enkeltPeriode.fomError}
        toDate={today}
        fromDate={MIN_KRONISK_DATO}
        defaultSelected={defaultFom}
      />
      <Datovelger
        id={`til-dato-${props.index}`}
        label={<div className='label-uten-hjelp'>{t(LangKey.KRONISK_KRAV_PERIODE_TIL)}</div>}
        onDateChange={tilDatoValgt}
        error={props.enkeltPeriode.tomError}
        toDate={today}
        defaultSelected={defaultTom}
      />
      {/* <SelectDager
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
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          props.onDagerChange(stringishToNumber(event.currentTarget.value))
        }
        error={props.enkeltPeriode.dagerError}
      /> */}
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
        defaultValue={props.enkeltPeriode.beloep}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.onBeloepChange(stringishToNumber(event.currentTarget.value))
        }
        error={props.enkeltPeriode.beloepError}
      />
      <TextField
        id={`sykemeldingsgrad-${props.index}`}
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
          props.onSykemeldingsgradChange(event.currentTarget.value)
        }
        error={props.enkeltPeriode.sykemeldingsgradError}
      />
      {/* <div>
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
      </div> */}
      {props.slettbar && (
        <div className='slett-periode-wrapper'>
          <Button
            data-color='danger'
            variant='tertiary'
            onClick={() => props.onDelete()}
            className='slett-periodeeee'
            icon={<TrashIcon title={'Slett'} />}
          >
            Slett
          </Button>
        </div>
      )}
      {props.enkeltPeriode.dagerError && <ErrorMessage as='div'>{props.enkeltPeriode.dagerError}</ErrorMessage>}
    </div>
  );
};

export default KravPeriode;
