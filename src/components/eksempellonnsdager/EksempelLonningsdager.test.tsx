import React from 'react';
import EksempelLonningsdager from './EksempelLonningsdager';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

describe('EksempelLonningsdager', () => {
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
    const rendered = render(<EksempelLonningsdager />);
    const results = await axe(rendered.container);

    expect(results).toHaveNoViolations();
  });

  it('skal vise eksempler', () => {
    render(<EksempelLonningsdager />);

    expect(screen.getByText(/20% fast stilling pluss ekstravakter/)).toBeInTheDocument();
  });
});
