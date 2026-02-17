import { test, expect } from '@playwright/test';
import arbeidsgiverResponse from './arbeidsgiverResponse';
import gravidSoknadResponse from './gravidSoknadResponse';

import { FormPage } from './utils/formPage';

const arbeidsgiverAPI = /\/api\/v1\/arbeidsgivere/;
const cookiePlease = /\/local\/cookie-please/;
const loginExpiry = /\/api\/v1\/login-expiry/;
const navAuth = /\/person\/innloggingsstatus\/auth/;
const grunnBeloep = /\/api\/v1\/grunnbeloep/;
const innsendingAPI = /\/api\/v1\/gravid\/soeknad/;
const deko = /\/dekoratoren/;

const headereJson = {
  'content-type': 'application/json; charset=UTF-8',
  'access-control-allow-origin': 'http://localhost:3000',
  'access-control-allow-credentials': 'true',
  'strict-transport-security': 'max-age=15724800; includeSubDomains'
};

const headereText = {
  ...headereJson,
  'content-type': 'text/html; charset=UTF-8'
};

const grunnBeloepVerdier = {
  dato: '2021-05-01',
  grunnbeloep: 106399,
  grunnbeloepPerMaaned: 8867,
  gjennomsnittPerAar: 104716,
  omregningsfaktor: 1.049807
};

test.beforeEach(async ({ page }) => {
  await page.route(loginExpiry, (route) =>
    route.fulfill({
      status: 200,
      headers: headereJson,
      body: '"2025-08-02T10:51:34.000+00:00"'
    })
  );

  await page.route(cookiePlease, (route) =>
    route.fulfill({
      status: 200,
      headers: headereText,
      body: "<script>window.location.href='http://localhost:3000/fritak-agp/nb/gravid/soknad?bedrift=810007842?loggedIn=true';</script>"
    })
  );

  await page.route(arbeidsgiverAPI, (route) =>
    route.fulfill({
      status: 200,
      headers: headereJson,
      body: JSON.stringify(arbeidsgiverResponse)
    })
  );

  await page.route(navAuth, (route) =>
    route.fulfill({
      status: 200,
      headers: headereJson,
      body: undefined
    })
  );

  await page.route(grunnBeloep, (route) =>
    route.fulfill({
      status: 200,
      headers: headereJson,
      body: JSON.stringify(grunnBeloepVerdier)
    })
  );

  await page.route(innsendingAPI, (route) =>
    route.fulfill({
      status: 201,
      headers: headereJson,
      body: JSON.stringify(gravidSoknadResponse)
    })
  );

  await page.route(deko, (route) =>
    route.fulfill({
      status: 201,
      headers: headereJson,
      body: ''
    })
  );

  await page.goto('http://localhost:3000/fritak-agp/nb/gravid/soknad?bedrift=810007842');
});

