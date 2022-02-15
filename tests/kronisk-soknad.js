import { RequestMock, Selector } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';
import { mockHeaders } from '@smartive/testcafe-utils';
import kroniskSoknadResponse from './kroniskSoknadResponse';
import arbeidsgiverResponse from './arbeidsgiverResponse';

const arbeidsgiverAPI = new RegExp(/\/api\/v1\/arbeidsgivere/);
const cookiePlease = new RegExp(/\/local\/cookie-please/);
const loginExpiry = new RegExp(/\/api\/v1\/login-expiry/);
const navAuth = new RegExp(/\/person\/innloggingsstatus\/auth/);
const grunnBeloep = new RegExp(/\/api\/v1\/grunnbeloep/);
const innsendingAPI = new RegExp(/\/api\/v1\/kronisk\/soeknad/);

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
    "<script>window.location.href='http://localhost:3000/fritak-agp/nb/kronisk/soknad?bedrift=810007842?loggedIn=true';</script>",
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
  .respond(kroniskSoknadResponse, 201, mockHeaders);

fixture`Kronisk - Søknad`.page`http://localhost:3000/fritak-agp/nb/kronisk/soknad?bedrift=810007842&TestCafe=running`
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
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Fravær må fylles ut')
        .withText('Bekreft at opplysningene er korrekt').visible
    )
    .ok();

  await t
    .click(ReactSelector('BekreftOpplysningerPanel').find('input'))
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Mangler fødselsnummer')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Fravær må fylles ut').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering').withText('Bekreft at opplysningene er korrekt').with({ timeout: 100 }).visible
    )
    .notOk({ timeout: 500 });

  const fnr = ReactSelector('Fnr');

  await t
    .typeText(fnr, '260')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Ugyldig fødselsnummer')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Fravær må fylles ut').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering').withText('Bekreft at opplysningene er korrekt').with({ timeout: 100 }).visible
    )
    .notOk({ timeout: 500 });

  await t
    .click(fnr)
    .pressKey('ctrl+a delete')
    .typeText(fnr, '20125027610')
    .expect(
      ReactSelector('Feiloppsummering').withText('Virksomhetsnummer må fylles ut').withText('Fravær må fylles ut')
        .visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt')
        .with({ timeout: 100 }).visible
    )
    .notOk({ timeout: 500 });

  // Org.nr.
  const orgnr = ReactSelector('Orgnr');

  await t
    .typeText(orgnr, '260')
    .expect(ReactSelector('Feiloppsummering').withText('Fravær må fylles ut').visible)
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Ugyldig fødselsnummer')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Mangler fødselsnummer')
        .with({ timeout: 100 }).visible
    )
    .notOk({ timeout: 500 });

  await t
    .click(orgnr)
    .pressKey('ctrl+a delete')
    .typeText(orgnr, '974652277')
    .expect(ReactSelector('Feiloppsummering').withText('Fravær må fylles ut').visible)
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler fødselsnummer')
        .with({ timeout: 100 }).visible
    )
    .notOk({ timeout: 500 });

  await t
    .typeText(Selector('#fim3fiy2020'), '5')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Fravær må fylles ut')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler fødselsnummer')
        .with({ timeout: 100 }).visible
    )
    .notOk({ timeout: 500 });

  await t
    .typeText(Selector('#soknad-perioder'), '5')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Fravær må fylles ut')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler fødselsnummer')
        .with({ timeout: 100 }).visible
    )
    .notOk({ timeout: 500 });

  await t
    .click(ReactSelector('Hovedknapp'))
    .expect(Selector('html').textContent)
    .contains('Kvittering for søknad om fritak fra arbeidsgiverperioden knyttet til kronisk eller langvarig sykdom');
});
