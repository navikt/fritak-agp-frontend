import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import KravEndringKvittering from './KravEndringKvittering';
import { mockApp } from '../../mockData/mockApp';
import lenker from '../../config/lenker';

import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

describe('KravEndringKvittering', () => {
  beforeEach(() => {
    const useTranslationSpy = useTranslation;
    const tSpy = vi.fn((str) => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    });
  });

  it('skal vise melding om at det kommer noe etterhvert', () => {
    const { container } = render(mockApp(<KravEndringKvittering backTarget={lenker.GravidKrav} />));
    expect(container).toContainHTML('kronisk-kvittering');
  });

  it('should have no a11y violations', async () => {
    const { container } = render(mockApp(<KravEndringKvittering backTarget={lenker.GravidKrav} />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
