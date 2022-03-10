import React, { Reducer, useContext, useEffect, useReducer, useState } from 'react';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Fareknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import './KroniskKrav.scss';
import '../felles/FellesStyling.scss';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import KroniskKravProps from './KroniskKravProps';
import KroniskKravReducer from './KroniskKravReducer';
import KroniskKravState, { defaultKroniskKravState } from './KroniskKravState';
import { Actions, KroniskKravAction } from './Actions';
import postKroniskKrav from '../../api/kroniskkrav/postKroniskKrav';
import environment from '../../config/environment';
import { mapKroniskKravRequest } from '../../api/kroniskkrav/mapKroniskKravRequest';
import KravPeriode from './KravPeriode';
import PathParams from '../../locale/PathParams';
import { useTranslation } from 'react-i18next';
import { MAX_PERIODER } from '../gravidkrav/GravidKravReducer';
import {
  Side,
  Oversettelse,
  BekreftOpplysningerPanel,
  Feilmeldingspanel,
  Fnr,
  Skillelinje,
  useArbeidsgiver,
  stringishToNumber,
  LeggTilKnapp,
  HttpStatus
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import { i18n } from 'i18next';
import { KroniskKravKeys } from './KroniskKravKeys';
import LangKey from '../../locale/LangKey';
import KontrollSporsmaal from '../felles/KontrollSporsmaal/KontrollSporsmaal';
import LoggetUtAdvarsel from '../felles/LoggetUtAdvarsel';
import { KravListeContext } from '../../context/KravListeContext';
import SelectEndring from '../felles/SelectEndring/SelectEndring';
import deleteKroniskKrav from '../../api/kroniskkrav/deleteKroniskKrav';
import { Modal } from '@navikt/ds-react';
import patchKroniskKrav from '../../api/kroniskkrav/patchKroniskKrav';
import { mapKroniskKravPatch } from '../../api/kroniskkrav/mapKroniskKravPatch';
import EndringsAarsak from '../gravidkrav/EndringsAarsak';

const buildReducer =
  (Translate: i18n): Reducer<KroniskKravState, KroniskKravAction> =>
  (bulkState: KroniskKravState, action: KroniskKravAction) =>
    KroniskKravReducer(bulkState, action, Translate);

export const KroniskKrav = (props: KroniskKravProps) => {
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useReducer(buildReducer(i18n), props.state, defaultKroniskKravState);
  const { arbeidsgiverId } = useArbeidsgiver();
  let { language } = useParams<PathParams>();
  const { aktivtKrav } = useContext(KravListeContext);
  const [endringskrav, setEndringskrav] = useState<boolean>(false);
  const [deleteSpinner, setDeleteSpinner] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const history = useHistory();

  const handleCloseNotAuthorized = () => {
    dispatch({ type: Actions.NotAuthorized });
  };

  const setArbeidsdagerDagerPrAar = (dager: string | undefined) => {
    dispatch({ type: Actions.antallDager, payload: { antallDager: stringishToNumber(dager) } });
  };

  const handleSubmitClicked = async () => {
    dispatch({
      type: Actions.Validate
    });
  };

  const leggTilPeriode = () => {
    dispatch({
      type: Actions.AddPeriod
    });
  };

  const handleCancleClicked = (event: React.FormEvent) => {
    event.preventDefault();
    history.go(-1);
  };

  const handleDeleteClicked = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({
      type: Actions.RemoveBackendError
    });
    setModalOpen(true);
  };

  const setEndringsAarsak = (aarsak: EndringsAarsak) => {
    dispatch({
      type: Actions.EndringsAarsak,
      payload: {
        endringsAarsak: aarsak
      }
    });
  };

  const handleDeleteOKClicked = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state.kravId) {
      setDeleteSpinner(true);
      const deleteStatus = await deleteKroniskKrav(environment.baseUrl, state.kravId);
      if (deleteStatus.status === HttpStatus.Successfully) {
        setModalOpen(false);
        history.replace(buildLenke(lenker.KroniskKravSlettetKvittering, language));
      } else {
        dispatch({
          type: Actions.AddBackendError,
          payload: { error: 'Sletting av krav feilet' }
        });
      }
      setDeleteSpinner(false);
    }
  };

  useEffect(() => {
    dispatch({
      type: Actions.Orgnr,
      payload: { orgnr: arbeidsgiverId }
    });
  }, [arbeidsgiverId]);

  useEffect(() => {
    if (state.validated === true && state.progress === true && state.submitting === true) {
      if (endringskrav) {
        if (!state.endringsAarsak) {
          dispatch({
            type: Actions.AddBackendError,
            payload: { error: 'Angi årsak til endring' }
          });
        } else {
          patchKroniskKrav(
            environment.baseUrl,
            state.kravId!,
            mapKroniskKravPatch(
              state.fnr,
              state.orgnr,
              state.perioder,
              state.bekreft,
              state.antallDager,
              state.endringsAarsak
            )
          ).then((response) => {
            dispatch({
              type: Actions.HandleResponse,
              payload: { response: response }
            });
          });
        }
      } else {
        postKroniskKrav(
          environment.baseUrl,
          mapKroniskKravRequest(state.fnr, state.orgnr, state.perioder, state.bekreft, state.antallDager)
        ).then((response) => {
          dispatch({
            type: Actions.HandleResponse,
            payload: { response: response }
          });
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
    state.orgnr,
    state.antallDager,
    state.kravId,
    state.endringsAarsak,
    endringskrav
  ]);

  useEffect(() => {
    if (aktivtKrav) {
      setEndringskrav(true);
      dispatch({
        type: Actions.KravEndring,
        payload: {
          krav: aktivtKrav
        }
      });
    } else {
      setEndringskrav(false);
    }
  }, [aktivtKrav]);

  useEffect(() => {
    Modal.setAppElement!('.kroniskkrav');
  }, []);

  if (state.kvittering) {
    return <Redirect to={buildLenke(lenker.KroniskKravKvittering, language)} />;
  }

  return (
    <Side
      bedriftsmeny={true}
      className='kroniskkrav'
      sidetittel={t(KroniskKravKeys.KRONISK_KRAV_SIDETITTEL)}
      title={t(KroniskKravKeys.KRONISK_KRAV_TITLE)}
      subtitle={t(KroniskKravKeys.KRONISK_KRAV_SUBTITLE)}
    >
      <Row>
        <Column>
          <Panel>
            <Ingress className='textfelt-padding-bottom'>
              <Oversettelse
                langKey={KroniskKravKeys.KRONISK_KRAV_INFO}
                variables={{
                  lenkeGravid: buildLenke(lenker.Gravid, language)
                }}
              />
            </Ingress>
            <Ingress>
              <Oversettelse langKey={LangKey.ALLE_FELT_PAKREVD} />
            </Ingress>
          </Panel>
          <Skillelinje />

          {endringskrav && (
            <>
              <Panel>
                <SkjemaGruppe aria-live='polite' feilmeldingId={'endring'}>
                  <Row>
                    <Column sm='4' xs='6'>
                      <SelectEndring
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                          setEndringsAarsak(event.target.value as EndringsAarsak)
                        }
                      />
                    </Column>
                  </Row>
                </SkjemaGruppe>
              </Panel>
              <Skillelinje />
            </>
          )}

          <Panel id='kroniskkrav-panel-den-ansatte'>
            <Systemtittel className='textfelt-padding-bottom'>{t(KroniskKravKeys.KRONISK_KRAV_EMPLOYEE)}</Systemtittel>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'ansatt'}>
              <Row>
                <Column sm='4' xs='6'>
                  <Fnr
                    id='fnr'
                    label={t(LangKey.FODSELSNUMMER_LABEL)}
                    fnr={state.fnr}
                    placeholder={t(LangKey.FODSELSNUMMER_PLACEHOLDER)}
                    feilmelding={state.fnrError}
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

          <Panel id='kroniskkrav-panel-tapt-arbeidstid'>
            <Systemtittel className='textfelt-padding-bottom'>
              {t(KroniskKravKeys.KRONISK_KRAV_ARBEIDSTID_TAPT)}
            </Systemtittel>
            <Ingress tag='span' className='textfelt-padding-bottom'>
              {t(KroniskKravKeys.KRONISK_KRAV_PERIOD_AWAY)}
              <Hjelpetekst className='krav-padding-hjelpetekst'>
                <Oversettelse langKey={KroniskKravKeys.KRONISK_KRAV_PERIOD_INFO} />
              </Hjelpetekst>
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
                    <LeggTilKnapp onClick={leggTilPeriode}>{t(KroniskKravKeys.KRONISK_KRAV_ADD_PERIOD)}</LeggTilKnapp>
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
              {endringskrav ? (
                <>{t(KroniskKravKeys.KRONISK_KRAV_ENDRE)}</>
              ) : (
                <>{t(KroniskKravKeys.KRONISK_KRAV_SUBMIT)}</>
              )}
            </Hovedknapp>
            {endringskrav && (
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
      <Modal
        shouldCloseOnOverlayClick={false}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className='kroniskkrav-modal'
      >
        <Modal.Content>
          <span className='kroniskkrav-modal-text'>Er du sikker på at du vil slette kravet?</span>
          <div className='kroniskkrav-modal-buttons'>
            <Knapp onClick={() => setModalOpen(false)}>Nei</Knapp>
            <Hovedknapp onClick={(event) => handleDeleteOKClicked(event)} spinner={deleteSpinner}>
              Ja
            </Hovedknapp>
          </div>
        </Modal.Content>
      </Modal>
    </Side>
  );
};

export default KroniskKrav;
