import React, { useReducer, useState } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import {
  BekreftCheckboksPanel,
  Checkbox,
  CheckboxGruppe,
  Feiloppsummering,
  Input,
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
import Lenke from 'nav-frontend-lenker';
import Orgnr from '../Orgnr';
import GravidSideProps from '../gravid/GravidSideProps';
import { skjemaState } from '../gravid/skjemaReducer';
import { Tiltak } from '../gravid/gravidSideEnums';
import KroniskState, { defaultKroniskState } from './KroniskState';
import KroniskReducer from './KroniskReducer';
import { Actions } from './Actions';
import { ArbeidType } from './ArbeidType';
import { PåkjenningerType } from './PåkjenningerType';
import getBase64file from '../gravid/getBase64File';

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

const KroniskSide = (props: KroniskState) => {
  const [state, dispatch] = useReducer(KroniskReducer, {}, defaultKroniskState);
  const { fnr, fnrError, feilmeldinger } = state;
  // const [skjemaStatus, setSkjemaStatus] = useState<number>(
  //   props.status || GravidStatus.DEFAULT
  // );
  // const [videre, setVidere] = useState<boolean>(props.videre || false);
  const [validated, setValidated] = useState<boolean>(props.validated || false);
  const [submittedState, setSubmittedState] = useState<boolean>(false);
  let submitted: boolean = submittedState;
  // const [feilmelding, dispatchFeilmelding] = useReducer(
  //   feilmeldingReducer,
  //   initialStateFeilmelding
  // );
  // const initialFormState = preparePropsForState(props);
  // const [skjema, dispatchSkjema] = useReducer(skjemaReducer, initialFormState);
  // const history: History = useHistory();
  const handleUploadChanged = (file?: File) => {
    if (file) {
      getBase64file(file).then((base64encoded: any) => {
        dispatch({ type: Actions.Dokumentasjon, payload: base64encoded });
      });
    }
  };
  // const isTiltakAnnet =
  // //   skjema.tiltak && skjema.tiltak.indexOf(Tiltak.ANNET) > -1;
  //
  // const validateFnr = (): boolean => {
  //   if (!submitted || (skjema.fnr && isValidFnr(skjema.fnr))) {
  //     dispatchFeilmelding({
  //       type: 'ansatteFeilmeldingId',
  //       feilmelding: ''
  //     });
  //     return true;
  //   } else {
  //     dispatchFeilmelding({
  //       type: 'ansatteFeilmeldingId',
  //       feilmelding: 'Fyll ut gyldig fødselsnummer'
  //     });
  //     return false;
  //   }
  // };
  //
  // const validateOrgnr = (): boolean => {
  //   if (!submitted || (skjema.orgnr && isValidOrgnr(skjema.orgnr))) {
  //     dispatchFeilmelding({
  //       type: 'arbeidsgiverFeilmeldingId',
  //       feilmelding: ''
  //     });
  //     return true;
  //   } else {
  //     dispatchFeilmelding({
  //       type: 'arbeidsgiverFeilmeldingId',
  //       feilmelding: 'Fyll ut gyldig organisasjonsnummer'
  //     });
  //     return false;
  //   }
  // };
  //
  // const validateTilrettelegge = (): boolean => {
  //   if (submitted && skjema.tilrettelegge === undefined) {
  //     dispatchFeilmelding({
  //       type: 'tilretteleggeFeilmeldingId',
  //       feilmelding: 'Spesifiser om dere har tilrettelagt arbeidsdagen'
  //     });
  //     return false;
  //   } else {
  //     dispatchFeilmelding({
  //       type: 'tilretteleggeFeilmeldingId',
  //       feilmelding: ''
  //     });
  //     return true;
  //   }
  // };
  //
  // const validateTiltak = (): boolean => {
  //   if (submitted) {
  //     if (
  //       isTiltakAnnet &&
  //       (!skjema.tiltakBeskrivelse || skjema.tiltakBeskrivelse.length === 0)
  //     ) {
  //       dispatchFeilmelding({
  //         type: 'tiltakFeilmeldingId',
  //         feilmelding: 'Spesifiser hvilke tiltak som er forsøkt'
  //       });
  //       return false;
  //     }
  //     if (!skjema.tiltak) {
  //       dispatchFeilmelding({
  //         type: 'tiltakFeilmeldingId',
  //         feilmelding: 'Du må oppgi minst ett tiltak dere har prøvd'
  //       });
  //       return false;
  //     }
  //   }
  //   dispatchFeilmelding({
  //     type: 'tiltakFeilmeldingId',
  //     feilmelding: ''
  //   });
  //   return true;
  // };
  //
  // const validateOmplassering = (): boolean => {
  //   if (submitted && !skjema.omplassering) {
  //     dispatchFeilmelding({
  //       type: 'omplasseringFeilmeldingId',
  //       feilmelding: 'Velg omplassering'
  //     });
  //     return false;
  //   } else {
  //     dispatchFeilmelding({
  //       type: 'omplasseringFeilmeldingId',
  //       feilmelding: ''
  //     });
  //     return true;
  //   }
  // };
  //
  // const validateBekreftet = (): boolean => {
  //   if (submitted && !skjema.bekreftet) {
  //     dispatchFeilmelding({
  //       type: 'bekreftFeilmeldingId',
  //       feilmelding: 'Bekreft at opplysningene er korrekt'
  //     });
  //     return false;
  //   } else {
  //     dispatchFeilmelding({
  //       type: 'bekreftFeilmeldingId',
  //       feilmelding: ''
  //     });
  //     return true;
  //   }
  // };
  //
  // const validateForm = (): boolean => {
  //   const altValidert: boolean = skjema.tilrettelegge
  //     ? [
  //         validateFnr(),
  //         validateOrgnr(),
  //         validateTilrettelegge(),
  //         validateTiltak(),
  //         validateOmplassering(),
  //         validateBekreftet()
  //       ].every(Boolean)
  //     : [
  //         validateFnr(),
  //         validateOrgnr(),
  //         validateTilrettelegge(),
  //         validateBekreftet()
  //       ].every(Boolean);
  //
  //   submitted = !altValidert;
  //   setSubmittedState(submitted);
  //   return altValidert;
  // };
  //
  // useEffect(() => {
  //   validateForm();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [skjema]);
  //
  // useEffect(() => {
  //   if (validated) {
  //     validateForm();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  //
  // const handleSubmitClicked = async () => {
  //   submitted = true;
  //   setSubmittedState(submitted);
  //   if (validateForm()) {
  //     // submit
  //     const payload: lagreGravidesoknadParametere = {
  //       orgnr: skjema.orgnr,
  //       fnr: skjema.fnr,
  //       tilrettelegge: skjema.tilrettelegge,
  //       tiltak: skjema.tiltak,
  //       tiltakBeskrivelse: skjema.tiltakBeskrivelse,
  //       omplassering: skjema.omplassering,
  //       omplasseringAarsak: skjema.omplasseringAarsak,
  //       bekreftet: skjema.bekreftet,
  //       dokumentasjon: skjema.dokumentasjon
  //     };
  //
  //     setSkjemaStatus(GravidStatus.IN_PROGRESS);
  //     const lagringStatus = await lagreGravidesoknad(
  //       environment.baseUrl,
  //       payload
  //     );
  //
  //     if (lagringStatus.status === RestStatus.Successfully) {
  //       const backendStatusOK = validateBackendResponse(lagringStatus);
  //
  //       if (backendStatusOK) {
  //         history.push(lenker.GravidKvittering);
  //       }
  //     }
  //
  //     if (lagringStatus.status === RestStatus.UnprocessableEntity) {
  //       validateBackendResponse(lagringStatus);
  //     }
  //
  //     if (lagringStatus.status === RestStatus.Unauthorized) {
  //       dispatchFeilmelding({
  //         type: 'General',
  //         feilmelding: 'Du har ikke tilgang til å lagre.'
  //       });
  //     }
  //
  //     if (lagringStatus.status === RestStatus.Created) {
  //       history.push(lenker.GravidKvittering);
  //     } else {
  //       setSkjemaStatus(GravidStatus.DEFAULT);
  //     }
  //   }
  // };
  //
  // const validateBackendResponse = (
  //   beResponse: lagreGravideInterface
  // ): boolean => {
  //   const validering = beResponse.validering;
  //
  //   if (!beResponse.validering) {
  //     dispatchFeilmelding({
  //       type: 'General',
  //       feilmelding: 'Lagringen gikk galt'
  //     });
  //     return false;
  //   }
  //
  //   if (isBackendServerError(validering)) {
  //     dispatchFeilmelding({
  //       type: 'General',
  //       feilmelding: `${validering.title} (${validering.status})`
  //     });
  //     return false;
  //   }
  //
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
  //
  // const feilmeldingsliste = feilListe(feilmelding);
  // if (!feilmeldingsliste) {
  //   setSubmittedState(false);
  // }

  const years: number[] = [2017, 2018, 2019, 2020];
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
        <SideIndentering>
          <Panel>
            <Ingress>
              NAV kan dekke sykepenger i arbeidsgiverperioden for en
              arbeidstaker med langvarig eller kronisk sykdom. ​ Vi bruker
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
                    fnr={props.fnr}
                    placeholder='11 siffer'
                    feilmelding={props.fnrError}
                    onValidate={() => {}}
                    onChange={(fnr: string) =>
                      dispatch({ type: Actions.Fnr, payload: { fnr: fnr } })
                    }
                  />
                </Column>
                <Column sm='4' xs='6'>
                  <Orgnr
                    label='Organisasjonsnummer'
                    orgnr={props.orgnr}
                    placeholder='9 siffer'
                    feilmelding={props.orgnrError}
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

          <Panel>
            <SkjemaGruppe legend='Arbeidssituasjon og miljø'>
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
                feil={props.arbeidError}
                feilmeldingId='arbeidsutfører'
              >
                <Column sm='4' xs='6'>
                  <Checkbox
                    label='Stillesittende arbeid'
                    value={ArbeidType.Stillesittende}
                    id={'stillesittende'}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.ToggleArbeid,
                        payload: { arbeid: ArbeidType.Stillesittende }
                      })
                    }
                    checked={props.arbeid?.includes(ArbeidType.Stillesittende)}
                  />
                  <Checkbox
                    label='Moderat fysisk arbeid'
                    value={ArbeidType.Moderat}
                    id={'moderat'}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.ToggleArbeid,
                        payload: { arbeid: ArbeidType.Moderat }
                      })
                    }
                    checked={props.arbeid?.includes(ArbeidType.Moderat)}
                  />
                  <Checkbox
                    label='Fysisk krevende arbeid'
                    value={ArbeidType.Krevende}
                    id={'fysisk'}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.ToggleArbeid,
                        payload: { arbeid: ArbeidType.Krevende }
                      })
                    }
                    checked={props.arbeid?.includes(ArbeidType.Krevende)}
                  />
                </Column>
              </CheckboxGruppe>

              <CheckboxGruppe
                legend='Hvilke påkjenninger innebærer arbeidet?​'
                feil={props.påkjenningerError}
                feilmeldingId='påkjenninger'
              >
                <Column sm='4' xs='6'>
                  <Checkbox
                    label='Allergener eller giftstofferd'
                    value={PåkjenningerType.Allergener}
                    id={'allergener'}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.TogglePaakjenninger,
                        payload: { påkjenning: PåkjenningerType.Allergener }
                      })
                    }
                    checked={props.påkjenninger?.includes(
                      PåkjenningerType.Allergener
                    )}
                  />
                  <Checkbox
                    label='Ukomfortabel temperatur eller luftfuktighet​'
                    value={PåkjenningerType.Ukomfortabel}
                    id={'ukomfortabel'}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.TogglePaakjenninger,
                        payload: { påkjenning: PåkjenningerType.Ukomfortabel }
                      })
                    }
                    checked={props.påkjenninger?.includes(
                      PåkjenningerType.Ukomfortabel
                    )}
                  />
                  <Checkbox
                    label='Stressende omgivelser'
                    value={PåkjenningerType.Stressende}
                    id={'stressende'}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.TogglePaakjenninger,
                        payload: { påkjenning: PåkjenningerType.Stressende }
                      })
                    }
                    checked={props.påkjenninger?.includes(
                      PåkjenningerType.Stressende
                    )}
                  />
                  <Checkbox
                    label='Regelmessige kveldsskift eller nattskift'
                    value={PåkjenningerType.RegelmessigKveldsskift}
                    id={'regelmessige'}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.TogglePaakjenninger,
                        payload: {
                          påkjenning: PåkjenningerType.RegelmessigKveldsskift
                        }
                      })
                    }
                    checked={props.påkjenninger?.includes(
                      PåkjenningerType.RegelmessigKveldsskift
                    )}
                  />
                  <Checkbox
                    label='Mye gåing/ståing'
                    value={PåkjenningerType.Gåing}
                    id={'gåing'}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.TogglePaakjenninger,
                        payload: { påkjenning: PåkjenningerType.Gåing }
                      })
                    }
                    checked={props.påkjenninger?.includes(
                      PåkjenningerType.Gåing
                    )}
                  />
                </Column>
                <Column sm='4' xs='6'>
                  <Checkbox
                    label='Harde gulv'
                    value={PåkjenningerType.HardeGulv}
                    id={'harde'}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.TogglePaakjenninger,
                        payload: { påkjenning: PåkjenningerType.HardeGulv }
                      })
                    }
                    checked={props.påkjenninger?.includes(
                      PåkjenningerType.HardeGulv
                    )}
                  />
                  <Checkbox
                    label='Tunge løft'
                    value={PåkjenningerType.TungeLøft}
                    id={'tunge'}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.TogglePaakjenninger,
                        payload: { påkjenning: PåkjenningerType.TungeLøft }
                      })
                    }
                    checked={props.påkjenninger?.includes(
                      PåkjenningerType.TungeLøft
                    )}
                  />
                  <Checkbox
                    label='Annet, gi en kort beskrivelse:'
                    value={PåkjenningerType.Annet}
                    id={'annet'}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.TogglePaakjenninger,
                        payload: { påkjenning: PåkjenningerType.Annet }
                      })
                    }
                    checked={props.påkjenninger?.includes(
                      PåkjenningerType.Annet
                    )}
                  />
                  <Textarea
                    label='annet'
                    value={props.kommentar || ''}
                    feil={props.kommentarError}
                    onChange={(evt) =>
                      dispatch({
                        type: Actions.Kommentar,
                        payload: { påkjenning: PåkjenningerType.Annet }
                      })
                    }
                    disabled={
                      !props.påkjenninger?.includes(PåkjenningerType.Annet)
                    }
                  />
                </Column>
              </CheckboxGruppe>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje />

          <Panel>
            <SkjemaGruppe
              legend='Hvis dere har fått dokumentasjon fra den ansatte'
              feil={props.dokumentasjonError}
              feilmeldingId='dokumentasjon'
              aria-live='polite'
            >
              <Normaltekst>
                Som arbeidsgiver kan dere ikke kreve å få se helseopplysninger.
                Men hvis den ansatte allerede har gitt dere slik dokumentasjon
                frivillig, kan dere skanne eller ta bilde av den og laste den
                opp her. Vi tar imot .pdf .jpeg, .png, og de fleste formater fra
                smarttelefonkamera.
              </Normaltekst>
              <br />
              <Normaltekst>
                NAV kan også selv innhente dokumentasjon fra legen hvis det er
                nødvendig.
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
              feil={props.fraværError}
              feilmeldingId='fravær'
              aria-live='polite'
            >
              <Normaltekst>
                Skriv inn antall dager med sykefravære relatert til søknaden i
                hver måned. Dere kan gå 3 år tilbake i tid hvis både
                arbeidsforholdet og helseproblemene har vart så lenge.
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
                            <Input
                              defaultValue=''
                              onChange={(event) =>
                                dispatch({
                                  type: Actions.Fravær,
                                  payload: {
                                    fravær: {
                                      year: year,
                                      month: months.indexOf(month),
                                      dager:
                                        event.target.value == ''
                                          ? undefined
                                          : parseInt(event.target.value)
                                    }
                                  }
                                })
                              }
                            />
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
                checked={props.bekreft || false}
                feil={props.bekreftError}
                onChange={() =>
                  dispatch({
                    type: Actions.Bekreft,
                    payload: { bekreft: !props.bekreft }
                  })
                }
              >
                Jeg vet at NAV kan trekke tilbake retten til å få dekket
                sykepengene i arbeidsgiverperioden hvis opplysningene ikke er
                riktige eller fullstendige.
              </BekreftCheckboksPanel>
            </SkjemaGruppe>
          </Panel>
        </SideIndentering>
      </Column>
    </Row>
  );
};

export default KroniskSide;
