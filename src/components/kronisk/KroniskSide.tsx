import React, { Reducer, useEffect, useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Checkbox, CheckboxGruppe, Input, Label, SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import './KroniskSide.scss';
import '../felles/FellesStyling.scss';
import Orgnr from '../felles/Orgnr/Orgnr';
import KroniskState, { defaultKroniskState } from './KroniskState';
import KroniskReducer from './KroniskReducer';
import { Actions, KroniskAction } from './Actions';
import { PaakjenningerType } from './PaakjenningerType';
import getBase64file from '../../utils/getBase64File';
import FravaerTabell from './FravaerTabell';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ARBEID_CHECKBOXER } from './ARBEID_CHECKBOXER';
import { PAAKJENNINGER_CHECKBOXER } from './PAAKJENNINGER_CHECKBOXER';
import postKronisk from '../../api/kronisk/postKronisk';
import environment from '../../config/environment';
import { mapKroniskRequest } from '../../api/kronisk/mapKroniskRequest';
import KvitteringLink from './KvitteringLink';
import LangKey from '../../locale/LangKey';
import lenker from '../../config/lenker';
import {
  Side,
  Upload,
  LoggetUtAdvarsel,
  Oversettelse,
  BekreftOpplysningerPanel,
  Feilmeldingspanel,
  Fnr,
  Skillelinje,
  stringishToNumber
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import { i18n } from 'i18next';
import { useTranslation } from 'react-i18next';
import { KroniskSideKeys } from './KroniskSideKeys';

export const MAX_BESKRIVELSE = 2000;

const buildReducer =
  (Translate: i18n): Reducer<KroniskState, KroniskAction> =>
  (bulkState: KroniskState, action: KroniskAction) =>
    KroniskReducer(bulkState, action, Translate);

const KroniskSide = () => {
  const { i18n, t } = useTranslation();

  const [state, dispatch] = useReducer(buildReducer(i18n), {}, defaultKroniskState);
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
          state.kommentar,
          state.antallPerioder || 0
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
    state.paakjenninger,
    state.antallPerioder
  ]);

  if (state.kvittering === true) {
    return <KvitteringLink />;
  }
  return (
    <Side
      bedriftsmeny={false}
      className='kronisk-side'
      sidetittel={t(KroniskSideKeys.KRONISK_SIDE_SIDETITTEL)}
      title={t(KroniskSideKeys.KRONISK_SIDE_TITLE)}
      subtitle={t(KroniskSideKeys.KRONISK_SIDE_SUBTITLE)}
    >
      <Row>
        <Column>
          <Panel>
            <Ingress>
              <Oversettelse langKey={KroniskSideKeys.KRONISK_SIDE_INGRESS} />
            </Ingress>
          </Panel>
          <Skillelinje />

          <Panel id='kroniskside-panel-ansatte'>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'ansatt'}>
              <Row>
                <Column sm='4' xs='6'>
                  <Systemtittel>{t(LangKey.DEN_ANSATTE)}</Systemtittel>
                  <br />
                  <Fnr
                    label={t(LangKey.FODSELSNUMMER_LABEL)}
                    fnr={state.fnr}
                    placeholder={t(LangKey.FODSELSNUMMER_PLACEHOLDER)}
                    feilmelding={state.fnrError}
                    onValidate={() => {}}
                    onChange={(fnr: string) => dispatch({ type: Actions.Fnr, payload: { fnr: fnr } })}
                  />
                </Column>
                <Column sm='4' xs='6'>
                  <Systemtittel>{t(LangKey.ARBEIDSGIVEREN)}</Systemtittel>
                  <br />
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

          <Panel id='kroniskside-panel-arbeidssituasjon'>
            <Systemtittel>{t(KroniskSideKeys.KRONISK_SIDE_ARBEIDSMILJO)}</Systemtittel>
            <br />
            <SkjemaGruppe>
              <Normaltekst>
                <Oversettelse langKey={KroniskSideKeys.KRONISK_SIDE_ARBEIDSMILJO_INGRESS} />
              </Normaltekst>
              <br />
              <br />

              <CheckboxGruppe
                legend={t(KroniskSideKeys.KRONISK_SIDE_ARBEIDS_TYPE)}
                feil={state.arbeidError}
                feilmeldingId='arbeidsutfører'
              >
                <Row>
                  <Column sm='4' xs='6'>
                    {ARBEID_CHECKBOXER.map((a) => {
                      return (
                        <Checkbox
                          key={a.id}
                          label={t(a.label)}
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
                legend={t(KroniskSideKeys.KRONISK_SIDE_PAAKJENNINGER)}
                feil={state.paakjenningerError}
                feilmeldingId='paakjenninger'
              >
                <Row>
                  <Column sm='4' xs='6'>
                    {PAAKJENNINGER_CHECKBOXER.filter((value, index) => index < 5).map((a, index) => {
                      return (
                        <Checkbox
                          key={a.id}
                          label={t(a.label)}
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
                          label={t(a.label)}
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
                      label={t(KroniskSideKeys.KRONISK_SIDE_ANNET)}
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
            <Systemtittel>{t(KroniskSideKeys.KRONISK_SIDE_IF_DOCUMENTATION)}</Systemtittel>
            <br />
            <SkjemaGruppe feil={state.dokumentasjonError} feilmeldingId='dokumentasjon' aria-live='polite'>
              <Normaltekst>
                <Oversettelse
                  className='textfelt-padding-bottom'
                  langKey={KroniskSideKeys.KRONISK_SIDE_DOCUMENTATION_TEXT}
                />
              </Normaltekst>

              <Upload
                className='knapp-innsending-top'
                id='upload'
                label={t(KroniskSideKeys.KRONISK_SIDE_UPLOAD)}
                extensions='.pdf'
                onChange={handleUploadChanged}
                fileSize={5000000}
                onDelete={handleDelete}
              />
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel>
            <Systemtittel>{t(KroniskSideKeys.KRONISK_SIDE_FRAVAER)}</Systemtittel>
            <br />
            <SkjemaGruppe feil={state.fravaerError} feilmeldingId='fravaer' aria-live='polite'>
              <Normaltekst>
                <Oversettelse langKey={KroniskSideKeys.KRONISK_SIDE_FRAVAER_DESCRIPTION} />
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
          <Panel>
            <Label htmlFor='soknad-perioder'>{t(KroniskSideKeys.KRONISK_SIDE_PERIODER_LABEL)}</Label>
            <Input
              id='soknad-perioder'
              bredde='XS'
              inputMode='numeric'
              pattern='[0-9]*'
              className='kontrollsporsmaal-lonn-arbeidsdager'
              onChange={(evt) => {
                dispatch({
                  type: Actions.AntallPerioder,
                  payload: {
                    antallPerioder: stringishToNumber(evt.target.value)
                  }
                });
              }}
            />
            <Normaltekst className='kontrollsporsmaal-lonn-forklaring'>
              {t(KroniskSideKeys.KRONISK_SIDE_PERIODER_TEXT)}
            </Normaltekst>
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
              {t(KroniskSideKeys.KRONISK_SIDE_SUBMIT)}
            </Hovedknapp>
          </Panel>
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

export default KroniskSide;
