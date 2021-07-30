import { RequestLogger, RequestMock } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';

const arbeidsgiverAPI = new RegExp('https://fritakagp.dev.nav.no/api/v1/arbeidsgivere');

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

const cookieMock = RequestMock()
  .onRequestTo('https://fritakagp.dev.nav.no/local/cookie-please')
  .respond(null, 200, { 'Access-Control-Allow-Origin': '*' })
  .onRequestTo(arbeidsgiverAPI)
  .respond({ data: arbeidsgiverRespons }, 200, {
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
    'content-type': 'application/json'
  });

fixture`Oppstart`.page`http://localhost:3000/fritak-agp/nb/kronisk/krav?bedrift=810007842`
  // .requestHooks(cookieMock)
  .beforeEach(async () => {
    await waitForReact();
  });

test('Klikk submit uten data, så med bekreft sjekket', async (t) => {
  /* Test 1 Code */
  // await t.click(ReactSelector('input[type="checkbox"]'));
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
        .withText('Mangler antall arbeidsdager')
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
        .withText('Mangler beløp')
        .withText('Mangler antall arbeidsdager').visible
    )
    .ok()
    .expect(ReactSelector('Feiloppsummering').withText('Bekreft at opplysningene er korrekt').visible)
    .notOk();
});
