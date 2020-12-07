import React, { useEffect, useReducer, useState } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import {
  BekreftCheckboksPanel,
  Checkbox,
  CheckboxGruppe,
  Feiloppsummering,
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
import './GravidSide.scss';
import GravidProgress from './GravidProgress';
import GravidStatus from './GravidStatus';
import isValidFnr from './isValidFnr';
import GravidKvittering from './GravidKvittering';
import GravidFeil from './GravidFeil';
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
import feilmeldingReducer from './feilmeldingReducer';
import skjemaReducer from './skjemaReducer';
import isBackendServerError from './isBackendServerError';
import isBackendValidationError from './isBackendValidationError';
import Lenke from 'nav-frontend-lenker';
import { Omplassering, OmplasseringAarsak, Tiltak } from './gravidSideEnums';
import feilmeldingsListe from './feilmeldingsListe';
import isValidOrgnr from './isValidOrgnr';
import Orgnr from '../Orgnr';
import GravidSideProps from './GravidSideProps';

const initialStateFeilmelding = {};

const GravidSide = (props: GravidSideProps) => {
  const [skjemaStatus, setSkjemaStatus] = useState<number>(
    props.status || GravidStatus.DEFAULT
  );
  const [tilrettelegge, setTilrettelegge] = useState<boolean | undefined>(
    props.tilrettelegge
  );
  const [dokumentasjon, setDokumentasjon] = useState<File>();
  const [videre, setVidere] = useState<boolean>(props.videre || false);
  const [submittedState, setSubmittedState] = useState<boolean>(
    props.submitted || false
  );
  let submitted: boolean = submittedState;
  const [feilmelding, dispatchFeilmelding] = useReducer(
    feilmeldingReducer,
    initialStateFeilmelding
  );
  const [skjema, dispatchSkjema] = useReducer(skjemaReducer, {});
  const history: History = useHistory();
  const handleUploadChanged = (file?: File) => {
    setDokumentasjon(file);
  };
  const isTiltakAnnet =
    skjema.tiltak && skjema.tiltak.indexOf(Tiltak.ANNET) > -1;

  // const validateBackendResponse = (
  //   beResponse: lagreGravideInterface
  // ): boolean => {
  //   const validering = beResponse.validering;

  //   if (!beResponse.validering) {
  //     dispatchFeilmelding({
  //       type: 'General',
  //       feilmelding: 'Lagringen gikk galt'
  //     });
  //     return false;
  //   }
  //   if (isBackendServerError(validering)) {
  //     dispatchFeilmelding({
  //       type: 'General',
  //       feilmelding: `${validering.title} (${validering.status})`
  //     });
  //     return false;
  //   }

  //   if (isBackendValidationError(validering)) {
  //     ((validering as unknown) as lagreGravideValidationError).violations.forEach(
  //       (error) => {
  //         dispatchFeilmelding({
  //           type: error.propertyPath,
  //           feilmelding: error.message
  //         });
  //       }
  //     );
  //     return false;
  //   }
  //   return true;
  // };


  const validateFnr = (): boolean => {
    if (!submitted || (skjema.fnr && isValidFnr(skjema.fnr))) {
      dispatchFeilmelding({
        type: 'ansatteFeilmeldingId',
        feilmelding: ''
      });
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

  const validateTiltak = (): boolean => {
    if (submitted) {
      if (
        isTiltakAnnet &&
        (!skjema.tiltakBeskrivelse || skjema.tiltakBeskrivelse.length === 0)
      ) {
        dispatchFeilmelding({
          type: 'tilretteleggeFeilmeldingId',
          feilmelding: 'Spesifiser hvilke tiltak som er forsøkt'
        });
        return false;
      }
      if (!skjema.tiltak) {
        dispatchFeilmelding({
          type: 'tilretteleggeFeilmeldingId',
          feilmelding: 'Du må oppgi minst ett tiltak dere har prøvd'
        });
        return false;
      }
    }
    dispatchFeilmelding({
      type: 'tilretteleggeFeilmeldingId',
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
    const altValidert: boolean = [
      validateFnr(),
      validateOrgnr(),
      validateTiltak(),
      validateOmplassering(),
      validateBekreftet()
    ].every(Boolean);

    submitted = !altValidert;
    setSubmittedState(submitted);
    return altValidert;
  };

  useEffect(() => {
    validateForm();
  }, [skjema]);

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
        bekreftet: skjema.bekreftet
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

      setSkjemaStatus(GravidStatus.DEFAULT);
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

  const feilmeldingsliste = feilmeldingsListe(feilmelding);
  if (!feilmeldingsliste) {
    setSubmittedState(false);
  }

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
              <SkjemaGruppe
                legend='Den ansatte'
                aria-live='polite'
                feilmeldingId='ansatteFeilmeldingId'
              >
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

                <RadioGruppe legend='Har dere prøvd å tilrettelegge arbeidsdagen slik at den gravide kan jobbe til tross for helseplagene?'>
                  <Radio
                    label='Ja'
                    name='sitteplass'
                    value='ja'
                    defaultChecked={tilrettelegge === true}
                    onClick={() => setTilrettelegge(true)}
                  />
                  <Radio
                    label='Nei'
                    name='sitteplass'
                    value='nei'
                    defaultChecked={tilrettelegge === false}
                    onClick={() => setTilrettelegge(false)}
                  />
                </RadioGruppe>
              </SkjemaGruppe>

              {tilrettelegge ? (
                <>
                  <CheckboxGruppe
                    legend='Hvilke tiltak er forsøkt/vurdert for at arbeidstaker skal kunne være i arbeid i svangerskapet?'
                    feil={feilmelding.tilretteleggeFeilmeldingId}
                    feilmeldingId='tilretteleggeFeilmeldingId'
                  >
                    <Checkbox
                      label='Fleksibel eller tilpasset arbeidstid'
                      value={Tiltak.TILPASSET_ARBEIDSTID}
                      id={'arbeidstid'}
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
                      label='Hjemmekontor'
                      value={Tiltak.HJEMMEKONTOR}
                      id={'hjemmekontor'}
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
                      label='Tilpassede arbeidsoppgaver'
                      value={Tiltak.TILPASSEDE_ARBEIDSOPPGAVER}
                      id={'oppgaver'}
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
                    <Checkbox
                      label='Annet, gi en kort beskrivelse av hva dere har gjort:'
                      value={Tiltak.ANNET}
                      id={'annet'}
                      onChange={(evt) =>
                        dispatchSkjema({
                          field: Tiltak.ANNET,
                          value: evt.currentTarget.value
                        })
                      }
                      checked={isTiltakAnnet}
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
                  </CheckboxGruppe>
                  <SkjemaGruppe
                    feil={feilmelding.omplasseringFeilmeldingId}
                    feilmeldingId='omplasseringFeilmeldingId'
                  >
                    <div className='gravid-side-radiogruppe-omplassering'>
                      <RadioGruppe legend='Har dere forsøkt omplassering til en annen jobb?'>
                        <Radio
                          label='Ja'
                          name='omplassering'
                          onChange={() =>
                            dispatchSkjema({
                              field: 'omplassering',
                              value: Omplassering.JA
                            })
                          }
                          checked={skjema.omplassering === Omplassering.JA}
                        />
                        <Radio
                          label='Nei'
                          name='omplassering'
                          checked={skjema.omplassering === Omplassering.NEI}
                          onChange={() =>
                            dispatchSkjema({
                              field: 'omplassering',
                              value: Omplassering.NEI
                            })
                          }
                        />
                        <Radio
                          label='Omplassering er ikke mulig - oppgi årsak:'
                          name='omplassering'
                          onChange={() =>
                            dispatchSkjema({
                              field: 'omplassering',
                              value: Omplassering.IKKE_MULIG
                            })
                          }
                          checked={
                            skjema.omplassering === Omplassering.IKKE_MULIG
                          }
                        />
                        <RadioGruppe className='gravideside-radiogruppe-indentert'>
                          <Radio
                            label='Den ansatte motsetter seg omplassering'
                            name='omplassering-umulig'
                            onChange={() =>
                              dispatchSkjema({
                                field: 'omplasseringAarsak',
                                value: OmplasseringAarsak.MOTSETTER
                              })
                            }
                            disabled={
                              skjema.omplassering !== Omplassering.IKKE_MULIG
                            }
                            checked={
                              skjema.omplasseringAarsak ===
                              OmplasseringAarsak.MOTSETTER
                            }
                          />
                          <Radio
                            label='Vi får ikke kontakt med den ansatte'
                            name='omplassering-umulig'
                            onChange={() => {
                              dispatchSkjema({
                                field: 'omplasseringAarsak',
                                value: OmplasseringAarsak.FAAR_IKKE_KONTAKT
                              });
                            }}
                            checked={
                              skjema.omplasseringAarsak ===
                              OmplasseringAarsak.FAAR_IKKE_KONTAKT
                            }
                            disabled={
                              skjema.omplassering !== Omplassering.IKKE_MULIG
                            }
                          />
                          <Radio
                            label='Vi har ikke andre oppgaver eller arbeidssteder å tilby'
                            name='omplassering-umulig'
                            onChange={() =>
                              dispatchSkjema({
                                field: 'omplasseringAarsak',
                                value: OmplasseringAarsak.IKKE_ANDRE_OPPGAVER
                              })
                            }
                            checked={
                              skjema.omplasseringAarsak ===
                              OmplasseringAarsak.IKKE_ANDRE_OPPGAVER
                            }
                            disabled={
                              skjema.omplassering !== Omplassering.IKKE_MULIG
                            }
                          />
                          <Radio
                            label='Den ansatte vil ikke fungere i en annen jobb på grunn av helsetilstanden​'
                            name='omplassering-umulig'
                            checked={
                              skjema.omplasseringAarsak ===
                              OmplasseringAarsak.HELSETILSTANDEN
                            }
                            onChange={() =>
                              dispatchSkjema({
                                field: 'omplasseringAarsak',
                                value: OmplasseringAarsak.HELSETILSTANDEN
                              })
                            }
                            disabled={
                              skjema.omplassering !== Omplassering.IKKE_MULIG
                            }
                          />
                        </RadioGruppe>
                      </RadioGruppe>
                    </div>
                  </SkjemaGruppe>
                </>
              ) : (
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

            {(tilrettelegge || videre) && (
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
                      det ikke allerede går klart fram av en sykmelding at det
                      er svangerskapet som er årsaken til fraværet.
                    </Normaltekst>
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

export default GravidSide;
