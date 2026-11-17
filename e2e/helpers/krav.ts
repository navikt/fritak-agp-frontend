import { expect, type Page } from '@playwright/test';
import { FormPage } from '../utils/formPage';

export async function fillKravWithPeriods(
  page: Page,
  perioder: { fom: string; tom: string; dager: number }[]
): Promise<void> {
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
    await page
      .getByRole('combobox', { name: /Antall dager/ })
      .nth(index)
      .selectOption(String(periode.dager));
    await page.locator(`#belop-${index}`).fill('5000');
  }
}

export function getKravInputSizes(page: Page): Promise<{ height: number; width: number }[]> {
  return page
    .getByTestId('krav-periode-wrapper')
    .locator('input, select')
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
      const inputs = Array.from(element.querySelectorAll('input, select')).map((input) => {
        const box = input.getBoundingClientRect();
        return { left: box.left, right: box.right, center: box.top + box.height / 2 };
      });
      const button = element.querySelector('.slett-periode-wrapper button')!.getBoundingClientRect();
      const refund = element.querySelector('output')!.getBoundingClientRect();
      const summary = element.querySelector('.krav-periode-oppsummering')!.getBoundingClientRect();
      const fields = Array.from(element.querySelectorAll('.aksel-form-field'));
      const bounds = element.getBoundingClientRect();
      return {
        inputs,
        button: { top: button.top, left: button.left, right: button.right },
        refund: { left: refund.left, right: refund.right, bottom: refund.bottom },
        summaryTop: summary.top,
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
      if (width > 1200) {
        expect(Math.abs(input.center - geometry.inputs[0].center)).toBeLessThanOrEqual(1);
      }
    }
    expect(geometry.summaryTop).toBeGreaterThanOrEqual(geometry.lastFieldBottom - 1);
    expect(geometry.button.left).toBeGreaterThanOrEqual(geometry.left - 1);
    expect(geometry.button.right).toBeLessThanOrEqual(geometry.right + 1);
    expect(geometry.refund.left).toBeGreaterThanOrEqual(geometry.left - 1);
    expect(geometry.refund.right).toBeLessThanOrEqual(geometry.right + 1);
    expect(geometry.refund.right <= geometry.button.left + 1 || geometry.refund.bottom <= geometry.button.top + 1).toBe(
      true
    );
    await expect(periode.getByRole('status', { name: 'Foreløpig beregnet refusjon' })).toBeVisible();
  }
}
