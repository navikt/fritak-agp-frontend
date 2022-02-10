import React, { useEffect, useReducer, Reducer, useContext, useState } from 'react';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Fareknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Redirect, useHistory, useParams } from 'react-router-dom';
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
import PathParams from '../../locale/PathParams';
import { useTranslation } from 'react-i18next';
import { i18n } from 'i18next';
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
  Upload,
  HttpStatus
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import { GravidKravKeys } from './GravidKravKeys';
import LangKey from '../../locale/LangKey';
import KravPeriode from '../kroniskkrav/KravPeriode';
import KontrollSporsmaal from '../felles/KontrollSporsmaal/KontrollSporsmaal';
import LoggetUtAdvarsel from '../felles/LoggetUtAdvarsel';
import { KravListeContext } from '../../context/KravListeContext';
import SelectEndring from '../felles/SelectEndring/SelectEndring';
import { Modal } from '@navikt/ds-react';
import deleteGravidKrav from '../../api/gravidkrav/deleteGravidKrav';

export const GravidKrav = (props: GravidKravProps) => {
  const { t, i18n } = useTranslation();
  const { aktivtKrav } = useContext(KravListeContext);
  const [endringskrav, setEndringskrav] = useState<boolean>(false);

  const GravidKravReducerSettOpp =
    (Translate: i18n): Reducer<GravidKravState, GravidKravAction> =>
    (bulkState: GravidKravState, action: GravidKravAction) =>
      GravidKravReducer(bulkState, action, Translate);

  const GravidKravReducerI18n: Reducer<GravidKravState, GravidKravAction> = GravidKravReducerSettOpp(i18n);

  const [state, dispatch] = useReducer(GravidKravReducerI18n, props.state, defaultGravidKravState);
  const { arbeidsgiverId } = useArbeidsgiver();
  const { language } = useParams<PathParams>();
  const [deleteSpinner, setDeleteSpinner] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const history = useHistory();

  const handleCloseNotAuthorized = () => {
    dispatch({ type: Actions.NotAuthorized });
  };

  const handleCancleClicked = (event: React.FormEvent) => {
    event.preventDefault();
    history.go(-1);
  };

  const setArbeidsdagerDagerPrAar = (dager: string | undefined) => {
    dispatch({ type: Actions.antallDager, payload: { antallDager: stringishToNumber(dager) } });
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

  const handleDeleteClicked = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({
      type: Actions.RemoveBackendError
    });
    setModalOpen(true);
  };

  const handleDeleteOKClicked = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state.kravId) {
      setDeleteSpinner(true);
      const deleteStatus = await deleteGravidKrav(environment.baseUrl, state.kravId);
      if (deleteStatus.status !== HttpStatus.Successfully) {
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
    state.antallDager
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
    Modal.setAppElement!('.gravidkrav');
  }, []);

  if (state.kvittering) {
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

          {endringskrav && (
            <>
              <Panel>
                <SkjemaGruppe aria-live='polite' feilmeldingId={'endring'}>
                  <Row>
                    <Column sm='4' xs='6'>
                      <SelectEndring />
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
                  lonnspliktDager={state.antallDager}
                  key={enkeltPeriode.uniqueKey}
                  slettbar={!!(state && state.perioder && state.perioder?.length > 1)}
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
              {endringskrav ? (
                <>{t(GravidKravKeys.GRAVID_KRAV_LONN_ENDRE)} </>
              ) : (
                <>{t(GravidKravKeys.GRAVID_KRAV_LONN_SEND)} </>
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

export default GravidKrav;
