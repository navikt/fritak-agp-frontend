import React, { useEffect, useReducer, Reducer } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import { Input, Label, SkjemaGruppe } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Redirect, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import './GravidKrav.scss';
import '../felles/FellesStyling.scss';

import Hjelpetekst from 'nav-frontend-hjelpetekst';
import GravidKravProps from './GravidKravProps';
import GravidKravReducer, { MAX_PERIODER } from './GravidKravReducer';
import GravidKravState, { defaultGravidKravState } from './GravidKravState';
import { Actions, GravidKravAction } from './Actions';
import getBase64file from '../../utils/getBase64File';
import postGravidKrav from '../../api/gravidkrav/postGravidKrav';
import environment from '../../config/environment';
import { mapGravidKravRequest } from '../../api/gravidkrav/mapGravidKravRequest';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import dayjs from 'dayjs';
import PathParams from '../../locale/PathParams';
import { useTranslation } from 'react-i18next';
import { i18n } from 'i18next';
import {
  Side,
  LeggTilKnapp,
  Slettknapp,
  Oversettelse,
  stringishToNumber,
  DatoVelger,
  LoggetUtAdvarsel,
  BekreftOpplysningerPanel,
  Feilmeldingspanel,
  Fnr,
  Skillelinje,
  useArbeidsgiver,
  Upload
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import { GravidKravKeys } from './GravidKravKeys';
import LangKey from '../../locale/LangKey';
import KravPeriode from '../kroniskkrav/KravPeriode';

export const GravidKrav = (props: GravidKravProps) => {
  const { t, i18n } = useTranslation();

  const GravidKravReducerSettOpp =
    (Translate: i18n): Reducer<GravidKravState, GravidKravAction> =>
    (bulkState: GravidKravState, action: GravidKravAction) =>
      GravidKravReducer(bulkState, action, Translate);

  const GravidKravReducerI18n: Reducer<GravidKravState, GravidKravAction> = GravidKravReducerSettOpp(i18n);

  const [state, dispatch] = useReducer(GravidKravReducerI18n, props.state, defaultGravidKravState);
  const { arbeidsgiverId } = useArbeidsgiver();
  const { language } = useParams<PathParams>();
  const showDeleteButton = state.perioder && state.perioder.length > 1;

  const handleCloseNotAuthorized = () => {
    dispatch({ type: Actions.NotAuthorized });
  };

  const setArbeidsdagerDagerPrAar = (dager: string | undefined) => {
    dispatch({ type: Actions.KontrollDager, payload: { kontrollDager: stringishToNumber(dager) } });
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
    dispatch({
      type: Actions.Validate
    });
  };

  const fraDatoValgt = (uniqueKey: string, fomDato?: Date) => {
    if (fomDato) {
      getGrunnbeloep(dayjs(fomDato).format('YYYY-MM-DD')).then((grunnbeloepRespons) => {
        if (grunnbeloepRespons.grunnbeloep) {
          dispatch({
            type: Actions.Grunnbeloep,
            payload: { grunnbeloep: grunnbeloepRespons.grunnbeloep.grunnbeloep }
          });
        }
      });
    }
    dispatch({
      type: Actions.Fra,
      payload: { fra: fomDato, itemId: uniqueKey }
    });
  };

  useEffect(() => {
    dispatch({
      type: Actions.Orgnr,
      payload: { orgnr: arbeidsgiverId }
    });
  }, [arbeidsgiverId]);

  useEffect(() => {
    if (state.validated === true && state.progress === true && state.submitting === true) {
      postGravidKrav(
        environment.baseUrl,
        mapGravidKravRequest(
          state.fnr,
          state.orgnr,
          state.perioder,
          state.dokumentasjon,
          state.bekreft,
          state.kontrollDager
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
    state.perioder,
    state.fnr,
    state.bekreft,
    state.dokumentasjon,
    state.orgnr,
    state.kontrollDager
  ]);

  if (!!state.kvittering) {
    return <Redirect to={buildLenke(lenker.GravidKravKvittering, language)} />;
  }
  const lenkeGravid = buildLenke(lenker.Gravid, language);

  return (
    <Side
      bedriftsmeny={true}
      className='gravidkrav'
      sidetittel={t(GravidKravKeys.GRAVID_KRAV_SIDETITTEL_LITEN)}
      title={t(GravidKravKeys.GRAVID_KRAV_SIDETITTEL_STOR)}
      subtitle={t(GravidKravKeys.GRAVID_KRAV_SIDETITTEL_SUBTITLE)}
    >
      <Row>
        <Column>
          <Panel>
            <Ingress className='textfelt-padding-bottom'>
              <Oversettelse langKey={GravidKravKeys.GRAVID_KRAV_SIDETITTEL_INGRESS} variables={{ lenkeGravid }} />
            </Ingress>
            <Ingress>
              <Oversettelse langKey={LangKey.ALLE_FELT_PAKREVD} />
            </Ingress>
          </Panel>
          <Skillelinje />

          <Panel id='gravidkrav-panel-den-ansatte'>
            <Systemtittel className='textfelt-padding-bottom'>{t(LangKey.DEN_ANSATTE)}</Systemtittel>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'ansatt'}>
              <Row>
                <Column sm='4' xs='6'>
                  <Fnr
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
                <Column sm='4' xs='6'>
                  <Label htmlFor='kontrollsporsmaal-lonn-arbeidsdager'>{t(LangKey.KONTROLLSPORSMAL_LONN_DAGER)}</Label>
                  <Input
                    id='kontrollsporsmaal-lonn-arbeidsdager'
                    bredde='XS'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    // defaultValue={dager}
                    className='kontrollsporsmaal-lonn-arbeidsdager'
                    onChange={(event) => setArbeidsdagerDagerPrAar(event.target.value)}
                  />
                  <Normaltekst className='kontrollsporsmaal-lonn-forklaring'>
                    {t(LangKey.KONTROLLSPORSMAL_LONN_FORKLARING_DAGER)}
                  </Normaltekst>
                </Column>
              </Row>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel id='gravidkrav-panel-tapt-arbeidstid'>
            <Systemtittel className='textfelt-padding-bottom'>
              {t(GravidKravKeys.GRAVID_KRAV_ARBEIDSTID_TAPT)}
            </Systemtittel>
            <Ingress tag='span' className='textfelt-padding-bottom'>
              {t(GravidKravKeys.GRAVID_KRAV_ARBEIDSTID_PERIODE)}
              <Hjelpetekst className='krav-padding-hjelpetekst'>
                <Oversettelse langKey={GravidKravKeys.GRAVID_KRAV_ARBEIDSTID_HJELPETEKST} />
              </Hjelpetekst>
            </Ingress>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'arbeidsperiode'}>
              {state.perioder?.map((enkeltPeriode, index) => (
                <KravPeriode
                  dispatch={dispatch}
                  enkeltPeriode={enkeltPeriode}
                  index={index}
                  key={enkeltPeriode.uniqueKey}
                />
              ))}
              <Row>
                <Column md='6'>
                  {state.perioder && state.perioder.length < MAX_PERIODER && (
                    <LeggTilKnapp
                      onClick={() => {
                        dispatch({
                          type: Actions.AddPeriode,
                          payload: {}
                        });
                      }}
                    >
                      {t(GravidKravKeys.GRAVID_KRAV_LEGG_TIL_PERIODE)}
                    </LeggTilKnapp>
                  )}
                </Column>
              </Row>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel>
            <Systemtittel className='textfelt-padding-bottom'>
              {t(GravidKravKeys.GRAVID_KRAV_DOKUMENTASJON_TITTEL)}
            </Systemtittel>
            <Oversettelse langKey={GravidKravKeys.GRAVID_KRAV_DOKUMENTASJON_INGRESS} />
            <SkjemaGruppe feil={state.dokumentasjonError} feilmeldingId='dokumentasjon' aria-live='polite'>
              <Upload
                className='knapp-innsending-top'
                id='upload'
                label={t(GravidKravKeys.GRAVID_KRAV_LAST_OPP)}
                extensions='.pdf'
                onChange={handleUploadChanged}
                fileSize={5000000}
                onDelete={handleDelete}
              />
            </SkjemaGruppe>
          </Panel>

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
              {t(GravidKravKeys.GRAVID_KRAV_LONN_SEND)}
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

export default GravidKrav;
