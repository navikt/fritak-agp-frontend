import React, { useEffect, useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Checkbox, CheckboxGruppe, SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import Tekstomrade, { BoldRule, ParagraphRule } from 'nav-frontend-tekstomrade';
import Skillelinje from '../Skillelinje';
import SoknadTittel from '../SoknadTittel';
import SideIndentering from '../SideIndentering';
import Fnr from '../Fnr';
import Upload from '../Upload';
import './KroniskSide.scss';
import '../felles/FellesStyling.scss';
import Lenke from 'nav-frontend-lenker';
import Orgnr from '../Orgnr';
import { defaultKroniskState } from './KroniskState';
import KroniskReducer from './KroniskReducer';
import { Actions } from './Actions';
import { PaakjenningerType } from './PaakjenningerType';
import getBase64file from '../../utils/getBase64File';
import FravaerTabell from './FravaerTabell';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ARBEID_CHECKBOXER } from './ARBEID_CHECKBOXER';
import { PAAKJENNINGER_CHECKBOXER } from './PAAKJENNINGER_CHECKBOXER';
import postKronisk from '../../api/kronisk/postKronisk';
import environment from '../../environment';
import { mapKroniskRequest } from '../../api/kronisk/mapKroniskRequest';
import LoggetUtAdvarsel from '../login/LoggetUtAdvarsel';
import KvitteringLink from './KvitteringLink';
import Feilmeldingspanel from '../felles/Feilmeldingspanel';
import BekreftOpplysningerPanel from '../felles/BekreftOpplysningerPanel';

export const MAX_BESKRIVELSE = 2000;

