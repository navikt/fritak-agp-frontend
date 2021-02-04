import React, { useEffect, useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Checkbox, CheckboxGruppe, Radio, RadioGruppe, SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import Tekstomrade, { BoldRule, ParagraphRule } from 'nav-frontend-tekstomrade';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Skillelinje from '../Skillelinje';
import SoknadTittel from '../SoknadTittel';
import SideIndentering from '../SideIndentering';
import Fnr from '../Fnr';
import Upload from '../Upload';
import './GravidSide.scss';
import '../felles/FellesStyling.scss';
import GravidProgress from './GravidProgress';
import GravidKvittering from './GravidKvittering';
import Lenke from 'nav-frontend-lenker';
import Orgnr from '../Orgnr';
import GravidSideProps from './GravidSideProps';
import getBase64file from '../../utils/getBase64File';
import GravidReducer from './GravidReducer';
import { defaultGravidState } from './GravidState';
import { Actions } from './Actions';
import TiltakCheckboxes from './TiltakCheckboxes';
import OmplasseringCheckboxes from './OmplasseringCheckboxes';
import AarsakCheckboxes from './AarsakCheckboxes';
import { Tiltak } from './Tiltak';
import { Omplassering } from './Omplassering';
import environment from '../../environment';
import postGravid from '../../api/gravid/postGravid';
import { mapGravidRequest } from '../../api/gravid/mapGravidRequest';
import Feilmeldingspanel from '../felles/Feilmeldingspanel';
import BekreftOpplysningerPanel from '../felles/BekreftOpplysningerPanel';
import Side from '../Side';

export const MAX_TILTAK_BESKRIVELSE = 2000;

const GravidSide = (props: GravidSideProps) => {
  const [state, dispatch] = useReducer(GravidReducer, props.state, defaultGravidState);
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
      postGravid(
        environment.baseUrl,
        mapGravidRequest(
          state.fnr,
          state.orgnr,
          state.tilrettelegge,
          state.tiltak,
          state.tiltakBeskrivelse,
          state.omplassering,
          state.omplasseringAarsak,
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
    state.tilrettelegge,
    state.omplassering,
    state.omplasseringAarsak,
    state.tiltak,
    state.tiltakBeskrivelse,
    state.fnr,
    state.bekreft,
    state.dokumentasjon,
    state.orgnr
  ]);
  return (
    <Side>
      <Row className='gravid-side'>
        <Column>
          <SoknadTittel>Søknad om at NAV dekker sykepenger i arbeidsgiverperioden</SoknadTittel>

          {state.progress == true && <GravidProgress />}

          {state.kvittering == true && <GravidKvittering />}

          {state.progress != true && state.kvittering != true && (
            <SideIndentering>
              <Panel>
                <Ingress>
                  NAV kan dekke sykepenger i arbeidsgiverperioden hvis fraværet skyldes helseplager i svangerskapet.
                  Dette gjelder bare hvis tilrettelegging eller omplassering ikke er mulig. Vi bruker opplysninger vi
                  allerede har om sykefraværet, i tillegg til svarene du gir nedenfor. Ordningen er beskrevet i{' '}
                  <Lenke href='https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20'>
                    folketrygdlovens § 8-20
                  </Lenke>
                  .
                  <br />
                  <br />
                  Alle felter må fylles ut om ikke annet er oppgitt
                </Ingress>
              </Panel>

              <Skillelinje />

              <Panel id='gravidside-panel-ansatte' className='gravidside-panel-ansatte'>
                <SkjemaGruppe aria-live='polite'>
                  <Row>
                    <Column sm='4' xs='6'>
                      <Systemtittel>Den ansatte</Systemtittel>
                      <br />
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
                    <Column sm='4' xs='6'>
                      <Systemtittel>Arbeidsgiveren</Systemtittel>
                      <br />
                      <Orgnr
                        label='Organisasjonsnummer'
                        orgnr={state.orgnr}
                        placeholder='9 siffer'
                        feilmelding={state.orgnrError}
                        onChange={(orgnr: string) =>
                          dispatch({
                            type: Actions.Orgnr,
                            payload: { orgnr: orgnr }
                          })
                        }
                      />
                    </Column>
                  </Row>
                </SkjemaGruppe>
              </Panel>

              <Skillelinje />

              <Panel className='gravidside-panel-arbeidssituasjon'>
                <Row>
                  <Column sm='8' xs='12'>
                    <Systemtittel>Arbeidssituasjon og miljø</Systemtittel>
                    <br />
                    <SkjemaGruppe>
                      <Normaltekst>Vi spør først om dere har forsøkt å løse situasjonen på arbeidsplassen.</Normaltekst>
                      <Normaltekst>Svaret deres brukes i to forskjellige vurderinger:</Normaltekst>

                      <ul className='gravidside-tett-liste typo-normal'>
                        <li>om vi kan hjelpe til med noe, slik at den ansatte kan stå i jobben</li>
                        <li>om vi skal dekke sykepenger i arbeidsgiverperioden</li>
                      </ul>

                      <RadioGruppe
                        legend='Har dere prøvd å tilrettelegge arbeidsdagen slik at den gravide kan jobbe til tross for helseplagene?'
                        className='gravidside-radiogruppe-tilrettelegging'
                      >
                        <Radio
                          label='Ja'
                          name='sitteplass'
                          value='ja'
                          defaultChecked={state.tilrettelegge === true}
                          onClick={() =>
                            dispatch({
                              type: Actions.Tilrettelegge,
                              payload: { tilrettelegge: true }
                            })
                          }
                        />
                        <Radio
                          label='Nei'
                          name='sitteplass'
                          value='nei'
                          defaultChecked={state.tilrettelegge === false}
                          onClick={() =>
                            dispatch({
                              type: Actions.Tilrettelegge,
                              payload: { tilrettelegge: false }
                            })
                          }
                        />
                      </RadioGruppe>
                    </SkjemaGruppe>
                  </Column>
                </Row>
              </Panel>

              {state.tilrettelegge === true ? (
                <Panel className='gravidside-panel-tiltak'>
                  <Row>
                    <Column sm='8' xs='12'>
                      <CheckboxGruppe
                        legend='Hvilke tiltak har dere forsøkt eller vurdert for at den ansatte kan jobbe?'
                        feil={state.tiltakError}
                        feilmeldingId='tiltakFeilmeldingId'
                      >
                        {TiltakCheckboxes.map((a) => {
                          return (
                            <Checkbox
                              key={a.id}
                              label={a.label}
                              value={a.value}
                              id={a.id}
                              onChange={(evt) =>
                                dispatch({
                                  type: Actions.ToggleTiltak,
                                  payload: { tiltak: a.value }
                                })
                              }
                              checked={state.tiltak?.includes(a.value)}
                            />
                          );
                        })}

                        <Textarea
                          className='textarea-min-hoyde'
                          value={state.tiltakBeskrivelse || ''}
                          feil={state.tiltakBeskrivelseError}
                          onChange={(evt) =>
                            dispatch({
                              type: Actions.TiltakBeskrivelse,
                              payload: {
                                tiltakBeskrivelse: evt.currentTarget.value
                              }
                            })
                          }
                          disabled={!state?.tiltak?.includes(Tiltak.ANNET)}
                          maxLength={MAX_TILTAK_BESKRIVELSE}
                        />
                      </CheckboxGruppe>
                    </Column>
                  </Row>
                  <SkjemaGruppe feil={state.omplasseringError} feilmeldingId='omplasseringFeilmeldingId'>
                    <div className='gravid-side-radiogruppe-omplassering'>
                      <RadioGruppe legend='Har dere forsøkt omplassering til en annen jobb?'>
                        {OmplasseringCheckboxes.map((a) => {
                          return (
                            <Radio
                              key={a.value}
                              label={a.label}
                              name='omplassering'
                              onChange={() =>
                                dispatch({
                                  type: Actions.OmplasseringForsoek,
                                  payload: { omplasseringForsoek: a.value }
                                })
                              }
                              checked={state.omplassering === a.value}
                            />
                          );
                        })}

                        <RadioGruppe className='gravideside-radiogruppe-indentert'>
                          {AarsakCheckboxes.map((a) => {
                            return (
                              <Radio
                                key={a.value}
                                label={a.label}
                                name='omplassering-umulig'
                                onChange={() =>
                                  dispatch({
                                    type: Actions.OmplasseringAarsak,
                                    payload: { omplasseringAarsak: a.value }
                                  })
                                }
                                disabled={state.omplassering !== Omplassering.IKKE_MULIG}
                                checked={state.omplasseringAarsak === a.value}
                              />
                            );
                          })}
                        </RadioGruppe>
                      </RadioGruppe>
                    </div>
                  </SkjemaGruppe>
                </Panel>
              ) : (
                state.tilrettelegge === false && (
                  <>
                    <Skillelinje />
                    <Panel className='gravidside-panel-alert-gravid'>
                      <Alertstripe className='gravidside-alert-gravid' type='advarsel'>
                        <Normaltekst>
                          Dere må først ha prøvd å tilrettelegge for den gravide. Dere kan
                          <button
                            className='lenke gravidside-lenke-knapp'
                            onClick={() =>
                              dispatch({
                                type: Actions.Videre,
                                payload: { videre: true }
                              })
                            }
                          >
                            gå videre med søknaden
                          </button>
                          , men det er altså da sannsynlig at den blir avslått.
                        </Normaltekst>
                      </Alertstripe>
                    </Panel>
                  </>
                )
              )}

              {(state.tilrettelegge === true || state.videre) && (
                <>
                  <Skillelinje />

                  <Panel>
                    <Systemtittel>Hvis dere har fått dokumentasjon fra den ansatte</Systemtittel>
                    <br />
                    <SkjemaGruppe
                      feil={state.dokumentasjonError}
                      feilmeldingId='dokumentasjonFeilmeldingId'
                      aria-live='polite'
                    >
                      <Tekstomrade className='textfelt-padding-bottom' rules={[BoldRule, ParagraphRule]}>
                        Som arbeidsgiver kan dere ikke kreve å få se helseopplysninger. Men hvis den ansatte allerede
                        har gitt dere slik dokumentasjon frivillig, kan dere skanne eller ta bilde av den og laste den
                        opp her. _For tiden støtter vi kun filformatet .pdf._
                      </Tekstomrade>
                      <Normaltekst>
                        NAV vil selv innhente dokumentasjon fra legen hvis det ikke allerede går klart fram av en
                        sykmelding at det er svangerskapet som er årsaken til fraværet.
                      </Normaltekst>
                      <Upload
                        className='knapp-innsending-top'
                        id='upload'
                        label='Last opp dokumentasjon (valgfritt)'
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
                    <Hovedknapp onClick={handleSubmitClicked}>Send søknad</Hovedknapp>
                  </Panel>
                </>
              )}
            </SideIndentering>
          )}
        </Column>
      </Row>
    </Side>
  );
};

export default GravidSide;
