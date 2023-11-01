import React from 'react';
import Forside from './Forside';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import { Organisasjon } from '@navikt/bedriftsmeny';
import { ArbeidsgiverProvider } from '../context/arbeidsgiver/ArbeidsgiverContext';
import ArbeidsgiverStatus from '../context/arbeidsgiver/ArbeidsgiverStatus';

const initHistory = ['/'];

describe('Forside', () => {
  const ARBEIDSGIVERE = [{ Name: '' } as Organisasjon];

  it('should have no a11y violations', async () => {
    const rendered = render(
      <MemoryRouter initialEntries={initHistory}>
        <ArbeidsgiverProvider arbeidsgivere={ARBEIDSGIVERE} status={ArbeidsgiverStatus.Successfully} baseUrl={''}>
          <Forside />
        </ArbeidsgiverProvider>
      </MemoryRouter>
    );
    const results = await axe(rendered.container);
    expect(results).toHaveNoViolations();
  });
});
