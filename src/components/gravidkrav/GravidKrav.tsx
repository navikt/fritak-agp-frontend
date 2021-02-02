import React, { useEffect, useReducer } from 'react';
import { EtikettLiten, Ingress, Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import SideIndentering from '../SideIndentering';
import Skillelinje from '../Skillelinje';
import Fnr from '../Fnr';
import { Input, Label, SkjemaGruppe } from 'nav-frontend-skjema';
import Upload from '../Upload';
import { Hovedknapp } from 'nav-frontend-knapper';
import LoggetUtAdvarsel from '../login/LoggetUtAdvarsel';
import { DatoVelger } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Link } from 'react-router-dom';
import lenker from '../lenker';
import './GravidKrav.scss';
import '../felles/FellesStyling.scss';
import '@navikt/helse-arbeidsgiver-felles-frontend/src/components/DatoVelger.css';
import Tekstomrade, { BoldRule, ParagraphRule } from 'nav-frontend-tekstomrade';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import GravidKravProps from './GravidKravProps';
import GravidKravReducer from './GravidKravReducer';
import { defaultGravidKravState } from './GravidKravState';
import { Actions } from './Actions';
import getBase64file from '../../utils/getBase64File';
import postGravidKrav from '../../api/gravidkrav/postGravidKrav';
import environment from '../../environment';
import { mapGravidKravRequest } from '../../api/gravidkrav/mapGravidKravRequest';
import SelectDager from './SelectDager';
import Feilmeldingspanel from '../felles/Feilmeldingspanel';
import BekreftOpplysningerPanel from '../felles/BekreftOpplysningerPanel';

export const GravidKrav = (props: GravidKravProps) => {
  const [state, dispatch] = useReducer(GravidKravReducer, props.state, defaultGravidKravState);

  const handleLoggedoutModalClosing = () => {
    dispatch({ type: Actions.CloseLoggedoutModal });
  };

  const handleUploadChanged = (file?: File) => {
    if (file) {
      getBase64file(file).then((base64encoded: any) => {
        dispatch({
          type: Actions.Dokumentasjon,
          payload: {
            dokumentasjon: base64encoded
          }
        });
      });
    }
  };
  const handleDelete = () => {
    dispatch({
      type: Actions.Dokumentasjon,
      payload: {
        dokumentasjon: undefined
      }
    });
  };

  const handleSubmitClicked = async () => {
    dispatch({ type: Actions.Validate });
  };

  useEffect(() => {
    if (state.validated === true && state.progress === true && state.submitting === true) {
      postGravidKrav(
        environment.baseUrl,
        mapGravidKravRequest(
          state.fnr,
          state.orgnr,
          state.fra,
          state.til,
          state.dager,
          state.beloep,
          state.dokumentasjon,
          state.bekreft
        )
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
    state.fra,
    state.til,
    state.dager,
    state.beloep,
    state.fnr,
    state.bekreft,
    state.dokumentasjon,
    state.orgnr
  ]);

  return (
    <Row className='gravidkrav'>
      <Column>
        <Panel className='panel--heading'>
          <EtikettLiten>GRAVID ANSATT</EtikettLiten>
          <Innholdstittel>Krav om refusjon av sykepenger i arbeidsgiverperioden</Innholdstittel>
        </Panel>
        <SideIndentering>
          <Panel>
            <Ingress className='textfelt-padding-bottom'>
              Har dere søkt om at <Link to={lenker.Gravid}>NAV dekker sykepenger i arbeidsgiverperioden</Link>, sender
              dere krav om refusjon her. Vi anbefaler at dere sender kravet før søknaden er ferdig behandlet, så unngår
              dere at det blir foreldet.
            </Ingress>
            <Ingress>Alle felter må fylles ut om ikke annet er oppgitt</Ingress>
          </Panel>
          <Skillelinje />

          <Panel id='gravidkrav-panel-den-ansatte'>
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

          <Panel id='gravidkrav-panel-tapt-arbeidstid'>
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
              <Row>
                <Column sm='3' xs='6'>
                  <DatoVelger
                    id='fra-dato'
                    label='Fra dato'
                    onChange={(fraDato: Date) => {
                      dispatch({
                        type: Actions.Fra,
                        payload: { fra: fraDato ? fraDato : undefined }
                      });
                    }}
                  ></DatoVelger>
                </Column>
                <Column sm='3' xs='6'>
                  <DatoVelger
                    id='til-dato'
                    label='Til dato'
                    onChange={(tilDate: Date) => {
                      dispatch({
                        type: Actions.Til,
                        payload: { til: tilDate ? tilDate : undefined }
                      });
                    }}
                  ></DatoVelger>
                </Column>
                <Column sm='3' xs='6'>
                  <Label htmlFor='antall-dager'>
                    Antall dager
                    <Hjelpetekst className='krav-padding-hjelpetekst'>
                      Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.
                    </Hjelpetekst>
                  </Label>
                  <SelectDager
                    id='antall-dager'
                    value={state.dager}
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
                  <Label htmlFor='belop'>
                    Beløp
                    <Hjelpetekst className='krav-padding-hjelpetekst'>
                      <Systemtittel>Slik finner dere beløpet dere kan kreve:</Systemtittel>
                      <ul>
                        <li>
                          Merk: Beløpet er før skatt, og det skal være uten feriepenger og arbeidsgiveravgift. Det
                          beregnes feriepenger av det NAV refunderer. Dere får utbetalt refusjonen av feriepengene neste
                          år.
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
                    id='belop'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    placeholder='Kr:'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: Actions.Beloep,
                        payload: {
                          beloep: Number(event.currentTarget.value.replace(',', '.'))
                        }
                      })
                    }
                  />
                </Column>
              </Row>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel>
            <Systemtittel className='textfelt-padding-bottom'>
              Hvis dere har fått dokumentasjon fra den ansatte
            </Systemtittel>
            <Tekstomrade className='textfelt-padding-bottom' rules={[BoldRule, ParagraphRule]}>
              Som arbeidsgiver kan dere ikke kreve å få se helseopplysninger. Men hvis den ansatte allerede har gitt
              dere slik dokumentasjon frivillig, kan dere skanne eller ta bilde av den og laste den opp her. _For tiden
              støtter vi kun filformatet .pdf._
            </Tekstomrade>
            <Tekstomrade>
              NAV vil selv innhente dokumentasjon fra legen hvis det ikke allerede går klart fram av en sykmelding at
              det er svangerskapet som er årsaken til fraværet.
            </Tekstomrade>
            <SkjemaGruppe feil={state.dokumentasjonError} feilmeldingId='dokumentasjon' aria-live='polite'>
              <Upload
                className='knapp-innsending-top'
                id='upload'
                label='LAST OPP LEGEERKLÆRINGEN (valgfritt)'
                extensions='.pdf'
                onChange={handleUploadChanged}
                onDelete={handleDelete}
              />
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <BekreftOpplysningerPanel
            checked={state.bekreft || false}
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
              Send søknad
            </Hovedknapp>
          </Panel>
        </SideIndentering>
      </Column>
      {state.accessDenied && <LoggetUtAdvarsel onClose={handleLoggedoutModalClosing} />}
    </Row>
  );
};

export default GravidKrav;
