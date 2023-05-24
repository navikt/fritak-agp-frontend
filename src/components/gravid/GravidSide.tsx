import React, { Reducer, useContext, useEffect, useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import './GravidSide.scss';
import '../felles/FellesStyling.scss';
import GravidProgress from './GravidProgress';
import Orgnr from '../felles/Orgnr/Orgnr';
import GravidSideProps from './GravidSideProps';
import getBase64file from '../../utils/getBase64File';
import GravidReducer from './GravidReducer';
import GravidState, { defaultGravidState } from './GravidState';
import { Actions, GravidAction } from './Actions';
import TiltakCheckboxes from './TiltakCheckboxes';
import OmplasseringCheckboxes from './OmplasseringCheckboxes';
import AarsakCheckboxes from './AarsakCheckboxes';
import { Tiltak } from './Tiltak';
import { Omplassering } from './Omplassering';
import environment from '../../config/environment';
import postGravid from '../../api/gravid/postGravid';
import { mapGravidRequest } from '../../api/gravid/mapGravidRequest';
import { useTranslation } from 'react-i18next';
import { i18n } from 'i18next';
import LangKey from '../../locale/LangKey';
import lenker, { buildLenke } from '../../config/lenker';
import { GravidSideKeys } from './GravidSideKeys';
import { useNavigate, useParams } from 'react-router-dom';
import LoggetUtAdvarsel from '../felles/LoggetUtAdvarsel';
import { GravidSoknadKvitteringContext } from '../../context/GravidSoknadKvitteringContext';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  Alert,
  BodyLong,
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  Ingress,
  Panel,
  RadioGroup,
  Radio,
  Textarea
} from '@navikt/ds-react';
import '@navikt/ds-css';
import Fnr from '../felles/Fnr/Fnr';
import ServerFeilAdvarsel from '../felles/ServerFeilAdvarsel/ServerFeilAdvarsel';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import BekreftOpplysningerPanel from '../felles/BekreftOpplysningerPanel/BekreftOpplysningerPanel';
import Datovelger from '../datovelger/Datovelger';
import Feilmeldingspanel from '../felles/Feilmeldingspanel/Feilmeldingspanel';
import Skillelinje from '../felles/Skillelinje';
import Side from '../felles/Side/Side';
import Upload from '../felles/Upload/Upload';
import Language from '../../locale/Language';

export const MAX_TILTAK_BESKRIVELSE = 2000;

