import { expect, type Page } from '@playwright/test';
import { FormPage } from '../utils/formPage';

export async function fillKravWithPeriods(page: Page, perioder: { fom: string; tom: string }[]): Promise<void> {
  const formPage = new FormPage(page);
  await formPage.fillInput('Fødselsnummer (11 siffer)', '20125027610');
  await formPage.fillInput('Oppgi antall dager dere utbetaler lønn for i året:', '260');
  await formPage.checkCheckbox('Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige.');
  for (const [index, periode] of perioder.entries()) {
    if (index > 0) {
      await formPage.clickButton('+ Legg til en periode');
    }
    await page.getByRole('textbox', { name: 'Fra dato', exact: true }).nth(index).fill(periode.fom);
    await page.getByRole('textbox', { name: 'Til dato', exact: true }).nth(index).fill(periode.tom);
    await page.locator(`#belop-${index}`).fill('5000');
  }
}

export function getKravInputSizes(page: Page): Promise<{ height: number; width: number }[]> {
  return page
    .getByTestId('krav-periode-wrapper')
    .locator('input')
    .evaluateAll((inputs) =>
      inputs.map((input) => {
        const box = input.getBoundingClientRect();
        return { height: box.height, width: box.width };
      })
    );
}

export async function assertKravPeriodLayout(page: Page, width: number): Promise<void> {
  for (const periode of await page.getByTestId('krav-periode-wrapper').all()) {
    const geometry = await periode.evaluate((element) => {
      const inputs = Array.from(element.querySelectorAll('input')).map((input) => {
        const box = input.getBoundingClientRect();
        return { left: box.left, right: box.right, center: box.top + box.height / 2 };
      });
      const button = element.querySelector('.slett-periode-wrapper button')!.getBoundingClientRect();
      const fields = Array.from(element.querySelectorAll('.aksel-form-field'));
      const bounds = element.getBoundingClientRect();
      return {
        inputs,
        button: { top: button.top, center: button.top + button.height / 2 },
        lastFieldBottom: Math.max(...fields.map((field) => field.getBoundingClientRect().bottom)),
        left: bounds.left,
        right: bounds.right,
        overflow: element.scrollWidth - element.clientWidth
      };
    });
    expect(geometry.overflow).toBeLessThanOrEqual(1);
    for (const input of geometry.inputs) {
      expect(input.left).toBeGreaterThanOrEqual(geometry.left - 1);
      expect(input.right).toBeLessThanOrEqual(geometry.right + 1);
      if (width > 1024) {
        expect(Math.abs(input.center - geometry.button.center)).toBeLessThanOrEqual(1);
      }
    }
    if (width <= 1024) {
      expect(geometry.button.top).toBeGreaterThanOrEqual(geometry.lastFieldBottom - 1);
    }
  }
}
