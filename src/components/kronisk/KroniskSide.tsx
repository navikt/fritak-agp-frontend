import React, { useEffect, useReducer, useState } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import {
  BekreftCheckboksPanel,
  Checkbox,
  CheckboxGruppe,
  Feiloppsummering,
  Input,
  Radio,
  RadioGruppe,
  SkjemaGruppe,
  Textarea
} from 'nav-frontend-skjema';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Skillelinje from '../Skillelinje';
import SoknadTittel from '../SoknadTittel';
import SideIndentering from '../SideIndentering';
import Fnr from '../Fnr';
import Upload from '../Upload';
import './KroniskSide.scss';
import lagreGravidesoknad, {
  lagreGravideInterface,
  lagreGravidesoknadParametere,
  lagreGravideValidationError
} from '../../api/lagreGravidesoknad';
import RestStatus from '../../api/RestStatus';
import environment from '../../environment';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import lenker from '../lenker';
import Lenke from 'nav-frontend-lenker';
import Orgnr from '../Orgnr';
import GravidSideProps from '../gravid/GravidSideProps';
import skjemaReducer, { skjemaState } from '../gravid/skjemaReducer';
import GravidStatus from '../gravid/GravidStatus';
import feilmeldingReducer from '../gravid/feilmeldingReducer';
import getBase64file from '../gravid/getBase64File';
import {
  Omplassering,
  OmplasseringAarsak,
  Tiltak
} from '../gravid/gravidSideEnums';
import isValidFnr from '../gravid/isValidFnr';
import isValidOrgnr from '../gravid/isValidOrgnr';
import isBackendServerError from '../gravid/isBackendServerError';
import isBackendValidationError from '../gravid/isBackendValidationError';
import GravidProgress from '../gravid/GravidProgress';
import GravidKvittering from '../gravid/GravidKvittering';
import GravidFeil from '../gravid/GravidFeil';
import feilListe from '../feilListe';

const initialStateFeilmelding = {};

function preparePropsForState(props: GravidSideProps): skjemaState {
  return {
    fnr: props.fnr,
    orgnr: props.orgnr,
    tilrettelegge: props.tilrettelegge,
    tiltak: props.tiltak,
    tiltakBeskrivelse: props.tiltakBeskrivelse,
    omplassering: props.omplassering,
    bekreftet: props.bekreftet,
    omplasseringAarsak: props.omplasseringAarsak
  };
}

