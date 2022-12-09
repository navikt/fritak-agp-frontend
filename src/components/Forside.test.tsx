import React from 'react';
import Forside from './Forside';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import { ArbeidsgiverProvider, ArbeidsgiverStatus } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

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
