import React from 'react';
import GravidProgress from './GravidProgress';
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

describe('GravidProgress', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<GravidProgress />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
