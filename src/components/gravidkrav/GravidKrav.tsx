import React, { useEffect, useReducer, Reducer } from 'react';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import Skillelinje from '../felles/Skillelinje/Skillelinje';
import Fnr from '../felles/Fnr/Fnr';
import { Input, Label, SkjemaGruppe } from 'nav-frontend-skjema';
import Upload from '../felles/Upload/Upload';
import { Hovedknapp } from 'nav-frontend-knapper';
import LoggetUtAdvarsel from '../felles/login/LoggetUtAdvarsel';
import { DatoVelger } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Redirect, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import './GravidKrav.scss';
import '../felles/FellesStyling.scss';
import '@navikt/helse-arbeidsgiver-felles-frontend/lib/js/components/DatoVelger.css';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import GravidKravProps from './GravidKravProps';
import GravidKravReducer, { MAX_PERIODER } from './GravidKravReducer';
import GravidKravState, { defaultGravidKravState } from './GravidKravState';
import { Actions, GravidKravAction } from './Actions';
import getBase64file from '../../utils/getBase64File';
import postGravidKrav from '../../api/gravidkrav/postGravidKrav';
import environment from '../../config/environment';
import { mapGravidKravRequest } from '../../api/gravidkrav/mapGravidKravRequest';
import SelectDager from '../felles/SelectDager/SelectDager';
import Feilmeldingspanel from '../felles/Feilmeldingspanel/Feilmeldingspanel';
import BekreftOpplysningerPanel from '../felles/BekreftOpplysningerPanel/BekreftOpplysningerPanel';
import Side from '../felles/Side/Side';
import KontrollsporsmaalLonn from '../KontrollsporsmaalLonn';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import dayjs from 'dayjs';
import { useArbeidsgiver } from '../../context/arbeidsgiver/ArbeidsgiverContext';
import stringishToNumber from '../../utils/stringishToNumber';
import PathParams from '../../locale/PathParams';
import { useTranslation } from 'react-i18next';
import LangKey from '../../locale/LangKey';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import { i18n } from 'i18next';
import LeggTilKnapp from '../felles/leggtilknapp/LeggTilKnapp';
import Slettknapp from '../felles/slettknapp/Slettknapp';

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

  const closeKontrollsporsmaalLonn = () => {
    dispatch({ type: Actions.CloseKontrollsporsmaalLonn });
  };

  const closeKontrollsporsmaalLonnDager = (dager: number | undefined) => {
    dispatch({ type: Actions.KontrollDager, payload: { kontrollDager: dager } });
    dispatch({ type: Actions.CloseKontrollsporsmaalLonn });
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
      payload: { fom: fomDato, itemId: uniqueKey }
    });
  };

  useEffect(() => {
    dispatch({
      type: Actions.Orgnr,
      payload: { orgnr: arbeidsgiverId }
    });
  }, [arbeidsgiverId]);

  useEffect(() => {
    if (
      state.validated === true &&
      state.progress === true &&
      state.submitting === true &&
      state.isOpenKontrollsporsmaalLonn === false
    ) {
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
    state.kontrollDager,
    state.isOpenKontrollsporsmaalLonn
  ]);

  if (!!state.kvittering) {
    return <Redirect to={buildLenke(lenker.GravidKravKvittering, language)} />;
  }
  const lenkeGravid = buildLenke(lenker.Gravid, language);

  return (
    <Side
      bedriftsmeny={true}
      className='gravidkrav'
      sidetittel={t(LangKey.GRAVID_KRAV_SIDETITTEL_LITEN)}
      title={t(LangKey.GRAVID_KRAV_SIDETITTEL_STOR)}
      subtitle={t(LangKey.GRAVID_KRAV_SIDETITTEL_SUBTITLE)}
    >
      <Row>
        <Column>
          <Panel>
            <Ingress className='textfelt-padding-bottom'>
              <Oversettelse langKey={LangKey.GRAVID_KRAV_SIDETITTEL_INGRESS} variables={{ lenkeGravid }} />
            </Ingress>
            <Ingress>{t(LangKey.ALLE_FELT_PAKREVD)}</Ingress>
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
              </Row>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel id='gravidkrav-panel-tapt-arbeidstid'>
            <Systemtittel className='textfelt-padding-bottom'>{t(LangKey.GRAVID_KRAV_ARBEIDSTID_TAPT)}</Systemtittel>
            <Ingress tag='span' className='textfelt-padding-bottom'>
              {t(LangKey.GRAVID_KRAV_ARBEIDSTID_PERIODE)}
              <Hjelpetekst className='krav-padding-hjelpetekst'>
                <Oversettelse langKey={LangKey.GRAVID_KRAV_ARBEIDSTID_HJELPETEKST} />
              </Hjelpetekst>
            </Ingress>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'arbeidsperiode'}>
              {state.perioder?.map((periode, index) => (
                <Row
                  key={periode.uniqueKey}
                  className={`bulk-innsending__rad ${index % 2 ? 'odd' : 'even'} ${
                    index > 0 ? 'not-first-row' : 'first-row'
                  }`}
                >
                  <Column sm='3' xs='6'>
                    <DatoVelger
                      id={'fra-dato-' + periode.uniqueKey}
                      label={t(LangKey.FRA_DATO)}
                      onChange={(fraDato: Date) => {
                        fraDatoValgt(periode.uniqueKey, fraDato);
                      }}
                      feilmelding={periode.fomError}
                    />
                  </Column>
                  <Column sm='3' xs='6'>
                    <DatoVelger
                      id={'til-dato-' + periode.uniqueKey}
                      label={t(LangKey.TIL_DATO)}
                      onChange={(tilDate: Date) => {
                        dispatch({
                          type: Actions.Til,
                          payload: { tom: tilDate, itemId: periode.uniqueKey }
                        });
                      }}
                      feilmelding={periode.tomError}
                    />
                  </Column>
                  <Column sm='2' xs='6'>
                    <Label htmlFor={'dager-' + periode.uniqueKey}>
                      {t(LangKey.GRAVID_KRAV_DAGER_ANTALL)}
                      <Hjelpetekst className='krav-padding-hjelpetekst'>
                        {t(LangKey.GRAVID_KRAV_DAGER_HJELPETEKST)}
                      </Hjelpetekst>
                    </Label>
                    <SelectDager
                      id={'dager-' + periode.uniqueKey}
                      value={periode.dager}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: Actions.Dager,
                          payload: {
                            dager: stringishToNumber(event.currentTarget.value),
                            itemId: periode.uniqueKey
                          }
                        })
                      }
                      feil={periode.dagerError}
                    />
                  </Column>
                  <Column sm='2' xs='6'>
                    <Label htmlFor={'belop-' + periode.uniqueKey}>
                      {t(LangKey.BELOP)}
                      <Hjelpetekst className='krav-padding-hjelpetekst'>
                        <Systemtittel>{t(LangKey.GRAVID_KRAV_BELOP_TITTEL)}</Systemtittel>
                        <Oversettelse langKey={LangKey.GRAVID_KRAV_BELOP_HJELPETEKST} />
                      </Hjelpetekst>
                    </Label>
                    <Input
                      id={'belop-' + periode.uniqueKey}
                      inputMode='numeric'
                      pattern='[0-9]*'
                      placeholder={t(LangKey.KRONER)}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: Actions.Beloep,
                          payload: {
                            beloep: stringishToNumber(event.currentTarget.value),
                            itemId: periode.uniqueKey
                          }
                        })
                      }
                      feil={periode.beloepError}
                    />
                  </Column>
                  {showDeleteButton && (
                    <Slettknapp
                      // disabled={item.accepted}
                      onClick={(event) => {
                        dispatch({
                          type: Actions.DeletePeriode,
                          payload: {
                            itemId: periode.uniqueKey
                          }
                        });
                      }}
                    >
                      {t(LangKey.SLETT_LABEL)}
                    </Slettknapp>
                  )}
                </Row>
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
                      {t(LangKey.GRAVID_KRAV_LEGG_TIL_PERIODE)}
                    </LeggTilKnapp>
                  )}
                </Column>
              </Row>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel>
            <Systemtittel className='textfelt-padding-bottom'>
              {t(LangKey.GRAVID_KRAV_DOKUMENTASJON_TITTEL)}
            </Systemtittel>
            <Oversettelse langKey={LangKey.GRAVID_KRAV_DOKUMENTASJON_INGRESS} />
            <SkjemaGruppe feil={state.dokumentasjonError} feilmeldingId='dokumentasjon' aria-live='polite'>
              <Upload
                className='knapp-innsending-top'
                id='upload'
                label={t(LangKey.GRAVID_KRAV_LAST_OPP)}
                extensions='.pdf'
                onChange={handleUploadChanged}
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
              {t(LangKey.GRAVID_KRAV_LONN_SEND)}
            </Hovedknapp>
          </Panel>
        </Column>
        {state.notAuthorized && <LoggetUtAdvarsel onClose={handleCloseNotAuthorized} />}
      </Row>
      <KontrollsporsmaalLonn
        onClose={closeKontrollsporsmaalLonnDager}
        isOpen={state.isOpenKontrollsporsmaalLonn}
        onCancelClick={closeKontrollsporsmaalLonn}
      />
    </Side>
  );
};

export default GravidKrav;
