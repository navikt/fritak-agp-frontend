import React, { useEffect, useReducer } from 'react';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import Skillelinje from '../Skillelinje';
import Fnr from '../Fnr';
import { Input, Label, SkjemaGruppe } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import LoggetUtAdvarsel from '../login/LoggetUtAdvarsel';
import { DatoVelger } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Link, Redirect } from 'react-router-dom';
import lenker from '../lenker';
import './KroniskKrav.scss';
import '../felles/FellesStyling.scss';
import '@navikt/helse-arbeidsgiver-felles-frontend/src/components/DatoVelger.css';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import KroniskKravProps from './KroniskKravProps';
import KroniskKravReducer from './KroniskKravReducer';
import { defaultKroniskKravState } from './KroniskKravState';
import { Actions } from './Actions';
import postKroniskKrav from '../../api/kroniskkrav/postKroniskKrav';
import environment from '../../environment';
import { mapKroniskKravRequest } from '../../api/kroniskkrav/mapKroniskKravRequest';
import SelectDager from '../felles/SelectDager';
import Feilmeldingspanel from '../felles/Feilmeldingspanel';
import BekreftOpplysningerPanel from '../felles/BekreftOpplysningerPanel';
import Side from '../Side';
import KontrollsporsmaalLonn from '../felles/KontrollsporsmaalLonn';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import dayjs from 'dayjs';
import { useArbeidsgiver } from '../../context/arbeidsgiver/ArbeidsgiverContext';
import Lenke from 'nav-frontend-lenker';

