import React, { useEffect, useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import {
  BekreftCheckboksPanel,
  Checkbox,
  CheckboxGruppe,
  Feiloppsummering,
  Radio,
  RadioGruppe,
  SkjemaGruppe,
  Textarea
} from 'nav-frontend-skjema';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Skillelinje from '../Skillelinje';
import SoknadTittel from '../SoknadTittel';
import SideIndentering from '../SideIndentering';
import Fnr from '../Fnr';
import Upload from '../Upload';
import './GravidSide.scss';
import GravidProgress from './GravidProgress';
import GravidKvittering from './GravidKvittering';
import GravidFeil from './GravidFeil';
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

const GravidSide = (props: GravidSideProps) => {
  const [state, dispatch] = useReducer(
    GravidReducer,
    props.state,
    defaultGravidState
  );
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
        dokumentasjon: ''
      }
    });
  };
  const handleSubmitClicked = async () => {
    dispatch({ type: Actions.Validate });
  };
  useEffect(() => {
    if (
      state.validated === true &&
      state.progress === true &&
      state.submitting === true
    ) {
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
    <Row>
      <Column>
        <SoknadTittel>
          Søknad om at NAV dekker sykepenger i arbeidsgiverperioden
        </SoknadTittel>

        {state.progress == true && <GravidProgress />}

        {state.kvittering == true && <GravidKvittering />}

        {state.error == true && <GravidFeil />}

        {state.progress != true && state.kvittering != true && (
          <SideIndentering>
            <Panel>
              <Ingress>
                NAV kan dekke sykepenger i arbeidsgiverperioden hvis fraværet
                skyldes helseplager i svangerskapet. Dette gjelder bare hvis
                tilrettelegging eller omplassering ikke er mulig. Vi bruker
                opplysninger vi allerede har om sykefraværet, i tillegg til
                svarene du gir nedenfor. Ordningen er beskrevet i{' '}
                <Lenke href='https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20'>
                  folketrygdlovens § 8-20
                </Lenke>
                .
                <br />
              </Ingress>
            </Panel>
            <Skillelinje />
            <Panel>
              <Undertittel tag='span'>
                Alle felter må fylles ut om ikke annet er oppgitt
              </Undertittel>
            </Panel>
            <Skillelinje />

            <Panel id='gravidside-panel-ansatte'>
              <SkjemaGruppe legend='Den ansatte' aria-live='polite'>
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
                  <Column sm='4' xs='6'>
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

            <Panel>
              <SkjemaGruppe legend='Arbeidssituasjon og miljø'>
                <Normaltekst>
                  Vi spør først om dere har forsøkt å løse situasjonen på
                  arbeidsplassen.
                </Normaltekst>
                <Normaltekst>
                  Svaret deres brukes i to forskjellige vurderinger:
                </Normaltekst>

                <ul className='gravidside-tett-liste'>
                  <li>
                    om vi kan hjelpe til med noe, slik at den ansatte kan stå i
                    jobben
                  </li>
                  <li>om vi skal dekke sykepenger i arbeidsgiverperioden</li>
                </ul>

                <RadioGruppe legend='Har dere prøvd å tilrettelegge arbeidsdagen slik at den gravide kan jobbe til tross for helseplagene?'>
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

              {state.tilrettelegge === true ? (
                <>
                  <CheckboxGruppe
                    legend='Hvilke tiltak er forsøkt/vurdert for at arbeidstaker skal kunne være i arbeid i svangerskapet?'
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
                    />
                  </CheckboxGruppe>
                  <SkjemaGruppe
                    feil={state.omplasseringError}
                    feilmeldingId='omplasseringFeilmeldingId'
                  >
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
                                disabled={
                                  state.omplassering !== Omplassering.IKKE_MULIG
                                }
                                checked={state.omplasseringAarsak === a.value}
                              />
                            );
                          })}
                        </RadioGruppe>
                      </RadioGruppe>
                    </div>
                  </SkjemaGruppe>
                </>
              ) : (
                state.tilrettelegge === false && (
                  <>
                    <Skillelinje />
                    <Alertstripe
                      className='gravidside-alert-gravid'
                      type='advarsel'
                    >
                      <Normaltekst>
                        Dere må først ha prøvd å tilrettelegge for den gravide.
                        Dere kan
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
                  </>
                )
              )}
            </Panel>

            {(state.tilrettelegge === true || state.videre) && (
              <>
                <Skillelinje />

                <Panel>
                  <SkjemaGruppe
                    legend='Hvis dere har fått dokumentasjon fra den ansatte'
                    feil={state.dokumentasjonError}
                    feilmeldingId='dokumentasjonFeilmeldingId'
                    aria-live='polite'
                  >
                    <Normaltekst>
                      Som arbeidsgiver kan dere ikke kreve å få se
                      helseopplysninger. Men hvis den ansatte allerede har gitt
                      dere slik dokumentasjon frivillig, kan dere skanne eller
                      ta bilde av den og laste den opp her. Vi tar kun imot
                      .pdf.
                    </Normaltekst>
                    <br />
                    <Normaltekst>
                      NAV kan også selv innhente dokumentasjon fra legen hvis
                      det ikke allerede går klart fram av en sykmelding at det
                      er svangerskapet som er årsaken til fraværet.
                    </Normaltekst>
                    <Upload
                      id='upload'
                      label='Last opp dokumentasjon'
                      extensions='.pdf'
                      onChange={handleUploadChanged}
                      onDelete={handleDelete}
                      fileSize={250000}
                    />
                  </SkjemaGruppe>
                </Panel>

                <Skillelinje />

                <Panel>
                  <SkjemaGruppe feilmeldingId='bekreftFeilmeldingId'>
                    <BekreftCheckboksPanel
                      label='Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige.'
                      checked={state.bekreft || false}
                      feil={state.bekreftError}
                      onChange={() =>
                        dispatch({
                          type: Actions.Bekreft,
                          payload: { bekreft: !state.bekreft }
                        })
                      }
                    >
                      Jeg vet at NAV kan trekke tilbake retten til å få dekket
                      sykepengene i arbeidsgiverperioden hvis opplysningene ikke
                      er riktige eller fullstendige.
                    </BekreftCheckboksPanel>
                  </SkjemaGruppe>
                </Panel>

                {state.feilmeldinger.length > 0 && (
                  <Panel>
                    <Feiloppsummering
                      tittel='For å gå videre må du rette opp følgende:'
                      feil={state.feilmeldinger}
                    />
                  </Panel>
                )}
                <Panel>
                  <Hovedknapp onClick={handleSubmitClicked}>
                    Send søknad
                  </Hovedknapp>
                </Panel>
              </>
            )}
          </SideIndentering>
        )}
      </Column>
    </Row>
  );
};

export default GravidSide;
