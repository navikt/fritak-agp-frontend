import React from 'react';
import { EtikettLiten, Ingress, Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import SideIndentering from '../SideIndentering';
import Skillelinje from '../Skillelinje';
import Fnr from '../Fnr';
import { BekreftCheckboksPanel, Feiloppsummering, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import Upload from '../Upload';
import { Hovedknapp } from 'nav-frontend-knapper';
import LoggetUtAdvarsel from '../login/LoggetUtAdvarsel';
import { Link } from 'react-router-dom';
import lenker from '../lenker';
import './GravidKrav.scss';
import Tekstomrade, { BoldRule, ParagraphRule } from 'nav-frontend-tekstomrade';

export const GravidKrav = () => {
  const state = {
    fnr: '',
    fnrError: undefined,
    dokumentasjonError: undefined,
    accessDenied: false,
    bekreft: false,
    bekreftError: undefined,
    feilmeldinger: [],
    progress: false
  };

  const handleLoggedoutModalClosing = () => {
    // dispatch({ type: Actions.CloseLoggedoutModal });
  };

  const handleUploadChanged = (file?: File) => {
    if (file) {
      // getBase64file(file).then((base64encoded: any) => {
      //   dispatch({ type: Actions.Dokumentasjon, payload: base64encoded });
      // });
    }
  };

  const handleSubmit = () => {};

  const handleDelete = () => {};

  return (
    <Row>
      <Column>
        <Panel className='panel--heading'>
          <EtikettLiten>GRAVID ANSATT</EtikettLiten>
          <Innholdstittel>Krav om refusjon av sykepenger i arbeidsgiverperioden</Innholdstittel>
        </Panel>
        <SideIndentering>
          <Panel>
            <Ingress className='krav-padding-bottom'>
              Har dere søkt om at <Link to={lenker.Gravid}>NAV dekker sykepenger i arbeidsgiverperioden</Link>, sender
              dere krav om refusjon her. Vi anbefaler at dere sender kravet før søknaden er ferdig behandlet, så unngår
              dere at det blir foreldet.
            </Ingress>
            <Ingress>Alle felter må fylles ut om ikke annet er oppgitt</Ingress>
          </Panel>
          <Skillelinje />

          <Panel id='gravidkrav-panel-tapt-arbeidstid'>
            <Systemtittel className='krav-padding-bottom'>Den ansatte</Systemtittel>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'ansatt'}>
              <Row>
                <Column sm='4' xs='6'>
                  <Fnr
                    label='Fødselsnummer (11 siffer)'
                    fnr={state.fnr}
                    placeholder='11 siffer'
                    feilmelding={state.fnrError}
                    onValidate={() => {}}
                    onChange={() => {}}
                  />
                </Column>
              </Row>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel id='gravidkrav-panel-tapt-arbeidstid'>
            <Systemtittel className='krav-padding-bottom'>Tapt arbeidstid</Systemtittel>
            <Ingress className='krav-padding-bottom'>Hvilken periode var den ansatte borte?</Ingress>
            <SkjemaGruppe aria-live='polite' feilmeldingId={'arbeidsperiode'}>
              <Row>
                <Column sm='3' xs='6'>
                  <Input label='Fra dato' inputMode='numeric' pattern='[0-9]*' />
                </Column>
                <Column sm='3' xs='6'>
                  <Input label='Til dato' inputMode='numeric' pattern='[0-9]*' />
                </Column>
                <Column sm='3' xs='6'>
                  <Input label='Antall dager' inputMode='numeric' pattern='[0-9]*' />
                </Column>
                <Column sm='3' xs='6'>
                  <Input label='Beløp' inputMode='numeric' pattern='[0-9]*' placeholder='Kr:' />
                </Column>
              </Row>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel>
            <Systemtittel className='krav-padding-bottom'>
              Hvis dere har fått dokumentasjon fra den ansatte
            </Systemtittel>
            <Tekstomrade className='krav-padding-bottom' rules={[BoldRule, ParagraphRule]}>
              Som arbeidsgiver kan dere ikke kreve å få se helseopplysninger. Men hvis den ansatte allerede har gitt
              dere slik dokumentasjon frivillig, kan dere skanne eller ta bilde av den og laste den opp her. _For tiden
              støtter vi kun filformatet .pdf._
            </Tekstomrade>
            <Tekstomrade>
              NAV vil selv innhente dokumentasjon fra legen hvis det ikke allerede går klart fram av en sykmelding at
              det er svangerskapet som er årsaken til fraværet.
            </Tekstomrade>
            <SkjemaGruppe feil={state.dokumentasjonError} feilmeldingId='dokumentasjon' aria-live='polite'>
              <Upload
                id='upload'
                label='LAST OPP LEGEERKLÆRINGEN (valgfritt)'
                extensions='.pdf'
                onChange={handleUploadChanged}
                onDelete={handleDelete}
                fileSize={250000}
              />
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel>
            <SkjemaGruppe feilmeldingId='bekreftFeilmeldingId'>
              <BekreftCheckboksPanel
                label='Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige.'
                checked={state.bekreft || false}
                feil={state.bekreftError}
                onChange={() => {}}
                //   dispatch({
                //     type: Actions.Bekreft,
                //     payload: { bekreft: !state.bekreft }
                //   })
                // }
              >
                Jeg vet at NAV kan trekke tilbake retten til å få dekket sykepengene i arbeidsgiverperioden hvis
                opplysningene ikke er riktige eller fullstendige.
              </BekreftCheckboksPanel>
            </SkjemaGruppe>
          </Panel>

          {state.feilmeldinger && state.feilmeldinger.length > 0 && (
            <Panel>
              <Feiloppsummering tittel='For å gå videre må du rette opp følgende:' feil={state.feilmeldinger} />
            </Panel>
          )}

          <Panel>
            <Hovedknapp onClick={handleSubmit} spinner={state.progress}>
              Send søknad
            </Hovedknapp>
          </Panel>
        </SideIndentering>
      </Column>
      {state.accessDenied && <LoggetUtAdvarsel onClose={handleLoggedoutModalClosing} />}
    </Row>
  );
};

export default GravidKrav;
