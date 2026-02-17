// /e2e/gravid-krav.spec.js
import { test, expect } from '@playwright/test';

import gravidKravResponse from './gravidKravResponse';
import arbeidsgiverResponse from './arbeidsgiverResponse';

import clickButton from './helpers/clickSubmit';
import { FormPage } from './utils/formPage';

const arbeidsgiverAPI = /\/api\/v1\/arbeidsgiver-tilganger/;
const navAuth = /\/person\/innloggingsstatus\/auth/;
const grunnBeloep = /\/api\/v1\/grunnbeloep/;
const innsendingAPI = /\/api\/v1\/gravid\/krav/;
const deko = /\/dekoratoren/;

const headereJson = {
  'content-type': 'application/json; charset=UTF-8',
  'access-control-allow-origin': 'http://localhost:3000',
  'access-control-allow-credentials': 'true',
  'strict-transport-security': 'max-age=15724800; includeSubDomains'
};

const headereText = { ...headereJson, 'content-type': 'text/html; charset=UTF-8' };
headereText['content-type'] = 'text/html; charset=UTF-8';

const grunnBeloepVerdier = {
  dato: '2021-05-01',
  grunnbeloep: 106399,
  grunnbeloepPerMaaned: 8867,
  gjennomsnittPerAar: 104716,
  omregningsfaktor: 1.049807
};

