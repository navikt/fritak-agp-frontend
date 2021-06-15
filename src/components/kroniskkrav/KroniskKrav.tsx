import React, { Reducer, useEffect, useReducer } from 'react';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import { Input, Label, SkjemaGruppe } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Redirect, useParams } from 'react-router-dom';
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
import Lenke from 'nav-frontend-lenker';
import KravPeriode from './KravPeriode';
import PathParams from '../../locale/PathParams';
import { useTranslation } from 'react-i18next';
import {
  Side,
  LoggetUtAdvarsel,
  Oversettelse,
  BekreftOpplysningerPanel,
  Feilmeldingspanel,
  Fnr,
  Skillelinje,
  useArbeidsgiver,
  stringishToNumber
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import { i18n } from 'i18next';
import { KroniskKravKeys } from './KroniskKravKeys';
import InternLenke from '../felles/InternLenke/InternLenke';

const buildReducer =
  (Translate: i18n): Reducer<KroniskKravState, KroniskKravAction> =>
  (bulkState: KroniskKravState, action: KroniskKravAction) =>
    KroniskKravReducer(bulkState, action, Translate);

export const KroniskKrav = (props: KroniskKravProps) => {
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useReducer(buildReducer(i18n), props.state, defaultKroniskKravState);
  const { arbeidsgiverId } = useArbeidsgiver();
  let { language } = useParams<PathParams>();

  const handleCloseNotAuthorized = () => {
    dispatch({ type: Actions.NotAuthorized });
  };

  const setArbeidsdagerDagerPrAar = (dager: string | undefined) => {
    dispatch({ type: Actions.KontrollDager, payload: { kontrollDager: stringishToNumber(dager) } });
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

  useEffect(() => {
    dispatch({
      type: Actions.Orgnr,
      payload: { orgnr: arbeidsgiverId }
    });
  }, [arbeidsgiverId]);

  useEffect(() => {
    if (state.validated === true && state.progress === true && state.submitting === true) {
      postKroniskKrav(
        environment.baseUrl,
        mapKroniskKravRequest(state.fnr, state.orgnr, state.perioder, state.bekreft, state.kontrollDager)
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
    state.orgnr,
    state.kontrollDager
  ]);

  if (!!state.kvittering) {
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
              <Oversettelse langKey={KroniskKravKeys.ALLE_FELT_PAKREVD} />
            </Ingress>
          </Panel>
          <Skillelinje />

          <Panel id='kroniskkrav-panel-den-ansatte'>
            <Systemtittel className='textfelt-padding-bottom'>{t(KroniskKravKeys.KRONISK_KRAV_EMPLOYEE)}</Systemtittel>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'ansatt'}>
              <Row>
                <Column sm='4' xs='6'>
                  <Fnr
                    label={t(KroniskKravKeys.FODSELSNUMMER_LABEL)}
                    fnr={state.fnr}
                    placeholder={t(KroniskKravKeys.FODSELSNUMMER_PLACEHOLDER)}
                    feilmelding={state.fnrError}
                    onChange={(fnr: string) =>
                      dispatch({
                        type: Actions.Fnr,
                        payload: { fnr: fnr }
                      })
                    }
                  />
                </Column>
                <Column sm='4' xs='6'>
                  <Label htmlFor='kontrollsporsmaal-lonn-arbeidsdager'>{t(KroniskKravKeys.KONTROLLSPORSMAL_LONN_DAGER)}</Label>
                  <Input
                    id='kontrollsporsmaal-lonn-arbeidsdager'
                    bredde='XS'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    className='kontrollsporsmaal-lonn-arbeidsdager'
                    onChange={(event) => setArbeidsdagerDagerPrAar(event.target.value)}
                  />
                  <Normaltekst className='kontrollsporsmaal-lonn-forklaring'>
                    {t(KroniskKravKeys.KONTROLLSPORSMAL_LONN_FORKLARING_DAGER)}
                  </Normaltekst>
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
                  key={enkeltPeriode.uniqueKey}
                />
              ))}
            </SkjemaGruppe>
          </Panel>
          <Lenke href='#' onClick={leggTilPeriode}>
            + {t(KroniskKravKeys.KRONISK_KRAV_ADD_PERIOD)}
          </Lenke>
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
              {t(KroniskKravKeys.KRONISK_KRAV_SUBMIT)}
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

export default KroniskKrav;
