import React from 'react';
import { EtikettLiten, Ingress, Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import SideIndentering from '../SideIndentering';
import Skillelinje from '../Skillelinje';
import Fnr from '../Fnr';
import Flatpickr from 'react-flatpickr';
import { BekreftCheckboksPanel, Feiloppsummering, Input, Label, SkjemaGruppe } from 'nav-frontend-skjema';
import Upload from '../Upload';
import { Hovedknapp } from 'nav-frontend-knapper';
import LoggetUtAdvarsel from '../login/LoggetUtAdvarsel';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { Link } from 'react-router-dom';
import lenker from '../lenker';
import './GravidKrav.scss';
import 'flatpickr/dist/themes/material_green.css';
import Tekstomrade, { BoldRule, ParagraphRule } from 'nav-frontend-tekstomrade';
import dayjs from 'dayjs';
import Hjelpetekst from 'nav-frontend-hjelpetekst';

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

          <Panel id='gravidkrav-panel-den-ansatte'>
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
            <Ingress className='krav-padding-bottom'>
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
              <Row>
                <Column sm='3' xs='6'>
                  <Label htmlFor='fra-dato'>
                    Fra dato
                    <Flatpickr
                      id='fra-dato'
                      name='Fra dato'
                      placeholder='dd.mm.yyyy'
                      // value={fraDato}
                      className={'periodeinput-input  skjemaelement__input'}
                      options={{
                        maxDate: dayjs(new Date()).toDate(),
                        minDate: dayjs(new Date()).subtract(1, 'year').toDate(),
                        mode: 'single',
                        enableTime: false,
                        dateFormat: 'd.m.Y',
                        altInput: true,
                        altFormat: 'd.m.Y',
                        locale: Norwegian,
                        allowInput: true,
                        clickOpens: true
                        // onClose: (date) =>  setFraDato
                      }}
                    />
                  </Label>
                </Column>
                <Column sm='3' xs='6'>
                  <Label htmlFor='til-dato'>
                    Til dato
                    <Flatpickr
                      name='Til dato'
                      id='til-dato'
                      placeholder='dd.mm.yyyy'
                      // value={tilDato}
                      className={'periodeinput-input  skjemaelement__input'}
                      options={{
                        maxDate: dayjs(new Date()).toDate(),
                        minDate: dayjs(new Date()).subtract(1, 'year').toDate(),
                        mode: 'single',
                        enableTime: false,
                        dateFormat: 'd.m.Y',
                        altInput: true,
                        altFormat: 'd.m.Y',
                        locale: Norwegian,
                        allowInput: true,
                        clickOpens: true
                        // onClose: (date) =>  setTilDato
                      }}
                    />
                  </Label>
                </Column>
                <Column sm='3' xs='6'>
                  <Label htmlFor='antall-dager'>
                    Antall dager
                    <Hjelpetekst className='krav-padding-hjelpetekst'>
                      Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.
                    </Hjelpetekst>
                  </Label>
                  <Input id='antall-dager' inputMode='numeric' pattern='[0-9]*' />
                </Column>
                <Column sm='3' xs='6'>
                  <Label htmlFor='belop'>
                    Beløp
                    <Hjelpetekst className='krav-padding-hjelpetekst'>
                      <Systemtittel>Slik finner dere beløpet dere kan kreve:</Systemtittel>
                      <ul>
                        <li>
                          Merk: Beløpet er før skatt, og det skal være uten feriepenger og arbeidsgiveravgift. Det
                          beregnes feriepenger av det NAV refunderer. Dere får utbetalt refusjonen av feriepengene neste
                          år.
                        </li>
                        <li>
                          Avklar antall dager dere kan kreve refusjon for. Ta kun med dager det skulle vært utbetalt
                          lønn. Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.
                        </li>
                        <li>Beregn månedsinntekten slik det ellers gjøres for sykepenger i arbeidsgiverperioden.</li>
                        <li>Gang med 12 måneder for å finne årslønnen.</li>
                        <li>Reduser beløpet til 6G hvis beløpet er over dette.</li>
                        <li>Finn dagsatsen ved å dele årslønnen på antall dager dere utbetaler lønn for i året.</li>
                        <li>Gang dagsatsen med antall dager dere krever refusjon for.</li>
                      </ul>
                    </Hjelpetekst>
                  </Label>
                  <Input id='belop' inputMode='numeric' pattern='[0-9]*' placeholder='Kr:' />
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
