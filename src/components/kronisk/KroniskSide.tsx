import React, { useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import {
  BekreftCheckboksPanel,
  Checkbox,
  CheckboxGruppe,
  Feiloppsummering,
  SkjemaGruppe,
  Textarea
} from 'nav-frontend-skjema';
import Skillelinje from '../Skillelinje';
import SoknadTittel from '../SoknadTittel';
import SideIndentering from '../SideIndentering';
import Fnr from '../Fnr';
import Upload from '../Upload';
import './KroniskSide.scss';
import Lenke from 'nav-frontend-lenker';
import Orgnr from '../Orgnr';
import KroniskState, { defaultKroniskState } from './KroniskState';
import KroniskReducer from './KroniskReducer';
import { Actions } from './Actions';
import { ArbeidType } from './ArbeidType';
import { PåkjenningerType } from './PåkjenningerType';
import getBase64file from '../gravid/getBase64File';
import DagerTabell from './DagerTabell';
import { Hovedknapp } from 'nav-frontend-knapper';

const KroniskSide = (props: KroniskState) => {
  const [state, dispatch] = useReducer(KroniskReducer, {}, defaultKroniskState);
  const handleUploadChanged = (file?: File) => {
    if (file) {
      getBase64file(file).then((base64encoded: any) => {
        dispatch({ type: Actions.Dokumentasjon, payload: base64encoded });
      });
    }
  };
  const handleSubmit = () => {
    dispatch({ type: Actions.Progress, payload: { progress: true } });
    dispatch({ type: Actions.Validate });
  };
  return (
    <Row>
      <Column>
        <SoknadTittel>
          Søknad om at NAV dekker sykepenger i arbeidsgiverperioden
        </SoknadTittel>
        <SideIndentering>
          <Panel>
            <Ingress>
              NAV kan dekke sykepenger i arbeidsgiverperioden for en
              arbeidstaker med langvarig eller kronisk sykdom. ​ Vi bruker
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
              Alle felter er obligatoriske om ikke merket annerledes
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
                      dispatch({ type: Actions.Fnr, payload: { fnr: fnr } })
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
                Svaret deres brukes i to forskjellige vurderinger: ​
              </Normaltekst>

              <ul className='gravidside-tett-liste'>
                <li>
                  om vi kan hjelpe til med noe, slik at den ansatte kan stå i
                  jobben
                </li>
                <li>om vi skal dekke sykepenger i arbeidsgiverperioden</li>
              </ul>
              <CheckboxGruppe
                legend='Hva slags arbeid utfører den ansatte?'
                feil={state.arbeidError}
                feilmeldingId='arbeidsutfører'
              >
                <Row>
                  <Column sm='4' xs='6'>
                    <Checkbox
                      label='Stillesittende arbeid'
                      value={ArbeidType.Stillesittende}
                      id={'stillesittende'}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.ToggleArbeid,
                          payload: { arbeid: ArbeidType.Stillesittende }
                        })
                      }
                      checked={props.arbeid?.includes(
                        ArbeidType.Stillesittende
                      )}
                    />
                    <Checkbox
                      label='Moderat fysisk arbeid'
                      value={ArbeidType.Moderat}
                      id={'moderat'}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.ToggleArbeid,
                          payload: { arbeid: ArbeidType.Moderat }
                        })
                      }
                      checked={props.arbeid?.includes(ArbeidType.Moderat)}
                    />
                    <Checkbox
                      label='Fysisk krevende arbeid'
                      value={ArbeidType.Krevende}
                      id={'fysisk'}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.ToggleArbeid,
                          payload: { arbeid: ArbeidType.Krevende }
                        })
                      }
                      checked={state.arbeid?.includes(ArbeidType.Krevende)}
                    />
                  </Column>
                </Row>
              </CheckboxGruppe>

              <CheckboxGruppe
                legend='Hvilke påkjenninger innebærer arbeidet?'
                feil={state.påkjenningerError}
                feilmeldingId='påkjenninger'
              >
                <Row>
                  <Column sm='4' xs='6'>
                    <Checkbox
                      label='Allergener eller giftstofferd'
                      value={PåkjenningerType.Allergener}
                      id={'allergener'}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.TogglePaakjenninger,
                          payload: { påkjenning: PåkjenningerType.Allergener }
                        })
                      }
                      checked={state.påkjenninger?.includes(
                        PåkjenningerType.Allergener
                      )}
                    />
                    <Checkbox
                      label='Ukomfortabel temperatur eller luftfuktighet​'
                      value={PåkjenningerType.Ukomfortabel}
                      id={'ukomfortabel'}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.TogglePaakjenninger,
                          payload: { påkjenning: PåkjenningerType.Ukomfortabel }
                        })
                      }
                      checked={state.påkjenninger?.includes(
                        PåkjenningerType.Ukomfortabel
                      )}
                    />
                    <Checkbox
                      label='Stressende omgivelser'
                      value={PåkjenningerType.Stressende}
                      id={'stressende'}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.TogglePaakjenninger,
                          payload: { påkjenning: PåkjenningerType.Stressende }
                        })
                      }
                      checked={state.påkjenninger?.includes(
                        PåkjenningerType.Stressende
                      )}
                    />
                    <Checkbox
                      label='Regelmessige kveldsskift eller nattskift'
                      value={PåkjenningerType.RegelmessigKveldsskift}
                      id={'regelmessige'}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.TogglePaakjenninger,
                          payload: {
                            påkjenning: PåkjenningerType.RegelmessigKveldsskift
                          }
                        })
                      }
                      checked={state.påkjenninger?.includes(
                        PåkjenningerType.RegelmessigKveldsskift
                      )}
                    />
                    <Checkbox
                      label='Mye gåing/ståing'
                      value={PåkjenningerType.Gåing}
                      id={'gåing'}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.TogglePaakjenninger,
                          payload: { påkjenning: PåkjenningerType.Gåing }
                        })
                      }
                      checked={state.påkjenninger?.includes(
                        PåkjenningerType.Gåing
                      )}
                    />
                  </Column>
                  <Column sm='4' xs='6'>
                    <Checkbox
                      label='Harde gulv'
                      value={PåkjenningerType.HardeGulv}
                      id={'harde'}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.TogglePaakjenninger,
                          payload: { påkjenning: PåkjenningerType.HardeGulv }
                        })
                      }
                      checked={state.påkjenninger?.includes(
                        PåkjenningerType.HardeGulv
                      )}
                    />
                    <Checkbox
                      label='Tunge løft'
                      value={PåkjenningerType.TungeLøft}
                      id={'tunge'}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.TogglePaakjenninger,
                          payload: { påkjenning: PåkjenningerType.TungeLøft }
                        })
                      }
                      checked={state.påkjenninger?.includes(
                        PåkjenningerType.TungeLøft
                      )}
                    />
                    <Checkbox
                      label='Annet, gi en kort beskrivelse:'
                      value={PåkjenningerType.Annet}
                      id={'annet'}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.TogglePaakjenninger,
                          payload: { påkjenning: PåkjenningerType.Annet }
                        })
                      }
                      checked={state.påkjenninger?.includes(
                        PåkjenningerType.Annet
                      )}
                    />
                    <Textarea
                      label='annet'
                      defaultValue={state.kommentar}
                      value={state.kommentar || ''}
                      feil={state.kommentarError}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.Kommentar,
                          payload: { kommentar: evt.target.value }
                        })
                      }
                      disabled={
                        !state.påkjenninger?.includes(PåkjenningerType.Annet)
                      }
                    />
                  </Column>
                </Row>
              </CheckboxGruppe>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel>
            <SkjemaGruppe
              legend='Hvis dere har fått dokumentasjon fra den ansatte'
              feil={state.dokumentasjonError}
              feilmeldingId='dokumentasjon'
              aria-live='polite'
            >
              <Normaltekst>
                Som arbeidsgiver kan dere ikke kreve å få se helseopplysninger.
                Men hvis den ansatte allerede har gitt dere slik dokumentasjon
                frivillig, kan dere skanne eller ta bilde av den og laste den
                opp her. Vi tar imot .pdf .jpeg, .png, og de fleste formater fra
                smarttelefonkamera.
              </Normaltekst>
              <br />
              <Normaltekst>
                NAV kan også selv innhente dokumentasjon fra legen hvis det er
                nødvendig.
              </Normaltekst>
              <Upload
                id='upload'
                label='LAST OPP LEGEERKLÆRINGEN (valgfritt)'
                extensions='.jpg,.pdf'
                onChange={handleUploadChanged}
                fileSize={250000}
              />
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel>
            <SkjemaGruppe
              legend='Fraværet'
              feil={state.fraværError}
              feilmeldingId='fravær'
              aria-live='polite'
            >
              <Normaltekst>
                Skriv inn antall dager med sykefravære relatert til søknaden i
                hver måned. Dere kan gå 3 år tilbake i tid hvis både
                arbeidsforholdet og helseproblemene har vart så lenge.
              </Normaltekst>

              <DagerTabell
                onChange={(evt) => {
                  dispatch({
                    type: Actions.Fravær,
                    payload: {
                      fravær: {
                        year: evt.year,
                        month: evt.month,
                        dager: evt.days
                      }
                    }
                  });
                }}
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
                sykepengene i arbeidsgiverperioden hvis opplysningene ikke er
                riktige eller fullstendige.
              </BekreftCheckboksPanel>
            </SkjemaGruppe>
          </Panel>

          {state.feilmeldinger && state.feilmeldinger.length > 0 && (
            <Panel>
              <Feiloppsummering
                tittel='For å gå videre må du rette opp følgende:'
                feil={state.feilmeldinger}
              />
            </Panel>
          )}

          <Panel>
            <Hovedknapp onClick={handleSubmit} spinner={state.progress}>
              Send søknad
            </Hovedknapp>
          </Panel>
        </SideIndentering>
      </Column>
    </Row>
  );
};

export default KroniskSide;
