import React, { useState, useReducer } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Feilmelding, Ingress, Normaltekst } from 'nav-frontend-typografi';
import {
  BekreftCheckboksPanel,
  Feiloppsummering,
  Radio,
  RadioGruppe,
  SkjemaGruppe,
  Textarea
} from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema/src/feiloppsummering';
import Skillelinje from '../Skillelinje';
import SoknadTittel from '../SoknadTittel';
import SideIndentering from '../SideIndentering';
import DatoVelger from '../DatoVelger';
import Fnr from '../Fnr';
import Upload from '../Upload';
import GravidSideProps from './GravidSideProps';
import GravidProgress from './GravidProgress';
import GravidStatus from './GravidStatus';
import isValidFnr from './isValidFnr';
import GravidKvittering from './GravidKvittering';
import GravidFeil from './GravidFeil';
import lagreGravidesoknad, {
  lagreGravideBackendError,
  lagreGravideResponse
} from '../../api/lagreGravidesoknad';
import RestStatus from '../../api/RestStatus';
import environment from '../../environment';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import lenker from '../lenker';
import feilmeldingReducer from './feilmeldingReducer';

const initialStateFeilmelding = {};

// const REQUIRED_INPUT = 'Må fylles ut';
// const REQUIRED_SELECT = 'Må velge et alternativ';
// const INVALID_FNR = 'Ugyldig fødselsnummer';
const EMPTY = '';

