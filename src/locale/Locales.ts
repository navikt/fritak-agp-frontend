import LangKey from './LangKey';
import {
  BekreftOpplysningerKeys,
  FeilmeldingspanelKeys,
  IngenTilgangAdvarselKeys,
  LoggetUtAdvarselKeys,
  PageNotFoundKeys,
  ServerFeilAdvarselKeys,
  TilgangsfeilSideKeys,
  TokenFornyetKeys,
  UploadKeys,
  validateBekreftKeys,
  validateBeloepKeys,
  validateFnrKeys,
  validateFraKeys,
  validateOrgnrKeys,
  validateTilKeys
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import { ValidateDagerKeys } from '../validation/validateDager';
import { KroniskKravKeys } from '../components/kroniskkrav/KroniskKravKeys';
import { KontrollsporsmaalLonnKeys } from '../components/KontrollsporsmaalLonn';
import { SideKeys } from '@navikt/helse-arbeidsgiver-felles-frontend/dist/components/Side/SideKeys';
import { KroniskSideKeys } from '../components/kronisk/KroniskSideKeys';
import { GravidKravKeys } from '../components/gravidkrav/GravidKravKeys';
import { GravidSideKeys } from '../components/gravid/GravidSideKeys';
import { GravidKvitteringKeys } from '../components/gravid/GravidKvitteringKeys';
import { KravKvitteringKeys } from '../components/kravkvittering/KravKvitteringKeys';

export interface Locale {
  en: string;
  nb: string;
}

const Locales: Record<
  | LangKey
  | UploadKeys
  | BekreftOpplysningerKeys
  | FeilmeldingspanelKeys
  | KroniskKravKeys
  | KontrollsporsmaalLonnKeys
  | TokenFornyetKeys
  | TilgangsfeilSideKeys
  | ServerFeilAdvarselKeys
  | LoggetUtAdvarselKeys
  | KravKvitteringKeys
  | SideKeys
  | PageNotFoundKeys
  | GravidKravKeys
  | GravidSideKeys
  | GravidKvitteringKeys
  | ValidateDagerKeys
  | validateFnrKeys
  | validateOrgnrKeys
  | validateFraKeys
  | validateTilKeys
  | validateBekreftKeys
  | validateBeloepKeys
  | IngenTilgangAdvarselKeys
  | KroniskSideKeys,
  Locale
> = {
  PAGE_NOT_FOUND_TITLE: {
    nb: 'Siden finnes ikke',
    en: 'Page not found'
  },
  PAGE_NOT_FOUND_DESCRIPTION: {
    nb: 'Siden finnes ikke.',
    en: 'Page not found.'
  },
  BEKREFTOPPLYSNINGER_BEKREFT_LABEL: {
    nb: 'Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige.',
    en: 'I confirm that the information I have provided is correct and complete.'
  },
  BEKREFTOPPLYSNINGER_BEKREFT_OPPLYSNINGER: {
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
      ' er beskrevet i [folketrygdlovens § 8-20](https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20).' +
      ' Vi sender en melding til den ansatte med informasjon om at du har sendt søknaden.' +
      '\n\nAlle felter må fylles ut om ikke annet er oppgitt',
    en:
      'NAV can cover sickness benefits during the employer period if the absence is due to health problems during pregnancy. This only applies ' +
      'if facilitation or relocation is not possible. We use information we already have about sick leave, in addition to the answers you give below.' +
      ' The scheme is described in [section 8-20 of the National Insurance Act](https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20).' +
      'We will send a message to the employee notifying them that you have sent the application' +
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
  GRAVID_VALIDERING_MANGLER_TERMINDATO: {
    nb: 'Termindato må fylles ut',
    en: 'Due date must be filled out'
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
    en: 'Please confirm that the information is correct'
  },
  GRAVID_KRAV_SIDETITTEL_LITEN: {
    nb: 'Kravskjema',
    en: 'Claim form'
  },
  GRAVID_KRAV_SIDETITTEL_STOR: {
    nb: 'Krav om refusjon av sykepenger i arbeidsgiverperioden',
    en: 'Claim for reimbursement of sickness benefits during the employer period'
  },
  GRAVID_KRAV_SIDETITTEL_SUBTITLE: {
    nb: 'Gravid ansatt',
    en: 'Pregnant employee'
  },
  GRAVID_KRAV_SIDETITTEL_INGRESS: {
    nb:
      '_Fraværet må skyldes svangerskapet_\n' +
      'Fraværet dere søker refusjon for, må skyldes helseplager i svangerskapet.\n\n' +
      '_Send kravet før søknaden er behandlet_\n' +
      'Vi anbefaler at dere sender dette refusjonskravet før selve [søknaden]({{-lenkeGravid}}) er ferdig behandlet. ' +
      'Slik unngår dere at kravet blir foreldet.',
    en:
      '_Period of absence must be caused by the pregnancy_\n' +
      'The period of absence you are seeking reimbursement from, must be caused by health issues during pregnancy. \n\n' +
      '_Send claim before the application has been processed_\n' +
      'We recommend that you send the claim before the [application]({{-lenkeGravid}}) has been processed. ' +
      'So you avoid it becoming obsolete.'
  },
  GRAVID_KRAV_ARBEIDSTID_TAPT: {
    nb: 'Fraværsperiode',
    en: 'Period of absence'
  },
  GRAVID_KRAV_ARBEIDSTID_PERIODE: {
    nb: 'Hvilken periode var den ansatte borte?',
    en: 'What period was the employee away? '
  },
  GRAVID_KRAV_ARBEIDSTID_HJELPETEKST: {
    nb:
      '-##' +
      '--Fra og med første til og med siste fraværsdag i arbeidsgiverperioden.\n' +
      '--Du må velge _både_ første og siste dag. Er fraværet bare på én dag, velger du samme dag to ganger.\n' +
      '##-',
    en:
      '-##' +
      '--From and including the first to and including the last day of absence in the employer period.\n' +
      '--You must choose _both_ the first and last day. If the absence is only for one day, you choose the same day twice.\n' +
      '##-'
  },
  GRAVID_KRAV_DAGER_ANTALL: {
    nb: 'Antall dager',
    en: 'Number of days'
  },
  GRAVID_KRAV_DAGER_HJELPETEKST: {
    nb: 'Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.',
    en: 'Weekends and public holidays can be included if they are part of the regular working hours.'
  },
  GRAVID_KRAV_BELOP_TITTEL: {
    nb: 'Slik finner dere beløpet dere kan kreve:',
    en: "Here's how to find the amount you can claim:"
  },
  GRAVID_KRAV_BELOP_HJELPETEKST: {
    nb:
      '-##' +
      '--Merk: Beløpet er før skatt, og det skal være uten feriepenger og arbeidsgiveravgift. Det ' +
      'beregnes feriepenger av det NAV refunderer. Dere får utbetalt refusjonen av feriepengene neste år.\n' +
      '--Avklar antall dager dere kan kreve refusjon for. Ta kun med dager det skulle vært utbetalt ' +
      'lønn. Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.\n' +
      '--Beregn månedsinntekten slik det ellers gjøres for sykepenger i arbeidsgiverperioden.\n' +
      '--Gang med 12 måneder for å finne årslønnen.\n' +
      '--Reduser beløpet til 6G hvis beløpet er over dette.\n' +
      '--Finn dagsatsen ved å dele årslønnen på antall dager dere utbetaler lønn for i året.\n' +
      '--Gang dagsatsen med antall dager dere krever refusjon for.\n' +
      '##-',
    en:
      '-##' +
      "--Note: The amount is before tax, and it must be without holiday pay and employer's contribution. The " +
      'holiday pay is calculated from what NAV reimburses. You will be paid the refund of the holiday pay next year.\n' +
      '--Clarify the number of days you can claim a refund for. Only include days it should have been paid ' +
      'payment. Weekends and public holidays can be included if they are part of the regular working hours.\n' +
      '--Calculate the monthly income as is otherwise done for sickness benefits during the employer period.\n' +
      '--Multiply by 12 months to find the annual salary.\n' +
      '--Reduce the amount to 6G if the amount is above this.\n' +
      '--Find the daily rate by dividing the annual salary by the number of days you pay the salary for the year.\n' +
      '--Multiply the daily rate by the number of days you claim a refund for.\n' +
      '##-'
  },
  GRAVID_KRAV_DOKUMENTASJON_TITTEL: {
    nb: 'Hvis dere har fått dokumentasjon fra den ansatte',
    en: 'If you have received documentation from the employee'
  },
  GRAVID_KRAV_DOKUMENTASJON_INGRESS: {
    nb:
      'Som arbeidsgiver kan dere ikke kreve å få se helseopplysninger. Men hvis den ansatte allerede har gitt ' +
      'dere slik dokumentasjon frivillig, kan dere skanne eller ta bilde av den og laste den opp her. _For tiden ' +
      'støtter vi kun filformatet .pdf._\n\n' +
      'NAV vil selv innhente dokumentasjon fra legen hvis det ikke allerede går klart fram av en sykmelding at ' +
      'det er svangerskapet som er årsaken til fraværet.',
    en:
      'As an employer, you can not demand to see health information. But if the employee has already given you ' +
      'such documentation voluntarily, you can scan or take a picture of it and upload it here. Currently we only ' +
      'support the .pdf._ file format\n\n' +
      'NAV will itself obtain documentation from the doctor if it is not already clear from a sick note that it is ' +
      'the pregnancy that is the reason for the absence.'
  },
  GRAVID_KRAV_LONN_SEND: {
    nb: 'Send kravet',
    en: 'Submit claim'
  },
  GRAVID_KRAV_LAST_OPP: {
    nb: 'LAST OPP LEGEERKLÆRINGEN (valgfritt)',
    en: "UPLOAD THE DOCTOR'S DECLARATION (optional)"
  },
  GRAVID_KRAV_VALIDERING_BEKREFT_MANGLER: {
    nb: 'Mangler bekreft',
    en: 'Missing confirm'
  },
  GRAVID_KRAV_VALIDERING_FNR_UGYLDIG: {
    nb: 'Ugyldig fødselsnummer',
    en: 'Invalid national id-nnumber'
  },
  GRAVID_KRAV_VALIDERING_FNR_MANGLER: {
    nb: 'Fødselsnummer må fylles ut',
    en: 'National id-number is missing'
  },
  GRAVID_KRAV_VALIDERING_VIRKSOMHETSNR_MANGLER: {
    nb: 'Virksomhetsnummer må fylles ut',
    en: 'Business number has to be filled out'
  },
  GRAVID_KRAV_VALIDERING_DATO_FRA_MANGLER: {
    nb: 'Fra dato må fylles ut',
    en: 'From date has to be filled out'
  },
  GRAVID_KRAV_VALIDERING_DATO_TIL_MANGLER: {
    nb: 'Til dato må fylles ut',
    en: 'To date has to be filled out'
  },
  GRAVID_KRAV_VALIDERING_DAGER_MANGLER: {
    nb: 'Dager må fylles ut',
    en: 'Days have to be filled out'
  },
  GRAVID_KRAV_VALIDERING_BELOP_MANGLER: {
    nb: 'Beløp må fylles ut',
    en: 'Amount has to be filled out'
  },
  GRAVID_KRAV_LEGG_TIL_PERIODE: {
    nb: '+ Legg til en fraværsperiode',
    en: '+ Add an absence period'
  },
  KRONISK_SIDE_SIDETITTEL: {
    nb: 'Søknadsskjema',
    en: 'Application form'
  },
  KRONISK_SIDE_TITLE: {
    nb: 'Søknad om at NAV dekker sykepenger i arbeidsgiverperioden',
    en: 'Application for NAV to cover sickness benefits during the employer period'
  },
  KRONISK_SIDE_SUBTITLE: {
    nb: 'KRONISK ELLER LANGVARIG SYKDOM',
    en: 'CHRONIC OR LONG TERM DISEASE'
  },

  KRONISK_SIDE_INGRESS: {
    nb:
      'NAV kan dekke sykepenger i arbeidsgiverperioden for en arbeidstaker med langvarig eller kronisk sykdom' +
      ' Vi bruker opplysninger vi allerede har om sykefraværet, i tillegg til svarene du gir nedenfor. Ordningen' +
      ' er beskrevet i [folketrygdlovens § 8-20](https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20).' +
      ' Vi sender en melding til den ansatte med informasjon om at du har sendt søknaden.' +
      '\n\nAlle felter må fylles ut om ikke annet er oppgitt',
    en:
      'NAV can cover sickness benefits during the employer period for an employee with longterm or chronic illness ' +
      ' We use information we already have about sick leave, in addition to the answers you give below.' +
      ' The scheme is described in [section 8-20 of the National Insurance Act](https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20).' +
      ' We will send a message to the employee notifying them that you have sent the application' +
      '\n\nAll fields must be filled out unless otherwise stated'
  },
  KRONISK_SIDE_ARBEIDSMILJO: {
    nb: 'Arbeidssituasjon og miljø',
    en: 'Work situation and environment'
  },
  KRONISK_SIDE_ARBEIDSMILJO_INGRESS: {
    nb:
      'Vi spør først om arbeidsdagen og hvordan den påvirker den ansatte. Svaret deres brukes til å vurdere om NAV skal' +
      ' dekke sykepenger i arbeidsgiverperioden',
    en:
      'We first ask about the workday and how it effects the employe. Your answer is used to decide whether NAV are going' +
      ' to cover sickness benefits during the employer period'
  },
  KRONISK_SIDE_ARBEIDS_TYPE: {
    nb: 'Hva slags arbeid utfører den ansatte?',
    en: 'What kind of work does the employee perform?'
  },
  KRONISK_SIDE_PAAKJENNINGER: {
    nb: 'Hvilke påkjenninger innebærer arbeidet?',
    en: 'What stresses does the work entail?'
  },
  KRONISK_SIDE_ANNET: {
    nb: 'ANNET',
    en: 'OTHER'
  },
  KRONISK_SIDE_IF_DOCUMENTATION: {
    nb: 'Hvis dere har fått dokumentasjon fra den ansatte',
    en: 'If you have received documentation from the employee'
  },
  KRONISK_SIDE_DOCUMENTATION_TEXT: {
    nb:
      'Som arbeidsgiver kan dere ikke kreve å få se helseopplysninger. Men hvis den ansatte allerede har gitt ' +
      'dere slik dokumentasjon frivillig, kan dere skanne eller ta bilde av den og laste den opp her. _For ' +
      'tiden støtter vi kun filformatet .pdf._\n \n' +
      'NAV vil selv innhente dokumentasjon fra legen hvis det er nødvendig.',
    en: ''
  },
  KRONISK_SIDE_UPLOAD: {
    nb: 'LAST OPP LEGEERKLÆRINGEN (valgfritt)',
    en: "UPLOAD THE DOCTOR'S DECLARATION (optional)"
  },
  KRONISK_SIDE_FRAVAER: {
    nb: 'Fraværet',
    en: ''
  },
  KRONISK_SIDE_FRAVAER_DESCRIPTION: {
    nb:
      'Skriv inn antall dager med sykefravær relatert til søknaden i hver måned. Dere kan gå 2 år tilbake i tid' +
      'hvis både arbeidsforholdet og helseproblemene har vart så lenge.',
    en: ''
  },

  KRONISK_KRAV_ARBEIDSTID_TAPT: {
    nb: 'Fraværsperiode',
    en: 'Period of absence'
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
  INGEN_TILGANG_ADVARSEL: {
    nb:
      'Du har ikke rettigheter til å søke om refusjon for noen bedrifter\n' +
      'Tildeling av roller foregår i Altinn\n' +
      '[Les mer om roller og tilganger](https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring)',
    en:
      'You do not have the rights to apply for reimbursement for any companies\n' +
      'Assignment of roles takes place in Altinn\n' +
      '[Read more about roles and accesses](https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring)'
  },
  LOGGET_UT_ADVARSEL_LOGGET_UT: {
    nb: 'Du er blitt logget ut, følg instruksjonene for ikke å miste data',
    en: 'Read more about roles and accesses.'
  },
  LOGGET_UT_ADVARSEL_INFO: {
    nb:
      '-##' +
      '--Ikke lukk dette vinduet\n' +
      '--[Åpne ID-Porten (innlogging) i nytt vindu ved å klikke på denne lenken.]({{loginServiceUrlAfterRedirect}})\n' +
      '--Logg inn på nytt i ID-porten.\n' +
      '--Returner til dette vinduet.\n' +
      '--Lukk denne meldingen og klikk igjen på knappen “Send søknad om refusjon"\n' +
      '##-',

    en:
      '-##' +
      '--Do not close this window\n' +
      '--[Open ID-Porten (login) in a new window by clicking on this link.]({{loginServiceUrlAfterRedirect}})\n' +
      '--Log in again in ID porten.\n' +
      '--Return to this window.\n' +
      '--Close this message and click again on the button "Send application for refund"\n' +
      '##-'
  },
  LOGGET_UT_ADVARSEL_LOGIN: {
    nb: 'Jeg har logget inn på nytt - lukk dette vinduet',
    en: "I'm logged in again - close this window"
  },
  TILGANGSFEILSIDE_DENIED: {
    nb: 'Du har ikke tilgang',
    en: 'No access'
  },
  TILGANGSFEILSIDE_ERROR: {
    nb: 'Det oppstod en feil',
    en: 'An error occurred'
  },
  TILGANGSFEILSIDE_LOGIN: {
    nb: 'Vi klarte ikke logge deg inn. Vennligst prøv igjen senere.',
    en: 'We were unable to log you in. Please try again later.'
  },
  SERVER_FEIL_ADVARSEL_TEXT: {
    nb:
      '_Det har desverre oppstått en teknisk feil hos oss_\n\n' +
      'Prøv igjen litt senere, og [kontakt oss gjerne dersom det ikke ordner seg.](https://arbeidsgiver.nav.no/kontakt-oss/)',
    en:
      '_Unfortunately, a technical error has occurred_\n\n' +
      'Please try again later and [feel free to contact us if it does not work out.](https://arbeidsgiver.nav.no/kontakt-oss/)'
  },
  SERVER_FEIL_ADVARSEL_HIDE: {
    nb: 'Skjul denne meldingen.',
    en: 'Hide this message.'
  },
  TOKEN_FORNYET_TITLE: {
    nb: 'Innloggingen er fornyet',
    en: 'Login renewed'
  },
  TOKEN_FORNYET_INFO: {
    nb: 'Du har nå fornyet innloggingen med en time.\n' + 'Dette vinduet kan nå lukkes.',
    en: 'You have now renewed your login by one hour.\n' + 'This window can now be closed.'
  },
  TOKEN_FORNYET_SIDETITTEL: {
    nb: 'Token er fornyet',
    en: 'Token is renewed'
  },
  TOKEN_FORNYET_LOGIN: {
    nb: 'Innlogging',
    en: 'Login'
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
    en: 'Business number'
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
  ORGNR_HJELPETEKST: {
    nb: 'Vi spør etter virksomhetsnummer, ikke organisasjonsnummer.',
    en: 'We ask for company number, not organization number.'
  },
  ORGNR_LENKE: {
    nb: 'Se hva som er forskjellen',
    en: 'See what the difference is'
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
  },
  ALLE_FELT_PAKREVD: {
    nb:
      'Vi sender en melding til den ansatte med informasjon om at du har sendt refusjonskravet.\n' +
      'Alle felter må fylles ut.',
    en:
      'We will send a message to the employee notifying them about your reimbursement claim.\n' +
      'All fields are mandatory.'
  },
  FRA_DATO: {
    nb: 'Fra dato',
    en: 'From date'
  },
  TIL_DATO: {
    nb: 'Til dato',
    en: 'To date'
  },
  BELOP: {
    nb: 'Beløp',
    en: 'Amount'
  },
  KRONER: {
    nb: 'Kr:',
    en: 'Kr:'
  },
  SLETT_LABEL: {
    nb: 'Slett',
    en: 'Delete'
  },
  VALIDATE_FNR_MISSING: {
    nb: 'Mangler fødselsnummer',
    en: 'Missing national id-number'
  },
  VALIDATE_FNR_INVALID: {
    nb: 'Ugyldig fødselsnummer',
    en: 'Invalid national id-number'
  },
  FEILMELDINGSPANEL: {
    nb: 'For å gå videre må du rette opp følgende:',
    en: 'To proceed, you must correct the following:'
  },
  VALIDATE_ORGNR_MISSSING: {
    nb: 'Mangler virksomhetsnummer',
    en: 'Missing business number'
  },
  VALIDATE_ORGNR_INVALID: {
    nb: 'Ugyldig virksomhetsnummer',
    en: 'Invalid business number'
  },

  VALIDATE_TIL_MISSING: {
    nb: 'Mangler til dato',
    en: 'Missing to date'
  },

  VALIDATE_TIL_INVALID: {
    nb: 'Dato kan bare være fra og med $value',
    en: 'Date can only be from $value'
  },

  VALIDATE_TIL_ERROR: {
    nb: 'Feil dato',
    en: 'Incorrect date'
  },

  VALIDATE_TIL_FOM_ERROR: {
    nb: 'Feil dato',
    en: 'Incorrect date'
  },

  VALIDATE_TIL_TOO_EARLY: {
    nb: 'Til dato kan ikke være før fra dato',
    en: 'To date can not be before from date'
  },
  VALIDATE_BEKREFT_NOT_CHECKED: {
    nb: 'Bekreft at opplysningene er korrekt',
    en: 'Please confirm that the information is correct'
  },

  VALIDATE_FRA_MISSING: {
    nb: 'Mangler fra dato',
    en: 'Missing from date'
  },
  VALIDATE_FRA_FOM_INVALID: {
    nb: 'Dato kan bare være fra og med $value',
    en: 'Date can only be from $value'
  },
  VALIDATE_FRA_FOM_ERROR: {
    nb: 'Feil dato',
    en: 'Incorrect date'
  },

  VALIDATE_BELOEP_AMOUNT_MISSING: {
    nb: 'Mangler beløp',
    en: 'Missing amount'
  },

  VALIDATE_BELOEP_AMOUNT_NOT_NUMERIC: {
    nb: 'Oppgi beløp med kun tall med maks to tall etter komma',
    en: 'Enter amounts with only numbers with a maximum of two numbers after the comma'
  },

  VALIDATE_BELOEP_AMOUNT_TOO_HIGH: {
    nb: 'For høyt beløp',
    en: 'Amount too high'
  },
  UPLOAD_TOO_BIG: {
    nb: 'Filen er for stor',
    en: 'File size too big'
  },
  UPLOAD_DELETE: {
    nb: 'Slett',
    en: 'Delete'
  },
  UPLOAD_FILENAME: {
    nb: 'Lastet opp:',
    en: 'Filename:'
  },
  SIDE_MIN_SIDE_ARBEIDSGIVER: {
    en: 'My page',
    nb: 'Min side arbeidsgiver'
  },
  KRONISK_KRAV_PERIODE_FRA: {
    nb: 'Fra dato',
    en: 'From date'
  },
  KRONISK_KRAV_PERIODE_TIL: {
    nb: 'Til dato',
    en: 'To date'
  },
  KRONISK_KRAV_PERIODE_FORMAT: {
    nb: 'dd.mm.åååå',
    en: 'dd.mm.yyyy'
  },
  KRONISK_KRAV_INFO: {
    nb:
      'Dersom dere allerede har søkt om ' +
      '[at NAV skal dekke sykepenger i arbeidsgiverperioden]({{-lenkeGravid}}) \n' +
      'kan dere rette krav om refusjon via dette skjemaet. Vi anbefaler å gjøre dette uten å vente på\n' +
      'godkjennelse av søknaden, for å potensielt unngå foreldelse av kravet.',
    en:
      'Dersom dere allerede har søkt om ' +
      '[at NAV skal dekke sykepenger i arbeidsgiverperioden]({{-lenkeGravid}}) \n' +
      'kan dere rette krav om refusjon via dette skjemaet. Vi anbefaler å gjøre dette uten å vente på\n' +
      'godkjennelse av søknaden, for å potensielt unngå foreldelse av kravet.'
  },
  KRONISK_KRAV_EMPLOYEE: {
    nb: 'Den ansatte',
    en: 'Employee'
  },
  KRONISK_KRAV_PERIOD_AWAY: {
    nb: 'Hvilken periode var den ansatte borte?',
    en: 'What time was the employee not working?'
  },
  KRONISK_KRAV_ADD_PERIOD: {
    nb: '+ Legg til en fraværsperiode',
    en: '+ Add period'
  },
  KRONISK_KRAV_SUBMIT: {
    nb: 'Send kravet',
    en: 'Submit'
  },
  KRONISK_KRAV_TITLE: {
    nb: 'Krav om refusjon av sykepenger i arbeidsgiverperioden',
    en: 'Krav om refusjon av sykepenger i arbeidsgiverperioden'
  },
  KRONISK_KRAV_SUBTITLE: {
    nb: 'KRONISK ELLER LANGVARIG SYK ANSATT',
    en: 'KRONISK ELLER LANGVARIG SYK ANSATT'
  },
  KRONISK_KRAV_SIDETITTEL: {
    nb: 'Kravskjema',
    en: 'Form'
  },
  KRONISK_KRAV_PERIOD_INFO: {
    nb:
      '-##' +
      '-- Fra og med første til og med siste fraværsdag i arbeidsgiverperioden.\n' +
      '-- Du må velge _både_ første og siste dag. Er fraværet bare på én dag, velger du samme dag to ganger.' +
      '##-',
    en:
      '-##' +
      '-- Fra og med første til og med siste fraværsdag i arbeidsgiverperioden.\n' +
      '-- Du må velge _både_ første og siste dag. Er fraværet bare på én dag, velger du samme dag to ganger.' +
      '##-'
  },
  VALIDATE_DAGER_REQUIRED: {
    nb: 'Må fylles ut',
    en: 'Required'
  },
  VALIDATE_DAGER_MISSING: {
    nb: 'Mangler dager',
    en: 'Missing days'
  }
};

export default Locales;
