import React from 'react';
import Feilmeldingspanel from './Feilmeldingspanel';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

describe('Feilmeldingspanel', () => {
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

  it('should have no a11y violations', async () => {
    const rendered = render(<Feilmeldingspanel feilmeldinger={[]} />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });
});