test('Klikk submit uten data, fjern feilmeldinger en etter en og send inn', async ({ page }) => {
  const formPage = new FormPage(page);

  await formPage.checkRadioButton(
    'Har dere prøvd å tilrettelegge arbeidsdagen slik at den gravide kan jobbe til tross for helseplagene?',
    'Ja'
  );

  await formPage.assertVisibleText('Hvilke tiltak har dere forsøkt eller vurdert for at den ansatte kan jobbe?');

  await formPage.clickButton('Send søknad');

  await expect(await page.locator('li > a').allInnerTexts()).toEqual([
    'Fødselsnummer må fylles ut',
    'Virksomhetsnummer må fylles ut',
    'Termindato må fylles ut',
    'Spesifiser hvilke tiltak som er forsøkt',
    'Velg omplassering',
    'Bekreft at opplysningene er korrekt'
  ]);

  await formPage.checkCheckbox('Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige.');

  await expect(await page.locator('li > a').allInnerTexts()).toEqual([
    'Fødselsnummer må fylles ut',
    'Virksomhetsnummer må fylles ut',
    'Termindato må fylles ut',
    'Spesifiser hvilke tiltak som er forsøkt',
    'Velg omplassering'
  ]);

  await expect(
    page.locator('.navds-error-summary__list:has-text("Bekreft at opplysningene er korrekt")')
  ).not.toBeVisible();

  await formPage.fillInput('Fødselsnummer (11 siffer)', '260');
  await expect(await page.locator('li > a').allInnerTexts()).toEqual([
    'Fødselsnummer må fylles ut',
    'Virksomhetsnummer må fylles ut',
    'Termindato må fylles ut',
    'Spesifiser hvilke tiltak som er forsøkt',
    'Velg omplassering'
  ]);
  await expect(
    page.locator('.navds-error-summary__list:has-text("Bekreft at opplysningene er korrekt")')
  ).not.toBeVisible();

  await formPage.fillInput('Fødselsnummer (11 siffer)', '20125027610');
  await expect(await page.locator('li > a').allInnerTexts()).toEqual([
    'Virksomhetsnummer må fylles ut',
    'Termindato må fylles ut',
    'Spesifiser hvilke tiltak som er forsøkt',
    'Velg omplassering'
  ]);
  await expect(page.locator('.navds-error-summary__list:has-text("Fødselsnummer må fylles ut")')).not.toBeVisible();

  await formPage.fillInput('Virksomhetsnummer', '260');
  await expect(await page.locator('li > a').allInnerTexts()).toEqual([
    'Virksomhetsnummer må fylles ut',
    'Termindato må fylles ut',
    'Spesifiser hvilke tiltak som er forsøkt',
    'Velg omplassering'
  ]);
  await expect(page.locator('.navds-error-summary__list:has-text("Fødselsnummer må fylles ut")')).not.toBeVisible();

  await formPage.fillInput('Virksomhetsnummer', '974652277');
  await expect(await page.locator('li > a').allInnerTexts()).toEqual([
    'Termindato må fylles ut',
    'Spesifiser hvilke tiltak som er forsøkt',
    'Velg omplassering'
  ]);
  await expect(page.locator('.navds-error-summary__list:has-text("Virksomhetsnummer må fylles ut")')).not.toBeVisible();

  const terminDato = page.getByRole('textbox', { name: 'Termindato' });
  await terminDato.fill('27.08.21');
  await expect(await page.locator('li > a').allInnerTexts()).toEqual([
    'Spesifiser hvilke tiltak som er forsøkt',
    'Velg omplassering'
  ]);
  await expect(page.locator('.navds-error-summary__list:has-text("Termindato må fylles ut")')).not.toBeVisible();

  await formPage.checkCheckbox('Hjemmekontor');

  await formPage.assertVisibleTextAtLeastOnce('Velg omplassering');

  await formPage.assertNotVisibleText('Termindato må fylles ut');

  await formPage.checkRadioButton('Har dere forsøkt omplassering til en annen jobb?', 'Omplassering er ikke mulig');

  await formPage.assertVisibleTextAtLeastOnce('Velg årsak til at omplassering ikke er mulig');
  await formPage.checkCheckbox('Vi får ikke kontakt med den ansatte');

  await expect(await page.locator('li > a').allInnerTexts()).toEqual([]);
  await expect(
    page.locator('.navds-error-summary__list:has-text("Bekreft at opplysningene er korrekt")')
  ).not.toBeVisible();

  const requestPromise = page.waitForRequest(innsendingAPI);
  await formPage.clickButton('Send søknad');

  const request = await requestPromise;
  expect(request.postDataJSON()).toEqual({
    bekreftet: true,
    dokumentasjon: '',
    identitetsnummer: '20125027610',
    omplassering: 'IKKE_MULIG',
    omplasseringAarsak: 'FAAR_IKKE_KONTAKT',
    termindato: '2021-08-27',
    tilrettelegge: true,
    tiltak: ['HJEMMEKONTOR'],
    virksomhetsnummer: '974652277'
  });
  await expect(
    page.getByRole('heading', {
      name: 'Kvittering for mottatt søknad om fritak fra arbeidsgiverperioden grunnet risiko for høyt sykefravær knyttet til graviditet.'
    })
  ).toBeVisible();
});
