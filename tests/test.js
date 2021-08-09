import { RequestLogger, RequestMock } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';

const arbeidsgiverAPI = new RegExp(/\/api\/v1\/arbeidsgivere/);
const cookiePlease = new RegExp(/\/local\/cookie-please/);
const loginExpiry = new RegExp(/\/api\/v1\/login-expiry/);
const navAuth = new RegExp(/\/person\/innloggingsstatus\/auth/);

const arbeidsgiverRespons = [
  {
    name: 'ANSTENDIG BJØRN KOMMUNE',
    type: 'Enterprise',
    parentOrganizationNumber: null,
    organizationForm: 'KOMM',
    organizationNumber: '810007672',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN BRANNVESEN',
    type: 'Business',
    parentOrganizationNumber: '810007702',
    organizationForm: 'BEDR',
    organizationNumber: '810008032',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN BARNEHAGE',
    type: 'Business',
    parentOrganizationNumber: '810007702',
    organizationForm: 'BEDR',
    organizationNumber: '810007842',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN BYDEL',
    type: 'Enterprise',
    parentOrganizationNumber: null,
    organizationForm: 'ORGL',
    organizationNumber: '810007702',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN SYKEHJEM',
    type: 'Business',
    parentOrganizationNumber: '810007702',
    organizationForm: 'BEDR',
    organizationNumber: '810007982',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'SKOPPUM OG SANDØY',
    type: 'Business',
    parentOrganizationNumber: null,
    organizationForm: 'BEDR',
    organizationNumber: '911206722',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'SKJERSTAD OG KJØRSVIKBUGEN',
    type: 'Enterprise',
    parentOrganizationNumber: null,
    organizationForm: 'AS',
    organizationNumber: '911212218',
    socialSecurityNumber: null,
    status: 'Active'
  }
];

// const headereJson = {
//   'Access-Control-Allow-Origin': 'http://localhost:3000',
//   'access-control-allow-credentials': true,
//   // 'access-control-allow-headers': true,
//   'content-type': 'application/json'
// };
const headereJson = {
  'content-type': 'application/json; charset=UTF-8',
  vary: 'Origin',
  'access-control-allow-origin': 'http://localhost:3000',
  'access-control-allow-credentials': true,
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  via: '1.1 google',
  'alt-svc': 'clear',
  'X-Firefox-Spdy': 'h2'
};

const headereText = Object.apply({}, headereJson);

headereText['content-type'] = 'text/html; charset=UTF-8';

// https://fritakagp.dev.nav.no/api/v1/login-expiry
const cookieMock = RequestMock()
  .onRequestTo(loginExpiry)
  .respond('2025-08-02T10:51:34.000+00:00', 200, headereText)
  .onRequestTo(cookiePlease)
  .respond(
    "<script>window.location.href='http://localhost:3000/fritak-agp/nb/kronisk/krav?bedrift=810007842?loggedIn=true';</script>",
    200,
    headereText
  )
  .onRequestTo(arbeidsgiverAPI)
  .respond({ arbeidsgiverRespons }, 200, headereJson)
  .onRequestTo(navAuth)
  .respond(null, 200, headereJson);

fixture`Oppstart`.page`http://localhost:3000/fritak-agp/nb/kronisk/krav?bedrift=810007842`
  .requestHooks(cookieMock)
  .beforeEach(async () => {
    await waitForReact();
  });

test('Klikk submit uten data, så med bekreft sjekket', async (t) => {
  /* Test 1 Code */
  // await t.click(ReactSelector('input[type="checkbox"]'));

  // await t.setCookie({'selvbetjening-idtoken': 'supersecrettoken'})

  await t
    .click(ReactSelector('Hovedknapp'))
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Mangler fødselsnummer')
        .withText('Mangler antall arbeidsdager')
        .withText('Mangler fra dato')
        .withText('Mangler til dato')
        .withText('Mangler dager')
        .withText('Mangler beløp')
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
        .withText('Mangler dager')
        .withText('Mangler beløp').visible
    )
    .ok()
    .expect(ReactSelector('Feiloppsummering').withText('Bekreft at opplysningene er korrekt').visible)
    .notOk();
});
