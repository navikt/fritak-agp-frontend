import React, { Reducer, useContext, useEffect, useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import './KroniskSide.scss';
import '../felles/FellesStyling.scss';
import Orgnr from '../felles/Orgnr/Orgnr';
import KroniskState, { defaultKroniskState } from './KroniskState';
import KroniskReducer from './KroniskReducer';
import { Actions, KroniskAction } from './Actions';
import getBase64file from '../../utils/getBase64File';
import FravaerTabell from './FravaerTabell';
import postKronisk from '../../api/kronisk/postKronisk';
import environment from '../../config/environment';
import { mapKroniskRequest } from '../../api/kronisk/mapKroniskRequest';
import LangKey from '../../locale/LangKey';
import lenker, { buildLenke } from '../../config/lenker';
import { i18n } from 'i18next';
import { useTranslation } from 'react-i18next';
import { KroniskSideKeys } from './KroniskSideKeys';
import LoggetUtAdvarsel from '../felles/LoggetUtAdvarsel';
import { KroniskSoknadKvitteringContext } from '../../context/KroniskSoknadKvitteringContext';
import { useNavigate, useParams } from 'react-router-dom';
import { BodyLong, Button, Checkbox, Heading, Ingress, Panel, TextField } from '@navikt/ds-react';
import Fnr from '../felles/Fnr/Fnr';
import ServerFeilAdvarsel from '../felles/ServerFeilAdvarsel/ServerFeilAdvarsel';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import BekreftOpplysningerPanel from '../felles/BekreftOpplysningerPanel/BekreftOpplysningerPanel';
import Feilmeldingspanel from '../felles/Feilmeldingspanel/Feilmeldingspanel';
import Skillelinje from '../felles/Skillelinje';
import Side from '../felles/Side/Side';
import Language from '../../locale/Language';
import stringishToNumber from '../../utils/stringishToNumber';
import Upload from '../felles/Upload/Upload';

const buildReducer =
  (Translate: i18n): Reducer<KroniskState, KroniskAction> =>
  (bulkState: KroniskState, action: KroniskAction) =>
    KroniskReducer(bulkState, action, Translate);

const KroniskSide = () => {
  const { i18n, t } = useTranslation();
  const { saveResponse } = useContext(KroniskSoknadKvitteringContext);

  const { language } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title =
      'Søknad om at NAV dekker sykepenger i arbeidsgiverperioden ved kronisk eller langvarig sykdom - nav.no';
  }, []);

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
  const handleCloseServerFeil = () => {
    dispatch({ type: Actions.HideServerError });
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
          state.dokumentasjon,
          !!state.ikkeHistoriskFravaer
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
    navigate(buildLenke(lenker.KroniskKvittering, (language as Language) || Language.nb), { replace: true });
    return null;
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
        <ServerFeilAdvarsel isOpen={state.serverError} onClose={handleCloseServerFeil} />
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
                  <Heading size='medium' level='2' className='textfelt-padding-bottom'>
                    {t(LangKey.DEN_ANSATTE)}
                  </Heading>
                  <Fnr
                    id='fnr'
                    label={t(LangKey.FODSELSNUMMER_LABEL)}
                    fnr={state.fnr}
                    placeholder={t(LangKey.FODSELSNUMMER_PLACEHOLDER)}
                    feilmelding={state.fnrError}
                    onChange={(fnr: string) => dispatch({ type: Actions.Fnr, payload: { fnr: fnr } })}
                  />
                </Column>
                <Column sm='4' xs='6'>
                  <Heading size='medium' level='3' className='textfelt-padding-bottom'>
                    {t(LangKey.ARBEIDSGIVEREN)}
                  </Heading>
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
            <Heading size='medium' level='3' className='textfelt-padding-bottom'>
              {t(KroniskSideKeys.KRONISK_SIDE_IF_DOCUMENTATION)}
            </Heading>
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
            <Heading size='medium' level='3' className='textfelt-padding-bottom'>
              {t(KroniskSideKeys.KRONISK_SIDE_FRAVAER)}
            </Heading>
            <SkjemaGruppe feil={state.fravaerError} feilmeldingId='fravaertabell' aria-live='polite'>
              <Oversettelse langKey={KroniskSideKeys.KRONISK_SIDE_FRAVAER_DESCRIPTION} />

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
            <TextField
              label={t(KroniskSideKeys.KRONISK_SIDE_PERIODER_LABEL)}
              id='soknad-perioder'
              inputMode='numeric'
              pattern='[0-9]*'
              className='kontrollsporsmaal-lonn-arbeidsdager'
              error={state.antallPerioderError}
              onChange={(evt) => {
                dispatch({
                  type: Actions.AntallPerioder,
                  payload: {
                    antallPerioder: stringishToNumber(evt.target.value)
                  }
                });
              }}
            />
            <BodyLong className='kontrollsporsmaal-lonn-forklaring'>
              {t(KroniskSideKeys.KRONISK_SIDE_PERIODER_TEXT)}
            </BodyLong>

            <Checkbox
              className='checkbox-unntak'
              defaultChecked={state.ikkeHistoriskFravaer}
              onChange={() => {
                dispatch({
                  type: Actions.ToggleUnntak
                });
              }}
            >
              {t(KroniskSideKeys.KRONISK_SIDE_PERIODER_UNNTAK)}
            </Checkbox>
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
            <Button onClick={handleSubmit} loading={state.progress}>
              {t(KroniskSideKeys.KRONISK_SIDE_SUBMIT)}
            </Button>
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
