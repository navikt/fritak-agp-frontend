// import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';

// const browser = await chromium.launch();
// const context = await browser.newContext();
// const page = await context.newPage();

test('get started link', async ({ page, browser }) => {
  // await page.route(/\/api\/v1\/arbeidsgivere/, (route) => {
  //     route.fulfill({
  //         status: 200,
  //         headers: {
  //             'content-type': 'application/json; charset=UTF-8',
  //             'access-control-allow-origin': 'http://127.0.0.1:3000',
  //             'access-control-allow-credentials': 'true',
  //             'strict-transport-security': 'max-age=15724800; includeSubDomains'
  //         },
  //         body: JSON.stringify(arbeidsgiverResponse)
  //     });
  // });

  // await page.route(/\/person\/innloggingsstatus\/auth/, (route) => {
  //     route.fulfill({
  //         status: 200,
  //         headers: {
  //             'content-type': 'application/json; charset=UTF-8',
  //             'access-control-allow-origin': 'http://127.0.0.1:3000',
  //             'access-control-allow-credentials': 'true',
  //             'strict-transport-security': 'max-age=15724800; includeSubDomains'
  //         },
  //         body: null
  //     });
  // });

  // await page.route(/\/api\/v1\/grunnbeloep/, (route) => {
  //     route.fulfill({
  //         status: 200,
  //         headers: {
  //             'content-type': 'application/json; charset=UTF-8',
  //             'access-control-allow-origin': 'http://127.0.0.1:3000',
  //             'access-control-allow-credentials': 'true',
  //             'strict-transport-security': 'max-age=15724800; includeSubDomains'
  //         },
  //         body: JSON.stringify(grunnBeloepVerdier)
  //     });
  // });

  // await page.route(/\/api\/v1\/gravid\/krav/, (route) => {
  //     route.fulfill({
  //         status: 201,
  //         headers: {
  //             'content-type': 'application/json; charset=UTF-8',
  //             'access-control-allow-origin': 'http://127.0.0.1:3000',
  //             'access-control-allow-credentials': 'true',
  //             'strict-transport-security': 'max-age=15724800; includeSubDomains'
  //         },
  //         body: JSON.stringify(gravidKravResponse)
  //     });
  // });

  // await page.route(/\/dekoratoren/, (route) => {
  //     route.fulfill({
  //         status: 201,
  //         headers: {
  //             'content-type': 'application/json; charset=UTF-8',
  //             'access-control-allow-origin': 'http://127.0.0.1:3000',
  //             'access-control-allow-credentials': 'true',
  //             'strict-transport-security': 'max-age=15724800; includeSubDomains'
  //         },
  //         body: ''
  //     });
  // });

  await page.goto('http://127.0.0.1:3000/fritak-agp/nb/gravid/krav?bedrift=810007842&TestCafe=running');

  // Test 1: Klikk submit uten data, fjern feilmeldinger en etter en og send inn
  // await page.click('button:has-text("Send krav")');
  await page.getByRole('button', { name: 'Send krav' }).click();
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fødselsnummer")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler antall arbeidsdager")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fra dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler til dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler dager")');
  await page.waitForSelector(
    '.navds-error-summary__list:has-text("Oppgi beløp med kun tall med maks to tall etter komma")'
  );
  await page.waitForSelector('.navds-error-summary__list:has-text("Bekreft at opplysningene er korrekt")');

  await page.check('input[type="checkbox"]');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fødselsnummer")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler antall arbeidsdager")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fra dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler til dato")');
  await page.waitForSelector(
    '.navds-error-summary__list:has-text("Oppgi beløp med kun tall med maks to tall etter komma")'
  );

  await page.fill('input[name="KontrollSporsmaal"]', '260');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fødselsnummer")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fra dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler til dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler dager")');
  await page.waitForSelector(
    '.navds-error-summary__list:has-text("Oppgi beløp med kun tall med maks to tall etter komma")'
  );

  await page.fill('input[name="Fødselsnummer (11 siffer)"]', '260');
  await page.waitForSelector('.navds-error-summary__list:has-text("Ugyldig fødselsnummer")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fra dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler til dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler dager")');
  await page.waitForSelector(
    '.navds-error-summary__list:has-text("Oppgi beløp med kun tall med maks to tall etter komma")'
  );

  await page.fill('input[name="Fødselsnummer (11 siffer)"]', '20125027610');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fra dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler til dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler dager")');
  await page.waitForSelector(
    '.navds-error-summary__list:has-text("Oppgi beløp med kun tall med maks to tall etter komma")'
  );

  await page.fill('#belop-0', '5000');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fra dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler til dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler dager")');
  await page.waitForSelector(
    '.navds-error-summary__list:has-text("Oppgi beløp med kun tall med maks to tall etter komma")'
  );

  await page.selectOption('#dager-0', { label: /5/ });
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fra dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler til dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler dager")');

  await page.fill('input[name="Fra dato"]', '07.08.21');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler til dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fra dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler dager")');
  await page.waitForSelector(
    '.navds-error-summary__list:has-text("Oppgi beløp med kun tall med maks to tall etter komma")'
  );

  await page.fill('input[name="Til dato"]', '17.08.21');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler til dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler fra dato")');
  await page.waitForSelector('.navds-error-summary__list:has-text("Mangler dager")');

  await page.fill('input[name="Fødselsnummer (11 siffer)"]', '20125027610');
  await page.click('button:has-text("Send krav")');
  await page.waitForSelector('html:has-text("Kravet er mottatt")');

  // Test 2: Legg til og fjern perioder
  await page.click('button:has-text("Legg til")');
  await page.waitForSelector('#belop-0');
  await page.waitForSelector('#belop-1');

  await page.click('button:has-text("Slett")');
  await page.waitForSelector('#belop-0');
  await page.waitForSelector('#belop-1', { state: 'hidden' });

  await browser.close();
});
