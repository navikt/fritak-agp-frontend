import React, { Reducer, useEffect, useReducer, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import './KroniskKrav.scss';
import '../felles/FellesStyling.scss';
import KroniskKravProps from './KroniskKravProps';
import KroniskKravReducer from './KroniskKravReducer';
import KroniskKravState, { defaultKroniskKravState } from './KroniskKravState';
import { Actions, KroniskKravAction } from './Actions';
import postKroniskKrav from '../../api/kroniskkrav/postKroniskKrav';
import environment from '../../config/environment';
import { mapKroniskKravRequest } from '../../api/kroniskkrav/mapKroniskKravRequest';
import KravPeriode from './KravPeriode';
import { useTranslation } from 'react-i18next';
import { MAX_PERIODER } from '../gravidkrav/GravidKravReducer';
import { i18n as Ii18n } from 'i18next';
import { KroniskKravKeys } from './KroniskKravKeys';
import LangKey from '../../locale/LangKey';
import KontrollSporsmaal from '../felles/KontrollSporsmaal/KontrollSporsmaal';
import LoggetUtAdvarsel from '../felles/LoggetUtAdvarsel';
import SelectEndring from '../felles/SelectEndring/SelectEndring';
import deleteKroniskKrav from '../../api/kroniskkrav/deleteKroniskKrav';
import patchKroniskKrav from '../../api/kroniskkrav/patchKroniskKrav';
import { mapKroniskKravPatch } from '../../api/kroniskkrav/mapKroniskKravPatch';
import EndringsAarsak from '../gravidkrav/EndringsAarsak';
import NotifikasjonType from '../notifikasjon/felles/NotifikasjonType';
import getNotifikasjonUrl from '../notifikasjon/utils/getNotifikasjonUrl';
import GetHandler from '../../api/fetch/GetHandler';
import KroniskKravResponse from '../../api/gravidkrav/KroniskKravResponse';
import { ValidationResponse } from '../../state/validation/ValidationResponse';
import SlettKravModal from '../felles/SlettKravModal/SlettKravModal';
import { BodyLong, Box, Button, Fieldset, Heading, HelpText } from '@navikt/ds-react';
import Fnr from '../felles/Fnr/Fnr';
import ServerFeilAdvarsel from '../felles/ServerFeilAdvarsel/ServerFeilAdvarsel';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import BekreftOpplysningerPanel from '../felles/BekreftOpplysningerPanel/BekreftOpplysningerPanel';
import Feilmeldingspanel from '../felles/Feilmeldingspanel/Feilmeldingspanel';
import Skillelinje from '../felles/Skillelinje';
import Side from '../felles/Side/Side';
import { useArbeidsgiver } from '../../context/arbeidsgiver/ArbeidsgiverContext';
import Language from '../../locale/Language';
import HttpStatus from '../../api/HttpStatus';
import stringishToNumber from '../../utils/stringishToNumber';
import LeggTilKnapp from '../felles/LeggTilKnapp/LeggTilKnapp';
import TextLabel from '../TextLabel';
import textify from '../../utils/textify';
import DuplicateSubmissionAdvarsel from '../felles/DuplicateSubmissionAdvarsel/DuplicateSubmissionAdvarsel';

const buildReducer =
  (Translate: Ii18n): Reducer<KroniskKravState, KroniskKravAction> =>
  (bulkState: KroniskKravState, action: KroniskKravAction) =>
    KroniskKravReducer(bulkState, action, Translate);

const KroniskKrav = (props: KroniskKravProps) => {
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useReducer(buildReducer(i18n), props.state, defaultKroniskKravState);
  const { arbeidsgiverId } = useArbeidsgiver();
  const { language, idKrav } = useParams();

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    document.title =
      'Krav om refusjon av sykepenger i arbeidsgiverperioden ved kronisk eller langvarig syk ansatt - nav.no';
  }, []);

  const dispatchResponse = (response: ValidationResponse<KroniskKravResponse>) => {
    dispatch({
      type: Actions.HandleResponse,
      payload: { response: response }
    });
  };

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

  const handleCloseServerFeil = () => {
    dispatch({ type: Actions.HideServerError });
  };

  const handleCloseDuplicateFeil = () => {
    dispatch({ type: Actions.HideDuplicateSubmissionError });
  };

  const leggTilPeriode = () => {
    dispatch({
      type: Actions.AddPeriod
    });
  };

  const handleCancelClicked = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.href = environment.minSideArbeidsgiver;
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

  const onOKClicked = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state.kravId) {
      dispatch({
        type: Actions.ShowSpinner
      });
      const deleteStatus = await deleteKroniskKrav(environment.baseUrl, state.kravId);
      if (deleteStatus.status === HttpStatus.Successfully) {
        setModalOpen(false);
        navigate(buildLenke(lenker.KroniskKravSlettetKvittering, (language as Language) || Language.nb), {
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

  useEffect(() => {
    if (arbeidsgiverId.length > 0) {
      dispatch({
        type: Actions.Orgnr,
        payload: { orgnr: arbeidsgiverId }
      });
    }
  }, [arbeidsgiverId]);

  useEffect(() => {
    if (state.validated === true && state.progress === true && state.submitting === true) {
      if (state.endringskrav) {
        patchKroniskKrav(
          environment.baseUrl,
          state.kravId!,
          mapKroniskKravPatch(
            state.fnr,
            state.orgnr,
            state.perioder,
            state.bekreft,
            state.antallDager,
            state.endringsAarsak!
          )
        ).then((response) => {
          dispatchResponse(response);
        });
      } else {
        postKroniskKrav(
          environment.baseUrl,
          mapKroniskKravRequest(state.fnr, state.orgnr, state.perioder, state.bekreft, state.antallDager)
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
    state.orgnr,
    state.antallDager,
    state.kravId,
    state.endringsAarsak,
    state.endringskrav
  ]);

  useEffect(() => {
    if (idKrav) {
      GetHandler(getNotifikasjonUrl(idKrav, NotifikasjonType.KroniskKrav))
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
    navigate(buildLenke(lenker.KroniskKravKvittering, (language as Language) || Language.nb), { replace: true });
    return null;
  }

  return (
    <Side
      bedriftsmeny={true}
      className='kroniskkrav kravside'
      sidetittel={t(KroniskKravKeys.KRONISK_KRAV_SIDETITTEL)}
      title={textify(t(KroniskKravKeys.KRONISK_KRAV_TITLE))}
      subtitle={textify(t(KroniskKravKeys.KRONISK_KRAV_SUBTITLE))}
    >
      <ServerFeilAdvarsel isOpen={state.serverError} onClose={handleCloseServerFeil} />
      <DuplicateSubmissionAdvarsel isOpen={state.duplicateSubmission} onClose={handleCloseDuplicateFeil} />

      <Box padding='4' borderRadius='small'>
        <BodyLong size='large' className='textfelt-padding-bottom'>
          <Oversettelse
            langKey={KroniskKravKeys.KRONISK_KRAV_INFO}
            variables={{
              lenkeKronisk: buildLenke(lenker.Kronisk, language as Language)
            }}
          />
        </BodyLong>
        <BodyLong size='large'>
          <Oversettelse langKey={LangKey.ALLE_FELT_PAKREVD} />
        </BodyLong>
      </Box>
      <Skillelinje />

      {state.endringskrav && (
        <>
          <Box padding='4' borderRadius='small'>
            <Fieldset aria-live='polite' errorId={'endring'} legend='Endringsårsak' hideLegend={true}>
              <div>
                <div>
                  <SelectEndring
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setEndringsAarsak(event.target.value as EndringsAarsak)
                    }
                    feil={state.endringsAarsakError}
                  />
                </div>
              </div>
            </Fieldset>
          </Box>
          <Skillelinje />
        </>
      )}

      <Box id='kroniskkrav-panel-den-ansatte'>
        <Heading size='medium' level='2' className='textfelt-padding-bottom'>
          {t(KroniskKravKeys.KRONISK_KRAV_EMPLOYEE)}
        </Heading>
        <Fieldset
          aria-live='polite'
          errorId={'ansatt'}
          legend={t(KroniskKravKeys.KRONISK_KRAV_EMPLOYEE)}
          hideLegend={true}
        >
          <div className='krav-persondata'>
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
              className='krav-fnr'
            />

            <div>
              <KontrollSporsmaal
                onChange={(event) => setArbeidsdagerDagerPrAar(event.target.value)}
                id='kontrollsporsmaal-lonn-arbeidsdager'
                feil={state.antallDagerError}
                defaultValue={state.antallDager}
              />
            </div>
          </div>
        </Fieldset>
      </Box>

      <Skillelinje />

      <Box id='kroniskkrav-panel-tapt-arbeidstid'>
        <Heading size='medium' level='3' className='textfelt-padding-bottom'>
          {t(KroniskKravKeys.KRONISK_KRAV_ARBEIDSTID_TAPT)}
        </Heading>
        <TextLabel className='textfelt-padding-bottom'>
          <div className='label-med-hjelp'>
            {t(KroniskKravKeys.KRONISK_KRAV_PERIOD_AWAY)}
            <HelpText className='krav-padding-hjelpetekst'>
              <Oversettelse langKey={KroniskKravKeys.KRONISK_KRAV_PERIOD_INFO} />
            </HelpText>
          </div>
        </TextLabel>
        <Fieldset
          aria-live='polite'
          errorId={'arbeidsperiode'}
          className='krav-kort-wrapper'
          legend='Krav periode'
          hideLegend={true}
        >
          {state.perioder?.map((enkeltPeriode, index) => (
            <KravPeriode
              dispatch={dispatch}
              enkeltPeriode={enkeltPeriode}
              index={index}
              lonnspliktDager={state.antallDager}
              key={enkeltPeriode.uniqueKey}
              slettbar={!!(state && state.perioder && state.perioder?.length > 1)}
              Actions={Actions}
            />
          ))}
          <div>
            {state.perioder && state.perioder.length < MAX_PERIODER && (
              <LeggTilKnapp onClick={leggTilPeriode}>{t(KroniskKravKeys.KRONISK_KRAV_ADD_PERIOD)}</LeggTilKnapp>
            )}
          </div>
        </Fieldset>
      </Box>
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

      <Box padding='4' borderRadius='small'>
        <Button onClick={handleSubmitClicked} loading={state.progress}>
          {state.endringskrav ? (
            <>{t(KroniskKravKeys.KRONISK_KRAV_ENDRE)}</>
          ) : (
            <>{t(KroniskKravKeys.KRONISK_KRAV_SUBMIT)}</>
          )}
        </Button>
        <Button variant='secondary' onClick={handleCancelClicked} className='avbrytknapp'>
          Avbryt
        </Button>
        {state.endringskrav && (
          <Button variant='danger' onClick={handleDeleteClicked} className='sletteknapp' loading={state.progress}>
            Annuller krav
          </Button>
        )}
      </Box>

      {state.notAuthorized && (
        <LoggetUtAdvarsel
          onClose={handleCloseNotAuthorized}
          tokenFornyet={lenker.TokenFornyet}
          loginServiceUrl={environment.loginServiceUrl}
        />
      )}

      <SlettKravModal
        onOKClicked={onOKClicked}
        showSpinner={!!state.showSpinner}
        modalOpen={modalOpen}
        onClose={setModalOpen}
      />
    </Side>
  );
};

export default KroniskKrav;
