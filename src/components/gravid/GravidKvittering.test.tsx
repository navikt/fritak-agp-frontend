import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import GravidKvittering from './GravidKvittering';

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

describe('GravidKvittering', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<GravidKvittering />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
