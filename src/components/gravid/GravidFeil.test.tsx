import React from 'react';
import GravidFeil from './GravidFeil';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import LangKey from '../../locale/LangKey';

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

describe('GravidFeil', () => {
  it('should have no a11y violations', async () => {
    const rendered = render(<GravidFeil />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });

  it('skal vise kvittering', () => {
    render(<GravidFeil />);

    expect(screen.getByText(LangKey.DET_OPPSTOD_EN_FEIL)).toBeInTheDocument();
  });
});
