import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import KravKvittering from './KravKvittering';
import { mockApp } from '../../mockData/mockApp';

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

describe('KravKvittering', () => {
  it('skal vise melding om at det kommer noe etterhvert', () => {
    const { container } = render(mockApp(<KravKvittering />));
    expect(container).toContainHTML('kronisk-kvittering');
  });

  it('should have no a11y violations', async () => {
    const { container } = render(mockApp(<KravKvittering />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
