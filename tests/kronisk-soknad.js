import { RequestMock, Selector } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';
import { mockHeaders } from '@smartive/testcafe-utils';

const arbeidsgiverAPI = new RegExp(/\/api\/v1\/arbeidsgivere/);
const cookiePlease = new RegExp(/\/local\/cookie-please/);
const loginExpiry = new RegExp(/\/api\/v1\/login-expiry/);
const navAuth = new RegExp(/\/person\/innloggingsstatus\/auth/);
const grunnBeloep = new RegExp(/\/api\/v1\/grunnbeloep/);
const innsendingAPI = new RegExp(/\/api\/v1\/kronisk\/soeknad/);

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
  .respond(arbeidsgiverRespons, 200, headereJson)
  .onRequestTo(navAuth)
  .respond(null, 200, headereJson)
  .onRequestTo(grunnBeloep)
  .respond(grunnBeloepVerdier, 200, mockHeaders)
  .onRequestTo(innsendingAPI)
  .respond(null, 201, mockHeaders);

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
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Påkjenninger om den ansatte må fylles ut')
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
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Fravær må fylles ut').visible
    )
    .ok()
    .expect(ReactSelector('Feiloppsummering').withText('Bekreft at opplysningene er korrekt').visible)
    .notOk();

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
        .withText('Ugyldig fødselsnummer')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Fravær må fylles ut').visible
    )
    .ok()
    .expect(ReactSelector('Feiloppsummering').withText('Bekreft at opplysningene er korrekt').visible)
    .notOk();

  await t
    .click(fnr)
    .pressKey('ctrl+a delete')
    .typeText(fnr, '20125027610')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Fravær må fylles ut').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Ugyldig fødselsnummer')
        .withText('Bekreft at opplysningene er korrekt').visible
    )
    .notOk();

  // Org.nr.
  const orgnr = ReactSelector('Orgnr');

  await t
    .typeText(orgnr, '260')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Fravær må fylles ut').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Ugyldig fødselsnummer')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Mangler fødselsnummer').visible
    )
    .notOk();

  await t
    .click(orgnr)
    .pressKey('ctrl+a delete')
    .typeText(orgnr, '974652277')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Fravær må fylles ut').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler fødselsnummer').visible
    )
    .notOk();

  await t
    .click(Selector('#moderat'))
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Fravær må fylles ut').visible
    )
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler fødselsnummer').visible
    )
    .notOk();

  await t
    .click(Selector('#stressende'))
    .expect(ReactSelector('Feiloppsummering').withText('Fravær må fylles ut').visible)
    .ok()
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler fødselsnummer').visible
    )
    .notOk();

  await t
    .typeText(Selector('#fim3fiy2020'), '5')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Fravær må fylles ut')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler fødselsnummer').visible
    )
    .notOk();

  await t
    .typeText(Selector('#soknad-perioder'), '5')
    .expect(
      ReactSelector('Feiloppsummering')
        .withText('Fravær må fylles ut')
        .withText('Påkjenninger om den ansatte må fylles ut')
        .withText('Arbeid om den ansatte må fylles ut')
        .withText('Virksomhetsnummer må fylles ut')
        .withText('Bekreft at opplysningene er korrekt')
        .withText('Mangler fødselsnummer').visible
    )
    .notOk();

  await t.click(ReactSelector('Hovedknapp')).expect(Selector('html').textContent).contains('Søknaden er mottatt');
});
