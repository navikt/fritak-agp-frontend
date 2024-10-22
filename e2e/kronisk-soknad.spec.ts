// /e2e/kronisk-soknad.spec.js
import { test, expect } from '@playwright/test';

import arbeidsgiverResponse from './arbeidsgiverResponse';
import kroniskSoknadResponse from './kroniskSoknadResponse';
import clickButton from './helpers/clickSubmit';

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
    await clickButton(page, 'Send søknad');
    expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Mangler fødselsnummer',
      'Virksomhetsnummer må fylles ut',
      'Mangler antall fraværsperioder',
      'Bekreft at opplysningene er korrekte',
      'Fravær må fylles ut.'
    ]);

    await page.getByLabel('Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige.').check();
    await expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Mangler fødselsnummer',
      'Virksomhetsnummer må fylles ut',
      'Mangler antall fraværsperioder',
      'Fravær må fylles ut.'
    ]);
    await expect(page.locator('.navds-error-summary__list')).not.toContainText('Bekreft at opplysningene er korrekte');

    const fnr = page.locator('label:text("Fødselsnummer (11 siffer)")');
    await fnr.fill('260');
    await expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Ugyldig fødselsnummer',
      'Virksomhetsnummer må fylles ut',
      'Mangler antall fraværsperioder',
      'Fravær må fylles ut.'
    ]);
    await expect(page.locator('.navds-error-summary__list')).not.toContainText('Bekreft at opplysningene er korrekte');

    await fnr.fill('20125027610');
    await expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Virksomhetsnummer må fylles ut',
      'Mangler antall fraværsperioder',
      'Fravær må fylles ut.'
    ]);
    await expect(page.locator('.navds-error-summary__list')).not.toContainText([
      'Ugyldig fødselsnummer',
      'Bekreft at opplysningene er korrekte'
    ]);

    const virksomhetsnummer = page.getByRole('textbox', { name: 'Virksomhetsnummer' });
    await virksomhetsnummer.fill('260');
    await expect(page.locator('.navds-error-summary__list')).toContainText('Fravær må fylles ut.');
    await expect(page.locator('.navds-error-summary__list')).not.toContainText([
      'Ugyldig fødselsnummer',
      'Virksomhetsnummer må fylles ut',
      'Mangler fødselsnummer'
    ]);

    await virksomhetsnummer.fill('974652277');
    await expect(page.locator('.navds-error-summary__list')).toContainText('Fravær må fylles ut.');
    await expect(page.locator('.navds-error-summary__list')).not.toContainText([
      'Virksomhetsnummer må fylles ut',
      'Bekreft at opplysningene er korrekte',
      'Mangler fødselsnummer'
    ]);

    // await page.fill('#fim3fiy2020', '5');
    await page.getByLabel('April 2020').fill('5');
    expect(await page.locator('li > a').allInnerTexts()).toEqual([
      'Mangler antall fraværsperioder',
      'Fravær må fylles ut.'
      // 'Påkjenninger om den ansatte må fylles ut',
      // 'Arbeid om den ansatte må fylles ut',
      // 'Virksomhetsnummer må fylles ut',
      // 'Bekreft at opplysningene er korrekte',
      // 'Mangler fødselsnummer'
    ]);
    await expect(page.locator('.navds-error-summary__list')).not.toContainText([
      'Ugyldig fødselsnummer',
      'Virksomhetsnummer må fylles ut',
      'Bekreft at opplysningene er korrekte',
      'Mangler fødselsnummer'
    ]);

    await page.getByLabel('Hvor mange perioder er fraværet fordelt på siste to år?').fill('5');
    // await page.fill('#soknad-perioder', '5');
    expect(await page.locator('li > a').allInnerTexts()).toEqual([]);
    await expect(page.locator('.navds-error-summary__list')).not.toContainText([
      'Fravær må fylles ut.',
      'Ugyldig fødselsnummer',
      'Virksomhetsnummer må fylles ut',
      'Bekreft at opplysningene er korrekte',
      'Mangler fødselsnummer'
    ]);

    await clickButton(page, 'Send søknad');
    await expect(page.locator('html')).toContainText(
      'Kvittering for søknad om fritak fra arbeidsgiverperioden knyttet til kronisk eller langvarig sykdom'
    );
  });
});
