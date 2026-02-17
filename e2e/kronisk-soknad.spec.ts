// /e2e/kronisk-soknad.spec.js
import { test, expect } from '@playwright/test';

import arbeidsgiverResponse from './arbeidsgiverResponse';
import kroniskSoknadResponse from './kroniskSoknadResponse';
import { FormPage } from './utils/formPage';

const arbeidsgiverAPI = /\/api\/v1\/arbeidsgivere/;
const cookiePlease = /\/local\/cookie-please/;
const loginExpiry = /\/api\/v1\/login-expiry/;
const navAuth = /\/person\/innloggingsstatus\/auth/;
const grunnBeloep = /\/api\/v1\/grunnbeloep/;
const innsendingAPI = /\/api\/v1\/kronisk\/soeknad/;
const deko = /\/dekoratoren/;

const headereJson = {
  'content-type': 'application/json; charset=UTF-8',
  'access-control-allow-origin': 'http://localhost:3000',
  'access-control-allow-credentials': 'true',
  'strict-transport-security': 'max-age=15724800; includeSubDomains'
};

const headereText = { ...headereJson, 'content-type': 'text/html; charset=UTF-8' };

const grunnBeloepVerdier = {
  dato: '2021-05-01',
  grunnbeloep: 106399,
  grunnbeloepPerMaaned: 8867,
  gjennomsnittPerAar: 104716,
  omregningsfaktor: 1.049807
};

test.describe('Kronisk - Søknad', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(loginExpiry, (route) =>
      route.fulfill({ body: '"2025-08-02T10:51:34.000+00:00"', headers: headereJson })
    );
    await page.route(cookiePlease, (route) =>
      route.fulfill({
        body: "<script>window.location.href='http://localhost:3000/fritak-agp/nb/kronisk/soknad?bedrift=810007842?loggedIn=true';</script>",
        headers: headereText
      })
    );
    await page.route(arbeidsgiverAPI, (route) =>
      route.fulfill({ body: JSON.stringify(arbeidsgiverResponse), headers: headereJson })
    );
    await page.route(navAuth, (route) => route.fulfill({ body: 'null', headers: headereJson }));
    await page.route(grunnBeloep, (route) =>
      route.fulfill({ body: JSON.stringify(grunnBeloepVerdier), headers: headereJson })
    );
    await page.route(innsendingAPI, (route) =>
      route.fulfill({ body: JSON.stringify(kroniskSoknadResponse), status: 201, headers: headereJson })
    );
    await page.route(deko, (route) => route.fulfill({ body: '', status: 201, headers: headereJson }));

    await page.clock.setFixedTime(new Date('2021-08-25T10:00:00'));

    await page.goto('http://localhost:3000/fritak-agp/nb/kronisk/soknad?bedrift=810007842');
  });

  test('Klikk submit uten data, fjern feilmeldinger en etter en og send inn', async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.clickButton('Send søknad');
    expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Mangler fødselsnummer',
      'Virksomhetsnummer må fylles ut',
      'Mangler antall fraværsperioder',
      'Bekreft at opplysningene er korrekte',
      'Fravær må fylles ut.'
    ]);

    await formPage.checkCheckbox('Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige.');
    await expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Mangler fødselsnummer',
      'Virksomhetsnummer må fylles ut',
      'Mangler antall fraværsperioder',
      'Fravær må fylles ut.'
    ]);
    await formPage.assertNotVisibleText('Bekreft at opplysningene er korrekte');

    await formPage.fillInput('Fødselsnummer (11 siffer)', '260');

    await expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Ugyldig fødselsnummer',
      'Virksomhetsnummer må fylles ut',
      'Mangler antall fraværsperioder',
      'Fravær må fylles ut.'
    ]);
    await formPage.assertNotVisibleText('Bekreft at opplysningene er korrekte');

    await formPage.fillInput('Fødselsnummer (11 siffer)', '20125027610');
    await expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Virksomhetsnummer må fylles ut',
      'Mangler antall fraværsperioder',
      'Fravær må fylles ut.'
    ]);
    await formPage.assertNotVisibleText('Ugyldig fødselsnummer');
    await formPage.assertNotVisibleText('Bekreft at opplysningene er korrekte');

    const virksomhetsnummer = page.getByRole('textbox', { name: 'Virksomhetsnummer' });
    await virksomhetsnummer.fill('260');

    await formPage.assertVisibleText('Ugyldig virksomhetsnummer');
    await formPage.assertVisibleTextAtLeastOnce('Fravær må fylles ut.');
    await formPage.assertNotVisibleText('Ugyldig fødselsnummer');
    await formPage.assertVisibleText('Virksomhetsnummer må fylles ut');
    await formPage.assertNotVisibleText('Mangler fødselsnummer');

    await virksomhetsnummer.fill('974652277');
    await formPage.assertVisibleTextAtLeastOnce('Fravær må fylles ut.');
    await formPage.assertNotVisibleText('Virksomhetsnummer må fylles ut');
    await formPage.assertNotVisibleText('Bekreft at opplysningene er korrekte');
    await formPage.assertNotVisibleText('Mangler fødselsnummer');

    await page.getByLabel('April 2020').fill('5');
    expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Mangler antall fraværsperioder',
      'Fravær må fylles ut.'
    ]);
    await formPage.assertNotVisibleText('Ugyldig fødselsnummer');
    await formPage.assertNotVisibleText('Virksomhetsnummer må fylles ut');
    await formPage.assertNotVisibleText('Bekreft at opplysningene er korrekte');
    await formPage.assertNotVisibleText('Mangler fødselsnummer');

    await page.getByLabel('Hvor mange perioder er fraværet fordelt på siste to år?').fill('5');

    expect(await page.locator('li > a').allInnerTexts()).toEqual([]);
    await formPage.assertNotVisibleText('Fravær må fylles ut.');
    await formPage.assertNotVisibleText('Ugyldig fødselsnummer');
    await formPage.assertNotVisibleText('Virksomhetsnummer må fylles ut');
    await formPage.assertNotVisibleText('Bekreft at opplysningene er korrekte');
    await formPage.assertNotVisibleText('Mangler fødselsnummer');

    const requestPromise = page.waitForRequest(innsendingAPI);
    await formPage.clickButton('Send søknad');

    const request = await requestPromise;
    expect(request.postDataJSON()).toEqual({
      antallPerioder: 5,
      bekreftet: true,
      fravaer: [
        {
          antallDagerMedFravaer: 5,
          yearMonth: '2020-04'
        }
      ],
      identitetsnummer: '20125027610',
      ikkeHistoriskFravaer: false,
      virksomhetsnummer: '974652277'
    });

    await expect(page.locator('html')).toContainText(
      'Kvittering for søknad om fritak fra arbeidsgiverperioden knyttet til kronisk eller langvarig sykdom'
    );
  });
});
