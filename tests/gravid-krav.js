import { RequestMock, Selector } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';
import { mockHeaders } from '@smartive/testcafe-utils';
import gravidKravResponse from './gravidKravResponse';
import arbeidsgiverResponse from './arbeidsgiverResponse';

const arbeidsgiverAPI = new RegExp(/\/api\/v1\/arbeidsgivere/);
const cookiePlease = new RegExp(/\/local\/cookie-please/);
const loginExpiry = new RegExp(/\/api\/v1\/login-expiry/);
const navAuth = new RegExp(/\/person\/innloggingsstatus\/auth/);
const grunnBeloep = new RegExp(/\/api\/v1\/grunnbeloep/);
const innsendingAPI = new RegExp(/\/api\/v1\/gravid\/krav/);

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
    "<script>window.location.href='http://localhost:3000/fritak-agp/nb/gravid/krav?bedrift=810007842?loggedIn=true';</script>",
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
  .respond(gravidKravResponse, 201, mockHeaders);

fixture`Gravid - Krav`.page`http://localhost:3000/fritak-agp/nb/gravid/krav?bedrift=810007842&TestCafe=running`
  .clientScripts([{ module: 'mockdate' }, { content: "MockDate.set('2021-08-25')" }])
  .requestHooks(cookieMock)
  .beforeEach(async () => {
    await waitForReact();
  });

test('Klikk submit uten data, fjern feilmeldinger en etter en og send inn', async (t) => {
  await t
    .click(ReactSelector('Hovedknapp'))
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Mangler fødselsnummer')
        .withText('Mangler antall arbeidsdager')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma')
        .withText('Bekreft at opplysningene er korrekt').visible
    )
    .ok();

  await t
    .click(ReactSelector('BekreftOpplysningerPanel').find('input'))
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Mangler fødselsnummer')
        .withText('Mangler antall arbeidsdager')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma').visible
    )
    .ok()
    .expect(ReactSelector('Feiloppsummering').withText('Bekreft at opplysningene er korrekt').visible)
    .notOk();

  await t
    .typeText(ReactSelector('KontrollSporsmaal'), '260')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Mangler fødselsnummer')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager').visible
    )
    .notOk();

  const fnr = ReactSelector('Fnr');

  await t
    .typeText(fnr, '260')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Ugyldig fødselsnummer')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager').visible
    )
    .notOk();

  await t
    .click(fnr)
    .pressKey('ctrl+a delete')
    .typeText(fnr, '20125027610')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager').visible
    )
    .notOk();

  const belop = Selector('#belop-0');
  await t
    .typeText(belop, '5000')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Mangler dager').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager').visible
    )
    .notOk();

  const velgDager = Selector('#dager-0');
  const velgDagerOption = velgDager.find('option');

  await t
    .click(velgDager)
    .click(velgDagerOption.withText('5'))
    .expect(ReactSelector('Feiloppsummering').withText('Mangler fra dato').withText('Mangler til dato').visible)
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager').visible
    )
    .notOk();

  const fraDato = Selector('#fra-dato-0');
  const valgtFraDato = Selector('.flatpickr-calendar.open .dayContainer .flatpickr-day:nth-child(3)');
  await t
    .click(fraDato)
    .click(valgtFraDato)
    .expect(ReactSelector('Feiloppsummering').withText('Mangler til dato').visible)
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Mangler fra dato')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager').visible
    )
    .notOk()
    .expect(Selector('html').textContent)
    .contains('153,85');

  await t.expect(Selector('html').textContent).contains('153,85');

  const tilDato = Selector('#til-dato-0');
  const valgtTilDato = Selector('.flatpickr-calendar.open .dayContainer .flatpickr-day:nth-child(13)');
  await t
    .click(tilDato)
    .click(valgtTilDato)
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Mangler til dato')
        .withText('Mangler fra dato')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager').visible
    )
    .notOk({ timeout: 500 });

  await t.click(ReactSelector('Hovedknapp')).expect(Selector('html').textContent).contains('Kravet er mottatt');
});

test('Legg til og fjern perioder', async (t) => {
  await t
    .click(ReactSelector('LeggTilKnapp'))
    .expect(Selector('#belop-0').visible)
    .ok()
    .expect(Selector('#belop-1').visible)
    .ok();

  await t
    .scrollBy(0, 200)
    .click(ReactSelector('Fareknapp').withText('Slett'))
    .expect(Selector('#belop-0').visible)
    .ok()
    .expect(Selector('#belop-1').visible)
    .notOk({ timeout: 500 });
});
