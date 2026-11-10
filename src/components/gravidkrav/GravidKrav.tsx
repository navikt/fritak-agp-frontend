import React, { useEffect, useReducer, Reducer, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
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
import KravPeriode from '../felles/KravPeriode/KravPeriode';
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
import { validateGravidKrav } from './validateGravidKrav';

const buildReducer =
  (Translate: Ii18n): Reducer<GravidKravState, GravidKravAction> =>
  (bulkState: GravidKravState, action: GravidKravAction) =>
    GravidKravReducer(bulkState, action, Translate);

const GravidKrav = (props: GravidKravProps) => {
  const { t, i18n } = useTranslation();
  const { language, idKrav } = useParams();
  const navigate = useNavigate();
  const { arbeidsgiverId } = useArbeidsgiver();

  const [state, dispatch] = useReducer(buildReducer(i18n), props.state, defaultGravidKravState);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const submissionInFlight = useRef(false);

  const dispatchResponse = (response: ValidationResponse<GravidKravResponse>) => {
    dispatch({
      type: Actions.HandleResponse,
      payload: { response: response }
    });
  };

  const setArbeidsdagerDagerPrAar = (dager: string | undefined) => {
    dispatch({ type: Actions.AntallDager, payload: { antallDager: stringishToNumber(dager) } });
  };

  const setEndringsAarsak = (aarsak: EndringsAarsak) => {
    dispatch({
      type: Actions.EndringsAarsak,
      payload: {
        endringsAarsak: aarsak
      }
    });
  };

  const leggTilPeriode = () => {
    dispatch({
      type: Actions.AddPeriode
    });
  };

  const handleSubmitClicked = async () => {
    if (submissionInFlight.current || state.progress) return;

    const validatedState = validateGravidKrav({ ...state, validated: true }, i18n);
    dispatch({ type: Actions.SubmitValidation, payload: { validationResult: validatedState } });
    if (validatedState.feilmeldinger.length > 0) return;

    submissionInFlight.current = true;
    try {
      const { fnr, orgnr, perioder, bekreft, antallDager, endringskrav, kravId, endringsAarsak } = validatedState;
      if (endringskrav) {
        if (!kravId || !endringsAarsak) throw new Error('Endringskrav mangler kravId eller endringsårsak');
        dispatchResponse(
          await patchGravidKrav(
            environment.baseUrl,
            kravId,
            mapGravidKravPatch(fnr, orgnr, perioder, bekreft, antallDager, endringsAarsak)
          )
        );
      } else {
        dispatchResponse(
          await postGravidKrav(environment.baseUrl, mapGravidKravRequest(fnr, orgnr, perioder, bekreft, antallDager))
        );
      }
    } catch {
      dispatchResponse({ status: HttpStatus.Error, violations: [] });
    } finally {
      submissionInFlight.current = false;
    }
  };

  const handleCancelClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.location.href = environment.minSideArbeidsgiver;
  };

  const handleDeleteClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({
      type: Actions.RemoveBackendError
    });
    setModalOpen(true);
  };

  const onOKClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleCloseNotAuthorized = () => {
    dispatch({ type: Actions.NotAuthorized });
  };

  const handleCloseServerFeil = () => {
    dispatch({ type: Actions.HideServerError });
  };

  const handleCloseDuplicateFeil = () => {
    dispatch({ type: Actions.HideDuplicateSubmissionError });
  };

  useEffect(() => {
    document.title = 'Krav om refusjon av sykepenger i arbeidsgiverperioden for gravid ansatt - nav.no';
  }, []);

  useEffect(() => {
    dispatch({
      type: Actions.Orgnr,
      payload: { orgnr: arbeidsgiverId }
    });
  }, [arbeidsgiverId]);

  useEffect(() => {
    if (idKrav) {
      GetHandler(getNotifikasjonUrl(idKrav, NotifikasjonType.GravidKrav))
        .then((response) => {
          dispatch({
            type: Actions.KravEndring,
            payload: {
              krav: response.json as GravidKravType | undefined
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
    return <Navigate to={buildLenke(lenker.GravidKravKvittering, (language as Language) || Language.nb)} replace />;
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
      <Box padding='space-4' borderRadius='2'>
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
          <Box padding='space-4' borderRadius='2'>
            <Fieldset aria-live='polite' errorId={'endring'} legend='Endringsårsak' hideLegend={true}>
              <div>
                <SelectEndring
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    setEndringsAarsak(event.target.value as EndringsAarsak)
                  }
                  feil={state.endringsAarsakError}
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
              enkeltPeriode={enkeltPeriode}
              index={index}
              lonnspliktDager={state.antallDager}
              key={enkeltPeriode.uniqueKey}
              slettbar={!!(state && state.perioder && state.perioder?.length > 1)}
              onFraChange={(fra) => dispatch({ type: Actions.Fra, payload: { fra, itemId: enkeltPeriode.uniqueKey } })}
              onTilChange={(til) => dispatch({ type: Actions.Til, payload: { til, itemId: enkeltPeriode.uniqueKey } })}
              onDagerChange={(dager) =>
                dispatch({ type: Actions.Dager, payload: { dager, itemId: enkeltPeriode.uniqueKey } })
              }
              onBeloepChange={(beloep) =>
                dispatch({ type: Actions.Beloep, payload: { beloep, itemId: enkeltPeriode.uniqueKey } })
              }
              onSykemeldingsgradChange={(sykemeldingsgrad) =>
                dispatch({
                  type: Actions.Sykemeldingsgrad,
                  payload: { sykemeldingsgrad, itemId: enkeltPeriode.uniqueKey }
                })
              }
              onGrunnbeloepChange={(grunnbeloep) =>
                dispatch({ type: Actions.Grunnbeloep, payload: { grunnbeloep, itemId: enkeltPeriode.uniqueKey } })
              }
              onDelete={() => dispatch({ type: Actions.DeletePeriode, payload: { itemId: enkeltPeriode.uniqueKey } })}
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
      <Box padding='space-4' borderRadius='2'>
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
          <Button
            data-color='danger'
            variant='primary'
            onClick={handleDeleteClicked}
            className='sletteknapp'
            loading={state.progress}
          >
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
