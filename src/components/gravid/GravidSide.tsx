import React, { useState } from 'react';
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
import Fnr from '../Fnr';
import Upload from '../Upload';
import GravidSideProps from './GravidSideProps';
import GravidProgress from './GravidProgress';
import GravidStatus from './GravidStatus';
import isValidFnr from './isValidFnr';
import GravidKvittering from './GravidKvittering';
import GravidFeil from './GravidFeil';
import lagreGravidesoknad from '../../api/lagreGravidesoknad';
import RestStatus from '../../api/RestStatus';
import environment from '../../environment';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import lenker from '../lenker';
import { DatoVelger } from '@navikt/helse-arbeidsgiver-felles-frontend';

const REQUIRED_INPUT = 'Må fylles ut';
const REQUIRED_SELECT = 'Må velge et alternativ';
const INVALID_FNR = 'Ugyldig fødselsnummer';
const EMPTY = '';

const GravidSide = (props: GravidSideProps) => {
  const [status, setStatus] = useState<number>(
    props.status || GravidStatus.DEFAULT
  );
  const [validated, setValidated] = useState<boolean>(false);
  const [dato, setDato] = useState<Date | undefined>(props.dato || undefined);
  const [datoFeilmelding, setDatoFeilmelding] = useState<string>(
    !validated ? EMPTY : REQUIRED_INPUT
  );
  const [fnr, setFnr] = useState<string>(props.fnr || EMPTY);
  const [fnrValid, setFnrValid] = useState<boolean>(isValidFnr(fnr));
  const [fnrFeilmelding, setFnrFeilmelding] = useState<string>(
    !validated ? EMPTY : validated && fnrValid ? EMPTY : INVALID_FNR
  );
  const [tilrettelegge, setTilrettelegge] = useState<boolean | undefined>(
    props.tilrettelegge
  );
  const [tilretteleggeFeilmelding] = useState<string>(
    !validated ? EMPTY : REQUIRED_INPUT
  );
  const [tiltak, setTiltak] = useState<string>(props.tiltak || '');
  const [tiltakFeilmelding, setTiltakFeilmelding] = useState<string>(
    !validated ? EMPTY : REQUIRED_INPUT
  );
  const [tiltakBeskrivelse, setTiltakBeskrivelse] = useState<string>(
    props.tiltakBeskrivelse || EMPTY
  );
  const [
    tiltakBeskrivelseFeilmelding,
    setTiltakBeskrivelseFeilmelding
  ] = useState<string>(!validated ? EMPTY : REQUIRED_INPUT);
  const [omplassering, setOmplassering] = useState<string>(
    props.omplassering || EMPTY
  );
  const [omplasseringFeilmelding, setOmplasseringFeilmelding] = useState<
    string
  >(!validated ? EMPTY : REQUIRED_INPUT);
  const [dokumentasjon, setDokumentasjon] = useState<File>();
  const [dokumentasjonFeilmelding, setDokumentasjonFeilmelding] = useState<
    string
  >(EMPTY);
  const [bekreftet, setBekreftet] = useState<boolean>(props.bekreftet || false);
  const [bekreftetFeilmelding, setBekreftetFeilmelding] = useState<string>(
    props.bekreftetFeilmelding || EMPTY
  );
  const [videre, setVidere] = useState<boolean>(props.videre || false);
  const [feilOppsummeringer, setFeilOppsummeringer] = useState<
    FeiloppsummeringFeil[]
  >(props.feilOppsummeringer || []);

  const history: History = useHistory();

  const handleUploadChanged = (file?: File) => {
    setDokumentasjon(file);
  };

  const validateForm = (): boolean => {
    let feil = new Array<FeiloppsummeringFeil>();

    if (!fnrValid) {
      setFnrFeilmelding(REQUIRED_INPUT);
      feil.push({
        skjemaelementId: 'ansatteFeilmeldingId',
        feilmelding: 'Fyll ut gyldig fødselsnummer'
      });
    } else {
      setFnrFeilmelding(EMPTY);
    }

    if (!dato) {
      setDatoFeilmelding(REQUIRED_INPUT);
      feil.push({
        skjemaelementId: 'ansatteFeilmeldingId',
        feilmelding: 'Termindato må fylles ut'
      });
    } else {
      setDatoFeilmelding(EMPTY);
    }

    if (!tiltak) {
      setTiltakFeilmelding(REQUIRED_SELECT);
      feil.push({
        skjemaelementId: 'tilretteleggeFeilmeldingId',
        feilmelding: 'Tiltak må fylles ut'
      });
    } else {
      setTiltakFeilmelding(EMPTY);
    }

    if (tiltak === 'annet') {
      if (!tiltakBeskrivelse) {
        setTiltakBeskrivelseFeilmelding(REQUIRED_INPUT);
        feil.push({
          skjemaelementId: 'tilretteleggeFeilmeldingId',
          feilmelding: 'Spesifiser hvilke tiltak som er forsøkt'
        });
      } else {
        setTiltakBeskrivelseFeilmelding(EMPTY);
      }
    } else {
      setTiltakBeskrivelseFeilmelding(EMPTY);
    }

    if (!omplassering) {
      setOmplasseringFeilmelding(REQUIRED_SELECT);
      feil.push({
        skjemaelementId: 'omplasseringFeilmeldingId',
        feilmelding: 'Velg omplassering'
      });
    } else {
      setOmplasseringFeilmelding(EMPTY);
    }

    if (!dokumentasjon) {
      setDokumentasjonFeilmelding('Velg en fil');
      feil.push({
        skjemaelementId: 'dokumentasjonFeilmeldingId',
        feilmelding: 'Last opp dokumentasjon'
      });
    } else {
      setDokumentasjonFeilmelding(EMPTY);
    }

    if (!bekreftet) {
      setBekreftetFeilmelding(REQUIRED_SELECT);
      feil.push({
        skjemaelementId: 'bekreftFeilmeldingId',
        feilmelding: 'Bekreft at opplysningene er korrekt'
      });
    } else {
      setBekreftetFeilmelding(EMPTY);
    }

    setFeilOppsummeringer(feil);
    setValidated(true);
    return feil.length === 0;
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
        history.push(lenker.GravidKvittering);
      }
    }
  };

  if (!validated && props.validated) {
    validateForm();
  }
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
                feilmeldingId='ansatteFeilmeldingId'
              >
                <Row>
                  <Column sm='4' xs='6'>
                    <Fnr
                      label='Fødselsnummer'
                      fnr={fnr}
                      placeholder='11 siffer'
                      feilmelding={fnrFeilmelding}
                      onValidate={setFnrValid}
                      onChange={setFnr}
                    />
                  </Column>
                  <Column sm='4' xs='6'>
                    <DatoVelger
                      label='Termindato'
                      dato={dato}
                      placeholder='dd.mm.åååå'
                      feilmelding={datoFeilmelding}
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
                feil={tilretteleggeFeilmelding}
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
                      feil={tiltakFeilmelding}
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
                          feil={tiltakBeskrivelseFeilmelding}
                          onChange={(evt) => {
                            setTiltakBeskrivelse(evt.currentTarget.value);
                          }}
                        />
                      )}
                    </RadioGruppe>
                  </SkjemaGruppe>

                  <SkjemaGruppe
                    feil={omplasseringFeilmelding}
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
                    feil={dokumentasjonFeilmelding}
                    feilmeldingId='dokumentasjonFeilmeldingId'
                    description='Det må dokumenteres av lege at fraværet er relatert til svangerskapsrelatert
                        sykdom. Dere kan laste opp denne om dere har den. Alternativt vil NAV innhente dokumentasjon
                        direkte fra lege.'
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
                      feil={bekreftetFeilmelding}
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

                {feilOppsummeringer.length > 0 && (
                  <Panel>
                    <Feiloppsummering
                      tittel='For å gå videre må du rette opp følgende:'
                      feil={feilOppsummeringer}
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
