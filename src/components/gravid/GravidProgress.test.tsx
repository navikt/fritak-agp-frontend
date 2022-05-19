import React from 'react';
import GravidProgress from './GravidProgress';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => ({})),
        t: (str: string) => str
      }
    };
  }
}));

describe('GravidProgress', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<GravidProgress />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
