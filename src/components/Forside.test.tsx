import React from 'react';
import Forside from './Forside';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import { Organisasjon } from '@navikt/virksomhetsvelger';
import { ArbeidsgiverProvider } from '../context/arbeidsgiver/ArbeidsgiverContext';
import { useTranslation } from 'react-i18next';
import { vi } from 'vitest';
import HttpStatus from '../api/HttpStatus';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

const initHistory = ['/'];

describe('Forside', () => {
  const ARBEIDSGIVERE = [{ Name: '' } as Organisasjon];

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
    const rendered = render(
      <MemoryRouter initialEntries={initHistory}>
        <ArbeidsgiverProvider arbeidsgivere={ARBEIDSGIVERE} status={HttpStatus.Successfully} baseUrl={''}>
          <Forside />
        </ArbeidsgiverProvider>
      </MemoryRouter>
    );
    const results = await axe(rendered.container);
    expect(results).toHaveNoViolations();
  });
});