const GravidSide = (props: GravidSideProps) => {
  const { t, i18n } = useTranslation();
  const { language } = useParams();
  const { saveResponse } = useContext(GravidSoknadKvitteringContext);

  const navigate = useNavigate();

  const GravidReducerSettOpp =
    (Translate: i18n): Reducer<GravidState, GravidAction> =>
    (bulkState: GravidState, action: GravidAction) =>
      GravidReducer(bulkState, action, Translate);

  const GravidReducerI18n: Reducer<GravidState, GravidAction> = GravidReducerSettOpp(i18n);

  const handleTilretteleggingChange = (val: string) => {
    dispatch({
      type: Actions.Tilrettelegge,
      payload: { tilrettelegge: val === 'ja' }
    });
  };
  const [state, dispatch] = useReducer(GravidReducerI18n, props.state, defaultGravidState);
  dayjs.extend(customParseFormat);

  useEffect(() => {
    document.title = 'Søknad om at NAV dekker sykepenger i arbeidsgiverperioden for gravid ansatt - nav.no';
  }, []);

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
    dispatch({ type: Actions.Validate });
  };
  const handleCloseServerFeil = () => {
    dispatch({ type: Actions.HideServerError });
  };
  const handleCloseNotAuthorized = () => {
    dispatch({ type: Actions.NotAuthorized });
  };

  const isCheckboxChecked = (checkbox: Tiltak): boolean => {
    const foundElement = state.tiltak?.find((element) => {
      return element === checkbox;
    });

    return !!foundElement;
  };

  useEffect(() => {
    if (state.validated === true && state.progress === true && state.submitting === true) {
      postGravid(
        environment.baseUrl,
        mapGravidRequest(
          state.fnr,
          state.orgnr,
          state.tilrettelegge,
          state.tiltak,
          state.tiltakBeskrivelse,
          state.omplassering,
          state.omplasseringAarsak,
          state.dokumentasjon,
          state.bekreft,
          state.termindato
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
    state.tilrettelegge,
    state.omplassering,
    state.omplasseringAarsak,
    state.tiltak,
    state.tiltakBeskrivelse,
    state.fnr,
    state.bekreft,
    state.dokumentasjon,
    state.orgnr,
    state.termindato
  ]);

  if (state.kvittering) {
    navigate(buildLenke(lenker.GravidKvittering, language as Language), { replace: true });
    return null;
  }

  const title = t(GravidSideKeys.GRAVID_SIDE_TITTEL);
  const subtitle = t(GravidSideKeys.GRAVID_SIDE_UNDERTITTEL);

  return (
    <Side
      bedriftsmeny={false}
      className='gravid-side'
      sidetittel={t(LangKey.SOKNADSSKJEMA)}
      title={title}
      subtitle={subtitle}
    >
      <ServerFeilAdvarsel isOpen={state.serverError} onClose={handleCloseServerFeil} />

      {!!state.progress && <GravidProgress />}

      {!state.progress && !state.kvittering && (
        <div>
          <Panel>
            <Ingress>
              <Oversettelse langKey={GravidSideKeys.GRAVID_SIDE_INGRESS} />
            </Ingress>
          </Panel>

          <Skillelinje />

          <Panel id='gravidside-panel-ansatte' className='gravidside-panel-ansatte'>
            <SkjemaGruppe aria-live='polite'>
              <Row>
                <Column md='3' xs='12'>
                  <Heading size='medium' level='3' className='textfelt-padding-bottom'>
                    {t(LangKey.DEN_ANSATTE)}
                  </Heading>
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
                <Column md='3' xs='12'>
                  <Heading size='medium' level='3' className='textfelt-padding-bottom'>
                    &nbsp;
                  </Heading>
                  <Datovelger
                    id='termindato'
                    label={t(GravidSideKeys.GRAVID_SIDE_TERMINDATO)}
                    error={state.termindatoError}
                    defaultSelected={dayjs(state.termindato?.value, 'DD.MM.YYYY').toDate()}
                    onDateChange={(termindato: Date | undefined) => {
                      dispatch({
                        type: Actions.Termindato,
                        payload: { termindato }
                      });
                    }}
                  />
                </Column>
                <Column md='3' xs='12'>
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

          <Panel className='gravidside-panel-arbeidssituasjon'>
            <Row>
              <Column sm='8' xs='12'>
                <Heading size='medium' level='3' className='textfelt-padding-bottom'>
                  {t(GravidSideKeys.GRAVID_SIDE_ARBEIDSMILJO)}
                </Heading>

                <Oversettelse
                  className='arbeidsmiljo-ingress'
                  langKey={GravidSideKeys.GRAVID_SIDE_ARBEIDSMILJO_INGRESS}
                />
                <RadioGroup
                  legend={t(GravidSideKeys.GRAVID_SIDE_TILRETTELEGGING)}
                  className='gravidside-radiogruppe-tilrettelegging'
                  onChange={(val: any) => handleTilretteleggingChange(val)}
                >
                  <Radio name='sitteplass' value='ja' defaultChecked={state.tilrettelegge === true}>
                    {t(LangKey.JA)}
                  </Radio>
                  <Radio name='sitteplass' value='nei' defaultChecked={state.tilrettelegge === false}>
                    {t(LangKey.NEI)}
                  </Radio>
                </RadioGroup>
              </Column>
            </Row>
          </Panel>

          {state.tilrettelegge === true ? (
            <Panel className='gravidside-panel-tiltak'>
              <CheckboxGroup
                legend={t(GravidSideKeys.GRAVID_SIDE_TILTAK_TITTEL)}
                error={state.tiltakError}
                errorId='tiltakFeilmeldingId'
              >
                {TiltakCheckboxes.map((a) => {
                  return (
                    <Checkbox
                      defaultChecked={isCheckboxChecked(a.value)}
                      key={a.id}
                      id={a.id}
                      onChange={() =>
                        dispatch({
                          type: Actions.ToggleTiltak,
                          payload: { tiltak: a.value }
                        })
                      }
                      value={a.value}
                    >
                      {t(a.label)}
                    </Checkbox>
                  );
                })}

                <Textarea
                  label={t(GravidSideKeys.GRAVID_SIDE_TILTAK_FRITEKST)}
                  value={state.tiltakBeskrivelse || ''}
                  error={state.tiltakBeskrivelseError}
                  onChange={(evt) =>
                    dispatch({
                      type: Actions.TiltakBeskrivelse,
                      payload: {
                        tiltakBeskrivelse: evt.currentTarget.value
                      }
                    })
                  }
                  disabled={!state?.tiltak?.includes(Tiltak.ANNET)}
                  maxLength={MAX_TILTAK_BESKRIVELSE}
                />
              </CheckboxGroup>

              <div className='gravid-side-radiogruppe-omplassering'>
                <RadioGroup
                  legend={t(GravidSideKeys.GRAVID_SIDE_OMPLASSERING_TITTEL)}
                  defaultValue={state.omplassering}
                  error={state.omplasseringError}
                  id='omplasseringFeilmeldingId'
                  onChange={(value) =>
                    dispatch({
                      type: Actions.OmplasseringForsoek,
                      payload: { omplasseringForsoek: value }
                    })
                  }
                >
                  {OmplasseringCheckboxes.map((a) => {
                    return (
                      <Radio key={a.value} name='omplassering' value={a.value}>
                        {t(a.label)}
                      </Radio>
                    );
                  })}

                  <RadioGroup
                    className='gravideside-radiogruppe-indentert'
                    defaultValue={state.omplasseringAarsak}
                    legend={t(GravidSideKeys.GRAVID_SIDE_OMPLASSERING_IKKE_MULIG_AARSAK)}
                    onChange={(value) =>
                      dispatch({
                        type: Actions.OmplasseringAarsak,
                        payload: { omplasseringAarsak: value }
                      })
                    }
                  >
                    {AarsakCheckboxes.map((a) => (
                      <Radio
                        key={a.value}
                        name='omplassering-umulig'
                        disabled={state.omplassering !== Omplassering.IKKE_MULIG}
                        value={a.value}
                      >
                        {t(a.label)}
                      </Radio>
                    ))}
                  </RadioGroup>
                </RadioGroup>
              </div>
            </Panel>
          ) : (
            state.tilrettelegge === false && (
              <>
                <Skillelinje />
                <Panel className='gravidside-panel-alert-gravid'>
                  <Alert className='gravidside-alert-gravid' variant='warning'>
                    <BodyLong>
                      <>
                        {t(GravidSideKeys.GRAVID_SIDE_IKKE_KOMPLETT_1)}
                        <button
                          className='lenke gravidside-lenke-knapp'
                          onClick={() =>
                            dispatch({
                              type: Actions.Videre,
                              payload: { videre: true }
                            })
                          }
                        >
                          {t(GravidSideKeys.GRAVID_SIDE_IKKE_KOMPLETT_2)}
                        </button>
                        {t(GravidSideKeys.GRAVID_SIDE_IKKE_KOMPLETT_3)}
                      </>
                    </BodyLong>
                  </Alert>
                </Panel>
              </>
            )
          )}

          {(state.tilrettelegge === true || state.videre) && (
            <>
              <Skillelinje />

              <Panel>
                <Heading size='medium' level='3' className='textfelt-padding-bottom'>
                  {t(GravidSideKeys.GRAVID_SIDE_DOKUMENTASJON_TITTEL)}
                </Heading>
                <SkjemaGruppe
                  feil={state.dokumentasjonError}
                  feilmeldingId='dokumentasjonFeilmeldingId'
                  aria-live='polite'
                >
                  <Oversettelse langKey={GravidSideKeys.GRAVID_SIDE_DOKUMENTASJON_INGRESS} />
                  <Upload
                    id='upload'
                    fileSize={5000000}
                    className='knapp-innsending-top'
                    label={t(GravidSideKeys.GRAVID_SIDE_OPPLASTINGSKNAPP)}
                    extensions='.pdf'
                    onChange={handleUploadChanged}
                    onDelete={handleDelete}
                  />
                </SkjemaGruppe>
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
                <Button onClick={handleSubmitClicked}>{t(GravidSideKeys.GRAVID_SIDE_SEND_SOKNAD)}</Button>
              </Panel>
            </>
          )}
        </div>
      )}

      {state.notAuthorized && (
        <LoggetUtAdvarsel
          onClose={handleCloseNotAuthorized}
          tokenFornyet={lenker.TokenFornyet}
          loginServiceUrl={environment.loginServiceUrl}
        />
      )}
    </Side>
  );
};

export default GravidSide;