const KroniskSide = (props: GravidSideProps) => {
  const [skjemaStatus, setSkjemaStatus] = useState<number>(
    props.status || GravidStatus.DEFAULT
  );
  const [videre, setVidere] = useState<boolean>(props.videre || false);
  const [validated, setValidated] = useState<boolean>(props.validated || false);
  const [submittedState, setSubmittedState] = useState<boolean>(
    props.submitted || false
  );
  let submitted: boolean = submittedState;
  const [feilmelding, dispatchFeilmelding] = useReducer(
    feilmeldingReducer,
    initialStateFeilmelding
  );
  const initialFormState = preparePropsForState(props);
  const [skjema, dispatchSkjema] = useReducer(skjemaReducer, initialFormState);
  const history: History = useHistory();
  const handleUploadChanged = (file?: File) => {
    if (file) {
      getBase64file(file).then((base64encoded: any) => {
        dispatchSkjema({ field: 'dokumentasjon', value: base64encoded });
      });
    }
  };
  const isTiltakAnnet =
    skjema.tiltak && skjema.tiltak.indexOf(Tiltak.ANNET) > -1;

  const validateFnr = (): boolean => {
    if (!submitted || (skjema.fnr && isValidFnr(skjema.fnr))) {
      dispatchFeilmelding({
        type: 'ansatteFeilmeldingId',
        feilmelding: ''
      });
      return true;
    } else {
      dispatchFeilmelding({
        type: 'ansatteFeilmeldingId',
        feilmelding: 'Fyll ut gyldig fødselsnummer'
      });
      return false;
    }
  };

  const validateOrgnr = (): boolean => {
    if (!submitted || (skjema.orgnr && isValidOrgnr(skjema.orgnr))) {
      dispatchFeilmelding({
        type: 'arbeidsgiverFeilmeldingId',
        feilmelding: ''
      });
      return true;
    } else {
      dispatchFeilmelding({
        type: 'arbeidsgiverFeilmeldingId',
        feilmelding: 'Fyll ut gyldig organisasjonsnummer'
      });
      return false;
    }
  };

  const validateTilrettelegge = (): boolean => {
    if (submitted && skjema.tilrettelegge === undefined) {
      dispatchFeilmelding({
        type: 'tilretteleggeFeilmeldingId',
        feilmelding: 'Spesifiser om dere har tilrettelagt arbeidsdagen'
      });
      return false;
    } else {
      dispatchFeilmelding({
        type: 'tilretteleggeFeilmeldingId',
        feilmelding: ''
      });
      return true;
    }
  };

  const validateTiltak = (): boolean => {
    if (submitted) {
      if (
        isTiltakAnnet &&
        (!skjema.tiltakBeskrivelse || skjema.tiltakBeskrivelse.length === 0)
      ) {
        dispatchFeilmelding({
          type: 'tiltakFeilmeldingId',
          feilmelding: 'Spesifiser hvilke tiltak som er forsøkt'
        });
        return false;
      }
      if (!skjema.tiltak) {
        dispatchFeilmelding({
          type: 'tiltakFeilmeldingId',
          feilmelding: 'Du må oppgi minst ett tiltak dere har prøvd'
        });
        return false;
      }
    }
    dispatchFeilmelding({
      type: 'tiltakFeilmeldingId',
      feilmelding: ''
    });
    return true;
  };

  const validateOmplassering = (): boolean => {
    if (submitted && !skjema.omplassering) {
      dispatchFeilmelding({
        type: 'omplasseringFeilmeldingId',
        feilmelding: 'Velg omplassering'
      });
      return false;
    } else {
      dispatchFeilmelding({
        type: 'omplasseringFeilmeldingId',
        feilmelding: ''
      });
      return true;
    }
  };

  const validateBekreftet = (): boolean => {
    if (submitted && !skjema.bekreftet) {
      dispatchFeilmelding({
        type: 'bekreftFeilmeldingId',
        feilmelding: 'Bekreft at opplysningene er korrekt'
      });
      return false;
    } else {
      dispatchFeilmelding({
        type: 'bekreftFeilmeldingId',
        feilmelding: ''
      });
      return true;
    }
  };

  const validateForm = (): boolean => {
    const altValidert: boolean = skjema.tilrettelegge
      ? [
          validateFnr(),
          validateOrgnr(),
          validateTilrettelegge(),
          validateTiltak(),
          validateOmplassering(),
          validateBekreftet()
        ].every(Boolean)
      : [
          validateFnr(),
          validateOrgnr(),
          validateTilrettelegge(),
          validateBekreftet()
        ].every(Boolean);

    submitted = !altValidert;
    setSubmittedState(submitted);
    return altValidert;
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skjema]);

  useEffect(() => {
    if (validated) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitClicked = async () => {
    submitted = true;
    setSubmittedState(submitted);
    if (validateForm()) {
      // submit
      const payload: lagreGravidesoknadParametere = {
        orgnr: skjema.orgnr,
        fnr: skjema.fnr,
        tilrettelegge: skjema.tilrettelegge,
        tiltak: skjema.tiltak,
        tiltakBeskrivelse: skjema.tiltakBeskrivelse,
        omplassering: skjema.omplassering,
        omplasseringAarsak: skjema.omplasseringAarsak,
        bekreftet: skjema.bekreftet,
        dokumentasjon: skjema.dokumentasjon
      };

      setSkjemaStatus(GravidStatus.IN_PROGRESS);
      const lagringStatus = await lagreGravidesoknad(
        environment.baseUrl,
        payload
      );

      if (lagringStatus.status === RestStatus.Successfully) {
        const backendStatusOK = validateBackendResponse(lagringStatus);

        if (backendStatusOK) {
          history.push(lenker.GravidKvittering);
        }
      }

      if (lagringStatus.status === RestStatus.UnprocessableEntity) {
        validateBackendResponse(lagringStatus);
      }

      if (lagringStatus.status === RestStatus.Unauthorized) {
        dispatchFeilmelding({
          type: 'General',
          feilmelding: 'Du har ikke tilgang til å lagre.'
        });
      }

      if (lagringStatus.status === RestStatus.Created) {
        history.push(lenker.GravidKvittering);
      } else {
        setSkjemaStatus(GravidStatus.DEFAULT);
      }
    }
  };

  const validateBackendResponse = (
    beResponse: lagreGravideInterface
  ): boolean => {
    const validering = beResponse.validering;

    if (!beResponse.validering) {
      dispatchFeilmelding({
        type: 'General',
        feilmelding: 'Lagringen gikk galt'
      });
      return false;
    }

    if (isBackendServerError(validering)) {
      dispatchFeilmelding({
        type: 'General',
        feilmelding: `${validering.title} (${validering.status})`
      });
      return false;
    }

    if (isBackendValidationError(validering)) {
      ((validering as unknown) as lagreGravideValidationError).violations.forEach(
        (error) => {
          dispatchFeilmelding({
            type: error.propertyPath,
            feilmelding: error.message
          });
        }
      );
      return false;
    }
    return true;
  };

  const feilmeldingsliste = feilListe(feilmelding);
  if (!feilmeldingsliste) {
    setSubmittedState(false);
  }

  const years: string[] = ['2017', '2018', '2019', '2020'];
  const headers: string[] = ['Måned', 'Dager'];
  const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Des'
  ];

  return (
    <Row>
      <Column>
        <SoknadTittel>
          Søknad om at NAV dekker sykepenger i arbeidsgiverperioden
        </SoknadTittel>

        {skjemaStatus === GravidStatus.IN_PROGRESS && <GravidProgress />}

        {skjemaStatus === GravidStatus.SUCCESS && <GravidKvittering />}

        {skjemaStatus === GravidStatus.ERROR && <GravidFeil />}

        {(skjemaStatus === GravidStatus.DEFAULT ||
          skjemaStatus === GravidStatus.BAD_REQUEST) && (
          <SideIndentering>
            <Panel>
              <Ingress>
                NAV kan dekke sykepenger i arbeidsgiverperioden hvis fraværet
                skyldes helseplager i svangerskapet. Dette gjelder bare hvis
                tilrettelegging eller omplassering ikke er mulig.​ Vi bruker
                opplysninger vi allerede har om sykefraværet, i tillegg til
                svarene du gir nedenfor. Ordningen er beskrevet i{' '}
                <Lenke href='https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20'>
                  folketrygdlovens § 8-20
                </Lenke>
                .
                <br />
              </Ingress>
            </Panel>
            <Skillelinje />
            <Panel>
              <Undertittel tag='span'>
                Alle felter er obligatoriske om ikke merket annerledes
              </Undertittel>
            </Panel>
            <Skillelinje />

            <Panel id='gravidside-panel-ansatte'>
              <SkjemaGruppe legend='Den ansatte' aria-live='polite'>
                <Row>
                  <Column sm='4' xs='6'>
                    <Fnr
                      label='Fødselsnummer (11 siffer)'
                      fnr={skjema.fnr}
                      placeholder='11 siffer'
                      feilmelding={feilmelding.ansatteFeilmeldingId}
                      onValidate={() => {}}
                      onChange={(fnr: string) =>
                        dispatchSkjema({ field: 'fnr', value: fnr })
                      }
                    />
                  </Column>
                  <Column sm='4' xs='6'>
                    <Orgnr
                      label='Organisasjonsnummer'
                      orgnr={skjema.orgnr}
                      placeholder='9 siffer'
                      feilmelding={feilmelding.arbeidsgiverFeilmeldingId}
                      onChange={(orgnr: string) =>
                        dispatchSkjema({ field: 'orgnr', value: orgnr })
                      }
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
              >
                <Normaltekst>
                  Vi spør først om dere har forsøkt å løse situasjonen på
                  arbeidsplassen.
                </Normaltekst>
                <Normaltekst>
                  Svaret deres brukes i to forskjellige vurderinger: ​
                </Normaltekst>

                <ul className='gravidside-tett-liste'>
                  <li>
                    om vi kan hjelpe til med noe, slik at den ansatte kan stå i
                    jobben
                  </li>
                  <li>om vi skal dekke sykepenger i arbeidsgiverperioden</li>
                </ul>
                <CheckboxGruppe
                  legend='Hva slags arbeid utfører den ansatte?'
                  feil={feilmelding.tiltakFeilmeldingId}
                  feilmeldingId='arbeidsutfører'
                >
                  <Column sm='4' xs='6'>
                    <Checkbox
                      label='Stillesittende arbeid'
                      value={Tiltak.TILPASSET_ARBEIDSTID}
                      id={'stillesittende'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.TILPASSET_ARBEIDSTID,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={
                        skjema.tiltak &&
                        skjema.tiltak.indexOf(Tiltak.TILPASSET_ARBEIDSTID) > -1
                      }
                    />
                    <Checkbox
                      label='Moderat fysisk arbeid'
                      value={Tiltak.HJEMMEKONTOR}
                      id={'moderat'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.HJEMMEKONTOR,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={
                        skjema.tiltak &&
                        skjema.tiltak.indexOf(Tiltak.HJEMMEKONTOR) > -1
                      }
                    />
                    <Checkbox
                      label='Fysisk krevende arbeid'
                      value={Tiltak.TILPASSEDE_ARBEIDSOPPGAVER}
                      id={'fysisk'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.TILPASSEDE_ARBEIDSOPPGAVER,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={
                        skjema.tiltak &&
                        skjema.tiltak.indexOf(
                          Tiltak.TILPASSEDE_ARBEIDSOPPGAVER
                        ) > -1
                      }
                    />
                  </Column>
                </CheckboxGruppe>

                <CheckboxGruppe
                  legend='Hvilke påkjenninger innebærer arbeidet?​'
                  feil={feilmelding.tiltakFeilmeldingId}
                  feilmeldingId='påkjenninger'
                >
                  <Column sm='4' xs='6'>
                    <Checkbox
                      label='Allergener eller giftstofferd'
                      value={Tiltak.TILPASSET_ARBEIDSTID}
                      id={'allergener'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.TILPASSET_ARBEIDSTID,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={
                        skjema.tiltak &&
                        skjema.tiltak.indexOf(Tiltak.TILPASSET_ARBEIDSTID) > -1
                      }
                    />
                    <Checkbox
                      label='Ukomfortabel temperatur eller luftfuktighet​'
                      value={Tiltak.TILPASSET_ARBEIDSTID}
                      id={'ukomfortabel'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.TILPASSET_ARBEIDSTID,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={
                        skjema.tiltak &&
                        skjema.tiltak.indexOf(Tiltak.TILPASSET_ARBEIDSTID) > -1
                      }
                    />
                    <Checkbox
                      label='Stressende omgivelser'
                      value={Tiltak.TILPASSET_ARBEIDSTID}
                      id={'stressende'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.TILPASSET_ARBEIDSTID,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={
                        skjema.tiltak &&
                        skjema.tiltak.indexOf(Tiltak.TILPASSET_ARBEIDSTID) > -1
                      }
                    />
                    <Checkbox
                      label='Regelmessige kveldsskift eller nattskift'
                      value={Tiltak.TILPASSET_ARBEIDSTID}
                      id={'regelmessige'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.TILPASSET_ARBEIDSTID,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={
                        skjema.tiltak &&
                        skjema.tiltak.indexOf(Tiltak.TILPASSET_ARBEIDSTID) > -1
                      }
                    />
                    <Checkbox
                      label='Mye gåing/ståing'
                      value={Tiltak.TILPASSET_ARBEIDSTID}
                      id={'gåing'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.TILPASSET_ARBEIDSTID,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={
                        skjema.tiltak &&
                        skjema.tiltak.indexOf(Tiltak.TILPASSET_ARBEIDSTID) > -1
                      }
                    />
                  </Column>
                  <Column sm='4' xs='6'>
                    <Checkbox
                      label='Harde gulv'
                      value={Tiltak.TILPASSET_ARBEIDSTID}
                      id={'harde'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.TILPASSET_ARBEIDSTID,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={
                        skjema.tiltak &&
                        skjema.tiltak.indexOf(Tiltak.TILPASSET_ARBEIDSTID) > -1
                      }
                    />
                    <Checkbox
                      label='Tunge løft'
                      value={Tiltak.TILPASSET_ARBEIDSTID}
                      id={'tunge'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.TILPASSET_ARBEIDSTID,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={
                        skjema.tiltak &&
                        skjema.tiltak.indexOf(Tiltak.TILPASSET_ARBEIDSTID) > -1
                      }
                    />
                    <Checkbox
                      label='Annet, gi en kort beskrivelse:'
                      value={Tiltak.TILPASSET_ARBEIDSTID}
                      id={'annet'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.TILPASSET_ARBEIDSTID,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={
                        skjema.tiltak &&
                        skjema.tiltak.indexOf(Tiltak.TILPASSET_ARBEIDSTID) > -1
                      }
                    />
                    <Textarea
                      value={skjema.tiltakBeskrivelse || ''}
                      feil={feilmelding.tilretteleggeFeilmeldingId}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: 'tiltakBeskrivelse',
                          value: evt.currentTarget.value
                        })
                      }
                      disabled={!isTiltakAnnet}
                    />
                  </Column>
                </CheckboxGruppe>
              </SkjemaGruppe>

              {!skjema.tilrettelegge && skjema.tilrettelegge === false && (
                <>
                  <Skillelinje />
                  <Alertstripe
                    className='gravidside-alert-gravid'
                    type='advarsel'
                  >
                    <Normaltekst>
                      Dere må først ha prøvd å tilrettelegge for den gravide.​
                      Dere kan
                      <button
                        className='lenke gravidside-lenke-knapp'
                        onClick={() => setVidere(true)}
                      >
                        gå videre med søknaden
                      </button>
                      , men det er altså da sannsynlig at den blir avslått.
                    </Normaltekst>
                  </Alertstripe>
                </>
              )}
            </Panel>

            {(skjema.tilrettelegge === true || videre) && (
              <>
                <Skillelinje />

                <Panel>
                  <SkjemaGruppe
                    legend='Hvis dere har fått dokumentasjon fra den ansatte'
                    feil={feilmelding.dokumentasjonFeilmeldingId}
                    feilmeldingId='dokumentasjonFeilmeldingId'
                    aria-live='polite'
                  >
                    <Normaltekst>
                      Som arbeidsgiver kan dere ikke kreve å få se
                      helseopplysninger. Men hvis den ansatte allerede har gitt
                      dere slik dokumentasjon frivillig, kan dere skanne eller
                      ta bilde av den og laste den opp her. Vi tar imot .pdf
                      .jpeg, .png, og de fleste formater fra smarttelefonkamera.
                    </Normaltekst>
                    <br />
                    <Normaltekst>
                      NAV kan også selv innhente dokumentasjon fra legen hvis
                      det er nødvendig.
                    </Normaltekst>
                    <Upload
                      id='upload'
                      label='LAST OPP LEGEERKLÆRINGEN (valgfritt)'
                      extensions='.jpg,.pdf'
                      onChange={handleUploadChanged}
                      fileSize={250000}
                    />
                  </SkjemaGruppe>
                </Panel>

                <Skillelinje />
                <Panel>
                  <SkjemaGruppe
                    legend='Fraværet'
                    feil={feilmelding.dokumentasjonFeilmeldingId}
                    feilmeldingId='dokumentasjonFeilmeldingId'
                    aria-live='polite'
                  >
                    <Normaltekst>
                      Skriv inn antall dager med sykefravære relatert til
                      søknaden i hver måned. Dere kan gå 3 år tilbake i tid hvis
                      både arbeidsforholdet og helseproblemene har vart så
                      lenge.
                    </Normaltekst>

                    <table className='tabell tabell--stripet'>
                      <tr>
                        {years.map((year) => (
                          <th key={year}>
                            {year}
                            <tr>
                              {headers.map((header) => (
                                <th key={year + header}>{header}</th>
                              ))}
                            </tr>
                            {months.map((month) => (
                              <tr key={year + month}>
                                <td>{month}</td>
                                <td>
                                  <Input aria-labelledby='' defaultValue='' />
                                </td>
                              </tr>
                            ))}
                          </th>
                        ))}
                      </tr>

                      <tbody></tbody>
                    </table>
                  </SkjemaGruppe>
                </Panel>

                <Skillelinje />

                <Panel>
                  <SkjemaGruppe feilmeldingId='bekreftFeilmeldingId'>
                    <BekreftCheckboksPanel
                      label='Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige.'
                      checked={skjema.bekreftet || false}
                      feil={feilmelding.bekreftFeilmeldingId}
                      onChange={() =>
                        dispatchSkjema({
                          field: 'bekreftet',
                          value: !skjema.bekreftet
                        })
                      }
                    >
                      Jeg vet at NAV kan trekke tilbake retten til å få dekket
                      sykepengene i arbeidsgiverperioden hvis opplysningene ikke
                      er riktige eller fullstendige.
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

export default KroniskSide;
