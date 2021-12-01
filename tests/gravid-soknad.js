import { RequestMock, Selector } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';
import { mockHeaders } from '@smartive/testcafe-utils';
import arbeidsgiverResponse from './arbeidsgiverResponse';
import gravidSoknadResponse from './gravidSoknadResponse';

const arbeidsgiverAPI = new RegExp(/\/api\/v1\/arbeidsgivere/);
const cookiePlease = new RegExp(/\/local\/cookie-please/);
const loginExpiry = new RegExp(/\/api\/v1\/login-expiry/);
const navAuth = new RegExp(/\/person\/innloggingsstatus\/auth/);
const grunnBeloep = new RegExp(/\/api\/v1\/grunnbeloep/);
const innsendingAPI = new RegExp(/\/api\/v1\/gravid\/soeknad/);

const headereJson = {
  'content-type': 'application/json; charset=UTF-8',
  'access-control-allow-origin': 'http://localhost:3000',
  'access-control-allow-credentials': 'true',
  'strict-transport-security': 'max-age=15724800; includeSubDomains'
};

const headereJsonUnauthorized = {
  'content-type': 'application/json; charset=UTF-8',
  'access-control-allow-origin': '*'
};

const headereText = Object.apply({}, headereJson);

headereText['content-type'] = 'text/html; charset=UTF-8';

const grunnBeloepVerdier = {
  dato: '2021-05-01',
  grunnbeloep: 106399,
  grunnbeloepPerMaaned: 8867,
  gjennomsnittPerAar: 104716,
  omregningsfaktor: 1.049807
};

const cookieMock = RequestMock()
  .onRequestTo(loginExpiry)
  .respond('"2025-08-02T10:51:34.000+00:00"', 200, headereJson)
  .onRequestTo(cookiePlease)
  .respond(
    "<script>window.location.href='http://localhost:3000/fritak-agp/nb/gravid/soknad?bedrift=810007842?loggedIn=true';</script>",
    200,
    headereText
  )
  .onRequestTo(arbeidsgiverAPI)
  .respond(arbeidsgiverResponse, 200, headereJson)
  .onRequestTo(navAuth)
  .respond(null, 200, headereJson)
  .onRequestTo(grunnBeloep)
  .respond(grunnBeloepVerdier, 200, mockHeaders)
  .onRequestTo(innsendingAPI)
  .respond(gravidSoknadResponse, 201, mockHeaders);

fixture`Gravid - Søknad`.page`http://localhost:3000/fritak-agp/nb/gravid/soknad?bedrift=810007842&TestCafe=running`
  .clientScripts([{ module: 'mockdate' }, { content: "MockDate.set('2021-08-25')" }])
  .requestHooks(cookieMock)
  .beforeEach(async () => {
    await waitForReact();
  });

test('Klikk submit uten data, fjern feilmeldinger en etter en og send inn', async (t) => {
  await t
    .click(Selector('label').withText('Ja'))
    .expect(Selector('html').textContent)
    .contains('Hvilke tiltak har dere forsøkt eller vurdert for at den ansatte kan jobbe?');

  await t
    .click(ReactSelector('Hovedknapp'))
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Fødselsnummer må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Termindato må fylles ut')
        .withText('Spesifiser hvilke tiltak som er forsøkt')
        .withText('Velg omplassering')
        .withText('Bekreft at opplysningene er korrekt').visible
    )
    .ok();

  await t
    .click(ReactSelector('BekreftOpplysningerPanel').find('input'))
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Fødselsnummer må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Termindato må fylles ut')
        .withText('Spesifiser hvilke tiltak som er forsøkt')
        .withText('Velg omplassering').visible
    )
    .ok()
    .expect(ReactSelector('Feiloppsummering').withText('Bekreft at opplysningene er korrekt').visible)
    .notOk({ timeout: 500 });

  // await t
  // .typeText(ReactSelector('KontrollSporsmaal'), '260')
  // .expect(
  //   ReactSelector('Feiloppsummering')
  //     .withText('Mangler fødselsnummer')
  //     .withText('Mangler fra dato')
  //     .withText('Mangler til dato')
  //     .withText('Mangler dager')
  //     .withText('Mangler beløp').visible
  // )
  // .ok()
  // .expect(ReactSelector('Feiloppsummering').withText('Bekreft at opplysningene er korrekt').withText('Mangler antall arbeidsdager').visible)
  // .notOk();

  const fnr = ReactSelector('Fnr');

  await t
    .typeText(fnr, '260')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Fødselsnummer må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Termindato må fylles ut')
        .withText('Spesifiser hvilke tiltak som er forsøkt')
        .withText('Velg omplassering').visible
    )
    .ok()
    .expect(ReactSelector('Feiloppsummering').withText('Bekreft at opplysningene er korrekt').visible)
    .notOk({ timeout: 500 });

  await t
    .click(fnr)
    .pressKey('ctrl+a delete')
    .typeText(fnr, '20125027610')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Termindato må fylles ut')
        .withText('Spesifiser hvilke tiltak som er forsøkt')
        .withText('Velg omplassering').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Fødselsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt').visible
    )
    .notOk({ timeout: 500 });

  // Org.nr.
  const orgnr = ReactSelector('Orgnr');

  await t
    .typeText(orgnr, '260')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Termindato må fylles ut')
        .withText('Spesifiser hvilke tiltak som er forsøkt')
        .withText('Velg omplassering').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Fødselsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt').visible
    )
    .notOk({ timeout: 500 });

  await t
    .click(orgnr)
    .pressKey('ctrl+a delete')
    .typeText(orgnr, '974652277')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Termindato må fylles ut')
        .withText('Spesifiser hvilke tiltak som er forsøkt')
        .withText('Velg omplassering').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Fødselsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt').visible
    )
    .notOk({ timeout: 500 });

  const terminDato = Selector('#termindato');
  const valgtTerminDato = Selector('.flatpickr-calendar.open .dayContainer .flatpickr-day:nth-child(13)');
  await t
    .click(terminDato)
    .click(valgtTerminDato)
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Spesifiser hvilke tiltak som er forsøkt')
        .withText('Velg omplassering').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Termindato må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Fødselsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt').visible
    )
    .notOk();

  await t
    .click(Selector('#hjemmekontor'))
    .expect(ReactSelector('Feiloppsummering').withText('Velg omplassering').visible)
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Spesifiser hvilke tiltak som er forsøkt')
        .withText('Termindato må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Fødselsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt').visible
    )
    .notOk({ timeout: 500 });

  await t
    .click(Selector('label').withText('Omplassering er ikke mulig - oppgi årsak:'))
    .expect(ReactSelector('Feiloppsummering').withText('Velg årsak til at omplassering ikke er mulig').visible)
    .ok()
    .click(Selector('label').withText('Vi får ikke kontakt med den ansatte'))
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Velg årsak til at omplassering ikke er mulig')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler fødselsnummer').visible
    )
    .notOk({ timeout: 500 });

  await t
    .click(ReactSelector('Hovedknapp'))
    .expect(Selector('html').textContent)
    .contains(
      'Kvittering for mottatt søknad om fritak fra arbeidsgiverperioden grunnet risiko for høyt sykefravær knyttet til graviditet.'
    );
});
