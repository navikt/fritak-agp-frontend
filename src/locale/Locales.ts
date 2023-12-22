import LangKey from './LangKey';

import { ValidateDagerKeys } from '../validation/validateDager';
import { KroniskKravKeys } from '../components/kroniskkrav/KroniskKravKeys';
import { KroniskSideKeys } from '../components/kronisk/KroniskSideKeys';
import { GravidKravKeys } from '../components/gravidkrav/GravidKravKeys';
import { GravidSideKeys } from '../components/gravid/GravidSideKeys';
import { GravidKvitteringKeys } from '../components/gravid/GravidKvitteringKeys';
import { KravKvitteringKeys } from '../components/kravkvittering/KravKvitteringKeys';
import { FravaerTabellKeys } from '../components/kronisk/FravaerTabellKeys';
import { ValidateArbeidsdagerKeys } from '../validation/validateArbeidsdager';
import { ValidateAntallPerioderKeys } from '../validation/validateAntallPerioder';
import { KontrollSporsmaalKeys } from '../components/felles/KontrollSporsmaal/KontrollSporsmaal';
import { ValidateSykemeldingsgradKeys } from '../validation/validateSykemeldingsgrad';
import { KravKvitteringSlettetKeys } from '../components/kravkvitteringslettet/KravKvitteringSlettetKeys';
import { KravEndringKvitteringKeys } from '../components/kravendringkvittering/KravEndringKvitteringKeys';
import { ValidateDokumentasjonKeys } from '../validation/validateDokumentasjon';
import { ServerFeilAdvarselKeys } from '../components/felles/ServerFeilAdvarsel/ServerFeilAdvarselKeys';
import { BekreftOpplysningerKeys } from '../components/felles/BekreftOpplysningerPanel/BekreftOpplysningerKeys';
import { FeilmeldingspanelKeys } from '../components/felles/Feilmeldingspanel/FeilmeldingspanelKeys';
import { IngenTilgangAdvarselKeys } from '../components/felles/login/IngenTilgangAdvarselKeys';
import { LoggetUtAdvarselKeys } from '../components/felles/LoggetUtAdvarsel/LoggetUtAdvarselKeys';
import { TokenFornyetKeys } from '../components/felles/login/TokenFornyetKeys';
import { TilgangsfeilSideKeys } from '../components/felles/login/TilgangsfeilSideKeys';
import { UploadKeys } from '../components/felles/Upload/UploadKeys';
import { SideKeys } from '../components/felles/Side/SideKeys';
import { validateTilKeys } from '../validation/validateTil';
import { validateOrgnrKeys } from '../validation/validateOrgnr';
import { validateFraKeys } from '../validation/validateFra';
import { validateFnrKeys } from '../validation/validateFnr';
import { validateBeloepKeys } from '../validation/validateBeloep';
import { validateBekreftKeys } from '../validation/validateBekreft';
import { PageNotFoundKeys } from '../components/felles/PageNotFound/PageNotFoundKeys';
import { DuplicateSubmissionAdvarselKeys } from '../components/felles/DuplicateSubmissionAdvarsel/DuplicateSubmissionAdvarselKeys';

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
  | FravaerTabellKeys
  | KroniskSideKeys
  | KontrollSporsmaalKeys
  | ValidateAntallPerioderKeys
  | ValidateArbeidsdagerKeys
  | ValidateSykemeldingsgradKeys
  | KravKvitteringSlettetKeys
  | KravEndringKvitteringKeys
  | ValidateDokumentasjonKeys
  | DuplicateSubmissionAdvarselKeys,
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
      ' er beskrevet i [folketrygdlovens § 8-20](https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20).\n\n' +
      'Vi sender en melding til den ansatte med informasjon om at du har sendt søknaden.' +
      '\n\nAlle felter må fylles ut om ikke annet er oppgitt',
    en:
      'NAV can cover sickness benefits during the employer period if the absence is due to health problems during pregnancy. This only applies ' +
      'if facilitation or relocation is not possible. We use information we already have about sick leave, in addition to the answers you give below.' +
      ' The scheme is described in [section 8-20 of the National Insurance Act](https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20).\n\n' +
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
  GRAVID_SIDE_TILTAK_FRITEKST: {
    nb: 'Beskrivelse av tiltak',
    en: 'Description of what you have done'
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
    nb: 'Omplassering er ikke mulig',
    en: 'Relocation is not possible'
  },
  GRAVID_SIDE_OMPLASSERING_IKKE_MULIG_AARSAK: {
    nb: '- oppgi årsak:',
    en: '- state reason:'
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
    nb: 'Kvittering for mottatt søknad om fritak fra arbeidsgiverperioden grunnet risiko for høyt sykefravær knyttet til graviditet.',
    en: 'The application has been received'
  },
  GRAVID_KVITTERING_INGRESS: {
    nb:
      'En kopi av kvittering er også sendt til meldingsboksen deres i [Altinn](https://www.altinn.no). ' +
      'Meldingen er kun synlig for for de som har tilgang til å sende inntektsmelding i altinn. ' +
      'Den ansatte det gjelder er også varslet om søknaden. Trenger du å kontakte oss, er det tilstrekkelig å oppgi fødselsnummeret til den ansatte.',
    en:
      'A copy of the receipt has also been sent to their message box in [Altinn](https://www.altinn.no). ' +
      'The message is only visible to those who have access to send an income message in altinn. ' +
      'The employee in question has also been notified of the application. ' +
      "If you need to contact us, it is sufficient to provide the employee's national id-number."
  },
  GRAVID_KVITTERING_ADVARSEL: {
    nb:
      'NB: Ikke vent! Vi anbefaler å [stille krav om refusjon](/nb/gravid/krav) så snart som mulig på grunn av at' +
      ' foreldelsesfristen for kravet kan bli overskredet mens vi behandler denne søknaden.',
    en:
      'NB: Do not wait! We recommend [claiming a refund](/en/gravid/krav) as soon as possible due to the fact that the' +
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
  GRAVID_KVITTERING_SKRIV_UT: {
    nb: 'Du kan skrive ut eller lagre kvitteringen ved å klikke på knappen "Skriv ut kvittering".',
    en: 'You can print or save the receipt by clicking on the "Print receipt" button.'
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
  GRAVID_KRAV_ARBEIDSTID_HJELPETEKST_TITTEL: {
    nb: 'Hva menes med virksomhetsnummer',
    en: 'What is meant by business number'
  },
  GRAVID_KRAV_DAGER_ANTALL: {
    nb: 'Antall dager',
    en: 'Number of days'
  },
  GRAVID_KRAV_DAGER_HJELPETEKST: {
    nb: 'Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.',
    en: 'Weekends and public holidays can be included if they are part of the regular working hours.'
  },
  GRAVID_KRAV_BELOP_TEXT: {
    nb: 'Beregnet månedsinntekt',
    en: 'Estimated monthly income'
  },
  GRAVID_KRAV_BELOP_TITTEL: {
    nb: 'Slik finner dere beløpet dere kan kreve:',
    en: "Here's how to find the amount you can claim:"
  },
  GRAVID_KRAV_BELOP_HJELPETEKST: {
    nb:
      '-##' +
      '--Avklar antall dager dere kan kreve refusjon for. Ta kun med dager det skulle vært utbetalt lønn. ' +
      'Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.\n' +
      '--Beregn månedsinntekten slik det ellers gjøres for  sykepenger i arbeidsgiverperioden.\n' +
      '--Avklar antall dager dere utbetaler lønn for i året (dette er vanligvis 260 dager).\n' +
      '--Det beregnes feriepenger av det NAV refunderer. Dere får utbetalt refusjonen av feriepengene neste år..\n' +
      '##-',
    en:
      '-##' +
      '--Clarify the number of days you can claim a refund for. Only include days on which pay should have been paid. ' +
      'Weekends and public holidays can be included if they are part of the regular working hours.\n' +
      '--Calculate the monthly income as is otherwise done for sickness benefits during the employer period.\n' +
      '--Clarify the number of days you pay wages for the year (this is usually 260 days).\n' +
      '--Holiday pay is calculated from what NAV reimburses. You will be paid the refund of the holiday pay next year.\n' +
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
  GRAVID_KRAV_LONN_ENDRE: {
    nb: 'Send inn endring',
    en: 'Submit updated claim'
  },
  GRAVID_KRAV_LAST_OPP: {
    nb: 'Last opp dokumentasjon (valgfritt)',
    en: 'Upload documentation (optional)'
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
      'NAV kan refundere sykepenger i arbeidsgiverperioden for arbeidstakere med en kronisk eller langvarig sykdom.' +
      ' Hvis NAV innvilger søknaden, kan du som arbeidsgiver kreve å få refundert sykepenger for alt sykefravær, fra den' +
      ' dag som denne søknad er mottatt av NAV.  Fristen for å kreve refusjon er 3 måneder. Derfor bør dere [sende sende' +
      ' inn kravskjemaet for refusjon](/nb/kronisk/krav) fortløpende og ikke vente til søknaden er ferdig behandlet.\n\n' +
      ' Vi bruker opplysninger vi allerede har om sykefraværet, i tillegg til svarene du gir nedenfor. Ordningen' +
      ' er beskrevet i [folketrygdlovens § 8-20](https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20).' +
      ' Vi sender en melding til den ansatte med informasjon om at du har sendt søknaden.' +
      '\n\nAlle felter må fylles ut om ikke annet er oppgitt.',
    en:
      'NAV can reimburse sickness benefits during the employer period for employees with a chronic or long-term illness.' +
      ' If NAV approves the application, you as the employer can demand reimbursement of sickness benefits for all sick leave,' +
      ' from the day this application is received by NAV. The deadline for claiming a refund is 3 months. Therefore, you should' +
      ' [submit the claim form for reimbursement](/en/kronisk/krav) continuously and do not wait until the application has been processed.\n\n' +
      ' We use information we already have about sick leave, in addition to the answers you give below.' +
      ' The scheme is described in [section 8-20 of the National Insurance Act](https://lovdata.no/dokument/NL/lov/1997-02-28-19/KAPITTEL_5-4-2#§8-20).' +
      ' We will send a message to the employee notifying them that you have sent the application' +
      '\n\nAll fields must be filled out unless otherwise stated.'
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
  KRONISK_SIDE_ARBEIDS_TYPE_1: {
    nb: 'Stillesittende arbeid',
    en: 'Sedentary work'
  },
  KRONISK_SIDE_ARBEIDS_TYPE_2: {
    nb: 'Moderat fysisk arbeid',
    en: 'Moderate physical work'
  },
  KRONISK_SIDE_ARBEIDS_TYPE_3: {
    nb: 'Fysisk krevende arbeid',
    en: 'Physically demanding work'
  },

  KRONISK_SIDE_PAAKJENNINGER: {
    nb: 'Hvilke påkjenninger innebærer arbeidet?',
    en: 'What stresses does the work entail?'
  },
  KRONISK_SIDE_PAAKJENNINGER_1: {
    nb: 'Allergener eller giftstoffer',
    en: 'Allergens or toxins'
  },
  KRONISK_SIDE_PAAKJENNINGER_2: {
    nb: 'Ukomfortabel temperatur eller luftfuktighet',
    en: 'Uncomfortable temperature or humidity'
  },
  KRONISK_SIDE_PAAKJENNINGER_3: {
    nb: 'Stressende omgivelser',
    en: 'Stressful surroundings'
  },
  KRONISK_SIDE_PAAKJENNINGER_4: {
    nb: 'Regelmessige kveldsskift eller nattskift',
    en: 'Regular evening shifts or night shifts'
  },
  KRONISK_SIDE_PAAKJENNINGER_5: {
    nb: 'Mye gåing/ståing',
    en: 'Lots of walking / standing'
  },
  KRONISK_SIDE_PAAKJENNINGER_6: {
    nb: 'Harde gulv',
    en: 'Hard floors'
  },
  KRONISK_SIDE_PAAKJENNINGER_7: {
    nb: 'Tunge løft',
    en: 'Heavy lifting'
  },
  KRONISK_SIDE_PAAKJENNINGER_8: {
    nb: 'Annet, gi en kort beskrivelse:',
    en: 'Other, give a brief description'
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
    nb: 'Last opp dokumentasjon (valgfritt)',
    en: 'Upload documentation (optional)'
  },
  KRONISK_SIDE_FRAVAER: {
    nb: 'Historisk fravær',
    en: 'Historical absence'
  },
  KRONISK_SIDE_FRAVAER_DESCRIPTION: {
    nb:
      'For å vurdere retten til fritak fra arbeidsgiverperiode ser vi på arbeidstakerens historiske fravær. Dere kan gå ' +
      '2 år tilbake i tid hvis både arbeidsforholdet og helseproblemene har vart så lenge. Angi antall dager med ' +
      'sykefravær i hver måned.',
    en:
      "To assess the right to exemption from the employer period, we look at the employee's historical absence. You can " +
      'go 2 years back in time if both the employment relationship and the health problems have lasted that long. Enter ' +
      'the number of days of sick leave in each month.'
  },
  KRONISK_SIDE_PERIODER_LABEL: {
    nb: 'Hvor mange perioder er fraværet fordelt på siste 12 måneder?',
    en: 'How many periods is the absence spread over the last 12 months?'
  },
  KRONISK_SIDE_PERIODER_TEXT: {
    nb: 'Når den ansatte har vært tilbake på jobb, og så blir fraværende igjen definerer vi det som en ny periode.',
    en: 'When the employee has been back at work, and then becomes absent again, we define it as a new period.'
  },
  KRONISK_SIDE_PERIODER_UNNTAK: {
    nb: 'Det finnes ikke historisk fravær på grunn av nyansettelse, lengre permisjon eller annet.',
    en: 'There is no historical absence due to new employment, longer leave or otherwise.'
  },
  KRONISK_KRAV_ARBEIDSTID_TAPT: {
    nb: 'Fraværsperiode',
    en: 'Period of absence'
  },
  KRONISK_KRAV_PERIODE_BELOP_TEXT: {
    nb: 'Beregnet månedsinntekt',
    en: 'Estimated monthly income'
  },
  KRONISK_KRAV_PERIODE_BELOP_TITTEL: {
    nb: 'Slik finner dere beløpet dere kan kreve:',
    en: "Here's how to find the amount you can claim:"
  },
  KRONISK_KRAV_PERIODE_BELOP_HJELP_TITTEL: {
    nb: 'Hvordan finner dere beløpet dere kan kreve.',
    en: 'How to find the amount you can claim.'
  },
  KRONISK_KRAV_PERIODE_BELOP_HJELPETEKST: {
    nb:
      '-##' +
      '--Avklar antall dager dere kan kreve refusjon for. Ta kun med dager det skulle vært utbetalt lønn. ' +
      'Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.\n' +
      '--Beregn månedsinntekten slik det ellers gjøres for  sykepenger i arbeidsgiverperioden.\n' +
      '--Avklar antall dager dere utbetaler lønn for i året (dette er vanligvis 260 dager).\n' +
      '--Det beregnes feriepenger av det NAV refunderer. Dere får utbetalt refusjonen av feriepengene neste år..\n' +
      '##-',
    en:
      '-##' +
      '--Clarify the number of days you can claim a refund for. Only include days on which pay should have been paid. ' +
      'Weekends and public holidays can be included if they are part of the regular working hours.\n' +
      '--Calculate the monthly income as is otherwise done for sickness benefits during the employer period.\n' +
      '--Clarify the number of days you pay wages for the year (this is usually 260 days).\n' +
      '--Holiday pay is calculated from what NAV reimburses. You will be paid the refund of the holiday pay next year.\n' +
      '##-'
  },
  KRONISK_KRAV_PERIODE_FRA: {
    nb: 'Fra dato',
    en: 'From date'
  },
  KRONISK_KRAV_PERIODE_TIL: {
    nb: 'Til dato',
    en: 'To date'
  },
  KRONISK_KRAV_PERIODE_DAGER_LABEL: {
    nb: 'Antall dager',
    en: 'Number of days'
  },
  KRONISK_KRAV_PERIODE_DAGER_TITTEL: {
    nb: 'Antall dager det kreves refusjon for.',
    en: 'Number of days for which reimbursement is claimed.'
  },
  KRONISK_KRAV_PERIODE_DAGER_HJELPETEKST: {
    nb: 'Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.',
    en: 'Weekends and public holidays can be included if they are part of the regular working hours.'
  },
  KRONISK_KRAV_PERIODE_BEREGNET_LABEL: {
    nb: 'Foreløpig beregnet refusjon',
    en: 'Preliminary calculated refund'
  },
  KRONISK_KRAV_PERIODE_BEREGNET_TITTEL: {
    nb: 'Beskrivelse av foreløpig beregnet refusjon',
    en: 'Description of preliminary calculated refund'
  },
  KRONISK_KRAV_PERIODE_BEREGNET_HJELPETEKST: {
    nb:
      'Denne beregningen tar _ikke_ høyde for andre utbetalinger den ansatte eventuelt får fra NAV, for eksempel graderte ' +
      'sykepenger. Utbetalinger du allerede får refusjon for, vil derfor bli trukket fra beløpet du nå søker om.',
    en:
      'This calculation does _not_ take into account other payments the employee may receive from NAV, such as graded ' +
      'sickness benefits. Payments for which you already receive a refund will therefore be deducted from the amount you are now applying for.'
  },
  KONTROLLSPORSMAL_DAGER_LABEL: {
    nb: 'Oppgi antall dager dere utbetaler lønn for i året:',
    en: 'Enter the number of days you pay wages for a year:'
  },
  KONTROLLSPORSMAL_DAGER_FORKLARING: {
    nb: '(260 dager er vanlig for en ordinær 100% stilling. For andre ',
    en: '(260 days is usual for an ordinary 100% position. For other '
  },
  KONTROLLSPORSMAL_DAGER_FORKLARING_HREF: {
    nb: 'eksempler se her',
    en: 'examples see here'
  },
  KONTROLLSPORSMAL_DAGER_FORKLARING_SLUTT: {
    nb: ')',
    en: ')'
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
  KRAV_KVITTERING_SLETTET_TITTEL: {
    nb: 'Kravet er slettet',
    en: 'The claim has been deleted'
  },
  KRAV_KVITTERING_SLETTET_INGRESS: {
    nb:
      'En kvittering er sendt til meldingsboksen deres i [Altinn](https://www.altinn.no).\n\n' +
      'Trenger du å kontakte oss, er det tilstrekkelig å oppgi fødselsnummeret til den ansatte.',
    en:
      'A receipt has been sent to your message box in [Altinn](https://www.altinn.no).\n\n' +
      "If you need to contact us, it is sufficient to provide the employee's national id-number."
  },
  KRAV_KVITTERING_SLETTET_OPPRETT_NYTT_KRAV: {
    nb: 'Opprett nytt krav',
    en: 'Create new claim'
  },
  KRAV_ENDRING_KVITTERING_TITTEL: {
    nb: 'Kravet er slettet',
    en: 'The claim has been deleted'
  },
  KRAV_ENDRING_KVITTERING_INGRESS: {
    nb:
      'En kvittering er sendt til meldingsboksen deres i [Altinn](https://www.altinn.no).\n\n' +
      'Trenger du å kontakte oss, er det tilstrekkelig å oppgi fødselsnummeret til den ansatte.',
    en:
      'A receipt has been sent to your message box in [Altinn](https://www.altinn.no).\n\n' +
      "If you need to contact us, it is sufficient to provide the employee's national id-number."
  },
  KRAV_ENDRING_KVITTERING_OPPRETT_NYTT_KRAV: {
    nb: 'Opprett nytt krav',
    en: 'Create new claim'
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
  SERVER_FEIL_ADVARSEL_HEADING: {
    nb: 'Det har dessverre oppstått en teknisk feil hos oss',

    en: 'Unfortunately, a technical error has occurred'
  },
  SERVER_FEIL_ADVARSEL_TEXT: {
    nb: 'Prøv igjen litt senere, og [kontakt oss gjerne dersom det ikke ordner seg.](https://arbeidsgiver.nav.no/kontakt-oss/)',
    en: 'Please try again later and [feel free to contact us if it does not work out.](https://arbeidsgiver.nav.no/kontakt-oss/)'
  },
  SERVER_FEIL_ADVARSEL_HIDE: {
    nb: 'Skjul denne meldingen.',
    en: 'Hide this message.'
  },
  DUPLICATE_SUBMISSION_ADVARSEL_HEADING: {
    nb: 'Denne informasjonen er allerede sendt inn',

    en: 'This information has already been submitted'
  },
  DUPLICATE_SUBMISSION_ADVARSEL_TEXT: {
    nb: 'Denne innsendingen er allerede sendt inn tidligere, [kontakt oss gjerne dersom dette ikke skulle stemmer.](https://arbeidsgiver.nav.no/kontakt-oss/)',
    en: 'This submission has already been sendt at an earlier time, [feel free to contact us if you find this incorrect.](https://arbeidsgiver.nav.no/kontakt-oss/)'
  },
  DUPLICATE_SUBMISSION_ADVARSEL_HIDE: {
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
    nb: 'Vi spør etter virksomhetsnummer. Virksomhetsnummer er organisasjonsnummeret til underenheten som den opplysningspliktige driver.',
    en: 'We ask for company number. Company number is the organization number for the subunit.'
  },
  ORGNR_HJELPETEKST_TITTEL: {
    nb: 'Hva menes med virksomhetsnummer?',
    en: 'What do we think of by company number?'
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
      'Vi sender en melding til den ansatte med informasjon om at du har sendt refusjonskravet.\n\n' +
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
    nb: 'Dato kan bare være fra og med {{value}}',
    en: 'Date can only be from {{value}}'
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
    nb: 'Dato kan bare være fra og med {{value}}',
    en: 'Date can only be from {{value}}'
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

  VALIDATE_DOKUMENTASJON_MINIMUM_SIZE: {
    nb: 'Filen er for liten',
    en: 'File size too small'
  },

  VALIDATE_DOKUMENTASJON_MAXIMUM_SIZE: {
    nb: 'Filen er for stor',
    en: 'File size too big'
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
  KRONISK_KRAV_PERIODE_FORMAT: {
    nb: 'dd.mm.åååå',
    en: 'dd.mm.yyyy'
  },
  KRONISK_KRAV_INFO: {
    nb:
      'Dersom dere allerede har søkt om ' +
      '[at NAV skal dekke sykepenger i arbeidsgiverperioden]({{-lenkeKronisk}}) ' +
      'kan dere rette krav om refusjon via dette skjemaet. Vi anbefaler å gjøre dette uten å vente på ' +
      'godkjennelse av søknaden, for å potensielt unngå foreldelse av kravet.',
    en:
      'Dersom dere allerede har søkt om ' +
      '[at NAV skal dekke sykepenger i arbeidsgiverperioden]({{-lenkeKronisk}}) ' +
      'kan dere rette krav om refusjon via dette skjemaet. Vi anbefaler å gjøre dette uten å vente på ' +
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
  KRONISK_KRAV_ENDRE: {
    nb: 'Send inn endring',
    en: 'Submit updated claim'
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
  },
  VALIDATE_ARBEIDSDAGER_MISSING: {
    nb: 'Mangler antall arbeidsdager',
    en: 'Missing number of working days'
  },
  VALIDATE_ARBEIDSDAGER_TOO_LOW: {
    nb: 'Antall arbeidsdager er for lavt',
    en: 'Number of working days is to low'
  },
  VALIDATE_ARBEIDSDAGER_TOO_HIGH: {
    nb: 'Antall arbeidsdager per år er for høyt',
    en: 'Number of working days per year is to high'
  },
  VALIDATE_ANTALL_PERIODER_MISSING: {
    nb: 'Mangler antall fraværsperioder',
    en: 'Missing number of periods of absence'
  },
  VALIDATE_ANTALL_PERIODER_TOO_LOW: {
    nb: 'Antall fraværsperioder er for lavt',
    en: 'The number of periods of absence is too low'
  },
  VALIDATE_ANTALL_PERIODER_TOO_HIGH: {
    nb: 'Antall fraværsperioder per år er for høyt',
    en: 'The number of periods of absence per year is too high'
  },
  VALIDATE_ANTALL_PERIODER_UTEN_DATA: {
    nb: 'Kan ikke ha perioder samtidig som du har huket av at det ikke er tidliger perioder',
    en: 'Can not have periods at the same time as you have ticked that there are no earlier periods'
  },
  VALIDATE_SYKEMELDINGSGRAD_LOW: {
    nb: 'Sykemeldingsgraden må være 20% eller høyere',
    en: 'The degree of sick leave must be 20% or higher'
  },
  VALIDATE_SYKEMELDINGSGRAD_HIGH: {
    nb: 'Sykemeldingsgraden kan ikke være høyere enn 100%',
    en: 'The degree of sick leave cannot be higher than 100%'
  },
  FRAVAERTABELL_MONTH: {
    nb: 'Måned',
    en: 'Month'
  },
  FRAVAERTABELL_DAYS: {
    nb: 'Dager',
    en: 'Days'
  },
  FRAVAERTABELL_MONTH_1: {
    nb: 'Januar',
    en: 'January'
  },
  FRAVAERTABELL_MONTH_2: {
    nb: 'Februar',
    en: 'February'
  },
  FRAVAERTABELL_MONTH_3: {
    nb: 'Mars',
    en: 'March'
  },
  FRAVAERTABELL_MONTH_4: {
    nb: 'April',
    en: 'April'
  },
  FRAVAERTABELL_MONTH_5: {
    nb: 'Mai',
    en: 'May'
  },
  FRAVAERTABELL_MONTH_6: {
    nb: 'Juni',
    en: 'June'
  },
  FRAVAERTABELL_MONTH_7: {
    nb: 'Juli',
    en: 'July'
  },
  FRAVAERTABELL_MONTH_8: {
    nb: 'August',
    en: 'August'
  },
  FRAVAERTABELL_MONTH_9: {
    nb: 'September',
    en: 'September'
  },
  FRAVAERTABELL_MONTH_10: {
    nb: 'Oktober',
    en: 'October'
  },
  FRAVAERTABELL_MONTH_11: {
    nb: 'November',
    en: 'November'
  },
  FRAVAERTABELL_MONTH_12: {
    nb: 'Desember',
    en: 'December'
  },
  KRONISK_SIDE_SUBMIT: {
    nb: 'Send søknad',
    en: 'Submit'
  },
  KRAV_KVITTERING_OPPRETT_NYTT_KRAV: {
    nb: 'Opprett nytt krav',
    en: 'Create new claim'
  }
};

export default Locales;