const GravidSide = (props: GravidSideProps) => {
  const [status, setStatus] = useState<number>(
    props.status || GravidStatus.DEFAULT
  );
  const [validated, setValidated] = useState<boolean>(false);
  const [dato, setDato] = useState<Date | undefined>(props.dato || undefined);
  const [fnr, setFnr] = useState<string>(props.fnr || EMPTY);
  const [fnrValid, setFnrValid] = useState<boolean>(isValidFnr(fnr));
  const [tilrettelegge, setTilrettelegge] = useState<boolean | undefined>(
    props.tilrettelegge
  );
  const [tiltak, setTiltak] = useState<string>(props.tiltak || '');
  const [tiltakBeskrivelse, setTiltakBeskrivelse] = useState<string>(
    props.tiltakBeskrivelse || EMPTY
  );
  // const [
  //   tiltakBeskrivelseFeilmelding,
  //   setTiltakBeskrivelseFeilmelding
  // ] = useState<string>(!validated ? EMPTY : REQUIRED_INPUT);
  const [omplassering, setOmplassering] = useState<string>(
    props.omplassering || EMPTY
  );
  const [dokumentasjon, setDokumentasjon] = useState<File>();
  // const [dokumentasjonFeilmelding, setDokumentasjonFeilmelding] = useState<string>(EMPTY);
  const [bekreftet, setBekreftet] = useState<boolean>(props.bekreftet || false);
  const [videre, setVidere] = useState<boolean>(props.videre || false);
  // const [feilOppsummeringer, setFeilOppsummeringer] = useState<FeiloppsummeringFeil[]>(props.feilOppsummeringer || []);

  const [feilmelding, dispatchFeilmelding] = useReducer(
    feilmeldingReducer,
    initialStateFeilmelding
  );

  const history: History = useHistory();

  const handleUploadChanged = (file?: File) => {
    setDokumentasjon(file);
  };

  function isBackendError(
    beResponse: lagreGravideBackendError | lagreGravideResponse
  ): beResponse is lagreGravideBackendError {
    return (beResponse as lagreGravideBackendError).detail !== undefined;
  }

  const validateBackendResponse = (
    beResponse: lagreGravideBackendError | lagreGravideResponse
  ): boolean => {
    if (isBackendError(beResponse)) {
      return false;
    }

    if (beResponse.validationErrors && beResponse.validationErrors.length > 0) {
      beResponse.validationErrors.forEach((error) => {
        dispatchFeilmelding({
          type: error.propertyPath,
          feilmelding: error.message
        });
      });
      return false;
    }
    return true;
  };

  const validateForm = (): boolean => {
    let harFeil: boolean = false;

    if (!fnrValid) {
      // setFnrFeilmelding(REQUIRED_INPUT);
      harFeil = true;
      dispatchFeilmelding({
        type: 'ansatteFeilmeldingId',
        feilmelding: 'Fyll ut gyldig fødselsnummer'
      });
    } else {
      // setFnrFeilmelding(EMPTY);
      dispatchFeilmelding({ type: 'ansatteFeilmeldingId', feilmelding: '' });
    }

    if (!dato) {
      harFeil = true;
      // setDatoFeilmelding(REQUIRED_INPUT);
      dispatchFeilmelding({
        type: 'dato',
        feilmelding: 'Termindato må fylles ut'
      });
    } else {
      dispatchFeilmelding({ type: 'dato', feilmelding: '' });
    }

    if (!tiltak) {
      harFeil = true;
      // setTiltakFeilmelding(REQUIRED_SELECT);
      dispatchFeilmelding({
        type: 'tilretteleggeFeilmeldingId',
        feilmelding: 'Tiltak må fylles ut'
      });
    } else {
      dispatchFeilmelding({
        type: 'tilretteleggeFeilmeldingId',
        feilmelding: ''
      });
    }

    if (tiltak === 'annet') {
      if (!tiltakBeskrivelse) {
        harFeil = true;
        // setTiltakBeskrivelseFeilmelding(REQUIRED_INPUT);
        // feil.push({
        //   type: 'tilretteleggeFeilmeldingId',
        //   feilmelding: 'Spesifiser hvilke tiltak som er forsøkt',
        // });
        dispatchFeilmelding({
          type: 'tilretteleggeFeilmeldingId',
          feilmelding: 'Spesifiser hvilke tiltak som er forsøkt'
        });
      } else {
        dispatchFeilmelding({
          type: 'tilretteleggeFeilmeldingId',
          feilmelding: ''
        });
      }
      // } else {
      //   // setTiltakBeskrivelseFeilmelding(EMPTY);
      //   dispatchFeilmelding({
      //     type: 'tilretteleggeFeilmeldingId',
      //     feilmelding: 'Spesifiser hvilke tiltak som er forsøkt',
      //   });
    }

    if (!omplassering) {
      harFeil = true;
      // setOmplasseringFeilmelding(REQUIRED_SELECT);
      dispatchFeilmelding({
        type: 'omplasseringFeilmeldingId',
        feilmelding: 'Velg omplassering'
      });
    } else {
      // setOmplasseringFeilmelding(EMPTY);
      dispatchFeilmelding({
        type: 'omplasseringFeilmeldingId',
        feilmelding: ''
      });
    }

    if (!dokumentasjon) {
      harFeil = true;
      // setDokumentasjonFeilmelding('Velg en fil');
      dispatchFeilmelding({
        type: 'dokumentasjonFeilmeldingId',
        feilmelding: 'Last opp dokumentasjon'
      });
    } else {
      // setDokumentasjonFeilmelding(EMPTY);
      dispatchFeilmelding({
        type: 'dokumentasjonFeilmeldingId',
        feilmelding: ''
      });
    }

    if (!bekreftet) {
      harFeil = true;
      // setBekreftetFeilmelding(REQUIRED_SELECT);
      dispatchFeilmelding({
        type: 'bekreftFeilmeldingId',
        feilmelding: 'Bekreft at opplysningene er korrekt'
      });
    } else {
      // setBekreftetFeilmelding(EMPTY);
      dispatchFeilmelding({ type: 'bekreftFeilmeldingId', feilmelding: '' });
    }

    // setFeilOppsummeringer(feil);
    debugger;
    setValidated(true);
    return harFeil === false;
  };

  const handleSubmitClicked = async () => {
    if (validateForm()) {
      // submit
      const payload = {
        dato,
        fnr,
        tilrettelegge,
        tiltak,
        tiltakBeskrivelse,
        omplassering
      };

      setStatus(GravidStatus.IN_PROGRESS);
      const lagringStatus = await lagreGravidesoknad(
        environment.baseUrl,
        payload
      );

      if (lagringStatus.status === RestStatus.Successfully) {
        validateBackendResponse(lagringStatus);
        history.push(lenker.GravidKvittering);
      }
    }
  };

  if (!validated && props.validated) {
    validateForm();
  }

  const feilmeldingsliste: FeiloppsummeringFeil[] = Object.keys(
    feilmelding
  ).map((element) => ({
    skjemaelementId: element,
    feilmelding: feilmelding[element]
  }));

  return (
    <Row>
      <Column>
        <SoknadTittel>
          Søknad om utvidet støtte for gravid ansatts sykefravære
        </SoknadTittel>

        {status === GravidStatus.IN_PROGRESS && <GravidProgress />}

        {status === GravidStatus.SUCCESS && <GravidKvittering />}

        {status === GravidStatus.ERROR && <GravidFeil />}

        {(status === GravidStatus.DEFAULT ||
          status === GravidStatus.BAD_REQUEST) && (
          <SideIndentering>
            <Panel>
              <Ingress>
                Søknad om unntak fra arbeidsgiveransvar for sykepenger til en
                gravid arbeidstakers fravære fra jobb. Vi krever sykemelding
                eller legeerklæring som bekrefter at fraværet skyldes
                svangerskapsrelatert sykdom.
              </Ingress>
            </Panel>

            <Skillelinje />

            <Panel>
              <SkjemaGruppe
                legend='Informasjon om den ansatte'
                // feilmeldingId='fnrOgDatoFeilmeldingId'
                aria-live='polite'
              >
                <Row>
                  <Column sm='4' xs='6'>
                    <Fnr
                      label='Fødselsnummer!'
                      fnr={fnr}
                      placeholder='11 siffer'
                      feilmelding={feilmelding.ansatteFeilmeldingId}
                      onValidate={setFnrValid}
                      onChange={setFnr}
                    />
                  </Column>
                  <Column sm='4' xs='6'>
                    <DatoVelger
                      label='Termindato'
                      dato={dato}
                      placeholder='dd.mm.åååå'
                      feilmelding={feilmelding.dato}
                      onChange={setDato}
                    />
                  </Column>
                </Row>
              </SkjemaGruppe>
            </Panel>

            <Skillelinje />

            <Panel>
              <SkjemaGruppe
                legend='Arbeidssituasjon og miljø'
                feil={feilmelding.tilrettelegge}
                description='Vi ønsker så godt innblikk i hvordan dere eventuelt har forsøkt å løse situasjonen
                        selv. Dette både for å vurdere søknaden, men også for å kunne bistå dere for at den ansatte om
                        mulig skal kunne stå i jobben sin.'
              >
                <RadioGruppe
                  legend='Har dere forsøkt å tilrettelegge arbeidsdagen slik at den ansatte kan utføre arbeidet sitt til
              tross for helsetilstanden hennes?'
                >
                  <Radio
                    label={'Ja'}
                    name='sitteplass'
                    value={'ja'}
                    defaultChecked={tilrettelegge === true}
                    onClick={() => {
                      setTilrettelegge(true);
                    }}
                  />
                  <Radio
                    label={'Nei'}
                    name='sitteplass'
                    value={'nei'}
                    defaultChecked={tilrettelegge === false}
                    onClick={() => {
                      setTilrettelegge(false);
                    }}
                  />
                </RadioGruppe>
              </SkjemaGruppe>

              {tilrettelegge === true && (
                <>
                  <SkjemaGruppe feilmeldingId='tilretteleggeFeilmeldingId'>
                    <RadioGruppe
                      feil={feilmelding.tilretteleggeFeilmeldingId}
                      legend='Hvilke tiltak er forsøkt/vurdert for at arbeidstaker skal kunne være i arbeid i svangerskapet?'
                    >
                      <Radio
                        label={'Fleksibel/tilpasset arbeidstid'}
                        name='tiltak'
                        onClick={() => {
                          setTiltak('arbeidstid');
                        }}
                        defaultChecked={tiltak === 'arbeidstid'}
                      />
                      <Radio
                        label={'Hjemmekontor'}
                        name='tiltak'
                        onClick={() => {
                          setTiltak('hjemmekontor');
                        }}
                        defaultChecked={tiltak === 'hjemmekontor'}
                      />
                      <Radio
                        label={'Tilpassede arbeidsoppgaver'}
                        name='tiltak'
                        onClick={() => {
                          setTiltak('oppgaver');
                        }}
                        defaultChecked={tiltak === 'oppgaver'}
                      />
                      <Radio
                        label={
                          'Annet, vennligst spesifiser kortfattet i feltet under'
                        }
                        name='tiltak'
                        onClick={() => {
                          setTiltak('annet');
                        }}
                        defaultChecked={tiltak === 'annet'}
                      />
                      {tiltak === 'annet' && (
                        <Textarea
                          value={tiltakBeskrivelse}
                          feil={feilmelding.tilretteleggeFeilmeldingId}
                          onChange={(evt) => {
                            setTiltakBeskrivelse(evt.currentTarget.value);
                          }}
                        />
                      )}
                    </RadioGruppe>
                  </SkjemaGruppe>

                  <SkjemaGruppe
                    feil={feilmelding.omplasseringFeilmeldingId}
                    feilmeldingId='omplasseringFeilmeldingId'
                  >
                    <RadioGruppe legend='Er omplassering av den ansatte forsøkt?'>
                      <Radio
                        label={'Ja'}
                        name='omplassering'
                        defaultChecked={omplassering === 'ja'}
                        onClick={() => {
                          setOmplassering('ja');
                        }}
                      />
                      <Radio
                        label={'Nei'}
                        name='omplassering'
                        defaultChecked={omplassering === 'nei'}
                        onClick={() => {
                          setOmplassering('nei');
                        }}
                      />
                      <Radio
                        label={'Omplassering er ikke gjennomført'}
                        name='omplassering'
                        defaultChecked={omplassering === 'ikke'}
                        onClick={() => {
                          setOmplassering('ikke');
                        }}
                      />
                    </RadioGruppe>
                  </SkjemaGruppe>
                </>
              )}

              {tilrettelegge === false && (
                <>
                  <Skillelinje />
                  <Feilmelding>
                    *Forsøksvis tilrettelegging er i utgangspunktet påkrevd for
                    at vi skal godkjenne søknaden*
                  </Feilmelding>
                  <br />
                  <Normaltekst>
                    Dere kan
                    <button
                      onClick={() => {
                        setVidere(true);
                      }}
                      className='lenke'
                      style={{
                        display: 'run-in',
                        border: 'none',
                        margin: '0',
                        paddingRight: '0'
                      }}
                    >
                      gå videre med søknaden
                    </button>
                    , men det er altså da sannsynlig at den blir avslått.
                  </Normaltekst>
                </>
              )}
            </Panel>

            {(tilrettelegge || videre) && (
              <>
                <Skillelinje />

                <Panel>
                  <SkjemaGruppe
                    legend='Dokumentasjon om svagerskapsrelatert sykdomsfravære'
                    feil={feilmelding.dokumentasjonFeilmeldingId}
                    feilmeldingId='dokumentasjonFeilmeldingId'
                    description='Det må dokumenteres av lege at fraværet er relatert til svangerskapsrelatert
                        sykdom. Dere kan laste opp denne om dere har den. Alternativt vil NAV innhente dokumentasjon
                        direkte fra lege.'
                    aria-live='polite'
                  >
                    <Upload
                      id='upload'
                      label='Last opp dokumentasjon'
                      extensions='.html,.pdf,.doc'
                      onChange={handleUploadChanged}
                      fileSize={250000}
                    />
                  </SkjemaGruppe>
                </Panel>

                <Skillelinje />

                <Panel>
                  <SkjemaGruppe feilmeldingId='bekreftFeilmeldingId'>
                    <BekreftCheckboksPanel
                      label='Jeg bekrefter at opplysningene jeg har gitt er riktige.'
                      checked={bekreftet}
                      feil={feilmelding.bekreftFeilmeldingId}
                      onChange={(evt) => {
                        setBekreftet(!bekreftet);
                      }}
                    >
                      Jeg er kjent med at hvis opplysningene jeg har gitt ikke
                      er riktige eller fullstendige, så kan jeg miste retten til
                      stønad.
                    </BekreftCheckboksPanel>
                  </SkjemaGruppe>
                </Panel>

                {feilmeldingsliste.length > 0 && (
                  <Panel>
                    <Feiloppsummering
                      tittel='For å gå videre må du rette opp følgende:'
                      feil={feilmeldingsliste}
                    />
                  </Panel>
                )}

                <Panel>
                  <Hovedknapp onClick={handleSubmitClicked}>
                    Send søknad
                  </Hovedknapp>
                </Panel>
              </>
            )}
          </SideIndentering>
        )}
      </Column>
    </Row>
  );
};

export default GravidSide;
