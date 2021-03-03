import { DatoVelger } from '@navikt/helse-arbeidsgiver-felles-frontend';
import dayjs from 'dayjs';
import { Column, Row } from 'nav-frontend-grid';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import Lenke from 'nav-frontend-lenker';
import { Input, Label } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import SelectDager from '../felles/SelectDager';
import { Actions } from './Actions';
import { KroniskKravPeriode } from './KroniskKravState';

interface KravPeriodeProps {
  dispatch: any;
  enkeltPeriode: KroniskKravPeriode;
  index: number;
}

const KravPeriode = (props: KravPeriodeProps) => {
  const dispatch = props.dispatch;

  const fjernPeriode = (periode: number): void => {
    dispatch({
      type: Actions.DeletePeriod,
      payload: {
        periode: periode
      }
    });
  };

  const fraDatoValgt = (fraDato: Date, periode: number) => {
    if (fraDato) {
      getGrunnbeloep(dayjs(fraDato).format('YYYY-MM-DD')).then((grunnbeloepRespons) => {
        if (grunnbeloepRespons.grunnbeloep) {
          dispatch({
            type: Actions.Grunnbeloep,
            payload: {
              grunnbeloep: grunnbeloepRespons.grunnbeloep.grunnbeloep
            }
          });
        }
      });
    }
    dispatch({
      type: Actions.Fra,
      payload: {
        fra: fraDato,
        periode: periode
      }
    });
  };

  return (
    <Row className={props.index > 0 ? 'hide-labels periodewrapper' : 'periodewrapper'}>
      <Column sm='3' xs='6'>
        <DatoVelger
          id={`fra-dato-${props.index}`}
          label='Fra dato'
          onChange={(fraDato: Date) => {
            fraDatoValgt(fraDato, props.index);
          }}
          feilmelding={props.enkeltPeriode.fraError}
        />
      </Column>
      <Column sm='3' xs='6'>
        <DatoVelger
          id={`til-dato-${props.index}`}
          label='Til dato'
          onChange={(tilDate: Date) => {
            dispatch({
              type: Actions.Til,
              payload: {
                til: tilDate,
                periode: props.index
              }
            });
          }}
          feilmelding={props.enkeltPeriode.tilError}
        />
      </Column>
      <Column sm='2' xs='6'>
        <Label htmlFor={`dager-${props.index}`}>
          Antall dager
          <Hjelpetekst className='krav-padding-hjelpetekst'>
            Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.
          </Hjelpetekst>
        </Label>
        <SelectDager
          id={`dager-${props.index}`}
          value={props.enkeltPeriode.dager}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: Actions.Dager,
              payload: {
                dager: event.currentTarget.value ? Number(event.currentTarget.value) : undefined,
                periode: props.index
              }
            })
          }
          feil={props.enkeltPeriode.dagerError}
        />
      </Column>
      <Column sm='2' xs='6'>
        <Label htmlFor={`belop-${props.index}`}>
          Beløp
          <Hjelpetekst className='krav-padding-hjelpetekst'>
            <Systemtittel>Slik finner dere beløpet dere kan kreve:</Systemtittel>
            <ul>
              <li>
                Merk: Beløpet er før skatt, og det skal være uten feriepenger og arbeidsgiveravgift. Det beregnes
                feriepenger av det NAV refunderer. Dere får utbetalt refusjonen av feriepengene neste år.
              </li>
              <li>
                Avklar antall dager dere kan kreve refusjon for. Ta kun med dager det skulle vært utbetalt lønn. Helger
                og helligdager kan tas med hvis de er en del av den faste arbeidstiden.
              </li>
              <li>Beregn månedsinntekten slik det ellers gjøres for sykepenger i arbeidsgiverperioden.</li>
              <li>Gang med 12 måneder for å finne årslønnen.</li>
              <li>Reduser beløpet til 6G hvis beløpet er over dette.</li>
              <li>Finn dagsatsen ved å dele årslønnen på antall dager dere utbetaler lønn for i året.</li>
              <li>Gang dagsatsen med antall dager dere krever refusjon for.</li>
            </ul>
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
                beloep: event.currentTarget.value ? Number(event.currentTarget.value.replace(',', '.')) : undefined,
                periode: props.index
              }
            })
          }
          feil={props.enkeltPeriode.beloepError}
        />
      </Column>
      <Column>
        {props.index > 0 && (
          <Lenke href='#' onClick={() => fjernPeriode(props.index)} className='slett-periode'>
            Slett
          </Lenke>
        )}
      </Column>
    </Row>
  );
};

export default KravPeriode;
