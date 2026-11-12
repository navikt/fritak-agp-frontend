import { differenceInCalendarDays, format, isValid } from 'date-fns';

import React, { useEffect } from 'react';
import getGrunnbeloep from '../../../api/grunnbelop/getGrunnbeloep';
import type { KravPeriodeData } from '../../../state/KravPeriodeData';
import './KravPeriode.scss';
import { useTranslation } from 'react-i18next';
import LangKey from '../../../locale/LangKey';
import { MIN_KRONISK_DATO } from '../../../config/konstanter';
import { Button, ErrorMessage, HelpText, TextField } from '@navikt/ds-react';
import Oversettelse from '../Oversettelse/Oversettelse';
import Datovelger from '../../datovelger/Datovelger';
import TextLabel from '../../TextLabel';
import stringishToNumber from '../../../utils/stringishToNumber';
import { formatApiDate, type DateInputError } from '../../../utils/dato/Dato';
import textify from '../../../utils/textify';
import { TrashIcon } from '@navikt/aksel-icons';

interface KravPeriodeProps {
  enkeltPeriode: KravPeriodeData;
  index: number;
  lonnspliktDager: number | undefined;
  slettbar: boolean;
  minDate?: Date;
  onFraChange: (fra: Date | undefined, inputError?: DateInputError) => void;
  onTilChange: (til: Date | undefined, inputError?: DateInputError) => void;
  onDagerChange: (dager: number | undefined) => void;
  onBeloepChange: (beloep: number | undefined) => void;
  onSykemeldingsgradChange: (sykemeldingsgrad: string) => void;
  onGrunnbeloepChange: (grunnbeloep: number) => void;
  onDelete: () => void;
}

const KravPeriode = (props: KravPeriodeProps) => {
  const { t } = useTranslation();

  const fraDatoValgt = (fraDato: Date | undefined, inputError?: DateInputError) => {
    if (fraDato) {
      void getGrunnbeloep(format(fraDato, 'yyyy-MM-dd')).then((grunnbeloepRespons) => {
        if (grunnbeloepRespons.grunnbeloep) {
          props.onGrunnbeloepChange(grunnbeloepRespons.grunnbeloep.grunnbeloep);
        }
      });
    }
    props.onFraChange(fraDato, inputError);
    props.onDagerChange(fraDato && defaultTom ? differenceInCalendarDays(defaultTom, fraDato) + 1 : undefined);
  };

  const tilDatoValgt = (tilDato: Date | undefined, inputError?: DateInputError) => {
    props.onTilChange(tilDato, inputError);
    props.onDagerChange(defaultFom && tilDato ? differenceInCalendarDays(tilDato, defaultFom) + 1 : undefined);
  };

  const today = new Date();

  const defaultFom = props.enkeltPeriode.fom && isValid(props.enkeltPeriode.fom) ? props.enkeltPeriode.fom : undefined;
  const defaultTom = props.enkeltPeriode.tom && isValid(props.enkeltPeriode.tom) ? props.enkeltPeriode.tom : undefined;
  const defaultSykemeldingsgrad = props.enkeltPeriode.sykemeldingsgrad
    ? stringishToNumber(props.enkeltPeriode.sykemeldingsgrad)
    : '';

  useEffect(() => {
    if (defaultFom) {
      void getGrunnbeloep(formatApiDate(defaultFom)).then((grunnbeloepRespons) => {
        if (grunnbeloepRespons.grunnbeloep) {
          props.onGrunnbeloepChange(grunnbeloepRespons.grunnbeloep.grunnbeloep);
        }
      });
    }
  }, []);

  return (
    <div className='krav-kort' data-testid='krav-periode-wrapper'>
      <Datovelger
        id={`fra-dato-${props.index}`}
        label={<div className='label-uten-hjelp'>{t(LangKey.KRONISK_KRAV_PERIODE_FRA)}</div>}
        onDateChange={fraDatoValgt}
        error={props.enkeltPeriode.fomError}
        toDate={today}
        fromDate={props.minDate ?? MIN_KRONISK_DATO}
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
            Sykmeldings&shy;grad
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
      {props.slettbar && (
        <div className='slett-periode-wrapper'>
          <Button
            data-color='danger'
            variant='tertiary'
            onClick={() => props.onDelete()}
            icon={<TrashIcon aria-hidden />}
          >
            Slett
          </Button>
        </div>
      )}
      {props.enkeltPeriode.dagerError && (
        <ErrorMessage as='div' id={`dager-${props.index}`} tabIndex={-1}>
          {props.enkeltPeriode.dagerError}
        </ErrorMessage>
      )}
    </div>
  );
};

export default KravPeriode;