test.describe('Gravid - Krav', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(arbeidsgiverAPI, (route) =>
      route.fulfill({ body: JSON.stringify(arbeidsgiverResponse), headers: headereJson })
    );
    await page.route(navAuth, (route) => route.fulfill({ body: 'null', headers: headereJson }));
    await page.route(grunnBeloep, (route) =>
      route.fulfill({ body: JSON.stringify(grunnBeloepVerdier), headers: headereJson })
    );
    await page.route(innsendingAPI, (route) =>
      route.fulfill({ body: JSON.stringify(gravidKravResponse), status: 201, headers: headereJson })
    );
    await page.route(deko, (route) => route.fulfill({ body: '', status: 201, headers: headereJson }));

    await page.clock.setFixedTime(new Date('2021-08-25T10:00:00'));

    await page.goto('http://localhost:3000/fritak-agp/nb/gravid/krav?bedrift=810008032');
  });

  test('Klikk submit uten data, fjern feilmeldinger en etter en og send inn', async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.clickButton('Send krav');

    expect(await page.locator('li > a').allInnerTexts()).toEqual(
      expect.arrayContaining([
        'Mangler fødselsnummer',
        'Mangler antall arbeidsdager',
        'Mangler fra dato',
        'Mangler til dato',
        'Mangler dager',
        'Oppgi beløp med kun tall med maks to tall etter komma',
        'Bekreft at opplysningene er korrekt'
      ])
    );

    await formPage.checkCheckbox('Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige.');

    await expect(await page.locator('li > a').allInnerTexts()).toEqual(
      expect.arrayContaining([
        'Mangler fødselsnummer',
        'Mangler antall arbeidsdager',
        'Mangler fra dato',
        'Mangler til dato',
        'Mangler dager',
        'Oppgi beløp med kun tall med maks to tall etter komma'
      ])
    );

    await formPage.assertNotVisibleText('Bekreft at opplysningene er korrekt');
    // await expect(page.locator('.navds-error-summary__list')).not.toContainText('Bekreft at opplysningene er korrekt');

    await page.getByLabel('Oppgi antall dager dere utbetaler lønn for i året:').fill('260');
    await expect(await page.locator('li > a').allInnerTexts()).toEqual(
      expect.arrayContaining([
        'Mangler fødselsnummer',
        'Mangler fra dato',
        'Mangler til dato',
        'Mangler dager',
        'Oppgi beløp med kun tall med maks to tall etter komma'
      ])
    );
    await formPage.assertNotVisibleText('Bekreft at opplysningene er korrekt');
    await formPage.assertNotVisibleText('Mangler antall arbeidsdager');

    await formPage.fillInput('Fødselsnummer (11 siffer)', '260');

    await expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Ugyldig fødselsnummer',
      'Mangler fra dato',
      'Mangler til dato',
      'Mangler dager',
      'Oppgi beløp med kun tall med maks to tall etter komma'
    ]);

    await formPage.assertNotVisibleText('Bekreft at opplysningene er korrekt');
    await formPage.assertNotVisibleText('Mangler antall arbeidsdager');

    await formPage.fillInput('Fødselsnummer (11 siffer)', '260');

    await expect(await page.locator('li > a').allInnerTexts()).toEqual(
      expect.arrayContaining([
        'Ugyldig fødselsnummer',
        'Mangler fra dato',
        'Mangler til dato',
        'Mangler dager',
        'Oppgi beløp med kun tall med maks to tall etter komma'
      ])
    );

    // await formPage.assertNotVisibleText('Ugyldig fødselsnummer');
    await formPage.assertNotVisibleText('Bekreft at opplysningene er korrekt');
    await formPage.assertNotVisibleText('Mangler antall arbeidsdager');

    const belop = page.locator('#belop-0');
    await belop.fill('5000');
    await expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Ugyldig fødselsnummer',
      'Mangler fra dato',
      'Mangler til dato',
      'Mangler dager'
    ]);
    await formPage.assertNotVisibleText('Oppgi beløp med kun tall med maks to tall etter komma');
    await formPage.assertNotVisibleText('Bekreft at opplysningene er korrekt');
    await formPage.assertNotVisibleText('Mangler antall arbeidsdager');

    const velgDager = page.locator('#dager-0');
    await velgDager.selectOption({ label: '5' });
    await expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Ugyldig fødselsnummer',
      'Mangler fra dato',
      'Mangler til dato'
    ]);
    await expect(page.locator('.navds-error-summary__list')).not.toContainText([
      'Mangler dager',
      'Oppgi beløp med kun tall med maks to tall etter komma',
      'Ugyldig fødselsnummer',
      'Bekreft at opplysningene er korrekt',
      'Mangler antall arbeidsdager'
    ]);

    await page.getByLabel('Fra dato').fill('07.08.21');
    await expect(await page.locator('li > a').allInnerTexts()).toEqual(['Ugyldig fødselsnummer', 'Mangler til dato']);
    await expect(page.locator('.navds-error-summary__list')).not.toContainText([
      'Mangler fra dato',
      'Mangler dager',
      'Oppgi beløp med kun tall med maks to tall etter komma',
      'Ugyldig fødselsnummer',
      'Bekreft at opplysningene er korrekt',
      'Mangler antall arbeidsdager'
    ]);

    await page.getByLabel('Til dato').fill('17.08.21');

    await expect(page.locator('.navds-error-summary__list')).not.toContainText([
      'Mangler til dato',
      'Mangler fra dato',
      'Mangler dager',
      'Oppgi beløp med kun tall med maks to tall etter komma',
      'Ugyldig fødselsnummer',
      'Bekreft at opplysningene er korrekt',
      'Mangler antall arbeidsdager'
    ]);

    await formPage.fillInput('Fødselsnummer (11 siffer)', '20125027610');

    const requestPromise = page.waitForRequest(innsendingAPI);
    await formPage.clickButton('Send krav');

    const request = await requestPromise;
    expect(request.postDataJSON()).toEqual({
      antallDager: 260,
      bekreftet: true,
      identitetsnummer: '20125027610',
      perioder: [
        {
          antallDagerMedRefusjon: 5,
          fom: '2021-08-07',
          gradering: 1,
          månedsinntekt: 5000,
          tom: '2021-08-17'
        }
      ],
      virksomhetsnummer: '810008032'
    });

    await expect(
      page.getByRole('heading', {
        name: 'Kravet er mottatt'
      })
    ).toBeVisible();
  });

  test('Legg til og fjern perioder', async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.clickButton('+ Legg til en fraværsperiode');
    await expect(page.locator('#belop-0')).toBeVisible();
    await expect(page.locator('#belop-1')).toBeVisible();

    await page.getByRole('button', { name: 'Slett' }).last().dispatchEvent('click');
    await expect(page.locator('#belop-0')).toBeVisible();
    await expect(page.locator('#belop-1')).not.toBeVisible({ timeout: 500 });
  });
});
