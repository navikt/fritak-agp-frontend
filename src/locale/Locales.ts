import LangKey from './LangKey';

export interface Locale {
  en: string;
  nb: string;
}

const Locales: Record<LangKey, Locale> = {
  ADD: {
    nb: 'Legg til enda en ansatt',
    en: 'Add another employee'
  },
  BEKREFT_OPPLYSNINGER_OVERSKRIFT: {
    nb: 'Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige.',
    en: 'I confirm that the information I have provided is correct and complete.'
  },
  BEKREFT_OPPLYSNINGER_BESKRIVELSE: {
    nb: 'Jeg vet at NAV kan trekke tilbake retten til å få dekket sykepengene i arbeidsgiverperioden hvis opplysningene ikke er riktige eller fullstendige.',
    en:
      'I know that NAV can withdraw the right to be reimbursed for sickness benefits during the employer period if the ' +
      'information is not correct or complete.'
  },
  GRAVID_SIDE_UNDERTITTEL: {
    nb: 'Gravid ansatt',
    en: 'Pregnant employee'
  },
  GRAVID_SIDE_TITTEL: {
    nb: 'Søknad om at NAV dekker sykepenger i arbeidsgiverperioden',
    en: 'Application for NAV to cover sickness benefits during the employer period'
  },
  GRAVID_SIDE_INGRESS: {
    nb:
      'NAV kan dekke sykepenger i arbeidsgiverperioden hvis fraværet skyldes helseplager i svangerskapet. Dette gjelder bare hvis tilrettelegging' +
      ' eller omplassering ikke er mulig. Vi bruker opplysninger vi allerede har om sykefraværet, i tillegg til svarene du gir nedenfor. Ordningen' +
      ' er beskrevet i [folketrygdlovens § 8-20](https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20).\n\nAlle felter må' +
      ' fylles ut om ikke annet er oppgitt',
    en:
      'NAV can cover sickness benefits during the employer period if the absence is due to health problems during pregnancy. This only applies ' +
      'if facilitation or relocation is not possible. We use information we already have about sick leave, in addition to the answers you give below.' +
      ' The scheme is described in [section 8-20 of the National Insurance Act](https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20).' +
      '\n\nAll fields must be filled out unless otherwise stated'
  },
  GRAVID_SIDE_TERMINDATO: {
    nb: 'Termindato',
    en: 'Due date'
  },
  GRAVID_SIDE_ARBEIDSMILJO: {
    nb: 'Arbeidssituasjon og miljø',
    en: 'Work situation and environment'
  },
  GRAVID_SIDE_ARBEIDSMILJO_INGRESS: {
    nb:
      'Vi spør først om dere har forsøkt å løse situasjonen på arbeidsplassen.\n' +
      'Svaret deres brukes i to forskjellige vurderinger:\n' +
      '-##' +
      '--om vi kan hjelpe til med noe, slik at den ansatte kan stå i jobben\n' +
      '--om vi skal dekke sykepenger i arbeidsgiverperioden\n' +
      '##-',
    en:
      'We first ask if you have tried to resolve the situation in the workplace.\n' +
      'Your answer is used in two different assessments:\n' +
      '-##' +
      '--if we can help with something so that the employee can stay at work\n' +
      '--whether we are going to cover sickness benefits during the employer period\n' +
      '##-'
  },
  GRAVID_SIDE_TILRETTELEGGING: {
    nb: 'Har dere prøvd å tilrettelegge arbeidsdagen slik at den gravide kan jobbe til tross for helseplagene?',
    en: 'Have you tried to arrange the working day so that the pregnant woman can work despite the health problems?'
  },
  GRAVID_SIDE_TILTAK_TITTEL: {
    nb: 'Hvilke tiltak har dere forsøkt eller vurdert for at den ansatte kan jobbe?',
    en: 'What measures have you tried or considered for the employee to work?'
  },
  GRAVID_SIDE_TILTAK_FLEKS: {
    nb: 'Fleksibel eller tilpasset arbeidstid',
    en: 'Flexible or adapted working hours'
  },
  GRAVID_SIDE_TILTAK_HJEMMEKONTOR: {
    nb: 'Hjemmekontor',
    en: 'Home office'
  },
  GRAVID_SIDE_TILTAK_OPPGAVER: {
    nb: 'Tilpassede arbeidsoppgaver',
    en: 'Adapted work tasks'
  },
  GRAVID_SIDE_TILTAK_ANNET: {
    nb: 'Annet, gi en kort beskrivelse av hva dere har gjort:',
    en: 'Other, give a brief description of what you have done:'
  },
  GRAVID_SIDE_OMPLASSERING_TITTEL: {
    nb: 'Har dere forsøkt omplassering til en annen jobb?',
    en: 'Have you tried relocation to another job?'
  },
  GRAVID_SIDE_IKKE_KOMPLETT_1: {
    nb: 'Dere må først ha prøvd å tilrettelegge for den gravide. Dere kan',
    en: 'You must first have tried to arrange for the pregnant woman. You can'
  },
  GRAVID_SIDE_IKKE_KOMPLETT_2: {
    nb: 'gå videre med søknaden',
    en: 'continue with the submission'
  },
  GRAVID_SIDE_IKKE_KOMPLETT_3: {
    nb: ', men det er altså da sannsynlig at den blir avslått.',
    en: ', but the request will most probably be denied.'
  },
  GRAVID_SIDE_DOKUMENTASJON_TITTEL: {
    nb: 'Hvis dere har fått dokumentasjon fra den ansatte',
    en: 'If you have recieved documentation from the employee'
  },
  GRAVID_SIDE_DOKUMENTASJON_INGRESS: {
    nb:
      'Som arbeidsgiver kan dere ikke kreve å få se helseopplysninger. Men hvis den ansatte allerede ' +
      'har gitt dere slik dokumentasjon frivillig, kan dere skanne eller ta bilde av den og laste den ' +
      'opp her. _For tiden støtter vi kun filformatet .pdf._\n\nNAV vil selv innhente dokumentasjon fra ' +
      'legen hvis det ikke allerede går klart fram av en sykmelding at det er svangerskapet som er årsaken til fraværet.',
    en:
      'As an employer, you can not demand to see health information. But if the employee has already given you such ' +
      'documentation voluntarily, you can scan or take a picture of it and upload it here. _We currently only support the .pdf file format._' +
      '\n\nNAV will itself obtain documentation from the doctor if it is not already clear from a sick note that it is the pregnancy ' +
      'that is the reason for the absence.'
  },
  GRAVID_SIDE_OPPLASTINGSKNAPP: {
    nb: 'Last opp dokumentasjon (valgfritt)',
    en: 'Upload documentation (optional)'
  },
  GRAVID_SIDE_SEND_SOKNAD: {
    nb: 'Send søknad',
    en: 'Submit application'
  },
  GRAVID_SIDE_OMPLASSERING_IKKE_MULIG: {
    nb: 'Omplassering er ikke mulig - oppgi årsak:',
    en: 'Relocation is not possible - state reason:'
  },
  GRAVID_SIDE_OMPLASSERING_MOTSETTER_SEG: {
    nb: 'Den ansatte ønsker ikke omplassering',
    en: 'The employee does not want relocation'
  },
  GRAVID_SIDE_OMPLASSERING_FAAR_IKKE_KONTAKT: {
    nb: 'Vi får ikke kontakt med den ansatte',
    en: 'We can not get in touch with the employee'
  },
  GRAVID_SIDE_OMPLASSERING_IKKE_ANDRE_OPPGAVER: {
    nb: 'Vi har ikke andre oppgaver eller arbeidssteder å tilby',
    en: 'We have no other tasks or workplaces to offer'
  },
  GRAVID_SIDE_OMPLASSERING_HELSETILSTANDEN: {
    nb: 'Den ansatte vil ikke fungere i en annen jobb på grunn av helsetilstanden',
    en: 'The employee will not function in another job due to the state of health'
  },
  GRAVID_KVITTERING_TITTEL: {
    nb: 'Søknaden er mottatt',
    en: 'The application has been received'
  },
  GRAVID_KVITTERING_INGRESS: {
    nb:
      'En kvittering er sendt til meldingsboksen deres i [Altinn](https://www.altinn.no). Den' +
      ' ansatte det gjelder er også varslet om søknaden. Trenger du å kontakte oss, er det tilstrekkelig å oppgi' +
      ' fødselsnummeret til den ansatte.',
    en:
      'A receipt has been sent to their message box in [Altinn](https://www.altinn.no). The' +
      ' employee in question has also been notified of the application. If you need to contact us,' +
      " it is sufficient to provide the employee's national id-number."
  },
  GRAVID_KVITTERING_ADVARSEL: {
    nb:
      'NB: Ikke vent! Vi anbefaler å [stille krav om refusjon](/) så snart som mulig på grunn av at' +
      ' foreldelsesfristen for kravet kan bli overskredet mens vi behandler denne søknaden.',
    en:
      'NB: Do not wait! We recommend [claiming a refund](/) as soon as possible due to the fact that the' +
      ' limitation period for the claim may be exceeded while we process this application.'
  },
  GRAVID_KVITTERING_KRAV: {
    nb: 'Still krav om refusjon',
    en: 'Claim a refund'
  },
  GRAVID_KVITTERING_SENDER_INN: {
    nb: 'Vi sender inn søknaden',
    en: 'We are submitting the application'
  },
  GRAVID_KVITTERING_VENNLIGST_VENT: {
    nb: 'Vennligst vent...',
    en: 'Please wait...'
  },
  GRAVID_VALIDERING_MANGLER_BEKREFT: {
    nb: 'Mangler bekreft',
    en: 'Confirmation missing'
  },
  GRAVID_VALIDERING_UGYLDIG_ORGNR: {
    nb: 'Ugyldig virksomhetsnummer',
    en: 'Invalid business number'
  },
  GRAVID_VALIDERING_UGYLDIG_FODSELSNUMER: {
    nb: 'Ugyldig fødselsnummer',
    en: 'Invalid national identity number'
  },
  GRAVID_VALIDERING_MANGLER_FODSELSNUMMER: {
    nb: 'Fødselsnummer må fylles ut',
    en: 'National identitynumber must be filled out'
  },
  GRAVID_VALIDERING_MANGLER_VIRKSOMHETSNUMMER: {
    nb: 'Virksomhetsnummer må fylles ut',
    en: 'Business number must be filled out'
  },
  GRAVID_VALIDERING_MANGLER_TILRETTELEGGING: {
    nb: 'Spesifiser om dere har tilrettelagt arbeidsdagen',
    en: 'Specify whether you have arranged the working day'
  },
  GRAVID_VALIDERING_MANGLER_TILTAK_TITTEL: {
    nb: 'Spesifiser hvilke tiltak som er forsøkt',
    en: 'Specify which measures have been tried'
  },
  GRAVID_VALIDERING_MANGLER_TILTAK_FEIL: {
    nb: 'Du må oppgi minst ett tiltak dere har prøvd',
    en: 'You must state at least one measure you have tried'
  },
  GRAVID_VALIDERING_MANGLER_TILTAK_BESKRIVELSE: {
    nb: 'Du må gi en kort beskrivelse av hva dere har gjort',
    en: 'You must give a brief description of what you have done'
  },
  GRAVID_VALIDERING_MANGLER_TILTAK_BESKRIVELSE_FEIL: {
    nb: 'Beskriv hva dere har gjort',
    en: 'Describe what you have done'
  },
  GRAVID_VALIDERING_MANGLER_TILTAK_BESKRIVELSE_GRENSE: {
    nb: 'Beskrivelsen må være mindre enn {{ maxLengde }} tegn',
    en: 'The description must be less than {{ maxLengde }} characters'
  },
  GRAVID_VALIDERING_MANGLER_OMPLASSERING_TITTEL: {
    nb: 'Velg omplassering',
    en: 'Select relocation'
  },
  GRAVID_VALIDERING_MANGLER_OMPLASSERING_ARSAK: {
    nb: 'Oppgi årsak',
    en: 'State the cause'
  },
  GRAVID_VALIDERING_MANGLER_OMPLASSERING_UMULIG: {
    nb: 'Velg årsak til at omplassering ikke er mulig',
    en: 'Select the reason why relocation is not possible'
  },
  GRAVID_VALIDERING_MANGLER_OMPLASSERING_BEKREFT: {
    nb: 'Bekreft at opplysningene er korrekt',
    en: 'Confirm that the information is correct'
  },
  KONTROLLSPORSMAL_LONN_CONTENT_LABEL: {
    nb: 'Kontrollspørsmål for lønn som overstiger 6G',
    en: 'Control questions for salaries exceeding 6G'
  },
  KONTROLLSPORSMAL_LONN_TITTEL: {
    nb: 'Det ser ut som om lønnen overstiger 6G',
    en: 'It looks like the salary exceeds 6G '
  },
  KONTROLLSPORSMAL_LONN_INGRESS: {
    nb:
      'Vanligvis kan ikke dagsatsen overstige 1/260 av 6G*. For enkelte arbeidstidsordninger kan NAV likevel godkjenne' +
      ' en høyere dagsats, forutsatt at årslønnen ikke overstiger 6G.',
    en:
      'Generally, the daily rate cannot exceed 1/260 of 6G *. For some working time schemes, NAV can still approve a higher' +
      ' daily rate, provided that the annual salary does not exceed 6G. '
  },
  KONTROLLSPORSMAL_LONN_DAGER: {
    nb: 'Oppgi antall dager dere utbetaler lønn for i året:',
    en: 'Enter the number of days you pay wages for a year:'
  },
  KONTROLLSPORSMAL_LONN_GRUNNBELOP: {
    nb: '* G=folketrygdens grunnbeløp',
    en: '* G=the National Insurance basic amount '
  },
  KONTROLLSPORSMAL_LONN_FORKLARING_DAGER: {
    nb: '(260 dager er vanlig for en ordinær 100% stilling)',
    en: '(260 days is usual for an ordinary 100% position)'
  },
  KONTROLLSPORSMAL_LONN_SEND: {
    nb: 'Send kravet',
    en: 'Submit claim'
  },
  KONTROLLSPORSMAL_LONN_AVBRYT: {
    nb: 'Avbryt og gå tilbake til skjema',
    en: 'Cancel and return to form '
  },
  KRAV_KVITTERING_TITTEL: {
    nb: 'Kravet er mottatt',
    en: 'The claim has been received '
  },
  KRAV_KVITTERING_INGRESS: {
    nb:
      'En kvittering er sendt til meldingsboksen deres i [Altinn](https://www.altinn.no).\n\n' +
      'Trenger du å kontakte oss, er det tilstrekkelig å oppgi fødselsnummeret til den ansatte.',
    en:
      'A receipt has been sent to your message box in [Altinn](https://www.altinn.no).\n\n' +
      "If you need to contact us, it is sufficient to provide the employee's national id-number."
  },
  DEN_ANSATTE: {
    nb: 'Den ansatte',
    en: 'The employee'
  },
  ARBEIDSGIVEREN: {
    nb: 'Arbeidsgiveren',
    en: 'The employer'
  },
  VIRKSOMHETSNUMMER_LABEL: {
    nb: 'Virksomhetsnummer',
    en: 'Company number'
  },
  VIRKSOMHETSNUMMER_PLACEHOLDER: {
    nb: '9 siffer',
    en: '9 digits'
  },
  FODSELSNUMMER_LABEL: {
    nb: 'Fødselsnummer (11 siffer)',
    en: 'National id-number (11 digits)'
  },
  FODSELSNUMMER_PLACEHOLDER: {
    nb: '11 siffer',
    en: '11 digits'
  },
  SOKNADSSKJEMA: {
    nb: 'Søknadsskjema',
    en: 'Application form'
  },
  JA: {
    nb: 'Ja',
    en: 'Yes'
  },
  NEI: {
    nb: 'Nei',
    en: 'No'
  },
  MIN_SIDE_ARBEIDSGIVER: {
    nb: 'Min side arbeidsgiver',
    en: 'My page employer'
  },
  DET_OPPSTOD_EN_FEIL: {
    nb: 'Det oppstod en feil',
    en: 'An error has occurred'
  },
  LOGG_UT: {
    nb: 'Logg ut',
    en: 'Log out'
  }
};

export default Locales;
