import React, { Reducer, useContext, useEffect, useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Checkbox, CheckboxGruppe, Radio, RadioGruppe, SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import './GravidSide.scss';
import '../felles/FellesStyling.scss';
import GravidProgress from './GravidProgress';
import Orgnr from '../felles/Orgnr/Orgnr';
import GravidSideProps from './GravidSideProps';
import getBase64file from '../../utils/getBase64File';
import GravidReducer from './GravidReducer';
import GravidState, { defaultGravidState } from './GravidState';
import { Actions, GravidAction } from './Actions';
import TiltakCheckboxes from './TiltakCheckboxes';
import OmplasseringCheckboxes from './OmplasseringCheckboxes';
import AarsakCheckboxes from './AarsakCheckboxes';
import { Tiltak } from './Tiltak';
import { Omplassering } from './Omplassering';
import environment from '../../config/environment';
import postGravid from '../../api/gravid/postGravid';
import { mapGravidRequest } from '../../api/gravid/mapGravidRequest';
import {
  Side,
  Upload,
  Oversettelse,
  DatoVelger,
  BekreftOpplysningerPanel,
  Feilmeldingspanel,
  Fnr,
  ServerFeilAdvarsel,
  Skillelinje,
  Language
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import { useTranslation } from 'react-i18next';
import { i18n } from 'i18next';
import LangKey from '../../locale/LangKey';
import lenker, { buildLenke } from '../../config/lenker';
import { GravidSideKeys } from './GravidSideKeys';
import { useNavigate, useParams } from 'react-router-dom';
import LoggetUtAdvarsel from '../felles/LoggetUtAdvarsel';
import { GravidSoknadKvitteringContext } from '../../context/GravidSoknadKvitteringContext';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export const MAX_TILTAK_BESKRIVELSE = 2000;

const GravidSide = (props: GravidSideProps) => {
  const { t, i18n } = useTranslation();
  const { language } = useParams();
  const { saveResponse } = useContext(GravidSoknadKvitteringContext);

  const navigate = useNavigate();

  const GravidReducerSettOpp =
    (Translate: i18n): Reducer<GravidState, GravidAction> =>
    (bulkState: GravidState, action: GravidAction) =>
      GravidReducer(bulkState, action, Translate);

  const GravidReducerI18n: Reducer<GravidState, GravidAction> = GravidReducerSettOpp(i18n);

  const [state, dispatch] = useReducer(GravidReducerI18n, props.state, defaultGravidState);
  dayjs.extend(customParseFormat);

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
  const handleCloseServerFeil = () => {
    dispatch({ type: Actions.HideServerError });
  };
  const handleCloseNotAuthorized = () => {
    dispatch({ type: Actions.NotAuthorized });
  };

  const isCheckboxChecked = (checkbox: Tiltak): boolean => {
    const foundElement = state.tiltak?.find((element) => {
      return element === checkbox;
    });

    return !!foundElement;
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
          state.bekreft,
          state.termindato
        )
      ).then((response) => {
        saveResponse(response);
        dispatch({
          type: Actions.HandleResponse,
          payload: { response: response }
        });
      });
    } // eslint-disable-next-line
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
    state.orgnr,
    state.termindato
  ]);

  if (state.kvittering) {
    navigate(buildLenke(lenker.GravidKvittering, language as Language), { replace: true });
    return null;
  }

  return (
    <Side
      bedriftsmeny={false}
      className='gravid-side'
      sidetittel={t(LangKey.SOKNADSSKJEMA)}
      title={t(GravidSideKeys.GRAVID_SIDE_TITTEL)}
      subtitle={t(GravidSideKeys.GRAVID_SIDE_UNDERTITTEL)}
    >
      <Row>
        <ServerFeilAdvarsel isOpen={state.serverError} onClose={handleCloseServerFeil} />
        <Column>
          {!!state.progress && <GravidProgress />}

          {!state.progress && !state.kvittering && (
            <div>
              <Panel>
                <Ingress>
                  <Oversettelse langKey={GravidSideKeys.GRAVID_SIDE_INGRESS} />
                </Ingress>
              </Panel>

              <Skillelinje />

              <Panel id='gravidside-panel-ansatte' className='gravidside-panel-ansatte'>
                <SkjemaGruppe aria-live='polite'>
                  <Row>
                    <Column md='3' xs='12'>
                      <Systemtittel className='textfelt-padding-bottom'>{t(LangKey.DEN_ANSATTE)}</Systemtittel>
                      <Fnr
                        id='fnr'
                        label={t(LangKey.FODSELSNUMMER_LABEL)}
                        fnr={state.fnr}
                        placeholder={t(LangKey.FODSELSNUMMER_PLACEHOLDER)}
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
                    <Column md='3' xs='12'>
                      <Systemtittel className='textfelt-padding-bottom'>&nbsp;</Systemtittel>
                      <DatoVelger
                        className='termindato'
                        id='termindato'
                        label={t(GravidSideKeys.GRAVID_SIDE_TERMINDATO)}
                        feilmelding={state.termindatoError}
                        placeholder={t(LangKey.KRONISK_KRAV_PERIODE_FORMAT)}
                        dato={dayjs(state.termindato?.value, 'DD.MM.YYYY').toDate()}
                        defaultDate={dayjs(state.termindato?.value, 'DD.MM.YYYY').toDate()}
                        onChange={(termindato: Date) => {
                          dispatch({
                            type: Actions.Termindato,
                            payload: { termindato }
                          });
                        }}
                      />
                    </Column>
                    <Column md='3' xs='12'>
                      <Systemtittel className='textfelt-padding-bottom'>{t(LangKey.ARBEIDSGIVEREN)}</Systemtittel>
                      <Orgnr
                        label={t(LangKey.VIRKSOMHETSNUMMER_LABEL)}
                        orgnr={state.orgnr}
                        placeholder={t(LangKey.VIRKSOMHETSNUMMER_PLACEHOLDER)}
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
                    <Systemtittel className='textfelt-padding-bottom'>
                      {t(GravidSideKeys.GRAVID_SIDE_ARBEIDSMILJO)}
                    </Systemtittel>
                    <SkjemaGruppe>
                      <Oversettelse
                        className='arbeidsmiljo-ingress'
                        langKey={GravidSideKeys.GRAVID_SIDE_ARBEIDSMILJO_INGRESS}
                      />
                      <RadioGruppe
                        legend={t(GravidSideKeys.GRAVID_SIDE_TILRETTELEGGING)}
                        className='gravidside-radiogruppe-tilrettelegging'
                      >
                        <Radio
                          label={t(LangKey.JA)}
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
                          label={t(LangKey.NEI)}
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
                        legend={t(GravidSideKeys.GRAVID_SIDE_TILTAK_TITTEL)}
                        feil={state.tiltakError}
                        feilmeldingId='tiltakFeilmeldingId'
                      >
                        {TiltakCheckboxes.map((a) => {
                          return (
                            <Checkbox
                              defaultChecked={isCheckboxChecked(a.value)}
                              key={a.id}
                              label={t(a.label)}
                              id={a.id}
                              onChange={() =>
                                dispatch({
                                  type: Actions.ToggleTiltak,
                                  payload: { tiltak: a.value }
                                })
                              }
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
                      <RadioGruppe legend={t(GravidSideKeys.GRAVID_SIDE_OMPLASSERING_TITTEL)}>
                        {OmplasseringCheckboxes.map((a) => {
                          return (
                            <Radio
                              key={a.value}
                              label={t(a.label)}
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
                                label={t(a.label)}
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
                          {t(GravidSideKeys.GRAVID_SIDE_IKKE_KOMPLETT_1)}
                          <button
                            className='lenke gravidside-lenke-knapp'
                            onClick={() =>
                              dispatch({
                                type: Actions.Videre,
                                payload: { videre: true }
                              })
                            }
                          >
                            {t(GravidSideKeys.GRAVID_SIDE_IKKE_KOMPLETT_2)}
                          </button>
                          {t(GravidSideKeys.GRAVID_SIDE_IKKE_KOMPLETT_3)}
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
                    <Systemtittel className='textfelt-padding-bottom'>
                      {t(GravidSideKeys.GRAVID_SIDE_DOKUMENTASJON_TITTEL)}
                    </Systemtittel>
                    <SkjemaGruppe
                      feil={state.dokumentasjonError}
                      feilmeldingId='dokumentasjonFeilmeldingId'
                      aria-live='polite'
                    >
                      <Oversettelse langKey={GravidSideKeys.GRAVID_SIDE_DOKUMENTASJON_INGRESS} />
                      <Upload
                        id='upload'
                        fileSize={5000000}
                        className='knapp-innsending-top'
                        label={t(GravidSideKeys.GRAVID_SIDE_OPPLASTINGSKNAPP)}
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
                    <Hovedknapp onClick={handleSubmitClicked}>{t(GravidSideKeys.GRAVID_SIDE_SEND_SOKNAD)}</Hovedknapp>
                  </Panel>
                </>
              )}
            </div>
          )}
        </Column>
        {state.notAuthorized && (
          <LoggetUtAdvarsel
            onClose={handleCloseNotAuthorized}
            tokenFornyet={lenker.TokenFornyet}
            loginServiceUrl={environment.loginServiceUrl}
          />
        )}
      </Row>
    </Side>
  );
};

export default GravidSide;
