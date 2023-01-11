import React, { useEffect, useReducer, Reducer, useState } from 'react';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Fareknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { useNavigate, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import './GravidKrav.scss';
import '../felles/FellesStyling.scss';

import Hjelpetekst from 'nav-frontend-hjelpetekst';
import GravidKravProps from './GravidKravProps';
import GravidKravReducer, { MAX_PERIODER } from './GravidKravReducer';
import GravidKravState, { defaultGravidKravState } from './GravidKravState';
import { Actions, GravidKravAction } from './Actions';
import postGravidKrav from '../../api/gravidkrav/postGravidKrav';
import environment from '../../config/environment';
import { mapGravidKravRequest } from '../../api/gravidkrav/mapGravidKravRequest';
import { useTranslation } from 'react-i18next';
import { i18n as Ii18n } from 'i18next';
import {
  Side,
  LeggTilKnapp,
  Oversettelse,
  stringishToNumber,
  BekreftOpplysningerPanel,
  Feilmeldingspanel,
  Fnr,
  Skillelinje,
  useArbeidsgiver,
  HttpStatus,
  ServerFeilAdvarsel,
  Language
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import { GravidKravKeys } from './GravidKravKeys';
import LangKey from '../../locale/LangKey';
import KravPeriode from '../kroniskkrav/KravPeriode';
import KontrollSporsmaal from '../felles/KontrollSporsmaal/KontrollSporsmaal';
import LoggetUtAdvarsel from '../felles/LoggetUtAdvarsel';
import SelectEndring from '../felles/SelectEndring/SelectEndring';
import deleteGravidKrav from '../../api/gravidkrav/deleteGravidKrav';
import patchGravidKrav from '../../api/kroniskkrav/patchGravidKrav';
import EndringsAarsak from './EndringsAarsak';
import { mapGravidKravPatch } from '../../api/gravidkrav/mapGravidKravPatch';
import GetHandler from '../../api/fetch/GetHandler';
import getNotifikasjonUrl from '../notifikasjon/utils/getNotifikasjonUrl';
import NotifikasjonType from '../notifikasjon/felles/NotifikasjonType';
import GravidKravResponse from '../../api/gravidkrav/GravidKravResponse';
import ValidationResponse from '../../state/validation/ValidationResponse';
import SlettKravModal from '../felles/SlettKravModal/SlettKravModal';

export const GravidKrav = (props: GravidKravProps) => {
  const { t, i18n } = useTranslation();

  const GravidKravReducerSettOpp =
    (Translate: Ii18n): Reducer<GravidKravState, GravidKravAction> =>
    (bulkState: GravidKravState, action: GravidKravAction) =>
      GravidKravReducer(bulkState, action, Translate);

  const GravidKravReducerI18n: Reducer<GravidKravState, GravidKravAction> = GravidKravReducerSettOpp(i18n);

  const [state, dispatch] = useReducer(GravidKravReducerI18n, props.state, defaultGravidKravState);
  const { arbeidsgiverId } = useArbeidsgiver();
  const { language, idKrav } = useParams();

  useEffect(() => {
    document.title = 'Krav om refusjon av sykepenger i arbeidsgiverperioden for gravid ansatt - nav.no';
  }, []);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispatchResponse = (response: ValidationResponse<GravidKravResponse>) => {
    dispatch({
      type: Actions.HandleResponse,
      payload: { response: response }
    });
  };

  const handleCloseNotAuthorized = () => {
    dispatch({ type: Actions.NotAuthorized });
  };

  const handleCancleClicked = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleCloseServerFeil = () => {
    dispatch({ type: Actions.HideServerError });
  };

  const setArbeidsdagerDagerPrAar = (dager: string | undefined) => {
    dispatch({ type: Actions.antallDager, payload: { antallDager: stringishToNumber(dager) } });
  };

  const setEndringsAarsak = (aarsak: EndringsAarsak) => {
    dispatch({
      type: Actions.EndringsAarsak,
      payload: {
        endringsAarsak: aarsak
      }
    });
  };

  const handleSubmitClicked = async () => {
    dispatch({
      type: Actions.Validate
    });
  };

  const handleDeleteClicked = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({
      type: Actions.RemoveBackendError
    });
    setModalOpen(true);
  };

  const onOKClicked = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state.kravId) {
      dispatch({
        type: Actions.ShowSpinner
      });
      const deleteStatus = await deleteGravidKrav(environment.baseUrl, state.kravId);
      if (deleteStatus.status === HttpStatus.Successfully) {
        setModalOpen(false);
        navigate(buildLenke(lenker.GravidKravSlettetKvittering, (language as Language) || Language.nb), {
          replace: true
        });
      } else {
        dispatch({
          type: Actions.AddBackendError,
          payload: { error: 'Sletting av krav feilet' }
        });
      }
      dispatch({
        type: Actions.HideSpinner
      });
    }
  };

  const leggTilPeriode = () => {
    dispatch({
      type: Actions.AddPeriode
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
      if (state.endringskrav) {
        patchGravidKrav(
          environment.baseUrl,
          state.kravId!,
          mapGravidKravPatch(
            state.fnr,
            state.orgnr,
            state.perioder,
            state.dokumentasjon,
            state.bekreft,
            state.antallDager,
            state.endringsAarsak!
          )
        ).then((response) => {
          dispatchResponse(response);
        });
      } else {
        postGravidKrav(
          environment.baseUrl,
          mapGravidKravRequest(
            state.fnr,
            state.orgnr,
            state.perioder,
            state.dokumentasjon,
            state.bekreft,
            state.antallDager
          )
        ).then((response) => {
          dispatchResponse(response);
        });
      }
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
    state.antallDager,
    state.kravId,
    state.endringsAarsak,
    state.endringskrav
  ]);

  useEffect(() => {
    if (idKrav) {
      GetHandler(getNotifikasjonUrl(idKrav, NotifikasjonType.GravidKrav))
        .then((response) => {
          dispatch({
            type: Actions.KravEndring,
            payload: {
              krav: response.json
            }
          });
        })
        .catch(() => {
          dispatch({
            type: Actions.AddBackendError,
            payload: { error: 'Klarte ikke å hente det eksisterende kravet.' }
          });
        });
    }
  }, [idKrav]);

  if (state.kvittering) {
    navigate(buildLenke(lenker.GravidKravKvittering, (language as Language) || Language.nb), { replace: true });
    return null;
  }
  const lenkeGravid = buildLenke(lenker.Gravid, (language as Language) || Language.nb);

  return (
    <Side
      bedriftsmeny={true}
      className='gravidkrav kravside'
      sidetittel={t(GravidKravKeys.GRAVID_KRAV_SIDETITTEL_LITEN)}
      title={t(GravidKravKeys.GRAVID_KRAV_SIDETITTEL_STOR)}
      subtitle={t(GravidKravKeys.GRAVID_KRAV_SIDETITTEL_SUBTITLE)}
    >
      <Row>
        <ServerFeilAdvarsel isOpen={state.serverError} onClose={handleCloseServerFeil} />
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

          {state.endringskrav && (
            <>
              <Panel>
                <SkjemaGruppe aria-live='polite' feilmeldingId={'endring'}>
                  <Row>
                    <Column sm='4' xs='6'>
                      <SelectEndring
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                          setEndringsAarsak(event.target.value as EndringsAarsak)
                        }
                        feil={state.endringsAarsakError}
                      />
                    </Column>
                  </Row>
                </SkjemaGruppe>
              </Panel>
              <Skillelinje />
            </>
          )}
          <Panel id='gravidkrav-panel-den-ansatte'>
            <Systemtittel className='textfelt-padding-bottom'>{t(LangKey.DEN_ANSATTE)}</Systemtittel>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'ansatt'}>
              <Row>
                <Column sm='4' xs='6'>
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
                <Column sm='8' xs='8'>
                  <KontrollSporsmaal
                    onChange={(event) => setArbeidsdagerDagerPrAar(event.target.value)}
                    id='kontrollsporsmaal-lonn-arbeidsdager'
                    feil={state.antallDagerError}
                    defaultValue={state.antallDager}
                  />
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
              <>
                {t(GravidKravKeys.GRAVID_KRAV_ARBEIDSTID_PERIODE)}
                <Hjelpetekst
                  className='krav-padding-hjelpetekst'
                  title={t(GravidKravKeys.GRAVID_KRAV_ARBEIDSTID_HJELPETEKST_TITTEL)}
                >
                  <Oversettelse langKey={GravidKravKeys.GRAVID_KRAV_ARBEIDSTID_HJELPETEKST} />
                </Hjelpetekst>
              </>
            </Ingress>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'arbeidsperiode'}>
              {state.perioder?.map((enkeltPeriode, index) => (
                <KravPeriode
                  dispatch={dispatch}
                  enkeltPeriode={enkeltPeriode}
                  index={index}
                  lonnspliktDager={state.antallDager}
                  key={enkeltPeriode.uniqueKey}
                  slettbar={!!(state && state.perioder && state.perioder?.length > 1)}
                />
              ))}
              <Row>
                <Column md='6'>
                  {state.perioder && state.perioder.length < MAX_PERIODER && (
                    <LeggTilKnapp onClick={leggTilPeriode}>
                      {t(GravidKravKeys.GRAVID_KRAV_LEGG_TIL_PERIODE)}
                    </LeggTilKnapp>
                  )}
                </Column>
              </Row>
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
              {state.endringskrav ? (
                <>{t(GravidKravKeys.GRAVID_KRAV_LONN_ENDRE)} </>
              ) : (
                <>{t(GravidKravKeys.GRAVID_KRAV_LONN_SEND)} </>
              )}
            </Hovedknapp>
            {state.endringskrav && (
              <>
                <Knapp onClick={handleCancleClicked} className='avbrytknapp'>
                  Avbryt
                </Knapp>
                <Fareknapp
                  onClick={handleDeleteClicked}
                  className='sletteknapp'
                  spinner={state.progress}
                  disabled={state.formDirty}
                >
                  Slett krav
                </Fareknapp>
              </>
            )}
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
      <SlettKravModal
        onOKClicked={onOKClicked}
        showSpinner={!!state.showSpinner}
        modalOpen={modalOpen}
        onClose={setModalOpen}
      />
    </Side>
  );
};

export default GravidKrav;
