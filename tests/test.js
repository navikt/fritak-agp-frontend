import { RequestLogger, RequestMock } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';

fixture`Oppstart`.page`http://localhost:3000/fritak-agp/nb/kronisk/krav?bedrift=810007842`
  // .requestHooks(cookieMock)
  .beforeEach(async () => {
    await waitForReact();
  });

const cookieMock = RequestMock()
  .onRequestTo('https://fritakagp.dev.nav.no/local/cookie-please')
  .respond({ data: 'value' });

test('Klikk submit uten data', async (t) => {
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