export const KroniskKrav = (props: KroniskKravProps) => {
  const [state, dispatch] = useReducer(KroniskKravReducer, props.state, defaultKroniskKravState);
  const { arbeidsgiverId } = useArbeidsgiver();

  const handleCloseNotAuthorized = () => {
    dispatch({ type: Actions.NotAuthorized });
  };

  const closeKontrollsporsmaalLonn = () => {
    dispatch({ type: Actions.CloseKontrollsporsmaalLonn });
  };

  const closeKontrollsporsmaalLonnDager = (dager: number | undefined) => {
    dispatch({ type: Actions.KontrollDager, payload: { kontrollDager: dager } });
    dispatch({ type: Actions.CloseKontrollsporsmaalLonn });
  };

  const handleSubmitClicked = async () => {
    dispatch({
      type: Actions.Validate
    });
  };

  const leggTilPeriode = () => {
    dispatch({
      type: Actions.AddPeriod
    });
  };

  const fjernPeriode = (periode: number) => {
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
              grunnbeloep: grunnbeloepRespons.grunnbeloep.grunnbeloep,
              periode: periode
            }
          });
        }
      });
    }
    dispatch({
      type: Actions.Fra,
      payload: { fra: fraDato }
    });
  };

  useEffect(() => {
    dispatch({
      type: Actions.Orgnr,
      payload: { orgnr: arbeidsgiverId }
    });
  }, [arbeidsgiverId]);

  useEffect(() => {
    if (
      state.validated === true &&
      state.progress === true &&
      state.submitting === true &&
      state.isOpenKontrollsporsmaalLonn === false
    ) {
      postKroniskKrav(
        environment.baseUrl,
        mapKroniskKravRequest(state.fnr, state.orgnr, state.periode, state.bekreft, state.kontrollDager)
      ).then((response) => {
        dispatch({
          type: Actions.HandleResponse,
          payload: { response: response }
        });
      });
    }
  }, [
    state.validated,
    state.progress,
    state.feilmeldinger,
    state.submitting,
    state.periode,
    state.fnr,
    state.bekreft,
    state.orgnr,
    state.isOpenKontrollsporsmaalLonn
  ]);

  if (!!state.kvittering) {
    return <Redirect to={lenker.KroniskKravKvittering} />;
  }

  return (
    <Side
      bedriftsmeny={true}
      className='kroniskkrav'
      sidetittel='Kravskjema'
      title='Krav om refusjon av sykepenger i arbeidsgiverperioden'
      subtitle='KRONISK ELLER LANGVARIG SYK ANSATT'
    >
      <Row>
        <Column>
          <Panel>
            <Ingress className='textfelt-padding-bottom'>
              Dersom dere allerede har søkt om{' '}
              <Link to={lenker.Gravid}>at NAV skal dekke sykepenger i arbeidsgiverperioden</Link>
              kan dere rette krav om refusjon via dette skjemaet. Vi anbefaler å gjøre dette uten å vente på
              godkjennelse av søknaden, for å potensielt unngå foreldelse av kravet.
            </Ingress>
            <Ingress>Alle felter må fylles ut.</Ingress>
          </Panel>
          <Skillelinje />

          <Panel id='kroniskkrav-panel-den-ansatte'>
            <Systemtittel className='textfelt-padding-bottom'>Den ansatte</Systemtittel>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'ansatt'}>
              <Row>
                <Column sm='4' xs='6'>
                  <Fnr
                    label='Fødselsnummer (11 siffer)'
                    fnr={state.fnr}
                    placeholder='11 siffer'
                    feilmelding={state.fnrError}
                    onValidate={() => {}}
                    onChange={(fnr: string) =>
                      dispatch({
                        type: Actions.Fnr,
                        payload: { fnr: fnr }
                      })
                    }
                  />
                </Column>
              </Row>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel id='kroniskkrav-panel-tapt-arbeidstid'>
            <Systemtittel className='textfelt-padding-bottom'>Tapt arbeidstid</Systemtittel>
            <Ingress tag='span' className='textfelt-padding-bottom'>
              Hvilken periode var den ansatte borte?
              <Hjelpetekst className='krav-padding-hjelpetekst'>
                <ul>
                  <li>Fra og med første til og med siste fraværsdag i arbeidsgiverperioden.</li>
                  <li>
                    Du må velge <strong>både</strong> første og siste dag. Er fraværet bare på én dag, velger du samme
                    dag to ganger.
                  </li>
                </ul>
              </Hjelpetekst>
            </Ingress>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'arbeidsperiode'}>
              {state.periode?.map((enkeltPeriode, index) => (
                <Row
                  key={
                    (enkeltPeriode.fra?.value ?? index.toString()) +
                    (enkeltPeriode.til?.value ?? index.toString()) +
                    (enkeltPeriode.beloep ?? index.toString())
                  }
                  className={index > 0 ? 'hide-labels' : ''}
                >
                  <Column sm='3' xs='6'>
                    <DatoVelger
                      id={`fra-dato-${index}`}
                      label='Fra dato'
                      onChange={(fraDato: Date) => {
                        fraDatoValgt(fraDato, index);
                      }}
                    />
                  </Column>
                  <Column sm='3' xs='6'>
                    <DatoVelger
                      id={`til-dato-${index}`}
                      label='Til dato'
                      onChange={(tilDate: Date) => {
                        dispatch({
                          type: Actions.Til,
                          payload: {
                            til: tilDate,
                            periode: index
                          }
                        });
                      }}
                    />
                  </Column>
                  <Column sm='3' xs='6'>
                    <Label htmlFor={`dager-${index}`}>
                      Antall dager
                      <Hjelpetekst className='krav-padding-hjelpetekst'>
                        Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.
                      </Hjelpetekst>
                    </Label>
                    <SelectDager
                      id={`dager-${index}`}
                      value={state.periode && state.periode[index].dager}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: Actions.Dager,
                          payload: {
                            dager: Number(event.currentTarget.value)
                          }
                        })
                      }
                    />
                  </Column>
                  <Column sm='3' xs='6'>
                    <Label htmlFor={`belop-${index}`}>
                      Beløp
                      <Hjelpetekst className='krav-padding-hjelpetekst'>
                        <Systemtittel>Slik finner dere beløpet dere kan kreve:</Systemtittel>
                        <ul>
                          <li>
                            Merk: Beløpet er før skatt, og det skal være uten feriepenger og arbeidsgiveravgift. Det
                            beregnes feriepenger av det NAV refunderer. Dere får utbetalt refusjonen av feriepengene
                            neste år.
                          </li>
                          <li>
                            Avklar antall dager dere kan kreve refusjon for. Ta kun med dager det skulle vært utbetalt
                            lønn. Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.
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
                      id={`belop-${index}`}
                      inputMode='numeric'
                      pattern='[0-9]*'
                      placeholder='Kr:'
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: Actions.Beloep,
                          payload: {
                            beloep: Number(event.currentTarget.value.replace(',', '.')),
                            periode: index
                          }
                        })
                      }
                    />
                  </Column>
                </Row>
              ))}
            </SkjemaGruppe>
          </Panel>
          <Lenke href='#' onClick={leggTilPeriode}>
            + Legg til en fraværsperiode
          </Lenke>
          <Skillelinje />

          <BekreftOpplysningerPanel
            checked={!!state.bekreft}
            feil={state.bekreftError}
            onChange={() =>
              dispatch({
                type: Actions.Bekreft,
                payload: { bekreft: !state.bekreft }
              })
            }
          />

          <Feilmeldingspanel feilmeldinger={state.feilmeldinger} />

          <Panel>
            <Hovedknapp onClick={handleSubmitClicked} spinner={state.progress}>
              Send kravet
            </Hovedknapp>
          </Panel>
        </Column>
        {state.notAuthorized && <LoggetUtAdvarsel onClose={handleCloseNotAuthorized} />}
      </Row>
      <KontrollsporsmaalLonn
        onClose={closeKontrollsporsmaalLonnDager}
        isOpen={state.isOpenKontrollsporsmaalLonn}
        onCancelClick={closeKontrollsporsmaalLonn}
      />
    </Side>
  );
};

export default KroniskKrav;
