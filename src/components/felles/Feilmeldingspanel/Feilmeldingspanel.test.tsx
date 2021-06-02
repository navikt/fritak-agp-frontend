import React from 'react';
import Feilmeldingspanel from './Feilmeldingspanel';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        t: (str) => str
      }
    };
  }
}));

describe('Feilmeldingspanel', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<Feilmeldingspanel feilmeldinger={[]} />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