const KroniskSide = () => {
  const [state, dispatch] = useReducer(KroniskReducer, {}, defaultKroniskState);
  const handleUploadChanged = (file?: File) => {
    if (file) {
      getBase64file(file).then((base64encoded: any) => {
        dispatch({ type: Actions.Dokumentasjon, payload: base64encoded });
      });
    }
  };
  const handleDelete = () => {
    dispatch({ type: Actions.Dokumentasjon, payload: undefined });
  };
  const handleCloseNotAuthorized = () => {
    dispatch({ type: Actions.NotAuthorized });
  };
  const handleSubmit = () => {
    dispatch({ type: Actions.Validate });
  };
  useEffect(() => {
    if (state.validated === true && state.progress === true && state.submitting === true) {
      postKronisk(
        environment.baseUrl,
        mapKroniskRequest(
          state.arbeid || [],
          state.paakjenninger || [],
          state.fravaer || [],
          state.fnr || '',
          state.orgnr || '',
          state.bekreft || false,
          state.kommentar
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
    state.arbeid,
    state.bekreft,
    state.dokumentasjon,
    state.fnr,
    state.fravaer,
    state.kommentar,
    state.orgnr,
    state.paakjenninger
  ]);

  if (state.kvittering === true) {
    return <KvitteringLink />;
  }
  return (
    <Row className='kronisk-side'>
      <Column>
        <SoknadTittel>Søknad om at NAV dekker sykepenger i arbeidsgiverperioden</SoknadTittel>
        <SideIndentering>
          <Panel>
            <Ingress>
              NAV kan dekke sykepenger i arbeidsgiverperioden for en arbeidstaker med langvarig eller kronisk sykdom. ​
              Vi bruker opplysninger vi allerede har om sykefraværet, i tillegg til svarene du gir nedenfor. Ordningen
              er beskrevet i{' '}
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

          <Panel id='kroniskside-panel-ansatte'>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'ansatt'}>
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
                    onChange={(fnr: string) => dispatch({ type: Actions.Fnr, payload: { fnr: fnr } })}
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

          <Panel id='kroniskside-panel-arbeidssituasjon'>
            <Systemtittel>Arbeidssituasjon og miljø</Systemtittel>
            <br />
            <SkjemaGruppe>
              <Normaltekst>Vi spør først om dere har forsøkt å løse situasjonen på arbeidsplassen.</Normaltekst>
              <Normaltekst>Svaret deres brukes i to forskjellige vurderinger:</Normaltekst>

              <ul className='kroniskside-tett-liste typo-normal'>
                <li>om vi kan hjelpe til med noe, slik at den ansatte kan stå i jobben</li>
                <li>om vi skal dekke sykepenger i arbeidsgiverperioden</li>
              </ul>
              <CheckboxGruppe
                legend='Hva slags arbeid utfører den ansatte?'
                feil={state.arbeidError}
                feilmeldingId='arbeidsutfører'
              >
                <Row>
                  <Column sm='4' xs='6'>
                    {ARBEID_CHECKBOXER.map((a) => {
                      return (
                        <Checkbox
                          key={a.id}
                          label={a.label}
                          value={a.value}
                          id={a.id}
                          onChange={(evt) =>
                            dispatch({
                              type: Actions.ToggleArbeid,
                              payload: { arbeid: a.value }
                            })
                          }
                          checked={state.arbeid?.includes(a.value)}
                        />
                      );
                    })}
                  </Column>
                </Row>
              </CheckboxGruppe>

              <CheckboxGruppe
                legend='Hvilke påkjenninger innebærer arbeidet?'
                feil={state.paakjenningerError}
                feilmeldingId='paakjenninger'
              >
                <Row>
                  <Column sm='4' xs='6'>
                    {PAAKJENNINGER_CHECKBOXER.filter((value, index) => index < 5).map((a, index) => {
                      return (
                        <Checkbox
                          key={a.id}
                          label={a.label}
                          value={a.value}
                          id={a.id}
                          onChange={(evt) =>
                            dispatch({
                              type: Actions.TogglePaakjenninger,
                              payload: { paakjenning: a.value }
                            })
                          }
                          checked={state.paakjenninger?.includes(a.value)}
                        />
                      );
                    })}
                  </Column>
                  <Column sm='4' xs='6'>
                    {PAAKJENNINGER_CHECKBOXER.filter((value, index) => index > 4).map((a, index) => {
                      return (
                        <Checkbox
                          key={a.id}
                          label={a.label}
                          value={a.value}
                          id={a.id}
                          onChange={(evt) =>
                            dispatch({
                              type: Actions.TogglePaakjenninger,
                              payload: { paakjenning: a.value }
                            })
                          }
                          checked={state.paakjenninger?.includes(a.value)}
                        />
                      );
                    })}

                    <Textarea
                      className='textarea-min-hoyde'
                      label='Annet'
                      id='textarea-annet'
                      value={state.kommentar || ''}
                      feil={state.kommentarError || undefined}
                      onChange={(evt) =>
                        dispatch({
                          type: Actions.Kommentar,
                          payload: { kommentar: evt.target.value }
                        })
                      }
                      disabled={!state.paakjenninger?.includes(PaakjenningerType.ANNET)}
                      maxLength={MAX_BESKRIVELSE}
                    />
                  </Column>
                </Row>
              </CheckboxGruppe>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel>
            <Systemtittel>Hvis dere har fått dokumentasjon fra den ansatte</Systemtittel>
            <br />
            <SkjemaGruppe feil={state.dokumentasjonError} feilmeldingId='dokumentasjon' aria-live='polite'>
              <Tekstomrade className='textfelt-padding-bottom' rules={[BoldRule, ParagraphRule]}>
                Som arbeidsgiver kan dere ikke kreve å få se helseopplysninger. Men hvis den ansatte allerede har gitt
                dere slik dokumentasjon frivillig, kan dere skanne eller ta bilde av den og laste den opp her. _For
                tiden støtter vi kun filformatet .pdf._
              </Tekstomrade>
              <Normaltekst>NAV vil selv innhente dokumentasjon fra legen hvis det er nødvendig.</Normaltekst>
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

          <Panel>
            <Systemtittel>Fraværet</Systemtittel>
            <br />
            <SkjemaGruppe feil={state.fravaerError} feilmeldingId='fravaer' aria-live='polite'>
              <Normaltekst>
                Skriv inn antall dager med sykefravær relatert til søknaden i hver måned. Dere kan gå 3 år tilbake i tid
                hvis både arbeidsforholdet og helseproblemene har vart så lenge.
              </Normaltekst>

              <FravaerTabell
                validated={state.validated || false}
                fravaer={state.fravaer}
                onChange={(evt) => {
                  dispatch({
                    type: Actions.Fravaer,
                    payload: {
                      fravaer: {
                        year: evt.year,
                        month: evt.month,
                        dager: evt.dager
                      }
                    }
                  });
                }}
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
            <Hovedknapp onClick={handleSubmit} spinner={state.progress}>
              Send søknad
            </Hovedknapp>
          </Panel>
        </SideIndentering>
      </Column>
      {state.notAuthorized && <LoggetUtAdvarsel onClose={handleCloseNotAuthorized} />}
    </Row>
  );
};

export default KroniskSide;
