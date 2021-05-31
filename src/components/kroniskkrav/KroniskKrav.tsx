import React, { useEffect, useReducer } from 'react';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import Skillelinje from '../felles/Skillelinje/Skillelinje';
import Fnr from '../felles/Fnr/Fnr';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import LoggetUtAdvarsel from '../felles/login/LoggetUtAdvarsel';
import { Link, Redirect, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import './KroniskKrav.scss';
import '../felles/FellesStyling.scss';
import '@navikt/helse-arbeidsgiver-felles-frontend/lib/js/components/DatoVelger.css';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import KroniskKravProps from './KroniskKravProps';
import KroniskKravReducer from './KroniskKravReducer';
import { defaultKroniskKravState } from './KroniskKravState';
import { Actions } from './Actions';
import postKroniskKrav from '../../api/kroniskkrav/postKroniskKrav';
import environment from '../../config/environment';
import { mapKroniskKravRequest } from '../../api/kroniskkrav/mapKroniskKravRequest';
import Feilmeldingspanel from '../felles/Feilmeldingspanel/Feilmeldingspanel';
import BekreftOpplysningerPanel from '../felles/BekreftOpplysningerPanel/BekreftOpplysningerPanel';
import Side from '../felles/Side/Side';
import KontrollsporsmaalLonn from '../KontrollsporsmaalLonn';
import { useArbeidsgiver } from '../../context/arbeidsgiver/ArbeidsgiverContext';
import Lenke from 'nav-frontend-lenker';
import KravPeriode from './KravPeriode';
import PathParams from '../../locale/PathParams';

export const KroniskKrav = (props: KroniskKravProps) => {
  const [state, dispatch] = useReducer(KroniskKravReducer, props.state, defaultKroniskKravState);
  const { arbeidsgiverId } = useArbeidsgiver();
  let { language } = useParams<PathParams>();

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
    if (
      state.validated === true &&
      state.progress === true &&
      state.submitting === true &&
      state.isOpenKontrollsporsmaalLonn === false
    ) {
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
    state.isOpenKontrollsporsmaalLonn,
    state.kontrollDager
  ]);

  if (!!state.kvittering) {
    return <Redirect to={buildLenke(lenker.KroniskKravKvittering, language)} />;
  }

  return (
    <Side
      bedriftsmeny={true}
      className='kroniskkrav'
      sidetittel='Kravskjema'
      title='Krav om refusjon av sykepenger i arbeidsgiverperioden'
      subtitle='KRONISK ELLER LANGVARIG SYK ANSATT'
    >
      <Row>
        <Column>
          <Panel>
            <Ingress className='textfelt-padding-bottom'>
              Dersom dere allerede har søkt om{' '}
              <Link to={lenker.Gravid}>at NAV skal dekke sykepenger i arbeidsgiverperioden</Link>
              kan dere rette krav om refusjon via dette skjemaet. Vi anbefaler å gjøre dette uten å vente på
              godkjennelse av søknaden, for å potensielt unngå foreldelse av kravet.
            </Ingress>
            <Ingress>Alle felter må fylles ut.</Ingress>
          </Panel>
          <Skillelinje />

          <Panel id='kroniskkrav-panel-den-ansatte'>
            <Systemtittel className='textfelt-padding-bottom'>Den ansatte</Systemtittel>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'ansatt'}>
              <Row>
                <Column sm='4' xs='6'>
                  <Fnr
                    label='Fødselsnummer (11 siffer)'
                    fnr={state.fnr}
                    placeholder='11 siffer'
                    feilmelding={state.fnrError}
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

          <Panel id='kroniskkrav-panel-tapt-arbeidstid'>
            <Systemtittel className='textfelt-padding-bottom'>Tapt arbeidstid</Systemtittel>
            <Ingress tag='span' className='textfelt-padding-bottom'>
              Hvilken periode var den ansatte borte?
              <Hjelpetekst className='krav-padding-hjelpetekst'>
                <ul>
                  <li>Fra og med første til og med siste fraværsdag i arbeidsgiverperioden.</li>
                  <li>
                    Du må velge <strong>både</strong> første og siste dag. Er fraværet bare på én dag, velger du samme
                    dag to ganger.
                  </li>
                </ul>
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
            + Legg til en fraværsperiode
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
              Send kravet
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

export default KroniskKrav;
