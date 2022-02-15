import React, { Reducer, useContext, useEffect, useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Input, Label, SkjemaGruppe } from 'nav-frontend-skjema';
import './KroniskSide.scss';
import '../felles/FellesStyling.scss';
import Orgnr from '../felles/Orgnr/Orgnr';
import KroniskState, { defaultKroniskState } from './KroniskState';
import KroniskReducer from './KroniskReducer';
import { Actions, KroniskAction } from './Actions';
import getBase64file from '../../utils/getBase64File';
import FravaerTabell from './FravaerTabell';
import { Hovedknapp } from 'nav-frontend-knapper';
import postKronisk from '../../api/kronisk/postKronisk';
import environment from '../../config/environment';
import { mapKroniskRequest } from '../../api/kronisk/mapKroniskRequest';
import KvitteringLink from './KvitteringLink';
import LangKey from '../../locale/LangKey';
import lenker from '../../config/lenker';
import {
  Side,
  Upload,
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
import LoggetUtAdvarsel from '../felles/LoggetUtAdvarsel';
import { KroniskSoknadKvitteringContext } from '../../context/KroniskSoknadKvitteringContext';

const buildReducer =
  (Translate: i18n): Reducer<KroniskState, KroniskAction> =>
  (bulkState: KroniskState, action: KroniskAction) =>
    KroniskReducer(bulkState, action, Translate);

const KroniskSide = () => {
  const { i18n, t } = useTranslation();
  const { saveResponse } = useContext(KroniskSoknadKvitteringContext);

  const [state, dispatch] = useReducer(buildReducer(i18n), {}, defaultKroniskState);
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
          state.fravaer || [],
          state.fnr || '',
          state.orgnr || '',
          state.bekreft || false,
          state.antallPerioder || 0,
          state.dokumentasjon
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
    state.bekreft,
    state.dokumentasjon,
    state.fnr,
    state.fravaer,
    state.orgnr,
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
                  <Systemtittel className='textfelt-padding-bottom'>{t(LangKey.DEN_ANSATTE)}</Systemtittel>
                  <Fnr
                    id='fnr'
                    label={t(LangKey.FODSELSNUMMER_LABEL)}
                    fnr={state.fnr}
                    placeholder={t(LangKey.FODSELSNUMMER_PLACEHOLDER)}
                    feilmelding={state.fnrError}
                    onValidate={() => {}}
                    onChange={(fnr: string) => dispatch({ type: Actions.Fnr, payload: { fnr: fnr } })}
                  />
                </Column>
                <Column sm='4' xs='6'>
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

          <Panel>
            <Systemtittel className='textfelt-padding-bottom'>
              {t(KroniskSideKeys.KRONISK_SIDE_IF_DOCUMENTATION)}
            </Systemtittel>
            <SkjemaGruppe feil={state.dokumentasjonError} feilmeldingId='dokumentasjon' aria-live='polite'>
              <Oversettelse langKey={KroniskSideKeys.KRONISK_SIDE_DOCUMENTATION_TEXT} />
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
            <Systemtittel className='textfelt-padding-bottom'>{t(KroniskSideKeys.KRONISK_SIDE_FRAVAER)}</Systemtittel>
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
