import { RequestMock, Selector } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';
import { mockHeaders } from '@smartive/testcafe-utils';
import gravidKravResponse from './gravidKravResponse';
import arbeidsgiverResponse from './arbeidsgiverResponse';
import { screen } from '@testing-library/testcafe';

const arbeidsgiverAPI = new RegExp(/\/api\/v1\/arbeidsgivere/);
const navAuth = new RegExp(/\/person\/innloggingsstatus\/auth/);
const grunnBeloep = new RegExp(/\/api\/v1\/grunnbeloep/);
const innsendingAPI = new RegExp(/\/api\/v1\/gravid\/krav/);
const deko = new RegExp(/\/dekoratoren/);

const headereJson = {
  'content-type': 'application/json; charset=UTF-8',
  'access-control-allow-origin': 'http://127.0.0.1:3000',
  'access-control-allow-credentials': 'true',
  'strict-transport-security': 'max-age=15724800; includeSubDomains'
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
  .onRequestTo(arbeidsgiverAPI)
  .respond(arbeidsgiverResponse, 200, headereJson)
  .onRequestTo(navAuth)
  .respond(null, 200, headereJson)
  .onRequestTo(grunnBeloep)
  .respond(grunnBeloepVerdier, 200, mockHeaders)
  .onRequestTo(innsendingAPI)
  .respond(gravidKravResponse, 201, mockHeaders)
  .onRequestTo(deko)
  .respond('', 201, mockHeaders);

fixture`Gravid - Krav`.page`http://127.0.0.1:3000/fritak-agp/nb/gravid/krav?bedrift=810007842&TestCafe=running`
  .clientScripts([{ module: 'mockdate' }, { content: "MockDate.set('2021-08-25')" }])
  .requestHooks(cookieMock)
  .beforeEach(async () => {
    await waitForReact();
  });

test('Klikk submit uten data, fjern feilmeldinger en etter en og send inn', async (t) => {
  await t
    .click(Selector('button').withText('Send krav'))
    // .debug()
    .expect(
      Selector('.navds-error-summary__list')
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
      Selector('.navds-error-summary__list')
        .withText('Mangler fødselsnummer')
        .withText('Mangler antall arbeidsdager')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma').visible
    )
    .ok()
    .expect(
      Selector('.navds-error-summary__list').withText('Bekreft at opplysningene er korrekt').with({ timeout: 100 })
        .visible
    )
    .notOk();

  await t
    .typeText(ReactSelector('KontrollSporsmaal'), '260')
    .expect(
      Selector('.navds-error-summary__list')
        .withText('Mangler fødselsnummer')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma').visible
    )
    .ok()
    .expect(
      Selector('.navds-error-summary__list')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager')
        .with({ timeout: 100 }).visible
    )
    .notOk();

  const fnr = screen.getAllByLabelText('Fødselsnummer (11 siffer)'); // ReactSelector('Fnr');

  await t
    .typeText(fnr, '260')
    .expect(
      Selector('.navds-error-summary__list')
        .withText('Ugyldig fødselsnummer')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma').visible
    )
    .ok()
    .expect(
      Selector('.navds-error-summary__list')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager')
        .with({ timeout: 100 }).visible
    )
    .notOk();

  await t
    .click(fnr)
    .pressKey('ctrl+a delete')
    .typeText(fnr, '20125027610')
    .expect(
      Selector('.navds-error-summary__list')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma').visible
    )
    .ok()
    .expect(
      Selector('.navds-error-summary__list')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager')
        .with({ timeout: 100 }).visible
    )
    .notOk();

  const belop = Selector('#belop-0');
  await t
    .typeText(belop, '5000')
    .expect(
      Selector('.navds-error-summary__list')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Mangler dager').visible
    )
    .ok()
    .expect(
      Selector('.navds-error-summary__list')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager')
        .with({ timeout: 100 }).visible
    )
    .notOk();

  const velgDager = Selector('#dager-0');
  const velgDagerOption = velgDager.find('option');

  await t
    .click(velgDager)
    .click(velgDagerOption.withText(/5/))
    .expect(Selector('.navds-error-summary__list').withText('Mangler fra dato').withText('Mangler til dato').visible)
    .ok()
    .expect(
      Selector('.navds-error-summary__list')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager')
        .with({ timeout: 100 }).visible
    )
    .notOk();

  const fraDato = screen.getAllByLabelText('Fra dato');

  await t
    .click(fraDato)
    .pressKey('ctrl+a delete')
    .typeText(fraDato, '07.08.21')

    .expect(Selector('.navds-error-summary__list').withText('Mangler til dato').visible)
    .ok()
    .expect(
      Selector('.navds-error-summary__list')
        .withText('Mangler fra dato')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager')
        .with({ timeout: 100 }).visible
    )
    .notOk()
    .expect(Selector('html').textContent)
    .contains('153');

  await t.expect(Selector('html').textContent).contains('153');

  const tilDato = screen.getAllByLabelText('Til dato');
  await t
    .click(tilDato)
    .pressKey('ctrl+a delete')
    .typeText(tilDato, '17.08.21')

    .expect(
      Selector('.navds-error-summary__list')
        .withText('Mangler til dato')
        .withText('Mangler fra dato')
        .withText('Mangler dager')
        .withText('Oppgi beløp med kun tall med maks to tall etter komma')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler antall arbeidsdager')
        .with({ timeout: 100 }).visible
    )
    .notOk({ timeout: 500 });

  await t.click(fnr).pressKey('ctrl+a delete').typeText(fnr, '20125027610');

  await t
    .click(Selector('button').withText('Send krav'))
    .expect(Selector('html').textContent)
    .contains('Kravet er mottatt', undefined, { timeout: 10000 });
});

test('Legg til og fjern perioder', async (t) => {
  await t
    .click(ReactSelector('LeggTilKnapp'))
    .expect(Selector('#belop-0').visible)
    .ok()
    .expect(Selector('#belop-1').visible)
    .ok();

  await t
    .click(Selector('button').withText('Slett'))
    .expect(Selector('#belop-0').visible)
    .ok()
    .expect(Selector('#belop-1').with({ timeout: 100 }).visible)
    .notOk({ timeout: 500 });
});
