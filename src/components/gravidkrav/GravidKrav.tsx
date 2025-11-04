import React, { useEffect, useReducer, Reducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import './GravidKrav.scss';
import '../felles/FellesStyling.scss';

import GravidKravProps from './GravidKravProps';
import GravidKravReducer, { MAX_PERIODER } from './GravidKravReducer';
import GravidKravState, { defaultGravidKravState } from './GravidKravState';
import { Actions, GravidKravAction } from './Actions';
import postGravidKrav from '../../api/gravidkrav/postGravidKrav';
import environment from '../../config/environment';
import { mapGravidKravRequest } from '../../api/gravidkrav/mapGravidKravRequest';
import { useTranslation } from 'react-i18next';
import { i18n as Ii18n } from 'i18next';

import { GravidKravKeys } from './GravidKravKeys';
import LangKey from '../../locale/LangKey';
import KravPeriode, { KravPeriodeAction } from '../kroniskkrav/KravPeriode';
import KontrollSporsmaal from '../felles/KontrollSporsmaal/KontrollSporsmaal';
import LoggetUtAdvarsel from '../felles/LoggetUtAdvarsel';
import SelectEndring from '../felles/SelectEndring/SelectEndring';
import deleteGravidKrav from '../../api/gravidkrav/deleteGravidKrav';
import patchGravidKrav from '../../api/kroniskkrav/patchGravidKrav';
import { EndringsAarsak } from './EndringsAarsak';
import { mapGravidKravPatch } from '../../api/gravidkrav/mapGravidKravPatch';
import GetHandler from '../../api/fetch/GetHandler';
import getNotifikasjonUrl from '../notifikasjon/utils/getNotifikasjonUrl';
import NotifikasjonType from '../notifikasjon/felles/NotifikasjonType';
import GravidKravResponse from '../../api/gravidkrav/GravidKravResponse';
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
import HttpStatus from '../../api/HttpStatus';
import { Language } from '../../locale/Language';
import stringishToNumber from '../../utils/stringishToNumber';
import LeggTilKnapp from '../felles/LeggTilKnapp/LeggTilKnapp';
import TextLabel from '../TextLabel';
import DuplicateSubmissionAdvarsel from '../felles/DuplicateSubmissionAdvarsel/DuplicateSubmissionAdvarsel';
import { GravidKrav as GravidKravType } from '../../context/krav';

const GravidKrav = (props: GravidKravProps) => {
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

  const handleCancelClicked = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.href = environment.minSideArbeidsgiver;
  };

  const handleCloseServerFeil = () => {
    dispatch({ type: Actions.HideServerError });
  };

  const handleCloseDuplicateFeil = () => {
    dispatch({ type: Actions.HideDuplicateSubmissionError });
  };

  const setArbeidsdagerDagerPrAar = (dager: string | undefined) => {
    dispatch({ type: Actions.antallDager, payload: { antallDager: stringishToNumber(dager) } });
  };

  const setEndringsAarsak = (aarsak: EndringsAarsak) => {
    dispatch({
      type: Actions.EndringsAarsak,
      payload: {
        aarsakEndring: aarsak
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
            state.bekreft,
            state.antallDager,
            state.aarsakEndring!
          )
        ).then((response) => {
          dispatchResponse(response);
        });
      } else {
        postGravidKrav(
          environment.baseUrl,
          mapGravidKravRequest(state.fnr, state.orgnr, state.perioder, state.bekreft, state.antallDager)
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
    state.aarsakEndring,
    state.endringskrav
  ]);

  useEffect(() => {
    if (idKrav) {
      GetHandler(getNotifikasjonUrl(idKrav, NotifikasjonType.GravidKrav))
        .then((response) => {
          dispatch({
            type: Actions.KravEndring,
            payload: {
              krav: response.json as unknown as GravidKravType
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
  const title = t(GravidKravKeys.GRAVID_KRAV_SIDETITTEL_STOR);
  const subtitle = t(GravidKravKeys.GRAVID_KRAV_SIDETITTEL_SUBTITLE);

  const arbeidstidHjelpetekstTitle = t(GravidKravKeys.GRAVID_KRAV_ARBEIDSTID_HJELPETEKST_TITTEL);
  return (
    <Side
      bedriftsmeny={true}
      className='gravidkrav kravside'
      sidetittel={t(GravidKravKeys.GRAVID_KRAV_SIDETITTEL_LITEN)}
      title={title}
      subtitle={subtitle}
    >
      <ServerFeilAdvarsel isOpen={state.serverError} onClose={handleCloseServerFeil} />
      <DuplicateSubmissionAdvarsel isOpen={state.duplicateSubmission} onClose={handleCloseDuplicateFeil} />

      <Box padding='4' borderRadius='small'>
        <BodyLong size='large' className='textfelt-padding-bottom'>
          <Oversettelse langKey={GravidKravKeys.GRAVID_KRAV_SIDETITTEL_INGRESS} variables={{ lenkeGravid }} />
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
                <SelectEndring
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    setEndringsAarsak(event.target.value as EndringsAarsak)
                  }
                  feil={state.aarsakEndringError}
                />
              </div>
            </Fieldset>
          </Box>
          <Skillelinje />
        </>
      )}
      <Box id='gravidkrav-panel-den-ansatte'>
        <Heading size='medium' level='3' className='textfelt-padding-bottom'>
          {t(LangKey.DEN_ANSATTE)}
        </Heading>
        <Fieldset aria-live='polite' errorId={'ansatt'} legend='' hideLegend={true}>
          <div className='krav-persondata'>
            {/* <div sm='4' xs='6'> */}
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
            {/* </div> */}
            {/* <div sm='8' xs='8'> */}
            <KontrollSporsmaal
              onChange={(event) => setArbeidsdagerDagerPrAar(event.target.value)}
              id='kontrollsporsmaal-lonn-arbeidsdager'
              feil={state.antallDagerError}
              defaultValue={state.antallDager}
            />
            {/* </div> */}
          </div>
        </Fieldset>
      </Box>

      <Skillelinje />

      <Box id='gravidkrav-panel-tapt-arbeidstid'>
        <Heading size='medium' level='3' className='textfelt-padding-bottom'>
          {t(GravidKravKeys.GRAVID_KRAV_ARBEIDSTID_TAPT)}
        </Heading>
        <TextLabel className='textfelt-padding-bottom'>
          <div className='label-med-hjelp'>
            {t(GravidKravKeys.GRAVID_KRAV_ARBEIDSTID_PERIODE)}
            <HelpText className='krav-padding-hjelpetekst' title={arbeidstidHjelpetekstTitle}>
              <Oversettelse langKey={GravidKravKeys.GRAVID_KRAV_ARBEIDSTID_HJELPETEKST} />
            </HelpText>
          </div>
        </TextLabel>
        <Fieldset
          aria-live='polite'
          errorId={'arbeidsperiode'}
          className='krav-kort-wrapper'
          legend='Kravperioder'
          hideLegend={true}
        >
          {state.perioder?.map((enkeltPeriode, index) => (
            <KravPeriode
              dispatch={dispatch as React.Dispatch<KravPeriodeAction>}
              enkeltPeriode={enkeltPeriode}
              index={index}
              lonnspliktDager={state.antallDager}
              key={enkeltPeriode.uniqueKey}
              slettbar={!!(state && state.perioder && state.perioder?.length > 1)}
              // Actions={Actions}
            />
          ))}
          <div>
            {state.perioder && state.perioder.length < MAX_PERIODER && (
              <LeggTilKnapp onClick={leggTilPeriode}>{t(GravidKravKeys.GRAVID_KRAV_LEGG_TIL_PERIODE)}</LeggTilKnapp>
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
            <>{t(GravidKravKeys.GRAVID_KRAV_LONN_ENDRE)} </>
          ) : (
            <>{t(GravidKravKeys.GRAVID_KRAV_LONN_SEND)} </>
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

export default GravidKrav;
